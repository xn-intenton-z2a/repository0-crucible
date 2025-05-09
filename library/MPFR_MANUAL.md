# MPFR_MANUAL

## Crawl Summary
Initialization: mpfr_init2(x,prec bits) allocates and sets precision. mpfr_clear(x) frees memory. Precision is mpfr_prec_t (unsigned long), default 53 bits. Rounding modes: MPFR_RNDN, RNDZ, RNDU, RNDD, RNDA. Arithmetic: mpfr_add, sub, mul, div take (rop, op1, op2, rnd) return flags. Comparison: mpfr_cmp, mpfr_equal_p, mpfr_nan_p. Conversion: mpfr_set_d, mpfr_get_d. I/O: mpfr_printf, mpfr_fprintf, mpfr_scanf. Error flags: mpfr_get_flags, mpfr_clear_flags. Build: configure with --with-gmp, enable thread-safe. Link flags: -lmpfr -lgmp.

## Normalised Extract
Table of Contents
 1 Initialization and Memory Management
 2 Precision and Rounding Modes
 3 Basic Arithmetic Functions
 4 Comparison and Special Functions
 5 I/O and Conversion
 6 Error Handling and Flags
 7 Thread Safety and Build Configuration

1 Initialization and Memory Management
 mpfr_init(mpfr_t x): allocate x with default precision
 mpfr_init2(mpfr_t x, mpfr_prec_t prec): allocate x with prec bits precision
 mpfr_init_set_str(mpfr_t x, const char *str, int base, mpfr_rnd_t rnd): parse str in base, set x
 mpfr_clear(mpfr_t x): free memory used by x

2 Precision and Rounding Modes
 mpfr_prec_t = unsigned long
 Default precision = 53 bits
 mpfr_rnd_t constants:
   MPFR_RNDN = 0
   MPFR_RNDZ = 1
   MPFR_RNDU = 2
   MPFR_RNDD = 3
   MPFR_RNDA = 4

3 Basic Arithmetic Functions
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 Returns bitmask of flags: INEXACT=1, UNDERFLOW=2, OVERFLOW=4, NAN=8

4 Comparison and Special Functions
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)

5 I/O and Conversion
 int mpfr_set_d(mpfr_t rop,double d,mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op,mpfr_rnd_t rnd)
 int mpfr_printf(const char *format,...)
 int mpfr_fprintf(FILE *stream,const char *format,...)
 int mpfr_scanf(const char *format,...)

6 Error Handling and Flags
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

7 Thread Safety and Build Configuration
 Configure:
   --with-gmp=/path --enable-thread-safe --disable-static
 Compiler:
   -I/path/mpfr/include -L/path/mpfr/lib -lmpfr -lgmp

## Supplementary Details
Linker flags: -L/usr/local/lib -lmpfr -lgmp
Compile flags: -I/usr/local/include/mpfr -O2 -fPIC
CMake example:
 add_library(mpfr STATIC IMPORTED)
 set_target_properties(mpfr PROPERTIES
   IMPORTED_LOCATION /usr/local/lib/libmpfr.a
   INTERFACE_INCLUDE_DIRECTORIES /usr/local/include/mpfr)
 target_link_libraries(your_target PRIVATE mpfr gmp)

Configuration options with defaults:
 --with-gmp=/usr/local --enable-thread-safe (default off) --disable-static (default off)

Precision defaults:
 MPFR_PREC_MIN = 2 bits
 MPFR_PREC_MAX = ULONG_MAX bits

Threading:
 MPFR_LOCK macro enabled when --enable-thread-safe



## Reference Details
Prototypes:
 void mpfr_init(mpfr_t x)
 void mpfr_init2(mpfr_t x, mpfr_prec_t prec)
 void mpfr_clear(mpfr_t x)
 int mpfr_set_d(mpfr_t rop, double d, mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op, mpfr_rnd_t rnd)
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2, mpfr_rnd_t rnd)
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

Constants:
 #define MPFR_RNDN  0
 #define MPFR_RNDZ  1
 #define MPFR_RNDU  2
 #define MPFR_RNDD  3
 #define MPFR_RNDA  4
 #define MPFR_FLAG_INEXACT 1
 #define MPFR_FLAG_UNDERFLOW 2
 #define MPFR_FLAG_OVERFLOW 4
 #define MPFR_FLAG_NAN 8

Example:
 #include <mpfr.h>
 int main(){
   mpfr_t a,b,c;
   mpfr_init2(a,256);
   mpfr_init2(b,256);
   mpfr_init2(c,256);
   mpfr_set_d(a,1.2345,MPFR_RNDN);
   mpfr_set_d(b,6.789,MPFR_RNDN);
   int flags = mpfr_add(c,a,b,MPFR_RNDN);
   if(flags & MPFR_FLAG_INEXACT) puts("Inexact result");
   mpfr_printf("c = %.10Rf\n",c);
   mpfr_clear(a); mpfr_clear(b); mpfr_clear(c);
   return 0;
 }

Troubleshooting:
 Command: gcc -I/usr/local/include -L/usr/local/lib test.c -lmpfr -lgmp -o test
 Expected: Link success; if undefined reference to mpfr_init, verify -lmpfr placed after source files
 Check version: mpfr_version_str() returns "4.x.x"

Best Practices:
 Always clear mpfr variables
 Check return flags on arithmetic for inexact/overflow
 Use consistent rounding mode across all operations
 Preallocate precision with mpfr_init2 to avoid reallocations

