import { findRootBisection } from './bisections';

describe("bisections", () => {
  it("case1", () => {
    const func = (x: number) => x ** 2;
    expect(findRootBisection(func, [-10, 10])).toBeCloseTo(0, 10e-3);
  });

  // it("case2", () => {
  //   const func = (x: number) => x ** 2;
  //   expect(findRootBisection(func)).toBeCloseTo(0, 10e-3);
  // });
});
