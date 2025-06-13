import { Site, Group, User } from '../types/models';

export const mockGroups: Group[] = [
  { id: 'g1', name: '常用工具', description: '日常使用的工具网站', icon: '🛠️', order: 1, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g2', name: '学习资源', description: '编程和学习相关网站', icon: '📚', order: 2, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g3', name: '娱乐休闲', description: '娱乐和休闲网站', icon: '🎮', order: 3, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g4', name: '设计资源', description: '设计相关的资源网站', icon: '🎨', order: 4, createdAt: '', updatedAt: '', isPublic: true },
];

export const mockSites: Site[] = [
  {
    id: 's1',
    title: 'Google',
    url: 'https://www.google.com',
    description: '全球最大的搜索引擎',
    icon: 'https://www.google.com/favicon.ico',
    groupId: 'g1',
    order: 1,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['搜索', '工具'],
    clickCount: 0
  },
  {
    id: 's2',
    title: 'GitHub',
    url: 'https://github.com',
    description: '代码托管平台',
    icon: 'https://github.com/favicon.ico',
    groupId: 'g2',
    order: 1,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['开发', '代码'],
    clickCount: 0
  },
  {
    id: 's3',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    description: '视频分享平台',
    icon: 'https://www.youtube.com/favicon.ico',
    groupId: 'g3',
    order: 1,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['视频', '娱乐'],
    clickCount: 0
  },
  {
    id: 's4',
    title: 'Figma',
    url: 'https://www.figma.com',
    description: '在线设计工具',
    icon: 'https://www.figma.com/favicon.ico',
    groupId: 'g4',
    order: 1,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['设计', '工具'],
    clickCount: 0
  },
  {
    id: 's5',
    title: 'Bing',
    url: 'https://www.bing.com',
    description: '微软的搜索引擎',
    icon: 'https://www.bing.com/favicon.ico',
    groupId: 'g1',
    order: 2,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['搜索', '工具'],
    clickCount: 0
  },
  {
    id: 's6',
    title: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '程序员问答社区',
    icon: 'https://stackoverflow.com/favicon.ico',
    groupId: 'g2',
    order: 2,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['开发', '问答'],
    clickCount: 0
  },
  {
    id: 's7',
    title: 'Netflix',
    url: 'https://www.netflix.com',
    description: '流媒体视频服务',
    icon: 'https://www.netflix.com/favicon.ico',
    groupId: 'g3',
    order: 2,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['视频', '娱乐'],
    clickCount: 0
  },
  {
    id: 's8',
    title: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计师社区',
    icon: 'https://dribbble.com/favicon.ico',
    groupId: 'g4',
    order: 2,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['设计', '灵感'],
    clickCount: 0
  },
  {
    id: 's9',
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI的对话AI助手',
    icon: 'https://chat.openai.com/favicon.ico',
    groupId: 'g1',
    order: 3,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['AI', '工具'],
    clickCount: 0
  },
  {
    id: 's10',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web技术文档',
    icon: 'https://developer.mozilla.org/favicon.ico',
    groupId: 'g2',
    order: 3,
    createdAt: '',
    updatedAt: '',
    isPublic: true,
    tags: ['开发', '文档'],
    clickCount: 0
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'admin',
    passwordHash: 'hashed_password', // 实际应用中不应该这样存储
    email: 'admin@example.com',
    createdAt: '',
    lastLogin: '',
    role: 'admin'
  }
]; 