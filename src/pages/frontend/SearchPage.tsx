import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SiteCard from '../../components/frontend/SiteCard';
import { Site } from '../../types/models';

// 导入模拟数据（在实际应用中会从API获取）
import { mockSites } from '../../data/mockData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const searchSites = async () => {
      setIsLoading(true);
      
      // 在实际应用中，这里会调用搜索API
      // 这里使用模拟数据进行简单的客户端搜索
      setTimeout(() => {
        const filteredSites = mockSites.filter(site => 
          site.title.toLowerCase().includes(query.toLowerCase()) || 
          site.description.toLowerCase().includes(query.toLowerCase()) ||
          site.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        setResults(filteredSites);
        setIsLoading(false);
      }, 500);
    };
    
    if (query) {
      searchSites();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);
  
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
        className="text-center py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">搜索结果</h1>
        <p className="text-lg opacity-80">
          {query ? `"${query}" 的搜索结果` : '请输入搜索关键词'}
        </p>
      </motion.div>
      
      {query && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">未找到结果</h2>
          <p className="opacity-70">
            没有找到与 "{query}" 相关的网站，请尝试其他关键词。
          </p>
        </div>
      )}
      
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage; 