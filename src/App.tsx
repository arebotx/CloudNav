import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore } from './hooks/useThemeStore';

// 前台页面
import FrontendLayout from './pages/frontend/FrontendLayout';
import HomePage from './pages/frontend/HomePage';
import SearchPage from './pages/frontend/SearchPage';
import AboutPage from './pages/frontend/AboutPage';

// 后台页面
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import SiteManager from './pages/admin/SiteManager';
import GroupManager from './pages/admin/GroupManager';
import Settings from './pages/admin/Settings';

// 认证守卫
import AuthGuard from './components/AuthGuard';

function App() {
  const { theme, setTheme } = useThemeStore();
  
  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    // 初始化主题
    if (!theme) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme, theme]);
  
  // 应用主题
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);
  
  return (
    <Routes>
      {/* 前台路由 */}
      <Route path="/" element={<FrontendLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
      
      {/* 后台路由 */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sites" element={<SiteManager />} />
        <Route path="groups" element={<GroupManager />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      {/* 404 路由 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App; 