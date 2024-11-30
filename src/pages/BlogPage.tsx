// src/pages/BlogPage.tsx
import { useQuery } from '@tanstack/react-query';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchPublishedPosts } from '../queries/blog';

export default function BlogPage() {
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['published-posts'],
    queryFn: fetchPublishedPosts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Failed to load posts</h1>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Blog Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group"
            >
              <article className="bg-gray-800 rounded-lg overflow-hidden shadow-lg 
                                transition duration-200 ease-in-out 
                                hover:transform hover:-translate-y-1 hover:shadow-2xl">
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <StorageImage
                      alt={post.title}
                      path={post.featuredImage}
                      className="w-full h-full object-cover 
                               transition duration-200 ease-in-out 
                               group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2 
                               group-hover:text-blue-400 transition duration-200">
                    {post.title}
                  </h2>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
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
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
}