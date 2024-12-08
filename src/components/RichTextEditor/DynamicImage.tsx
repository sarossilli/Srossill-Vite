import { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';

export function DynamicImage({ src }: { src: string }) {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const result = await getUrl({
          path: src,
          options: {
            expiresIn: 3600 // 1 hour
          }
        });
        setImageUrl(result.url.toString());
      } catch (error) {
        console.error('Failed to get image URL:', error);
      }
    };

    if (src.startsWith('images/')) {
      fetchUrl();
    } else {
      setImageUrl(src);
    }
  }, [src]);

  return <img src={imageUrl} alt="" />;
}