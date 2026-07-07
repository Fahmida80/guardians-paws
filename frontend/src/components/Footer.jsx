// const Footer = () => {
//   return (
//     <footer className="bg-white text-navy-700 mt-16 border-t border-gray-200">
//       <div className="container mx-auto px-4 py-10">
//         <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
//           <div>
//             <h3 className="text-2xl font-bold mb-4 text-navy-800">🐾 Guardians of Paws & Claws</h3>
//             <p className="text-navy-600">Helping street dogs and cats find love, care, and forever homes since 2020.</p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold mb-4 text-navy-800">❤️ Contact</h3>
//             <p className="text-navy-600">📞 +8801XXXXXXXXX</p>
//             <p className="text-navy-600">💬 WhatsApp: +8801XXXXXXXXX</p>
//             <p className="text-navy-600">📧 guardians.paws@gmail.com</p>
//           </div>
//           <div>
//             <h3 className="text-2xl font-bold mb-4 text-navy-800">🐕 Follow Us</h3>
//             <p className="text-navy-600">📘 Facebook: @guardianspaws</p>
//             <p className="text-navy-600">📸 Instagram: @guardians_paws</p>
//           </div>
//         </div>
//         <div className="text-center mt-8 pt-6 border-t border-gray-200">
//           <p className="text-navy-600">🐾 Every paw deserves love - Thank you for supporting us! 🐾</p>
//           <p className="text-sm mt-2 text-navy-400">© 2025 Guardians of Paws & Claws</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-navy-100">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Organization */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src="/gpc_logo.jpeg" 
                alt="Guardians of Paws & Claws Logo" 
                className="w-10 h-10 rounded-full object-cover border border-navy-200"
              />
              <span className="text-lg font-bold text-navy-800">Guardians of Paws</span>
            </Link>
            <p className="text-sm text-navy-500 leading-relaxed">
              A non-profit organization dedicated to protecting and improving the lives of vulnerable animals across Bangladesh.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:+8801852920924" 
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +8801852920924
                </a>
              </li>
              <li>
                <a 
                  href="tel:+8801329808847" 
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +8801329808847
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@gpcbd.org" 
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@gpcbd.org
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@gpcbd.org" 
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@gpcbd.org
                </a>
              </li>
              <li>
                <a 
                  href="mailto:donate@gpcbd.org" 
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  donate@gpcbd.org
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/8801852920924" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-sky-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-navy-600 hover:text-sky-600 transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-navy-600 hover:text-sky-600 transition-colors duration-200">Our Rescues</Link>
              </li>
              <li>
                <Link to="/transparency" className="text-navy-600 hover:text-sky-600 transition-colors duration-200">Transparency</Link>
              </li>
              <li>
                <Link to="/announcements" className="text-navy-600 hover:text-sky-600 transition-colors duration-200">Announcements</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow & Developer */}
          <div>
            <h3 className="text-sm font-bold text-navy-700 uppercase tracking-wider mb-4">Connect</h3>
            <div className="space-y-4">
              <a 
                href="https://www.facebook.com/groups/530950651223157/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-600 hover:text-sky-600 transition-colors duration-200 text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook Group
              </a>
              
              {/* Developer Credit */}
              <div className="pt-4 border-t border-navy-100">
                <p className="text-xs text-navy-500">
                  Developed by{' '}
                  <a 
                    href="https://github.com/Fahmida80" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-navy-700 font-semibold hover:text-sky-600 transition-colors duration-200"
                  >
                    Fahmida Karim
                  </a>
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <a 
                    href="https://github.com/Fahmida80" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-navy-400 hover:text-navy-700 transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:fahmida.karim.dola@g.bracu.ac.bd" 
                    className="text-navy-400 hover:text-navy-700 transition-colors duration-200 text-xs"
                  >
                    fahmida.karim.dola@g.bracu.ac.bd
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-navy-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} Guardians of Paws & Claws. All rights reserved.
          </p>
          <p className="text-xs text-navy-400">
            Made with care for the voiceless.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  // ← MAKE SURE THIS LINE EXISTS