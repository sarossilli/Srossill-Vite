// src/hooks/usePostUpload.ts
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function usePostUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFeaturedImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const user = await getCurrentUser();
      const uniqueId = Date.now().toString();
      const fileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
      const key = `images/${user.userId}/${uniqueId}-${fileName}`;

      await uploadData({
        path: key,
        data: file,
        options: {
          contentType: file.type,
        }
      });

      return key;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (
    file: File | null, 
    onSuccess: (file: File) => void
  ) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error('Image must be less than 5MB');
      return;
    }

    onSuccess(file);
  };

  return {
    uploadFeaturedImage,
    handleImageChange,
    isUploading
  };
}