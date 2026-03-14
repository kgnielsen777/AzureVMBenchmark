'use client';

import { SummaryData } from '@/lib/types';
import { formatNumber, formatCurrency } from '@/lib/data';
import Tooltip, { metricInfo } from '@/components/Tooltip';

interface SummaryCardsProps {
  summary: SummaryData;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const { bestPerformers, aggregates, metadata } = summary;
  const generated = new Date(metadata.generated);
  const dateStr = generated.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const cards = [
    {
      label: 'VMs Tested',
      value: metadata.totalVms.toString(),
      sub: `Updated ${dateStr}`,
      icon: '🖥️',
      tooltip: '',
    },
    {
      label: 'Best Performance',
      value: bestPerformers.rawPerformance.vmSku.replace('Standard_', ''),
      sub: `${formatNumber(bestPerformers.rawPerformance.score)} iter/sec`,
      icon: '🏆',
      tooltip: metricInfo.bestPerf,
    },
    {
      label: 'Best Price/Perf',
      value: bestPerformers.pricePerformance.vmSku.replace('Standard_', ''),
      sub: `${formatNumber(bestPerformers.pricePerformance.ratio)} iter/sec/$`,
      icon: '💰',
      tooltip: metricInfo.bestPricePerf,
    },
    {
      label: 'Most Affordable',
      value: bestPerformers.mostAffordable.vmSku.replace('Standard_', ''),
      sub: `${formatCurrency(bestPerformers.mostAffordable.monthlyCost)}/mo`,
      icon: '🏷️',
      tooltip: metricInfo.mostAffordable,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-colors">
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className="text-sm text-gray-400 mb-1">
            {card.tooltip ? <Tooltip text={card.tooltip}>{card.label}</Tooltip> : card.label}
          </div>
          <div className="text-xl font-bold text-gray-100">{card.value}</div>
          <div className="text-xs text-gray-500 mt-1">{card.sub}</div>
        </div>
      ))}
    </div>
  );
}
