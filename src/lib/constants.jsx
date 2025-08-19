// Animation variants for Framer Motion
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Todo priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'bg-green-500/20 text-green-300 border-green-500/30',
  [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  [PRIORITY_LEVELS.HIGH]: 'bg-red-500/20 text-red-300 border-red-500/30'
};

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.LOW]: 'Low',
  [PRIORITY_LEVELS.MEDIUM]: 'Medium',
  [PRIORITY_LEVELS.HIGH]: 'High'
};

// Todo categories
export const CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  SHOPPING: 'shopping',
  HEALTH: 'health',
  LEARNING: 'learning',
  OTHER: 'other'
};

export const CATEGORY_COLORS = {
  [CATEGORIES.WORK]: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  [CATEGORIES.PERSONAL]: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  [CATEGORIES.SHOPPING]: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  [CATEGORIES.HEALTH]: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  [CATEGORIES.LEARNING]: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  [CATEGORIES.OTHER]: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
};

export const CATEGORY_LABELS = {
  [CATEGORIES.WORK]: 'Work',
  [CATEGORIES.PERSONAL]: 'Personal',
  [CATEGORIES.SHOPPING]: 'Shopping',
  [CATEGORIES.HEALTH]: 'Health',
  [CATEGORIES.LEARNING]: 'Learning',
  [CATEGORIES.OTHER]: 'Other'
};

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export const FILTER_LABELS = {
  [FILTER_OPTIONS.ALL]: 'All Tasks',
  [FILTER_OPTIONS.ACTIVE]: 'Active',
  [FILTER_OPTIONS.COMPLETED]: 'Completed'
};

// Sort options
export const SORT_OPTIONS = {
  CREATED: 'created',
  PRIORITY: 'priority',
  DUE_DATE: 'dueDate',
  ALPHABETICAL: 'alphabetical'
};

export const SORT_LABELS = {
  [SORT_OPTIONS.CREATED]: 'Date Created',
  [SORT_OPTIONS.PRIORITY]: 'Priority',
  [SORT_OPTIONS.DUE_DATE]: 'Due Date',
  [SORT_OPTIONS.ALPHABETICAL]: 'Alphabetical'
};

// Local storage keys
export const STORAGE_KEYS = {
  TODOS: 'glassmorphism_todos',
  FILTERS: 'glassmorphism_filters',
  THEME: 'glassmorphism_theme'
};

// Default todo structure
export const DEFAULT_TODO = {
  id: '',
  title: '',
  description: '',
  completed: false,
  priority: PRIORITY_LEVELS.MEDIUM,
  category: CATEGORIES.OTHER,
  dueDate: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// App configuration
export const APP_CONFIG = {
  name: 'Glassmorphism Todo',
  version: '1.0.0',
  maxTitleLength: 100,
  maxDescriptionLength: 500,
  autoSaveDelay: 1000,
  animationDuration: 300
};

// Glassmorphism CSS classes
export const GLASS_STYLES = {
  card: 'backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl',
  input: 'backdrop-blur-md bg-white/5 border border-white/20 rounded-lg',
  button: 'backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200',
  modal: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl',
  sidebar: 'backdrop-blur-lg bg-white/5 border-r border-white/10'
};