import { findRootBisection } from './bisections';
import { simpleIterations } from './simpleIterations';

const func = (x: number) => x ** 4 + 10 * x ** 3 + x - 2;

const M = 10.741;
const m = 0.51;
const k = 2 / (M + m);
console.log({ k });

const simpleIts = simpleIterations(func, k, 9);
const bisections = findRootBisection(func, [0.5, 0.55]);

console.table({
  "simple iterations": simpleIts,
  bisections: bisections
});

// const r1 = findRootBisection(func, [0.1, 0.4]);
// const r2 = findRootBisection(func, [0.7, 1.2]);
// const r3 = findRootBisection(func, [1.5, 1.8]);
// console.log({ r1, r3 });

// const func = (x: number) => x ** 5 + 11 * x ** 4 + 101 * x ** 2 + 11 * x - 10;

// const r1 = findRootBisection(func, [-2, 0]);
// const r2 = findRootBisection(func, [0, 1]);
// console.log({ r1, r2 });
