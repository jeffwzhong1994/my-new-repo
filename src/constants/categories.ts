import { CategoryDef } from '../types';

/**
 * Category definitions mapping Empower category names to emojis and colors.
 * Includes exact names AND common Empower variants (plural, slash-separated, etc.)
 */
export const DEFAULT_CATEGORIES: CategoryDef[] = [
  // ---- Housing ----
  { name: 'Mortgage', emoji: '🏠', color: '#5b8af5' },
  { name: 'Mortgages', emoji: '🏠', color: '#5b8af5' },
  { name: 'Mortgage & Rent', emoji: '🏠', color: '#5b8af5' },
  { name: 'Rent', emoji: '🔑', color: '#7c8cf5' },
  { name: 'Home', emoji: '🏡', color: '#4a9eff' },
  { name: 'Home Improvement', emoji: '🔨', color: '#6a8eff' },
  { name: 'Home Services', emoji: '🏗️', color: '#3d7ee0' },

  // ---- Kids / Family ----
  { name: 'Kids', emoji: '👶', color: '#f5a623' },
  { name: 'Child/Dependent', emoji: '👶', color: '#f5a623' },
  { name: 'Childcare', emoji: '🍼', color: '#f5b84a' },

  // ---- Auto ----
  { name: 'Car', emoji: '🚗', color: '#e74c6f' },
  { name: 'Auto & Transport', emoji: '🚗', color: '#e74c6f' },
  { name: 'Auto Payment', emoji: '🚗', color: '#e74c6f' },
  { name: 'Auto Insurance', emoji: '🛡️', color: '#e06090' },
  { name: 'Gas & Fuel', emoji: '⛽', color: '#d45070' },
  { name: 'Gas/Automotive', emoji: '⛽', color: '#d45070' },
  { name: 'Parking', emoji: '🅿️', color: '#c44060' },
  { name: 'Service & Parts', emoji: '🔧', color: '#b43050' },

  // ---- Taxes ----
  { name: 'Taxes', emoji: '🏛️', color: '#a45de2' },
  { name: 'Property Tax', emoji: '🏘️', color: '#9050d0' },
  { name: 'Federal Tax', emoji: '🏛️', color: '#b06af0' },
  { name: 'State Tax', emoji: '🏛️', color: '#8040c0' },

  // ---- Food & Dining ----
  { name: 'Restaurants', emoji: '🍽️', color: '#f97316' },
  { name: 'Food & Dining', emoji: '🍽️', color: '#f97316' },
  { name: 'Coffee Shops', emoji: '☕', color: '#d4620e' },
  { name: 'Fast Food', emoji: '🍔', color: '#e08020' },
  { name: 'Alcohol & Bars', emoji: '🍺', color: '#c05010' },
  { name: 'Groceries', emoji: '🛒', color: '#84cc16' },

  // ---- Shopping ----
  { name: 'Clothing', emoji: '👕', color: '#ec4899' },
  { name: 'Clothing/Shoes', emoji: '👗', color: '#ec4899' },
  { name: 'Shopping', emoji: '🛍️', color: '#d946ef' },
  { name: 'General Merchandise', emoji: '🏬', color: '#c084fc' },
  { name: 'Electronics', emoji: '💻', color: '#818cf8' },
  { name: 'Electronics & Software', emoji: '💻', color: '#818cf8' },

  // ---- Utilities & Services ----
  { name: 'Utilities', emoji: '💡', color: '#22d3ee' },
  { name: 'Internet', emoji: '🌐', color: '#20b0d0' },
  { name: 'Mobile Phone', emoji: '📱', color: '#18a0c0' },
  { name: 'Television', emoji: '📺', color: '#1090b0' },
  { name: 'Online Services', emoji: '🌐', color: '#38bdf8' },

  // ---- Travel ----
  { name: 'Travel', emoji: '✈️', color: '#6366f1' },
  { name: 'Travel & Vacation', emoji: '✈️', color: '#6366f1' },
  { name: 'Vacation', emoji: '🏖️', color: '#5050e0' },
  { name: 'Hotel', emoji: '🏨', color: '#4040d0' },

  // ---- Services ----
  { name: 'Service', emoji: '🛠️', color: '#8b5cf6' },

  // ---- Financial ----
  { name: 'Transfers', emoji: '🔄', color: '#94a3b8' },
  { name: 'Transfer', emoji: '🔄', color: '#94a3b8' },
  { name: 'Credit Card Payments', emoji: '💳', color: '#64748b' },
  { name: 'Credit Card Payment', emoji: '💳', color: '#64748b' },
  { name: 'Securities Trades', emoji: '📈', color: '#4ade80' },
  { name: 'Securities', emoji: '📈', color: '#4ade80' },
  { name: 'Investment', emoji: '📈', color: '#4caf50' },
  { name: 'Financial', emoji: '💹', color: '#4caf50' },
  { name: 'Bank Fees', emoji: '🏦', color: '#78909c' },
  { name: 'Bank Fee', emoji: '🏦', color: '#78909c' },
  { name: 'Finance Charge', emoji: '💳', color: '#546070' },
  { name: 'ATM Fee', emoji: '🏧', color: '#445060' },
  { name: 'Fees & Charges', emoji: '💰', color: '#607d8b' },
  { name: 'Loans', emoji: '🏦', color: '#78909c' },
  { name: 'Cash & ATM', emoji: '💵', color: '#66bb6a' },
  { name: 'Check', emoji: '📝', color: '#607080' },

  // ---- Remodel ----
  { name: 'Remodel', emoji: '🏗️', color: '#ef4444' },

  // ---- Pets ----
  { name: 'Pets', emoji: '🐾', color: '#f59e0b' },
  { name: 'Pets/Pet Care', emoji: '🐾', color: '#f59e0b' },
  { name: 'Pet Food & Supplies', emoji: '🐾', color: '#e8a000' },
  { name: 'Veterinary', emoji: '🏥', color: '#d08000' },

  // ---- Insurance ----
  { name: 'Insurance', emoji: '🛡️', color: '#eab308' },
  { name: 'Life Insurance', emoji: '🛡️', color: '#d0a000' },
  { name: 'Health Insurance', emoji: '🛡️', color: '#c09000' },

  // ---- Subscriptions ----
  { name: 'Subscriptions', emoji: '📦', color: '#06b6d4' },

  // ---- Entertainment ----
  { name: 'Entertainment', emoji: '🎬', color: '#10b981' },
  { name: 'Music', emoji: '🎵', color: '#0ea070' },
  { name: 'Movies & DVDs', emoji: '🎬', color: '#0c9060' },
  { name: 'Amusement', emoji: '🎡', color: '#0a8050' },
  { name: 'Arts', emoji: '🎨', color: '#087040' },

  // ---- Transportation ----
  { name: 'Transportation', emoji: '🚌', color: '#3b82f6' },
  { name: 'Public Transportation', emoji: '🚇', color: '#3070e0' },
  { name: 'Ride Share', emoji: '🚕', color: '#2060d0' },

  // ---- Personal Care ----
  { name: 'Personal Care', emoji: '💇', color: '#f472b6' },
  { name: 'Spa & Massage', emoji: '💆', color: '#e060a0' },
  { name: 'Laundry', emoji: '👔', color: '#d05090' },
  { name: 'Hair', emoji: '💇', color: '#c04080' },

  // ---- Healthcare / Medical ----
  { name: 'Healthcare', emoji: '🏥', color: '#ef4444' },
  { name: 'Doctor', emoji: '👨‍⚕️', color: '#e03030' },
  { name: 'Dentist', emoji: '🦷', color: '#d02020' },
  { name: 'Pharmacy', emoji: '💊', color: '#c01010' },
  { name: 'Eyecare', emoji: '👓', color: '#b00000' },
  { name: 'Medical', emoji: '⚕️', color: '#ef4444' },

  // ---- Business ----
  { name: 'Business Expenses', emoji: '💼', color: '#78716c' },
  { name: 'Business Services', emoji: '💼', color: '#78716c' },

  // ---- Education ----
  { name: 'Education', emoji: '📚', color: '#8b5cf6' },
  { name: 'Books', emoji: '📖', color: '#7c4ce0' },
  { name: 'Tuition', emoji: '🎓', color: '#6c3cd0' },
  { name: 'Student Loan', emoji: '🎓', color: '#5c2cc0' },

  // ---- Gifts ----
  { name: 'Gifts & Donations', emoji: '🎁', color: '#f43f5e' },
  { name: 'Gifts', emoji: '🎁', color: '#f43f5e' },
  { name: 'Gift', emoji: '🎁', color: '#f43f5e' },
  { name: 'Charity', emoji: '💝', color: '#e03050' },

  // ---- Fitness ----
  { name: 'Gym', emoji: '🏋️', color: '#14b8a6' },
  { name: 'Sports', emoji: '⚽', color: '#10a090' },
  { name: 'Fitness', emoji: '🏋️', color: '#14b8a6' },

  // ---- Income (shouldn't show in expenses, but just in case) ----
  { name: 'Income', emoji: '💰', color: '#22c55e' },
  { name: 'Paycheck', emoji: '💵', color: '#22c55e' },
  { name: 'Bonus', emoji: '🎉', color: '#20b050' },
  { name: 'Reimbursement', emoji: '💸', color: '#10a040' },
  { name: 'Interest Income', emoji: '🏦', color: '#009030' },
  { name: 'Returned Purchase', emoji: '↩️', color: '#008020' },

  // ---- Catch-all ----
  { name: 'Other Expenses', emoji: '📋', color: '#a78bfa' },
  { name: 'Miscellaneous', emoji: '📋', color: '#a78bfa' },
  { name: 'Uncategorized', emoji: '❓', color: '#9ca3af' },
];

