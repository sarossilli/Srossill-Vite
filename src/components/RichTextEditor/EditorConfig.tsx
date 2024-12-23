// src/components/RichTextEditor/EditorConfig.tsx
import { EditorOptions, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { DynamicImage } from './DynamicImage'
import CodeBlock from '@tiptap/extension-code-block'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

// Style the image wrapper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageNodeView = ({ node }: { node: any }) => {
  return (
    <NodeViewWrapper className="my-4 max-w-full">
      <DynamicImage src={node.attrs.src} />
    </NodeViewWrapper>
  );
};

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'font-bold'
      }
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-gray-300 pl-4 italic my-4 text-gray-300',
      }
    },
    code: {
      HTMLAttributes: {
        class: 'bg-gray-800 rounded px-1 py-0.5 font-mono text-sm',
      }
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-8 border-t border-gray-700',
      }
    },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'bg-gray-800 rounded-lg p-4 font-mono text-sm my-4 overflow-x-auto',
    }
  }),
  Image.extend({
    addNodeView() {
      return ReactNodeViewRenderer(ImageNodeView);
    },
    HTMLAttributes: {
      class: 'rounded-lg max-w-full h-auto',
    }
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: 'border-collapse table-auto w-full my-4',
    }
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: 'border-b border-gray-700',
    }
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: 'border border-gray-700 p-2',
    }
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: 'border border-gray-700 p-2 bg-gray-800 font-bold',
    }
  }),
  Typography,
  Link.configure({
    openOnClick: true,
    HTMLAttributes: {
      class: 'text-blue-400 hover:text-blue-300 underline decoration-1 underline-offset-2',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    defaultAlignment: 'left',
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose pl-2',
    }
  }),
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: 'flex gap-2 items-start my-1',
    }
  }),
];

export const editorConfig: Partial<EditorOptions> = {
  extensions,
  editorProps: {
    attributes: {
      class: 'editor-content',
    }
  },
};

export const baseEditorConfig: Partial<EditorOptions> = {
  extensions,
  editorProps: {
      attributes: {
          class: 'prose-custom focus:outline-none',
      },
  },
};