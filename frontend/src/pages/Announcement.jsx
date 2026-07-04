import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [posting, setPosting] = useState(false);
  const { isAuthenticated, isAdmin, token } = useAuth();

  // const API_URL = '/api';
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${API_URL}/announcement`);
      setAnnouncements(res.data.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    fetchAnnouncements();
  }, []);

  const addAnnouncement = async () => {
    if (!newText.trim()) return;
    setPosting(true);
    try {
      await axios.post(`${API_URL}/announcement`, 
        { text: newText, isActive: true },
        { headers: { 'x-auth-token': token } }
      );
      setNewText('');
      fetchAnnouncements();
    } catch (error) {
      alert('Error adding announcement');
    } finally {
      setPosting(false);
    }
  };

  const updateAnnouncement = async (id) => {
    try {
      await axios.put(`${API_URL}/announcement/${id}`,
        { text: editText },
        { headers: { 'x-auth-token': token } }
      );
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      alert('Error updating announcement');
    }
  };

  const deleteAnnouncement = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await axios.delete(`${API_URL}/announcement/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchAnnouncements();
      } catch (error) {
        alert('Error deleting announcement');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-4 animate-bounce">📢</div>
        <p className="text-xl text-navy-600 animate-pulse">Loading announcements...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24 max-w-4xl">
      <div className="text-center mb-12 animate-fadeInDown">
        <div className="inline-block bg-navy-50 rounded-full p-4 mb-4 shadow-lg border border-navy-200">
          <span className="text-6xl animate-bounce inline-block">📢</span>
        </div>
        <h1 className="text-5xl font-bold text-navy-700 mb-4">Announcements</h1>
        <p className="text-xl text-navy-500 max-w-2xl mx-auto">Stay updated with our latest news and urgent updates</p>
      </div>

      {/* Admin Add Form */}
      {isAuthenticated && isAdmin && (
        <div className="mb-12 animate-slideInUp">
          <div className="card bg-white shadow-2xl border border-navy-200 rounded-2xl overflow-hidden">
            <div className="card-body p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-navy-700 rounded-full p-2 shadow-lg">
                  <span className="text-xl">✍️</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy-700">Post New Announcement</h2>
                  <p className="text-sm text-navy-400">Share important updates with your community</p>
                </div>
              </div>
              
              <div className="flex gap-3 flex-col sm:flex-row">
                <input
                  type="text"
                  className="input input-bordered flex-1 bg-white border-2 border-navy-200 focus:border-navy-600 rounded-xl transition-all duration-300 text-navy-800 placeholder:text-navy-400 text-lg px-5 py-4"
                  placeholder="Write your announcement here..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAnnouncement()}
                />
                <button
                  onClick={addAnnouncement}
                  disabled={posting || !newText.trim()}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-navy-700 to-navy-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {posting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Posting...
                      </>
                    ) : (
                      <>
                        <span className="text-xl">📢</span> Post
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <div className="text-center py-20 animate-fadeIn">
          <div className="text-8xl mb-6 animate-bounce">📭</div>
          <h2 className="text-3xl font-bold text-navy-600 mb-3">No announcements yet</h2>
          <p className="text-navy-400">Check back soon for updates!</p>
          {isAuthenticated && isAdmin && (
            <button
              onClick={() => document.querySelector('input')?.focus()}
              className="mt-6 btn bg-navy-700 text-white hover:bg-navy-800 border-0 rounded-full px-8"
            >
              ✍️ Create First Announcement
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement, index) => {
            const isEditing = editingId === announcement._id;
            return (
              <div
                key={announcement._id}
                className="group card bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border-l-8 border-l-navy-700 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body p-6 md:p-8">
                  {isEditing && isAuthenticated && isAdmin ? (
                    <div className="space-y-4">
                      <textarea
                        className="textarea textarea-bordered w-full bg-navy-50 border-2 border-navy-300 focus:border-navy-600 rounded-xl text-navy-800 text-lg p-4 min-h-[100px]"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateAnnouncement(announcement._id)}
                          className="px-6 py-2.5 bg-navy-700 hover:bg-navy-800 text-white font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          💾 Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy-700 font-medium rounded-lg transition-all duration-200 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xl text-navy-700 leading-relaxed">
                            {announcement.text}
                          </p>
                        </div>
                        {isAuthenticated && isAdmin && (
                          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Edit Button - Minimal, No Text */}
                            <button
                              onClick={() => {
                                setEditingId(announcement._id);
                                setEditText(announcement.text);
                              }}
                              className="p-2 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>

                            {/* Delete Button - Minimal, No Text */}
                            <button
                              onClick={() => deleteAnnouncement(announcement._id)}
                              className="p-2 rounded-lg text-navy-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-navy-100">
                        <div className="flex items-center gap-4 text-sm text-navy-500">
                          <span className="flex items-center gap-1">
                            📅 {formatDate(announcement.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            🕐 {formatTime(announcement.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            ● Active
                          </span>
                          <span className="text-xs text-navy-400">
                            Posted by Admin
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default AnnouncementPage;