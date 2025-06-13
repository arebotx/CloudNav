import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClickData {
  date: string;
  count: number;
}

interface PopularSite {
  id: string;
  name: string;
  url: string;
  clicks: number;
  groupName: string;
}

interface ReferrerData {
  source: string;
  count: number;
  percentage: number;
}

interface DeviceData {
  type: string;
  count: number;
  percentage: number;
}

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7days');
  const [totalClicks, setTotalClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState<ClickData[]>([]);
  const [popularSites, setPopularSites] = useState<PopularSite[]>([]);
  const [referrers, setReferrers] = useState<ReferrerData[]>([]);
  const [devices, setDevices] = useState<DeviceData[]>([]);
  
  // 模拟从API获取数据
  useEffect(() => {
    const fetchData = async () => {
      // 在实际应用中，这里会调用API
      setTimeout(() => {
        // 生成模拟数据
        generateMockData(dateRange);
        setIsLoading(false);
      }, 800);
    };
    
    setIsLoading(true);
    fetchData();
  }, [dateRange]);
  
  // 生成模拟数据
  const generateMockData = (range: string) => {
    // 生成日期范围
    let days = 7;
    if (range === '30days') days = 30;
    if (range === '90days') days = 90;
    
    // 生成每日点击数据
    const clicks: ClickData[] = [];
    let total = 0;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // 生成随机点击数，周末点击量较低
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const count = Math.floor(Math.random() * (isWeekend ? 50 : 150)) + (isWeekend ? 20 : 80);
      
      total += count;
      
      clicks.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    setTotalClicks(total);
    setDailyClicks(clicks);
    
    // 生成热门网站数据
    const sites: PopularSite[] = [
      { id: '1', name: 'GitHub', url: 'https://github.com', clicks: Math.floor(total * 0.25), groupName: '开发工具' },
      { id: '2', name: 'Stack Overflow', url: 'https://stackoverflow.com', clicks: Math.floor(total * 0.18), groupName: '开发工具' },
      { id: '3', name: 'Google', url: 'https://google.com', clicks: Math.floor(total * 0.15), groupName: '搜索引擎' },
      { id: '4', name: 'YouTube', url: 'https://youtube.com', clicks: Math.floor(total * 0.12), groupName: '视频' },
      { id: '5', name: 'Bilibili', url: 'https://bilibili.com', clicks: Math.floor(total * 0.08), groupName: '视频' },
      { id: '6', name: 'MDN', url: 'https://developer.mozilla.org', clicks: Math.floor(total * 0.07), groupName: '开发文档' },
      { id: '7', name: '掘金', url: 'https://juejin.cn', clicks: Math.floor(total * 0.06), groupName: '技术社区' },
      { id: '8', name: 'V2EX', url: 'https://v2ex.com', clicks: Math.floor(total * 0.05), groupName: '技术社区' },
      { id: '9', name: 'React文档', url: 'https://reactjs.org', clicks: Math.floor(total * 0.04), groupName: '开发文档' },
      { id: '10', name: 'TypeScript文档', url: 'https://www.typescriptlang.org', clicks: Math.floor(total * 0.03), groupName: '开发文档' }
    ];
    
    setPopularSites(sites);
    
    // 生成来源数据
    const refData: ReferrerData[] = [
      { source: '直接访问', count: Math.floor(total * 0.45), percentage: 45 },
      { source: '搜索引擎', count: Math.floor(total * 0.25), percentage: 25 },
      { source: '社交媒体', count: Math.floor(total * 0.15), percentage: 15 },
      { source: '外部链接', count: Math.floor(total * 0.10), percentage: 10 },
      { source: '邮件链接', count: Math.floor(total * 0.05), percentage: 5 }
    ];
    
    setReferrers(refData);
    
    // 生成设备数据
    const deviceData: DeviceData[] = [
      { type: '桌面端', count: Math.floor(total * 0.65), percentage: 65 },
      { type: '移动端', count: Math.floor(total * 0.30), percentage: 30 },
      { type: '平板', count: Math.floor(total * 0.05), percentage: 5 }
    ];
    
    setDevices(deviceData);
  };
  
  // 获取日期格式化函数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  // 计算最大点击数用于图表缩放
  const maxClicks = Math.max(...dailyClicks.map(day => day.count));
  
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
        <h1 className="text-3xl font-bold mb-2">统计分析</h1>
        <p className="text-base-content/70">
          查看网站访问数据和用户行为分析。
        </p>
      </motion.div>
      
      {/* 日期范围选择器 */}
      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <select 
          className="select select-bordered" 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="7days">最近7天</option>
          <option value="30days">最近30天</option>
          <option value="90days">最近90天</option>
        </select>
      </motion.div>
      
      {/* 总览卡片 */}
      <motion.div 
        className="stats shadow w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="stat-title">总点击次数</div>
          <div className="stat-value text-primary">{totalClicks.toLocaleString()}</div>
          <div className="stat-desc">所选时间段内</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-title">平均每日点击</div>
          <div className="stat-value text-secondary">{Math.round(totalClicks / dailyClicks.length).toLocaleString()}</div>
          <div className="stat-desc">所选时间段内</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="stat-title">最高单日点击</div>
          <div className="stat-value text-accent">{maxClicks.toLocaleString()}</div>
          <div className="stat-desc">{dailyClicks.find(day => day.count === maxClicks)?.date}</div>
        </div>
      </motion.div>
      
      {/* 图表和热门网站 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 点击趋势图 */}
        <motion.div 
          className="card bg-base-100 shadow-md lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-body">
            <h2 className="card-title">点击趋势</h2>
            <div className="h-80">
              <div className="flex h-full flex-col">
                <div className="flex-1 flex items-end">
                  {dailyClicks.map((day) => (
                    <div 
                      key={day.date} 
                      className="flex flex-col items-center flex-1"
                    >
                      <div 
                        className="w-full mx-1 rounded-t bg-primary" 
                        style={{ 
                          height: `${(day.count / maxClicks) * 100}%`,
                          minHeight: '4px'
                        }}
                        title={`${day.date}: ${day.count} 次点击`}
                      ></div>
                      <div className="text-xs mt-2 text-base-content/70">
                        {formatDate(day.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 热门网站 */}
        <motion.div 
          className="card bg-base-100 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card-body">
            <h2 className="card-title">热门网站</h2>
            <div className="overflow-y-auto max-h-80">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>网站</th>
                    <th>点击</th>
                  </tr>
                </thead>
                <tbody>
                  {popularSites.map((site) => (
                    <tr key={site.id} className="hover">
                      <td>
                        <div className="font-bold">{site.name}</div>
                        <div className="text-xs text-base-content/70">{site.groupName}</div>
                      </td>
                      <td>
                        <div className="text-right">{site.clicks.toLocaleString()}</div>
                        <div className="text-xs text-right text-base-content/70">
                          {Math.round((site.clicks / totalClicks) * 100)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 来源和设备 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 访问来源 */}
        <motion.div 
          className="card bg-base-100 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="card-body">
            <h2 className="card-title">访问来源</h2>
            <div className="space-y-4">
              {referrers.map((ref) => (
                <div key={ref.source}>
                  <div className="flex justify-between mb-1">
                    <span>{ref.source}</span>
                    <span>{ref.count.toLocaleString()} ({ref.percentage}%)</span>
                  </div>
                  <div className="w-full bg-base-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${ref.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* 设备类型 */}
        <motion.div 
          className="card bg-base-100 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="card-body">
            <h2 className="card-title">设备类型</h2>
            <div className="flex justify-center items-center h-64">
              <div className="w-full max-w-xs">
                {devices.map((device, index) => {
                  // 为不同设备类型使用不同颜色
                  const colors = ['bg-primary', 'bg-secondary', 'bg-accent'];
                  return (
                    <div key={device.type} className="mb-6">
                      <div className="flex justify-between mb-1">
                        <span>{device.type}</span>
                        <span>{device.count.toLocaleString()} ({device.percentage}%)</span>
                      </div>
                      <div className="w-full bg-base-200 rounded-full h-4">
                        <div 
                          className={`${colors[index % colors.length]} h-4 rounded-full`} 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics; 