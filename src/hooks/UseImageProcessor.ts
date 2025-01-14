/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';
import type { TipTapContent } from '../types/Editor';

export function useImageProcessor(initialContent: any) {
  const [processedContent, setProcessedContent] = useState<TipTapContent | null>(initialContent);

  useEffect(() => {
    async function processImages() {
      if (!initialContent) return;

      let content = initialContent;
      if (typeof content === 'string') {
        try {
          content = JSON.parse(content);
        } catch (e) {
          console.error('Failed to parse initial content:', e);
          return;
        }
      }

      if (content.content) {
        const processNode = async (node: any) => {
          if (node.type === 'image' && node.attrs?.['data-storage-key']) {
            try {
              // Always fetch a fresh URL
              const result = await getUrl({ 
                path: node.attrs['data-storage-key'],
                options: {
                  expiresIn: 3600 // 1 hour
                }
              });
              node.attrs.src = result.url.toString();
            } catch (error) {
              console.error('Failed to get image URL:', error);
            }
          }
          if (node.content) {
            for (const childNode of node.content) {
              await processNode(childNode);
            }
          }
        };

        for (const node of content.content) {
          await processNode(node);
        }
      }

      setProcessedContent(content);
    }

    processImages();
  }, [initialContent]);

  return processedContent;
}