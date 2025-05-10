import Decimal from 'decimal.js';
import { workerData, parentPort } from 'worker_threads';
import { calculatePi } from './main.js';

(async () => {
  const { digits, algorithm } = workerData;
  try {
    const pi = calculatePi(digits, algorithm);
    const result = pi.toFixed(digits, Decimal.ROUND_DOWN);
    parentPort.postMessage({ result });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
})();