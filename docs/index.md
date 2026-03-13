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

<!-- INDEX_START -->
    ## Benchmark Results
    
    **Last Updated:** 2026-03-13 19:34:31 UTC
    
    ### Performance Leaders
    
#### Top 5 by Raw Performance

| Rank | VM SKU | CoreMark Score | Monthly Cost |
|------|--------|----------------|--------------|
| 1 | Standard_D2s_v5 | 36242.831701 | $74.46 |
| 2 | Standard_D2s_v4 | 30022.187373 | $74.46 |

#### Top 5 by Cost Efficiency

| Rank | VM SKU | Iter/sec per $ | Monthly Cost |
|------|--------|----------------|--------------|
| 1 | Standard_D2s_v5 | 355321.88 | $74.46 |
| 2 | Standard_D2s_v4 | 294335.17 | $74.46 |

[View Full Report](docs/comparison.md)

<!-- INDEX_END -->

---

*Powered by Azure VM Benchmark Platform*
