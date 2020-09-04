describe('4.0', (): void => {
  describe('Variadic Tuple Types', (): void => {
    // function tailOriginal(ary: any[]): any[] {
    //     const [_ignored, ...result] = ary;
    //     return result;
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function tail<T extends any[]>(arr: readonly [any, ...T]): readonly T[] {
      const [, ...rest] = arr;
      return rest;
    }
    it.only('', (): void => {
      const myTuple = [1, 2, 3, 4] as const;
      const myArray = ['hello', 'world'];

      const r1 = tail(myTuple);
      expect(r1).toEqual([2, 3, 4]);

      const r2 = tail([...myTuple, ...myArray] as const);
      expect(r2).toEqual([2, 3, 4, 'hello', 'world']);
    });
  });
  describe('Labeled Tuple Elements', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('', (): void => {});
  });
  describe('Class Property Inference from Constructors', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('', (): void => {});
  });
  describe('Short-Circuiting Assignment Operators', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('', (): void => {});
  });
  describe('unknown on catch Clause Bindings', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('', (): void => {});
  });
  describe('Custom JSX Factories', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('', (): void => {});
  });
});
