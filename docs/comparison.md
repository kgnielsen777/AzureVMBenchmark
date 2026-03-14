    # Azure VM Performance Comparison
    
    **Generated:** 2026-03-14 16:30:15 UTC  
    **Total VMs Tested:** 16
    
    ## Executive Summary
    
    ### Best Performers
    
    | Category | VM SKU | Score | Details |
    |----------|--------|-------|---------|
    | **Raw Performance** | Standard_F2as_v6 | 62022.939592 iter/sec | 106.58 USD/month |
    | **Price-Performance** | Standard_B2as_v2 | 489500.63 iter/sec/$ | Best cost efficiency |
    | **Scaling Efficiency** | Standard_F2as_v6 | 97.7% | Multi-core scaling |
    | **Most Affordable** | Standard_B2as_v2 | 56.79 USD/month | 38083.148821 iter/sec |
    
    ## Performance Comparison
    
    ### Multi-Core Performance Rankings
    
    | Rank | VM SKU | CoreMark Score | Single-Core | Scaling Efficiency |
    |------|--------|----------------|-------------|-------------------|
| 1 | Standard_F2as_v6 | 62022.939592 | 31756.113052 | 97.7% |
| 2 | Standard_D2s_v6 | 49437.653565 | 32507.110931 | 76% |
| 3 | Standard_E2s_v6 | 49200.532036 | 32255.463269 | 76.3% |
| 4 | Standard_D2as_v6 | 47236.660329 | 28661.507595 | 82.4% |
| 5 | Standard_E2as_v6 | 47195.784135 | 28342.662793 | 83.3% |
| 6 | Standard_E2as_v4 | 38333.760672 | 27041.644132 | 70.9% |
| 7 | Standard_B2as_v2 | 38083.148821 | 26985.090737 | 70.6% |
| 8 | Standard_E2as_v5 | 38052.960131 | 26965.080221 | 70.6% |
| 9 | Standard_D2as_v4 | 37872.830434 | 23737.933217 | 79.8% |
| 10 | Standard_D2as_v5 | 37701.471719 | 26732.607098 | 70.5% |
| 11 | Standard_E2s_v5 | 36404.456192 | 27932.960894 | 65.2% |
| 12 | Standard_D2s_v5 | 36330.608671 | 27895.948114 | 65.1% |
| 13 | Standard_B2s_v2 | 36101.087738 | 27919.313185 | 64.7% |
| 14 | Standard_D2s_v4 | 30726.692654 | 23807.634315 | 64.5% |
| 15 | Standard_E2s_v4 | 30007.708751 | 22879.804759 | 65.6% |
| 16 | Standard_F2s_v2 | 29746.422367 | 22777.313795 | 65.3% |    
    
    ## Price-Performance Analysis
    
    ### Cost Efficiency Rankings
    
    | Rank | VM SKU | Iter/sec per $ | Monthly Cost | Performance |
    |------|--------|----------------|--------------|-------------|
| 1 | Standard_B2as_v2 | 489500.63 | $56.79 | 38083.148821 iter/sec |
| 2 | Standard_D2as_v6 | 486975.88 | $70.81 | 47236.660329 iter/sec |
| 3 | Standard_D2s_v6 | 462034.15 | $78.11 | 49437.653565 iter/sec |
| 4 | Standard_F2as_v6 | 424814.65 | $106.58 | 62022.939592 iter/sec |
| 5 | Standard_B2s_v2 | 417836.66 | $63.07 | 36101.087738 iter/sec |
| 6 | Standard_D2as_v5 | 409798.61 | $67.16 | 37701.471719 iter/sec |
| 7 | Standard_D2as_v4 | 371302.26 | $74.46 | 37872.830434 iter/sec |
| 8 | Standard_E2as_v6 | 368717.06 | $93.44 | 47195.784135 iter/sec |
| 9 | Standard_D2s_v5 | 356182.44 | $74.46 | 36330.608671 iter/sec |
| 10 | Standard_E2s_v6 | 348939.94 | $102.93 | 49200.532036 iter/sec |
| 11 | Standard_E2as_v5 | 314487.27 | $88.33 | 38052.960131 iter/sec |
| 12 | Standard_F2s_v2 | 306664.15 | $70.81 | 29746.422367 iter/sec |
| 13 | Standard_D2s_v4 | 301242.08 | $74.46 | 30726.692654 iter/sec |
| 14 | Standard_E2as_v4 | 286072.84 | $97.82 | 38333.760672 iter/sec |
| 15 | Standard_E2s_v5 | 271675.05 | $97.82 | 36404.456192 iter/sec |
| 16 | Standard_E2s_v4 | 223938.13 | $97.82 | 30007.708751 iter/sec |    
    
    ### Performance per /month
    
    | VM SKU | Iterations/sec per /month | Monthly Cost |
    |--------|------------------------------|--------------|