/** Fallback for categories not in the map */
export const DEFAULT_CATEGORY: CategoryDef = {
  name: 'Other',
  emoji: '📋',
  color: '#6b7280',
};

/**
 * Look up category definition by name.
 * Tries: exact match → case-insensitive → fuzzy partial match
 */
export function getCategoryDef(categoryName: string): CategoryDef {
  const lower = categoryName.toLowerCase().trim();

  // 1. Exact case-insensitive match
  const exact = DEFAULT_CATEGORIES.find((c) => c.name.toLowerCase() === lower);
  if (exact) return exact;

  // 2. Fuzzy: check if the category name contains a known name, or vice versa
  //    e.g. "Clothing/Shoes" contains "Clothing", "Mortgages" contains "Mortgage"
  const fuzzy = DEFAULT_CATEGORIES.find((c) => {
    const cLower = c.name.toLowerCase();
    return lower.includes(cLower) || cLower.includes(lower);
  });
  if (fuzzy) return { ...fuzzy, name: categoryName };

  return { ...DEFAULT_CATEGORY, name: categoryName };
}

/**
 * A palette of 20 highly distinct, vibrant colors for dynamic assignment.
 * These are maximally spread in hue so adjacent assignments look very different.
 */
export const DYNAMIC_PALETTE = [
  '#f97316', // orange
  '#6366f1', // indigo
  '#22c55e', // green
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ef4444', // red
  '#14b8a6', // teal
  '#3b82f6', // blue
  '#d946ef', // fuchsia
  '#84cc16', // lime
  '#e11d48', // rose
  '#0ea5e9', // sky
  '#a855f7', // purple
  '#eab308', // yellow
  '#10b981', // emerald
  '#f472b6', // light pink
  '#818cf8', // light indigo
  '#fb923c', // light orange
];
