export function thomas(matrix: number[][]) {
  const height = matrix.length;
  const width = matrix[0].length;

  const getA = (index: number) => matrix[index][index - 1];
  const getB = (index: number) => matrix[index][index];
  const getC = (index: number) => matrix[index][index + 1];
  const getD = (index: number) => matrix[index][width - 1];

  const y0 = getB(0);
  const alpha0 = -getC(0) / y0;
  const betta0 = getD(0) / y0;

  const bettas = [betta0];
  const alphas = [alpha0];

  // console.log(`y1: ${y0}, alpha1: ${alpha0}, betta1: ${betta0}`);

  for (let i = 1; i < height; i++) {
    const y = getB(i) + getA(i) * alphas[alphas.length - 1];

    const betta = (getD(i) - getA(i) * bettas[bettas.length - 1]) / y;
    bettas.push(betta);

    const alpha = -getC(i) / y;
    alphas.push(alpha);

    // console.log(
    //   `y${i + 1}: ${y}, alpha${i + 1}: ${alpha}, betta${i + 1}: ${betta}`
    // );
  }

  const xLast = bettas[height - 1];
  const xes = [xLast];

  // console.log(`x${height - 1}: ${xLast}, betta${bettas[height - 1]}`);

  for (let i = height - 2; i >= 0; i--) {
    const x = alphas[i] * xes[xes.length - 1] + bettas[i];
    xes.push(x);
  }

  return xes.reverse();
}
