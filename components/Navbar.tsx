
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Plus, Minus, X, Menu } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Reset menu states on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  }, [location.pathname]);

  const toggleMobileDropdown = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[8000] transition-all duration-500 ${
      isScrolled || isMobileMenuOpen 
        ? 'bg-[#050505]/95 backdrop-blur-2xl py-2 border-b border-white/5' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14 md:h-16 relative z-[9000]">
        <Link to="/" className="relative">
          <Logo className="h-auto" hideTextMobile={isMobileMenuOpen} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative group">
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

              {/* Dropdown */}
              {item.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-2 w-56 shadow-2xl backdrop-blur-3xl">
                    {item.dropdown.map((sub) => (
                      <Link 
                        key={sub.label} 
                        to={sub.path}
                        className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all"
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

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden relative w-12 h-12 flex items-center justify-center focus:outline-none bg-white/5 rounded-xl border border-white/10 group transition-all hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
             <X className={`absolute w-6 h-6 text-white transition-all duration-500 ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`} />
             <Menu className={`absolute w-6 h-6 text-white transition-all duration-500 ${isMobileMenuOpen ? '-rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[8500] lg:hidden transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#050505] backdrop-blur-3xl"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative h-full flex flex-col justify-start pt-32 px-10 overflow-y-auto pb-20">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, index) => (
              <div 
                key={item.label} 
                className={`flex flex-col border-b border-white/5 transition-all duration-700 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <div 
                  className="py-6 flex items-center justify-between group cursor-pointer"
                  onClick={(e) => {
                    if (item.dropdown) {
                      toggleMobileDropdown(item.label, e);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <Link 
                    to={item.path}
                    className="flex-grow block"
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <span className={`text-3xl font-orbitron font-black tracking-tight uppercase transition-all duration-500 ${
                      location.pathname === item.path ? 'text-[#00A3FF]' : 'text-white group-hover:text-[#00A3FF]'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                  
                  {item.dropdown ? (
                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full">
                      {openMobileDropdown === item.label ? <Minus className="w-5 h-5 text-[#00A3FF]" /> : <Plus className="w-5 h-5 text-gray-500" />}
                    </div>
                  ) : (
                    <ArrowRight className="w-5 h-5 text-white/20" />
                  )}
                </div>

                {/* Mobile Dropdown Sub-items */}
                {item.dropdown && (
                  <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
                    openMobileDropdown === item.label ? 'max-h-[500px] mb-8 mt-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="text-gray-400 text-sm py-2 hover:text-white border-l-2 border-white/5 pl-6 font-bold uppercase tracking-widest transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={`mt-12 transition-all duration-1000 delay-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button href="/contact" variant="primary" className="w-full py-5 rounded-2xl text-base uppercase tracking-[0.4em] font-black shadow-[0_20px_50px_rgba(0,163,255,0.3)]">
              Protocol Initiate
            </Button>
            <div className="mt-10 flex justify-center items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-pulse shadow-[0_0_10px_#00A3FF]"></div>
                   <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Node.01</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse shadow-[0_0_10px_#A855F7]"></div>
                   <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">Sync.Active</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
