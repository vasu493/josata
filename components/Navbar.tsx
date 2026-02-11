
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Fixed: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> to resolve the missing NodeJS namespace error in the browser environment.
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavHover = (path: string) => {
    if (location.pathname === path) return;
    
    // Clear existing timeout
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    // Set a small delay before navigating to prevent "jittery" navigation when moving mouse across navbar
    hoverTimeoutRef.current = setTimeout(() => {
      navigate(path, { replace: true });
    }, 150);
  };

  const cancelNavHover = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ${
      isScrolled || isMobileMenuOpen 
        ? 'bg-[#050505]/95 backdrop-blur-2xl py-3 border-b border-white/5' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12 md:h-16">
        <div 
          className="relative z-[1100]"
          onMouseEnter={() => handleNavHover('/')}
          onMouseLeave={cancelNavHover}
        >
          <Logo className="h-auto" hideTextMobile={isMobileMenuOpen} />
        </div>

        {/* Desktop Interactive Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <div 
              key={item.label} 
              className="relative group"
              onMouseEnter={() => handleNavHover(item.path)}
              onMouseLeave={cancelNavHover}
            >
              <Link 
                to={item.path}
                className={`text-[11px] font-black tracking-[0.3em] uppercase flex items-center gap-2 transition-all duration-500 py-2 ${
                  location.pathname === item.path ? 'text-[#00A3FF]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
              </Link>
              
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#00A3FF] to-[#A855F7] transition-all duration-500 ${
                location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />

              {/* Minimal Dropdown */}
              {item.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-2 w-56 shadow-2xl backdrop-blur-3xl">
                    {item.dropdown.map((sub) => (
                      <Link 
                        key={sub.label} 
                        to={sub.path}
                        className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all"
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          handleNavHover(sub.path);
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button href="/contact" variant="primary" className="px-8 py-2.5 text-[10px] tracking-widest uppercase">
            Start Project
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-[1100] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
          <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4 ml-auto'}`}></span>
          <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1050] lg:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-3xl"></div>
        <div className="relative h-full flex flex-col pt-32 px-10">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, idx) => (
              <Link 
                key={item.label}
                to={item.path}
                className="py-5 border-b border-white/5 flex items-center justify-between group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={`text-2xl font-orbitron font-bold tracking-tight transition-colors ${
                  location.pathname === item.path ? 'text-[#00A3FF]' : 'text-white'
                }`}>
                  {item.label}
                </span>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#00A3FF] transition-colors" />
              </Link>
            ))}
          </div>
          <div className="mt-auto mb-16">
            <Button href="/contact" variant="primary" className="w-full py-5 rounded-2xl">
              Collaborate Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
