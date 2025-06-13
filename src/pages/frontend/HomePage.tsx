import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SiteCard from '../../components/frontend/SiteCard';
import GroupSelector from '../../components/frontend/GroupSelector';
import { Site, Group } from '../../types/models';

// 模拟数据 - 在实际应用中将从API获取
const mockGroups: Group[] = [
  { id: 'g1', name: '常用工具', description: '日常使用的工具网站', icon: '🛠️', order: 1, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g2', name: '学习资源', description: '编程和学习相关网站', icon: '📚', order: 2, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g3', name: '娱乐休闲', description: '娱乐和休闲网站', icon: '🎮', order: 3, createdAt: '', updatedAt: '', isPublic: true },
  { id: 'g4', name: '设计资源', description: '设计相关的资源网站', icon: '🎨', order: 4, createdAt: '', updatedAt: '', isPublic: true },
];

const mockSites: Site[] = [
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
];

const HomePage = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        setGroups(mockGroups);
        setSites(mockSites);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);
  
  // 根据选择的分组筛选网站
  const filteredSites = selectedGroup 
    ? sites.filter(site => site.groupId === selectedGroup)
    : sites;
  
  // 按分组对网站进行分组
  const sitesByGroup = groups.map(group => ({
    group,
    sites: sites.filter(site => site.groupId === group.id)
  }));
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <motion.div 
        className="text-center py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            欢迎使用 CloudNav云导航
          </span>
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          您的个人网站收藏夹，帮助您整理和快速访问常用网站。
        </p>
      </motion.div>
      
      {/* 分组选择器 */}
      <GroupSelector 
        groups={groups} 
        selectedGroup={selectedGroup} 
        onSelectGroup={setSelectedGroup} 
      />
      
      {/* 网站列表 */}
      {selectedGroup ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {sitesByGroup.map(({ group, sites }) => (
            <div key={group.id} className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{group.icon}</span>
                <h2 className="text-2xl font-bold">{group.name}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sites.map((site) => (
                  <SiteCard key={site.id} site={site} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage; 