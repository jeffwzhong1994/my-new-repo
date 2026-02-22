import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { computeTotals, filterByYear } from '../../utils/aggregator';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import styles from './IncomeExpense.module.css';

export default function IncomeExpense() {
  const { state } = useAppContext();
  const { transactions, selectedYear } = state;

  const yearTransactions = useMemo(
    () => (selectedYear ? filterByYear(transactions, selectedYear) : transactions),
    [transactions, selectedYear]
  );

  const totals = useMemo(() => computeTotals(yearTransactions), [yearTransactions]);

  const maxVal = Math.max(totals.totalIncome, totals.totalExpenses, 1);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>INCOME vs EXPENSES</h2>

      <div className={styles.bars}>
        <div className={styles.barGroup}>
          <div className={styles.barLabel}>
            <span>Income</span>
            <span className={styles.barValue}>{formatCurrency(totals.totalIncome)}</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.bar}
              style={{
                width: `${(totals.totalIncome / maxVal) * 100}%`,
                backgroundColor: 'var(--income-color)',
              }}
            />
          </div>
        </div>

        <div className={styles.barGroup}>
          <div className={styles.barLabel}>
            <span>Expenses</span>
            <span className={styles.barValue}>{formatCurrency(totals.totalExpenses)}</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.bar}
              style={{
                width: `${(totals.totalExpenses / maxVal) * 100}%`,
                backgroundColor: 'var(--expense-color)',
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={`${styles.summaryCard} ${totals.netSavings >= 0 ? styles.positive : styles.negative}`}>
          <span className={styles.summaryLabel}>Net Savings</span>
          <span className={styles.summaryValue}>
            {totals.netSavings >= 0 ? '+' : ''}{formatCurrency(totals.netSavings)}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Savings Rate</span>
          <span className={styles.summaryValue}>
            {formatPercentage(totals.savingsRate)}
          </span>
        </div>
      </div>
    </div>
  );
}
