import { Category, CategoryInfo } from '@/shared/types';

export const categoryInfo: Record<Category, CategoryInfo> = {
  food: {
    name: 'Food',
    icon: '🍔',
    color: 'hsl(var(--category-food))',
  },
  travel: {
    name: 'Travel',
    icon: '✈️',
    color: 'hsl(var(--category-travel))',
  },
  shopping: {
    name: 'Shopping',
    icon: '🛍',
    color: 'hsl(var(--category-shopping))',
  },
  transport: {
    name: 'Transport',
    icon: '🚕',
    color: 'hsl(var(--category-transport))',
  },
  entertainment: {
    name: 'Entertainment',
    icon: '🎮',
    color: 'hsl(var(--category-entertainment))',
  },
};
