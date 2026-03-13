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
- [Methodology & How to Read Results](methodology) — What we test, how we test, and what the numbers mean

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
    
    **Last Updated:** 2026-03-13 21:54:51 UTC
    
    ### Performance Leaders
    
#### Top 5 by Raw Performance

| Rank | VM SKU | CoreMark Score | Monthly Cost |
|------|--------|----------------|--------------|
| 1 | Standard_D2s_v6 | 49437.653565 | $78.11 |
| 2 | Standard_E2s_v6 | 49200.532036 | $102.93 |
| 3 | Standard_D2as_v6 | 47236.660329 | $70.81 |
| 4 | Standard_E2as_v6 | 47195.784135 | $93.44 |
| 5 | Standard_E2as_v4 | 38333.760672 | $97.82 |

#### Top 5 by Cost Efficiency

| Rank | VM SKU | Iter/sec per $ | Monthly Cost |
|------|--------|----------------|--------------|
| 1 | Standard_D2as_v6 | 486975.88 | $70.81 |
| 2 | Standard_D2s_v6 | 462034.15 | $78.11 |
| 3 | Standard_D2as_v5 | 409798.61 | $67.16 |
| 4 | Standard_D2as_v4 | 371302.26 | $74.46 |
| 5 | Standard_E2as_v6 | 368717.06 | $93.44 |

[View Full Report](docs/comparison.md)

<!-- INDEX_END -->

---

*Powered by Azure VM Benchmark Platform*
