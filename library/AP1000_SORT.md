# AP1000_SORT

## Crawl Summary
Implementation of a least-significant-digit radix sort for positive 32-bit integers on Fujitsu AP1000. Data partitioned evenly across P processors; each pass extracts B-bit digit block via mask and shift, local bin counts, all-to-all redistribution of bins, local reassembly. Full-machine radix sort requires log2(R) passes where R=2^B.

## Normalised Extract
Table of Contents:
1. Radix Sort Pass Structure
2. Data Partitioning
3. Digit Extraction
4. Local Counting
5. All-to-All Redistribution

1. Radix Sort Pass Structure
Perform k = 32/B passes. In each pass 0 ≤ i < k extract bits [i·B..(i+1)·B) and reorder.

2. Data Partitioning
Given N integers, assign N/P per processor. Local buffers of size N/P per processor.

3. Digit Extraction
mask = (1<<B)-1; digit = (key >> (i·B)) & mask.

4. Local Counting
Count occurrences of each digit value [0..2^B) in local bucket array count[2^B].

5. All-to-All Redistribution
For each bucket value v, processor p sends count[p][v] values to processor owning global bucket v; use MPI_Alltoallv with sendcounts=count[*][v], displacements computed by prefix sums.

## Supplementary Details
Parameter B: choose B = 8 for 256 buckets to balance passes and memory.
Memory per processor:  N/P integers + 256 counters + communication buffers.
MPI settings: use MPI_Alltoallv with int sendcounts[P], senddispls[P], recvcounts[P], recvdispls[P].
Compute recvcounts from global reduction of counts via MPI_Allreduce on count[*][v].

## Reference Details
No public APIs or SDKs. Implementation pattern in C with MPI:

MPI_Init(&argc,&argv);
MPI_Comm_size(MPI_COMM_WORLD,&P);
MPI_Comm_rank(MPI_COMM_WORLD,&rank);
Allocate local array data[N/P]; read initial segment.
for pass=0; pass<k; pass++ {
  memset(count,0,sizeof(count));
  for j=0; j<N/P; j++ {
    d = (data[j] >> (pass*B)) & ((1<<B)-1);
    count[d]++;
  }
  for v=0; v<2^B; v++) MPI_Allreduce(&count[v], &global_offset[v], 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
  compute sendcounts and displacements using prefix sums over count and global_offset;
  MPI_Alltoallv(data, sendcounts, senddispls, MPI_UINT32_T,
                tempbuf, recvcounts, recvdispls, MPI_UINT32_T,
                MPI_COMM_WORLD);
  memcpy(data, tempbuf, total_recv_bytes);
}
MPI_Finalize();

Best practice: choose B such that 2^B ≤ P to reduce communication partners.

Troubleshooting:
Command: mpirun -np 16 ./sort_ap1000
Expected all ranks exit with code 0 within O(k·Tcomm + k·Tcomp) time.
Monitor with MPI profiling (mpip) to ensure balanced sendcounts.

## Information Dense Extract
Radix-sort 32-bit ints on AP1000: B=8 bits per pass, k=4 passes; mask=(1<<8)-1; count local buckets[256]; MPI_Alltoallv for redistribution; use MPI_Allreduce to compute global offsets; choose B s.t. 2^B≤P; memory N/P ints +256 counters; C/MPI pattern as shown.

## Sanitised Extract
Table of Contents:
1. Radix Sort Pass Structure
2. Data Partitioning
3. Digit Extraction
4. Local Counting
5. All-to-All Redistribution

1. Radix Sort Pass Structure
Perform k = 32/B passes. In each pass 0  i < k extract bits [iB..(i+1)B) and reorder.

2. Data Partitioning
Given N integers, assign N/P per processor. Local buffers of size N/P per processor.

3. Digit Extraction
mask = (1<<B)-1; digit = (key >> (iB)) & mask.

4. Local Counting
Count occurrences of each digit value [0..2^B) in local bucket array count[2^B].

5. All-to-All Redistribution
For each bucket value v, processor p sends count[p][v] values to processor owning global bucket v; use MPI_Alltoallv with sendcounts=count[*][v], displacements computed by prefix sums.

## Original Source
Unbounded Spigot Algorithms for the Digits of π (Rabinowitz & Wagon)
https://arxiv.org/abs/cs/0004013

## Digest of AP1000_SORT

# Title: Sorting Integers on the AP1000

# Authors: Lex Weaver, Andrew Lynes

# Abstract
Sorting positive integers on a Fujitsu AP1000 Supercomputer using a radix-based algorithm with multiple passes. Brief consideration of a full parallel radix sort across the machine.

# Submission History
Submitted on 23 Apr 2000; 79 KB full text.

# Source Retrieval
Content retrieved from arXiv cs/0004013 on 2024-06-12; Data Size: 18050139 bytes; Links Found: 98531; Error: None.

## Attribution
- Source: Unbounded Spigot Algorithms for the Digits of π (Rabinowitz & Wagon)
- URL: https://arxiv.org/abs/cs/0004013
- License: License: Open Access (arXiv)
- Crawl Date: 2025-05-22T03:35:22.027Z
- Data Size: 18050139 bytes
- Links Found: 98531

## Retrieved
2025-05-22
