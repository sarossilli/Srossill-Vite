/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONContent } from '@tiptap/react'

export interface ImageAttrs {
    src: string;
    alt?: string | null;
    title?: string | null;
    'data-storage-key'?: string;
}

export interface TextAlign {
    textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface Node {
    type: string;
    attrs?: ImageAttrs & TextAlign;
    content?: Node[];
    text?: string;
}

export interface TipTapContent extends JSONContent {
  type: 'doc';
  content?: Array<{
    type: string;
    attrs?: Record<string, any>;
    content?: Array<{
      type: string;
      attrs?: Record<string, any>;
      text?: string;
      marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
      }>;
    }>;
    marks?: Array<{
      type: string;
      attrs?: Record<string, any>;
    }>;
  }>;
}

// More flexible alternative if you need it
export type FlexibleTipTapContent = JSONContent;
// Optional - you can define more specific node types if needed
export interface ImageNode {
    type: 'image';
    attrs: ImageAttrs;
}

export interface ParagraphNode {
    type: 'paragraph';
    attrs?: TextAlign;
    content?: Array<{
        type: 'text';
        text: string;
        marks?: Array<{
            type: 'bold' | 'italic' | 'strike' | 'link';
            attrs?: { href?: string };
        }>;
    }>;
}

export interface HeadingNode {
    type: 'heading';
    attrs: {
        level: 1 | 2 | 3 | 4 | 5 | 6;
    } & TextAlign;
    content?: Array<{
        type: 'text';
        text: string;
    }>;
}