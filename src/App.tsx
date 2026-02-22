import { useMemo } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { getAvailableYears } from './utils/csvParser';
import FileUpload from './components/FileUpload/FileUpload';
import SpendingBreakdown from './components/SpendingBreakdown/SpendingBreakdown';
import IncomeExpense from './components/IncomeExpense/IncomeExpense';
import MonthlyTrend from './components/MonthlyTrend/MonthlyTrend';
import CategoryPie from './components/CategoryPie/CategoryPie';
import styles from './App.module.css';

function Dashboard() {
  const { state, setYear, reset } = useAppContext();
  const { transactions, selectedYear, hasData } = state;

  const availableYears = useMemo(() => getAvailableYears(transactions), [transactions]);

  if (!hasData) {
    return <FileUpload />;
  }

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>📊</span>
          <h1 className={styles.headerTitle}>Personal Finance Dashboard</h1>
        </div>
        <div className={styles.headerRight}>
          <FileUpload compact />
          <select
            className={styles.yearSelect}
            value={selectedYear || ''}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <button className={styles.resetBtn} onClick={reset} title="Clear data">
            ✕
          </button>
        </div>
      </header>

      {/* Dashboard grid */}
      <main className={styles.grid}>
        {/* Left column - Spending Breakdown */}
        <div className={styles.leftCol}>
          <SpendingBreakdown />
        </div>

        {/* Right column - Charts */}
        <div className={styles.rightCol}>
          <IncomeExpense />
          <MonthlyTrend />
          <CategoryPie />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
