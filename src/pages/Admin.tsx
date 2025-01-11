import { Authenticator } from '@aws-amplify/ui-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PenSquare, Eye, Trash2, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Post } from '../types/BlogPost';
import { useState } from 'react';
import { fetchAllPosts, deletePost } from '../queries/blog';

type PostType = 'BLOG' | 'PROJECT';

export function AdminPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<PostType>('BLOG');
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPosts,
  });

  // Mutation for deleting posts
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete post');
    },
  });

  const handleDeletePost = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPosts = posts.filter(post => post.type === activeTab);

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
          <header className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Link
                  to="/admin/newPost"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md 
                           hover:bg-blue-700 transition-colors duration-200
                           flex items-center gap-2"
                >
                  <Plus size={20} />
                  New Post
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              <button
                onClick={() => setActiveTab('BLOG')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'BLOG'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Blog Posts
              </button>
              <button
                onClick={() => setActiveTab('PROJECT')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'PROJECT'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Projects
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400 flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                    Loading posts...
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="p-8 text-center text-gray-400">
                    No {activeTab.toLowerCase()} posts yet. Create your first one!
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredPosts.map((post: Post) => (
                        <tr key={post.id} className="hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{post.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                post.status === 'PUBLISHED'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatDate(post.updatedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-3">
                              <Link
                                to={`/admin/edit/${post.id}`}
                                className="text-blue-400 hover:text-blue-300"
                                title="Edit"
                              >
                                <PenSquare size={20} />
                              </Link>
                              <Link
                                to={`/blog/${post.id}`}
                                className="text-green-400 hover:text-green-300"
                                title="View"
                              >
                                <Eye size={20} />
                              </Link>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                disabled={deleteMutation.isPending}
                                className="text-red-400 hover:text-red-300 disabled:opacity-50"
                                title="Delete"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>

          <button 
            onClick={signOut}
            className="fixed bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md 
                     hover:bg-red-700 transition-colors duration-200 
                     shadow-lg flex items-center gap-2"
          >
            Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
}