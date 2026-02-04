import { motion } from 'framer-motion';
import { CategoryInfo } from '@/shared/types';

interface CategoryCardProps {
  category: CategoryInfo;
  amount: number;
  index: number;
}

export default function CategoryCard({ category, amount, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', damping: 25, stiffness: 300 }}
      className="glass rounded-3xl p-6 hover:glass-strong transition-all"
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-lg"
        style={{ backgroundColor: category.color + '20' }}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <span>{category.icon}</span>
      </motion.div>

      <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
      <p className="text-2xl font-bold" style={{ color: category.color }}>
        ${amount.toFixed(2)}
      </p>
    </motion.div>
  );
}
