'use client';

import { SeriesComparison, VersionComparison } from '@/lib/types';
import { formatNumber, formatCurrency, seriesSlug } from '@/lib/data';

interface SeriesOverviewProps {
  bySeries: SeriesComparison[];
  byVersion: VersionComparison[];
}

const seriesColors: Record<string, string> = {
  'B-series': 'bg-blue-500',
  'D-series': 'bg-emerald-500',
  'E-series': 'bg-amber-500',
  'F-series': 'bg-red-500',
};

const seriesDescriptions: Record<string, string> = {
  'B-series': 'Burstable, cost-effective',
  'D-series': 'General purpose compute',
  'E-series': 'Memory optimized',
  'F-series': 'Compute optimized',
};

export default function SeriesOverview({ bySeries, byVersion }: SeriesOverviewProps) {
  const maxScore = Math.max(...bySeries.map(s => s.avgScore));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Performance by Series</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bySeries.map((s) => (
            <a
              key={s.series}
              href={`series/${seriesSlug(s.series)}/`}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-gray-500 transition-all hover:bg-gray-800/80 block"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${seriesColors[s.series] || 'bg-gray-500'}`} />
                <span className="font-semibold text-gray-100">{s.series}</span>
              </div>
              <div className="text-xs text-gray-400 mb-3">{seriesDescriptions[s.series] || ''}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Score</span>
                  <span className="text-gray-200 font-mono">{formatNumber(s.avgScore)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${seriesColors[s.series] || 'bg-gray-500'}`}
                    style={{ width: `${(s.avgScore / maxScore) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Cost</span>
                  <span className="text-gray-200 font-mono">{formatCurrency(s.avgCost)}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SKUs</span>
                  <span className="text-gray-200">{s.count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Performance by Generation</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Generation</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">SKUs</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Avg Score</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Avg Cost</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Avg Price/Perf</th>
              </tr>
            </thead>
            <tbody>
              {byVersion.sort((a, b) => a.version.localeCompare(b.version)).map((v) => (
                <tr key={v.version} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-mono text-gray-200">{v.version}</td>
                  <td className="py-3 px-4 text-right text-gray-300">{v.count}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-200">{formatNumber(v.avgScore)}</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-200">{formatCurrency(v.avgCost)}/mo</td>
                  <td className="py-3 px-4 text-right font-mono text-gray-200">{formatNumber(v.avgPricePerf)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
