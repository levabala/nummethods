export function thomas(matrix: number[][]) {
  const height = matrix.length;
  const width = matrix[0].length;

  // define getters for each of possible matrix varibles
  const getA = (index: number) => matrix[index][index - 1];
  const getB = (index: number) => matrix[index][index];
  const getC = (index: number) => matrix[index][index + 1];
  const getD = (index: number) => matrix[index][width - 1];

  // first values for components:
  const y0 = getB(0);
  const alpha0 = -getC(0) / y0;
  const betta0 = getD(0) / y0;

  // arrays for storing b_i and a_i
  const bettas = [betta0];
  const alphas = [alpha0];

  // gathering alphas and bettas
  for (let i = 1; i < height; i++) {
    // y_i = b_i + a_i * alpha_(i-1)
    const y = getB(i) + getA(i) * alphas[alphas.length - 1];

    // betta_i = (d_i - a_i * betta_(i-1)) / y_i
    const betta = (getD(i) - getA(i) * bettas[bettas.length - 1]) / y;
    bettas.push(betta);

    // alpha_i = -c_i / y_i
    const alpha = -getC(i) / y;
    alphas.push(alpha);
  }

  const xLast = bettas[height - 1];
  const xes = [xLast];

  // now reverse-go to calc x values
  for (let i = height - 2; i >= 0; i--) {
    // x_i = alpha_i * x_(i+1) + betta_i
    const x = alphas[i] * xes[xes.length - 1] + bettas[i];
    xes.push(x);
  }

  // revert the array to make it ascending
  return xes.reverse();
}
