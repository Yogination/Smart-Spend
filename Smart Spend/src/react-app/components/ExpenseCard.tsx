import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Expense } from '@/shared/types';
import { categoryInfo } from '@/react-app/lib/categories';

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: string) => void;
  index: number;
}

export default function ExpenseCard({ expense, onDelete, index }: ExpenseCardProps) {
  const category = categoryInfo[expense.category];
  const date = new Date(expense.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05, type: 'spring', damping: 25, stiffness: 300 }}
      className="glass rounded-2xl p-4 hover:glass-strong transition-all group"
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
          style={{ backgroundColor: category.color + '20' }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <span>{category.icon}</span>
        </motion.div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{expense.description}</h4>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xl font-bold" style={{ color: category.color }}>
              ${expense.amount.toFixed(2)}
            </p>
          </div>

          <motion.button
            onClick={() => onDelete(expense.id)}
            className="opacity-0 group-hover:opacity-100 p-2 rounded-xl hover:bg-destructive/10 text-destructive transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
