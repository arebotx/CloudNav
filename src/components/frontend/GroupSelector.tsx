import { motion } from 'framer-motion';
import { Group } from '../../types/models';

interface GroupSelectorProps {
  groups: Group[];
  selectedGroup: string | null;
  onSelectGroup: (groupId: string | null) => void;
}

const GroupSelector = ({ groups, selectedGroup, onSelectGroup }: GroupSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <motion.button
        className={`btn ${!selectedGroup ? 'btn-primary' : 'btn-outline'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelectGroup(null)}
      >
        全部
      </motion.button>
      
      {groups.map((group) => (
        <motion.button
          key={group.id}
          className={`btn ${selectedGroup === group.id ? 'btn-primary' : 'btn-outline'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectGroup(group.id)}
        >
          <span className="mr-2">{group.icon}</span>
          {group.name}
        </motion.button>
      ))}
    </div>
  );
};

export default GroupSelector; 