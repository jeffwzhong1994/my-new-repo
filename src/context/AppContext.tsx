import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { AppState, AppAction, Transaction, ViewMode } from '../types';

const initialState: AppState = {
  transactions: [],
  viewMode: 'amount',
  selectedYear: null,
  selectedCategory: null,
  hasData: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TRANSACTIONS': {
      const transactions = action.payload;
      // Auto-select the most recent year
      const years = [...new Set(transactions.map((t) => t.date.getFullYear()))];
      const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
      return {
        ...state,
        transactions,
        selectedYear: state.selectedYear || maxYear,
        hasData: transactions.length > 0,
      };
    }
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_YEAR':
      return { ...state, selectedYear: action.payload, selectedCategory: null };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  setTransactions: (transactions: Transaction[]) => void;
  setViewMode: (mode: ViewMode) => void;
  setYear: (year: number) => void;
  setSelectedCategory: (category: string | null) => void;
  reset: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setTransactions = useCallback((transactions: Transaction[]) => {
    dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    dispatch({ type: 'SET_VIEW_MODE', payload: mode });
  }, []);

  const setYear = useCallback((year: number) => {
    dispatch({ type: 'SET_YEAR', payload: year });
  }, []);

  const setSelectedCategory = useCallback((category: string | null) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <AppContext.Provider
      value={{ state, setTransactions, setViewMode, setYear, setSelectedCategory, reset }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
