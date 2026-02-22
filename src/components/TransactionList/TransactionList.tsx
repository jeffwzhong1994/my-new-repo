import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import styles from './TransactionList.module.css';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {transactions.slice(0, 50).map((t) => (
          <div key={t.id} className={styles.row}>
            <span className={styles.date}>{formatDate(t.date)}</span>
            <span className={styles.description} title={t.description}>
              {t.description}
            </span>
            <span className={styles.account}>{t.account}</span>
            <span className={styles.amount}>{formatCurrency(t.amount)}</span>
          </div>
        ))}
        {transactions.length > 50 && (
          <div className={styles.more}>
            +{transactions.length - 50} more transactions
          </div>
        )}
      </div>
    </div>
  );
}
