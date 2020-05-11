import { quadGauss } from './quadGauss';

const A = [
  0.1713244924,
  0.360761573,
  0.4679139346,
  0.4679139346,
  0.360761573,
  0.1713244924,
];
const t = [
  -0.9324695142,
  -0.6612093864,
  -0.2386191861,
  0.2386191861,
  0.6612093864,
  0.9324695142,
];

const func = (x: number) => Math.exp(x) * Math.sin(x);

const res = quadGauss(A, t, 6, 0, Math.PI, func);
console.log(res);