| Standard_B2as_v2 | 67059.6 | $56.79 |
| Standard_D2as_v6 | 66709.02 | $70.81 |
| Standard_D2s_v6 | 63292.35 | $78.11 |
| Standard_F2as_v6 | 58193.79 | $106.58 |
| Standard_B2s_v2 | 57239.71 | $63.07 |
| Standard_D2as_v5 | 56136.8 | $67.16 |
| Standard_D2as_v4 | 50863.32 | $74.46 |
| Standard_E2as_v6 | 50509.19 | $93.44 |
| Standard_D2s_v5 | 48792.11 | $74.46 |
| Standard_E2s_v6 | 47799.99 | $102.93 |
| Standard_E2as_v5 | 43080.45 | $88.33 |
| Standard_F2s_v2 | 42008.79 | $70.81 |
| Standard_D2s_v4 | 41266.04 | $74.46 |
| Standard_E2as_v4 | 39188.06 | $97.82 |
| Standard_E2s_v5 | 37215.76 | $97.82 |
| Standard_E2s_v4 | 30676.46 | $97.82 |    
    
    ## Series Comparison
    
    ### Performance by VM Series
    
    | Series | Avg Multi-Core Score | Avg Price/month | Avg Price-Performance |
    |--------|---------------------|-----------------|----------------------|
|  | 40278 | $82.18 | 365011.36 |    
    
    ### Performance by Generation
    
    | Version | Avg Multi-Core Score | Avg Price/month | Avg Price-Performance |
    |---------|---------------------|-----------------|----------------------|
|  | 40278 | $82.18 | 365011.36 |    
    
    ## Visualizations
    
    ### Performance Chart
    !Performance Comparison](charts/performance.html)
    
    ### Price-Performance Chart
    ![Price-Performance Ratio](charts/price-performance.html)
    
    ### Comparison Chart
    ![Performance vs Cost](charts/comparison.html)
        
    
    ## Recommendations
    
    ### For Raw Performance
    **Choose:** Standard_F2as_v6
    - Highest CoreMark score: 62022.939592 iterations/sec
    - Monthly cost: $106.58
    - Best for: compute-intensive workloads requiring maximum performance
    
    ### For Cost Efficiency
    **Choose:** Standard_B2as_v2
    - Best price-performance ratio: 489500.63 iter/sec per $/hour
    - Monthly cost: $56.79
    - Best for: budget-conscious deployments with good performance needs
    
    ### For Budget Optimization
    **Choose:** Standard_B2as_v2
    - Lowest monthly cost: $56.79
    - Performance: 38083.148821 iterations/sec
    - Best for: development, testing, or low-traffic workloads
    
    ## Methodology
    
    - **Benchmark:** EEMBC CoreMark 1.0
    - **Compiler:** MinGW-w64 GCC with -O3 -march=native
    - **VM Config:** 2 vCPU, Windows Server 2025, Hybrid Benefit
    - **Pricing:** Azure Retail Prices API (consumption/pay-as-you-go)
    - **Location:** Sweden Central
    - **Iterations:** 2000 per test
    
    ## About CoreMark
    
    CoreMark is a simple, portable benchmark focusing on core processor operations used in embedded and enterprise computing. It measures:
    - List processing (search and sort)
    - Matrix operations(common mathematical operations)
    - State machine operations
    - CRC operations
    
    Higher scores indicate better CPU performance for general-purpose workloads.
    
    ---
    
    *Report generated by Azure VM Benchmark Platform*
