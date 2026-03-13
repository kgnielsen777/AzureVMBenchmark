---
layout: default
title: Benchmark Methodology
---

# Benchmark Methodology

How we test Azure VM performance and how to interpret the results.

## The Benchmark: CoreMark

[CoreMark](https://www.eembc.org/coremark/) is an industry-standard CPU benchmark developed by EEMBC (Embedded Microprocessor Benchmark Consortium). It measures core CPU performance through a mix of workloads:

- **List processing** — pointer chasing and sorting (tests memory access patterns)
- **Matrix operations** — multiply-accumulate on small matrices (tests arithmetic throughput)
- **State machine** — CRC computation over input data (tests branch prediction and control flow)

CoreMark produces a single score in **iterations per second** — higher is better.

### Why CoreMark?

- **Standardized** — widely used across the industry, making results comparable
- **CPU-focused** — isolates compute performance without I/O or memory bandwidth bottlenecks
- **Deterministic** — consistent results across runs on the same hardware
- **Lightweight** — runs in minutes, enabling cost-effective testing of many VM SKUs

### What CoreMark Does NOT Measure

CoreMark is a pure CPU benchmark. It does not test:

- Disk I/O or storage performance
- Network throughput or latency
- GPU compute capability
- Memory bandwidth (beyond L1/L2 cache)
- Application-specific workloads (databases, web servers, etc.)

For workloads that are I/O-bound, memory-bound, or GPU-dependent, CoreMark scores alone won't tell the full story.

---

## Test Environment

| Parameter | Value |
|-----------|-------|
| **OS** | Windows Server 2025 |
| **Compiler** | MinGW-w64 GCC with `-O3 -march=native` |
| **CoreMark Version** | 1.01 |
| **Region** | Sweden Central |
| **VM Size** | 2 vCPU variants (to keep comparisons fair) |

### Test Procedure

1. **Fresh VM** — a new VM is provisioned for each test, eliminating noisy-neighbor and warm-cache effects
2. **Automated setup** — GCC is installed via Chocolatey, CoreMark source is downloaded and compiled
3. **Single-core run** — CoreMark executes on a single core for 30+ seconds (minimum 10 seconds required by EEMBC rules)
4. **Multi-core run** — two parallel CoreMark instances run simultaneously, scores are summed
5. **Upload** — results are uploaded to Azure Blob Storage via managed identity
6. **Teardown** — the VM and its resource group are deleted immediately after

Each VM gets an identical, clean environment. No manual tuning or optimization is applied.

---

## Understanding the Results

### Key Metrics

| Metric | What It Means | How to Use It |
|--------|---------------|---------------|
| **Single-Core Score** | Performance of one CPU core | Best for single-threaded workloads |
| **Multi-Core Score** | Combined performance across all cores | Best for parallel/multi-threaded workloads |
| **Scaling Efficiency** | How well performance scales with core count | 100% = perfect scaling, lower = diminishing returns |
| **Price ($/hr)** | Linux pay-as-you-go hourly rate | Your actual cost per hour |
| **Monthly Cost** | Estimated 730-hour monthly cost | Budget planning |
| **Price-Performance (iter/sec/$)** | CoreMark score divided by hourly price | Best value for money — **higher is better** |

### How to Read the Rankings

**Best Raw Performance** — the VM with the highest multi-core CoreMark score. Choose this when performance matters more than cost (latency-sensitive workloads, batch processing deadlines).

**Best Price-Performance** — the VM with the highest iterations/sec per dollar. Choose this when you want the most compute per dollar spent (cost-optimized workloads, dev/test environments).

**Best Scaling Efficiency** — the VM where multi-core performance scales closest to 100% of theoretical maximum. A 2-vCPU VM with 95% scaling means both cores work nearly independently. Low scaling efficiency may indicate shared resources or thermal throttling.

### Comparing Intel vs AMD

Both Intel and AMD VMs are tested under identical conditions. Key differences to consider:

- **Clock speed vs IPC** — AMD EPYC and Intel Xeon have different architectures. A higher CoreMark score means better real-world single/multi-threaded performance regardless of clock speed
- **Price differences** — AMD VMs are often priced slightly lower, which can show up as better price-performance even with similar raw scores
- **Consistency** — some VM families show more consistent scores across runs than others

### Comparing D-series vs E-series

- **D-series** (General Purpose) — balanced CPU-to-memory ratio, good for most workloads
- **E-series** (Memory Optimized) — higher memory-to-CPU ratio, same CPU cores

Since CoreMark only tests CPU, D-series and E-series VMs with the same processor generation will score similarly. The price difference reflects the additional memory in E-series, making D-series the better value for CPU-intensive workloads.

### Version Generations (v4, v5, v6)

Higher version numbers generally mean newer CPU generations:

| Version | Intel | AMD |
|---------|-------|-----|
| v4 | Cascade Lake | Rome |
| v5 | Ice Lake | Milan |
| v6 | Sapphire Rapids | Genoa |

Newer generations typically deliver better performance per core and better power efficiency.

---

## Limitations and Caveats

- **Snapshot in time** — Azure hardware and pricing change. Results reflect conditions at the time of testing
- **2 vCPU only** — we test the smallest size in each family. Larger sizes (4, 8, 16+ vCPU) may scale differently
- **Region-specific** — pricing and hardware availability vary by Azure region. We test in Sweden Central
- **CPU only** — for memory-intensive, storage-intensive, or GPU workloads, these benchmarks are not sufficient
- **Linux pricing** — we use Linux pay-as-you-go rates. Windows pricing and reserved instance pricing will differ
- **No spot pricing** — we exclude Spot and Low Priority pricing from comparisons as those prices fluctuate

---

## Reproducibility

All benchmark code is open and automated. The same test can be reproduced by:

1. Provisioning the same VM SKU in the same region
2. Installing MinGW-w64 GCC
3. Compiling CoreMark 1.01 with `-O3 -march=native`
4. Running the benchmark for at least 10 seconds

Scores should be within ±2% across runs on identical hardware.
