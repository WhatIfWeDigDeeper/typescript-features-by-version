describe('4.0', (): void => {
  describe('Variadic Tuple Types', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function tail<T extends any[]>(arr: readonly [any, ...T]): readonly T[] {
      const [, ...rest] = arr;
      return rest;
    }
    it('spreads in tuple types can be generic', (): void => {
      const myTuple = [1, 2, 3, 4] as const;
      const myArray = ['hello', 'world'];

      const r1 = tail(myTuple);
      expect(r1).toEqual([2, 3, 4]);

      const r2 = tail([...myTuple, ...myArray] as const);
      expect(r2).toEqual([2, 3, 4, 'hello', 'world']);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type Arr = readonly any[];

    function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
      return [...arr1, ...arr2];
    }
    it('rest elements can be placed anywhere in a tuple or array', (): void => {
      const ary1 = [1, 2, 3];
      const ary2 = ['hello', 'world'];
      const result = concat(ary1, ary2);
      expect(result).toEqual([1, 2, 3, 'hello', 'world']);
    });

    type Ary = readonly unknown[];

    function partialCall<T extends Ary, U extends Ary, R>(
      f: (...args: [...T, ...U]) => R,
      ...headArgs: T
    ): (...tailArgs: U) => R {
      return (...tailArgs: U): R => f(...headArgs, ...tailArgs);
    }

    const foo = (x: string, y: number, z: boolean): { x: string; y: number; z: boolean } => ({
      x,
      y,
      z,
    });

    it('inference works to enforce param in partially applied fns', (): void => {
      // @ts-expect-error expects 3 args
      partialCall(foo, 'hello', 100, true, 'oops');
      const f3 = partialCall(foo, 'hello');
      // @ts-expect-error must pass required params for the partially applied fn
      f3();

      const result = f3(10, true);

      expect(result).toEqual({ x: 'hello', y: 10, z: true });
    });
  });
  describe('Labeled Tuple Elements', (): void => {
    type Range = [start: number, end: number];

    function totalRange(...range: Range): [total: number, range: Range] {
      const [start, end] = range;
      const total = end - start;
      return [total, range];
    }

    it('allows labeling tuples for better communication of intent', (): void => {
      const [total] = totalRange(0, 10);
      expect(total).toBe(10);
    });

    type Name = [first: string, last: string] | [first: string, middle: string, last: string];
    interface Person {
      name: Name;
      age: number;
    }

    function createPerson(name: Name, age: number): Person {
      return {
        name,
        age,
      };
    }

    it('supports overloads in a type safe way', (): void => {
      const person = createPerson(['Homer', 'Simpson'], 45);

      expect(person.name).toEqual(['Homer', 'Simpson']);
      expect(person.age).toBe(45);

      const personWithMiddleName = createPerson(['Homer', 'J', 'Simpson'], 45);
      expect(personWithMiddleName.name).toEqual(['Homer', 'J', 'Simpson']);
    });
  });
  describe('Class Property Inference from Constructors', (): void => {
    class Square {
      sideLength;
      constructor(sideLength: number) {
        this.sideLength = sideLength;
      }
      get area(): number {
        return this.sideLength ** 2;
      }
    }
    it('infers property types from constructor', (): void => {
      const square = new Square(5);
      expect(square.area).toBe(25);
    });
  });
  describe('Short-Circuiting Assignment Operators', (): void => {
    it('adds assignments operator to logical operations', (): void => {
      let a = false;
      const b = true;
      // previous way
      if (!a) {
        a = b;
      }
      expect(a).toBe(true);

      a = false;
      a ||= b;
      expect(a).toBe(true);
    });
  });
  describe('unknown on catch Clause Bindings to replace any', (): void => {
    // may be opt-in behavior in the future for non-typed catch variable
    it('unknown should force type checking', (): void => {
      try {
        throw 'something';
      } catch (e: unknown) {
        // @ts-expect-error Can't access values on unknowns
        console.log(e.toUpperCase());
        // Object is of type 'unknown'.

        if (typeof e === 'string') {
          // We've narrowed 'e' down to the type 'string'.
          expect(e).toBe('something');
          return;
        }
        fail('should be a string');
      }
    });
  });
});
