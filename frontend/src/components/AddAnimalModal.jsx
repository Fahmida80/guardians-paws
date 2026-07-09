// import { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const AddAnimalModal = ({ isOpen, onClose, onAnimalAdded }) => {
//   const [name, setName] = useState('');
//   const [type, setType] = useState('dog');
//   const [story, setStory] = useState('');
//   const [mediaFile, setMediaFile] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState('');
//   const [mediaType, setMediaType] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const { token: authToken } = useAuth();
//   const token = authToken || localStorage.getItem('token');

//   //const API_URL = '/api';
//   const API_URL = process.env.REACT_APP_API_URL || '/api';

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setMediaFile(file);
//       setMediaPreview(URL.createObjectURL(file));
      
//       // Check if file is video or image
//       if (file.type.startsWith('video/')) {
//         setMediaType('video');
//       } else if (file.type.startsWith('image/')) {
//         setMediaType('image');
//       }
//     }
//   };

//   const uploadMedia = async () => {
//     const formData = new FormData();
//     formData.append('image', mediaFile);
    
//     const res = await axios.post(`${API_URL}/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'x-auth-token': token
//       }
//     });
//     return res.data.url;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!mediaFile) {
//       alert('Please select an image or video');
//       return;
//     }
    
//     if (!token) {
//       alert('You are not logged in. Please login again.');
//       return;
//     }
    
//     setUploading(true);
    
//     try {
//       const mediaUrl = await uploadMedia();
      
//       await axios.post(`${API_URL}/animals`, 
//         { name, type, story, imageUrl: mediaUrl, mediaType },
//         { headers: { 'x-auth-token': token } }
//       );
      
//       // Reset form
//       setName('');
//       setType('dog');
//       setStory('');
//       setMediaFile(null);
//       setMediaPreview('');
//       setMediaType('');
      
//       onAnimalAdded();
//       onClose();
      
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.response?.data?.error || 'Error adding animal');
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
//       <div className="card bg-navy-800 shadow-2xl rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-sky-500/30">
//         <div className="card-body p-6">
//           {/* Header */}
//           <div className="text-center mb-4">
//             <div className="inline-block bg-navy-700 rounded-full p-3 mb-2 shadow-lg border border-sky-500/30">
//               <span className="text-4xl animate-bounce inline-block">🐾</span>
//             </div>
//             <h2 className="text-2xl font-bold text-white">
//               Add a New Rescue
//             </h2>
//             <p className="text-gray-400 text-sm">Share their story and give them hope</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name Field */}
//             <div>
//               <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
//                 <span>🏷️</span>
//                 <span>Name</span>
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered w-full bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl text-white placeholder:text-gray-500"
//                 placeholder="e.g., Tommy, Luna, Buddy"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
            
//             {/* Type Field */}
//             <div>
//               <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
//                 <span>🐕</span>
//                 <span>Type</span>
//               </label>
//               <select
//                 className="select select-bordered w-full bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl text-white"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option value="dog">🐕 Dog</option>
//                 <option value="cat">🐈 Cat</option>
//                 <option value="other">🐾 Other</option>
//               </select>
//             </div>
            
//             {/* Story Field */}
//             <div>
//               <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
//                 <span>📖</span>
//                 <span>Their Story</span>
//               </label>
//               <textarea
//                 className="textarea textarea-bordered w-full h-24 bg-navy-900/80 border border-sky-500/30 focus:border-sky-400 rounded-xl resize-none text-white placeholder:text-gray-500"
//                 placeholder="Tell their journey..."
//                 value={story}
//                 onChange={(e) => setStory(e.target.value)}
//                 required
//               />
//             </div>
            
