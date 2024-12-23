import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';
import type { Post } from '../types/BlogPost';
import { getUrl } from 'aws-amplify/storage';
import { TipTapContent } from '../types/Editor';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export async function fetchPublishedPosts(): Promise<Post[]> {
    try {
        const user = await getCurrentUser().catch(() => null);

        const result = await client.models.BlogPost.list(
            {
                filter: {
                    status: {
                        eq: 'PUBLISHED'
                    }
                },
                authMode: user ? 'userPool' : 'identityPool'
            }
        );
        return result.data as Post[];
    } catch (error) {
        console.error('Fetch published posts error:', error);
        throw error;
    }
}

export async function fetchAllPosts(): Promise<Post[]> {
    const result = await client.models.BlogPost.list({
        authMode: "userPool"
    });
    if (!result.data) {
        return [];
    }
    return result.data as Post[];
}

export interface ProcessedPost {
    post: Post;
    featuredImageUrl: string | null;
    processedContent: TipTapContent;
}

export async function fetchPostById(id: string): Promise<ProcessedPost> {
    const user = await getCurrentUser().catch(() => null);

    const result = await client.models.BlogPost.get({
        id,
    }, {
        authMode: user ? 'userPool' : 'identityPool'
    });
    if (!result.data) throw new Error('Post not found');

    const post = result.data as Post;

    let featuredImageUrl = null;
    if (post.featuredImage) {
        const imageResult = await getUrl({
            path: post.featuredImage,
            options: {
                expiresIn: 3600
            }
        });
        featuredImageUrl = imageResult.url.toString();
    }

    const processedContent = typeof post.content === 'string'
        ? JSON.parse(post.content)
        : post.content;

    return {
        post,
        featuredImageUrl,
        processedContent
    };
}

// Write operations - explicitly use userPool
export async function createPost(postData: Omit<Post, 'id' | 'updatedAt'>): Promise<Post> {
    const result = await client.models.BlogPost.create(postData, {
        authMode: 'userPool'
    });
    if (result.errors?.length) {
        throw new Error(result.errors[0].message);
    }
    return result.data as Post;
}

export async function updatePost(postData: Partial<Post> & { id: string }): Promise<Post> {
    const result = await client.models.BlogPost.update(postData, {
        authMode: 'userPool'
    });
    if (result.errors?.length) {
        throw new Error(result.errors[0].message);
    }
    return result.data as Post;
}

export async function deletePost(id: string): Promise<void> {
    await client.models.BlogPost.delete({ id }, {
        authMode: 'userPool'
    });
}