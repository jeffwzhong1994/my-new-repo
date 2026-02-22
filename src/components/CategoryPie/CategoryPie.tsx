import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { aggregateByCategory, filterByYear } from '../../utils/aggregator';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import styles from './CategoryPie.module.css';

export default function CategoryPie() {
  const { state } = useAppContext();
  const { transactions, selectedYear } = state;

  const yearTransactions = useMemo(
    () => (selectedYear ? filterByYear(transactions, selectedYear) : transactions),
    [transactions, selectedYear]
  );

  const categories = useMemo(() => aggregateByCategory(yearTransactions), [yearTransactions]);

  // Top 8 categories + "Other" bucket
  const pieData = useMemo(() => {
    const nonZero = categories.filter((c) => c.totalAmount > 0);
    if (nonZero.length <= 9) return nonZero;

    const top8 = nonZero.slice(0, 8);
    const restTotal = nonZero.slice(8).reduce((sum, c) => sum + c.totalAmount, 0);
    const totalSpent = nonZero.reduce((sum, c) => sum + c.totalAmount, 0);

    return [
      ...top8,
      {
        name: 'Other',
        emoji: '📋',
        color: '#6b7280',
        totalAmount: restTotal,
        percentage: totalSpent > 0 ? (restTotal / totalSpent) * 100 : 0,
        transactionCount: 0,
      },
    ];
  }, [categories]);

  const CustomTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{ payload: { name: string; emoji: string; totalAmount: number; percentage: number } }>;
  }) => {
    if (!active || !payload?.[0]) return null;
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipName}>
          {data.emoji} {data.name}
        </p>
        <p className={styles.tooltipValue}>{formatCurrency(data.totalAmount)}</p>
        <p className={styles.tooltipPercent}>{formatPercentage(data.percentage)}</p>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>TOP CATEGORIES</h2>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={2}
              dataKey="totalAmount"
              nameKey="name"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.legend}>
        {pieData.slice(0, 6).map((cat) => (
          <div key={cat.name} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ backgroundColor: cat.color }} />
            <span className={styles.legendEmoji}>{cat.emoji}</span>
            <span className={styles.legendName}>{cat.name}</span>
            <span className={styles.legendPercent}>{formatPercentage(cat.percentage, 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
