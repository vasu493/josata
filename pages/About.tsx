
import React, { useEffect, useRef, useMemo, Suspense, useState } from 'react';
import Button from '../components/Button';
import { Target, Eye, Shield, Zap, Globe, Award, ChevronRight, ArrowUpRight, Cpu, Database, Users, Building2, Briefcase } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Background Components (About Page Unique Style) ---

const ArchitecturalLattice = () => {
  const meshRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(time * 0.5) * 12;
      lightRef.current.position.z = Math.cos(time * 0.5) * 12;
    }
  });

  const pillars = useMemo(() => {
    const arr = [];
    const colors = ['#00A3FF', '#A855F7', '#ffffff'];
    for (let i = 0; i < 8; i++) {
      arr.push({
        position: [
          Math.cos((i / 8) * Math.PI * 2) * 6,
          (Math.random() - 0.5) * 4,
          Math.sin((i / 8) * Math.PI * 2) * 6
        ] as [number, number, number],
        color: colors[i % colors.length],
        scale: 0.5 + Math.random() * 1.5,
        speed: 0.5 + Math.random()
      });
    }
    return arr;
  }, []);

  return (
    <group ref={meshRef}>
      <pointLight ref={lightRef} distance={25} intensity={10} color="#A855F7" />
      <Stars radius={100} depth={50} count={3000} factor={6} saturation={0} fade speed={0.5} />
      
      {pillars.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1}>
          <mesh position={p.position} scale={[0.1, p.scale, 0.1]}>
            <boxGeometry args={[1, 10, 1]} />
            <meshStandardMaterial 
              color={p.color} 
              emissive={p.color} 
              emissiveIntensity={2} 
              transparent 
              opacity={0.15} 
              wireframe 
            />
          </mesh>
        </Float>
      ))}

      <gridHelper 
        args={[30, 30, '#00A3FF', '#000000']} 
        position={[0, -8, 0]} 
        onUpdate={(self) => {
          if (self.material instanceof THREE.Material) {
            self.material.transparent = true;
            self.material.opacity = 0.05;
          }
        }} 
      />
    </group>
  );
};

