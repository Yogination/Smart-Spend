import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Category, Expense } from '@/shared/types';
import { categoryInfo } from '@/react-app/lib/categories';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Expense) => void;
}

export default function AddExpenseModal({ isOpen, onClose, onAdd }: AddExpenseModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category: selectedCategory,
      description: description || categoryInfo[selectedCategory].name,
      date: new Date().toISOString(),
    };

    onAdd(newExpense);
    setAmount('');
    setDescription('');
    setSelectedCategory('food');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Add Expense
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-10 text-2xl font-bold h-14 rounded-2xl glass border-white/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Category</label>
                  <div className="grid grid-cols-5 gap-2">
                    {(Object.keys(categoryInfo) as Category[]).map((category) => (
                      <motion.button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`p-3 rounded-2xl transition-all ${
                          selectedCategory === category
                            ? 'glass-strong shadow-lg scale-105'
                            : 'glass hover:glass-strong'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          borderColor:
                            selectedCategory === category
                              ? categoryInfo[category].color
                              : 'transparent',
                          borderWidth: '2px',
                        }}
                      >
                        <span className="text-2xl">{categoryInfo[category].icon}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={categoryInfo[selectedCategory].name}
                    className="h-12 rounded-2xl glass border-white/20"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-semibold text-lg shadow-lg shadow-primary/25"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Expense
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
