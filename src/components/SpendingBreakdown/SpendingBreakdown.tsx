import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { aggregateByCategory, filterByYear } from '../../utils/aggregator';
import { formatCurrency } from '../../utils/formatters';
import ViewToggle from './ViewToggle';
import CategoryRow from './CategoryRow';
import TransactionList from '../TransactionList/TransactionList';
import styles from './SpendingBreakdown.module.css';

export default function SpendingBreakdown() {
  const { state, setViewMode, setSelectedCategory } = useAppContext();
  const { transactions, viewMode, selectedYear, selectedCategory } = state;

  const yearTransactions = useMemo(
    () => (selectedYear ? filterByYear(transactions, selectedYear) : transactions),
    [transactions, selectedYear]
  );

  const categories = useMemo(() => aggregateByCategory(yearTransactions), [yearTransactions]);

  const totalSpent = useMemo(
    () => categories.reduce((sum, c) => sum + c.totalAmount, 0),
    [categories]
  );

  const maxAmount = categories.length > 0 ? categories[0].totalAmount : 0;

  // Get transactions for the selected category drill-down
  const selectedTransactions = useMemo(() => {
    if (!selectedCategory) return [];
    return yearTransactions
      .filter((t) => !t.isIncome && t.category === selectedCategory)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [yearTransactions, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>YOUR SPENDING</h2>
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      <div className={styles.total}>
        <span className={styles.totalAmount}>{formatCurrency(totalSpent)}</span>
        <span className={styles.totalLabel}>
          total spent in {selectedYear || new Date().getFullYear()}
        </span>
      </div>

      <div className={styles.list}>
        {categories.map((cat, i) => (
          <div key={cat.name}>
            <CategoryRow
              category={cat}
              maxAmount={maxAmount}
              viewMode={viewMode}
              isSelected={selectedCategory === cat.name}
              index={i}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
              }
            />
            {selectedCategory === cat.name && selectedTransactions.length > 0 && (
              <TransactionList transactions={selectedTransactions} />
            )}
          </div>
        ))}
        {categories.length === 0 && (
          <p className={styles.empty}>No expense transactions found for this year.</p>
        )}
      </div>
    </div>
  );
}
