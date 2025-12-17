import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-[80px] -z-10"></div>

      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-primary font-medium tracking-wider uppercase text-sm md:text-base">你好，我是 {PERSONAL_INFO.name} 👋</h2>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              打造 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">极致体验</span><br />
              的数字产品
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="group px-8 py-3 bg-primary hover:bg-indigo-600 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2"
            >
              浏览作品
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#" 
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 border border-slate-700"
              onClick={(e) => { e.preventDefault(); alert("下载简历功能尚未实现"); }}
            >
              下载简历
              <Download size={18} />
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl rotate-6 opacity-50 blur-lg"></div>
            <img 
              src="https://picsum.photos/600/600?grayscale" 
              alt={PERSONAL_INFO.name} 
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl border-2 border-slate-700/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;