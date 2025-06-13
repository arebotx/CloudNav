import { useState } from 'react';
import { motion } from 'framer-motion';

const BackupRestore = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [backupHistory, setBackupHistory] = useState([
    { id: '1', name: '完整备份_20230615_083022.json', size: '1.2 MB', date: '2023-06-15 08:30:22', type: '完整' },
    { id: '2', name: '网站数据_20230610_142245.json', size: '0.8 MB', date: '2023-06-10 14:22:45', type: '仅网站数据' },
    { id: '3', name: '配置备份_20230605_091530.json', size: '0.3 MB', date: '2023-06-05 09:15:30', type: '仅配置' }
  ]);
  
  // 创建备份
  const handleBackup = (type: string) => {
    setIsBackingUp(true);
    setBackupSuccess(false);
    
    // 模拟备份过程
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupSuccess(true);
      
      // 添加新备份到历史记录
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);
      const formattedDate = dateStr.replace(/-/g, '').replace(/:/g, '').replace(' ', '_').substring(0, 15);
      
      let typeName = '完整';
      if (type === 'sites') typeName = '仅网站数据';
      if (type === 'config') typeName = '仅配置';
      
      const newBackup = {
        id: Math.random().toString(36).substring(2, 9),
        name: `${typeName}备份_${formattedDate}.json`,
        size: (Math.random() * 1 + 0.2).toFixed(1) + ' MB',
        date: dateStr,
        type: typeName
      };
      
      setBackupHistory([newBackup, ...backupHistory]);
      
      // 3秒后隐藏成功消息
      setTimeout(() => setBackupSuccess(false), 3000);
    }, 1500);
  };
  
  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // 恢复备份
  const handleRestore = () => {
    if (!selectedFile) return;
    
    setIsRestoring(true);
    setRestoreSuccess(false);
    
    // 模拟恢复过程
    setTimeout(() => {
      setIsRestoring(false);
      setRestoreSuccess(true);
      setSelectedFile(null);
      
      // 重置文件输入
      const fileInput = document.getElementById('restore-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // 3秒后隐藏成功消息
      setTimeout(() => setRestoreSuccess(false), 3000);
    }, 2000);
  };
  
  // 下载备份文件
  const downloadBackup = (backupId: string) => {
    const backup = backupHistory.find(b => b.id === backupId);
    if (!backup) return;
    
    // 在实际应用中，这里会调用API下载文件
    // 这里只是模拟下载过程
    const link = document.createElement('a');
    link.href = '#';
    link.download = backup.name;
    link.click();
  };
  
  // 删除备份
  const deleteBackup = (backupId: string) => {
    setBackupHistory(backupHistory.filter(backup => backup.id !== backupId));
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">备份与恢复</h1>
        <p className="text-base-content/70">
          管理您的数据备份，创建新备份或从现有备份恢复。
        </p>
      </motion.div>
      
      {/* 成功消息 */}
      {backupSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>备份已成功创建！</span>
          </div>
        </div>
      )}
      
      {restoreSuccess && (
        <div className="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>数据已成功恢复！</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 创建备份 */}
        <motion.div 
          className="card bg-base-100 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-body">
            <h2 className="card-title">创建备份</h2>
            <p className="text-base-content/70 mb-4">
              选择要备份的数据类型，系统将为您创建一个可下载的备份文件。
            </p>
            
            <div className="space-y-4">
              <button 
                className={`btn btn-primary w-full ${isBackingUp ? 'loading' : ''}`}
                onClick={() => handleBackup('full')}
                disabled={isBackingUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                完整备份
              </button>
              
              <button 
                className={`btn btn-outline w-full ${isBackingUp ? 'loading' : ''}`}
                onClick={() => handleBackup('sites')}
                disabled={isBackingUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                仅备份网站数据
              </button>
              
              <button 
                className={`btn btn-outline w-full ${isBackingUp ? 'loading' : ''}`}
                onClick={() => handleBackup('config')}
                disabled={isBackingUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                仅备份配置
              </button>
            </div>
            
            <div className="divider">自动备份</div>
            
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">启用每日自动备份</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">保留备份数量</span>
              </label>
              <select className="select select-bordered w-full">
                <option value="3">保留最近3个</option>
                <option value="5">保留最近5个</option>
                <option value="10">保留最近10个</option>
                <option value="0">保留所有</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* 恢复备份 */}
        <motion.div 
          className="card bg-base-100 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-body">
            <h2 className="card-title">恢复备份</h2>
            <p className="text-base-content/70 mb-4">
              上传备份文件以恢复您的数据。注意：恢复操作将覆盖当前数据。
            </p>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">选择备份文件</span>
              </label>
              <input 
                type="file" 
                className="file-input file-input-bordered w-full" 
                accept=".json"
                id="restore-file"
                onChange={handleFileChange}
              />
            </div>
            
            {selectedFile && (
              <div className="alert alert-info mt-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <div className="font-bold">已选择文件</div>
                    <div className="text-xs">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</div>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              className={`btn btn-primary mt-4 ${isRestoring ? 'loading' : ''}`}
              onClick={handleRestore}
              disabled={!selectedFile || isRestoring}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              恢复数据
            </button>
            
            <div className="alert alert-warning mt-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>警告：恢复操作将覆盖当前所有数据，请确保您有最新的备份。</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 备份历史 */}
      <motion.div 
        className="card bg-base-100 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="card-body">
          <h2 className="card-title">备份历史</h2>
          <p className="text-base-content/70 mb-4">
            管理您之前创建的备份文件。
          </p>
          
          <div className="overflow-x-auto">
            {backupHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📁</div>
                <p className="text-lg font-semibold">暂无备份</p>
                <p className="text-base-content/70">创建您的第一个备份来保护您的数据</p>
              </div>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>备份名称</th>
                    <th>类型</th>
                    <th>大小</th>
                    <th>创建日期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {backupHistory.map((backup) => (
                    <tr key={backup.id} className="hover">
                      <td>{backup.name}</td>
                      <td>{backup.type}</td>
                      <td>{backup.size}</td>
                      <td>{backup.date}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn btn-sm btn-ghost"
                            onClick={() => downloadBackup(backup.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          <button 
                            className="btn btn-sm btn-ghost text-error"
                            onClick={() => deleteBackup(backup.id)}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BackupRestore; 