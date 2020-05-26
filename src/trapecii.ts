export function trapecii(
  func: (x: number) => number,
  a: number,
  b: number,
  n: number
) {
  const h = (b - a) / n;
  return (
    (h / 2) *
    (func(a) +
      func(b) +
      2 *
        new Array(n - 1)
          .fill(0)
          .reduce((acc, _, i) => acc + func(a + (i + 1) * h)))
  );
}

export function runge(integral1: number, integral2: number, k = 2) {
  return Math.abs((integral2 - integral1) / (2 ** k - 1));
}
