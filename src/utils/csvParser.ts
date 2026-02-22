import Papa from 'papaparse';
import { Transaction } from '../types';

interface RawRow {
  Date: string;
  Account: string;
  Description: string;
  Category: string;
  Tags: string;
  Amount: string;
  [key: string]: string;
}

/**
 * Parse an Empower CSV file into Transaction objects.
 * Empower format: Date, Account, Description, Category, Tags, Amount
 */
export function parseCSVFile(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<RawRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().replace(/^\uFEFF/, ''), // strip BOM
      complete: (results) => {
        try {
          const transactions = normalizeTransactions(results.data);
          resolve(transactions);
        } catch (err) {
          reject(err);
        }
      },
      error: (error: Error) => reject(error),
    });
  });
}

/**
 * Normalize raw CSV rows into Transaction objects.
 * Handles various amount formats and determines income vs expense.
 */
function normalizeTransactions(rows: RawRow[]): Transaction[] {
  return rows
    .map((row, index) => {
      // Find the right columns (case-insensitive fallback)
      const dateStr = findColumn(row, ['Date', 'date', 'Transaction Date']);
      const account = findColumn(row, ['Account', 'account', 'Account Name']);
      const description = findColumn(row, ['Description', 'description', 'Memo', 'Name']);
      const category = findColumn(row, ['Category', 'category', 'Type']);
      const tags = findColumn(row, ['Tags', 'tags', 'Tag', 'Label']);
      const amountStr = findColumn(row, ['Amount', 'amount', 'Transaction Amount']);

      if (!dateStr || !amountStr) return null;

      const parsedAmount = cleanAmount(amountStr);
      if (isNaN(parsedAmount)) return null;

      const date = parseDate(dateStr);
      if (!date) return null;

      // In Empower: negative = expense, positive = income
      const isIncome = parsedAmount > 0;

      return {
        id: `txn-${index}-${date.getTime()}`,
        date,
        account: account || 'Unknown',
        description: description || '',
        category: category || 'Uncategorized',
        tags: tags || '',
        amount: Math.abs(parsedAmount),
        originalAmount: parsedAmount,
        isIncome,
      } as Transaction;
    })
    .filter((t): t is Transaction => t !== null);
}

function findColumn(row: Record<string, string>, possibleNames: string[]): string {
  for (const name of possibleNames) {
    if (row[name] !== undefined && row[name] !== null) {
      return row[name].trim();
    }
  }
  // Try case-insensitive
  const keys = Object.keys(row);
  for (const name of possibleNames) {
    const found = keys.find((k) => k.toLowerCase() === name.toLowerCase());
    if (found && row[found] !== undefined) {
      return row[found].trim();
    }
  }
  return '';
}

/**
 * Clean a currency amount string into a number.
 * Handles: "$1,234.56", "(45.00)", "-45.00", "1234.56"
 */
function cleanAmount(amountStr: string): number {
  let cleaned = amountStr.trim();
  // Remove currency symbols
  cleaned = cleaned.replace(/[$€£¥]/g, '');
  // Handle parenthesized negatives: (45.00) → -45.00
  if (cleaned.startsWith('(') && cleaned.endsWith(')')) {
    cleaned = '-' + cleaned.slice(1, -1);
  }
  // Remove commas
  cleaned = cleaned.replace(/,/g, '');
  // Handle en-dash or em-dash as minus
  cleaned = cleaned.replace(/[–—−]/g, '-');
  return parseFloat(cleaned);
}

/**
 * Parse date string into Date object.
 * Handles: YYYY-MM-DD, MM/DD/YYYY, M/D/YYYY, DD/MM/YYYY
 */
function parseDate(dateStr: string): Date | null {
  // Try ISO format first (YYYY-MM-DD)
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
    const d = new Date(dateStr + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  }
  // Try MM/DD/YYYY or M/D/YYYY
  const slashMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const [, m, d, y] = slashMatch;
    const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return isNaN(date.getTime()) ? null : date;
  }
  // Fallback: try native parsing
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Extract unique years from transactions.
 */
export function getAvailableYears(transactions: Transaction[]): number[] {
  const years = new Set(transactions.map((t) => t.date.getFullYear()));
  return Array.from(years).sort((a, b) => b - a); // Most recent first
}
