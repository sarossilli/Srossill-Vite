import { TipTapContent } from "./Editor";
export interface Post {
    id: string;
    title: string;
    content: string | TipTapContent;
    status: 'DRAFT' | 'PUBLISHED';
    type: 'BLOG' | 'PROJECT';
    featuredImage: string | null;
    publishedAt: string | null;
    updatedAt: string;
}

export interface UpdatePostData {
    id: string;
    title: string;
    content: string;
    status: 'DRAFT' | 'PUBLISHED';
    type: 'BLOG' | 'PROJECT';
    featuredImage: string | null;
    publishedAt?: string;
}