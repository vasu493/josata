
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Logo />
          <p className="text-sm text-gray-500 leading-relaxed">
            Revolutionizing the way businesses operate through innovative IT consulting and bespoke digital solutions. 
            Empowering your tomorrow, starting today.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] transition-all"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] transition-all"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] transition-all"><Github className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] transition-all"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">About Us</Link></li>
            <li><Link to="/services" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Services</Link></li>
            <li><Link to="/solutions" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Solutions</Link></li>
            <li><Link to="/careers" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Services</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Cloud Migration</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Custom Software</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Cybersecurity Audit</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">Big Data Analytics</a></li>
            <li><a href="#" className="text-sm text-gray-500 hover:text-[#00A3FF] transition-colors">AI & Machine Learning</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#00A3FF] shrink-0" />
              <span className="text-sm text-gray-500">IT Park, Madhurawada, Visakhapatnam, AP 530048</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-[#00A3FF] shrink-0" />
              <span className="text-sm text-gray-500">+1 (800) JOSATA-IT</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-[#00A3FF] shrink-0" />
              <span className="text-sm text-gray-500">hr@josata.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-600">© 2024 Josata Technologies. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
