import { diag, inv, multiply, norm, subtract } from 'mathjs';

export function jakobi(
  A: number[][],
  b: number[],
  eps = 1e-10,
  maxIterations = 500
) {
  // getting diagonal form of matrix A
  const D = diag(diag(A));

  // interting diagonal form
  const DInv = inv(D);

  // get LU matrix
  const LU = subtract(A, D) as number[][];

  // start iterating
  let x = b;
  for (let i = 0; i < maxIterations; i++) {
    // getting new x-vector
    const xNew = multiply(DInv, subtract(b, multiply(LU, x))) as any;

    // checking if norm of diff betwee xNew and x is lower then epsilon (then stop)
    if (norm(subtract(xNew, x) as any) < eps) return xNew;

    // logging current value
    console.log(xNew);
    x = xNew;
  }

  return x;
}