const ValueCard = ({ value, i }: { value: any, i: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] p-10 h-full flex flex-col transition-all duration-700 hover:border-[#00A3FF]/50 hover:scale-[1.03] overflow-hidden shadow-2xl cursor-pointer reveal opacity-0 translate-y-10"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-40 transition-opacity duration-1000">
        <img 
          src={value.img} 
          alt={value.title} 
          className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2.5s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#A855F7] transition-all duration-500 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#A855F7] to-[#00A3FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 text-[#A855F7] group-hover:text-white transition-colors">
            {React.cloneElement(value.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-orbitron font-black text-white mb-6 group-hover:text-[#A855F7] transition-colors leading-tight uppercase tracking-tighter">
          {value.title}
        </h3>

        <div className="relative min-h-[5rem] overflow-hidden mb-8">
          <p className={`text-sm md:text-base leading-relaxed font-light transition-all duration-1000 ${isHovered ? 'text-white translate-x-0 opacity-100' : 'text-gray-500 translate-x-4 opacity-100'}`}>
            {value.desc}
          </p>
          <div className={`absolute inset-0 bg-[#0D0D0D] z-20 transition-transform duration-[1s] ease-in-out pointer-events-none ${isHovered ? 'translate-x-full' : 'translate-x-0 opacity-0'}`}></div>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between group/link">
          <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
            Core Protocol
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#A855F7] group-hover:border-[#A855F7] transition-all transform group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 bg-[#A855F7]/5 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

const ABOUT_SLIDER_IMAGES = [
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200", label: "Collaborative Intelligence", code: "TEAM_SYNC.01" },
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", label: "Strategic Global HQ", code: "HQ_NODE.02" },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200", label: "Principal Engineering", code: "CORE_DEV.03" },
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", label: "Innovation Laboratory", code: "R&D_ZONE.04" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", label: "Future Roadmaps", code: "PLAN_V3.05" }
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % ABOUT_SLIDER_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

  const values = [
    { icon: <Shield />, title: 'Integrity', desc: 'Absolute transparency in every neural connection. We build trust through code.', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600' },
    { icon: <Zap />, title: 'Velocity', desc: 'Rapid deployment without systemic instability. We engineer for speed and scale.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' },
    { icon: <Globe />, title: 'Sovereignty', desc: 'Giving clients control over their digital destiny in an interconnected world.', img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600' },
    { icon: <Award />, title: 'Legacy', desc: 'Building high-performance systems that outlast technological cycles and trends.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600' }
  ];

  return (
    <div ref={containerRef} className="pt-24 md:pt-32 pb-16 overflow-hidden min-h-screen relative z-10">
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-50">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 30]} />
            <ambientLight intensity={0.5} />
            <ArchitecturalLattice />
          </Canvas>
        </Suspense>
      </div>

      <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 space-y-10 z-10 drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            <div className="space-y-6">
              <span className="text-[#A855F7] font-black tracking-[0.5em] uppercase text-[9px] px-6 py-2.5 bg-white/5 backdrop-blur-3xl rounded-full inline-flex items-center gap-3 border border-white/10">
                <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full animate-pulse shadow-[0_0_10px_#A855F7]"></span>
                Origin & Evolution
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black text-white leading-[0.85] tracking-tighter">
                Defining <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-white to-[#00A3FF] bg-[length:200%_auto] animate-flow-gradient">Excellence</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-xl font-light">
                Founded on the principles of architectural precision and digital sovereignty. We are not just developers; we are the architects of your digital legacy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center pt-2">
              <Button href="/contact" className="px-14 py-6 text-[11px] uppercase tracking-[0.4em] min-w-[240px] shadow-3xl bg-gradient-to-r from-[#A855F7] to-[#00A3FF]">
                Our Mission
              </Button>
              <div className="flex items-center gap-4 text-gray-500 font-black text-[9px] tracking-[0.5em] uppercase">
                <span className="w-10 h-[1px] bg-white/20"></span>
                Since 2018
              </div>
            </div>
          </div>

          <div className="relative h-[450px] md:h-[550px] reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 z-10">
            <div className="absolute inset-0 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-xl group/slider">
              <div className="absolute inset-0">
                {ABOUT_SLIDER_IMAGES.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1200 cubic-bezier(0.4, 0, 0.2, 1) ${
                      currentImgIdx === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110 blur-xl'
                    }`}
                  >
                    <img 
                      src={img.url} 
                      className="w-full h-full object-cover grayscale brightness-50 group-hover/slider:grayscale-0 group-hover/slider:brightness-90 transition-all duration-[5s]" 
                      alt={img.label} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="bg-black/80 backdrop-blur-3xl border border-white/10 p-5 rounded-3xl">
                      <p className="text-[#A855F7] font-black text-[10px] tracking-[0.5em] uppercase mb-1">{ABOUT_SLIDER_IMAGES[currentImgIdx].code}</p>
                      <div className="w-12 h-0.5 bg-[#A855F7]/60 rounded-full"></div>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl animate-pulse">
                      <Users className="w-5 h-5 text-[#A855F7]" />
                   </div>
                </div>

                <div className="space-y-6 drop-shadow-2xl">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.6em] uppercase">Enterprise Vision</p>
                    <h3 className="text-2xl md:text-4xl font-orbitron font-black text-white uppercase tracking-tighter">{ABOUT_SLIDER_IMAGES[currentImgIdx].label}</h3>
                  </div>
                  <div className="flex gap-2">
                    {ABOUT_SLIDER_IMAGES.map((_, i) => (
                      <div key={i} className={`h-1 flex-grow rounded-full transition-all duration-700 ${currentImgIdx === i ? 'bg-[#A855F7] shadow-[0_0_15px_#00A3FF]' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="w-full h-1 bg-white blur-xl animate-scanline"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/[0.02] backdrop-blur-md py-24 md:py-32 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="text-[#00A3FF] font-black tracking-[0.5em] uppercase text-[11px]">Ethical Framework</span>
            <h2 className="text-4xl md:text-7xl font-orbitron font-black text-white uppercase tracking-tighter">The Dynamic Code</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#A855F7] to-[#00A3FF] mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(0,163,255,0.4)]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ValueCard key={i} value={v} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden group shadow-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_#A855F711_0%,_transparent_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#00A3FF11_0%,_transparent_60%)]"></div>
          
          <div className="relative z-10 space-y-8 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-7xl font-orbitron font-black text-white leading-[0.9] tracking-tighter">
              A Global Hub of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-white to-[#00A3FF] bg-[length:200%_auto] animate-flow-gradient">Architectural Genius</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Based in Visakhapatnam, serving the world's most ambitious enterprises. Our center of excellence is ready for your next breakthrough.
            </p>
            <div className="pt-6">
              <Button href="/contact" className="px-16 py-6 border-white/10 hover:border-[#A855F7] group uppercase tracking-[0.5em] text-[12px] shadow-3xl bg-white/5">
                Join the Network
                <Globe className="w-5 h-5 ml-4 group-hover:animate-spin transition-all" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes flow-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-flow-gradient {
          animation: flow-gradient 10s ease infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-200%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(800%); opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(168, 85, 247, 0.25);
        }
      `}</style>
    </div>
  );
};

export default About;
