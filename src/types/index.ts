/** A single row from the Empower CSV after normalization */
export interface Transaction {
  id: string;
  date: Date;
  account: string;
  description: string;
  category: string;
  tags: string;
  amount: number; // Always positive
  originalAmount: number; // Raw value (negative = expense, positive = income)
  isIncome: boolean;
}

/** A category definition with display metadata */
export interface CategoryDef {
  name: string;
  emoji: string;
  color: string;
}

/** Aggregated spending for one category */
export interface CategorySummary {
  name: string;
  emoji: string;
  color: string;
  totalAmount: number;
  percentage: number; // 0-100
  transactionCount: number;
}

/** Monthly aggregated data */
export interface MonthlyData {
  month: string; // "Jan", "Feb", etc.
  monthIndex: number; // 0-11
  income: number;
  expenses: number;
  net: number;
}

/** Overall totals */
export interface Totals {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number; // percentage
}

/** View mode for the spending breakdown */
export type ViewMode = 'amount' | 'percentage';

/** Global app state */
export interface AppState {
  transactions: Transaction[];
  viewMode: ViewMode;
  selectedYear: number | null;
  selectedCategory: string | null;
  hasData: boolean;
}

/** App actions */
export type AppAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_YEAR'; payload: number }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'RESET' };
