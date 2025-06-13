import { Link } from 'react-router-dom';

const FrontendFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CloudNav云导航</h3>
            <p className="opacity-80">
              一个美观、实用的网站导航工具，帮助您整理和快速访问常用网站。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">首页</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">关于</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary transition-colors">管理后台</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary">React</span>
              <span className="badge badge-secondary">Vite</span>
              <span className="badge badge-accent">TailwindCSS</span>
              <span className="badge">DaisyUI</span>
              <span className="badge badge-outline">Cloudflare Workers</span>
            </div>
          </div>
        </div>
        
        <div className="divider my-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-70">
            &copy; {currentYear} CloudNav云导航 - 版权所有
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FrontendFooter; 