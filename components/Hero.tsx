
import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { ArrowRight, Play, Cpu, Laptop, Server, Monitor, Smartphone } from 'lucide-react';
import Button from './Button';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Billboard, Html } from '@react-three/drei';
import * as THREE from 'three';

// Specialized 3D pyramid component for structural background
const Pyramid = ({ position, rotation, color, scale }: { position: [number, number, number], rotation: [number, number, number], color: string, scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z += 0.001;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.001;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef} scale={scale}>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5} 
          wireframe 
          transparent 
          opacity={0.08}
        />
      </mesh>
    </group>
  );
};

// Tech Icon Node Component
const TechNode = ({ position, Icon, color }: { position: [number, number, number], Icon: any, color: string }) => {
  return (
    <group position={position}>
      <Billboard>
        <Html center distanceFactor={10}>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md">
            <Icon className="w-4 h-4" style={{ color }} />
          </div>
        </Html>
      </Billboard>
      {/* Subtle core glow behind the icon */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Component for glowing neural signals/packets
const NeuralPackets = ({ points, connections }: { points: [number, number, number][], connections: [number, number][] }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && connections.length > 0) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const connIdx = i % connections.length;
        const [startIdx, endIdx] = connections[connIdx];
        const start = points[startIdx];
        const end = points[endIdx];
        
        const t = (state.clock.elapsedTime * 0.6 + i * 0.3) % 1;
        
        mesh.position.set(
          start[0] + (end[0] - start[0]) * t,
          start[1] + (end[1] - start[1]) * t,
          start[2] + (end[2] - start[2]) * t
        );
        
        const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 8 + i) * 0.5;
        mesh.scale.setScalar(0.04 + pulse * 0.04);
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissiveIntensity = 25 * pulse;
          mesh.material.opacity = 0.3 + pulse * 0.7;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#00A3FF" 
            emissive="#00A3FF" 
            transparent 
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Proximity-based Neural Connections
const NeuralConnections = ({ points }: { points: [number, number, number][] }) => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const threshold = 5.5; // Reduced distance to avoid "very long" lines

  const { geometry, validConnections } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const conns: [number, number][] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const d = Math.sqrt(
          (points[i][0] - points[j][0])**2 + 
          (points[i][1] - points[j][1])**2 + 
          (points[i][2] - points[j][2])**2
        );
        if (d < threshold) {
          vertices.push(...points[i], ...points[j]);
          conns.push([i, j]);
        }
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return { geometry: geo, validConnections: conns };
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity;
    }
  });

  return (
    <>
      <lineSegments ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#00A3FF" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <NeuralPackets points={points} connections={validConnections} />
    </>
  );
};

