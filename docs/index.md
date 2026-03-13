---
layout: default
title: Azure VM Performance Benchmarks
---

# Azure VM Performance Benchmarks

Independent performance benchmarks for Azure Virtual Machines using [EEMBC CoreMark](https://www.eembc.org/coremark/).

## Quick Links

- [Full Comparison Report](comparison) — Detailed performance rankings and analysis
- [Interactive Charts](charts/performance.html) — Visual performance and price-performance comparisons
- [Raw Data (CSV)](benchmark-results.csv) — Download benchmark data for your own analysis

## Methodology

- **Benchmark:** CoreMark 1.01 (EEMBC)
- **Compiler:** GCC with `-O3 -march=native` optimizations
- **Metrics:** Single-core and multi-core iterations/second
- **Pricing:** Azure Retail Prices API (Linux pay-as-you-go)
- **Region:** Sweden Central

Each VM is provisioned fresh, benchmarked, and torn down automatically. Results include both raw performance scores and price-performance ratios (iterations/sec per $/hr).

## Latest Results

<!-- RESULTS_START -->
*See the [full comparison report](comparison) for current results.*
<!-- RESULTS_END -->

---

*Powered by Azure VM Benchmark Platform*
