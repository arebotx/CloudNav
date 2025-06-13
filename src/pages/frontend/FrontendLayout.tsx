import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import FrontendHeader from '../../components/frontend/FrontendHeader';
import FrontendFooter from '../../components/frontend/FrontendFooter';

const FrontendLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <FrontendHeader />
      
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>
      
      <FrontendFooter />
    </div>
  );
};

export default FrontendLayout; 