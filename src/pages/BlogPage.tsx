import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';
import { StorageImage } from '@aws-amplify/ui-react-storage';

const client = generateClient<Schema>();

export default function BlogPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = useState<(any)[]>([]);
    const [, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const result = await client.models.BlogPost.list({
                filter: {
                    status: {
                        eq: 'PUBLISHED'
                    }
                },
                authMode:"identityPool"
            });
            setPosts(result.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white mb-8">Blog Posts</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            {
                            post.featuredImage && <StorageImage alt="cat" path={post.featuredImage} />
                            }


                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    {post.title}
                                </h2>

                                <div className="text-gray-400 text-sm mt-4">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </article>
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