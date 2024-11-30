/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import type { Schema } from '../../amplify/data/resource';
import toast from 'react-hot-toast';
import { FormData } from '../types/FormData'

const client = generateClient<Schema>();

export default function NewPostPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: null,
    status: 'DRAFT',
    type: 'BLOG',
    featuredImage: null,
  });
  const [featuredImagePreview, setFeaturedImagePreview] = useState('');
  const [saving, setSaving] = useState(false);

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      toast.error('Image must be less than 5MB');
      return;
    }

    handleFormChange('featuredImage', file);
    setFeaturedImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    handleFormChange('featuredImage', null);
    setFeaturedImagePreview('');
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    const toastId = toast.loading('Saving post...');

    try {
      const user = await getCurrentUser();
      let imageUrl = undefined;

      if (formData.featuredImage) {
        const uniqueId = Date.now().toString();
        const fileName = formData.featuredImage.name.replace(/[^a-zA-Z0-9.]/g, '-');
        const key = `images/${user.userId}/${uniqueId}-${fileName}`;

        await uploadData({
          path: key,
          data: formData.featuredImage,
          options: {
            contentType: formData.featuredImage.type,
            metadata: {
              userId: user.userId,
              originalName: formData.featuredImage.name,
            }
          }
        });
        imageUrl = key;
      }

      const currentDate = new Date().toISOString();

      const postData = {
        title: formData.title.trim(),
        content: JSON.stringify(formData.content),
        status: formData.status,
        type: formData.type,
        featuredImage: imageUrl || null,
        publishedAt: formData.status === 'PUBLISHED' ? currentDate : null,
      };

      const result = await client.models.BlogPost.create(postData);

      if (result.errors?.length) {
        throw new Error(result.errors[0].message);
      }

      toast.success('Post saved successfully!', { id: toastId });
      navigate('/admin');

    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to save post',
        { id: toastId }
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmCancel = () => {
    if (formData.title || formData.content || formData.featuredImage) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (confirmed) {
        navigate('/admin');
      }
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the details below to create a new post
            </p>
          </div>
          <div className="flex gap-4">
            {/* Post Type Selection */}
            <select
              value={formData.type}
              onChange={(e) => handleFormChange('type', e.target.value as 'BLOG' | 'PROJECT')}
              className="bg-gray-800 text-white border border-gray-700 rounded-md 
                       px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BLOG">Blog Post</option>
              <option value="PROJECT">Project</option>
            </select>

            {/* Post Status Selection */}
            <select
              value={formData.status}
              onChange={(e) => handleFormChange('status', e.target.value as 'DRAFT' | 'PUBLISHED')}
              className="bg-gray-800 text-white border border-gray-700 rounded-md 
                       px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>

            <button
              onClick={confirmCancel}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !formData.title || !formData.content}
              className="px-4 py-2 bg-blue-600 text-white rounded-md 
                       hover:bg-blue-700 transition-colors duration-200 
                       disabled:bg-gray-700 disabled:text-gray-400 
                       disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleFormChange('title', e.target.value)}
          placeholder={`${formData.type === 'BLOG' ? 'Blog post' : 'Project'} title`}
          className="w-full p-3 text-2xl font-bold bg-gray-800 text-white border 
                   border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent outline-none placeholder-gray-500"
        />

        {/* Featured Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
          />
          {featuredImagePreview && (
            <div className="mt-2">
              <img
                src={featuredImagePreview}
                alt="Preview"
                className="h-40 w-auto object-cover rounded-lg"
              />
              <button
                onClick={removeImage}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Remove image
              </button>
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="prose-lg">
          <RichTextEditor
            onChange={(content) => handleFormChange('content', content)}
          />
        </div>
      </div>
    </div>
  );
}