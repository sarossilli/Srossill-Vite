import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import type { Schema } from '../../amplify/data/resource';
import type { TipTapContent, Node } from '../types/Editor';
import type { Post } from '../types/BlogPost';
import type { FormData } from '../types/FormData';

const client = generateClient<Schema>();

export interface ProcessedPost {
  post: Post;
  featuredImageUrl: string | null;
  processedContent: TipTapContent;
}

async function processNode(node: Node): Promise<Node> {
  const processedNode = { ...node };

  if (node.type === 'image' && node.attrs?.src && node.attrs.src.startsWith('images/')) {
    try {
      const result = await getUrl({ path: node.attrs.src });
      processedNode.attrs = {
        ...node.attrs,
        src: result.url.toString(),
      };
    } catch (e) {
      console.error('Failed to get image URL:', e);
    }
  }

  if (node.content) {
    processedNode.content = await Promise.all(
      node.content.map(childNode => processNode(childNode))
    );
  }

  return processedNode;
}

async function processContent(content: string | TipTapContent): Promise<TipTapContent> {
  let parsedContent: TipTapContent;

  if (typeof content === 'string') {
    try {
      parsedContent = JSON.parse(content) as TipTapContent;
    } catch (e) {
      console.error('Failed to parse content:', e);
      throw new Error('Invalid content format');
    }
  } else {
    parsedContent = content;
  }

  if (parsedContent.content) {
    parsedContent.content = await Promise.all(
      parsedContent.content.map(node => processNode(node))
    );
  }

  return parsedContent;
}

export async function fetchPost(id: string): Promise<ProcessedPost> {
  const result = await client.models.BlogPost.get({ id });
  if (!result.data) throw new Error('Post not found');

  const post = result.data as Post;
  
  let featuredImageUrl = null;
  if (post.featuredImage) {
    const imageResult = await getUrl({ key: post.featuredImage });
    featuredImageUrl = imageResult.url.toString();
  }

  const processedContent = await processContent(post.content);

  return {
    post,
    featuredImageUrl,
    processedContent
  };
}

type UpdatePostInput = Omit<Post, 'updatedAt'>;

export async function updatePost(postData: UpdatePostInput): Promise<Post> {
  const result = await client.models.BlogPost.update(postData);
  if (result.errors?.length) {
    throw new Error(result.errors[0].message);
  }
  return result.data as Post;
}

// Helper function to convert FormData to Post data
export function formDataToPost(formData: FormData, id: string, originalPost?: Post): UpdatePostInput {
  return {
    id,
    title: formData.title.trim(),
    content: typeof formData.content === 'string' 
      ? formData.content 
      : JSON.stringify(formData.content),
    status: formData.status,
    type: formData.type,
    featuredImage: originalPost?.featuredImage || null,
    publishedAt: formData.status === 'PUBLISHED' && !originalPost?.publishedAt 
      ? new Date().toISOString() 
      : originalPost?.publishedAt || null,
  };
}