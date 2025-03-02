#!/usr/bin/env node

"use strict";

import { fileURLToPath } from "url";
import fs from "fs";
import readline from "readline";
import sharp from "sharp";

// Custom range function to generate a sequence of numbers
const range = (start, end, step = 1) => {
  const arr = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      arr.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      arr.push(i);
    }
  }
  return arr;
};

// Helper function to format numbers to two decimals and avoid negative zero
const formatNumber = (n) => {
  const s = n.toFixed(2);
  return s === "-0.00" ? "0.00" : s;
};

// New function: getSummary calculates min, max, and average for plot points
const getSummary = (points) => {
  if (!points || points.length === 0) return {};
  let minX = Infinity;
  let maxX = -Infinity;
  let sumX = 0;
  let minY = Infinity;
  let maxY = -Infinity;
  let sumY = 0;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
    sumX += p.x;
    sumY += p.y;
  }
  const avgX = sumX / points.length;
  const avgY = sumY / points.length;
  return {
    minX: formatNumber(minX),
    maxX: formatNumber(maxX),
    avgX: formatNumber(avgX),
    minY: formatNumber(minY),
    maxY: formatNumber(maxY),
    avgY: formatNumber(avgY),
  };
};

// Plotting Functions
const plotQuadraticParam = ({ a = 1, b = 0, c = 0, xMin = -10, xMax = 10, step = 1 } = {}) => {
  const points = range(xMin, xMax + step, step).map((x) => ({ x, y: a * x * x + b * x + c }));
  return points;
};

const plotSineParam = ({ amplitude = 1, frequency = 1, phase = 0, xMin = 0, xMax = 360, step = 10 } = {}) => {
  const points = range(xMin, xMax + step, step).map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: deg, y: amplitude * Math.sin(frequency * rad + phase) };
  });
  return points;
};

const plotCosineParam = ({ amplitude = 1, frequency = 1, phase = 0, xMin = 0, xMax = 360, step = 10 } = {}) => {
  const points = range(xMin, xMax + step, step).map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: deg, y: amplitude * Math.cos(frequency * rad + phase) };
  });
  return points;
};

const plotPolarParam = ({ scale = 200, multiplier = 2, step = 5, degMin = 0, degMax = 360 } = {}) => {
  const points = range(degMin, degMax + step, step).map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const r = scale * Math.abs(Math.sin(multiplier * rad));
    return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
  });
  return points;
};

const plotLinearParam = ({ m = 1, b = 0, xMin = -10, xMax = 10, step = 1 } = {}) => {
  const points = range(xMin, xMax + step, step).map((x) => ({ x, y: m * x + b }));
  return points;
};

const plotExponentialParam = ({ a = 1, b = 1, xMin = -10, xMax = 10, step = 1 } = {}) => {
  const points = range(xMin, xMax + step, step).map((x) => ({ x, y: a * Math.exp(b * x) }));
  return points;
};

const plotLogarithmicParam = ({ a = 1, base = Math.E, xMin = 1, xMax = 10, step = 1 } = {}) => {
  const points = range(xMin, xMax + step, step).reduce((arr, x) => {
    if (x > 0) arr.push({ x, y: a * (Math.log(x) / Math.log(base)) });
    return arr;
  }, []);
  return points;
};

// Backward compatible wrappers
const plotQuadratic = () => plotQuadraticParam();
const plotSine = () => plotSineParam();
const plotCosine = () => plotCosineParam();
const plotPolar = () => plotPolarParam();
// Changed default linear plot to use y = 2x + 3 for better demonstration
const plotLinear = () => plotLinearParam({ m: 2, b: 3 });
const plotExponential = () => plotExponentialParam();
const plotLogarithmic = () => plotLogarithmicParam();

// Formula Parsing Functions
const parseQuadratic = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid quadratic formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const [a, b, c, xMin, xMax, step] = params;
  return plotQuadraticParam({
    a: isNaN(a) ? 1 : a,
    b: isNaN(b) ? 0 : b,
    c: isNaN(c) ? 0 : c,
    xMin: isNaN(xMin) ? -10 : xMin,
    xMax: isNaN(xMax) ? 10 : xMax,
    step: isNaN(step) ? 1 : step,
  });
};

// Updated parseSine to require exactly 6 valid numeric parameters
const parseSine = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2 || !parts[1].trim()) {
    throw new Error("Invalid sine formula string: " + formulaStr);
  }
  const rawParams = parts[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const params = rawParams.map(Number);
  if (params.length !== 6 || params.some((p) => isNaN(p))) {
    throw new Error("Invalid sine formula string: " + formulaStr);
  }
  const [amplitude, frequency, phase, xMin, xMax, step] = params;
  return plotSineParam({ amplitude, frequency, phase, xMin, xMax, step });
};

const parseCosine = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid cosine formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const [amplitude, frequency, phase, xMin, xMax, step] = params;
  return plotCosineParam({
    amplitude: isNaN(amplitude) ? 1 : amplitude,
    frequency: isNaN(frequency) ? 1 : frequency,
    phase: isNaN(phase) ? 0 : phase,
    xMin: isNaN(xMin) ? 0 : xMin,
    xMax: isNaN(xMax) ? 360 : xMax,
    step: isNaN(step) ? 10 : step,
  });
};

const parsePolar = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid polar formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const scale = isNaN(params[0]) ? 200 : params[0];
  const multiplier = isNaN(params[1]) ? 2 : params[1];
  const step = params.length >= 3 ? (isNaN(params[2]) ? 5 : params[2]) : 5;
  const degMin = params.length >= 5 ? (isNaN(params[3]) ? 0 : params[3]) : 0;
  const degMax = params.length >= 5 ? (isNaN(params[4]) ? 360 : params[4]) : 360;
  return plotPolarParam({ scale, multiplier, step, degMin, degMax });
};

const parseLinear = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid linear formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const [m, b, xMin, xMax, step] = params;
  return plotLinearParam({
    m: isNaN(m) ? 1 : m,
    b: isNaN(b) ? 0 : b,
    xMin: isNaN(xMin) ? -10 : xMin,
    xMax: isNaN(xMax) ? 10 : xMax,
    step: isNaN(step) ? 1 : step,
  });
};

