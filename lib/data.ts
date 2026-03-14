import { BenchmarksData, SummaryData } from './types';
import benchmarksJson from '@/data/benchmarks.json';
import summaryJson from '@/data/summary.json';

export function getBenchmarks(): BenchmarksData {
  return benchmarksJson as unknown as BenchmarksData;
}

export function getSummary(): SummaryData {
  return summaryJson as unknown as SummaryData;
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals });
}

export function formatCurrency(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function shortSku(sku: string): string {
  return sku.replace('Standard_', '');
}

export function seriesSlug(series: string): string {
  return series.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/-$/, '');
}

export function skuChipType(sku: string): 'intel' | 'amd' {
  // AMD SKUs have 'a' before 's' in the size portion (e.g., D2as_v4, E2as_v5, B2as_v2, F2as_v6)
  return /\d+a/i.test(sku.replace('Standard_', '')) ? 'amd' : 'intel';
}

export const metricInfo = {
  multiCore: 'Aggregate CPU throughput with all vCPUs running CoreMark in parallel. Higher score = more total compute capacity.',
  singleCore: 'One thread running CoreMark — measures raw per-core speed, independent of core count. Higher is faster.',
  pricePerf: 'Multi-core score ÷ hourly cost. Higher means more compute per dollar spent — the best measure of value.',
  scaling: 'How well additional cores contribute: (multi-core ÷ (single-core × vCPUs)) × 100%. Above 90% is excellent.',
  monthly: 'Estimated monthly cost using Linux pay-as-you-go rates from Azure Retail Prices API (730 hours/month).',
  iterSec: 'CoreMark iterations/sec — how many times the CPU completes the full CoreMark workload in one second. Higher = faster CPU.',
  bestPerf: 'VM with the highest multi-core CoreMark score — best for compute-intensive workloads.',
  bestPricePerf: 'VM with the highest iterations/sec per dollar — the best overall value for your money.',
  mostAffordable: 'VM with the lowest monthly cost while still delivering competitive performance.',
};
