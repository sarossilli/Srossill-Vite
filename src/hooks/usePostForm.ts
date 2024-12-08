// src/hooks/usePostForm.ts
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPostById, updatePost } from '../queries/blog';
import { useNavigate } from 'react-router-dom';
import type { FormData } from '../types/FormData';
import type { UpdatePostData, Post } from '../types/BlogPost';
import toast from 'react-hot-toast';
import { usePostUpload } from './usePostUpload';

export function usePostForm(id: string | undefined) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uploadFeaturedImage } = usePostUpload();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: null,
    status: 'DRAFT',
    type: 'BLOG',
    featuredImage: null,
  });

  const { data: postData, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => id ? fetchPostById(id) : null,
    enabled: !!id,
  });

  useEffect(() => {
    if (postData) {
      console.log('Raw post content:', postData.post.content);
      console.log('Processed content:', postData.processedContent);

      let parsedContent = null;
      if (postData.processedContent) {
        parsedContent = postData.processedContent;
      } else if (typeof postData.post.content === 'string') {
        try {
          parsedContent = JSON.parse(postData.post.content);
        } catch (e) {
          console.error('Failed to parse content:', e);
        }
      } else {
        parsedContent = postData.post.content;
      }

      console.log('Final parsed content:', parsedContent);

      setFormData({
        title: postData.post.title,
        content: parsedContent,
        status: postData.post.status || 'DRAFT',
        type: postData.post.type || 'BLOG',
        featuredImage: null,
      });
    }
  }, [postData]);

  const mutation = useMutation({
    mutationFn: async (data: FormData): Promise<Post> => {
      if (!id) throw new Error('No post ID provided');

      let imageUrl = postData?.post.featuredImage || null;

      if (data.featuredImage) {
        imageUrl = await uploadFeaturedImage(data.featuredImage);
      }

      const updateData: UpdatePostData = {
        id,
        title: data.title.trim(),
        content: typeof data.content === 'string' ? data.content : JSON.stringify(data.content),
        status: data.status,
        type: data.type,
        featuredImage: imageUrl,
        ...(data.status === 'PUBLISHED' && !postData?.post.publishedAt
          ? { publishedAt: new Date().toISOString() }
          : {}),
      };

      return updatePost(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully!');
      navigate('/admin');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update post');
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormChange = (field: keyof FormData, value: any): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!id || !formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    mutation.mutate(formData);
  };

  return {
    formData,
    isLoading,
    isSaving: mutation.isPending,
    postData,
    handleFormChange,
    handleSave
  };
}