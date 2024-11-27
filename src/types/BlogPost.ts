import { Nullable } from "vitest";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type BlogPost = {
    title: string;
    content: string | number | boolean | object | any[];
    status: "DRAFT" | "PUBLISHED" | null;
    featuredImage: Nullable<string>;
    publishedAt: Nullable<string>;
    readonly id: string;
    owner: string | null;
    readonly createdAt: string;
    readonly updatedAt: string;
};