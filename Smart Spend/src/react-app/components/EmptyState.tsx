import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        className="w-32 h-32 rounded-full glass flex items-center justify-center mb-6"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Wallet className="w-16 h-16 text-primary" />
      </motion.div>

      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        No expenses yet
      </h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Start tracking your spending by adding your first expense
      </p>
    </motion.div>
  );
}
