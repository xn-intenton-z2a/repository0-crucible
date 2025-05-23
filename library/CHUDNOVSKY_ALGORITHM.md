# CHUDNOVSKY_ALGORITHM

## Crawl Summary
n=number of terms; 1/π via hypergeometric series; constants: 426880, 10005, 545140134, 13591409, 640320; f(n) recurrence with multiplier −(6n−1)(2n−1)(6n−5)/(10939058860032000·n^3); binary split computes P,Q,R in O(log n) tree; π=426880·√10005·Q(1,n)/(13591409·Q(1,n)+R(1,n)); base-case P(a,a+1),Q(a,a+1),R(a,a+1) exact formulas; Python functions binary_split(a,b)->(P,Q,R) and chudnovsky(n).

## Normalised Extract
Table of Contents
1 Algorithm Formula
2 Constants
3 Series Term f(n)
4 Factor Extraction
5 Sum Terms
6 P,Q,S,R Functions
7 Recursive Binary Split
8 Base Case Formulas
9 Python Implementation Details

1 Algorithm Formula
1/π = 12 Σ_{k=0..∞}[(-1)^k·(6k)!·(545140134·k+13591409)/((3k)!·(k!)^3·640320^{3k+3/2})]

2 Constants
Negated Heegner number d = -163
j-function value = -640320^3
Factor extracted becomes 426880·√10005

3 Series Term f(n)
f(0)=1
f(n)=f(n-1)·[−(6n−1)(2n−1)(6n−5)/(10939058860032000·n^3)]

4 Factor Extraction
1/π = 1/(426880·√10005) Σ f(k)·(545140134·k+13591409)

5 Sum Terms
First term k=0 contributes 13591409
Subsequent k>=1 via f(k) recurrence

6 P,Q,S,R Functions
P(a,b)=∏_{j=a..b-1}[−(6j−1)(2j−1)(6j−5)]
Q(a,b)=∏_{j=a..b-1}[10939058860032000·j^3]
S(a,b)=Σ_{k=a..b-1}[P(a,k+1)/Q(a,k+1)·(545140134·k+13591409)]
R(a,b)=Q(a,b)·S(a,b)

7 Recursive Binary Split
Choose m=(a+b)//2
P(a,b)=P(a,m)·P(m,b)
Q(a,b)=Q(a,m)·Q(m,b)
R(a,b)=Q(m,b)·R(a,m)+P(a,m)·R(m,b)

8 Base Case Formulas (b=a+1)
P(a,a+1)=−(6a−1)(2a−1)(6a−5)
Q(a,a+1)=10939058860032000·a^3
S(a,a+1)=P(a,a+1)/Q(a,a+1)·(545140134·a+13591409)
R(a,a+1)=P(a,a+1)·(545140134·a+13591409)

9 Python Implementation Details
Function binary_split(a,b) returns P,Q,R
Function chudnovsky(n) returns Decimal approximation of π using binary_split

## Supplementary Details
Constants
10939058860032000 = 640320^3/24
545140134 = 163·127·19·11·7·3^2·2
13591409 = 13·1045493

Precision Configuration
Decimal Context prec=28 default; set higher prec for more digits (setcontext(Context(prec=<desired>)))

Implementation Steps
1. Initialize Decimal context
2. Call binary_split(1,n)
3. Compute numerator = 426880·Decimal(10005).sqrt()·Q1n
4. Compute denominator = 13591409·Q1n+R1n
5. Return numerator/denominator

Performance
Time O(n·(log n)^3) with binary splitting reduces constant factors in factorial-like growth
Use iterative or memoized factorials for large n

Environment
Requires Python 3.x, decimal module

## Reference Details
API: binary_split(a:int,b:int)->(P:int,Q:int,R:int)
Parameters:
 a: start index >=1
 b: end index >a
Returns P(a,b), Q(a,b), R(a,b) for series segment
Throws: ValueError if b<=a

API: chudnovsky(n:int)->Decimal
a: number of terms n>0
Returns Decimal approximation of π with precision equal to current Decimal context prec

