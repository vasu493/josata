
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Solutions from './pages/Solutions';
import AnimatedBackground from './components/AnimatedBackground';

const RouteTransitionEffect = () => {
  const { pathname } = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`fixed inset-0 z-[9999] pointer-events-none overflow-hidden transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent shadow-[0_0_20px_#00A3FF] animate-scan-down"></div>
      <div className="absolute inset-0 bg-[#00A3FF]/5 backdrop-blur-[2px] animate-fade-out"></div>
      
      <style>{`
        @keyframes scan-down {
          0% { transform: translateY(-10vh); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-scan-down { animation: scan-down 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .animate-fade-out { animation: fade-out 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center pt-20 px-6">
    <div className="text-center space-y-6 relative z-10 max-w-xl">
      <span className="text-[10px] font-black tracking-[0.5em] text-[#A855F7] uppercase block">// Status: Updating</span>
      <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white">{title}</h1>
      <p className="text-gray-500 text-sm md:text-base">Our engineers are currently deploying a new architecture for this division. Check back shortly for our updated global roadmap.</p>
      <div className="w-24 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto rounded-full shadow-[0_0_20px_#00A3FF]"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-[#050505] overflow-x-hidden">
        {/* Route Scan Layer */}
        <RouteTransitionEffect />

        {/* Cinematic Ambient Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
           <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#00A3FF]/10 blur-[180px] animate-float-slow"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#A855F7]/10 blur-[220px] animate-float-slow-reverse"></div>
           {/* Cinematic Noise Texture */}
           <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
        </div>

        {/* Global Particle Simulation */}
        <AnimatedBackground />
        
        <Navbar />
        
        <main className="flex-grow relative z-10">
          <div className="page-transition-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
        
        <Footer />

        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(5%, 5%) scale(1.1); }
          }
          @keyframes float-slow-reverse {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-5%, -5%) scale(1.1); }
          }
          .animate-float-slow { animation: float-slow 20s infinite ease-in-out; }
          .animate-float-slow-reverse { animation: float-slow-reverse 25s infinite ease-in-out; }

          .page-transition-container {
            animation: pageFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }

          @keyframes pageFadeIn {
            from { opacity: 0; transform: scale(0.98); filter: blur(10px); }
            to { opacity: 1; transform: scale(1); filter: blur(0px); }
          }

          ::selection {
            background: #00A3FF;
            color: white;
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;
