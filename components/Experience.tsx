import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">工作经历</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            我的职业生涯旅程，以及我在各个阶段的主要贡献。
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          
          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
              
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase size={18} className="text-primary" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-xl border border-slate-700/50 shadow-lg hover:border-primary/50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h3 className="font-bold text-xl text-white">{exp.role}</h3>
                  <span className="flex items-center text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mt-2 sm:mt-0">
                    <Calendar size={12} className="mr-1" />
                    {exp.period}
                  </span>
                </div>
                <div className="text-lg font-medium text-secondary mb-2">{exp.company}</div>
                <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-300">
                      <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;