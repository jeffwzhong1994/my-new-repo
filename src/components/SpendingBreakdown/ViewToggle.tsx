import { ViewMode } from '../../types';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className={styles.toggle}>
      <button
        className={`${styles.option} ${mode === 'amount' ? styles.active : ''}`}
        onClick={() => onChange('amount')}
      >
        Amount
      </button>
      <button
        className={`${styles.option} ${mode === 'percentage' ? styles.active : ''}`}
        onClick={() => onChange('percentage')}
      >
        Percentage
      </button>
    </div>
  );
}