const HeroVisual = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Mix of Pyramids and Tech Icons
  const nodes = useMemo(() => [
    { position: [-3, 2, -2] as [number, number, number], type: 'pyramid', color: "#00A3FF", icon: null },
    { position: [4, -1.5, -3] as [number, number, number], type: 'icon', color: "#A855F7", icon: Laptop },
    { position: [-2, -3, -1] as [number, number, number], type: 'icon', color: "#00A3FF", icon: Server },
    { position: [2.5, 3.5, -4] as [number, number, number], type: 'pyramid', color: "#A855F7", icon: null },
    { position: [1, -0.5, -2] as [number, number, number], type: 'icon', color: "#00A3FF", icon: Monitor },
    { position: [-5, -1, -5] as [number, number, number], type: 'icon', color: "#00A3FF", icon: Smartphone },
    { position: [0, 4, -1] as [number, number, number], type: 'pyramid', color: "#A855F7", icon: null },
    { position: [6, 1, -4] as [number, number, number], type: 'icon', color: "#A855F7", icon: Cpu },
    { position: [-4, 4, -3] as [number, number, number], type: 'icon', color: "#00A3FF", icon: Laptop },
  ], []);

  const pointPositions = useMemo(() => nodes.map(n => n.position), [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.x += state.mouse.y * 0.005;
      groupRef.current.rotation.y += state.mouse.x * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        n.type === 'pyramid' ? (
          <Pyramid key={i} position={n.position} rotation={[0, 0, 0]} color={n.color} scale={0.8} />
        ) : (
          <TechNode key={i} position={n.position} Icon={n.icon} color={n.color} />
        )
      ))}
      <NeuralConnections points={pointPositions} />
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={0.4} />
    </group>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(HERO_IMAGES.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIdx]);

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

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-16"
    >
      {/* 3D Background Layer with Neural Motion */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <HeroVisual />
          </Canvas>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Left Content */}
        <div className="space-y-12 relative">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100">
            <span className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 px-6 py-2 rounded-full text-[9px] font-black tracking-[0.5em] text-[#00A3FF] uppercase shadow-2xl">
              <span className="w-1.5 h-1.5 bg-[#00A3FF] rounded-full animate-pulse"></span>
              Architecting Digital Futures
            </span>
          </div>
          
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-orbitron font-black leading-[0.85] text-white tracking-tighter cursor-default">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#A855F7] bg-[length:200%_auto] animate-flow-gradient uppercase mb-1">
                JOSATA
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-white to-[#A855F7] bg-[length:200%_auto] animate-flow-gradient uppercase">
                TECHNOLOGIES
              </span>
            </h1>
          </div>
          
          <p className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-500 text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed font-light">
            Specialized digital ecosystems engineered for sovereignty and performance. Connecting hardware and software into high-speed structural reality.
          </p>
          
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-700 flex flex-col sm:flex-row items-center gap-8 pt-4">
            <Button href="/services" variant="primary" className="group px-12 py-6 text-[11px] uppercase tracking-[0.4em] min-w-[240px]">
               Capabilities
               <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ml-2" />
            </Button>
            
            <button className="group flex items-center gap-4 text-white font-black tracking-[0.4em] text-[10px] uppercase hover:text-[#00A3FF] transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 group-hover:border-[#00A3FF] transition-all shadow-xl">
                <Play className="w-3 h-3 fill-current" />
              </div>
              Core Methodology
            </button>
          </div>
        </div>

        {/* Right Media */}
        <div className="reveal opacity-0 translate-y-16 transition-all duration-[1.5s] delay-500 relative hidden lg:block">
          <div className="relative w-full aspect-[4/5.2] max-w-sm ml-auto rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_80px_150px_rgba(0,0,0,0.8)] group/shunt">
            
            {/* Sliders */}
            <div className="absolute inset-0 flex">
              {HERO_IMAGES.map((img, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-[1000ms] cubic-bezier(0.87, 0, 0.13, 1) ${
                    currentIdx === idx 
                      ? 'translate-x-0 opacity-100' 
                      : (idx === prevIdx ? '-translate-x-full opacity-0 scale-95 blur-sm' : 'translate-x-full opacity-0')
                  }`}
                  style={{ zIndex: currentIdx === idx ? 20 : 10 }}
                >
                  <img 
                    src={img.url} 
                    alt={img.label} 
                    className="w-full h-full object-cover filter grayscale-[0.3] group-hover/shunt:scale-105 transition-transform duration-[4s]"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20"></div>
            </div>

            {/* Cinematic HUD Overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-3 opacity-80">
                  <div className="flex gap-1.5">
                    <div className="w-8 h-[1px] bg-white"></div>
                    <div className="w-2 h-[1px] bg-[#00A3FF]"></div>
                  </div>
                  <p className="text-[10px] text-white font-black tracking-[0.4em] uppercase">
                    {HERO_IMAGES[currentIdx].tag}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-[1px] w-full bg-white/20"></div>
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-[9px] text-[#00A3FF] font-black uppercase tracking-[0.6em] mb-3">
                          {HERO_IMAGES[currentIdx].label}
                        </p>
                        <h3 className="text-xl md:text-2xl font-orbitron font-black text-white leading-tight uppercase tracking-tighter">
                            JOSATA <br /><span className="text-white/60">TECHNOLOGIES</span>
                        </h3>
                    </div>
                    <div className="w-16 h-16 border border-white/20 rounded-[2.5rem] flex items-center justify-center bg-white/5 backdrop-blur-3xl group-hover:border-[#00A3FF]/50 transition-all">
                        <Cpu className="w-6 h-6 text-[#00A3FF]" />
                    </div>
                </div>
              </div>
            </div>

            {/* Scrubber */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-40">
                <div 
                  key={currentIdx}
                  className="h-full bg-gradient-to-r from-[#00A3FF] to-[#A855F7] animate-progress-6s"
                ></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flow-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-flow-gradient {
          animation: flow-gradient 10s ease infinite;
        }
        @keyframes progress-6s {
            from { width: 0%; }
            to { width: 100%; }
        }
        .animate-progress-6s {
            animation: progress-6s 6s linear forwards;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=90&w=1600",
    tag: "SOURCE_CORE.01",
    label: "Systems Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=90&w=1600",
    tag: "SYNTAX_FLOW.02",
    label: "Neural Engineering"
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=90&w=1600",
    tag: "INTERFACE.03",
    label: "Logic Systems"
  }
];

export default Hero;