// Parse a generic linear formula in algebraic form, e.g., "y=2x+3" with optional range parameters
const parseGenericLinear = (formulaStr) => {
  const parts = formulaStr.split(":");
  const exprPart = parts[0].replace(/\s+/g, "");
  const rangePart = parts.length > 1 ? parts[1].trim() : "";
  if (!exprPart.toLowerCase().startsWith("y=")) {
    throw new Error("Linear formula must start with 'y=': " + formulaStr);
  }
  const expr = exprPart.substring(2);
  if (expr.includes("x^2")) {
    throw new Error("Detected quadratic term in what should be a linear formula: " + formulaStr);
  }
  let m = 1;
  let b = 0;
  const mMatch = expr.match(/^([+-]?\d*\.?\d+)?\*?x/);
  if (mMatch) {
    m = mMatch[1] === "" || mMatch[1] === undefined ? 1 : parseFloat(mMatch[1]);
  }
  const bMatch = expr.match(/([+-]\d*\.?\d+)(?!\*?x)/);
  if (bMatch) {
    b = parseFloat(bMatch[1]);
  }
  let xMin = -10;
  let xMax = 10;
  let step = 1;
  if (rangePart) {
    const rangeParams = rangePart.split(",").map(Number);
    if (rangeParams.length > 0 && !isNaN(rangeParams[0])) xMin = rangeParams[0];
    if (rangeParams.length > 1 && !isNaN(rangeParams[1])) xMax = rangeParams[1];
    if (rangeParams.length > 2 && !isNaN(rangeParams[2])) step = rangeParams[2];
  }
  return plotLinearParam({ m, b, xMin, xMax, step });
};

// Parse a generic quadratic formula in standard algebraic form with optional range
const parseGenericQuadratic = (formulaStr) => {
  const parts = formulaStr.split(":");
  const mainPart = parts[0].replace(/\s+/g, "").toLowerCase();
  const rangePart = parts.length > 1 ? parts[1].trim() : "";
  let xMin = -10;
  let xMax = 10;
  let step = 1;
  if (rangePart) {
    const rangeParams = rangePart.split(",").map(Number);
    if (rangeParams.length > 0 && !isNaN(rangeParams[0])) xMin = rangeParams[0];
    if (rangeParams.length > 1 && !isNaN(rangeParams[1])) xMax = rangeParams[1];
    if (rangeParams.length > 2 && !isNaN(rangeParams[2])) step = rangeParams[2];
  }

  if (mainPart.startsWith("y=")) {
    const yExpr = mainPart.substring(2);
    const coeffs = extractQuadraticCoefficients(yExpr);
    return plotQuadraticParam({ ...coeffs, xMin, xMax, step });
  } else if (mainPart.endsWith("=0")) {
    const left = mainPart.split("=")[0];
    const yRegex = /([+-]?(?:\d*\.?\d*)?)y/;
    const yMatch = left.match(yRegex);
    if (!yMatch) throw new Error("No y term found in equation: " + formulaStr);
    const coeffStr = yMatch[1];
    const yCoeff = coeffStr === "" || coeffStr === "+" ? 1 : coeffStr === "-" ? -1 : parseFloat(coeffStr);
    const remaining = left.replace(yRegex, "");
    const cleanedRemaining = remaining.replace(/^\+/, "");
    const coeffs = extractQuadraticCoefficients(cleanedRemaining);
    return plotQuadraticParam({
      a: -coeffs.a / yCoeff,
      b: -coeffs.b / yCoeff,
      c: -coeffs.c / yCoeff,
      xMin,
      xMax,
      step,
    });
  } else {
    const partsEq = mainPart.split("=");
    if (partsEq.length !== 2) throw new Error("Unsupported formula format for quadratic parsing: " + formulaStr);
    const left = partsEq[0];
    const right = partsEq[1] || "0";
    if (left.includes("y")) {
      const yMatch = left.match(/([+-]?\d*\.?\d*)y/);
      let yCoeff = 1;
      if (yMatch) {
        const coeffStr = yMatch[1];
        if (coeffStr === "" || coeffStr === "+") yCoeff = 1;
        else if (coeffStr === "-") yCoeff = -1;
        else yCoeff = parseFloat(coeffStr);
      }
      const remaining = left.replace(/([+-]?\d*\.?\d*)y/, "");
      const constantRight = parseFloat(right) || 0;
      const coeffs = extractQuadraticCoefficients(remaining);
      return plotQuadraticParam({
        a: -coeffs.a / yCoeff,
        b: -coeffs.b / yCoeff,
        c: (constantRight - coeffs.c) / yCoeff,
        xMin,
        xMax,
        step,
      });
    } else if (right.includes("y")) {
      const yMatch = right.match(/([+-]?\d*\.?\d*)y/);
      let yCoeff = 1;
      if (yMatch) {
        const coeffStr = yMatch[1];
        if (coeffStr === "" || coeffStr === "+") yCoeff = 1;
        else if (coeffStr === "-") yCoeff = -1;
        else yCoeff = parseFloat(coeffStr);
      }
      const remaining = right.replace(/([+-]?\d*\.?\d*)y/, "");
      const constantLeft = parseFloat(left) || 0;
      const coeffs = extractQuadraticCoefficients(remaining);
      return plotQuadraticParam({
        a: -coeffs.a / yCoeff,
        b: -coeffs.b / yCoeff,
        c: (constantLeft - coeffs.c) / yCoeff,
        xMin,
        xMax,
        step,
      });
    } else {
      const nonYPart = left;
      const newExpr = (right || "0") + invertExpression(nonYPart);
      return plotQuadraticParam({ ...extractQuadraticCoefficients(newExpr), xMin, xMax, step });
    }
  }
};

// Parse exponential formula string in the format "exponential:a,b,xMin,xMax,step" or "exp:a,b,xMin,xMax,step" or in algebraic form
const parseExponential = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid exponential formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const [a, b, xMin, xMax, step] = params;
  return plotExponentialParam({
    a: isNaN(a) ? 1 : a,
    b: isNaN(b) ? 1 : b,
    xMin: isNaN(xMin) ? -10 : xMin,
    xMax: isNaN(xMax) ? 10 : xMax,
    step: isNaN(step) ? 1 : step,
  });
};

// Parse a generic exponential formula in algebraic form, e.g., "y=2*e^(0.5x)" optionally with range
const parseGenericExponential = (formulaStr) => {
  const parts = formulaStr.split(":");
  const exprPart = parts[0].replace(/\s+/g, "");
  const rangePart = parts.length > 1 ? parts[1].trim() : "";
  let xMin = -10;
  let xMax = 10;
  let step = 1;
  if (rangePart) {
    const rangeParams = rangePart.split(",").map(Number);
    if (rangeParams.length > 0 && !isNaN(rangeParams[0])) xMin = rangeParams[0];
    if (rangeParams.length > 1 && !isNaN(rangeParams[1])) xMax = rangeParams[1];
    if (rangeParams.length > 2 && !isNaN(rangeParams[2])) step = rangeParams[2];
  }
  const regex = /^y=([+-]?\d*\.?\d+)?\*?e\^\(?([+-]?\d*\.?\d+)(?:\*?x)\)?/i;
  const match = exprPart.match(regex);
  if (match) {
    const a = match[1] ? parseFloat(match[1]) : 1;
    const b = parseFloat(match[2]);
    return plotExponentialParam({ a, b, xMin, xMax, step });
  } else {
    throw new Error("Invalid generic exponential formula string: " + formulaStr);
  }
};

