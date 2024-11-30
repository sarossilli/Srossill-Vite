// src/pages/EditPostPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { usePostForm } from '../hooks/usePostForm';
import { usePostUpload } from '../hooks/usePostUpload';
import RichTextEditor from '../components/RichTextEditor';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { Loader2 } from 'lucide-react';

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleImageChange } = usePostUpload();
    const {
        formData,
        isLoading,
        isSaving,
        postData,
        handleFormChange,
        handleSave
    } = usePostForm(id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Edit Post</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Update your post details below
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={formData.type}
                            onChange={(e) => handleFormChange('type', e.target.value as 'BLOG' | 'PROJECT')}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="BLOG">Blog Post</option>
                            <option value="PROJECT">Project</option>
                        </select>

                        <select
                            value={formData.status}
                            onChange={(e) => handleFormChange('status', e.target.value as 'DRAFT' | 'PUBLISHED')}
                            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                        </select>

                        <button
                            onClick={() => navigate('/admin')}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !formData.title || !formData.content}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder={`${formData.type === 'BLOG' ? 'Blog post' : 'Project'} title`}
                    className="w-full p-3 text-2xl font-bold bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
                />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Featured Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files?.[0] || null, 
                            (file) => handleFormChange('featuredImage', file))}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {(formData.featuredImage || postData?.post.featuredImage) && (
                        <div className="mt-2">
                            {formData.featuredImage ? (
                                <img
                                    src={URL.createObjectURL(formData.featuredImage)}
                                    alt="Preview"
                                    className="h-40 w-auto object-cover rounded-lg"
                                />
                            ) : postData?.post.featuredImage && (
                                <StorageImage
                                    path={postData.post.featuredImage}
                                    alt="Current featured image"
                                    className="h-40 w-auto object-cover rounded-lg"
                                />
                            )}
                            <button
                                onClick={() => handleFormChange('featuredImage', null)}
                                className="mt-2 text-sm text-red-400 hover:text-red-300"
                            >
                                Remove image
                            </button>
                        </div>
                    )}
                </div>

                <div className="prose-lg">
                    <RichTextEditor
                        onChange={(content) => handleFormChange('content', content)}
                        initialContent={formData.content}
                    />
                </div>
            </div>
        </div>
    );
}