import { useState } from 'react';
import { motion } from 'framer-motion';
import { Site } from '../../types/models';

interface SiteCardProps {
  site: Site;
}

const SiteCard = ({ site }: SiteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleVisit = () => {
    window.open(site.url, '_blank');
    // 在实际应用中，这里会调用API增加点击计数
  };
  
  return (
    <motion.div
      className="card card-hover bg-base-100 shadow-md overflow-hidden"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVisit}
    >
      <div className="relative h-32 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
        {site.icon && (
          <img 
            src={site.icon} 
            alt={`${site.title} 图标`} 
            className="h-16 w-16 object-contain"
            onError={(e) => {
              // 图标加载失败时显示首字母
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        {isHovered && site.screenshot && (
          <div className="absolute inset-0 bg-base-100 z-10 flex items-center justify-center">
            <img 
              src={site.screenshot} 
              alt={`${site.title} 预览`} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="card-body p-4">
        <h3 className="card-title text-lg">{site.title}</h3>
        <p className="text-sm opacity-70 line-clamp-2">{site.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {site.tags.map((tag) => (
            <span key={tag} className="badge badge-sm badge-outline">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SiteCard; 