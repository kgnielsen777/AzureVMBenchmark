import { getBenchmarks, getSummary, seriesSlug, formatNumber, formatCurrency, shortSku } from '@/lib/data';
import BenchmarkTable from '@/components/BenchmarkTable';
import BarChart from '@/components/BarChart';

export function generateStaticParams() {
  const data = getBenchmarks();
  const seriesSet = new Set(data.results.map(r => r.series));
  return Array.from(seriesSet).map(s => ({ slug: seriesSlug(s) }));
}

const seriesInfo: Record<string, { name: string; description: string; useCase: string }> = {
  'b-series': {
    name: 'B-series',
    description: 'Burstable VMs ideal for workloads that don\'t need continuous full CPU performance. They accumulate credits during idle periods and burst when needed.',
    useCase: 'Dev/test, small databases, low-traffic web servers',
  },
  'd-series': {
    name: 'D-series',
    description: 'General-purpose VMs with a balanced ratio of CPU-to-memory. Suitable for most production workloads.',
    useCase: 'Enterprise apps, mid-size databases, gaming servers',
  },
  'e-series': {
    name: 'E-series',
    description: 'Memory-optimized VMs designed for high memory-to-CPU workloads. More RAM per vCPU than D-series.',
    useCase: 'In-memory analytics, large databases, SAP HANA',
  },
  'f-series': {
    name: 'F-series',
    description: 'Compute-optimized VMs with the highest CPU-to-memory ratio. Best raw compute performance per dollar.',
    useCase: 'Batch processing, analytics, gaming, scientific modeling',
  },
};

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const benchmarks = getBenchmarks();
  const summary = getSummary();

  const info = seriesInfo[slug] || { name: slug, description: '', useCase: '' };
  const seriesResults = benchmarks.results.filter(r => seriesSlug(r.series) === slug);
  const seriesComparison = summary.comparisons.bySeries.find(s => seriesSlug(s.series) === slug);

  if (seriesResults.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Series not found</div>;
  }

  const bestPerf = seriesResults.reduce((a, b) =>
    a.performance.multiCore.score > b.performance.multiCore.score ? a : b
  );
  const bestValue = seriesResults.reduce((a, b) =>
    a.performance.multiCore.perDollar > b.performance.multiCore.perDollar ? a : b
  );
  const cheapest = seriesResults.reduce((a, b) =>
    a.pricing.monthly < b.pricing.monthly ? a : b
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <a href={`${process.env.NODE_ENV === 'production' ? '/AzureVMBenchmark' : ''}/`} className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Dashboard
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{info.name}</h1>
          <p className="text-gray-400 max-w-3xl">{info.description}</p>
          {info.useCase && (
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-gray-400 font-medium">Best for:</span> {info.useCase}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <div className="text-sm text-gray-400 mb-1">Fastest</div>
            <div className="text-lg font-bold">{shortSku(bestPerf.vmSku)}</div>
            <div className="text-sm text-gray-400">{formatNumber(bestPerf.performance.multiCore.score)} iter/sec</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <div className="text-sm text-gray-400 mb-1">Best Value</div>
            <div className="text-lg font-bold">{shortSku(bestValue.vmSku)}</div>
            <div className="text-sm text-gray-400">{formatNumber(bestValue.performance.multiCore.perDollar)} iter/sec/$</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <div className="text-sm text-gray-400 mb-1">Cheapest</div>
            <div className="text-lg font-bold">{shortSku(cheapest.vmSku)}</div>
            <div className="text-sm text-gray-400">{formatCurrency(cheapest.pricing.monthly)}/mo</div>
          </div>
        </div>

        {seriesComparison && (
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Series Average</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Avg Score</div>
                <div className="font-mono text-lg">{formatNumber(seriesComparison.avgScore)}</div>
              </div>
              <div>
                <div className="text-gray-500">Avg Cost</div>
                <div className="font-mono text-lg">{formatCurrency(seriesComparison.avgCost)}/mo</div>
              </div>
              <div>
                <div className="text-gray-500">Avg Price/Perf</div>
                <div className="font-mono text-lg">{formatNumber(seriesComparison.avgPricePerf)}</div>
              </div>
              <div>
                <div className="text-gray-500">SKUs Tested</div>
                <div className="font-mono text-lg">{seriesComparison.count}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <BarChart data={seriesResults} valueKey="multiCore" title="Multi-Core Performance" unit="iter/sec" colorByField="chip" />
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <BarChart data={seriesResults} valueKey="pricePerf" title="Price-Performance Ratio" unit="iter/sec/$" colorByField="chip" />
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">{info.name} SKU Comparison</h3>
          <BenchmarkTable data={seriesResults} showFilters={false} />
        </div>
      </main>
    </div>
  );
}
