describe('3.7', () => {
  describe('Optional Chaining', () => {
    // interface Foo {
    //   fu?: { bar?: { baz?: number } };
    // }
    // it('should return undefined for nested missing item', () => {
    //   const example: Foo = { fu: { bar: {} } };
    //   expect(example.fu?.bar?.baz).toBeUndefined();
    // });
    // it('should return value for nested item', () => {
    //   const example: Foo = { fu: { bar: { baz: 100 } } };
    //   expect(example?.fu?.bar?.baz).toBe(100);
    // });

    const tryGetFirstElement = <T>(ary?: T[]): T | undefined => ary ? ary[0] : undefined;
    it('should return the first element', () => {
      const numbers = [10, 9, 8];
      const first = tryGetFirstElement(numbers);
      expect(first).toBe(10);
    });
    it('should return undefined for undefined array', () => {
      const numbers: number[] | undefined = undefined;
      const first = tryGetFirstElement(numbers);
      expect(first).toBeUndefined();
    });
    it('should return undefined for empty array', () => {
      const numbers: number[] | undefined = [];
      const first = tryGetFirstElement(numbers);
      expect(first).toBeUndefined();
    });
  });
  describe('Nullish Coalescing', () => {
    it('should show problem with 0 treated as falsy with standard || check', () => {
      const sample = { volume: 0 };
      expect(sample.volume || 0.5).toBe(0.5);
    });
    // it('should avoid falsy check resulting in 0', () => {
    //   const sample = { volume: 0 };
    //   expect(sample.volume ?? 0.5).toBe(0);
    // });
  });
});
