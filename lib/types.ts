export interface BenchmarkResult {
  vmSku: string;
  series: string;
  version: string;
  location: string;
  performance: {
    singleCore: {
      score: number;
      perDollar: number;
    };
    multiCore: {
      score: number;
      perDollar: number;
      per100Monthly: number;
    };
    scalingEfficiency: number;
  };
  pricing: {
    hourly: number;
    monthly: number;
    currency: string;
  };
  metadata: {
    timestamp: string;
    runId: string;
  };
}

export interface BenchmarksData {
  metadata: {
    totalVms: number;
    dataVersion: string;
    source: string;
    generated: string;
  };
  results: BenchmarkResult[];
}

export interface SummaryData {
  metadata: {
    totalVms: number;
    generated: string;
  };
  bestPerformers: {
    rawPerformance: { vmSku: string; score: number; monthlyCost: number; category: string };
    pricePerformance: { vmSku: string; ratio: number; monthlyCost: number; category: string };
    mostAffordable: { vmSku: string; score: number; monthlyCost: number; category: string };
    scalingEfficiency: { vmSku: string; efficiency: number; score: number; category: string };
  };
  aggregates: {
    averageScore: number;
    averageMonthlyCost: number;
    averagePricePerformance: number;
    scoreRange: { min: number; max: number };
    priceRange: { min: number; max: number };
  };
  comparisons: {
    bySeries: SeriesComparison[];
    byVersion: VersionComparison[];
  };
}

export interface SeriesComparison {
  series: string;
  count: number;
  avgScore: number;
  avgCost: number;
  avgPricePerf: number;
}

export interface VersionComparison {
  version: string;
  count: number;
  avgScore: number;
  avgCost: number;
  avgPricePerf: number;
}

export type SortField = 'vmSku' | 'series' | 'version' | 'multiCore' | 'singleCore' | 'pricePerf' | 'monthly' | 'scaling';
export type SortDirection = 'asc' | 'desc';
