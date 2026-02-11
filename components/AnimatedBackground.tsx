
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NeuralPlexus = () => {
  const { mouse, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const count = 150; // Number of "neurons"

  // Initialize random positions and velocities for each neuron
  const [particles, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = new Float32Array(count * count * 6); // Max possible connections
    let lineIdx = 0;

    // Mouse target position in 3D space
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Update position based on velocity
      positions[ix] += velocities[ix];
      positions[iy] += velocities[iy];
      positions[iz] += velocities[iz];

      // Boundary check & Bounce
      if (Math.abs(positions[ix]) > 25) velocities[ix] *= -1;
      if (Math.abs(positions[iy]) > 25) velocities[iy] *= -1;
      if (Math.abs(positions[iz]) > 15) velocities[iz] *= -1;

      // Mouse influence: subtle pull towards mouse
      const dx = mx - positions[ix];
      const dy = my - positions[iy];
      const dMouse = Math.sqrt(dx * dx + dy * dy);
      if (dMouse < 8) {
        positions[ix] += dx * 0.005;
        positions[iy] += dy * 0.005;
      }

      // Calculate connections (synapses)
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const jy = j * 3 + 1;
        const jz = j * 3 + 2;

        const distSq = (positions[ix] - positions[jx]) ** 2 +
                       (positions[iy] - positions[jy]) ** 2 +
                       (positions[iz] - positions[jz]) ** 2;

        // Connect if distance is less than threshold
        if (distSq < 36) {
          linePositions[lineIdx++] = positions[ix];
          linePositions[lineIdx++] = positions[iy];
          linePositions[lineIdx++] = positions[iz];
          linePositions[lineIdx++] = positions[jx];
          linePositions[lineIdx++] = positions[jy];
          linePositions[lineIdx++] = positions[jz];
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx), 3));
    
    // Slow drift rotation of the entire network
    pointsRef.current.rotation.y = time * 0.05;
    linesRef.current.rotation.y = time * 0.05;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00A3FF"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#00A3FF"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-[#02040a]">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#02040a']} />
        <fog attach="fog" args={['#02040a', 15, 35]} />
        <ambientLight intensity={1.5} />
        <NeuralPlexus />
      </Canvas>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-40"></div>
      
      {/* Software scanning line effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="w-full h-[1px] bg-white/5 absolute top-1/4 animate-scan-slow opacity-20"></div>
        <div className="w-full h-[1px] bg-[#00A3FF]/10 absolute top-3/4 animate-scan-slow-delayed opacity-20"></div>
      </div>

      <style>{`
        @keyframes scan-slow {
          0% { transform: translateY(-50vh); opacity: 0; }
          50% { opacity: 0.2; }
          100% { transform: translateY(150vh); opacity: 0; }
        }
        .animate-scan-slow {
          animation: scan-slow 12s linear infinite;
        }
        .animate-scan-slow-delayed {
          animation: scan-slow 12s linear infinite;
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
