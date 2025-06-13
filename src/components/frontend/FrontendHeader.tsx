import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../hooks/useThemeStore';

const FrontendHeader = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          {/* Logo */}
          <div className="navbar-start">
            <Link to="/" className="flex items-center">
              <motion.div
                className="text-2xl font-bold text-primary"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  CloudNav云导航
                </span>
              </motion.div>
            </Link>
          </div>
          
          {/* 搜索框 - 在中等屏幕以上显示 */}
          <div className="navbar-center hidden md:flex">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索网站..."
                className="input input-bordered w-64 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* 菜单和主题切换 */}
          <div className="navbar-end">
            <button 
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
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
            
            {/* 移动端菜单按钮 */}
            <div className="dropdown dropdown-end">
              <label 
                tabIndex={0} 
                className="btn btn-ghost btn-circle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </label>
              {isMenuOpen && (
                <ul 
                  tabIndex={0} 
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active font-bold' : ''}>
                      首页
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active font-bold' : ''}>
                      关于
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin" className={({ isActive }) => isActive ? 'active font-bold' : ''}>
                      管理后台
                    </NavLink>
                  </li>
                  <li className="md:hidden">
                    <form onSubmit={handleSearch} className="flex w-full">
                      <input
                        type="text"
                        placeholder="搜索网站..."
                        className="input input-bordered w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FrontendHeader; 