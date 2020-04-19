import { IterationsResult } from './types';

export function findRootBisection(
  func: (x: number) => number,
  range: [number, number],
  eps = 10e-7,
  iteration = 0
): IterationsResult {
  const a = range[0];
  const b = range[1];
  const c = a + (b - a) / 2;

  const fc = func(c);

  if (Math.abs(fc) < eps) return { result: c, iterationsCount: iteration };

  const fa = func(a);

  if (fa * fc < 0) return findRootBisection(func, [a, c], eps, iteration + 1);

  return findRootBisection(func, [c, b], eps, iteration + 1);
}