//             {/* Media Upload Field - Image + Video */}
//             <div>
//               <label className="label font-semibold text-gray-300 text-sm mb-1 flex items-center gap-1">
//                 <span>📸</span>
//                 <span>Photo or Video</span>
//               </label>
//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="file-input file-input-bordered w-full bg-navy-900/80 border border-sky-500/30 rounded-xl text-sm text-gray-300"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Upload an image (JPG, PNG) or video (MP4, WebM, MOV)
//               </p>
//               {mediaPreview && (
//                 <div className="mt-3 flex justify-center">
//                   {mediaType === 'video' ? (
//                     <video 
//                       src={mediaPreview} 
//                       controls 
//                       className="w-40 h-40 object-cover rounded-xl shadow-md border border-sky-500/30"
//                     />
//                   ) : (
//                     <img 
//                       src={mediaPreview} 
//                       alt="Preview" 
//                       className="w-32 h-32 object-cover rounded-xl shadow-md border border-sky-500/30"
//                     />
//                   )}
//                 </div>
//               )}
//             </div>
            
//             {/* Action Buttons */}
//             <div className="flex gap-3 pt-4 border-t border-sky-500/30 mt-4">
//               <button 
//                 type="button" 
//                 className="btn btn-ghost flex-1 rounded-full border border-gray-600 text-gray-300 hover:bg-navy-700"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="submit" 
//                 className="btn flex-1 rounded-full bg-sky-500 text-white hover:bg-sky-600 shadow-md border-0"
//                 disabled={uploading}
//               >
//                 {uploading ? (
//                   <span className="flex items-center justify-center gap-1">
//                     <span className="loading loading-spinner loading-xs"></span>
//                     Uploading...
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-1">
//                     🐾 Add to Gallery
//                   </span>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAnimalModal;

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

  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-navy-100 animate-fadeInUp">
        
        {/* ===== HEADER with Logo ===== */}
        <div className="sticky top-0 bg-white z-10 border-b border-navy-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/gpc_logo.jpeg" 
              alt="GPC Logo" 
              className="w-10 h-10 rounded-full object-cover border border-navy-200"
            />
            <div>
              <h2 className="text-xl font-bold text-navy-700">Add New Rescue</h2>
              <p className="text-xs text-navy-400">Share their story and give them hope</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-navy-50 transition-all duration-200 text-navy-400 hover:text-navy-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
              🏷️ Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-navy-50/50 border-2 border-navy-200 rounded-xl focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition-all duration-200 text-navy-800 placeholder:text-navy-400"
              placeholder="e.g., Tommy, Luna, Buddy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Type Field */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
              🐕 Type
            </label>
            <select
              className="w-full px-4 py-3 bg-navy-50/50 border-2 border-navy-200 rounded-xl focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition-all duration-200 text-navy-800"
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
            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
              📖 Their Story
            </label>
            <textarea
              className="w-full px-4 py-3 bg-navy-50/50 border-2 border-navy-200 rounded-xl focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/20 transition-all duration-200 text-navy-800 placeholder:text-navy-400 resize-none h-24"
              placeholder="Tell their journey — how they were found, their personality, what they need..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
              📸 Photo or Video
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-navy-50/50 border-2 border-navy-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-navy-100 file:text-navy-700 file:font-semibold hover:file:bg-navy-200 transition-all duration-200 text-navy-800"
                required
              />
            </div>
            <p className="text-xs text-navy-400 mt-1.5">
              Upload JPG, PNG, MP4, WebM, or MOV
            </p>
            {mediaPreview && (
              <div className="mt-4 flex justify-center">
                {mediaType === 'video' ? (
                  <video 
                    src={mediaPreview} 
                    controls 
                    className="w-48 h-48 object-cover rounded-xl shadow-md border-2 border-navy-200"
                  />
                ) : (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="w-48 h-48 object-cover rounded-xl shadow-md border-2 border-navy-200"
                  />
                )}
              </div>
            )}
          </div>

          {/* ===== BUTTONS ===== */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-navy-50 text-navy-700 font-semibold rounded-xl hover:bg-navy-100 transition-all duration-200 border-2 border-navy-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-navy-700 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploading}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🐾 Add to Gallery
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnimalModal;