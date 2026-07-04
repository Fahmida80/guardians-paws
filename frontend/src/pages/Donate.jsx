import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
  const [showBkashSteps, setShowBkashSteps] = useState(false);
  const [showNagadSteps, setShowNagadSteps] = useState(false);
  const [showBankSteps, setShowBankSteps] = useState(false);
  const [showRocketSteps, setShowRocketSteps] = useState(false);

  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24">

      {/* ===== HEADER ===== */}
      <div className="text-center mb-12 sm:mb-16 reveal">
        <div className="inline-block bg-navy-50 rounded-full px-4 sm:px-6 py-2 border border-navy-200 mb-4">
          <span className="text-xs sm:text-sm font-semibold text-navy-600">💙 MAKE A DIFFERENCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-4">Support Our Mission</h1>
        <p className="text-base sm:text-xl text-navy-500 max-w-2xl mx-auto px-4">
          Your contribution, no matter how small, helps us rescue, treat, and rehabilitate street animals across Bangladesh.
        </p>
      </div>

      {/* ===== TRANSPARENCY BADGE ===== */}
      <div className="max-w-3xl mx-auto mb-8 sm:mb-12 reveal">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-md border border-navy-200 rounded-2xl px-4 sm:px-6 py-4 hover:shadow-lg transition-all duration-300 gap-3 sm:gap-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <span className="text-base sm:text-xl">📊</span>
            </div>
            <div>
              <p className="text-sm font-bold text-navy-700">100% Transparent</p>
              <p className="text-xs text-navy-400">All donations are publicly recorded</p>
            </div>
          </div>
          <Link
            to="/transparency"
            className="text-sm font-semibold text-navy-600 hover:text-navy-900 hover:underline transition-all duration-200 whitespace-nowrap"
          >
            View Records →
          </Link>
        </div>
      </div>

      {/* ===== DONATION CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">

        {/* bKash Card */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-200 hover:border-navy-400 rounded-2xl overflow-hidden reveal">
          <div className="p-4 sm:p-6 border-b border-navy-100 bg-gradient-to-r from-navy-50 to-transparent flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-navy-100 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">📱</div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-navy-700">bKash</h2>
              <p className="text-xs text-navy-400">Send Money</p>
            </div>
          </div>
          <div className="card-body p-4 sm:p-6 text-center">
            <div className="bg-navy-50 rounded-xl p-3 sm:p-4 mb-4 border border-navy-100">
              <p className="text-xs sm:text-sm text-navy-500">Account Number</p>
              <p className="text-lg sm:text-2xl font-bold text-navy-800 tracking-wide">01916342508</p>
              <p className="text-xs text-navy-400 mt-1">(Dola Parvin)</p>
            </div>
            <button 
              onClick={() => setShowBkashSteps(!showBkashSteps)}
              className="text-sm font-semibold text-navy-600 hover:text-navy-800 flex items-center justify-center gap-1 transition-all duration-200"
            >
              {showBkashSteps ? '− Hide Instructions' : '+ How to Send'}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showBkashSteps ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-navy-50 rounded-xl p-3 sm:p-4 text-left border border-navy-100">
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-600">
                  <li className="flex gap-2">1. <span>Open bKash app</span></li>
                  <li className="flex gap-2">2. <span>Select <strong>"Send Money"</strong></span></li>
                  <li className="flex gap-2">3. <span>Enter <strong>01916342508</strong></span></li>
                  <li className="flex gap-2">4. <span>Enter amount</span></li>
                  <li className="flex gap-2">5. <span>Reference: <strong>PAWS</strong></span></li>
                  <li className="flex gap-2">6. <span>Enter PIN to confirm</span></li>
                  <li className="flex gap-2">7. <span>Screenshot & send to WhatsApp</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Nagad Card */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-200 hover:border-navy-400 rounded-2xl overflow-hidden reveal">
          <div className="p-4 sm:p-6 border-b border-navy-100 bg-gradient-to-r from-sky-50 to-transparent flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-100 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">💳</div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-navy-700">Nagad</h2>
              <p className="text-xs text-navy-400">Send Money</p>
            </div>
          </div>
          <div className="card-body p-4 sm:p-6 text-center">
            <div className="bg-navy-50 rounded-xl p-3 sm:p-4 mb-4 border border-navy-100">
              <p className="text-xs sm:text-sm text-navy-500">Account Number</p>
              <p className="text-lg sm:text-2xl font-bold text-navy-800 tracking-wide">01916342508</p>
              <p className="text-xs text-navy-400 mt-1">(Dola Parvin)</p>
            </div>
            <button 
              onClick={() => setShowNagadSteps(!showNagadSteps)}
              className="text-sm font-semibold text-navy-600 hover:text-navy-800 flex items-center justify-center gap-1 transition-all duration-200"
            >
              {showNagadSteps ? '− Hide Instructions' : '+ How to Send'}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showNagadSteps ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-navy-50 rounded-xl p-3 sm:p-4 text-left border border-navy-100">
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-600">
                  <li className="flex gap-2">1. <span>Open Nagad app</span></li>
                  <li className="flex gap-2">2. <span>Select <strong>"Send Money"</strong></span></li>
                  <li className="flex gap-2">3. <span>Enter <strong>01916342508</strong></span></li>
                  <li className="flex gap-2">4. <span>Enter amount</span></li>
                  <li className="flex gap-2">5. <span>Reference: <strong>PAWS</strong></span></li>
                  <li className="flex gap-2">6. <span>Enter PIN to confirm</span></li>
                  <li className="flex gap-2">7. <span>Screenshot & send to WhatsApp</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Dutch Bangla Bank Card */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-200 hover:border-navy-400 rounded-2xl overflow-hidden reveal">
          <div className="p-4 sm:p-6 border-b border-navy-100 bg-gradient-to-r from-emerald-50 to-transparent flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">🏦</div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-navy-700">Dutch Bangla Bank</h2>
              <p className="text-xs text-navy-400">Account Transfer</p>
            </div>
          </div>
          <div className="card-body p-4 sm:p-6 text-center">
            <div className="bg-navy-50 rounded-xl p-3 sm:p-4 mb-4 border border-navy-100">
              <p className="text-xs sm:text-sm text-navy-500">Account Details</p>
              <p className="text-sm font-bold text-navy-700">ARIFUZZAMAN</p>
              <p className="text-base sm:text-lg font-bold text-navy-800 tracking-wide">1081010442684</p>
              <p className="text-xs text-navy-400 mt-1">Dutch Bangla Bank</p>
            </div>
            <button 
              onClick={() => setShowBankSteps(!showBankSteps)}
              className="text-sm font-semibold text-navy-600 hover:text-navy-800 flex items-center justify-center gap-1 transition-all duration-200"
            >
              {showBankSteps ? '− Hide Instructions' : '+ How to Send'}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showBankSteps ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-navy-50 rounded-xl p-3 sm:p-4 text-left border border-navy-100">
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-600">
                  <li className="flex gap-2">1. <span>Visit any DBB branch</span></li>
                  <li className="flex gap-2">2. <span>Fill out deposit slip</span></li>
                  <li className="flex gap-2">3. <span>Account Name: <strong>ARIFUZZAMAN</strong></span></li>
                  <li className="flex gap-2">4. <span>Account No: <strong>1081010442684</strong></span></li>
                  <li className="flex gap-2">5. <span>Deposit amount</span></li>
                  <li className="flex gap-2">6. <span>Take photo of slip</span></li>
                  <li className="flex gap-2">7. <span>Send to WhatsApp</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Rocket Card */}
        <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-navy-200 hover:border-navy-400 rounded-2xl overflow-hidden reveal">
          <div className="p-4 sm:p-6 border-b border-navy-100 bg-gradient-to-r from-purple-50 to-transparent flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">🚀</div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-navy-700">Rocket</h2>
              <p className="text-xs text-navy-400">Send Money</p>
            </div>
          </div>
          <div className="card-body p-4 sm:p-6 text-center">
            <div className="bg-navy-50 rounded-xl p-3 sm:p-4 mb-4 border border-navy-100">
              <p className="text-xs sm:text-sm text-navy-500">Account Number</p>
              <p className="text-base sm:text-xl font-bold text-navy-800 tracking-wide">017174504807</p>
              <p className="text-xs text-navy-400 mt-1">(Sheikh Arifuzzaman)</p>
            </div>
            <button 
              onClick={() => setShowRocketSteps(!showRocketSteps)}
              className="text-sm font-semibold text-navy-600 hover:text-navy-800 flex items-center justify-center gap-1 transition-all duration-200"
            >
              {showRocketSteps ? '− Hide Instructions' : '+ How to Send'}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${showRocketSteps ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="bg-navy-50 rounded-xl p-3 sm:p-4 text-left border border-navy-100">
                <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-navy-600">
                  <li className="flex gap-2">1. <span>Open Rocket app</span></li>
                  <li className="flex gap-2">2. <span>Select <strong>"Send Money"</strong></span></li>
                  <li className="flex gap-2">3. <span>Enter <strong>017174504807</strong></span></li>
                  <li className="flex gap-2">4. <span>Enter amount</span></li>
                  <li className="flex gap-2">5. <span>Enter PIN to confirm</span></li>
                  <li className="flex gap-2">6. <span>Screenshot & send to WhatsApp</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== WHATSAPP HELP CARD ===== */}
      <div className="mt-8 sm:mt-12 max-w-3xl mx-auto reveal">
        <div className="bg-gradient-to-r from-navy-700 to-sky-600 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center gap-3 sm:gap-4 text-white">
            <div className="text-3xl sm:text-4xl">💚</div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Need Help?</h3>
              <p className="text-xs sm:text-sm text-sky-100">After donating, send your screenshot to us</p>
            </div>
          </div>
          <Link to="https://wa.me/8801852920924" target="_blank">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-white text-navy-700 font-bold rounded-xl hover:bg-sky-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base">
              📱 Contact on WhatsApp
            </button>
          </Link>
        </div>
      </div>

      {/* ===== TRANSPARENCY FOOTER ===== */}
      <div className="max-w-3xl mx-auto mt-12 sm:mt-16 reveal">
        <div className="bg-white border border-navy-200 rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl sm:text-2xl">📊</span>
            <span className="text-sm font-bold text-navy-700">Complete Transparency</span>
          </div>
          <p className="text-sm text-navy-500 max-w-xl mx-auto px-4">
            Every donation is recorded and publicly available. We believe in full accountability to our supporters.
          </p>
          <Link
            to="/transparency"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-600 hover:text-navy-800 hover:underline transition-all duration-200"
          >
            View Full Donation Records →
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Donate;