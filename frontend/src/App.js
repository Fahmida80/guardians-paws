// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { SocketProvider } from './context/SocketContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Donate from './pages/Donate';
// import Gallery from './pages/Gallery';
// import About from './pages/About';
// import Login from './pages/Login';
// import Announcement from './pages/Announcement';
// import Transparency from './pages/Transparency';

// function App() {
//   return (
//     <AuthProvider>
//       <SocketProvider>
//         <Router>
//           <div className="min-h-screen flex flex-col bg-navy-900">
//             <Navbar />
//             <main className="flex-grow bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/donate" element={<Donate />} />
//                 <Route path="/gallery" element={<Gallery />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/announcements" element={<Announcement />} />
//                 <Route path="/transparency" element={<Transparency />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </SocketProvider>
//     </AuthProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Login from './pages/Login';
import Announcement from './pages/Announcement';
import Transparency from './pages/Transparency';

// Wrapper component that uses useLocation
const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/announcements" element={<Announcement />} />
          <Route path="/transparency" element={<Transparency />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <AppContent />
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;