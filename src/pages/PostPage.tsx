import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostById, type ProcessedPost } from '../queries/blog';
import { ContentRenderer } from '../components/ContentRenderer';
import { Loader2 } from 'lucide-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { record } from 'aws-amplify/analytics';

export default function PostPage() {
  const { id } = useParams();



  const { data, isLoading, error } = useQuery<ProcessedPost>({
    queryKey: ['post', id],
    queryFn: () => {
      if (!id) throw new Error('No post ID provided');
      return fetchPostById(id);
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const { post, processedContent } = data;

  record({
    name: 'blogVisit',
    attributes: { postTitle: post.title, type: post.type },
  });
  

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {post.featuredImage && (
            <div className="w-full h-[400px] overflow-hidden">
              <StorageImage
                path={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <span>
                  {new Date(post.publishedAt || post.updatedAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${post.type === 'BLOG'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                    }`}
                >
                  {post.type}
                </span>
              </div>
            </header>

            <div className="prose prose-invert max-w-none">
              <ContentRenderer content={processedContent} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}