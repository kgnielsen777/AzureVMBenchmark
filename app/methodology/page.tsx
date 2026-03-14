import Link from 'next/link';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Test Methodology
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Overview */}
        <section>
          <p className="text-gray-400 text-lg leading-relaxed">
            This document describes the standardized testing methodology used for Azure VM performance benchmarking.
            The goal is to ensure consistent, reproducible, and fair comparisons across different VM series and versions.
          </p>
        </section>

        {/* Benchmark Suite */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Benchmark Suite</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">CoreMark 1.0</h3>
            <p className="text-gray-400">
              <a href="https://github.com/eembc/coremark" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EEMBC CoreMark 1.0</a> is
              an industry-standard CPU benchmark measuring integer performance. It was selected for being:
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300"><span className="text-emerald-400">&#10003;</span> Industry standard &mdash; widely recognized</li>
              <li className="flex items-center gap-2 text-gray-300"><span className="text-emerald-400">&#10003;</span> Portable &mdash; consistent across architectures</li>
              <li className="flex items-center gap-2 text-gray-300"><span className="text-emerald-400">&#10003;</span> Reproducible &mdash; deterministic with validation</li>
              <li className="flex items-center gap-2 text-gray-300"><span className="text-emerald-400">&#10003;</span> Open source &mdash; freely usable and auditable</li>
            </ul>

            <h4 className="text-sm font-semibold text-gray-200 mt-4">What CoreMark Tests</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                { name: 'List Processing', desc: 'Find and sort operations' },
                { name: 'Matrix Manipulation', desc: 'Common matrix operations' },
                { name: 'State Machine', desc: 'Input stream validation' },
                { name: 'CRC', desc: 'Cyclic redundancy check' },
              ].map((w) => (
                <div key={w.name} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <div className="font-medium text-gray-200">{w.name}</div>
                  <div className="text-gray-500 text-xs mt-1">{w.desc}</div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              <strong className="text-gray-300">Metric:</strong> Iterations per second (higher is better) &mdash; how many times the CPU completes the full CoreMark workload in one second.
            </p>
          </div>
        </section>

        {/* Compilation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Compilation Configuration</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Compiler</div>
                <div className="text-gray-200 font-mono">MinGW-w64 GCC</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Flags</div>
                <code className="text-gray-200 bg-gray-800 px-2 py-0.5 rounded">-O3 -march=native -DPERFORMANCE_RUN=1</code>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-200 mt-2">Flag Breakdown</h4>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { flag: '-O3', desc: 'Maximum optimization — aggressive inlining, loop unrolling, vectorization' },
                  { flag: '-march=native', desc: 'Optimize for the host CPU architecture (leverages AVX, SSE, etc.)' },
                  { flag: '-DPERFORMANCE_RUN=1', desc: 'CoreMark performance mode (vs. validation mode)' },
                ].map((f) => (
                  <tr key={f.flag} className="border-b border-gray-800">
                    <td className="py-2 pr-4 font-mono text-blue-400 whitespace-nowrap">{f.flag}</td>
                    <td className="py-2 text-gray-400">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="text-sm font-semibold text-gray-200 mt-2">Build Commands</h4>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-gray-500 mb-1">Single-core</div>
                <code className="block text-xs bg-gray-800 text-gray-300 p-3 rounded-lg overflow-x-auto">
                  gcc -O3 -march=native -DPERFORMANCE_RUN=1 -DMAIN_HAS_NOARGC=1 core_*.c -o coremark-single.exe
                </code>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Multi-core (2 threads)</div>
                <code className="block text-xs bg-gray-800 text-gray-300 p-3 rounded-lg overflow-x-auto">
                  gcc -O3 -march=native -DPERFORMANCE_RUN=1 -DMULTITHREAD=2 -DUSE_PTHREAD core_*.c -lpthread -o coremark-multi.exe
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Execution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Execution Configuration</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-semibold text-gray-200">Thread Configuration</h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="font-medium text-gray-200">Single-Core Test</div>
                <div className="text-gray-500 text-xs mt-1">THREADS=1 — measures raw per-core speed for latency-sensitive workloads</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="font-medium text-gray-200">Multi-Core Test</div>
                <div className="text-gray-500 text-xs mt-1">THREADS=2 — matches 2-vCPU constraint, reflects parallel app behavior</div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-200 mt-2">Test Parameters</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><strong className="text-gray-300">Iterations:</strong> Auto-calibrated by CoreMark to run for 10+ seconds</li>
              <li><strong className="text-gray-300">Runs:</strong> Minimum 3 iterations per configuration</li>
              <li><strong className="text-gray-300">Validation:</strong> CoreMark built-in checksums ensure correctness</li>
            </ul>

            <h4 className="text-sm font-semibold text-gray-200 mt-2">Environment</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><strong className="text-gray-300">OS:</strong> Windows Server 2025 Datacenter Azure Edition</li>
              <li><strong className="text-gray-300">Licensing:</strong> Azure Hybrid Benefit (consistent cost baseline)</li>
              <li><strong className="text-gray-300">VM State:</strong> Freshly provisioned (no thermal throttling or cache pollution)</li>
              <li><strong className="text-gray-300">Background:</strong> Minimal installation, no additional workloads</li>
            </ul>
          </div>
        </section>

        {/* VM Constraints */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">VM Configuration Constraints</h2>
          <p className="text-gray-400 text-sm">
            These constraints isolate the variable we want to measure: <strong className="text-gray-200">CPU microarchitecture improvements across VM series and versions.</strong>
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: '2 vCPUs', desc: 'Standardizes core count across series — isolates architectural improvements from core count scaling.' },
              { title: 'Sweden Central', desc: 'Single region eliminates hardware generation differences across Azure datacenters.' },
              { title: 'Windows Server 2025', desc: 'Latest OS with consistent kernel and driver versions eliminates OS-level deltas.' },
              { title: 'Hybrid Benefit', desc: 'Excludes Windows licensing so price comparisons reflect compute cost only.' },
            ].map((c) => (
              <div key={c.title} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="text-gray-100 font-semibold mb-1">{c.title}</div>
                <div className="text-gray-400 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Execution Workflow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Execution Workflow</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <ol className="space-y-3 text-sm">
              {[
                { step: 'VM Provisioning', desc: 'Azure Bicep templates deploy ephemeral benchmark VMs', time: '~5-10 min' },
                { step: 'Script Injection', desc: 'Azure Custom Script Extension delivers benchmark script', time: '' },
                { step: 'Build & Execute', desc: 'PowerShell installs MinGW, builds CoreMark, runs benchmarks', time: '~1 min' },
                { step: 'Result Upload', desc: 'JSON results uploaded to Azure Blob Storage via managed identity', time: '' },
                { step: 'Cleanup', desc: 'Benchmark VM automatically deleted after execution', time: '' },
              ].map((s, i) => (
                <li key={s.step} className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <div>
                    <span className="text-gray-200 font-medium">{s.step}</span>
                    <span className="text-gray-500"> &mdash; {s.desc}</span>
                    {s.time && <span className="text-gray-600 text-xs ml-2">({s.time})</span>}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 text-sm text-gray-500">
              <strong className="text-gray-300">Total per VM:</strong> ~7-12 minutes end-to-end
            </div>
          </div>
        </section>

        {/* Price-Performance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Price-Performance Calculation</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="font-medium text-gray-200 mb-1">Iterations/sec per dollar</div>
                <code className="text-blue-400 text-xs">iterationsPerSec / hourlyPriceUSD</code>
                <div className="text-gray-500 text-xs mt-2">Higher is better — CPU performance per dollar spent</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="font-medium text-gray-200 mb-1">Scaling Efficiency</div>
                <code className="text-blue-400 text-xs">(multiCore / (singleCore × vCPUs)) × 100%</code>
                <div className="text-gray-500 text-xs mt-2">How well additional cores contribute — above 90% is excellent</div>
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Limitations & Considerations</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">What This Measures</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> CPU integer performance (list, matrix, state machine, CRC)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> Single-threaded and 2-thread parallel performance</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> CPU microarchitecture improvements (IPC, clock, cache)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> Compiler optimization effectiveness</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">What This Does NOT Measure</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">&#10007;</span> Memory bandwidth or storage I/O</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">&#10007;</span> Network throughput</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">&#10007;</span> Floating-point performance (CoreMark is integer-focused)</li>
                <li className="flex items-start gap-2"><span className="text-red-400 shrink-0">&#10007;</span> Many-core scalability (limited to 2 threads)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-emerald-900/30 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-emerald-400 mb-3">Good Use Cases</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Comparing CPU generations (e.g., Ice Lake vs. Sapphire Rapids)</li>
                <li>Evaluating price/performance for compute workloads</li>
                <li>Tracking Azure VM improvements over time</li>
                <li>Selecting VMs for integer-heavy processing (parsing, compression, encoding)</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-red-900/30 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-red-400 mb-3">Poor Use Cases</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Database performance prediction (I/O and memory critical)</li>
                <li>Machine learning training (needs GPU/accelerators)</li>
                <li>Web server selection (network and I/O matter more)</li>
                <li>Storage throughput estimation (CPU is not the bottleneck)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-6 pb-8 text-center text-sm text-gray-500">
          <Link href="/" className="text-blue-400 hover:underline">&larr; Back to Dashboard</Link>
        </footer>
      </main>
    </div>
  );
}
