
import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  // @ts-ignore
  const Icon = LucideIcons[service.icon] || LucideIcons.Layers;

  const imageMap: Record<string, string> = {
    'it-consulting': 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    'software-dev': 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800',
    'cloud': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    'data-analytics': 'https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=800',
    'cybersecurity': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    'digital-transformation': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  };

  const bgImage = imageMap[service.id] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0D0D0D] border border-white/20 rounded-[2.5rem] p-10 h-full flex flex-col transition-all duration-700 hover:border-[#00A3FF]/50 hover:scale-[1.03] hover:z-20 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Dynamic Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 opacity-15 group-hover:opacity-60 transition-opacity duration-1000 overflow-hidden">
        <img 
          src={bgImage} 
          alt={service.title} 
          className="w-full h-full object-cover grayscale brightness-75 animate-ken-burns transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]"></div>
      </div>

      {/* Border Beam Effect */}
      <div className={`absolute inset-0 border-[1px] border-[#00A3FF]/40 rounded-[2.5rem] pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 w-20 h-1 bg-[#00A3FF] blur-md animate-beam-travel"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#00A3FF] transition-all duration-500 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3FF] to-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Icon className="w-8 h-8 text-[#00A3FF] group-hover:text-white transition-all duration-500 relative z-10" />
        </div>

        <h3 className="text-3xl md:text-4xl font-orbitron font-black mb-6 text-white group-hover:text-[#00A3FF] transition-colors leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          {service.title}
        </h3>

        {/* Writing Effect Description - Bright White on Hover */}
        <div className="relative min-h-[5rem] mb-10 overflow-hidden">
          <p className={`text-lg font-medium leading-relaxed transition-all duration-1000 ${isHovered ? 'text-white translate-x-0 opacity-100' : 'text-transparent translate-x-4 opacity-0'}`}>
            {service.description}
          </p>
          <div className={`absolute inset-0 bg-[#0D0D0D] z-20 transition-transform duration-[1.2s] ease-in-out pointer-events-none ${isHovered ? 'translate-x-full' : 'translate-x-0 opacity-0'}`}></div>
        </div>
        
        <div className="space-y-5 mt-auto">
          {service.details.slice(0, 3).map((detail, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-4 text-[12px] font-black tracking-[0.25em] uppercase transition-all duration-700 ease-out transform ${
                isHovered 
                ? 'opacity-100 translate-x-0 text-white' 
                : 'opacity-0 -translate-x-8 text-gray-500'
              }`}
              style={{ transitionDelay: isHovered ? `${(i + 1) * 200 + 400}ms` : '0ms' }}
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-[#00A3FF] shadow-[0_0_20px_#00A3FF] transition-transform duration-500 ${isHovered ? 'scale-100' : 'scale-0'}`}></div>
              <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {detail}
                <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#00A3FF] transition-all duration-700 ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}`} style={{ transitionDelay: isHovered ? `${(i + 1) * 200 + 600}ms` : '0ms' }}></span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex items-center justify-between group/link">
          <span className={`text-[11px] font-black tracking-[0.5em] uppercase transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-400'}`}>
            Architectural Analysis
          </span>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#00A3FF] group-hover:border-[#00A3FF] group-hover:text-white transition-all transform group-hover:rotate-45 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
            <LucideIcons.ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Deep Hover Glow */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00A3FF]/30 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      <style>{`
        @keyframes beam-travel {
          0% { transform: translate(-100%, 0); }
          50% { transform: translate(400%, 0); }
          100% { transform: translate(-100%, 0); }
        }
        .animate-beam-travel {
          animation: beam-travel 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;
