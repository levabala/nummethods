import { IterationsResult } from './types';

export function simpleIterations(
  func: (x: number) => number,
  k: number,
  xPrev: number,
  eps = 10e-7,
  iterationsLeft = 30,
  iterationsInitial = 30
): IterationsResult {
  if (!iterationsLeft || Math.abs(func(xPrev)) < eps)
    return {
      result: xPrev,
      iterationsCount: iterationsInitial - iterationsLeft
    };

  const xNext = xPrev - k * func(xPrev);

  return simpleIterations(func, k, xNext, eps, iterationsLeft - 1);
}
