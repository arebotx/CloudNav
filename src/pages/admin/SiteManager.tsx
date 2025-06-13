import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockSites, mockGroups } from '../../data/mockData';
import { Site, Group } from '../../types/models';

const SiteManager = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        setSites(mockSites);
        setGroups(mockGroups);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);
  
  // 打开编辑模态框
  const openEditModal = (site: Site) => {
    setSelectedSite(site);
    setIsModalOpen(true);
  };
  
  // 打开新建模态框
  const openCreateModal = () => {
    setSelectedSite(null);
    setIsModalOpen(true);
  };
  
  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSite(null);
  };
  
  // 删除网站
  const deleteSite = (id: string) => {
    // 在实际应用中，这里会调用API
    setSites(sites.filter(site => site.id !== id));
  };
  
  // 过滤网站
  const filteredSites = sites.filter(site => {
    const matchesSearch = searchTerm === '' || 
      site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = selectedGroup === null || site.groupId === selectedGroup;
    
    return matchesSearch && matchesGroup;
  });
  
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
        <h1 className="text-3xl font-bold mb-2">网站管理</h1>
        <p className="text-base-content/70">
          管理您的导航网站，添加、编辑或删除网站。
        </p>
      </motion.div>
      
      {/* 操作栏 */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 搜索框 */}
          <div className="form-control">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="搜索网站..." 
                className="input input-bordered w-full max-w-xs" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 分组筛选 */}
          <select 
            className="select select-bordered w-full max-w-xs"
            value={selectedGroup || ''}
            onChange={(e) => setSelectedGroup(e.target.value === '' ? null : e.target.value)}
          >
            <option value="">所有分组</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>
                {group.icon} {group.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* 添加按钮 */}
        <button 
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          添加网站
        </button>
      </motion.div>
      
      {/* 网站列表 */}
      <motion.div 
        className="overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="table w-full">
          <thead>
            <tr>
              <th>网站</th>
              <th>分组</th>
              <th>URL</th>
              <th>点击</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-lg font-semibold">未找到网站</p>
                  <p className="text-base-content/70">尝试其他搜索条件或添加新网站</p>
                </td>
              </tr>
            ) : (
              filteredSites.map((site) => {
                const group = groups.find(g => g.id === site.groupId);
                
                return (
                  <tr key={site.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        {site.icon && (
                          <div className="avatar">
                            <div className="mask mask-squircle w-10 h-10">
                              <img src={site.icon} alt={site.title} />
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="font-bold">{site.title}</div>
                          <div className="text-sm opacity-70 line-clamp-1">{site.description}</div>
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
                    <td>
                      <div className="flex space-x-2">
                        <button 
                          className="btn btn-sm btn-ghost btn-square"
                          onClick={() => openEditModal(site)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button 
                          className="btn btn-sm btn-ghost btn-square text-error"
                          onClick={() => deleteSite(site.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </motion.div>
      
      {/* 网站编辑/创建模态框 */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedSite ? '编辑网站' : '添加新网站'}
            </h3>
            <p className="py-4">
              {selectedSite ? '编辑网站信息' : '请填写新网站的信息'}
            </p>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">网站名称</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="输入网站名称"
                  defaultValue={selectedSite?.title || ''}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">网站 URL</span>
                </label>
                <input 
                  type="url" 
                  className="input input-bordered w-full" 
                  placeholder="https://example.com"
                  defaultValue={selectedSite?.url || ''}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">网站描述</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  placeholder="简要描述网站"
                  defaultValue={selectedSite?.description || ''}
                ></textarea>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">图标 URL</span>
                </label>
                <input 
                  type="url" 
                  className="input input-bordered w-full" 
                  placeholder="https://example.com/favicon.ico"
                  defaultValue={selectedSite?.icon || ''}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">分组</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  defaultValue={selectedSite?.groupId || ''}
                >
                  <option disabled value="">选择分组</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.icon} {group.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">标签</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="标签1, 标签2, 标签3"
                  defaultValue={selectedSite?.tags.join(', ') || ''}
                />
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>取消</button>
              <button className="btn btn-primary">保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteManager; 