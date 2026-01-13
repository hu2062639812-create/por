
import React, { useState } from 'react';
import { Home, ClipboardList, ShoppingBag, Trophy, MessageCircle, X, Check } from 'lucide-react';

interface PoetryDemoProps {
  onClose: () => void;
}

const PoetryDemo: React.FC<PoetryDemoProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showGuide, setShowGuide] = useState(true);

  // Level data
  const levels = [
    { id: 1, title: '初试啼声', status: 'completed' },
    { id: 2, title: '唐诗三百', status: 'current' },
    { id: 3, title: '宋词雅韵', status: 'locked' },
    { id: 4, title: '诗经采薇', status: 'locked' },
    { id: 5, title: '楚辞离骚', status: 'locked' },
  ];

  const sidebarItems = [
    { id: 'home', label: 'home', icon: <Home size={20} /> },
    { id: 'task', label: 'task', icon: <ClipboardList size={20} /> },
    { id: 'store', label: 'store', icon: <ShoppingBag size={20} /> },
    { id: 'achieve', label: 'achieve', icon: <Trophy size={20} /> },
    { id: 'guide', label: 'guide', icon: <MessageCircle size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl h-full max-h-[800px] bg-[#fdfaf3] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#e8dfc4]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white rounded-full text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-[#f4ecd8] border-r border-[#e8dfc4] p-6 flex flex-col items-center md:items-start shrink-0">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md">
              <span className="text-xl font-bold">易</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-lg">易学</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Make learning simple</span>
            </div>
          </div>

          <nav className="flex md:flex-col w-full justify-around md:justify-start gap-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full ${
                  activeTab === item.id 
                    ? 'bg-blue-100 text-blue-600 font-bold shadow-sm border border-blue-200' 
                    : 'text-slate-500 hover:bg-slate-200/50'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline capitalize">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative p-6 md:p-12 bg-white/40 backdrop-blur-[2px]">
          {/* Duolingo-style Path View */}
          <div className="flex flex-col items-center space-y-12 py-10">
            {levels.map((lvl, index) => (
              <div 
                key={lvl.id} 
                className="relative flex flex-col items-center group cursor-pointer"
                style={{ marginLeft: `${Math.sin(index * 1.5) * 60}px` }}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-b-8 transition-transform group-hover:scale-110 active:scale-95 shadow-lg ${
                  lvl.status === 'completed' 
                    ? 'bg-yellow-400 border-yellow-600 text-yellow-900' 
                    : lvl.status === 'current'
                    ? 'bg-blue-500 border-blue-700 text-white animate-bounce'
                    : 'bg-slate-200 border-slate-300 text-slate-400'
                }`}>
                  {lvl.status === 'completed' ? <Check size={32} /> : <span>{lvl.id}</span>}
                </div>
                <span className={`mt-3 font-bold text-sm ${lvl.status === 'locked' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {lvl.title}
                </span>
                
                {/* Connector line mock */}
                {index < levels.length - 1 && (
                  <div className="absolute -bottom-12 w-1 h-12 bg-slate-200 -z-10"></div>
                )}
              </div>
            ))}
          </div>

          {/* Achievement Snippet from Screenshot */}
          <div className="absolute top-6 right-6 w-64 bg-white/80 border border-[#e8dfc4] rounded-xl p-4 shadow-sm hidden lg:block">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Personal Profile</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">🏆 Winning streak days</span>
                <span className="text-xs font-bold text-blue-500">7</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-3/4 h-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Guide Modal Overlay (As requested from screenshot) */}
        {showGuide && (
          <div className="absolute inset-0 z-40 bg-black/20 flex items-center justify-center p-6 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#f4ecd8] border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm p-8 flex flex-col items-center text-center">
              <div className="mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/11495/11495804.png" 
                  alt="Guide" 
                  className="w-20 h-20"
                />
              </div>
              <h2 className="text-3xl font-bold text-blue-500 mb-6 italic">I am your guide</h2>
              
              <div className="space-y-1 text-slate-700 text-left w-full mb-8 font-serif leading-tight">
                <p>The website has the following functions</p>
                <p>①homepage:主页面</p>
                <p>②study:学习页面</p>
                <p>③task:任务页面</p>
                <p>④store:商店</p>
                <p>⑤files:个人档案</p>
                <p>⑥guide:网站向导</p>
              </div>

              <button 
                onClick={() => setShowGuide(false)}
                className="px-10 py-3 bg-blue-100 border-2 border-blue-500 text-blue-500 text-2xl font-bold hover:bg-blue-500 hover:text-white transition-all active:scale-95"
              >
                确认
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-multiply z-[101]" 
           style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/papyros.png)' }}></div>
    </div>
  );
};

export default PoetryDemo;
