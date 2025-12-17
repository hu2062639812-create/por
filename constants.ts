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
    id: 1,
    title: "轻享盒子 (Light Enjoy Box)",
    description: "一款聚焦健康饮食的微信小程序，作为随身食谱小百科。网罗低脂轻卡、营养均衡的创意食谱，提供食材营养解析与膳食搭配指南。UI 采用清新绿色调，设计了从“快手早餐”到“控糖甜品”的精细分类，助用户轻松解锁健康美味。",
    technologies: ["WeChat Mini Program", "Taro", "React", "UI/UX Design"],
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop", // Healthy food concept image
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
  },
  {
    id: 3,
    title: "AI Analytics Dashboard",
    description: "为企业客户提供的数据可视化仪表盘，利用 D3.js 和 Recharts 展示实时 AI 模型训练数据和预测结果。",
    technologies: ["React", "D3.js", "Recharts", "WebSockets", "Node.js"],
    imageUrl: "https://picsum.photos/800/600?random=2",
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

// System instruction for the Gemini chatbot
export const AI_SYSTEM_INSTRUCTION = `
你是一个名为“胡仁的AI助手”的智能助手。你的任务是基于以下关于胡仁的简历信息，回答访问者关于他的技能、经验和项目的问题。
请使用专业、热情且简洁的中文回答。不要编造信息。如果问题超出了简历范围，请礼貌地建议用户通过邮件联系胡仁。

简历信息：
姓名：${PERSONAL_INFO.name}
职位：${PERSONAL_INFO.title}
简介：${PERSONAL_INFO.bio}
邮箱：${PERSONAL_INFO.email}
地点：${PERSONAL_INFO.location}

主要技能：
${SKILLS.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n')}

工作经历：
${EXPERIENCE.map(e => `- ${e.period} | ${e.company} | ${e.role}: ${e.description}`).join('\n')}

项目经验：
${PROJECTS.map(p => `- ${p.title}: ${p.description} (技术栈: ${p.technologies.join(', ')})`).join('\n')}
`;