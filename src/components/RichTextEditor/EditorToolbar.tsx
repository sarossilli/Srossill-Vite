// src/components/RichTextEditor/EditorToolbar.tsx
import { Editor } from '@tiptap/react';
import { useEditorActions } from '../../hooks/useEditorActions';
import { Youtube } from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor;
}

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const { handleFileSelect, addLink, addTable, insertYouTube } = useEditorActions(editor);

  return (
    <div className="bg-gray-900 p-3 border-b border-gray-700 flex flex-wrap gap-2">
      {/* Text Formatting */}
      <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          H3
        </button>
      </div>

      {/* Text Style */}
      <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded ${editor.isActive('code') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Code
        </button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 items-center border-r border-gray-700 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
            }`}
        >
          Numbered List
        </button>
      </div>

      {/* Media and Links */}
      <div className="flex gap-1 items-center">
        <button
          onClick={handleFileSelect}
          className="px-2 py-1 rounded text-gray-300 hover:text-white"
        >
          Add Image
        </button>
        <button
          onClick={addLink}
          className={`px-2 py-1 rounded ${editor.isActive('link') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white'
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

        <button
          onClick={insertYouTube}
          className="p-2 hover:bg-gray-100 rounded-lg"
          type="button"
          title="Insert YouTube video"
        >
          <Youtube className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};