import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
  isActive: boolean;
  avatar: string;
}

const UserManager = () => {
  // 模拟用户数据
  const mockUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      lastLogin: '2023-06-15 08:30:22',
      isActive: true,
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Admin'
    },
    {
      id: '2',
      username: 'editor1',
      email: 'editor@example.com',
      role: 'editor',
      lastLogin: '2023-06-14 14:22:45',
      isActive: true,
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Editor'
    },
    {
      id: '3',
      username: 'viewer1',
      email: 'viewer@example.com',
      role: 'viewer',
      lastLogin: '2023-06-10 09:15:30',
      isActive: false,
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Viewer'
    }
  ];
  
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        setUsers(mockUsers);
        setIsLoading(false);
      }, 500);
    };
    
    fetchData();
  }, []);
  
  // 打开编辑模态框
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  // 打开新建模态框
  const openCreateModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };
  
  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  
  // 删除用户
  const deleteUser = (id: string) => {
    // 在实际应用中，这里会调用API
    setUsers(users.filter(user => user.id !== id));
  };
  
  // 切换用户状态
  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
    }));
  };
  
  // 过滤用户
  const filteredUsers = users.filter(user => {
    // 搜索条件
    const matchesSearch = searchTerm === '' || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 角色过滤
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // 状态过滤
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // 获取角色标签类名
  const getRoleBadgeClass = (role: string) => {
    switch(role) {
      case 'admin': return 'badge-primary';
      case 'editor': return 'badge-secondary';
      case 'viewer': return 'badge-accent';
      default: return 'badge-ghost';
    }
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
        <h1 className="text-3xl font-bold mb-2">用户管理</h1>
        <p className="text-base-content/70">
          管理系统用户，设置权限和账户状态。
        </p>
      </motion.div>
      
      {/* 操作栏 */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 justify-between items-start"
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
                placeholder="搜索用户..." 
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
          
          {/* 角色过滤 */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full max-w-xs" 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">所有角色</option>
              <option value="admin">管理员</option>
              <option value="editor">编辑者</option>
              <option value="viewer">访问者</option>
            </select>
          </div>
          
          {/* 状态过滤 */}
          <div className="form-control">
            <select 
              className="select select-bordered w-full max-w-xs" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">所有状态</option>
              <option value="active">活跃</option>
              <option value="inactive">停用</option>
            </select>
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
          添加用户
        </button>
      </motion.div>
      
      {/* 用户列表 */}
      <motion.div 
        className="overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-semibold">未找到用户</p>
            <p className="text-base-content/70">尝试其他搜索条件或添加新用户</p>
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>角色</th>
                <th>最后登录</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user.avatar} alt={user.username} />
                      </div>
                    </div>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className={`badge ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </div>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <label className="swap">
                      <input 
                        type="checkbox" 
                        checked={user.isActive}
                        onChange={() => toggleUserStatus(user.id)}
                      />
                      <div className="swap-on badge badge-success">活跃</div>
                      <div className="swap-off badge badge-error">停用</div>
                    </label>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-sm btn-ghost"
                        onClick={() => openEditModal(user)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        className="btn btn-sm btn-ghost text-error"
                        onClick={() => deleteUser(user.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
      
      {/* 用户编辑/创建模态框 */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {selectedUser ? '编辑用户' : '添加新用户'}
            </h3>
            <p className="py-4">
              {selectedUser ? '编辑用户信息' : '请填写新用户的信息'}
            </p>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">用户名</span>
                </label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="输入用户名"
                  defaultValue={selectedUser?.username || ''}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">邮箱</span>
                </label>
                <input 
                  type="email" 
                  className="input input-bordered w-full" 
                  placeholder="输入邮箱地址"
                  defaultValue={selectedUser?.email || ''}
                />
              </div>
              
              {!selectedUser && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">密码</span>
                  </label>
                  <input 
                    type="password" 
                    className="input input-bordered w-full" 
                    placeholder="输入密码"
                  />
                </div>
              )}
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">角色</span>
                </label>
                <select 
                  className="select select-bordered w-full" 
                  defaultValue={selectedUser?.role || 'viewer'}
                >
                  <option value="admin">管理员</option>
                  <option value="editor">编辑者</option>
                  <option value="viewer">访问者</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">账户状态</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary" 
                    defaultChecked={selectedUser?.isActive ?? true}
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

export default UserManager; 