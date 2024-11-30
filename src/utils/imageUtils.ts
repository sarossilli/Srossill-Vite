import { getUrl } from 'aws-amplify/storage';

export async function getImageUrl(key: string): Promise<string> {
  try {
    const result = await getUrl({ path: key });
    return result.url.toString();
  } catch (error) {
    console.error('Error getting image URL:', error);
    return '';
  }
}