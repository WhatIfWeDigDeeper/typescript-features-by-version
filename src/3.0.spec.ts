describe('3.0', (): void => {
  describe('Rest parameters with tuple types', (): void => {
    type TupleTest = [number, string, boolean];
    function tailTuple(...rest: TupleTest): [string, boolean] {
      return [rest[1], rest[2]];
    }
    it('spreads last args of a tuple to a sequence of discreet args of the tuple', (): void => {
      const tuple: [number, string, boolean] = [42, 'hello', true];

      const result = tailTuple(...tuple);

      expect(result).toEqual(['hello', true]);
    });
  });
  describe('Generic rest parameters', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function bind<T, U extends any[], V>(
      f: (x: T, ...args: U) => V,
      x: T
    ): (...args: U) => V {
      return (...args): V => f(x, ...args);
    }

    function f3(
      x: number,
      y: string,
      z: boolean
    ): { x: number; y: string; z: boolean } {
      return { x, y, z };
    }

    it('rest parameter is', (): void => {
      const f2 = bind(f3, 42); // (y: string, z: boolean) => void
      const f1 = bind(f2, 'hello'); // (z: boolean) => void
      const f0 = bind(f1, true); // () => void

      [f3(42, 'hello', true), f2('hello', true), f1(true), f0()].forEach(
        (result) => {
          expect(result).toEqual({
            x: 42,
            y: 'hello',
            z: true,
          });
        }
      );
    });
  });
  describe('Optional elements in tuple types', (): void => {
    it('allows optional entries at end of tuple types', (): void => {
      let t: [number, string?, boolean?];
      // length is union type 1 | 2 | 3

      t = [42, 'hello', true];
      expect(t.length).toBe(3);

      t = [42, 'hello'];
      expect(t.length).toBe(2);

      t = [42];
      expect(t.length).toBe(1);
    });
  });
  describe('Rest elements in tuple types', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function tuple<T extends any[]>(...args: T): T {
      return args;
    }
    it('allows open ended tuples when last element of tuple is an array', (): void => {
      const fib = [1, 1, 2, 3, 5];
      const t1 = tuple('foo', 1, true); // [string, number, boolean]
      expect(t1).toEqual(['foo', 1, true]);
      const t2 = tuple('bar', ...fib); // [string, ...number[]]
      expect(t2).toEqual(['bar', 1, 1, 2, 3, 5]);
    });
  });
});
