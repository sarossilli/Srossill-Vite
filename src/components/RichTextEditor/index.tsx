import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEditorConfig } from '../../hooks/useEditorConfig';
import { EditorToolbar } from './EditorToolbar';
import { useImageProcessor } from '../../hooks/UseImageProcessor';
import { TipTapContent } from '../../types/Editor';

interface RichTextEditorProps {
  onChange: (content: TipTapContent) => void;
  initialContent?: TipTapContent;
}

export default function RichTextEditor({ onChange, initialContent }: RichTextEditorProps) {
  const processedContent = useImageProcessor(initialContent);
  const editorConfig = useEditorConfig(onChange, processedContent);
  const editor = useEditor(editorConfig);

  if (!editor) return null;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800 relative">
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
          </div>
        </BubbleMenu>
      )}

      <EditorToolbar editor={editor} />

      <div className="p-4 bg-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}