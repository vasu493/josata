
import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
          setCount(0);
        }
      },
      { threshold: 0.2 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isIntersecting, end, duration]);

  return (
    <div ref={countRef} className="tabular-nums">
      {count}{suffix}
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { label: 'Projects Completed', value: 500, suffix: '+' },
    { label: 'Happy Clients', value: 150, suffix: '+' },
    { label: 'Expert Engineers', value: 80, suffix: '+' },
    { label: 'Global Offices', value: 5, suffix: '' },
  ];

  return (
    <section className="py-24 md:py-32 border-y border-white/5 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-[#00A3FF]/20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <span className="text-[#00A3FF] font-black tracking-[0.4em] uppercase text-[10px]">Performance Metrics</span>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white">
            Josata by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#A855F7]">Numbers</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto rounded-full mt-6"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-5xl md:text-7xl font-orbitron font-black mb-3 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 group-hover:from-[#00A3FF] group-hover:to-[#A855F7] transition-all duration-700 transform group-hover:scale-110">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="h-1 w-10 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto mb-4 rounded-full opacity-20 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"></div>
              <div className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-gray-500 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
