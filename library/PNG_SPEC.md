# PNG_SPEC

## Crawl Summary
PNG datastream begins with 8-byte signature 89 50 4E 47 0D 0A 1A 0A. Followed by chunks: Length(4-byte uint), Type(4 ASCII), Data(N bytes), CRC(4-byte, IEEE 802.3). IHDR must be first: Width(4),Height(4),BitDepth(1:{1,2,4,8,16}),ColorType(1:{0,2,3,4,6}),Compression=0,Filter=0,Interlace={0,1}. ColorType maps to sample depths. Encode pipeline: reference transformations, interlace, scanline, filter, DEFLATE, chunk, assemble. Filter types 0–4. Adam7 interlace offsets and strides defined. APNG adds acTL, fcTL, fdAT with 4-byte sequence numbers. Critical chunk types: IHDR,PLTE,IDAT,IEND. Ancillary chunks: tRNS,cHRM,gAMA,iCCP,sBIT,sRGB,cICP,mDCV,cLLI,tEXt,zTXt,iTXt,bKGD,hIST,pHYs,sPLT,eXIf,tIME,acTL,fcTL,fdAT.

## Normalised Extract
Table of Contents:
1. PNG Signature
2. Chunk Layout
3. IHDR Chunk Structure
4. Palette (PLTE)
5. Image Data (IDAT)
6. End Chunk (IEND)
7. Color Types & Bit Depths
8. Reference Image → PNG Transformations
9. Interlace Methods (None, Adam7)
10. Filtering Algorithms
11. Compression Method
12. APNG Frame Control

1. PNG Signature
 - Bytes: 89 50 4E 47 0D 0A 1A 0A

2. Chunk Layout
 - Length:  4-byte unsigned
 - Type:    4 ASCII (A-Z,a-z)
 - Data:    Length bytes
 - CRC:     4-byte IEEE 802.3 CRC over Type+Data

3. IHDR Chunk Structure
 - Width:    4-byte uint (1–2^31-1)
 - Height:   4-byte uint (1–2^31-1)
 - BitDepth: 1 byte {1,2,4,8,16}
 - ColorType:1 byte {0,2,3,4,6}
 - CompMeth: 1 byte = 0
 - Filter:   1 byte = 0
 - Interlace:1 byte {0,1}

4. PLTE (Palette)
 - Length: multiple of 3 bytes
 - Entries: 3-byte R,G,B each
 - Max entries: 2^BitDepth

5. IDAT (Image Data)
 - Contains DEFLATE-compressed filtered scanlines
 - Multiple IDAT concatenated

6. IEND (End)
 - Length: 0
 - Marks end of PNG datastream

7. Color Types & Bit Depths
 - 0: Gray {1,2,4,8,16}
 - 2: RGB {8,16}
 - 3: Indexed {1,2,4,8}
 - 4: Gray+Alpha {8,16}
 - 6: RGB+Alpha {8,16}

8. Reference → PNG
 - Alpha Separation (drop full-alpha)  
 - Indexing (≤256 colors)  
 - RGB Merge (R=G=B to gray)  
 - Alpha Compaction (single transparent color)  
 - Sample Depth Scale (map to supported depths)

9. Interlace Methods
 - 0: None (sequential)  
 - 1: Adam7 passes with offsets/strides:
   Pass1(0,0,8,8),2(4,0,8,8),3(0,4,4,8),4(2,0,4,4),5(0,2,2,4),6(1,0,2,2),7(0,1,1,2)

10. Filtering
 - Types: 0=None, 1=Sub, 2=Up, 3=Average, 4=Paeth

11. Compression
 - Method 0 (deflate)

12. APNG Frame Control
 - acTL before first IDAT: totalFrames:uint32, loops:uint32
 - fcTL for each frame: seq:uint32,width:uint32,height:uint32,x:uint32,y:uint32,delayNum:uint16,delayDen:uint16,disposeOp:uint8,blendOp:uint8
 - fdAT: seq:uint32 + image data identical to IDAT


## Supplementary Details
Color Type Codes: 0,2,3,4,6. BitDepth→ Max Samples per pixel: see section 7. Interlace method=1 triggers pass extraction step 4.6.1. Filter row size = scanline length + 1 filter-type byte. Compression uses DEFLATE window=32K, no dictionary. CRC polynomial=0xEDB88320, initial value=0xFFFFFFFF, final XOR=0xFFFFFFFF. Chunk ordering: IHDR→(PLTE if required)→IDAT→IEND; ancillary may appear between IDATs. Public chunk naming: bit5 of first byte uppercase=critical, lowercase=ancillary; second byte uppercase=public, lowercase=private; third uppercase=res1, fourth uppercase=safe-to-copy if lowercase. Sample depth scaling: map n-bit to next supported using linear scale: v' = floor(v*(2^m-1)/(2^n-1)+0.5).

