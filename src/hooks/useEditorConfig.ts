/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import type { Editor } from '@tiptap/react';

export const useEditorConfig = (onChange: (content: any) => void, initialContent?: any) => {
  const getExtensions = useCallback(() => [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Start writing your post...',
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-400 hover:text-blue-500 underline',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Typography,
    CodeBlock.configure({
      HTMLAttributes: {
        class: 'bg-gray-800 rounded-md p-4 font-mono text-sm',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full',
      },
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
  ], []);

  const getEditorProps = useCallback(() => ({
    attributes: {
      class: 'prose prose-invert max-w-none min-h-[400px] focus:outline-none',
    },
  }), []);

  return {
    extensions: getExtensions(),
    content: initialContent || '',
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: getEditorProps(),
  };
};