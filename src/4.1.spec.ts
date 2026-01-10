

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

});