// Parse logarithmic formula string in the format "log:a,base,xMin,xMax,step" or "ln:a,base,xMin,xMax,step"
const parseLogarithmic = (formulaStr) => {
  const parts = formulaStr.split(":");
  if (parts.length < 2) throw new Error("Invalid logarithmic formula string: " + formulaStr);
  const params = parts[1].split(",").map(Number);
  const [a, base, xMin, xMax, step] = params;
  return plotLogarithmicParam({
    a: isNaN(a) ? 1 : a,
    base: isNaN(base) ? Math.E : base,
    xMin: isNaN(xMin) ? 1 : xMin,
    xMax: isNaN(xMax) ? 10 : xMax,
    step: isNaN(step) ? 1 : step,
  });
};

// Extract quadratic coefficients from an expression of form ax^2+bx+c
const extractQuadraticCoefficients = (expr) => {
  let cleanedExpr = expr.replace(/\s+/g, "").replace(/\+\-/g, "-");
  let a = 0;
  let b = 0;
  let c = 0;
  const aMatch = cleanedExpr.match(/([+-]?\d*\.?\d*)x\^2/);
  if (aMatch) {
    const coeff = aMatch[1];
    a = coeff === "" || coeff === "+" ? 1 : coeff === "-" ? -1 : parseFloat(coeff);
    cleanedExpr = cleanedExpr.replace(aMatch[0], "");
  }
  const bMatch = cleanedExpr.match(/([+-]?\d*\.?\d+)x(?!\^)/);
  if (bMatch) {
    const coeff = bMatch[1];
    b = coeff === "" || coeff === "+" ? 1 : coeff === "-" ? -1 : parseFloat(coeff);
    cleanedExpr = cleanedExpr.replace(bMatch[0], "");
  }
  const constantMatches = cleanedExpr.match(/([+-]?\d*\.?\d+)/g);
  if (constantMatches) {
    c = constantMatches.reduce((sum, numStr) => sum + parseFloat(numStr), 0);
  }
  return { a, b, c };
};

// Helper function to invert an algebraic expression consisting of additions and subtractions
const invertExpression = (expr) => {
  const tokens = expr.match(/[+-]?[^+-]+/g) || [];
  const inverted = tokens
    .map((token) => {
      token = token.trim();
      return token.startsWith("-") ? "+" + token.slice(1) : "-" + token;
    })
    .join("");
  return inverted[0] === "+" ? inverted.slice(1) : inverted;
};

// Delegate plotting based on formula string content
const plotFromString = (formulaStr) => {
  // Trim formula string to improve consistency
  formulaStr = formulaStr.trim();
  const lowerStr = formulaStr.toLowerCase();
  if (lowerStr.startsWith("y=")) {
    if (formulaStr.toLowerCase().includes("e^")) {
      try {
        return parseGenericExponential(formulaStr);
      } catch (e) {
        console.error("Error parsing exponential formula: " + e.message);
        return [];
      }
    } else if (formulaStr.toLowerCase().includes("log(")) {
      try {
        return parseLogarithmic(formulaStr);
      } catch (e) {
        console.error("Error parsing logarithmic formula: " + e.message);
        return [];
      }
    } else if (!formulaStr.includes("x^2")) {
      try {
        return parseGenericLinear(formulaStr);
      } catch (e) {
        console.error("Error parsing linear formula: " + e.message);
        return [];
      }
    } else {
      try {
        return parseGenericQuadratic(formulaStr);
      } catch (e) {
        console.error("Error parsing generic quadratic formula: " + e.message);
        return [];
      }
    }
  } else if (formulaStr.includes(":")) {
    if (lowerStr.startsWith("log:") || lowerStr.startsWith("ln:")) return parseLogarithmic(formulaStr);
    if (lowerStr.startsWith("quadratic:") || lowerStr.startsWith("quad:")) return parseQuadratic(formulaStr);
    if (lowerStr.startsWith("sine:")) return parseSine(formulaStr);
    if (lowerStr.startsWith("cosine:") || lowerStr.startsWith("cos:")) return parseCosine(formulaStr);
    if (lowerStr.startsWith("polar:")) return parsePolar(formulaStr);
    if (lowerStr.startsWith("linear:")) return parseLinear(formulaStr);
    if (lowerStr.startsWith("exponential:") || lowerStr.startsWith("exp:")) return parseExponential(formulaStr);
    console.error("Unknown prefixed formula type for formula: " + formulaStr);
    return [];
  } else if (formulaStr.includes("=")) {
    try {
      return parseGenericQuadratic(formulaStr);
    } catch (e) {
      console.error("Error parsing generic quadratic formula: " + e.message);
      return [];
    }
  } else {
    console.error("Formula string is not in a recognized format: " + formulaStr);
    return [];
  }
};

// Helper function to parse formulas and return plots grouped by type
const getPlotsFromFormulas = (formulas = []) => {
  const quadratic = [];
  const sine = [];
  const cosine = [];
  const polar = [];
  const linear = [];
  const exponential = [];
  const logarithmic = [];
  formulas.forEach((formula) => {
    const lower = formula.toLowerCase();
    try {
      if (
        lower.startsWith("quad:") ||
        lower.startsWith("quadratic:") ||
        (formula.includes("x^2") && formula.includes("="))
      ) {
        quadratic.push(plotFromString(formula));
      } else if (lower.startsWith("sine:")) {
        sine.push(plotFromString(formula));
      } else if (lower.startsWith("cosine:") || lower.startsWith("cos:")) {
        cosine.push(parseCosine(formula));
      } else if (lower.startsWith("polar:")) {
        polar.push(plotFromString(formula));
      } else if (
        lower.startsWith("linear:") ||
        (lower.startsWith("y=") &&
          !formula.includes("x^2") &&
          !formula.toLowerCase().includes("e^") &&
          !formula.toLowerCase().includes("log("))
      ) {
        linear.push(plotFromString(formula));
      } else if (
        lower.startsWith("exponential:") ||
        lower.startsWith("exp:") ||
        (lower.startsWith("y=") && formula.toLowerCase().includes("e^"))
      ) {
        exponential.push(plotFromString(formula));
      } else if (
        lower.startsWith("log:") ||
        lower.startsWith("ln:") ||
        (lower.startsWith("y=") && formula.toLowerCase().includes("log("))
      ) {
        logarithmic.push(plotFromString(formula));
      } else {
        console.error("Unrecognized formula: " + formula);
      }
    } catch (e) {
      console.error("Error parsing formula: " + formula + ". " + e.message);
    }
  });
  // Use defaults if no formulas were provided
  if (quadratic.length === 0) quadratic.push(plotQuadratic());
  if (linear.length === 0) linear.push(plotLinear());
  if (sine.length === 0) sine.push(plotSine());
  if (cosine.length === 0) cosine.push(plotCosine());
  if (polar.length === 0) polar.push(plotPolar());
  if (exponential.length === 0) exponential.push(plotExponential());
  if (logarithmic.length === 0) logarithmic.push(plotLogarithmic());
  return { quadratic, linear, sine, cosine, polar, exponential, logarithmic };
};

