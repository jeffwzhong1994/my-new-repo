import { Transaction, CategorySummary, MonthlyData, Totals } from '../types';
import { getCategoryDef, DYNAMIC_PALETTE } from '../constants/categories';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Filter transactions by year.
 */
export function filterByYear(transactions: Transaction[], year: number): Transaction[] {
  return transactions.filter((t) => t.date.getFullYear() === year);
}

/**
 * Parse a hex color to [H, S, L] for comparison.
 */
function hexToHSL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return [h * 360, s, l];
}

/**
 * Check if two colors are visually too similar.
 * Compares hue distance, saturation, and lightness.
 */
function colorsAreTooSimilar(colorA: string, colorB: string): boolean {
  const [hA, sA, lA] = hexToHSL(colorA);
  const [hB, sB, lB] = hexToHSL(colorB);

  // Hue distance (circular, 0-180)
  let hueDiff = Math.abs(hA - hB);
  if (hueDiff > 180) hueDiff = 360 - hueDiff;

  const satDiff = Math.abs(sA - sB);
  const lightDiff = Math.abs(lA - lB);

  // Two grays (low saturation) — distinguish by lightness
  if (sA < 0.15 && sB < 0.15) {
    return lightDiff < 0.15;
  }

  // If hues are close AND saturation/lightness are close → too similar
  return hueDiff < 25 && satDiff < 0.25 && lightDiff < 0.2;
}

/**
 * Pick the best color from DYNAMIC_PALETTE that is most different from its neighbors.
 */
function pickDistinctColor(prevColor: string | null, nextColor: string | null): string {
  let bestColor = DYNAMIC_PALETTE[0];
  let bestScore = -1;

  for (const candidate of DYNAMIC_PALETTE) {
    let score = 0;

    if (prevColor) {
      const [hC] = hexToHSL(candidate);
      const [hP] = hexToHSL(prevColor);
      let hDiff = Math.abs(hC - hP);
      if (hDiff > 180) hDiff = 360 - hDiff;
      score += hDiff;
    }

    if (nextColor) {
      const [hC] = hexToHSL(candidate);
      const [hN] = hexToHSL(nextColor);
      let hDiff = Math.abs(hC - hN);
      if (hDiff > 180) hDiff = 360 - hDiff;
      score += hDiff;
    }

    if (score > bestScore) {
      bestScore = score;
      bestColor = candidate;
    }
  }

  return bestColor;
}

/**
 * Ensure no two adjacent categories share a visually similar color.
 * If a conflict is found, reassign from the dynamic palette.
 */
function deduplicateAdjacentColors(summaries: CategorySummary[]): CategorySummary[] {
  if (summaries.length <= 1) return summaries;

  const result = [...summaries];

  for (let i = 0; i < result.length; i++) {
    const prev = i > 0 ? result[i - 1].color : null;
    const next = i < result.length - 1 ? result[i + 1].color : null;

    const conflictWithPrev = prev && colorsAreTooSimilar(result[i].color, prev);
    const conflictWithNext = next && colorsAreTooSimilar(result[i].color, next);

    if (conflictWithPrev || conflictWithNext) {
      result[i] = {
        ...result[i],
        color: pickDistinctColor(prev, next),
      };
    }
  }

  return result;
}

/**
 * Aggregate expenses by category, sorted by amount descending.
 * Categories with $0 go to the bottom.
 * Adjacent categories are guaranteed to have distinct colors.
 */
export function aggregateByCategory(transactions: Transaction[]): CategorySummary[] {
  const expenseOnly = transactions.filter((t) => !t.isIncome);
  const totalSpent = expenseOnly.reduce((sum, t) => sum + t.amount, 0);

  // Group by category
  const grouped = new Map<string, { total: number; count: number }>();
  for (const t of expenseOnly) {
    const existing = grouped.get(t.category) || { total: 0, count: 0 };
    existing.total += t.amount;
    existing.count += 1;
    grouped.set(t.category, existing);
  }

  // Build summaries
  const summaries: CategorySummary[] = Array.from(grouped.entries()).map(([name, data]) => {
    const def = getCategoryDef(name);
    return {
      name,
      emoji: def.emoji,
      color: def.color,
      totalAmount: Math.round(data.total * 100) / 100,
      percentage: totalSpent > 0 ? (data.total / totalSpent) * 100 : 0,
      transactionCount: data.count,
    };
  });

  // Sort: nonzero descending, then zero at the bottom
  const sorted = summaries.sort((a, b) => {
    if (a.totalAmount === 0 && b.totalAmount > 0) return 1;
    if (b.totalAmount === 0 && a.totalAmount > 0) return -1;
    return b.totalAmount - a.totalAmount;
  });

  // Ensure no two adjacent rows share a visually similar color
  return deduplicateAdjacentColors(sorted);
}

/**
 * Aggregate by month for trend chart.
 */
export function aggregateByMonth(transactions: Transaction[]): MonthlyData[] {
  const monthlyMap = new Map<number, { income: number; expenses: number }>();

  // Initialize all 12 months
  for (let i = 0; i < 12; i++) {
    monthlyMap.set(i, { income: 0, expenses: 0 });
  }

  for (const t of transactions) {
    const monthIndex = t.date.getMonth();
    const existing = monthlyMap.get(monthIndex)!;
    if (t.isIncome) {
      existing.income += t.amount;
    } else {
      existing.expenses += t.amount;
    }
  }

  return MONTH_NAMES.map((month, index) => {
    const data = monthlyMap.get(index)!;
    return {
      month,
      monthIndex: index,
      income: Math.round(data.income),
      expenses: Math.round(data.expenses),
      net: Math.round(data.income - data.expenses),
    };
  });
}

/**
 * Compute overall totals.
 */
export function computeTotals(transactions: Transaction[]): Totals {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const t of transactions) {
    if (t.isIncome) {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  }

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  return {
    totalIncome: Math.round(totalIncome),
    totalExpenses: Math.round(totalExpenses),
    netSavings: Math.round(netSavings),
    savingsRate: Math.round(savingsRate * 10) / 10,
  };
}
