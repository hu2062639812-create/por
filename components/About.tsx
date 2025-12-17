import React from 'react';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">关于我</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            <p className="text-slate-300 leading-loose text-lg">
              我不仅仅是一个代码编写者，更是一个问题的解决者。我坚信优秀的代码应该像诗歌一样优雅，像数学一样严谨。
            </p>
            <p className="text-slate-400 leading-relaxed">
              在过去的 6 年里，我一直在探索 Web 技术的边界。从响应式设计到复杂的单页应用，再到现在的 AI 集成开发，我始终保持着对新技术的热情和好奇心。
            </p>
            <div className="pt-6 grid grid-cols-3 gap-8 border-t border-slate-800">
                <div>
                    <h4 className="text-3xl font-bold text-white">6+</h4>
                    <p className="text-slate-500 text-sm mt-1">年开发经验</p>
                </div>
                <div>
                    <h4 className="text-3xl font-bold text-white">50+</h4>
                    <p className="text-slate-500 text-sm mt-1">完成项目</p>
                </div>
                <div>
                    <h4 className="text-3xl font-bold text-white">100%</h4>
                    <p className="text-slate-500 text-sm mt-1">客户满意度</p>
                </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              技术栈
            </h3>
            <div className="space-y-6">
              {SKILLS.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-sm text-slate-400 mb-3 uppercase tracking-wider font-semibold">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm rounded-md transition-colors border border-slate-700 cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;