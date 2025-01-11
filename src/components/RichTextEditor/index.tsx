import { useEditor, EditorContent, Editor, EditorOptions } from '@tiptap/react';
import { EditorToolbar } from './EditorToolbar';
import { baseEditorConfig } from './EditorConfig';
import { useEffect, useMemo, useState } from 'react';
import { JSONContent } from '@tiptap/react';

interface RichTextEditorProps {
  onChange?: (content: JSONContent) => void;
  initialContent?: JSONContent;
}

export default function RichTextEditor({ onChange, initialContent }: RichTextEditorProps) {
  const [isReady, setIsReady] = useState(false);

  const config = useMemo((): Partial<EditorOptions> => ({
    ...baseEditorConfig,
    // Start with empty content
    content: '',
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange?.(editor.getJSON());
    },
  }), [onChange]); // Remove initialContent from deps

  const editor = useEditor(config);

  // Handle initial content setup
  useEffect(() => {
    if (editor && initialContent && !isReady) {
      // Push content update to next tick
      queueMicrotask(() => {
        editor.commands.setContent(initialContent);
        setIsReady(true);
      });
    }
  }, [editor, initialContent, isReady]);

  // Handle subsequent content updates
  useEffect(() => {
    if (editor && initialContent && isReady) {
      const currentContent = editor.getJSON();
      if (JSON.stringify(currentContent) !== JSON.stringify(initialContent)) {
        queueMicrotask(() => {
          editor.commands.setContent(initialContent);
        });
      }
    }
  }, [editor, initialContent, isReady]);

  if (!editor || !isReady) {
    return (
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <div className="h-12 bg-gray-800" /> {/* Toolbar placeholder */}
        <div className="animate-pulse h-64 bg-gray-800" /> {/* Content placeholder */}
      </div>
    );
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