## Reference Details
IHDR API Structure Definition:
struct IHDR { uint32_t width; uint32_t height; uint8_t bit_depth; uint8_t color_type; uint8_t compression; uint8_t filter; uint8_t interlace; };
Validations:
 if width==0||width>0x7FFFFFFF error;
 if height==0||height>0x7FFFFFFF error;
 if bit_depth not in allowed[color_type] error;
 if compression!=0 error;
 if filter!=0 error;
 if interlace>1 error;

CRC Implementation (C):
uint32_t crc_table[256];
void init_crc() { for (uint32_t n=0; n<256; n++) { uint32_t c=n; for (int k=0; k<8; k++) c = (c&1)?0xEDB88320^(c>>1):(c>>1); crc_table[n]=c; }}
uint32_t update_crc(uint32_t crc,const uint8_t *buf,size_t len) { crc^=0xFFFFFFFF; for(size_t i=0;i<len;i++) crc=crc_table[(crc^buf[i])&0xFF]^(crc>>8); return crc^0xFFFFFFFF; }

Example: Writing PNG signature & IHDR:
uint8_t sig[8]={0x89,'P','N','G',0x0D,0x0A,0x1A,0x0A};
write(fd,sig,8);
struct IHDR hdr={width,height,8,6,0,0,0};
uint8_t buf[13]; pack_IHDR(&hdr,buf);
uint32_t crc = update_crc(0, (uint8_t*)"IHDR",4);
crc = update_crc(crc, buf,13);
write_chunk(fd,13,"IHDR",buf,crc);

Troubleshooting:
Command: pngcheck -v image.png
Expected: "OK" for each chunk, no CRC errors. CRC mismatch: re-run encoder with correct CRC implementation. Missing IHDR: abort decode. Invalid filter type: reject chunk.

## Information Dense Extract
Signature:89 50 4E 47 0D 0A 1A 0A; Chunk:Len4,Type4,DataN,CRC4; IHDR(13):width4,height4,bitDepth1{1,2,4,8,16},colorType1{0,2,3,4,6},comp0,flt0,interlace{0,1}; PLTE:3×entries,R,G,B; IDAT:deflate(filtered scanlines); IEND:null; ColorTypes→bitDepths; Encode:transforms→interlace→scanlines→filter(0–4)→compress→chunk; Interlace=Adam7 passes offsets/strides; Filter None,Sub,Up,Avg,Paeth; CRC poly=0xEDB88320; APNG:acTL(total,loops),fcTL(seq,w,h,x,y,dn,dd,disp,blend),fdAT(seq,data); ChunkNaming:1st-bit critical,2nd public,4th safe-copy; Scale v→floor(v*(2^m-1)/(2^n-1)+.5).

## Sanitised Extract
Table of Contents:
1. PNG Signature
2. Chunk Layout
3. IHDR Chunk Structure
4. Palette (PLTE)
5. Image Data (IDAT)
6. End Chunk (IEND)
7. Color Types & Bit Depths
8. Reference Image  PNG Transformations
9. Interlace Methods (None, Adam7)
10. Filtering Algorithms
11. Compression Method
12. APNG Frame Control

1. PNG Signature
 - Bytes: 89 50 4E 47 0D 0A 1A 0A

2. Chunk Layout
 - Length:  4-byte unsigned
 - Type:    4 ASCII (A-Z,a-z)
 - Data:    Length bytes
 - CRC:     4-byte IEEE 802.3 CRC over Type+Data

3. IHDR Chunk Structure
 - Width:    4-byte uint (12^31-1)
 - Height:   4-byte uint (12^31-1)
 - BitDepth: 1 byte {1,2,4,8,16}
 - ColorType:1 byte {0,2,3,4,6}
 - CompMeth: 1 byte = 0
 - Filter:   1 byte = 0
 - Interlace:1 byte {0,1}

4. PLTE (Palette)
 - Length: multiple of 3 bytes
 - Entries: 3-byte R,G,B each
 - Max entries: 2^BitDepth

5. IDAT (Image Data)
 - Contains DEFLATE-compressed filtered scanlines
 - Multiple IDAT concatenated

6. IEND (End)
 - Length: 0
 - Marks end of PNG datastream

7. Color Types & Bit Depths
 - 0: Gray {1,2,4,8,16}
 - 2: RGB {8,16}
 - 3: Indexed {1,2,4,8}
 - 4: Gray+Alpha {8,16}
 - 6: RGB+Alpha {8,16}

8. Reference  PNG
 - Alpha Separation (drop full-alpha)  
 - Indexing (256 colors)  
 - RGB Merge (R=G=B to gray)  
 - Alpha Compaction (single transparent color)  
 - Sample Depth Scale (map to supported depths)

