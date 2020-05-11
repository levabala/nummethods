import { runge, trapecii } from './trapecii';

const func = (x: number) => Math.exp(x) * Math.sin(x);

const eps = 0.0000001;

const output: Array<{ chunks: number; res: number; error: number }> = [];

let counter = 0;
let n = 4;
let prev = trapecii(func, 0, Math.PI, n / 2);
while (counter++ < 100) {
  const res = trapecii(func, 0, Math.PI, n);
  const error = runge(prev, res);
  output.push({ chunks: n, res, error });

  if (error < eps) {
    console.log("found!");
    break;
  }
  prev = res;

  n *= 2;
}

console.table(output);
