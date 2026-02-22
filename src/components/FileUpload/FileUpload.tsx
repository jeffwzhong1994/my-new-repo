import { useCallback, useRef, useState } from 'react';
import { parseCSVFile } from '../../utils/csvParser';
import { useAppContext } from '../../context/AppContext';
import styles from './FileUpload.module.css';

interface FileUploadProps {
  compact?: boolean;
}

export default function FileUpload({ compact = false }: FileUploadProps) {
  const { setTransactions } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }

      setError(null);
      setIsLoading(true);

      try {
        const transactions = await parseCSVFile(file);
        if (transactions.length === 0) {
          setError('No valid transactions found in the CSV file');
          return;
        }
        setTransactions(transactions);
      } catch (err) {
        setError(`Failed to parse CSV: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    },
    [setTransactions]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      // Reset so the same file can be re-uploaded
      e.target.value = '';
    },
    [handleFile]
  );

  if (compact) {
    return (
      <div className={styles.compactWrapper}>
        <button className={styles.compactButton} onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : '📁 Import CSV'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className={styles.hiddenInput}
        />
      </div>
    );
  }

  return (
    <div className={styles.fullPage}>
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleInputChange}
          className={styles.hiddenInput}
        />

        <div className={styles.icon}>📊</div>
        <h1 className={styles.title}>Personal Finance Dashboard</h1>
        <p className={styles.subtitle}>
          Drop your Empower CSV file here, or click to browse
        </p>
        <p className={styles.hint}>
          Export from Empower: Overview &rarr; Transactions &rarr; Download CSV
        </p>

        {isLoading && <div className={styles.loading}>Parsing transactions...</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
