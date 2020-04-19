import { diag, inv, multiply, norm, subtract } from 'mathjs';

export function jakobi(
  A: number[][],
  b: number[],
  eps = 1e-10,
  maxIterations = 500
) {
  const D = diag(diag(A));
  const DInv = inv(D);
  const LU = subtract(A, D) as number[][];
  let x = b;
  for (let i = 0; i < maxIterations; i++) {
    const c1 = multiply(LU, x);
    const c2 = subtract(b, c1);
    const xNew = multiply(DInv, c2) as any;

    if (norm(subtract(xNew, x) as any) < eps) return xNew;

    console.log(xNew);
    x = xNew;
  }
}

// def jacobi(A, b, x_init, epsilon=1e-10, max_iterations=500):
//     D = np.diag(np.diag(A))
//     LU = A - D
//     x = x_init
//     for i in range(max_iterations):
//         D_inv = np.diag(1 / np.diag(D))
//         x_new = np.dot(D_inv, b - np.dot(LU, x))
//         if np.linalg.norm(x_new - x) < epsilon:
//             return x_new
//         x = x_new
//     return x
