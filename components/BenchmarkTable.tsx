'use client';

import { useState } from 'react';
import { BenchmarkResult, SortField, SortDirection } from '@/lib/types';
import { formatNumber, formatCurrency, shortSku, skuChipType } from '@/lib/data';
import Tooltip, { metricInfo } from '@/components/Tooltip';

interface BenchmarkTableProps {
  data: BenchmarkResult[];
  showFilters?: boolean;
}

function getSortValue(r: BenchmarkResult, field: SortField): number | string {
  switch (field) {
    case 'vmSku': return r.vmSku;
    case 'series': return r.series;
    case 'version': return r.version;
    case 'multiCore': return r.performance.multiCore.score;
    case 'singleCore': return r.performance.singleCore.score;
    case 'pricePerf': return r.performance.multiCore.perDollar;
    case 'monthly': return r.pricing.monthly;
    case 'scaling': return r.performance.scalingEfficiency;
    default: return 0;
  }
}

const chipColors = {
  intel: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  amd: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export default function BenchmarkTable({ data, showFilters = true }: BenchmarkTableProps) {
  const [sortField, setSortField] = useState<SortField>('pricePerf');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [seriesFilter, setSeriesFilter] = useState<string>('all');
  const [chipFilter, setChipFilter] = useState<string>('all');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'vmSku' || field === 'series' || field === 'version' ? 'asc' : 'desc');
    }
  };

  const allSeries = [...new Set(data.map(d => d.series))].sort();

  const filtered = data.filter(r => {
    if (seriesFilter !== 'all' && r.series !== seriesFilter) return false;
    if (chipFilter !== 'all' && skuChipType(r.vmSku) !== chipFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const av = getSortValue(a, sortField);
    const bv = getSortValue(b, sortField);
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const maxMulti = Math.max(...data.map(d => d.performance.multiCore.score));
  const maxPricePerf = Math.max(...data.map(d => d.performance.multiCore.perDollar));

  const headerTooltips: Partial<Record<SortField, string>> = {
    multiCore: metricInfo.multiCore,
    singleCore: metricInfo.singleCore,
    pricePerf: metricInfo.pricePerf,
    scaling: metricInfo.scaling,
    monthly: metricInfo.monthly,
  };

  const SortHeader = ({ field, label, align = 'right' }: { field: SortField; label: string; align?: string }) => (
    <th
      className={`py-3 px-3 font-medium cursor-pointer hover:text-gray-200 transition-colors select-none ${align === 'left' ? 'text-left' : 'text-right'}`}
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {headerTooltips[field] ? <Tooltip text={headerTooltips[field]}>{label}</Tooltip> : label}
        {sortField === field && (
          <span className="text-blue-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
        )}
      </span>
    </th>
  );

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            value={seriesFilter}
            onChange={(e) => setSeriesFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
          >
            <option value="all">All Series</option>
            {allSeries.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={chipFilter}
            onChange={(e) => setChipFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
          >
            <option value="all">All Chips</option>
            <option value="intel">Intel</option>
            <option value="amd">AMD</option>
          </select>
          <div className="text-sm text-gray-400 flex items-center ml-auto">
            {sorted.length} of {data.length} VMs
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <SortHeader field="vmSku" label="VM SKU" align="left" />
              <SortHeader field="series" label="Series" align="left" />
              <th className="py-3 px-3 text-left font-medium">Chip</th>
              <SortHeader field="multiCore" label="Multi-Core" />
              <SortHeader field="singleCore" label="Single-Core" />
              <SortHeader field="scaling" label="Scaling" />
              <SortHeader field="monthly" label="Monthly" />
              <SortHeader field="pricePerf" label="Price/Perf" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, idx) => {
              const chip = skuChipType(r.vmSku);
              return (
                <tr key={r.vmSku} className={`border-b border-gray-800 hover:bg-gray-800/60 transition-colors ${idx === 0 ? 'bg-gray-800/30' : ''}`}>
                  <td className="py-3 px-3 font-mono text-gray-100 font-medium">{shortSku(r.vmSku)}</td>
                  <td className="py-3 px-3 text-gray-300">{r.series}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${chipColors[chip]}`}>
                      {chip === 'intel' ? 'Intel' : 'AMD'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-800 rounded-full h-1.5 hidden sm:block">
                        <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${(r.performance.multiCore.score / maxMulti) * 100}%` }} />
                      </div>
                      <span className="font-mono text-gray-200">{formatNumber(r.performance.multiCore.score)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-gray-300">{formatNumber(r.performance.singleCore.score)}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`font-mono ${r.performance.scalingEfficiency >= 90 ? 'text-emerald-400' : r.performance.scalingEfficiency >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                      {r.performance.scalingEfficiency}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-gray-300">{formatCurrency(r.pricing.monthly)}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-800 rounded-full h-1.5 hidden sm:block">
                        <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(r.performance.multiCore.perDollar / maxPricePerf) * 100}%` }} />
                      </div>
                      <span className="font-mono text-gray-200">{formatNumber(r.performance.multiCore.perDollar)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
