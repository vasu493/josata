
import React from 'react';
import { SERVICES } from '../constants';
import ServiceCard from './ServiceCard';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <span className="text-[#00A3FF] font-bold tracking-widest uppercase text-xs">Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white">Our Core Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00A3FF] to-[#A855F7] mx-auto rounded-full"></div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            We deliver top-tier technology solutions designed to solve complex business challenges 
            and drive sustainable digital transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
