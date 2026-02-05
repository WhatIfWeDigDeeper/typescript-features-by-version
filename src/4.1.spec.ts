

describe('4.1', (): void => {
  describe('Template Literal Types', (): void => {
    type VerticalAlignment = "top" | "middle" | "bottom";
    type HorizontalAlignment = "left" | "center" | "right";

    // Takes
    //   | "top-left"    | "top-center"    | "top-right"
    //   | "middle-left" | "middle-center" | "middle-right"
    //   | "bottom-left" | "bottom-center" | "bottom-right"
    const setAlignment = (value: `${VerticalAlignment}-${HorizontalAlignment}`): void => {
      // No-op function to demonstrate template literal types
      void value;
    };

    it('should support template literal types', async (): Promise<void> => {
      setAlignment("top-left");   // works!
      // @ts-expect-error spelling mistake is caught
      setAlignment("top-middel"); // error!
      // Placeholder for template literal types demonstration
      expect(true).toBe(true);
    });

    it('new type alias Uppercase, Lowercase, Capitalize, and Uncapitalize', (): void => {
      type UppercaseGreeting<T extends string> = `${Uppercase<T>}`;
      type LowercaseGreeting<T extends string> = `${Lowercase<T>}`;
      type CapitalizedGreeting<T extends string> = `${Capitalize<T>}`;
      type UncapitalizedGreeting<T extends string> = `${Uncapitalize<T>}`;

      type HELLO = UppercaseGreeting<"Hello">;
      type hello = LowercaseGreeting<"HELLO">;
      type Hello = CapitalizedGreeting<"hELLO">;
      type hELLO = UncapitalizedGreeting<"HELLO">;

      const upper: HELLO = "HELLO";
      const lower: hello = "hello";
      const capitalized: Hello = "HELLO"; // Only first letter is capitalized
      const uncapitalized: hELLO = "hELLO";

      // @ts-expect-error does not match UPPERCASE of HELLO type
      const invalidUpper: HELLO = "hello";

      // @ts-expect-error does not match lowercase
      const invalidLower: hello = "HELLO";

      expect(upper).toBe("HELLO");
      expect(lower).toBe("hello");
      expect(capitalized).toBe("HELLO");
      expect(uncapitalized).toBe("hELLO");
      // Suppress unused variable errors
      expect(invalidUpper).toBe("hello");
      expect(invalidLower).toBe("HELLO");
    });
  });

  describe('Key Remapping in Mapped Types with "as"', (): void => {
    it('new syntax "as" clause in mapped types easily create prop names from existing', () => {
      type Getters<T> = {
        [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
      };

      interface Person {
        name: string;
        age: number;
        location: string;
      }

      type LazyPerson = Getters<Person>;

      const lazyPerson: LazyPerson = {
        getName: () => "John Doe",
        getAge: () => 30,
        getLocation: () => "New York"
      };

      expect(lazyPerson.getName()).toBe("John Doe");
      expect(lazyPerson.getAge()).toBe(30);
      expect(lazyPerson.getLocation()).toBe("New York");
    });

    it('can filter out keys by producing never', (): void => {
      // Producing `never` in the `as` clause filters out the key
      type RemoveKindField<T> = {
        [K in keyof T as Exclude<K, "kind">]: T[K]
      };

      interface Circle {
        kind: "circle";
        radius: number;
      }

      type KindlessCircle = RemoveKindField<Circle>;

      const circle: KindlessCircle = {
        radius: 10
        // Note: no 'kind' property needed or allowed
      };

      // Verify 'kind' is not in the type
      type HasKind = "kind" extends keyof KindlessCircle ? true : false;
      const hasKind: HasKind = false;

      expect(circle.radius).toBe(10);
      expect(hasKind).toBe(false);
    });
  });

  describe('Recursive Conditional Types', (): void => {
    it('can deeply unwrap Promise types', (): void => {
      // Before 4.1, this would cause infinite instantiation errors
      type Awaited<T> =
        T extends null | undefined ? T :
        T extends object & { then(onfulfilled: infer F): unknown } ?
          F extends ((value: infer V) => unknown) ?
            Awaited<V> :
            never :
        T;

      type P1 = Awaited<Promise<string>>;
      type P2 = Awaited<Promise<Promise<number>>>;
      type P3 = Awaited<Promise<Promise<Promise<boolean>>>>;

      const p1: P1 = "hello";
      const p2: P2 = 42;
      const p3: P3 = true;

      expect(p1).toBe("hello");
      expect(p2).toBe(42);
      expect(p3).toBe(true);
    });

    it('can deeply flatten arrays', (): void => {
      type ElementType<T> =
        T extends ReadonlyArray<infer U> ? ElementType<U> : T;

      type Nested = number[][][];
      type Flattened = ElementType<Nested>;

      const value: Flattened = 42;

      // @ts-expect-error cannot assign array to flattened type
      const invalid: Flattened = [42];

      expect(value).toBe(42);
      expect(invalid).toEqual([42]);
    });

    it('can build recursive JSON types', (): void => {
      type JSONValue =
        | string
        | number
        | boolean
        | null
        | JSONValue[]
        | { [key: string]: JSONValue };

      const json: JSONValue = {
        name: "John",
        age: 30,
        active: true,
        metadata: null,
        tags: ["developer", "typescript"],
        nested: {
          deeply: {
            value: 123
          }
        }
      };

      expect(json).toEqual({
        name: "John",
        age: 30,
        active: true,
        metadata: null,
        tags: ["developer", "typescript"],
        nested: {
          deeply: {
            value: 123
          }
        }
      });
    });
  });

  describe('Checked Indexed Accesses (--noUncheckedIndexedAccess)', (): void => {
    // Note: This feature requires the --noUncheckedIndexedAccess compiler flag
    // When enabled, accessing an index signature returns T | undefined

    it('demonstrates indexed access behavior', (): void => {
      interface Options {
        path: string;
        permissions: number;
        // Index signature for extra properties
        [key: string]: string | number;
      }

      const opts: Options = {
        path: "/home",
        permissions: 755
      };

      // Known properties are fine
      const path: string = opts.path;
      const permissions: number = opts.permissions;

      // With --noUncheckedIndexedAccess, opts["extra"] would be string | number | undefined
      // This test demonstrates the pattern for safe access
      const extra = opts["extra"];
      const safeExtra: string | number | undefined = extra;

      expect(path).toBe("/home");
      expect(permissions).toBe(755);
      expect(safeExtra).toBeUndefined();
    });

    it('demonstrates array index access patterns', (): void => {
      const arr: string[] = ["a", "b", "c"];

      // With --noUncheckedIndexedAccess, arr[0] would be string | undefined
      // Safe pattern: check before use
      const first = arr[0];
      if (first !== undefined) {
        const upperFirst: string = first.toUpperCase();
        expect(upperFirst).toBe("A");
      }

      // Accessing out of bounds
      const outOfBounds = arr[100];
      expect(outOfBounds).toBeUndefined();
    });
  });
});
