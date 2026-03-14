import { getBenchmarks, getSummary } from '@/lib/data';
import { metricInfo } from '@/components/Tooltip';
import SummaryCards from '@/components/SummaryCards';
import BarChart from '@/components/BarChart';
import BenchmarkTable from '@/components/BenchmarkTable';
import SeriesOverview from '@/components/SeriesOverview';

export default function Home() {
  const benchmarks = getBenchmarks();
  const summary = getSummary();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Azure VM Benchmarks
            </h1>
          </div>
          <nav className="flex gap-4 text-sm text-gray-400">
            <a href="#overview" className="hover:text-gray-200 transition-colors">Overview</a>
            <a href="#charts" className="hover:text-gray-200 transition-colors">Charts</a>
            <a href="#table" className="hover:text-gray-200 transition-colors">Table</a>
            <a href="#series" className="hover:text-gray-200 transition-colors">Series</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <div className="text-center py-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Azure VM Performance Benchmarks
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Compare {summary.metadata.totalVms} Azure VM SKUs by CoreMark performance, pricing, and value.
            Real benchmarks from Sweden Central region.
          </p>
        </div>

        {/* Summary Cards */}
        <section id="overview">
          <SummaryCards summary={summary} />
        </section>

        {/* Charts */}
        <section id="charts" className="space-y-8">
          <h2 className="text-2xl font-bold">Performance Charts</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <BarChart
                data={benchmarks.results}
                valueKey="multiCore"
                title="Multi-Core Performance (iter/sec)"
                tooltip={metricInfo.multiCore}
                unit=""
                colorByField="series"
              />
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <BarChart
                data={benchmarks.results}
                valueKey="pricePerf"
                title="Price-Performance Ratio (iter/sec/$)"
                tooltip={metricInfo.pricePerf}
                unit=""
                colorByField="series"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <BarChart
                data={benchmarks.results}
                valueKey="singleCore"
                title="Single-Core Performance (iter/sec)"
                tooltip={metricInfo.singleCore}
                unit=""
                colorByField="chip"
              />
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <BarChart
                data={benchmarks.results}
                valueKey="monthly"
                title="Monthly Cost (USD)"
                tooltip={metricInfo.monthly}
                unit=""
                colorByField="series"
              />
            </div>
          </div>
        </section>

        {/* Full Table */}
        <section id="table">
          <h2 className="text-2xl font-bold mb-4">All Benchmark Results</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <BenchmarkTable data={benchmarks.results} />
          </div>
        </section>

        {/* Series Breakdown */}
        <section id="series">
          <h2 className="text-2xl font-bold mb-4">Series & Generation Breakdown</h2>
          <SeriesOverview
            bySeries={summary.comparisons.bySeries}
            byVersion={summary.comparisons.byVersion}
          />
        </section>

        {/* Methodology */}
        <section className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-3">Methodology</h2>
          <div className="text-sm text-gray-400 space-y-2 max-w-3xl">
            <p>
              All VMs are benchmarked using <strong className="text-gray-300">EEMBC CoreMark 1.0</strong>, the industry-standard
              CPU performance benchmark. Each VM runs CoreMark with two parallel instances to test multi-core throughput.
            </p>
            <p>
              Tests run on <strong className="text-gray-300">Windows Server 2025</strong> in <strong className="text-gray-300">Sweden Central</strong> using
              MinGW-w64 GCC with <code className="text-gray-300 bg-gray-800 px-1 rounded">-O3 -march=native</code> optimizations.
              Pricing uses Linux pay-as-you-go rates from the Azure Retail Prices API.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-6 pb-8 text-center text-sm text-gray-500">
          <p>Azure VM Benchmark Platform &middot; Data updated {new Date(summary.metadata.generated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </footer>
      </main>
    </div>
  );
}
