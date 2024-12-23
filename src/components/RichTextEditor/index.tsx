/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor, EditorContent, Editor, EditorOptions } from '@tiptap/react';
import { EditorToolbar } from './EditorToolbar';
import { baseEditorConfig } from './EditorConfig';
import { useEffect, useMemo } from 'react';
import { JSONContent } from '@tiptap/react';

interface RichTextEditorProps {
  onChange?: (content: JSONContent) => void;
  initialContent?: JSONContent;
}

export default function RichTextEditor({ onChange, initialContent }: RichTextEditorProps) {
  const config = useMemo((): Partial<EditorOptions> => ({
    ...baseEditorConfig,
    content: initialContent,
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange?.(editor.getJSON());
    },
  }), [initialContent, onChange]);

  const editor = useEditor(config);

  useEffect(() => {
    if (editor && initialContent) {
      queueMicrotask(() => {
        editor.commands.setContent(initialContent);
      });
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none"
      />
    </div>
  );
}