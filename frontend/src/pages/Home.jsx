

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 30);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={counterRef} className="text-5xl md:text-6xl font-bold text-navy-700">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const Home = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const { summary } = useSocket();

  useEffect(() => {
    // window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const { totalDonations = 0, totalExpenses = 0, transactionCount = 0 } = summary || {};
  const balance = totalDonations - totalExpenses;

  return (
    <>
      {/* ===== HERO SECTION (Blurred Banner Background) ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Blurred Background Banner */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/Banner_gpc.png')",
            backgroundSize: "cover",
            backgroundPosition: "top",
            filter: "blur(3px) brightness(0.9)",
            transform: "scale(1.05)",
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/40 to-navy-900/80 pointer-events-none z-10"></div>
        
        {/* Content */}
        <div className={`container mx-auto px-4 text-center relative z-20 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white tracking-wider">🐾 SINCE 2020</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Give a Stray{' '}
              <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
                a Safe Tomorrow
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-sky-100/90 max-w-2xl mx-auto leading-relaxed">
              Every street dog and cat in Bangladesh deserves love, food, and medical care. Your small help creates huge change.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-navy-600 to-sky-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10">Donate Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-navy-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </Link>
              <Link to="/gallery">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  Meet Our Rescues
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
          <span className="text-xs text-white/60 uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 bg-gradient-to-b from-white to-navy-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-700">Our Impact in Numbers</h2>
            <p className="mt-4 text-lg text-navy-500 max-w-2xl mx-auto">
              Every number represents a life saved, a story rewritten, and a future secured.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-navy-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <AnimatedCounter target={7000} suffix="+" />
              <p className="mt-2 text-lg text-navy-600 font-semibold">Animals Rescued</p>
              <p className="text-sm text-navy-400">Stray dogs & cats given a second chance</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 md:mt-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <AnimatedCounter target={6} suffix="+" />
              <p className="mt-2 text-lg text-navy-600 font-semibold">Regions Covered</p>
              <p className="text-sm text-navy-400">Dhaka, Khulna, Satkhira, Bagerhat, Gopalganj & more</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <AnimatedCounter target={100} suffix="+" />
              <p className="mt-2 text-lg text-navy-600 font-semibold">Active Volunteers</p>
              <p className="text-sm text-navy-400">Dedicated individuals making a difference daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MISSION SECTION (Banner with Colored Padding) ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            {/* Banner Side (with colored padding) */}
            <div className="lg:w-1/2 p-4 bg-gradient-to-br from-navy-50 via-sky-50 to-navy-50 rounded-2xl shadow-lg border border-navy-100">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 group">
                <div 
                  className="w-full h-[400px] transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: "url('/Banner_gpc.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:w-1/2">
              <div className="inline-block mb-4 px-4 py-1.5 bg-navy-50 rounded-full">
                <span className="text-sm font-semibold text-navy-600">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-navy-700 leading-tight">
                A Voice for the<br />
                <span className="bg-gradient-to-r from-navy-600 to-sky-600 bg-clip-text text-transparent">Voiceless</span>
              </h2>
              <p className="mt-6 text-lg text-navy-600 leading-relaxed">
                We are a non-profit animal welfare organization dedicated to protecting street dogs and cats across Bangladesh. 
                Founded in 2020, we've grown into a community of 100+ passionate volunteers working to give every animal a second chance.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-sky-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-navy-700">Emergency Rescue</h4>
                    <p className="text-navy-500">24/7 response to animals in critical need</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-sky-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-navy-700">Medical Treatment</h4>
                    <p className="text-navy-500">Full veterinary care and rehabilitation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-sky-500 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-navy-700">Adoption & Rehoming</h4>
                    <p className="text-navy-500">Finding loving forever homes</p>
                  </div>
                </div>
              </div>
              <Link to="/about">
                <button className="mt-8 px-8 py-3.5 bg-navy-700 text-white font-bold rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE TRANSPARENCY SECTION (Uses Socket.io) ===== */}
      <section className="py-20 bg-gradient-to-b from-navy-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block mb-4 px-4 py-1.5 bg-green-50 rounded-full">
            <span className="text-sm font-semibold text-green-700">🔴 LIVE TRANSPARENCY</span>
          </div>
          <h2 className="text-4xl font-bold text-navy-700">Your Donations in Action</h2>
          <p className="mt-4 text-lg text-navy-500 max-w-2xl mx-auto">
            Every contribution is publicly recorded. See exactly how your support is making a difference — live.
          </p>

          <div className="mt-10 bg-white rounded-2xl shadow-xl border border-navy-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-navy-500">Total Donations</p>
                <p className="text-2xl font-bold text-green-600">
                  ৳{totalDonations.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-navy-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-500">
                  ৳{totalExpenses.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-navy-500">Current Balance</p>
                <p className="text-2xl font-bold text-navy-700">
                  ৳{balance.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-xs text-navy-400 mb-4">
              {transactionCount} transactions recorded • Live updates via WebSocket
            </div>
            <Link to="/transparency">
              <button className="px-6 py-2.5 bg-navy-700 text-white font-semibold rounded-xl hover:bg-navy-800 transition-all duration-300 shadow-md hover:shadow-lg">
                View Full Transparency Report →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-sky-800 to-navy-800 animate-gradient bg-[length:400%_400%]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white tracking-wider">🐾 JOIN THE MOVEMENT</span>
            </div>
            <h2 className="text-5xl font-bold text-white leading-tight drop-shadow-2xl">
              Be a Voice for the <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">Voiceless</span>
            </h2>
            <p className="mt-6 text-xl text-sky-100/90 max-w-2xl mx-auto">
              Your donation, no matter how small, helps us rescue, treat, and rehabilitate street animals across Bangladesh.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link to="/donate">
                <button className="px-8 py-4 bg-white text-navy-800 font-bold rounded-xl hover:bg-sky-50 transition-all duration-300 shadow-2xl hover:scale-105">
                  Donate Now
                </button>
              </Link>
              <Link to="/gallery">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300">
                  Meet Our Rescues
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;