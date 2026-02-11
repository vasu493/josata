
import React, { useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { Layout, Settings, Rocket, Headphones, ArrowRight } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    const reveals = containerRef.current?.querySelectorAll('.reveal');
    reveals?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const processes = [
    { icon: <Layout className="w-6 h-6" />, title: 'Plan', desc: 'Strategy sessions to define architecture and goals.' },
    { icon: <Settings className="w-6 h-6" />, title: 'Develop', desc: 'Agile sprints with high-quality engineering.' },
    { icon: <Rocket className="w-6 h-6" />, title: 'Deploy', desc: 'Seamless cloud integration and launch.' },
    { icon: <Headphones className="w-6 h-6" />, title: 'Support', desc: '24/7 maintenance and iterative optimization.' }
  ];

  return (
    <div ref={containerRef} className="pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 text-center">
        <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
          <span className="text-[#A855F7] font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">What We Do</span>
          <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white mb-6">
            Superior Tech <span className="text-[#00A3FF]">Expertise</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            From modernizing legacy stacks to building AI-driven cloud ecosystems, we provide the full spectrum of IT services for the forward-thinking enterprise.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="reveal opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${i * 100}ms` }}>
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#0D0D0D] py-24 md:py-32 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black tracking-[0.5em] text-[#00A3FF] uppercase block mb-4">Methodology</span>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white">Our Delivery Process</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto rounded-full mt-6 shadow-[0_0_15px_#00A3FF]"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10 -translate-y-12"></div>
            
            {processes.map((p, i) => (
              <div 
                key={i} 
                className="group relative bg-[#151515] p-10 rounded-[2.5rem] border border-white/5 transition-all duration-700 hover:border-[#00A3FF]/40 hover:-translate-y-4 hover:bg-[#1a1a1a] shadow-2xl hover:shadow-[#00A3FF]/5 reveal opacity-0 translate-y-10 transition-all duration-1000 overflow-hidden cursor-default" 
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3FF]/0 via-[#00A3FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-tr from-[#00A3FF] to-[#A855F7] rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {p.icon}
                  </div>
                  
                  <h4 className="text-2xl font-orbitron font-black mb-4 text-white group-hover:text-[#00A3FF] transition-colors">{p.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                    {p.desc}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Big Background Number */}
                <div className="absolute top-4 right-6 text-6xl font-orbitron font-black text-white/[0.03] group-hover:text-white/[0.08] transition-all duration-700 select-none">
                  0{i+1}
                </div>
                
                {/* Bottom Accent Bar */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] transition-all duration-700 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -bottom-1/2 -left-1/4 w-[60%] h-[60%] bg-[#00A3FF]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -top-1/2 -right-1/4 w-[60%] h-[60%] bg-[#A855F7]/5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>
    </div>
  );
};

export default ServicesPage;
