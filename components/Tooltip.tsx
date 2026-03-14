'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<'bottom' | 'top'>('bottom');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos(rect.top < 120 ? 'bottom' : 'top');
    }
  }, [show]);

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
      {show && (
        <div
          ref={ref}
          className={`absolute z-50 w-64 px-3 py-2 text-xs font-normal text-gray-200 bg-gray-800 border border-gray-700 rounded-lg shadow-xl left-1/2 -translate-x-1/2 ${
            pos === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {text}
          <div className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-gray-700 rotate-45 ${
            pos === 'top' ? 'bottom-[-5px] border-r border-b' : 'top-[-5px] border-l border-t'
          }`} />
        </div>
      )}
    </span>
  );
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
