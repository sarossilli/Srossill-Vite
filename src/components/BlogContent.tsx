import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface BlogContentProps {
  content: string; 
}

export function BlogContent({ content }: BlogContentProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: JSON.parse(content),
    editable: false, 
  });

  return <EditorContent editor={editor} />;
}