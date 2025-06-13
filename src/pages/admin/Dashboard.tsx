import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockSites, mockGroups } from '../../data/mockData';

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const StatCard = ({ title, value, icon, color, delay }: StatCardProps) => (
  <motion.div
    className={`card shadow-md ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="card-body p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="card-title text-base-content/70 text-sm">{title}</h2>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSites: 0,
    totalGroups: 0,
    totalClicks: 0,
    lastUpdated: ''
  });
  
  const [recentSites, setRecentSites] = useState(mockSites.slice(0, 5));
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        setStats({
          totalSites: mockSites.length,
          totalGroups: mockGroups.length,
          totalClicks: mockSites.reduce((sum, site) => sum + site.clickCount, 0),
          lastUpdated: new Date().toLocaleString()
        });
        
        // 按更新时间排序，获取最近的5个站点
        const sortedSites = [...mockSites].sort((a, b) => 
          new Date(b.updatedAt || b.createdAt).getTime() - 
          new Date(a.updatedAt || a.createdAt).getTime()
        ).slice(0, 5);
        
        setRecentSites(sortedSites);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">仪表盘</h1>
        <p className="text-base-content/70">
          欢迎回来，管理员！这里是您网站导航的概览。
        </p>
      </motion.div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="网站总数"
          value={stats.totalSites}
          icon="🌐"
          color="bg-primary/10"
          delay={0.1}
        />
        <StatCard
          title="分组总数"
          value={stats.totalGroups}
          icon="📁"
          color="bg-secondary/10"
          delay={0.2}
        />
        <StatCard
          title="点击总数"
          value={stats.totalClicks}
          icon="👆"
          color="bg-accent/10"
          delay={0.3}
        />
        <StatCard
          title="最后更新"
          value={stats.lastUpdated}
          icon="🕒"
          color="bg-neutral/10"
          delay={0.4}
        />
      </div>
      
      {/* 最近添加的网站 */}
      <motion.div
        className="card bg-base-100 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">最近添加的网站</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>网站</th>
                  <th>分组</th>
                  <th>URL</th>
                  <th>点击</th>
                </tr>
              </thead>
              <tbody>
                {recentSites.map((site) => {
                  const group = mockGroups.find(g => g.id === site.groupId);
                  
                  return (
                    <tr key={site.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          {site.icon && (
                            <div className="avatar">
                              <div className="mask mask-squircle w-8 h-8">
                                <img src={site.icon} alt={site.title} />
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="font-bold">{site.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          {group?.icon} {group?.name}
                        </span>
                      </td>
                      <td className="truncate max-w-xs">
                        <a 
                          href={site.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {site.url}
                        </a>
                      </td>
                      <td>{site.clickCount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      
      {/* 快捷操作 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg">添加新网站</h2>
            <p className="text-base-content/70">快速添加新的网站到您的导航中</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">
                添加网站
              </button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg">创建新分组</h2>
            <p className="text-base-content/70">创建新的分组来整理您的网站</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-secondary btn-sm">
                创建分组
              </button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg">系统设置</h2>
            <p className="text-base-content/70">配置您的导航系统设置</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-outline btn-sm">
                前往设置
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 