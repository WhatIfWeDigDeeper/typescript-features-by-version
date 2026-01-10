

describe('4.1', (): void => {
  describe('Template Literal Types', (): void => {
    type VerticalAlignment = "top" | "middle" | "bottom";
    type HorizontalAlignment = "left" | "center" | "right";

    // Takes
    //   | "top-left"    | "top-center"    | "top-right"
    //   | "middle-left" | "middle-center" | "middle-right"
    //   | "bottom-left" | "bottom-center" | "bottom-right"
    const setAlignment = (_value: `${VerticalAlignment}-${HorizontalAlignment}`): void => {
      // No-op function to demonstrate template literal types
    };

    it('should support template literal types', async (): Promise<void> => {
      setAlignment("top-left");   // works!
      // @ts-expect-error
      setAlignment("top-middel"); // error!
      // Placeholder for template literal types demonstration
      expect(true).toBe(true);
    });

    it('new type alias Uppercase, Lowercase, Capitalize, and Uncapitalize', () => {
      type EnthusiasticGreeting<T extends string> = `${Uppercase<T>}`
      type HELLO = EnthusiasticGreeting<"hello">;

      // @ts-expect-error
      const invalidGreeting: HELLO = "hello"; // should error

      const validGreeting: HELLO = "HELLO";

      expect(validGreeting).toBe("HELLO");
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
  });
});
