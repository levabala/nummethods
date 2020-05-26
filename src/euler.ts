import { runge } from "./trapecii";

// def euler(f,y0,a,b,h):
// 	t,y = a,y0
// 	while t <= b:
// 		print "%6.3f %6.3f" % (t,y)
// 		t += h
// 		y += h * f(t,y)

function euler(
  func: (x: number, y: number) => number,
  y0: number,
  a: number,
  b: number,
  h: number
) {
  let x = a;
  let y = y0;

  const points = [];
  while (x <= b) {
    points.push({ x, y });
    x += h;
    y += h * func(x, y);
  }

  return points;
}

// p = 2
function rungeCutte2(
  func: (x: number, y: number) => number,
  y0: number,
  a: number,
  b: number,
  h: number
) {
  let y = y0;
  let x = a;

  const points = [];

  while (x <= b) {
    points.push({ x, y });

    const k1 = h * func(x, y);
    const k2 = h * func(x + h, y + k1);
    y = y + (k1 + k2) / 2;

    x += h;
  }

  return points;
}

function adam(
  func: (x: number, y: number) => number,
  y0: number,
  y1: number,
  a: number,
  b: number,
  h: number
) {
  let y = y0;
  let x = a;

  const points = [{ x, y }];

  let fPrev = func(x, y);

  const fs = [];

  y = y1;
  x += h;

  while (x <= b) {
    points.push({ x, y });

    const f = func(x, y);
    y = y + (h * (3 * f - fPrev)) / 2;

    fs.push(f);

    x += h;
    fPrev = f;
  }

  return { points, fs };
}

function adam2(
  func: (x: number, y: number) => number,
  y0: number,
  y1: number,
  a: number,
  b: number,
  h: number
) {
  const { fs } = adam(func, y0, y1, a, b, h);

  let y = y0;
  let x = a;

  const points = [{ x, y }];

  y = y1;
  x += h;

  let i = 0;
  while (x <= b) {
    points.push({ x, y });

    const f = func(x, y);
    const fNext = fs[i + 1];
    y = y + (h * (fNext + f)) / 2;

    x += h;

    i++;
  }

  return points;
}

// y[x] = y[x] + (1 + x) y[x]
const f = (x: number, y: number) => y + (1 + x) * y;

const pointsH = euler(f, 1, 0, 0.5, 0.1);
const pointsH2 = euler(f, 1, 0, 0.5, 0.1 / 2);

const errors = pointsH.map(({ y }, i) => runge(y, pointsH2[i * 2].y));

export const printer = ({ x, y }: { x: number; y: number }) =>
  console.log(`{${x.toString()}, ${y.toString()}},`);

pointsH.forEach(printer);

console.log("\nerrors:");
console.log(errors);

console.log("\n---------------- runge-cutte\n");

const pointsRC = rungeCutte2(f, 1, 0, 0.5, 0.1);
pointsRC.forEach(printer);

console.log("\n---------------- adam\n");

const { points: pointsAdam } = adam(f, 1, pointsRC[1].y, 0, 0.5, 0.1);
pointsAdam.forEach(printer);

console.log("\n---------------- adam2\n");

const pointsAdam2 = adam2(f, 1, pointsRC[1].y, 0, 0.5, 0.1);
pointsAdam2.forEach(printer);
