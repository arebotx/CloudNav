import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            关于 CloudNav云导航
          </span>
        </h1>
        <p className="text-lg opacity-80">
          一个现代化的网站导航工具，帮助您整理和快速访问常用网站。
        </p>
      </motion.div>
      
      <motion.section
        className="card bg-base-100 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">项目介绍</h2>
          <p className="mb-4">
            CloudNav云导航是一个基于Cloudflare Workers构建的网站导航工具，旨在提供一个简洁、高效的方式来组织和访问您喜爱的网站。
          </p>
          <p>
            无论是工作、学习还是娱乐，CF导航都能帮助您快速找到所需的网站，提高您的浏览效率。您可以按照分类整理网站，添加标签，并通过搜索功能快速定位。
          </p>
        </div>
      </motion.section>
      
      <motion.section
        className="card bg-base-100 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">主要功能</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>网站分组管理</li>
            <li>快速搜索</li>
            <li>自定义标签</li>
            <li>响应式设计，支持各种设备</li>
            <li>暗色/亮色模式切换</li>
            <li>一键部署到Cloudflare Workers</li>
          </ul>
        </div>
      </motion.section>
      
      <motion.section
        className="card bg-base-100 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-primary">React</span>
            <span className="badge badge-secondary">TypeScript</span>
            <span className="badge badge-accent">TailwindCSS</span>
            <span className="badge">DaisyUI</span>
            <span className="badge badge-outline">Cloudflare Workers</span>
            <span className="badge badge-outline">Cloudflare KV</span>
            <span className="badge badge-outline">Cloudflare D1</span>
            <span className="badge badge-outline">Hono</span>
          </div>
          <p>
            CF导航采用现代化的前端技术栈，结合Cloudflare的强大服务，提供高性能、可靠的用户体验。
          </p>
        </div>
      </motion.section>
      
      <motion.section
        className="card bg-base-100 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">联系我们</h2>
          <p>
            如果您有任何问题、建议或反馈，请通过以下方式联系我们：
          </p>
          <div className="flex items-center space-x-2 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>contact@example.com</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage; 