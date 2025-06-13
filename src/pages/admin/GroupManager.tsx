import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockGroups, mockSites } from '../../data/mockData';
import { Group } from '../../types/models';

const GroupManager = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        setGroups(mockGroups);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);
  
  // 打开编辑模态框
  const openEditModal = (group: Group) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };
  
  // 打开新建模态框
  const openCreateModal = () => {
    setSelectedGroup(null);
    setIsModalOpen(true);
  };
  
  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
  };
  
  // 删除分组
  const deleteGroup = (id: string) => {
    // 在实际应用中，这里会调用API
    setGroups(groups.filter(group => group.id !== id));
  };
  
  // 过滤分组
  const filteredGroups = groups.filter(group => {
    return searchTerm === '' || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // 获取每个分组中的网站数量
  const getGroupSiteCount = (groupId: string) => {
    return mockSites.filter(site => site.groupId === groupId).length;
  };
  
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
        <h1 className="text-3xl font-bold mb-2">分组管理</h1>
        <p className="text-base-content/70">
          管理您的网站分组，添加、编辑或删除分组。
        </p>
      </motion.div>
      
      {/* 操作栏 */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* 搜索框 */}
        <div className="form-control">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="搜索分组..." 
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
        
        {/* 添加按钮 */}
        <button 
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          添加分组
        </button>
      </motion.div>
      
      {/* 分组列表 */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredGroups.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-semibold">未找到分组</p>
            <p className="text-base-content/70">尝试其他搜索条件或添加新分组</p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <motion.div 
              key={group.id}
              className="card bg-base-100 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title">
                    <span className="text-2xl mr-2">{group.icon}</span>
                    {group.name}
                  </h2>
                  <div className="badge badge-primary">{getGroupSiteCount(group.id)} 个网站</div>
                </div>
                <p className="text-base-content/70">{group.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => openEditModal(group)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    编辑
                  </button>
                  <button 
                    className="btn btn-sm btn-ghost text-error"
                    onClick={() => deleteGroup(group.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    删除
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
      
      {/* 分组编辑/创建模态框 */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedGroup ? '编辑分组' : '添加新分组'}
            </h3>
            <p className="py-4">
              {selectedGroup ? '编辑分组信息' : '请填写新分组的信息'}
            </p>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">分组名称</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="输入分组名称"
                  defaultValue={selectedGroup?.name || ''}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">分组图标</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="输入表情符号作为图标"
                  defaultValue={selectedGroup?.icon || ''}
                />
                <label className="label">
                  <span className="label-text-alt">例如: 🚀, 📚, 🎮, 🎨</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">分组描述</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  placeholder="简要描述分组"
                  defaultValue={selectedGroup?.description || ''}
                ></textarea>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">公开显示</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    defaultChecked={selectedGroup?.isPublic ?? true}
                  />
                </label>
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

export default GroupManager; 