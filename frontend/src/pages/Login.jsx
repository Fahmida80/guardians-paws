import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/gallery');
    } else {
      setError(result.error || 'Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-gradient-to-br from-navy-50 via-white to-sky-50">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Card with glass effect */}
        <div className="card bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl sm:rounded-3xl border border-white/30">
          <div className="card-body p-5 sm:p-8 md:p-10">
            
            {/* Logo Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block p-2 sm:p-3 bg-navy-50 rounded-full shadow-lg border-2 border-navy-200 mb-3 sm:mb-4">
                <img 
                  src="/gpc_logo.jpeg" 
                  alt="GPC Logo" 
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-700">Welcome Back</h2>
              <p className="text-sm sm:text-base text-navy-500 mt-1">Sign in to manage your rescue center</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
                <span className="text-lg sm:text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-navy-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white/70 border-2 border-navy-200 rounded-xl sm:rounded-2xl focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/30 transition-all duration-300 text-navy-800 placeholder:text-navy-400 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-navy-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">
                  🔒 Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white/70 border-2 border-navy-200 rounded-xl sm:rounded-2xl focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-600/30 transition-all duration-300 text-navy-800 placeholder:text-navy-400 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-navy-700 to-navy-800 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    🚀 Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-[10px] sm:text-xs text-navy-400">
                🔐 Secure access for authorized administrators only
              </p>
              <div className="mt-2 sm:mt-3 flex justify-center gap-2 sm:gap-3 text-navy-300 text-sm sm:text-base">
                <span>🐾</span>
                <span>Guardians of Paws & Claws</span>
                <span>🐾</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;