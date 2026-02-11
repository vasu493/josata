
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[#00A3FF] font-bold tracking-widest uppercase text-sm">Get In Touch</span>
              <h1 className="text-5xl font-orbitron font-black">Let's Discuss <br /> Your Project</h1>
              <p className="text-gray-400 max-w-md">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#00A3FF]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Email Us</h4>
                  <p className="text-sm text-gray-500">Our support team is here for you.</p>
                  <p className="text-[#00A3FF] mt-1">hr@josata.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#A855F7]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#A855F7]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Call Us</h4>
                  <p className="text-sm text-gray-500">Mon-Fri from 9am to 6pm.</p>
                  <p className="text-[#A855F7] mt-1">+1 (800) JOSATA-IT</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#00A3FF]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#00A3FF]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Visit Us</h4>
                  <p className="text-sm text-gray-500">Come say hello at our HQ.</p>
                  <p className="text-[#00A3FF] mt-1">IT Park, Madhurawada, Visakhapatnam, AP 530048</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3FF]/5 blur-3xl rounded-full"></div>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  placeholder="How can we help?" 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your project details..." 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all outline-none resize-none" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#00A3FF] to-[#A855F7] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
