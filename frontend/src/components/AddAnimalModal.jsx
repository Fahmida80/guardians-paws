import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddAnimalModal = ({ isOpen, onClose, onAnimalAdded }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('dog');
  const [story, setStory] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [uploading, setUploading] = useState(false);
  const { token: authToken } = useAuth();
  const token = authToken || localStorage.getItem('token');

  //const API_URL = '/api';
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      
      // Check if file is video or image
      if (file.type.startsWith('video/')) {
        setMediaType('video');
      } else if (file.type.startsWith('image/')) {
        setMediaType('image');
      }
    }
  };

  const uploadMedia = async () => {
    const formData = new FormData();
    formData.append('image', mediaFile);
    
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token
      }
    });
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mediaFile) {
      alert('Please select an image or video');
      return;
    }
    
    if (!token) {
      alert('You are not logged in. Please login again.');
      return;
    }
    
    setUploading(true);
    
    try {
      const mediaUrl = await uploadMedia();
      
      await axios.post(`${API_URL}/animals`, 
        { name, type, story, imageUrl: mediaUrl, mediaType },
        { headers: { 'x-auth-token': token } }
      );
      
      // Reset form
      setName('');
      setType('dog');
      setStory('');
      setMediaFile(null);
      setMediaPreview('');
      setMediaType('');
      
      onAnimalAdded();
      onClose();
      
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.error || 'Error adding animal');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="card bg-navy-800 shadow-2xl rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-sky-500/30">
        <div className="card-body p-6">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-block bg-navy-700 rounded-full p-3 mb-2 shadow-lg border border-sky-500/30">
              <span className="text-4xl animate-bounce inline-block">🐾</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Add a New Rescue
            </h2>
            <p className="text-gray-400 text-sm">Share their story and give them hope</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
                <span>🏷️</span>
                <span>Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl text-white placeholder:text-gray-500"
                placeholder="e.g., Tommy, Luna, Buddy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            {/* Type Field */}
            <div>
              <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
                <span>🐕</span>
                <span>Type</span>
              </label>
              <select
                className="select select-bordered w-full bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl text-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐈 Cat</option>
                <option value="other">🐾 Other</option>
              </select>
            </div>
            
            {/* Story Field */}
            <div>
              <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
                <span>📖</span>
                <span>Their Story</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full h-24 bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl resize-none text-white placeholder:text-gray-500"
                placeholder="Tell their journey..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              />
            </div>
            
            {/* Media Upload Field - Image + Video */}
            <div>
              <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
                <span>📸</span>
                <span>Photo or Video</span>
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full bg-navy-900/80 border border-sky-500/30 rounded-xl text-sm text-gray-300"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload an image (JPG, PNG) or video (MP4, WebM, MOV)
              </p>
              {mediaPreview && (
                <div className="mt-3 flex justify-center">
                  {mediaType === 'video' ? (
                    <video 
                      src={mediaPreview} 
                      controls 
                      className="w-40 h-40 object-cover rounded-xl shadow-md border border-sky-500/30"
                    />
                  ) : (
                    <img 
                      src={mediaPreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-xl shadow-md border border-sky-500/30"
                    />
                  )}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-sky-500/30 mt-4">
              <button 
                type="button" 
                className="btn btn-ghost flex-1 rounded-full border border-gray-600 text-gray-300 hover:bg-navy-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn flex-1 rounded-full bg-sky-500 text-white hover:bg-sky-600 shadow-md border-0"
                disabled={uploading}
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-1">
                    <span className="loading loading-spinner loading-xs"></span>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    🐾 Add to Gallery
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnimalModal;