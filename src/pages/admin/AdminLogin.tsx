import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useThemeStore } from '../../hooks/useThemeStore';

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
      remember: false
    }
  });
  
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await login(data.username, data.password);
      
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('用户名或密码错误');
      }
    } catch (err) {
      setError('登录时发生错误，请稍后再试');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <motion.div 
        className="card bg-base-100 shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                CloudNav云导航 | 管理登录
              </span>
            </h1>
            <button 
              className="btn btn-ghost btn-circle"
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
          </div>
          
          {error && (
            <div className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">用户名</span>
              </label>
              <input 
                type="text" 
                className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                {...register('username', { required: '请输入用户名' })}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username.message}</span>
                </label>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">密码</span>
              </label>
              <input 
                type="password" 
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                {...register('password', { required: '请输入密码' })}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-primary checkbox-sm" 
                    {...register('remember')}
                  />
                  <span className="label-text ml-2">记住我</span>
                </label>
              </div>
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </div>
          </form>
          
          <div className="divider my-6">或者</div>
          
          <div className="text-center">
            <Link to="/" className="btn btn-outline btn-block">
              返回前台
            </Link>
          </div>
          
          <div className="text-center mt-4 text-sm opacity-70">
            <p>默认用户名: admin</p>
            <p>默认密码: password</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 