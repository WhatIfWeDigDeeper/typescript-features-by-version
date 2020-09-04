// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html

describe('3.2', () => {
  describe('strictBindCallApply', () => {
    function foo(a: number, b: string): string {
      return a + b;
    }

    it('should statically type bind, call and apply', (): void => {
      // const a = foo.apply(undefined, [10]); // error: too few argumnts
      // const b = foo.apply(undefined, [10, 20]); // error: 2nd argument is a number
      // const c = foo.apply(undefined, [10, 'hello', 30]); // error: too many arguments
      const d = foo.apply(undefined, [10, 'hello']); // okay! returns a string
      expect(d).toEqual('10hello');
    });
  });

  describe('Generic spread expressions in object literals', () => {
    function taggedObject<T, U extends string>(obj: T, tag: U): T & { tag: U } {
      return { ...obj, tag };
    }

    it('should create an intersection type', (): void => {
      const intersectionObj: { x: number; y: number } & { tag: 'point' } = taggedObject(
        { x: 10, y: 20 },
        'point'
      );
      expect(intersectionObj.x).toBe(10);
      expect(intersectionObj.tag).toBe('point');
    });

    function nonGenericSpread<T>(
      t: T,
      obj1: { a: string },
      obj2: { b: string }
    ): { a: string; x: number } & T & { b: string; y: number } {
      return { ...obj1, x: 1, ...t, ...obj2, y: 2 };
    }

    it('should merge non-generic spread expressions', (): void => {
      const intersectionObj: { x: number; y: number } & { tag: 'point' } = taggedObject(
        { x: 10, y: 20 },
        'point'
      );
      const nonGenSpreadObj: { a: string; x: number } & { x: number; y: number } & {
        tag: 'point';
      } & {
        b: string;
        y: number;
      } = nonGenericSpread(intersectionObj, { a: 'hello, ' }, { b: 'world' });
      expect(nonGenSpreadObj.tag).toEqual('point');
    });

    it('should merge non-generic spread expressions', (): void => {
      const intersectionObj: { x: number; y: number } & { tag: 'point' } = taggedObject(
        { x: 10, y: 20 },
        'point'
      );
      const nonGenSpreadObj: { a: string; x: number } & { x: number; y: number } & {
        tag: 'point';
      } & {
        b: string;
        y: number;
      } = nonGenericSpread(intersectionObj, { a: 'hello, ' }, { b: 'world' });
      expect(nonGenSpreadObj.tag).toEqual('point');
    });

    function genericSpread<T, U>(t: T, u: U): T & U {
      return { ...t, ...u };
    }

    it('should produce an intersection using a generic spread', (): void => {
      const x: { a: string; b: number } = { a: 'hi', b: 19 };
      const y: { b: string; c: boolean } = { b: 'world ', c: true };
      const s1: { a: string; b: string; c: boolean } = { ...x, ...y };
      const s2: { a: string; b: number } & { b: string; c: boolean } = genericSpread(x, y);
      const b1: string = s1.b;
      const b2: number & string = s2.b;
      expect(b1).toEqual('world ');
      expect(b2).toBe('world ');
      const reverseSpread: { b: string; c: boolean } & {
        a: string;
        b: number;
      } = genericSpread(y, x);
      const b3: string & number = reverseSpread.b;
      expect(b3).toBe(19);
    });

    it('generic spread can include object methods', (): void => {
      const x: { a: string; b: number; greet: (name: string) => string } = {
        a: 'hi',
        b: 19,
        greet: (name: string): string => 'Hi, ' + name,
      };
      const y: { b: string; c: boolean } = { b: 'world ', c: true };
      const genSpread: { a: string; b: number; greet: (name: string) => string } & {
        b: string;
        c: boolean;
      } = genericSpread(x, y);
      expect(genSpread.greet).toBeDefined();
      expect(genSpread.greet('Leonardo')).toBe('Hi, Leonardo');
    });
  });
  describe('Generic object rest variables and parameters', (): void => {
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#generic-object-rest-variables-and-parameters
    function excludeTag<T extends { tag: string }>(obj: T): Pick<T, Exclude<keyof T, 'tag'>> {
      const { tag, ...rest } = obj;
      console.log(tag);
      return rest; // Pick<T, Exclude<keyof T, "tag">>
    }

    interface TagPoint {
      x: number;
      y: number;
      tag: string;
    }
    it('should exclude tag after calling generic function', (): void => {
      const taggedPoint: TagPoint = { x: 10, y: 20, tag: 'point' };
      const point: Pick<TagPoint, 'x' | 'y'> = excludeTag(taggedPoint); // { x: number, y: number }
      expect(point.x).toEqual(10);
      expect(point.y).toEqual(20);
    });
  });
  describe('BitInt', (): void => {
    // returns ints that can get *so* big!
    function fibonacci(n: bigint): bigint {
      let result = 1n;
      for (let last = 0n, i = 0n; i < n; i++) {
        const current = result;
        result += last;
        last = current;
      }
      return result;
    }

    it('should calculate fibonacci with bigint', (): void => {
      const reallyBig: bigint = fibonacci(100n);
      expect(reallyBig).toEqual(573147844013817084101n);
    });
  });
  describe('Non-unit types as union discriminants', (): void => {
    type Result<T> = { error: Error; data: null } | { error: null; data: T };

    function unwrap<T>(result: Result<T>): T {
      if (result.error) {
        // Here 'error' is non-null
        throw result.error;
      }

      // Now 'data' is non-null
      return result.data;
    }
    it('should unwrap data from generic fn', (): void => {
      const numberResult: Result<number> = { error: null, data: 3 };
      const actual = unwrap(numberResult);
      expect(actual).toEqual(3);
    });
    it('should throw error', (): void => {
      const err = new Error('should throw');
      const errResult = {
        error: err,
        data: null,
      };
      expect(() => unwrap(errResult)).toThrowError('should throw');
    });
  });
});

// Others
// tsconfig inheritance via npm packages
// { "extends": "@my-team/tsconfig-base",
//   "compilerOptions: {
//      // override certain options on project basis
//      // such as additive for UI
//      "jsx": "React"
//      "target": "es5"
//   "}
// }
//
// show merged config with
// tsc --showConfig
