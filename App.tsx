import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ChatWidget from './components/ChatWidget';
import { Mail, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from './constants';

const Contact: React.FC = () => (
  <section id="contact" className="py-20 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">保持联系</h2>
      <p className="text-slate-400 max-w-2xl mx-auto mb-12">
        无论是项目合作、技术交流还是闲聊，我都乐意与你交谈。随时给我发邮件！
      </p>
      <a 
        href={`mailto:${PERSONAL_INFO.email}`}
        className="inline-block px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-full font-medium transition-all hover:-translate-y-1 shadow-lg shadow-primary/25"
      >
        发送邮件
      </a>
      
      <div className="flex justify-center gap-8 mt-16">
        <a href={PERSONAL_INFO.github} className="text-slate-500 hover:text-white transition-colors">
          <Github size={24} />
        </a>
        <a href={PERSONAL_INFO.linkedin} className="text-slate-500 hover:text-white transition-colors">
          <Linkedin size={24} />
        </a>
      </div>
      
      <div className="mt-16 text-slate-600 text-sm">
        &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <ChatWidget />
    </div>
  );
};

export default App;