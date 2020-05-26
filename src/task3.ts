import { printer } from "./euler";
import { runge } from "./trapecii";

// p = 4
function rungeCutte4(
  fy: (x: number, y: number, z: number) => number,
  fz: (x: number, y: number, z: number) => number,
  y0: number,
  z0: number,
  a: number,
  b: number,
  h: number
) {
  let y = y0;
  let z = z0;
  let x = a;

  const pointsY = [];
  const pointsZ = [];

  while (x <= b) {
    pointsY.push({ x, y });
    pointsZ.push({ x, y: z });

    const yk1 = h * fy(x, y, z);
    const zk1 = h * fz(x, y, z);

    const yk2 = h * fy(x + h / 2, y + yk1 / 2, z + zk1 / 2);
    const zk2 = h * fz(x + h / 2, y + zk1 / 2, z + zk1 / 2);

    const yk3 = h * fy(x + h / 2, y + yk2 / 2, z + zk2 / 2);
    const zk3 = h * fy(x + h / 2, y + yk2 / 2, z + zk2 / 2);

    const yk4 = h * fy(x + h, y + yk3, z + zk3);
    const zk4 = h * fz(x + h, y + yk3, z + zk3);

    y = y + (yk1 + 2 * yk2 + 2 * yk3 + yk4) / 6;
    z = z + (zk1 + 2 * zk2 + 2 * zk3 + zk4) / 6;

    x += h;
  }

  return { pointsY, pointsZ };
}

const p = 1 + 0.1 * 2;
const fy = (x: number, y: number, z: number) =>
  -2 * p * x * y ** 2 + z ** 2 - x - 1;
const fz = (x: number, y: number, z: number) => 1 / (p * z ** 2) - y - x / y;

const a = 0;
const b = 1;
const y0 = 1 / p;
const z0 = 1;
const h = 0.05;

const { pointsY, pointsZ } = rungeCutte4(fy, fz, y0, z0, a, b, h);

console.log("\n---------------- pointsY \n");
pointsY.forEach(printer);

console.log("\n---------------- pointsZ \n");
pointsZ.forEach(printer);

const { pointsY: pointsYH, pointsZ: pointsZH } = rungeCutte4(
  fy,
  fz,
  y0,
  z0,
  a,
  b,
  h / 2
);

const errorsY = pointsY.map(({ y }, i) => runge(y, pointsYH[i].y));
const errorsZ = pointsZ.map(({ y }, i) => runge(y, pointsZH[i].y));
const errors = errorsY.map((err, i) => Math.max(err, errorsZ[i]));

console.log("\n\nerrors:");
console.table(errors);