## Information Dense Extract
mpfr_init2(x,prec) allocates x with prec bits. mpfr_clear(x) frees. mpfr_prec_t=ulong; default prec=53. Rounding: MPFR_RNDN=0, RNDZ=1, RNDU=2, RNDD=3, RNDA=4. Basic ops prototypes: int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd) returns flags bitmask INEXACT=1,UNDERFLOW=2,OVERFLOW=4,NAN=8. Comparisons: mpfr_cmp,equal_p,nan_p. Conversion: mpfr_set_d(mpfr_t,double,rnd), mpfr_get_d(const mpfr_t,rnd). I/O: mpfr_printf,mpfr_fprintf,mpfr_scanf. Flags: mpfr_get_flags(),mpfr_clear_flags(). Link: -lmpfr -lgmp. Configure: --with-gmp=PATH --enable-thread-safe --disable-static. Example code and troubleshooting steps included.

## Sanitised Extract
Table of Contents
 1 Initialization and Memory Management
 2 Precision and Rounding Modes
 3 Basic Arithmetic Functions
 4 Comparison and Special Functions
 5 I/O and Conversion
 6 Error Handling and Flags
 7 Thread Safety and Build Configuration

1 Initialization and Memory Management
 mpfr_init(mpfr_t x): allocate x with default precision
 mpfr_init2(mpfr_t x, mpfr_prec_t prec): allocate x with prec bits precision
 mpfr_init_set_str(mpfr_t x, const char *str, int base, mpfr_rnd_t rnd): parse str in base, set x
 mpfr_clear(mpfr_t x): free memory used by x

2 Precision and Rounding Modes
 mpfr_prec_t = unsigned long
 Default precision = 53 bits
 mpfr_rnd_t constants:
   MPFR_RNDN = 0
   MPFR_RNDZ = 1
   MPFR_RNDU = 2
   MPFR_RNDD = 3
   MPFR_RNDA = 4

3 Basic Arithmetic Functions
 int mpfr_add(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_sub(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_mul(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 int mpfr_div(mpfr_t rop,const mpfr_t op1,const mpfr_t op2,mpfr_rnd_t rnd)
 Returns bitmask of flags: INEXACT=1, UNDERFLOW=2, OVERFLOW=4, NAN=8

4 Comparison and Special Functions
 int mpfr_cmp(const mpfr_t op1,const mpfr_t op2)
 int mpfr_equal_p(const mpfr_t op1,const mpfr_t op2)
 int mpfr_nan_p(const mpfr_t x)

5 I/O and Conversion
 int mpfr_set_d(mpfr_t rop,double d,mpfr_rnd_t rnd)
 double mpfr_get_d(const mpfr_t op,mpfr_rnd_t rnd)
 int mpfr_printf(const char *format,...)
 int mpfr_fprintf(FILE *stream,const char *format,...)
 int mpfr_scanf(const char *format,...)

6 Error Handling and Flags
 unsigned long mpfr_get_flags(void)
 void mpfr_clear_flags(void)

7 Thread Safety and Build Configuration
 Configure:
   --with-gmp=/path --enable-thread-safe --disable-static
 Compiler:
   -I/path/mpfr/include -L/path/mpfr/lib -lmpfr -lgmp

## Original Source
GMP & MPFR Manuals
https://www.mpfr.org/mpfr-current/manual.html

## Digest of MPFR_MANUAL

# Initialization and Memory Management

mpfr_init     (mpfr_t x)
mpfr_init2    (mpfr_t x, mpfr_prec_t prec)
mpfr_init_set (mpfr_t x, unsigned long z, mpfr_rnd_t rnd)
mpfr_clear    (mpfr_t x)

# Precision and Rounding Modes

Type: mpfr_prec_t = unsigned long
Default precision: 53 bits
Rounding mode constants:
  MPFR_RNDN  = round to nearest, ties to even
  MPFR_RNDZ  = round toward zero
  MPFR_RNDU  = round toward +inf
  MPFR_RNDD  = round toward -inf
  MPFR_RNDA  = round away from zero

# Basic Arithmetic Functions

int mpfr_add (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_sub (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_mul (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
int mpfr_div (mpfr_t rop, const mpfr_t op1, const mpfr_t op2, mpfr_rnd_t rnd)
Return value: bitwise OR of flags: MPFR_FLAG_INEXACT, MPFR_FLAG_UNDERFLOW, MPFR_FLAG_OVERFLOW, MPFR_FLAG_NAN

# Comparison and Special Functions

int mpfr_cmp      (const mpfr_t op1, const mpfr_t op2)
int mpfr_equal_p (const mpfr_t op1, const mpfr_t op2)
int mpfr_nan_p   (const mpfr_t x)

# I/O and Conversion

int    mpfr_set_d    (mpfr_t rop, double d, mpfr_rnd_t rnd)
double mpfr_get_d    (const mpfr_t op, mpfr_rnd_t rnd)
int    mpfr_printf   (const char *format, ...)
int    mpfr_fprintf  (FILE *stream, const char *format, ...)
int    mpfr_scanf    (const char *format, ...)

# Error Handling and Flags

unsigned long mpfr_get_flags  (void)
void          mpfr_clear_flags(void)

# Thread Safety and Build Configuration

Configure options:
  ./configure --with-gmp=/path/to/gmp --enable-thread-safe --disable-static
Compiler flags:
  -I/path/to/mpfr/include -L/path/to/mpfr/lib -lmpfr -lgmp



## Attribution
- Source: GMP & MPFR Manuals
- URL: https://www.mpfr.org/mpfr-current/manual.html
- License: License: GNU LGPL v3
- Crawl Date: 2025-05-09T23:34:24.977Z
- Data Size: 0 bytes
- Links Found: 0

## Retrieved
2025-05-09