9. Interlace Methods
 - 0: None (sequential)  
 - 1: Adam7 passes with offsets/strides:
   Pass1(0,0,8,8),2(4,0,8,8),3(0,4,4,8),4(2,0,4,4),5(0,2,2,4),6(1,0,2,2),7(0,1,1,2)

10. Filtering
 - Types: 0=None, 1=Sub, 2=Up, 3=Average, 4=Paeth

11. Compression
 - Method 0 (deflate)

12. APNG Frame Control
 - acTL before first IDAT: totalFrames:uint32, loops:uint32
 - fcTL for each frame: seq:uint32,width:uint32,height:uint32,x:uint32,y:uint32,delayNum:uint16,delayDen:uint16,disposeOp:uint8,blendOp:uint8
 - fdAT: seq:uint32 + image data identical to IDAT

## Original Source
PNG (Portable Network Graphics) Specification
https://www.w3.org/TR/PNG/

## Digest of PNG_SPEC

# PNG Signature

The first eight bytes of a PNG datastream are:
89 50 4E 47 0D 0A 1A 0A

# Datastream Structure

A PNG datastream consists of the signature followed by a sequence of chunks. Each chunk consists of:

• Length   : 4-byte unsigned integer (N)  
• Type     : 4 ASCII bytes (A–Z, a–z)  
• Data     : N bytes  
• CRC      : 4-byte CRC (IEEE 802.3 polynomial) over Type+Data

# Critical Chunks

## IHDR (Image Header)
Data length: 13 bytes  
Fields:
  • Width             : 4-byte uint (1 to 2^31–1)  
  • Height            : 4-byte uint (1 to 2^31–1)  
  • Bit depth         : 1 byte {1,2,4,8,16}  
  • Color type        : 1 byte {0=Grayscale,2=Truecolor,3=Indexed,4=Grayscale+Alpha,6=Truecolor+Alpha}  
  • Compression       : 1 byte = 0 (deflate/inflate)  
  • Filter            : 1 byte = 0 (adaptive)  
  • Interlace         : 1 byte {0=none,1=Adam7}

## PLTE (Palette)
Length: 3 × palette entries  
Entries: each 3 bytes (R,G,B). Valid only for color type 3. Must not exceed 2^bitdepth entries.

## IDAT (Image Data)
One or more IDAT chunks containing concatenated DEFLATE-compressed filtered scanlines.

## IEND (Image Trailer)
Length: 0 bytes, marks end of datastream.

# Color Types and Sample Depths

Color type codes and permitted bit depths:
  0: Grayscale        → {1,2,4,8,16}
  2: Truecolor        → {8,16}
  3: Indexed-color    → {1,2,4,8}
  4: Grayscale+Alpha  → {8,16}
  6: Truecolor+Alpha  → {8,16}

# Encoding Pipeline

1. Transform reference image:
   • Alpha separation (drop full-opacity channel)  
   • Indexing (if ≤256 colors, 8-bit max, optional alpha table)  
   • RGB merging (if R=G=B merges to gray)  
   • Alpha compaction (single transparent color mapping)  
   • Sample depth scaling (map to nearest supported bit depth)
2. Pass extraction (interlace: none or Adam7)  
3. Scanline serialization (left-to-right, top-to-bottom)  
4. Filtering (per-scanline using filter type 0–4)  
5. Compression (DEFLATE, method 0)  
6. Chunking (split compressed data into IDATs with CRCs)  
7. Prepend signature, append IEND

# Interlacing (Adam7)

Seven passes with offsets and strides:
  Pass 1: start (0,0), stride (8,8)
  Pass 2: start (4,0), stride (8,8)
  Pass 3: start (0,4), stride (4,8)
  Pass 4: start (2,0), stride (4,4)
  Pass 5: start (0,2), stride (2,4)
  Pass 6: start (1,0), stride (2,2)
  Pass 7: start (0,1), stride (1,2)

# Filtering

Filter types (one byte per scanline):
  0: None      
  1: Sub       
  2: Up        
  3: Average   
  4: Paeth     

# APNG (Animated PNG)

• acTL must precede first IDAT.  
• fcTL before each frame, fdAT carries frame data.  
• Sequence numbers: 4-byte uint starting at 0, increments per fcTL/fdAT no gaps.

# Design Goals

Portability, completeness, serial encode/decode, progressive display, robustness, losslessness, performance (fast decode), simplicity, interchangeability, flexibility, no patent restrictions.

Retrieved: 2024-06-14  
Data size: 14333008 bytes

## Attribution
- Source: PNG (Portable Network Graphics) Specification
- URL: https://www.w3.org/TR/PNG/
- License: License: W3C Software Notice and License
- Crawl Date: 2025-05-19T12:30:23.900Z
- Data Size: 14333008 bytes
- Links Found: 107656

## Retrieved
2025-05-19
