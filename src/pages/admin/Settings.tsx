import { useState } from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'CloudNav云导航',
    siteDescription: '个人收藏的网站导航',
    theme: 'auto',
    enableSearch: true,
    enablePublicSubmissions: false,
    requireApproval: true,
    analyticsEnabled: true,
    apiKey: 'sk_test_123456789',
    maxSitesPerGroup: 20,
    defaultGroupIcon: '🌐',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // 模拟API保存
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // 3秒后隐藏成功消息
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };
  
  const regenerateApiKey = () => {
    // 生成随机API密钥
    const newKey = 'sk_test_' + Math.random().toString(36).substring(2, 15);
    setSettings(prev => ({ ...prev, apiKey: newKey }));
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">系统设置</h1>
        <p className="text-base-content/70">
          配置您的导航网站的基本设置和功能选项。
        </p>
      </motion.div>
      
      {saveSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>设置已保存成功！</span>
          </div>
        </div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* 基本设置 */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">基本设置</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">网站名称</span>
                </label>
                <input 
                  type="text" 
                  name="siteName"
                  className="input input-bordered w-full" 
                  value={settings.siteName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">主题</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                >
                  <option value="light">浅色模式</option>
                  <option value="dark">深色模式</option>
                  <option value="auto">自动（跟随系统）</option>
                </select>
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">网站描述</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">每组最大网站数量</span>
                </label>
                <input 
                  type="number" 
                  name="maxSitesPerGroup"
                  className="input input-bordered w-full" 
                  value={settings.maxSitesPerGroup}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">默认分组图标</span>
                </label>
                <input 
                  type="text" 
                  name="defaultGroupIcon"
                  className="input input-bordered w-full" 
                  value={settings.defaultGroupIcon}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 功能设置 */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">功能设置</h2>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">启用搜索功能</span>
                  <input 
                    type="checkbox" 
                    name="enableSearch"
                    className="toggle toggle-primary" 
                    checked={settings.enableSearch}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">允许公开提交网站</span>
                  <input 
                    type="checkbox" 
                    name="enablePublicSubmissions"
                    className="toggle toggle-primary" 
                    checked={settings.enablePublicSubmissions}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">公开提交需要审核</span>
                  <input 
                    type="checkbox" 
                    name="requireApproval"
                    className="toggle toggle-primary" 
                    checked={settings.requireApproval}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">启用访问统计</span>
                  <input 
                    type="checkbox" 
                    name="analyticsEnabled"
                    className="toggle toggle-primary" 
                    checked={settings.analyticsEnabled}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* API设置 */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">API设置</h2>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">API密钥</span>
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="apiKey"
                  className="input input-bordered w-full" 
                  value={settings.apiKey}
                  onChange={handleChange}
                  readOnly
                />
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={regenerateApiKey}
                >
                  重新生成
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-warning">注意：重新生成API密钥将使当前密钥失效</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? '保存中...' : '保存设置'}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Settings; 