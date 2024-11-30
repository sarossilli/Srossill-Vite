/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FormData {
    title: string;
    content: any;
    status: 'DRAFT' | 'PUBLISHED';
    type: 'BLOG' | 'PROJECT';
    featuredImage: File | null;
}
