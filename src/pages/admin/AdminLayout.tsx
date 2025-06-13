import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useThemeStore } from '../../hooks/useThemeStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* 侧边栏 */}
      <motion.aside 
        className={`bg-base-100 shadow-lg ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 侧边栏头部 */}
        <div className="p-4 flex items-center justify-between border-b border-base-300">
          {isSidebarOpen ? (
            <div className="text-xl font-bold text-primary">CloudNav云导航管理</div>
          ) : (
            <div className="text-xl font-bold text-primary">CN</div>
          )}
          <button 
            className="btn btn-sm btn-ghost btn-circle"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
            </svg>
          </button>
        </div>
        
        {/* 侧边栏菜单 */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="menu space-y-2">
            <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => `${isActive ? 'active' : ''} flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {isSidebarOpen && <span className="ml-2">仪表盘</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/sites" 
                className={({ isActive }) => `${isActive ? 'active' : ''} flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {isSidebarOpen && <span className="ml-2">网站管理</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/groups" 
                className={({ isActive }) => `${isActive ? 'active' : ''} flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {isSidebarOpen && <span className="ml-2">分组管理</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/settings" 
                className={({ isActive }) => `${isActive ? 'active' : ''} flex items-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isSidebarOpen && <span className="ml-2">设置</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* 侧边栏底部 */}
        <div className="p-4 border-t border-base-300">
          <div className="flex items-center justify-between">
            <button 
              className="btn btn-sm btn-ghost btn-circle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              className="btn btn-sm btn-ghost btn-circle"
              onClick={handleLogout}
              aria-label="退出登录"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            {isSidebarOpen && (
              <div className="text-sm opacity-70">
                {user?.username}
              </div>
            )}
          </div>
        </div>
      </motion.aside>
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="bg-base-100 shadow-md">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">管理后台</h1>
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="btn btn-sm btn-outline">
                返回前台
              </NavLink>
            </div>
          </div>
        </header>
        
        {/* 内容区域 */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 