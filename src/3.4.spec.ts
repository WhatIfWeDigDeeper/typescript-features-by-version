describe('3.4', () => {
  describe('Higher order type inference from generic functions', () => {
    function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
      return (x: A): C => g(f(x));
    }

    interface Box<T> {
      value: T;
    }

    function makeArray<T>(x: T): T[] {
      return [x];
    }

    function makeBox<U>(value: U): Box<U> {
      return { value };
    }

    const makeBoxedArray: <T>(arg: T) => Box<T[]> = compose(makeArray, makeBox);

    it('should propagate the type through the generic functions', () => {
      const boxWithArray = makeBoxedArray('hello!');
      const ary = boxWithArray.value;
      expect(ary[0].toUpperCase()).toEqual('HELLO!');
    });
  });
  describe('new readonly syntax for arrays and tuples', () => {
    it('should match behavior of ReadonlyArray<T> with readonly T[]', () => {
      const typedArraySyntax: ReadonlyArray<string> = ['im', 'peach'];
      // compiler disallows mutation
      // typedArraySyntax.push('mint');
      const readonlyArraySyntax: readonly string[] = ['im', 'peach'];
      // compiler disallows mutation
      // readonlyArraySyntax.push('mint');
      expect(typedArraySyntax).toEqual(readonlyArraySyntax);
    });
    it('should prevent mutations on a readonly tuple', () => {
      const readonlyTuple: readonly [number, string] = [365, 'days'];
      // compiler disallows mutation
      // readonlyTuple[0] = 366;

      // assigning variables to primitives will not modify the original tuple
      let [, timePeriod] = readonlyTuple;
      timePeriod = 'minutes';
      expect(readonlyTuple[1]).not.toEqual(timePeriod);
    });
    it('should allow mutations on an object in a readonly tuple', () => {
      const readonlyTuple: readonly [number, { timePeriod: string }] = [
        365,
        { timePeriod: 'days' },
      ];
      // compiler disallows mutation
      // readonlyTuple[0] = 366;

      // but allows direct modification of an object
      // readonlyTuple[1].timePeriod = 'minutes';
      const [, duration] = readonlyTuple;
      duration.timePeriod = 'minutes';
      expect(readonlyTuple[1].timePeriod).toEqual(duration.timePeriod);
    });
    it('should only apply to arrays and tuples', () => {
      // not allowed
      // const set: readonly Set<number>
      const set = new Set<number>();
      set.add(20);

      const readonlySet: ReadonlySet<number> = new Set(set);
      // disallowed by compiler
      // readonlySet.add(21);
      expect(readonlySet.has(20)).toBe(true);
      set.add(21);
      expect(readonlySet.has(21)).toBe(false);
    });
    it('should strip off readonly and make writable again', () => {
      type Writable<T> = {
        -readonly [K in keyof T]: T[K];
      };
      type MutableNumbers = Writable<readonly number[]>;

      const readonlyNumberArray: readonly number[] = [10, 9, 8];
      // disallowed
      // readonlyNumberArray[0] = 2;

      const writableArray: MutableNumbers = readonlyNumberArray as MutableNumbers;
      writableArray[0] = 1;
      expect(writableArray[0]).toEqual(readonlyNumberArray[0]);
    });
  });
  describe('const assertions', () => {
    // see https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802/

    type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; sideLength: number };

    function getShapes(): readonly Shape[] {
      const result = [
        { kind: 'circle', radius: 100 },
        { kind: 'square', sideLength: 50 },
      ] as const;

      // before there would be "some terrible error message because TypeScript inferred
      // 'kind' to have the type 'string' instead of
      // either '"circle"' or '"square"'.
      return result;
    }
    it('should help the compiler by not widening literals & treating as readonly', () => {
      for (const shape of getShapes()) {
        if (shape.kind === 'circle') {
          expect(shape.radius).toEqual(100);
        } else {
          expect(shape.sideLength).toEqual(50);
        }
      }
    });
    it('does not make fully immutable', () => {
      const arr = [1, 2, 3, 4];
      const foo = {
        name: 'foo',
        contents: arr,
      } as const;

      // error!
      // foo.name = 'bar';
      // error!
      // foo.contents = [];

      // ...works!
      foo.contents.push(5);
      expect(foo.contents.length).toEqual(5);
    });
    it('const props does make fully immutable', () => {
      const arr = [1, 2, 3, 4] as const;
      const foo = {
        name: 'foo',
        contents: arr,
      } as const;

      // error!
      // foo.name = 'bar';
      // error!
      // foo.contents = [];
      // error!
      // foo.contents.push(5);
      expect(foo.contents.length).toEqual(4);
    });
  });
  describe('typeof array as const', (): void => {
    // https://dev.to/andreasbergqvist/typescript-get-types-from-data-using-typeof-4b9c
    it('should convert array as const to type', (): void => {
      const dataAry = ['Text 1', 'Text 2'] as const;

      type Data = typeof dataAry[number];

      const fn = (data: Data): void => {
        expect(data === 'Text 1' || data === 'Text 2').toBe(true);
      };
      fn('Text 2');

      const found: Data | undefined = dataAry.find((x: Data): boolean => x === 'Text 1');
      expect(found).toBe('Text 1');
    });
  });
});
