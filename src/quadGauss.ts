export function quadGauss(
  A: number[],
  t: number[],
  n: number,
  a: number,
  b: number,
  func: (x: number) => number
) {
  const h = (b - a) / 2;
  return (
    h *
    new Array(n)
      .fill(0)
      .reduce((acc, _, i) => acc + A[i] * func(h * t[i]) + (a + b) / 2)
  );
}
