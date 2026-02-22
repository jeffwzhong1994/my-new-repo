import { CategorySummary, ViewMode } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import styles from './CategoryRow.module.css';

interface CategoryRowProps {
  category: CategorySummary;
  maxAmount: number;
  viewMode: ViewMode;
  isSelected: boolean;
  index: number;
  onClick: () => void;
}

export default function CategoryRow({
  category,
  maxAmount,
  viewMode,
  isSelected,
  index,
  onClick,
}: CategoryRowProps) {
  const isZero = category.totalAmount === 0;

  // Bar width calculation
  const barWidth =
    viewMode === 'amount'
      ? maxAmount > 0
        ? (category.totalAmount / maxAmount) * 100
        : 0
      : category.percentage;

  return (
    <div
      className={`${styles.row} ${isZero ? styles.zero : ''} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className={styles.dot} style={{ backgroundColor: category.color }} />
      <span className={styles.emoji}>{category.emoji}</span>
      <div className={styles.barContainer}>
        {!isZero && (
          <div
            className={styles.bar}
            style={{
              width: `${Math.max(barWidth, 1)}%`,
              backgroundColor: category.color,
            }}
          />
        )}
      </div>
      <span className={styles.name}>{category.name}</span>
      <span className={styles.value}>
        {viewMode === 'amount'
          ? formatCurrency(category.totalAmount)
          : formatPercentage(category.percentage)}
      </span>
    </div>
  );
}
