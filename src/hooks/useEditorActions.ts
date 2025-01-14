// src/hooks/useEditorActions.ts
import { Editor } from '@tiptap/react';
import { useImageUpload } from './useImageUpload';

export function useEditorActions(editor: Editor) {
  const { uploadImage } = useImageUpload();

  const handleImageUpload = async (file: File) => {
    try {
      const key = await uploadImage(file);
      editor.chain().focus().setImage({
        src: key,
      }).run();
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  const insertYouTube = () => {
    const url = window.prompt('Enter YouTube URL')
    if (url) {
      editor.commands.setYoutube({ src: url })
    }
  }

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await handleImageUpload(file);
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  return {
    handleFileSelect,
    addLink,
    addTable,
    insertYouTube
  };
}