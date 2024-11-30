import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

export const useImageUpload = () => {
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const key = `images/${fileName}`;
      
      await uploadData({
        path: key,
        data: file,
        options: {
          contentType: file.type,
        }
      }).result;

      return key;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return { uploadImage };
};