Code Example:
from decimal import Decimal, Context, setcontext
setcontext(Context(prec=100))
def binary_split(a,b):
    if b<=a: raise ValueError('b must be > a')
    if b==a+1:
        P=-(6*a-1)*(2*a-1)*(6*a-5)
        Q=10939058860032000*a**3
        R=P*(545140134*a+13591409)
        return P,Q,R
    m=(a+b)//2
    Pam,Qam,Ram=binary_split(a,m)
    Pmb,Qmb,Rmb=binary_split(m,b)
    return Pam*Pmb, Qam*Qmb, Qmb*Ram+Pam*Rmb
def chudnovsky(n):
    _,Q1n,R1n=binary_split(1,n)
    return (426880*Decimal(10005).sqrt()*Q1n)/(13591409*Q1n+R1n)
# Usage
pi_50digits=chudnovsky(5)

Configuration Options:
Context prec: default 28, set to required digits+extra guard

Best Practices:
 Use n ≈ desired_digits/14 to guarantee convergence
 Increase prec to desired_digits+10
 Warm-up by computing sqrt(10005) once
 Store P,Q,R in arbitrary-precision ints for minimal overhead

Troubleshooting:
 Error: InvalidOperation from decimal module -> increase prec
 OverflowError in integer -> ensure Python arbitrary-int
 Slow performance -> reduce Python overhead by C extension or use gmpy2

Exact Commands:
>>> import decimal
>>> decimal.getcontext().prec=200
>>> from chudnovsky import chudnovsky
>>> print(chudnovsky(50))

## Information Dense Extract
1/π=1/(426880·√10005)(13591409+Σ_{k=1..n}f(k)(545140134k+13591409)), f(0)=1, f(n)=f(n−1)(−(6n−1)(2n−1)(6n−5)/(10939058860032000n^3)), P(a,b)=∏_{j=a..b-1}[−(6j−1)(2j−1)(6j−5)],Q(a,b)=∏_{j=a..b-1}[10939058860032000j^3],R(a,b)=Q(a,b)S(a,b),S(a,b)=Σ_{k=a..b-1}[P(a,k+1)/Q(a,k+1)(545140134k+13591409)],Recurrence P(a,b)=P(a,m)P(m,b),Q(a,b)=Q(a,m)Q(m,b),R(a,b)=Q(m,b)R(a,m)+P(a,m)R(m,b),Base P(a,a+1)=−(6a−1)(2a−1)(6a−5),Q(a,a+1)=10939058860032000a^3,R(a,a+1)=P(a,a+1)(545140134a+13591409);Python:{binary_split(a,b)->(P,Q,R),chudnovsky(n)->Decimal(pi)}

## Sanitised Extract
Table of Contents
1 Algorithm Formula
2 Constants
3 Series Term f(n)
4 Factor Extraction
5 Sum Terms
6 P,Q,S,R Functions
7 Recursive Binary Split
8 Base Case Formulas
9 Python Implementation Details

1 Algorithm Formula
1/ = 12 _{k=0..}[(-1)^k(6k)!(545140134k+13591409)/((3k)!(k!)^3640320^{3k+3/2})]

2 Constants
Negated Heegner number d = -163
j-function value = -640320^3
Factor extracted becomes 42688010005

3 Series Term f(n)
f(0)=1
f(n)=f(n-1)[(6n1)(2n1)(6n5)/(10939058860032000n^3)]

4 Factor Extraction
1/ = 1/(42688010005)  f(k)(545140134k+13591409)

5 Sum Terms
First term k=0 contributes 13591409
Subsequent k>=1 via f(k) recurrence

6 P,Q,S,R Functions
P(a,b)=_{j=a..b-1}[(6j1)(2j1)(6j5)]
Q(a,b)=_{j=a..b-1}[10939058860032000j^3]
S(a,b)=_{k=a..b-1}[P(a,k+1)/Q(a,k+1)(545140134k+13591409)]
R(a,b)=Q(a,b)S(a,b)

7 Recursive Binary Split
Choose m=(a+b)//2
P(a,b)=P(a,m)P(m,b)
Q(a,b)=Q(a,m)Q(m,b)
R(a,b)=Q(m,b)R(a,m)+P(a,m)R(m,b)

