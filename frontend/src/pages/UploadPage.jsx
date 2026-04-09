import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState({ type: '', message: '' });

  React.useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
    } else {
      setStatus({ type: 'error', message: 'Please select a valid video file.' });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setStatus({ type: 'error', message: 'Title and video file are required.' });
      return;
    }

    setIsUploading(true);
    setStatus({ type: '', message: '' });
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);
    if (categoryId) formData.append('category_id', categoryId);

    try {
      await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      setStatus({ type: 'success', message: 'Video uploaded successfully!' });
      setTimeout(() => navigate('/my-videos'), 2000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.error || 'Failed to upload video' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center pt-10 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-gray-200 dark:border-dark-700 p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple to-neon-cyan"></div>
        <h1 className="text-3xl font-bold mb-6">Upload Video</h1>
        
        {status.message && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-500 border border-red-300 dark:border-red-800'}`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          {/* File Dropzone */}
          <div 
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
              file ? 'border-neon-cyan bg-neon-cyan/5 shadow-[inset_0_0_20px_rgba(0,243,255,0.1)]' : 'border-gray-300 dark:border-dark-600 hover:border-neon-cyan dark:hover:border-neon-cyan hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
            onClick={() => !isUploading && fileInputRef.current.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*" 
              className="hidden" 
              disabled={isUploading}
            />
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle size={48} className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.6)]" />
                <p className="font-bold">{file.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="mt-3 flex items-center gap-1 text-sm bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 px-3 py-1 rounded transition text-gray-700 dark:text-gray-300"
                  disabled={isUploading}
                >
                  <X size={16} /> Remove selection
                </button>
              </div>
            ) : (
              <>
                <Upload size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-xl font-bold">Select a video file to upload</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">MP4, WebM up to 5GB</p>
                <button type="button" className="mt-6 bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-900 px-6 py-2 rounded-md font-bold transition shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-neon-cyan">
                  Browse Files
                </button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
                placeholder="Enter video title"
                disabled={isUploading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:border-neon-purple focus:shadow-neon-purple transition-all resize-none"
                placeholder="Tell viewers about your video"
                disabled={isUploading}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Category (Optional UUID)</label>
              <input
                type="text"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-md py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                disabled={isUploading}
              />
            </div>
          </div>

          {isUploading && (
            <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5 mt-4 overflow-hidden border border-gray-300 dark:border-dark-600 relative">
              <div 
                className="bg-gradient-to-r from-neon-purple to-neon-cyan h-2.5 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.8)] relative" 
                style={{ width: `${uploadProgress}%` }}
              >
                 <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
              </div>
              <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{uploadProgress}%</div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-md font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !file}
              className="bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-900 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent disabled:shadow-none hover:shadow-neon-cyan px-6 py-2 rounded-md font-bold transition flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-currentColor border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
