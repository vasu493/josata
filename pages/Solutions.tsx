import React, { useEffect, useRef, useMemo, Suspense, useState } from 'react';
import Button from '../components/Button';
import { Briefcase, Activity, ShoppingCart, Cpu, ArrowUpRight, Database, ChevronRight, Laptop, Server, Monitor, Smartphone, Globe } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Background Components (Home Page Style) ---

const TechNode = ({ position, Icon, color }: { position: [number, number, number], Icon: any, color: string }) => {
  return (
    <group position={position}>
      <Billboard>
        <Html center distanceFactor={12}>
          <div 
            className="p-3 rounded-2xl bg-[#050505]/60 border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl"
            style={{ boxShadow: `0 0 20px ${color}11` }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color, filter: `drop-shadow(0 0 8px ${color})` }} />
          </div>
        </Html>
      </Billboard>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const FloatingDecorations = () => {
  const items = useMemo(() => {
    const arr = [];
    const colors = ['#00A3FF', '#A855F7', '#ffffff'];
    for (let i = 0; i < 15; i++) {
      arr.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.1 + Math.random() * 0.2,
        type: Math.random() > 0.4 ? 'sphere' : 'pyramid',
        speed: 0.3 + Math.random() * 0.4
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {items.map((item, i) => (
        <Float key={i} speed={item.speed} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={item.position} scale={item.scale}>
            {item.type === 'sphere' ? <sphereGeometry args={[1, 32, 32]} /> : <coneGeometry args={[1, 1.5, 4]} />}
            <meshStandardMaterial 
              color={item.color} 
              emissive={item.color} 
              emissiveIntensity={1.5} 
              transparent 
              opacity={0.08} 
              wireframe={item.type === 'pyramid'}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const NeuralEcosystem = () => {
  const meshRef = useRef<THREE.LineSegments>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const nodes = useMemo(() => [
    { position: [-4, 3, -2] as [number, number, number], icon: Laptop, color: "#00A3FF" },
    { position: [5, -2, -3] as [number, number, number], icon: Server, color: "#A855F7" },
    { position: [-3, -4, -1] as [number, number, number], icon: Monitor, color: "#00A3FF" },
    { position: [3, 4, -4] as [number, number, number], icon: Cpu, color: "#A855F7" },
    { position: [0, 0, -2] as [number, number, number], icon: Globe, color: "#ffffff" },
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(time * 0.5) * 10;
      lightRef.current.position.y = Math.cos(time * 0.3) * 5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.05;
      meshRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group>
      <pointLight ref={lightRef} distance={20} intensity={6} color="#00A3FF" />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      
      {nodes.map((n, i) => (
        <TechNode key={i} position={n.position} Icon={n.icon} color={n.color} />
      ))}
      
      <lineSegments ref={meshRef}>
        <sphereGeometry args={[12, 16, 16]} />
        <lineBasicMaterial color="#00A3FF" transparent opacity={0.03} />
      </lineSegments>

      <FloatingDecorations />
    </group>
  );
};

// --- Sector Framework Card Component ---

const SectorCard = ({ ind, i }: { ind: any, i: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] p-10 h-full flex flex-col transition-all duration-700 hover:border-[#00A3FF]/50 hover:scale-[1.03] overflow-hidden shadow-2xl cursor-pointer reveal opacity-0 translate-y-10"
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      {/* Background Image Reveal */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-40 transition-opacity duration-1000">
        <img 
          src={ind.img} 
          alt={ind.title} 
          className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#00A3FF] transition-all duration-500 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3FF] to-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-[#00A3FF] group-hover:text-white transition-colors">
            {/* Fix: Specifically casting ind.icon to React.ReactElement<any> to resolve the 'className' prop type error in cloneElement */}
            {React.cloneElement(ind.icon as React.ReactElement<any>, { className: "w-7 h-7" })}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-orbitron font-black text-white mb-6 group-hover:text-[#00A3FF] transition-colors leading-tight uppercase tracking-tighter">
          {ind.title}
        </h3>

        {/* Writing/Reveal Effect Animation */}
        <div className="relative min-h-[5rem] overflow-hidden mb-8">
          <p className={`text-sm md:text-base leading-relaxed font-light transition-all duration-1000 ${isHovered ? 'text-white translate-x-0 opacity-100' : 'text-gray-500 translate-x-4 opacity-100'}`}>
            {ind.desc}
          </p>
          <div className={`absolute inset-0 bg-[#0D0D0D] z-20 transition-transform duration-[1s] ease-in-out pointer-events-none ${isHovered ? 'translate-x-full' : 'translate-x-0 opacity-0'}`}></div>
        </div>

        <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between group/link">
          <span className={`text-[10px] font-black tracking-[0.4em] uppercase transition-colors duration-500 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
            Structural Sync
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#00A3FF] group-hover:border-[#00A3FF] transition-all transform group-hover:rotate-45">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Hover Beam Effect */}
      <div className={`absolute top-0 left-0 w-24 h-0.5 bg-[#00A3FF] blur-sm transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'} animate-beam`}></div>
    </div>
  );
};

// --- Page Component ---

const SOLUTION_IMAGES = [
  { url: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=1200", label: "Predictive Analytics", code: "DATA_NODE.01" },
  { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200", label: "Bio-Tech Sync", code: "BIO_CORE.02" },
  { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200", label: "Autonomous Systems", code: "AUTO_MECH.03" },
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", label: "Cloud Governance", code: "CLOUD_STRAT.04" },
  { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", label: "Quantum Security", code: "SEC_PROTOCOL.05" }
];

const Solutions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % SOLUTION_IMAGES.length);
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

  const industries = [
    { icon: <Briefcase />, title: 'Finance', desc: 'Secure decentralized ledgers and high-frequency trading pipes.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
    { icon: <Activity />, title: 'Healthcare', desc: 'Neural-linked diagnostic tools and distributed patient data clouds.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' },
    { icon: <ShoppingCart />, title: 'Logistics', desc: 'Global supply-chain optimization through autonomous AI routers.', img: 'https://images.unsplash.com/photo-1551288049-bbbda5366a7a?auto=format&fit=crop&q=80&w=800' },
    { icon: <Cpu />, title: 'Manuf.', desc: 'Real-time structural health monitoring for industrial heavy-lifts.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <div ref={containerRef} className="pt-24 md:pt-32 pb-16 overflow-hidden min-h-screen relative">
      
      {/* Immersive 3D Background (Home Page Style) */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-40">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 8, 25]} />
            <ambientLight intensity={0.4} />
            <NeuralEcosystem />
          </Canvas>
        </Suspense>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 space-y-10 z-10 drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]">
            <div className="space-y-6">
              <span className="text-[#00A3FF] font-black tracking-[0.5em] uppercase text-[9px] px-6 py-2.5 bg-white/5 backdrop-blur-3xl rounded-full inline-flex items-center gap-3 border border-white/10">
                <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-pulse shadow-[0_0_10px_#00A3FF]"></span>
                Strategic Deployment Protocol
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black text-white leading-[0.85] tracking-tighter">
                Evolving <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#A855F7] bg-[length:200%_auto] animate-flow-gradient">Intelligence</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-xl font-light">
                Engineering specialized software ecosystems that adapt to market volatility in real-time. We architect digital sovereignty for the global elite.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center pt-2">
              <Button href="/contact" className="px-14 py-6 text-[11px] uppercase tracking-[0.4em] min-w-[240px] shadow-3xl">
                Consultation
              </Button>
              <div className="flex items-center gap-4 text-gray-500 font-black text-[9px] tracking-[0.5em] uppercase">
                <span className="w-10 h-[1px] bg-white/20"></span>
                System Status: Active
              </div>
            </div>
          </div>

          {/* Cinematic Slider - Decreased Height */}
          <div className="relative h-[450px] md:h-[550px] reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 z-10">
            <div className="absolute inset-0 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-xl group/slider">
              
              <div className="absolute inset-0">
                {SOLUTION_IMAGES.map((img, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-all duration-1200 cubic-bezier(0.4, 0, 0.2, 1) ${
                      currentImgIdx === idx ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-xl'
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

              {/* HUD */}
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="bg-black/80 backdrop-blur-3xl border border-white/10 p-5 rounded-3xl">
                      <p className="text-[#00A3FF] font-black text-[10px] tracking-[0.5em] uppercase mb-1">{SOLUTION_IMAGES[currentImgIdx].code}</p>
                      <div className="w-12 h-0.5 bg-[#00A3FF]/60 rounded-full"></div>
                   </div>
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl animate-pulse">
                      <Database className="w-5 h-5 text-[#00A3FF]" />
                   </div>
                </div>

                <div className="space-y-6 drop-shadow-2xl">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.6em] uppercase">Strategic Module</p>
                    <h3 className="text-2xl md:text-4xl font-orbitron font-black text-white uppercase tracking-tighter">{SOLUTION_IMAGES[currentImgIdx].label}</h3>
                  </div>
                  <div className="flex gap-2">
                    {SOLUTION_IMAGES.map((_, i) => (
                      <div key={i} className={`h-1 flex-grow rounded-full transition-all duration-700 ${currentImgIdx === i ? 'bg-[#00A3FF] shadow-[0_0_15px_#00A3FF]' : 'bg-white/10'}`}></div>
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

      {/* Sector Frameworks Section */}
      <section className="bg-white/[0.02] backdrop-blur-md py-24 md:py-32 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="text-[#A855F7] font-black tracking-[0.5em] uppercase text-[11px]">Vertical Integration</span>
            <h2 className="text-4xl md:text-7xl font-orbitron font-black text-white uppercase tracking-tighter">Sector Frameworks</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((ind, i) => (
              <SectorCard key={i} ind={ind} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#0A0A0A]/90 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden group shadow-3xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_#00A3FF11_0%,_transparent_60%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#A855F711_0%,_transparent_60%)]"></div>
          
          <div className="relative z-10 space-y-8 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-7xl font-orbitron font-black text-white leading-[0.9] tracking-tighter">
              Initiate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#A855F7] bg-[length:200%_auto] animate-flow-gradient">Ecosystem Sync</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Our principal engineers build the custom logic your market dominance requires. Secure your architecture session today.
            </p>
            <div className="pt-6">
              <Button href="/contact" className="px-16 py-6 border-white/10 hover:border-[#00A3FF] group uppercase tracking-[0.5em] text-[12px] shadow-3xl">
                Protocol Start
                <ArrowUpRight className="w-5 h-5 ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
        @keyframes beam {
          0% { left: -100%; }
          100% { left: 400%; }
        }
        .animate-beam {
          animation: beam 4s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0, 163, 255, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Solutions;