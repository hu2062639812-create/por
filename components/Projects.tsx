
import React from 'react';
import { ExternalLink, Github, Gamepad2, GraduationCap } from 'lucide-react';
import { PROJECTS } from '../constants';

interface ProjectsProps {
  onPlayGame: () => void;
  onOpenPoetry: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onPlayGame, onOpenPoetry }) => {
  return (
    <section id="projects" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">精选项目</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <p className="text-slate-400 max-w-xl">
              这里展示了我最近参与的一些核心项目，涵盖了从企业级 SaaS 到创意交互应用的各类开发。
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
            查看 Github 更多项目 <ArrowRightSmall />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-card rounded-2xl overflow-hidden border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  {project.id === 99 ? (
                    <button 
                      onClick={(e) => { e.preventDefault(); onPlayGame(); }}
                      className="p-3 bg-primary text-white rounded-full hover:bg-indigo-600 transition-colors animate-bounce" 
                      title="Play Demo"
                    >
                      <Gamepad2 size={24} />
                    </button>
                  ) : project.id === 100 ? (
                    <button 
                      onClick={(e) => { e.preventDefault(); onOpenPoetry(); }}
                      className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors animate-pulse" 
                      title="Learn Poetry"
                    >
                      <GraduationCap size={24} />
                    </button>
                  ) : (
                    <a href={project.demoUrl} className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors" title="View Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                  <a href={project.repoUrl} className="p-3 bg-dark text-white border border-slate-600 rounded-full hover:bg-white hover:text-dark transition-colors" title="View Code">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRightSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);

export default Projects;