8 Base Case Formulas (b=a+1)
P(a,a+1)=(6a1)(2a1)(6a5)
Q(a,a+1)=10939058860032000a^3
S(a,a+1)=P(a,a+1)/Q(a,a+1)(545140134a+13591409)
R(a,a+1)=P(a,a+1)(545140134a+13591409)

9 Python Implementation Details
Function binary_split(a,b) returns P,Q,R
Function chudnovsky(n) returns Decimal approximation of  using binary_split

## Original Source
Chudnovsky Algorithm
https://en.wikipedia.org/wiki/Chudnovsky_algorithm

## Digest of CHUDNOVSKY_ALGORITHM

# Chudnovsky Algorithm Technical Details (retrieved 2025-05-29)

# Algorithm Definition

1/π = 12 · Σ_{k=0..∞} [(-1)^k·(6k)!·(545140134·k+13591409) / ((3k)!·(k!)^3·(640320)^(3k+3/2))]
Time complexity O(n·(log n)^3).

# Binary Splitting Optimization

Extract factor 1/640320^(3/2) simplifies series to:
1/π = 1/(426880·√10005) · Σ_{k=0..∞}[(-1)^k·(6k)!·(545140134·k+13591409) / ((3k)!·(k!)^3·(640320)^(3k))]
Define f(n) = (-1)^n·(6n)!/( (3n)!·(n!)^3·(640320)^(3n) ).

Recurrence: f(0)=1; f(n)=f(n−1)·[−(6n−1)(2n−1)(6n−5) / (10939058860032000·n^3)].

# Series Rewritten

1/π = 1/(426880·√10005)·(13591409 + Σ_{k=1..∞}[f(k)·(545140134·k+13591409)]).

# P, Q, R, S Definitions

P(a,b)=∏_{j=a..b−1} [−(6j−1)(2j−1)(6j−5)]
Q(a,b)=∏_{j=a..b−1}[10939058860032000·j^3]
S(a,b)=Σ_{k=a..b−1}[P(a,k+1)/Q(a,k+1)·(545140134·k+13591409)]
R(a,b)=Q(a,b)·S(a,b)

π = (426880·√10005) / (13591409 + S(1,∞)) = lim_{n→∞}[426880·√10005·Q(1,n) / (13591409·Q(1,n) + R(1,n))]

# Recursive Binary Split

For a < m < b:
P(a,b)=P(a,m)·P(m,b)
Q(a,b)=Q(a,m)·Q(m,b)
R(a,b)=Q(m,b)·R(a,m) + P(a,m)·R(m,b)

Base case b=a+1:
P(a,a+1)=−(6a−1)(2a−1)(6a−5)
Q(a,a+1)=10939058860032000·a^3
S(a,a+1)=P(a,a+1)/Q(a,a+1)·(545140134·a+13591409)
R(a,a+1)=P(a,a+1)·(545140134·a+13591409)

# Reference Python Implementation

from decimal import Decimal, Context, setcontext
setcontext(Context(prec=28))

def binary_split(a,b):
    if b == a+1:
        P=-(6*a-1)*(2*a-1)*(6*a-5)
        Q=10939058860032000*a**3
        R=P*(545140134*a+13591409)
        return P, Q, R
    m=(a+b)//2
    Pam,Qam,Ram=binary_split(a,m)
    Pmb,Qmb,Rmb=binary_split(m,b)
    Pab=Pam*Pmb
    Qab=Qam*Qmb
    Rab=Qmb*Ram + Pam*Rmb
    return Pab,Qab,Rab

def chudnovsky(n):
    _,Q1n,R1n=binary_split(1,n)
    return (426880*Decimal(10005).sqrt()*Q1n) / (13591409*Q1n + R1n)

# documentNamesToBeDeleted: none

## Attribution
- Source: Chudnovsky Algorithm
- URL: https://en.wikipedia.org/wiki/Chudnovsky_algorithm
- License: License: CC BY-SA 3.0
- Crawl Date: 2025-05-23T03:35:31.548Z
- Data Size: 7822316 bytes
- Links Found: 27831

## Retrieved
2025-05-23
