import { useEditor, EditorContent, EditorOptions } from '@tiptap/react'
import { baseEditorConfig } from './RichTextEditor/EditorConfig'
import { useMemo } from 'react'
import { JSONContent } from '@tiptap/react'

interface ContentRendererProps {
  content: JSONContent;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  const config = useMemo((): Partial<EditorOptions> => ({
    ...baseEditorConfig,
    content,
    editable: false,
  }), [content]);

  const editor = useEditor(config);

  if (!editor) {
    return null;
  }

  return (
    <div className="prose-custom bg-gray-900 rounded-lg p-6">
      <EditorContent editor={editor} />
    </div>
  );
}