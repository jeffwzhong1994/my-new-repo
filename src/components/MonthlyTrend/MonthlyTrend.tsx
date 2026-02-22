import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { aggregateByMonth, filterByYear } from '../../utils/aggregator';
import { formatCompactCurrency } from '../../utils/formatters';
import styles from './MonthlyTrend.module.css';

export default function MonthlyTrend() {
  const { state } = useAppContext();
  const { transactions, selectedYear } = state;

  const yearTransactions = useMemo(
    () => (selectedYear ? filterByYear(transactions, selectedYear) : transactions),
    [transactions, selectedYear]
  );

  const monthlyData = useMemo(() => aggregateByMonth(yearTransactions), [yearTransactions]);

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (!active || !payload) return null;
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} style={{ color: entry.color }} className={styles.tooltipValue}>
            {entry.name}: {formatCompactCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>MONTHLY TREND</h2>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--income-color)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--income-color)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--expense-color)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--expense-color)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatCompactCurrency(v)}
              tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="var(--income-color)"
              fill="url(#incomeGrad)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="var(--expense-color)"
              fill="url(#expenseGrad)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
