
import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import Button from '../components/Button';
import { ArrowRight, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    const elements = scrollRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const partnerLogos = [
    { name: 'Nvidia', url: 'https://cdn.worldvectorlogo.com/logos/nvidia.svg' },
    { name: 'Google Cloud', url: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
    { name: 'Microsoft', url: 'https://cdn.worldvectorlogo.com/logos/microsoft-6.svg' },
    { name: 'AWS', url: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
    { name: 'Cisco', url: 'https://cdn.worldvectorlogo.com/logos/cisco-2.svg' },
    { name: 'Oracle', url: 'https://cdn.worldvectorlogo.com/logos/oracle-6.svg' },
  ];

  return (
    <div ref={scrollRef} className="overflow-hidden">
      <Hero />
      
      {/* Partner Scroller */}
      <section className="py-10 border-y border-white/5 bg-[#080808]/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[9px] uppercase font-black tracking-[0.4em] text-gray-500 mb-6 animate-pulse">
            Trusted by Industry Leaders
          </p>
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee-fast whitespace-nowrap gap-12 items-center py-2">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
                <img key={i} src={logo.url} alt={logo.name} className="h-6 md:h-10 w-auto grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer filter brightness-200" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <TechStack />
      
      <Stats />
      <Services />

      {/* Testimonials */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12 md:mb-16 space-y-3">
              <span className="text-[#A855F7] font-black tracking-widest uppercase text-[9px]">Client Intelligence</span>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white">Consensus & Feedback</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Emily Watson", role: "CTO, FinEdge Inc.", text: "Working with Josata was a game-changer for our cloud architecture. Their engineers are top-notch.", avatar: "https://i.pravatar.cc/150?u=1" },
                { name: "Robert Klein", role: "VP of Product, SaaSly", text: "The custom dashboard they built allowed us to visualize data like never before. Incredible speed and quality.", avatar: "https://i.pravatar.cc/150?u=2" },
                { name: "Meera Gupta", role: "CEO, HealthTech Solutions", text: "Professionalism and technical depth are Josata's strengths. They really understood our security needs.", avatar: "https://i.pravatar.cc/150?u=3" }
              ].map((t, i) => (
                <div key={i} className="bg-[#111]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 space-y-6 hover:border-[#00A3FF]/40 transition-all duration-500 group animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex text-[#00A3FF] gap-1">
                    {[...Array(5)].map((_, i) => <Zap key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-gray-300 text-lg font-light italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 ring-2 ring-white/5 group-hover:ring-[#00A3FF]/50" alt={t.name} />
                    <div>
                        <h5 className="font-bold text-white text-base">{t.name}</h5>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#111111] border border-white/10 rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden group">
            {/* Animated gradients for CTA */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_#00A3FF33_0%,_transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#A855F733_0%,_transparent_50%)]"></div>
            
            <div className="relative z-10 space-y-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <h2 className="text-4xl md:text-7xl font-orbitron font-black text-white leading-none tracking-tighter">
                Let's Architect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#A855F7] animate-pulse">Your Legacy</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto font-light">
                Secure a strategic session with our principal engineers to unlock the true potential of your digital ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                <Button href="/contact" className="px-10 py-4 text-base scale-105 shadow-3xl">
                    Initiate Project
                </Button>
                <button className="text-white font-black tracking-[0.3em] uppercase text-[10px] hover:text-[#00A3FF] transition-all flex items-center gap-2 group/alt">
                    Exploration Mode <ArrowRight className="w-3 h-3 group-hover/alt:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 30s linear infinite;
        }
        @keyframes gradient-text {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }
        .animate-gradient-text {
          animation: gradient-text 8s infinite ease-in-out;
        }
        .shadow-3xl {
          box-shadow: 0 30px 80px -20px rgba(0, 163, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
