export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export type Category = 'food' | 'travel' | 'shopping' | 'transport' | 'entertainment';

export interface CategoryInfo {
  name: string;
  icon: string;
  color: string;
}
