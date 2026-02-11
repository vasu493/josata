
import React from 'react';

const TECHNOLOGIES = [
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
  { name: 'Rust', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg' },
  { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' }
];

const TechStack: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-block bg-[#00A3FF]/10 text-[#00A3FF] text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          Technologies We Master
        </div>
        <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#A855F7]">Technology Stack</span>
        </h2>
      </div>
      
      <div className="relative flex flex-col gap-8 perspective-1000">
        <div className="flex overflow-x-hidden group relative">
          <div className="flex animate-marquee whitespace-nowrap gap-6 px-6 py-10">
            {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center min-w-[160px] h-[180px] bg-[#1A1A1A] rounded-2xl border border-white/5 transition-all duration-700 hover:duration-300 group/card cursor-pointer hover:border-[#00A3FF]/50 hover:bg-[#222222] hover:-translate-y-2 hover:rotate-y-12 hover:shadow-[0_20px_40px_rgba(0,163,255,0.2)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-16 h-16 mb-6 flex items-center justify-center group-hover/card:scale-125 transition-all duration-500 transform group-hover/card:rotate-[360deg]">
                  <img src={tech.logo} alt={tech.name} className="max-w-full max-h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/card:drop-shadow-[0_0_20px_rgba(0,163,255,0.6)]" />
                </div>
                <span className="text-gray-300 font-bold group-hover/card:text-white transition-colors tracking-wider uppercase text-[10px]">{tech.name}</span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00A3FF]/0 to-[#A855F7]/0 group-hover/card:from-[#00A3FF]/5 group-hover/card:to-[#A855F7]/5 rounded-2xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Masking gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
      `}</style>
    </section>
  );
};

export default TechStack;
