export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Azure VM Performance Benchmarks
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Compare Azure VM performance and pricing across series and versions
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">47 VMs Tested</h2>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive benchmark coverage</p>
          </div>
          
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">Latest Data</h2>
            <p className="text-gray-600 dark:text-gray-400">Updated March 14, 2026</p>
          </div>
          
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">CoreMark 1.0</h2>
            <p className="text-gray-600 dark:text-gray-400">Industry-standard CPU benchmark</p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">✨ Next.js Setup Complete!</h3>
          <p className="text-gray-700 dark:text-gray-300">
            The modern frontend is ready. Next steps:
          </p>
          <ul className="mt-4 text-left max-w-2xl mx-auto space-y-2 text-gray-600 dark:text-gray-400">
            <li>✓ Next.js 15 with App Router</li>
            <li>✓ TypeScript configured</li>
            <li>✓ Tailwind CSS installed</li>
            <li>✓ Static export enabled</li>
            <li>→ Next: Install shadcn/ui components</li>
            <li>→ Next: Create data directory and add JSON files</li>
            <li>→ Next: Build interactive components</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
