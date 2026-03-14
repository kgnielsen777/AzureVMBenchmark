'use client';

import { BenchmarkResult } from '@/lib/types';
import { formatNumber, shortSku, skuChipType } from '@/lib/data';
import Tooltip from '@/components/Tooltip';

interface BarChartProps {
  data: BenchmarkResult[];
  valueKey: 'multiCore' | 'singleCore' | 'pricePerf' | 'monthly';
  title: string;
  tooltip?: string;
  unit: string;
  colorByField?: 'series' | 'chip';
}

const seriesColors: Record<string, string> = {
  'B-series': '#3b82f6',
  'D-series': '#10b981',
  'E-series': '#f59e0b',
  'F-series': '#ef4444',
};

function getValue(r: BenchmarkResult, key: string): number {
  switch (key) {
    case 'multiCore': return r.performance.multiCore.score;
    case 'singleCore': return r.performance.singleCore.score;
    case 'pricePerf': return r.performance.multiCore.perDollar;
    case 'monthly': return r.pricing.monthly;
    default: return 0;
  }
}

function formatValue(val: number, key: string): string {
  if (key === 'monthly') return `$${val.toFixed(2)}`;
  return formatNumber(val, key === 'pricePerf' ? 0 : 0);
}

export default function BarChart({ data, valueKey, title, tooltip, unit, colorByField = 'series' }: BarChartProps) {
  const sorted = [...data].sort((a, b) => getValue(b, valueKey) - getValue(a, valueKey));
  const maxVal = Math.max(...sorted.map(d => getValue(d, valueKey)));

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-100">
        {tooltip ? <Tooltip text={tooltip}>{title}</Tooltip> : title}
      </h3>
      <div className="space-y-2">
        {sorted.map((r) => {
          const val = getValue(r, valueKey);
          const pct = (val / maxVal) * 100;
          const color = colorByField === 'series'
            ? (seriesColors[r.series] || '#6b7280')
            : (skuChipType(r.vmSku) === 'amd' ? '#ef4444' : '#3b82f6');

          return (
            <div key={r.vmSku} className="flex items-center gap-2 text-sm">
              <div className="w-28 text-right text-gray-300 font-mono shrink-0 truncate" title={r.vmSku}>
                {shortSku(r.vmSku)}
              </div>
              <div className="flex-1 h-7 bg-gray-800 rounded overflow-hidden relative">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-mono">
                  {formatValue(val, valueKey)} {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
        {colorByField === 'series' ? (
          Object.entries(seriesColors).map(([s, c]) => (
            <span key={s} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: c }} />
              {s}
            </span>
          ))
        ) : (
          <>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500" /> Intel
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-500" /> AMD
            </span>
          </>
        )}
      </div>
    </div>
  );
}
