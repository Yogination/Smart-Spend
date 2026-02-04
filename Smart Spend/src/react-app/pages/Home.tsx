import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Expense, Category } from '@/shared/types';
import { categoryInfo } from '@/react-app/lib/categories';
import ThemeToggle from '@/react-app/components/ThemeToggle';
import AddExpenseModal from '@/react-app/components/AddExpenseModal';
import ExpenseCard from '@/react-app/components/ExpenseCard';
import CategoryCard from '@/react-app/components/CategoryCard';
import EmptyState from '@/react-app/components/EmptyState';
import { Button } from '@/react-app/components/ui/button';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedTotal, setDisplayedTotal] = useState(0);

  // Load expenses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('smartspend-expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('smartspend-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Animated counting effect for total
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = totalSpent / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, totalSpent);
      setDisplayedTotal(current);

      if (step >= steps || current >= totalSpent) {
        setDisplayedTotal(totalSpent);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalSpent]);

  const addExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<Category, number>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                SmartSpend
              </h1>
              <p className="text-muted-foreground mt-1">Track your expenses with style</p>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          {/* Total Spending Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-strong rounded-3xl p-8 mb-8 shadow-2xl border-2 border-white/20"
          >
            <p className="text-muted-foreground mb-2 text-lg">Total Spent</p>
            <motion.h2
              key={displayedTotal}
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
            >
              ${displayedTotal.toFixed(2)}
            </motion.h2>
          </motion.div>

          {/* Category Cards */}
          {Object.keys(categoryTotals).length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(Object.keys(categoryInfo) as Category[]).map((category, index) => (
                  <CategoryCard
                    key={category}
                    category={categoryInfo[category]}
                    amount={categoryTotals[category] || 0}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Expenses List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Recent Expenses</h3>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="h-12 px-6 rounded-2xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-semibold shadow-lg shadow-primary/25"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Expense
                </Button>
              </motion.div>
            </div>

            {expenses.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {expenses.map((expense, index) => (
                    <ExpenseCard
                      key={expense.id}
                      expense={expense}
                      onDelete={deleteExpense}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>

        {/* Floating Add Button (Mobile) */}
        <motion.div
          className="fixed bottom-6 right-6 md:hidden z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', damping: 15, stiffness: 300 }}
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-500 shadow-2xl shadow-primary/40 flex items-center justify-center text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </motion.div>

        {/* Add Expense Modal */}
        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addExpense}
        />
      </div>
    </div>
  );
}
