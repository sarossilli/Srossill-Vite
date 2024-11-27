/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
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

interface RichTextEditorProps {
  onChange: (content: any) => void;
  initialContent?: any;
}

export default function RichTextEditor({ onChange, initialContent }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
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
    ],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[400px] focus:outline-none',
      },
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 flex">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 text-gray-300 hover:text-white ${
                editor.isActive('bold') ? 'bg-gray-700' : ''
              }`}
            >
              B
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 text-gray-300 hover:text-white ${
                editor.isActive('italic') ? 'bg-gray-700' : ''
              }`}
            >
              I
            </button>
            <button
              onClick={addLink}
              className={`p-2 text-gray-300 hover:text-white ${
                editor.isActive('link') ? 'bg-gray-700' : ''
              }`}
            >
              🔗
            </button>
          </div>
        </BubbleMenu>
      )}
      
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex flex-wrap gap-2">
        <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            H3
          </button>
        </div>

        <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('strike') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('code') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Code
          </button>
        </div>

        <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('bulletList') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('orderedList') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Numbered List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive('taskList') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Task List
          </button>
        </div>

        <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Left
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Center
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Right
          </button>
        </div>

        <div className="flex gap-1 items-center">
          <button
            onClick={addImage}
            className="px-2 py-1 rounded text-gray-300 hover:text-white"
          >
            Add Image
          </button>
          <button
            onClick={addLink}
            className={`px-2 py-1 rounded ${
              editor.isActive('link') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Add Link
          </button>
          <button
            onClick={addTable}
            className="px-2 py-1 rounded text-gray-300 hover:text-white"
          >
            Add Table
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}