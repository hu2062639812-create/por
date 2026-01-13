
import { Project, Experience, Skill } from './types';

export const PERSONAL_INFO = {
  name: "胡仁",
  title: "高级前端工程师 / UIUX 设计师",
  tagline: "致力于打造极致用户体验的数字化产品",
  bio: "我是一名拥有 6 年经验的前端开发者，专注于 React 生态系统和现代化 Web 技术。我热衷于将复杂的问题转化为简单、优雅且高性能的解决方案。在工作之余，我也是一名开源贡献者和技术博主。",
  email: "huren@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "中国，上海"
};

export const PROJECTS: Project[] = [
  {
    id: 100, // Special ID for Poetry Master
    title: "诗词达人 (Poetry Master)",
    description: "一个模仿多邻国模式的古诗词学习平台。采用关卡式进度设计，通过趣味交互（如诗词填空、拖拽排序）引导用户在“玩游戏”的过程中潜移默化地背诵古诗词。包含完整的任务系统、商店激励和成就勋章墙。",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Game Logic"],
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop", 
    demoUrl: "#poetry-demo", 
    repoUrl: "#"
  },
  {
    id: 99,
    title: "像素传说 (Pixel Legends)",
    description: "一个完全基于 HTML5 Canvas 和 React 开发的 2D 平台动作游戏。包含 3 个独特角色、3 种地形环境以及独特的“攻击重置二段跳”机制。展示了高性能动画渲染与游戏逻辑实现能力。",
    technologies: ["React", "HTML5 Canvas", "Game Physics", "Pixel Art"],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", 
    demoUrl: "#game-demo",
    repoUrl: "#"
  },
  {
    id: 1,
    title: "轻享盒子 (Light Enjoy Box)",
    description: "一款聚焦健康饮食的微信小程序，作为随身食谱小百科。提供食材营养解析与膳食搭配指南。UI 采用清新绿色调，助用户轻松解锁健康美味。",
    technologies: ["WeChat Mini Program", "Taro", "React", "UI/UX Design"],
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    demoUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "E-Commerce Pro 电商平台",
    description: "一个基于 Next.js 和 GraphQL 的高性能电商平台，支持数万并发用户。集成了即时搜索、购物车同步和复杂的支付流程。",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    imageUrl: "https://picsum.photos/800/600?random=1",
    demoUrl: "#",
    repoUrl: "#"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: "TechGiant Inc.",
    role: "高级前端工程师",
    period: "2021 - 至今",
    description: "负责公司核心 SaaS 产品的前端架构设计与开发。",
    achievements: [
      "重构遗留代码库，使页面加载速度提升了 40%。",
      "领导 5 人的前端团队，建立了内部 UI 组件库。",
      "引入自动化测试流程，将 Bug 率降低了 25%。"
    ]
  },
  {
    id: 2,
    company: "Creative Studio",
    role: "前端开发工程师",
    period: "2018 - 2021",
    description: "为多个初创公司提供 MVP 开发和技术咨询服务。",
    achievements: [
      "独立完成了 10+ 个从设计到部署的全栈项目。",
      "优化了移动端交互体验，获得了客户的高度评价。",
      "使用 React Native 开发了跨平台移动应用。"
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: "前端核心",
    items: ["React 18", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"]
  },
  {
    category: "样式与 UI",
    items: ["Tailwind CSS", "Sass", "Framer Motion", "Material UI", "Figma"]
  },
  {
    category: "构建与工具",
    items: ["Vite", "Webpack", "Git", "Docker", "Jest"]
  },
  {
    category: "后端与云",
    items: ["Node.js", "Next.js", "PostgreSQL", "AWS", "Vercel"]
  }
];

export const AI_SYSTEM_INSTRUCTION = `
你是一个名为“胡仁的AI助手”的智能助手。你的任务是基于以下关于胡仁的简历信息，回答访问者关于他的技能、经验和项目的问题。
请特别关注他的“诗词达人”项目，这是一个模仿多邻国模式的学习平台，展示了他对交互设计、教育科技和游戏化逻辑的深度理解。

简历信息：
姓名：${PERSONAL_INFO.name}
职位：${PERSONAL_INFO.title}
简介：${PERSONAL_INFO.bio}

项目重点：
- 诗词达人: 游戏化学习平台，核心是 SVG 进度路径算法和拖拽排序交互。
- 像素传说: Canvas 游戏，展示了对底层渲染和物理引擎的掌握。

${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}
`;
