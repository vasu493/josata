
import React from 'react';

const Logo: React.FC<{ className?: string; hideTextMobile?: boolean }> = ({ 
  className = "h-12", 
  hideTextMobile = false 
}) => {
  return (
    <div className={`flex flex-col items-start justify-center group select-none cursor-pointer relative ${className}`}>
      {/* Main Branding: JOSATA */}
      <div className="relative overflow-hidden">
        <span className="text-2xl md:text-3xl font-orbitron font-black tracking-tighter text-white relative z-10 block group-hover:text-[#00A3FF] transition-colors duration-500">
          JOSATA
          {/* Shimmer Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></span>
        </span>
      </div>

      {/* Sub-branding: TECHNOLOGIES */}
      <div className={`flex items-center gap-2 ${hideTextMobile ? 'hidden sm:flex' : 'flex'}`}>
        <span className="text-[9px] font-bold tracking-[0.55em] uppercase text-gray-300 group-hover:text-white transition-colors duration-500">
          Technologies
        </span>
      </div>

      {/* Animated Underline / Neural Pulse */}
      <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00A3FF] to-[#A855F7] group-hover:w-full transition-all duration-700 ease-out overflow-hidden">
        <div className="w-full h-full animate-pulse-fast bg-white/20"></div>
      </div>

      {/* Background Glow on Hover */}
      <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-[#00A3FF]/5 to-[#A855F7]/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 1s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Logo;
