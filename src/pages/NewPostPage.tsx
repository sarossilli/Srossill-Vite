/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import RichTextEditor from '../components/RichTextEditor';
import type { Schema } from '../../amplify/data/resource';
import { useNavigate } from 'react-router-dom';

const client = generateClient<Schema>();

export default function NewPostPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>(null);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setFeaturedImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      let imageUrl = undefined;

      if (featuredImage) {
        const uniqueId = Date.now().toString();
        const key = `images/${uniqueId}-${featuredImage.name}`;

        await uploadData({
          path: key,
          data: featuredImage,
          options: {
            contentType: featuredImage.type,
          }
        });
        imageUrl = key;
      }

      const currentDate = new Date().toISOString();
      const stringifiedContent = JSON.stringify(content);

      const postData = {
        title,
        content: stringifiedContent,
        status,
        featuredImage: imageUrl || null,
        publishedAt: status === 'PUBLISHED' ? currentDate : null,
      };

      const result = await client.models.BlogPost.create(postData);
      console.log('Post creation response:', result);

      if(result.errors){
        console.log('Post creation response:', result?.errors[0]);
      }

      alert('Post saved successfully!');
      navigate('/admin');

    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the details below to create a new blog post
            </p>
          </div>
          <div className="flex gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
              className="bg-gray-800 text-white border border-gray-700 rounded-md 
                       px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled={saving || !title || !content}
              className="px-4 py-2 bg-blue-600 text-white rounded-md 
                       hover:bg-blue-700 transition-colors duration-200 
                       disabled:bg-gray-700 disabled:text-gray-400 
                       disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full p-3 text-2xl font-bold bg-gray-800 text-white border 
                   border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent outline-none placeholder-gray-500"
        />

        {/* Featured Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
          />
          {featuredImagePreview && (
            <div className="mt-2">
              <img
                src={featuredImagePreview}
                alt="Preview"
                className="h-40 w-auto object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setFeaturedImage(null);
                  setFeaturedImagePreview('');
                }}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Remove image
              </button>
            </div>
          )}
        </div>
        <div className="prose-lg">
          <RichTextEditor
            onChange={setContent}
            initialContent=""
          />
        </div>
      </div>
    </div>
  );
}