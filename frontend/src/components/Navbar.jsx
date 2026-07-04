

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();


  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-navy-100">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-navy-200 shadow-sm flex items-center justify-center bg-white group-hover:border-navy-600 transition-all duration-300">
              <img 
                src="/gpc_logo.jpeg" 
                alt="GPC Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-navy-700 hidden sm:inline group-hover:text-navy-900 transition-colors duration-300">
              Guardians of Paws & Claws
            </span>
            <span className="text-lg font-bold text-navy-700 sm:hidden">GPC</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/donate" 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 flex items-center gap-1 ${
                isActive('/donate') 
                  ? 'bg-navy-700 text-white' 
                  : 'border-2 border-navy-300 text-navy-700 hover:bg-navy-50 hover:border-navy-500 animate-soft-pulse'
              }`}
            >
              Donate Now
            </Link>
            <Link 
              to="/gallery" 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/gallery') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              Rescues
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/about') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              About
            </Link>
            <Link 
              to="/announcements" 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/announcements') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              Announcements
            </Link>
            {/* Records */}
            <Link 
              to="/transparency" 
              className="px-4 py-2 rounded-lg text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-all duration-200 font-bold text-sm"
            >
              Records
            </Link>

            {/* ===== LOGIN / LOGOUT BUTTON ===== */}
            {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/login') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive('/login') 
                  ? 'bg-navy-100 text-navy-800' 
                  : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
              }`}
            >
              Login
            </Link>
          )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <details className="dropdown dropdown-end">
              <summary className="btn rounded-lg bg-white text-navy-700 border border-navy-200 px-4 py-2 hover:bg-navy-50 transition-all duration-300 font-bold">
                Menu
              </summary>
              <ul className="menu dropdown-content bg-white rounded-lg z-10 mt-3 p-3 shadow-xl w-56 gap-1 border border-navy-100">
                <li><Link to="/" className={`rounded-lg py-2 px-4 font-bold text-sm ${isActive('/') ? 'bg-navy-100 text-navy-800' : 'text-navy-600 hover:bg-navy-50'}`}>Home</Link></li>
                <li><Link to="/donate" className={`rounded-lg py-2 px-4 font-bold text-sm flex items-center gap-1 ${isActive('/donate') ? 'bg-navy-700 text-white' : 'border border-navy-300 text-navy-700'}`}>Donate</Link></li>
                <li><Link to="/gallery" className={`rounded-lg py-2 px-4 font-bold text-sm ${isActive('/gallery') ? 'bg-navy-100 text-navy-800' : 'text-navy-600 hover:bg-navy-50'}`}>Rescues</Link></li>
                <li><Link to="/about" className={`rounded-lg py-2 px-4 font-bold text-sm ${isActive('/about') ? 'bg-navy-100 text-navy-800' : 'text-navy-600 hover:bg-navy-50'}`}>About</Link></li>
                <li><Link to="/announcements" className={`rounded-lg py-2 px-4 font-bold text-sm ${isActive('/announcements') ? 'bg-navy-100 text-navy-800' : 'text-navy-600 hover:bg-navy-50'}`}>Announcements</Link></li>
                <li><Link to="/transparency" className="rounded-lg py-2 px-4 font-bold text-sm text-navy-600 hover:bg-navy-50">Records</Link></li>
                <li>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="rounded-lg py-2 px-4 font-bold text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="rounded-lg py-2 px-4 font-bold text-sm bg-navy-700 text-white hover:bg-navy-800 block text-center">Login</Link>
                  )}
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-soft-pulse {
          animation: softPulse 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;