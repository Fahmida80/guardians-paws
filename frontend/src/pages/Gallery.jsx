import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AddAnimalModal from '../components/AddAnimalModal';

const Gallery = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { isAuthenticated, isAdmin, token } = useAuth();

  const API_URL = process.env.REACT_APP_API_URL || '/api';

  const fetchAnimals = async () => {
    try {
      const res = await axios.get(`${API_URL}/animals`);
      setAnimals(res.data.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      setDeletingId(id);
      try {
        await axios.delete(`${API_URL}/animals/${id}`, {
          headers: { 'x-auth-token': token }
        });
        fetchAnimals();
      } catch (error) {
        alert('Error deleting animal');
      }
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="text-6xl mb-4 animate-bounce">🐾</div>
        <p className="text-2xl text-navy-600 font-semibold animate-pulse">Loading our furry friends...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block bg-navy-50 rounded-full px-4 sm:px-6 py-2 border border-navy-200 mb-4">
          <span className="text-xs sm:text-sm font-semibold text-navy-600">🐕 OUR RESCUES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-4">
          Meet Our Rescued Friends
        </h1>
        <p className="text-base sm:text-xl text-navy-500 max-w-2xl mx-auto px-4">
          Every animal has a story. These are the heroes we've had the privilege to save, treat, and love.
        </p>
      </div>

      {/* ===== ADMIN CONTROLS ===== */}
      {isAuthenticated && isAdmin && (
        <div className="mb-8 sm:mb-12">
          <div className="bg-white shadow-md border border-navy-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-navy-100 flex items-center justify-center">
                <span className="text-base sm:text-lg">🔐</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy-700">Admin Mode</h3>
                <p className="text-xs text-navy-400">You can add or remove animals from the gallery</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-navy-700 text-white font-bold rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              + Add New Animal
            </button>
          </div>
        </div>
      )}

      {/* ===== STATS ===== */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-block bg-navy-50 rounded-full px-4 sm:px-6 py-2 border border-navy-200">
          <span className="text-xs sm:text-sm font-semibold text-navy-600">
            🐾 {animals.length} {animals.length === 1 ? 'Animal' : 'Animals'} in Our Care
          </span>
        </div>
      </div>

      {/* ===== ANIMALS GRID ===== */}
      {animals.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce">🐾</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-600 mb-3">No rescues yet</h2>
          <p className="text-navy-400">Check back soon for our furry friends!</p>
          {isAuthenticated && isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-navy-700 text-white font-bold rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              + Add Your First Rescue
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {animals.map((animal) => (
            <div
              key={animal._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-navy-100 hover:border-navy-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-navy-50">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x400?text=🐾+No+Image';
                  }}
                />
                {/* Status Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-md backdrop-blur-sm ${
                    animal.status === 'adopted' 
                      ? 'bg-green-500 text-white' 
                      : animal.status === 'medical_need'
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-navy-700 text-white'
                  }`}>
                    {animal.status === 'adopted' ? '✅ Adopted' : 
                     animal.status === 'medical_need' ? '🏥 Medical' : 
                     '❤️ In Care'}
                  </span>
                </div>
                {/* Type Badge */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-navy-700 shadow-md">
                    {animal.type === 'dog' ? '🐕 Dog' : animal.type === 'cat' ? '🐈 Cat' : '🐾 Other'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-navy-700 group-hover:text-sky-600 transition-colors duration-300">
                    {animal.name}
                  </h3>
                  {isAuthenticated && isAdmin && (
                    <button
                      onClick={() => handleDelete(animal._id)}
                      disabled={deletingId === animal._id}
                      className="p-1 rounded-lg text-navy-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-navy-500 text-xs sm:text-sm leading-relaxed mt-1 line-clamp-2 sm:line-clamp-3">
                  {animal.story}
                </p>
                <div className="mt-3 pt-3 border-t border-navy-100 flex items-center justify-between text-[10px] sm:text-xs text-navy-400">
                  <span>🐾 Rescued with love</span>
                  <span>{new Date(animal.createdAt).toLocaleDateString('en-BD')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODAL ===== */}
      <AddAnimalModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAnimalAdded={fetchAnimals}
      />
    </div>
  );
};

export default Gallery;