// Display Functions
const displayPlot = (plotName, points) => {
  console.log(`Plot for ${plotName}:`);
  console.log(points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "));
};

// SVG Generation Function with rotation support and custom title
const generateSvg = (
  quadraticPlots,
  linearPlots,
  sinePlots,
  cosinePlots,
  polarPlots,
  exponentialPlots,
  logarithmicPlots,
  gridEnabled = false,
  dealersChoice = false,
  rotate = 0,
  customTitle = "",
) => {
  const width = 800;
  const height = 1700;
  let svg = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  svg += `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">\n`;
  svg += `  <rect width="100%" height="100%" fill="white" />\n`;
  if (customTitle) {
    svg += `  <title>${customTitle}</title>\n`;
  }
  // If rotation is requested, wrap the content in a group with a rotate transform
  if (rotate !== 0) {
    svg += `  <g transform="rotate(${formatNumber(rotate)}, ${formatNumber(width / 2)}, ${formatNumber(height / 2)})">\n`;
  }

  const randomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777216)
      .toString(16)
      .padStart(6, "0");
  const generateUniqueColors = (n) => {
    const colors = new Set();
    while (colors.size < n) {
      colors.add(randomColor());
    }
    return Array.from(colors);
  };

  let quadraticColors;
  let linearColors;
  let sineColors;
  let cosineColors;
  let polarColors;
  let exponentialColors;
  let logarithmicColors;
  if (dealersChoice) {
    quadraticColors = generateUniqueColors(quadraticPlots.length);
    linearColors = generateUniqueColors(linearPlots.length);
    sineColors = generateUniqueColors(sinePlots.length);
    cosineColors = generateUniqueColors(cosinePlots.length);
    polarColors = generateUniqueColors(polarPlots.length);
    exponentialColors = generateUniqueColors(exponentialPlots.length);
    logarithmicColors = generateUniqueColors(logarithmicPlots.length);
  } else {
    quadraticColors = ["blue", "darkblue", "purple", "royalblue", "deepskyblue"];
    linearColors = ["orange", "darkorange", "gold", "chocolate", "peru"];
    sineColors = ["red", "darkred", "crimson", "firebrick", "tomato"];
    cosineColors = ["teal", "darkcyan", "cadetblue", "lightseagreen", "mediumturquoise"];
    polarColors = ["green", "darkgreen", "limegreen", "seagreen", "forestgreen"];
    exponentialColors = ["magenta", "darkmagenta", "violet", "indigo", "purple"];
    logarithmicColors = ["brown", "saddlebrown", "peru", "chocolate", "tan"];
  }

  const drawRectGrid = (x, y, w, h, vCount, hCount) => {
    let grid = "";
    range(0, vCount + 1, 1).forEach((i) => {
      const gx = x + i * (w / vCount);
      grid += `  <line x1="${formatNumber(gx)}" y1="${formatNumber(y)}" x2="${formatNumber(gx)}" y2="${formatNumber(y + h)}" stroke="#eee" stroke-width="1" />\n`;
    });
    range(0, hCount + 1, 1).forEach((i) => {
      const gy = y + i * (h / hCount);
      grid += `  <line x1="${formatNumber(x)}" y1="${formatNumber(gy)}" x2="${formatNumber(x + w)}" y2="${formatNumber(gy)}" stroke="#eee" stroke-width="1" />\n`;
    });
    return grid;
  };

  const drawRectAxes = (x, y, w, h, minX, maxX, minY, maxY) => {
    let axes = "";
    if (0 >= minY && 0 <= maxY) {
      const zeroY = y + h - ((0 - minY) / (maxY - minY)) * h;
      axes += `  <line x1="${formatNumber(x)}" y1="${formatNumber(zeroY)}" x2="${formatNumber(x + w)}" y2="${formatNumber(zeroY)}" stroke="black" stroke-width="1" />\n`;
    }
    if (0 >= minX && 0 <= maxX) {
      const zeroX = x + ((0 - minX) / (maxX - minX)) * w;
      axes += `  <line x1="${formatNumber(zeroX)}" y1="${formatNumber(y)}" x2="${formatNumber(zeroX)}" y2="${formatNumber(y + h)}" stroke="black" stroke-width="1" />\n`;
    }
    return axes;
  };

  // Quadratic Plot
  svg += `  <text x="${width / 2}" y="30" font-size="16" text-anchor="middle">Quadratic Plot: y = ax² + bx + c</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 50, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      50,
      700,
      180,
      Math.min(...quadraticPlots.flat().map((p) => p.x)),
      Math.max(...quadraticPlots.flat().map((p) => p.x)),
      Math.min(...quadraticPlots.flat().map((p) => p.y)),
      Math.max(...quadraticPlots.flat().map((p) => p.y)),
    );
  }
  const qAllPoints = quadraticPlots.flat();
  const qValues = qAllPoints.map((p) => p.y);
  let qMinY = Math.min(...qValues);
  let qMaxY = Math.max(...qValues);
  if (qMinY === qMaxY) {
    qMinY -= 10;
    qMaxY += 10;
  }
  const qAllX = qAllPoints.map((p) => p.x);
  let qMinX = Math.min(...qAllX);
  let qMaxX = Math.max(...qAllX);
  if (qMinX === qMaxX) {
    qMinX -= 10;
    qMaxX += 10;
  }
  quadraticPlots.forEach((points, idx) => {
    const color = quadraticColors[idx % quadraticColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - qMinX) / (qMaxX - qMinX)) * 700;
        const py = 230 - ((p.y - qMinY) / (qMaxY - qMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Linear Plot
  svg += `  <text x="${width / 2}" y="250" font-size="16" text-anchor="middle">Linear Plot: y = m*x + b</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 270, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      270,
      700,
      180,
      Math.min(...linearPlots.flat().map((p) => p.x)),
      Math.max(...linearPlots.flat().map((p) => p.x)),
      Math.min(...linearPlots.flat().map((p) => p.y)),
      Math.max(...linearPlots.flat().map((p) => p.y)),
    );
  }
  const lAllPoints = linearPlots.flat();
  const lValues = lAllPoints.map((p) => p.y);
  let lMinY = Math.min(...lValues);
  let lMaxY = Math.max(...lValues);
  if (lMinY === lMaxY) {
    lMinY -= 10;
    lMaxY += 10;
  }
  const lAllX = lAllPoints.map((p) => p.x);
  let lMinX = Math.min(...lAllX);
  let lMaxX = Math.max(...lAllX);
  if (lMinX === lMaxX) {
    lMinX -= 10;
    lMaxX += 10;
  }
  linearPlots.forEach((points, idx) => {
    const color = linearColors[idx % linearColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - lMinX) / (lMaxX - lMinX)) * 700;
        const py = 450 - ((p.y - lMinY) / (lMaxY - lMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Sine Plot
  svg += `  <text x="${width / 2}" y="470" font-size="16" text-anchor="middle">Sine Plot: y = A*sin(B*x + C)</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 490, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      490,
      700,
      180,
      Math.min(...sinePlots.flat().map((p) => p.x)),
      Math.max(...sinePlots.flat().map((p) => p.x)),
      Math.min(...sinePlots.flat().map((p) => p.y)),
      Math.max(...sinePlots.flat().map((p) => p.y)),
    );
  }
  const sAllPoints = sinePlots.flat();
  const sValues = sAllPoints.map((p) => p.y);
  let sMinY = Math.min(...sValues);
  let sMaxY = Math.max(...sValues);
  if (sMinY === sMaxY) {
    sMinY -= 1;
    sMaxY += 1;
  }
  const sAllX = sAllPoints.map((p) => p.x);
  let sMinX = Math.min(...sAllX);
  let sMaxX = Math.max(...sAllX);
  if (sMinX === sMaxX) {
    sMinX -= 10;
    sMaxX += 10;
  }
  sinePlots.forEach((points, idx) => {
    const color = sineColors[idx % sineColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - sMinX) / (sMaxX - sMinX)) * 700;
        const py = 670 - ((p.y - sMinY) / (sMaxY - sMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Cosine Plot
  svg += `  <text x="${width / 2}" y="690" font-size="16" text-anchor="middle">Cosine Plot: y = A*cos(B*x + C)</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 710, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      710,
      700,
      180,
      Math.min(...cosinePlots.flat().map((p) => p.x)),
      Math.max(...cosinePlots.flat().map((p) => p.x)),
      Math.min(...cosinePlots.flat().map((p) => p.y)),
      Math.max(...cosinePlots.flat().map((p) => p.y)),
    );
  }
  const cAllPoints = cosinePlots.flat();
  const cValues = cAllPoints.map((p) => p.y);
  let cMinY = Math.min(...cValues);
  let cMaxY = Math.max(...cValues);
  if (cMinY === cMaxY) {
    cMinY -= 1;
    cMaxY += 1;
  }
  const cAllX = cosinePlots.flat().map((p) => p.x);
  let cMinX = Math.min(...cAllX);
  let cMaxX = Math.max(...cAllX);
  if (cMinX === cMaxX) {
    cMinX -= 10;
    cMaxX += 10;
  }
  cosinePlots.forEach((points, idx) => {
    const color = cosineColors[idx % cosineColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - cMinX) / (cMaxX - cMinX)) * 700;
        const py = 890 - ((p.y - cMinY) / (cMaxY - cMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Polar Plot
  svg += `  <text x="${width / 2}" y="910" font-size="16" text-anchor="middle">Polar Plot: r = scale * |sin(multiplier * θ)|</text>\n`;
  const centerX = width / 2;
  const centerY = 970;
  if (gridEnabled) {
    [50, 100, 150].forEach((r) => {
      svg += `  <circle cx="${formatNumber(centerX)}" cy="${formatNumber(centerY)}" r="${r}" stroke="#eee" stroke-width="1" fill="none" />\n`;
    });
    svg += `  <line x1="${formatNumber(centerX - 150)}" y1="${formatNumber(centerY)}" x2="${formatNumber(centerX + 150)}" y2="${formatNumber(centerY)}" stroke="black" stroke-width="1" />\n`;
    svg += `  <line x1="${formatNumber(centerX)}" y1="${formatNumber(centerY - 150)}" x2="${formatNumber(centerX)}" y2="${formatNumber(centerY + 150)}" stroke="black" stroke-width="1" />\n`;
  }
  polarPlots.forEach((points, idx) => {
    const color = polarColors[idx % polarColors.length];
    const pts = points
      .map((p) => {
        const px = centerX + p.x;
        const py = centerY - p.y;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Exponential Plot
  svg += `  <text x="${width / 2}" y="1150" font-size="16" text-anchor="middle">Exponential Plot: y = a * e^(b*x)</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 1170, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      1170,
      700,
      180,
      Math.min(...exponentialPlots.flat().map((p) => p.x)),
      Math.max(...exponentialPlots.flat().map((p) => p.x)),
      Math.min(...exponentialPlots.flat().map((p) => p.y)),
      Math.max(...exponentialPlots.flat().map((p) => p.y)),
    );
  }
  const expAllPoints = exponentialPlots.flat();
  const expValues = expAllPoints.map((p) => p.y);
  let expMinY = Math.min(...expValues);
  let expMaxY = Math.max(...expValues);
  if (expMinY === expMaxY) {
    expMinY -= 10;
    expMaxY += 10;
  }
  const expAllX = exponentialPlots.flat().map((p) => p.x);
  let expMinX = Math.min(...expAllX);
  let expMaxX = Math.max(...expAllX);
  if (expMinX === expMaxX) {
    expMinX -= 10;
    expMaxX += 10;
  }
  exponentialPlots.forEach((points, idx) => {
    const color = exponentialColors[idx % exponentialColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - expMinX) / (expMaxX - expMinX)) * 700;
        const py = 1350 - ((p.y - expMinY) / (expMaxY - expMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });
  svg += "\n";

  // Logarithmic Plot
  svg += `  <text x="${width / 2}" y="1370" font-size="16" text-anchor="middle">Logarithmic Plot: y = a * log_b(x)</text>\n`;
  if (gridEnabled) {
    svg += drawRectGrid(50, 1390, 700, 180, 10, 5);
    svg += drawRectAxes(
      50,
      1390,
      700,
      180,
      Math.min(...logarithmicPlots.flat().map((p) => p.x)),
      Math.max(...logarithmicPlots.flat().map((p) => p.x)),
      Math.min(...logarithmicPlots.flat().map((p) => p.y)),
      Math.max(...logarithmicPlots.flat().map((p) => p.y)),
    );
  }
  const logAllPoints = logarithmicPlots.flat();
  const logValues = logAllPoints.map((p) => p.y);
  let logMinY = Math.min(...logValues);
  let logMaxY = Math.max(...logValues);
  if (logMinY === logMaxY) {
    logMinY -= 10;
    logMaxY += 10;
  }
  const logAllX = logarithmicPlots.flat().map((p) => p.x);
  let logMinX = Math.min(...logAllX);
  let logMaxX = Math.max(...logAllX);
  if (logMinX === logMaxX) {
    logMinX -= 10;
    logMaxX += 10;
  }
  logarithmicPlots.forEach((points, idx) => {
    const color = logarithmicColors[idx % logarithmicColors.length];
    const pts = points
      .map((p) => {
        const px = 50 + ((p.x - logMinX) / (logMaxX - logMinX)) * 700;
        const py = 1570 - ((p.y - logMinY) / (logMaxY - logMinY)) * 180;
        return `${formatNumber(px)},${formatNumber(py)}`;
      })
      .join(" ");
    svg += `  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" />\n`;
  });

  if (rotate !== 0) {
    svg += "  </g>\n";
  }

  svg += "</svg>";
  return svg;
};

// HTML Generation Function
const plotToHtml = ({ formulas = [], grid = false, dealersChoice = false, rotate = 0, customTitle = "" } = {}) => {
  const svgContent = plotToSvg({ formulas, grid, dealersChoice, rotate, customTitle });
  return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Equation Plot</title>\n  <style>\n    body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; }\n  </style>\n</head>\n<body>\n${svgContent}\n</body>\n</html>`;
};

// Markdown Generation Function (Extended Feature)
const plotToMarkdown = ({ formulas = [] } = {}) => {
  const { quadratic, linear, sine, cosine, polar, exponential, logarithmic } = getPlotsFromFormulas(formulas);
  let md = "# Plot Data\n\n";
  md += "## Quadratic Plot:\n";
  quadratic.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Linear Plot:\n";
  linear.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Sine Plot:\n";
  sine.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Cosine Plot:\n";
  cosine.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Polar Plot:\n";
  polar.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Exponential Plot:\n";
  exponential.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  md += "## Logarithmic Plot:\n";
  logarithmic.forEach((points, i) => {
    md +=
      `**Formula ${i + 1}:** ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" ") + "\n\n";
  });
  return md;
};

const plotToSvg = ({ formulas = [], grid = false, dealersChoice = false, rotate = 0, customTitle = "" } = {}) => {
  const { quadratic, linear, sine, cosine, polar, exponential, logarithmic } = getPlotsFromFormulas(formulas);
  return generateSvg(
    quadratic,
    linear,
    sine,
    cosine,
    polar,
    exponential,
    logarithmic,
    grid,
    dealersChoice,
    rotate,
    customTitle,
  );
};

const plotToAscii = ({ formulas = [] } = {}) => {
  const { sine } = getPlotsFromFormulas(formulas);
  let result = "";
  sine.forEach((points, idx) => {
    const header = `ASCII Art of Sine Wave - Formula ${idx + 1}:\n`;
    const rows = 21;
    const cols = points.length;
    const grid = Array.from({ length: rows }, () => new Array(cols).fill(" "));

    for (let col = 0; col < cols; col++) {
      const { y } = points[col];
      const row = Math.round((1 - (y + 1) / 2) * (rows - 1));
      grid[row][col] = "*";
    }

    const xAxisRow = Math.round(0.5 * (rows - 1));
    for (let col = 0; col < cols; col++) {
      if (grid[xAxisRow][col] === " ") grid[xAxisRow][col] = "-";
    }
    result += header + grid.map((row) => row.join(" ")).join("\n") + "\n\n";
  });
  return result;
};

const plotToText = ({ formulas = [] } = {}) => {
  const { quadratic, linear, sine, cosine, polar, exponential, logarithmic } = getPlotsFromFormulas(formulas);
  let output = "";
  output +=
    "Quadratic Plot:\n" +
    quadratic
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Linear Plot:\n" +
    linear
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Sine Plot:\n" +
    sine
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Cosine Plot:\n" +
    cosine
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Polar Plot:\n" +
    polar
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Exponential Plot:\n" +
    exponential
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n\n";
  output +=
    "Logarithmic Plot:\n" +
    logarithmic
      .map(
        (points, i) =>
          `Formula ${i + 1}: ` + points.map((p) => `(${formatNumber(p.x)}, ${formatNumber(p.y)})`).join(" "),
      )
      .join("\n") +
    "\n";
  return output;
};

const plotToJson = ({ formulas = [] } = {}) => {
  const { quadratic, linear, sine, cosine, polar, exponential, logarithmic } = getPlotsFromFormulas(formulas);
  return {
    quadratic,
    linear,
    sine,
    cosine,
    polar,
    exponential,
    logarithmic,
  };
};

const plotToCsv = ({ formulas = [] } = {}) => {
  const { quadratic, linear, sine, cosine, polar, exponential, logarithmic } = getPlotsFromFormulas(formulas);
  const lines = [];
  lines.push("Plot, Formula, x, y");
  lines.push("--Quadratic Plot--");
  quadratic.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Quadratic,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Linear Plot--");
  linear.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Linear,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Sine Plot--");
  sine.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Sine,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Cosine Plot--");
  cosine.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Cosine,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Polar Plot--");
  polar.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Polar,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Exponential Plot--");
  exponential.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Exponential,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  lines.push("");
  lines.push("--Logarithmic Plot--");
  logarithmic.forEach((points, i) => {
    points.forEach((p) => {
      lines.push(`Logarithmic,Formula ${i + 1},${formatNumber(p.x)},${formatNumber(p.y)}`);
    });
  });
  return lines.join("\n");
};

const plotToFile = ({ formulas = [], outputFileName = "output.svg", type = "svg" } = {}) => {
  let content = "";
  if (type === "svg") {
    content = plotToSvg({ formulas });
  } else if (type === "ascii") {
    content = plotToAscii({ formulas });
  } else if (type === "text") {
    content = plotToText({ formulas });
  } else if (type === "json") {
    content = JSON.stringify(plotToJson({ formulas }), null, 2);
  } else if (type === "csv") {
    content = plotToCsv({ formulas });
  } else if (type === "html") {
    content = plotToHtml({ formulas });
  } else if (type === "md") {
    content = plotToMarkdown({ formulas });
  } else {
    throw new Error("Unsupported type provided for plotToFile");
  }
  try {
    fs.writeFileSync(outputFileName, content, "utf8");
  } catch (e) {
    console.error("Error writing file:", e);
    throw e;
  }
  return outputFileName;
};

// Demo Test Function
const demoTest = () => {
  console.log("=== Demo Test Output ===");

  // Original sine plot demo
  const demoPlotJson = plotToJson({ formulas: ["sine:1,1,0,0,360,30"] });
  console.log("Plot JSON output for formula 'sine:1,1,0,0,360,30':");
  console.log(JSON.stringify(demoPlotJson, null, 2));

  // Additional demo: Markdown output for a linear formula
  const demoMarkdown = plotToMarkdown({ formulas: ["y=2x+3:-10,10,1"] });
  console.log("\nPlot Markdown output for formula 'y=2x+3:-10,10,1':");
  console.log(demoMarkdown);

  // Additional demo: Text output for a quadratic formula
  const demoText = plotToText({ formulas: ["quad:1,0,0,-10,10,1"] });
  console.log("\nPlot Text output for formula 'quad:1,0,0,-10,10,1':");
  console.log(demoText);

  // New demo: ASCII art output for sine formula
  const demoAscii = plotToAscii({ formulas: ["sine:1,1,0,0,360,30"] });
  console.log("\nPlot ASCII art output for formula 'sine:1,1,0,0,360,30':");
  console.log(demoAscii);

  // New demo: CSV output for quadratic formula
  const demoCsv = plotToCsv({ formulas: ["quad:1,0,0,-10,10,1"] });
  console.log("\nPlot CSV output for formula 'quad:1,0,0,-10,10,1':");
  console.log(demoCsv);

  // New demo: HTML output for linear formula with grid
  const demoHtml = plotToHtml({ formulas: ["y=2x+3:-10,10,1"], grid: true });
  console.log("\nPlot HTML output for formula 'y=2x+3:-10,10,1':");
  console.log(demoHtml);

  console.log("=== End Demo Test Output ===");
};

// Main Execution
const main = async () => {
  const args = process.argv.slice(2);
  // If no command-line arguments are provided, output default usage message and SVG file demo output
  if (args.length === 0) {
    console.log("No arguments provided. Running default demo output.");
    const fileContent = plotToSvg({ formulas: [] });
    const outputFileName = "output.svg";
    fs.writeFileSync(outputFileName, fileContent, "utf8");
    console.log(`SVG file generated: ${outputFileName}`);
    // Check for summary flag
    if (process.argv.includes("--summary")) {
      const plotsInfo = getPlotsFromFormulas([]);
      console.log("\nSummary of Plots:");
      for (const key in plotsInfo) {
        if (plotsInfo[key].length > 0) {
          const summary = getSummary(plotsInfo[key][0]);
          console.log(`${key}:`, summary);
        }
      }
    }
    process.exit(0);
  }

  // Parse rotation flag if provided
  let rotation = 0;
  const rotateIndex = args.findIndex((arg) => arg.startsWith("--rotate"));
  if (rotateIndex > -1) {
    let angleStr = "";
    const rotateArg = args[rotateIndex];
    if (rotateArg.includes("=")) {
      angleStr = rotateArg.split("=")[1];
    } else if (args.length > rotateIndex + 1) {
      angleStr = args[rotateIndex + 1];
    }
    rotation = parseFloat(angleStr) || 0;
  }

  // Parse custom title flag if provided
  let customTitle = "";
  const titleIndex = args.findIndex((arg) => arg.startsWith("--title"));
  if (titleIndex > -1) {
    let titleStr = "";
    const titleArg = args[titleIndex];
    if (titleArg.includes("=")) {
      titleStr = titleArg.split("=")[1];
    } else if (args.length > titleIndex + 1) {
      titleStr = args[titleIndex + 1];
    }
    customTitle = titleStr;
  }

  if (args.includes("--version")) {
    console.log("Equation Plotter Library version 0.2.0-14");
    process.exit(0);
  }

  if (args.includes("--help") || args.includes("-h")) {
    console.log(
      `Usage: node src/lib/main.js [outputFileName] [formulaStrings...] [--rotate <angle>] [--title <custom title>] [--summary]\n\nOptions:\n  --help, -h         Show this help message\n  --json             Generate output as JSON instead of SVG\n  --csv              Generate output as CSV instead of SVG\n  --ascii            Generate output as ASCII art instead of SVG\n  --md               Generate output as Markdown instead of SVG\n  --html             Generate output as HTML\n  --grid             Overlay grid lines on SVG plots\n  --debug            Output internal parsed plot data for debugging\n  --dealers-choice   Use randomized color palette for SVG plots\n  --rotate <angle>   Rotate SVG output by specified degrees\n  --title <title>    Add a custom title to the SVG output (appears as a <title> element)\n  --summary        Print summary statistics (min, max, avg) for the first plot of each type\n  --interactive      Enable interactive CLI mode for real-time user input\n  --demo             Run demo test output\n  --version          Show version information\n(output file extension .html will generate HTML output,\n .md for Markdown output, .txt or .ascii for ASCII output, .png for PNG output)\n\nFormula String Formats:\n  Quadratic: "quad:y=x^2+2*x+1" or "quadratic:y=x^2+2*x+1" or "x^2+y-1=0" (or with range e.g., "y=x^2+2*x+1:-10,10,1")\n  Linear:    "linear:m,b[,xMin,xMax,step]" or algebraic form like "y=2x+3" (or "y=2x+3:-10,10,1")\n  Sine:      "sine:amplitude,frequency,phase[,xMin,xMax,step]"\n  Cosine:    "cosine:amplitude,frequency,phase[,xMin,xMax,step]" or "cos:..."\n  Polar:     "polar:scale,multiplier,step[,degMin,degMax]"\n  Exponential: "exponential:a,b,xMin,xMax,step" or "exp:a,b,xMin,xMax,step" or in algebraic form like "y=2*e^(0.5x)" (optionally with range e.g., "y=2*e^(0.5x):-10,10,1")\n  Logarithmic: "log:a,base,xMin,xMax,step" or "ln:a,base,xMin,xMax,step"\n`,
    );
    process.exit(0);
  }

  // Interactive CLI mode support
  if (args.includes("--interactive")) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Enter formula strings (semicolon-separated): ", async (answer) => {
      const interactiveFormulas = answer
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const filteredArgs = args.filter((arg) => arg !== "--interactive");
      const formulasList = interactiveFormulas.length ? interactiveFormulas : [];
      let outputFileName = "output.svg";
      const isJson = filteredArgs.includes("--json");
      const isCsv = filteredArgs.includes("--csv");
      const isHtml = false;
      const isAscii = filteredArgs.includes("--ascii");
      const isMarkdown = filteredArgs.includes("--md");
      const isDebug = filteredArgs.includes("--debug");
      const gridEnabled = filteredArgs.includes("--grid");
      const isDealersChoice = filteredArgs.includes("--dealers-choice");
      const nonFormulaArgs = filteredArgs.filter(
        (arg) =>
          !arg.includes(":") &&
          !arg.includes("=") &&
          ![
            "--json",
            "--csv",
            "--version",
            "--ascii",
            "--debug",
            "--grid",
            "--dealers-choice",
            "--interactive",
            "--md",
            "--html",
            "--rotate",
            "--title",
            "--summary",
          ].includes(arg),
      );
      if (nonFormulaArgs.length > 0) {
        outputFileName = nonFormulaArgs[0];
      }
      const lowerName = outputFileName.toLowerCase();
      const isPng = lowerName.endsWith(".png");

      if (isDebug) {
        console.log("\nDebug: Internal parsed plot data:");
        console.log(JSON.stringify(getPlotsFromFormulas(formulasList), null, 2));
      }

      let fileContent = "";
      if (isJson) {
        fileContent = JSON.stringify(plotToJson({ formulas: formulasList }), null, 2);
      } else if (isCsv) {
        fileContent = plotToCsv({ formulas: formulasList });
      } else if (isHtml) {
        fileContent = plotToHtml({ formulas: formulasList, grid: gridEnabled, dealersChoice: isDealersChoice });
      } else if (isMarkdown) {
        fileContent = plotToMarkdown({ formulas: formulasList });
      } else if (isAscii) {
        fileContent = plotToAscii({ formulas: formulasList });
      } else {
        fileContent = plotToSvg({
          formulas: formulasList,
          grid: gridEnabled,
          dealersChoice: isDealersChoice,
          rotate: rotation,
          customTitle,
        });
      }

      try {
        if (isPng) {
          // Always generate SVG and then convert to PNG using sharp
          const svgContent = plotToSvg({
            formulas: formulasList,
            grid: gridEnabled,
            dealersChoice: isDealersChoice,
            rotate: rotation,
            customTitle,
          });
          await sharp(Buffer.from(svgContent)).png().toFile(outputFileName);
          console.log(`\nPNG file generated: ${outputFileName}`);
        } else {
          fs.writeFileSync(outputFileName, fileContent, "utf8");
          console.log(
            `\n${isJson ? "JSON" : isCsv ? "CSV" : isHtml ? "HTML" : isMarkdown ? "Markdown" : isAscii ? "ASCII" : "SVG"} file generated: ${outputFileName}`,
          );
        }
      } catch (err) {
        console.error(`Error writing file:`, err.message);
        process.exit(1);
      }

      console.log("\nText Representation of Plots:");
      console.log(plotToText({ formulas: formulasList }));

      // New Feature: Summary Output
      if (filteredArgs.includes("--summary")) {
        const plotsInfo = getPlotsFromFormulas(formulasList);
        console.log("\nSummary of Plots:");
        for (const key in plotsInfo) {
          if (plotsInfo[key].length > 0) {
            const summary = getSummary(plotsInfo[key][0]);
            console.log(`${key}:`, summary);
          }
        }
      }

      rl.close();
      process.exit(0);
    });
    return;
  }

  let outputFileName = "output.svg";
  let isJson = args.includes("--json");
  let isCsv = args.includes("--csv");
  let isHtml = false;
  let isAscii = args.includes("--ascii");
  let isMarkdown = args.includes("--md");
  const isDebug = args.includes("--debug");
  const gridEnabled = args.includes("--grid");
  const isDealersChoice = args.includes("--dealers-choice");
  const nonFormulaArgs = args.filter(
    (arg) =>
      !arg.includes(":") &&
      !arg.includes("=") &&
      ![
        "--json",
        "--csv",
        "--version",
        "--ascii",
        "--debug",
        "--grid",
        "--dealers-choice",
        "--interactive",
        "--md",
        "--html",
        "--rotate",
        "--title",
        "--summary",
      ].includes(arg),
  );
  if (nonFormulaArgs.length > 0) {
    outputFileName = nonFormulaArgs[0];
  }
  const lowerName = outputFileName.toLowerCase();
  const isPng = lowerName.endsWith(".png");
  if (lowerName.endsWith(".json")) {
    isJson = true;
  } else if (lowerName.endsWith(".csv")) {
    isCsv = true;
  } else if (lowerName.endsWith(".html")) {
    isHtml = true;
  } else if (lowerName.endsWith(".md")) {
    isMarkdown = true;
  } else if (lowerName.endsWith(".txt") || lowerName.endsWith(".ascii")) {
    isAscii = true;
  }

  const formulasList = args.filter((arg) => arg.includes(":") || arg.includes("="));

  if (formulasList.length === 0) {
    console.log(
      "No formulas provided. Using default plot functions for quadratic, linear, sine, cosine, polar, exponential, and logarithmic plots.",
    );
  }

  if (isDebug) {
    console.log("\nDebug: Internal parsed plot data:");
    console.log(JSON.stringify(getPlotsFromFormulas(formulasList), null, 2));
  }

  let fileContent = "";
  if (isJson) {
    fileContent = JSON.stringify(plotToJson({ formulas: formulasList }), null, 2);
  } else if (isCsv) {
    fileContent = plotToCsv({ formulas: formulasList });
  } else if (isHtml) {
    fileContent = plotToHtml({ formulas: formulasList, grid: gridEnabled, dealersChoice: isDealersChoice });
  } else if (isMarkdown) {
    fileContent = plotToMarkdown({ formulas: formulasList });
  } else if (isAscii) {
    fileContent = plotToAscii({ formulas: formulasList });
  } else {
    fileContent = plotToSvg({
      formulas: formulasList,
      grid: gridEnabled,
      dealersChoice: isDealersChoice,
      rotate: rotation,
      customTitle,
    });
  }

  try {
    if (isPng) {
      const svgContent = plotToSvg({
        formulas: formulasList,
        grid: gridEnabled,
        dealersChoice: isDealersChoice,
        rotate: rotation,
        customTitle,
      });
      await sharp(Buffer.from(svgContent)).png().toFile(outputFileName);
      console.log(`\nPNG file generated: ${outputFileName}`);
    } else {
      fs.writeFileSync(outputFileName, fileContent, "utf8");
      console.log(
        `\n${isJson ? "JSON" : isCsv ? "CSV" : isHtml ? "HTML" : isMarkdown ? "Markdown" : isAscii ? "ASCII" : "SVG"} file generated: ${outputFileName}`,
      );
    }
  } catch (err) {
    console.error(`Error writing file:`, err.message);
    process.exit(1);
  }

  console.log("\nText Representation of Plots:");
  console.log(plotToText({ formulas: formulasList }));

  // New Feature: Summary Output in non-interactive mode
  if (args.includes("--summary")) {
    const plotsInfo = getPlotsFromFormulas(formulasList);
    console.log("\nSummary of Plots:");
    for (const key in plotsInfo) {
      if (plotsInfo[key].length > 0) {
        const summary = getSummary(plotsInfo[key][0]);
        console.log(`${key}:`, summary);
      }
    }
  }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export {
  plotToSvg,
  plotToAscii,
  plotToText,
  plotToJson,
  plotToCsv,
  plotToHtml,
  plotToMarkdown,
  plotToFile,
  plotFromString,
  plotQuadratic,
  plotSine,
  plotCosine,
  plotPolar,
  plotLinear,
  plotExponential,
  plotLogarithmic,
  parseGenericQuadratic,
  parseGenericExponential,
  parseCosine,
  main,
  getSummary,
};
