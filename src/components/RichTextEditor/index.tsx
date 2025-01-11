import { useEditor, EditorContent, Editor, EditorOptions } from '@tiptap/react';
import { EditorToolbar } from './EditorToolbar';
import { baseEditorConfig } from './EditorConfig';
import { useEffect, useMemo, useRef } from 'react';
import { JSONContent } from '@tiptap/react';

interface RichTextEditorProps {
  onChange?: (content: JSONContent) => void;
  initialContent?: JSONContent;
}

export default function RichTextEditor({ onChange, initialContent }: RichTextEditorProps) {
  const hasInitialized = useRef(false);

  const config = useMemo((): Partial<EditorOptions> => ({
    ...baseEditorConfig,
    content: '',  // Start empty
    onUpdate: ({ editor }: { editor: Editor }) => {
      if (hasInitialized.current) {
        onChange?.(editor.getJSON());
      }
    },
  }), [onChange]);

  const editor = useEditor(config);

  // Handle initial content and updates
  useEffect(() => {
    if (editor && initialContent && !hasInitialized.current) {
      editor.commands.setContent(initialContent);
      hasInitialized.current = true;
    }
  }, [editor, initialContent]);

  if (!editor) {
    return (
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <div className="h-12 bg-gray-800" />
        <div className="animate-pulse h-64 bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="prose prose-invert max-w-none" />
    </div>
  );
}