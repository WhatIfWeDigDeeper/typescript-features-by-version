// https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/
describe('3.5 https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/', () => {
  describe('smarter union types', () => {
    interface S {
      done: boolean;
      value: number;
    }
    type T = { done: false; value: number } | { done: true; value: number };

    it('should allow assigning T to S by decomposing S into every combination', () => {
      const isNotDone: T = { done: false, value: 1 };
      const moreGeneral: S = isNotDone;
      expect(moreGeneral.done).toEqual(isNotDone.done);
    });
  });

  describe('Omit helper to streamline pick & exclude usage', () => {
    interface WitnessRelocation {
      name: string;
      age: number;
      relocation: string;
    }
    // previous way
    type WhitelistedKeys = Exclude<keyof Witness, 'relocation'>;
    type PersonOfInterest = Pick<Witness, WhitelistedKeys>;
    // Omit
    type Witness = Omit<WitnessRelocation, 'relocation'>;

    it('should omit a property', () => {
      const witness: WitnessRelocation = {
        name: 'William',
        age: 92,
        relocation: 'Austin',
      };
      expect(witness.relocation).toEqual('Austin');
      const omitPerson: Witness = {
        name: 'Bill',
        age: 29,
      };
      const pickExcludePerson: PersonOfInterest = {
        name: 'Bill',
        age: 29,
      };
      expect(omitPerson.age).toEqual(pickExcludePerson.age);
    });
  });

  describe('Higher order type inference from generic constructors', () => {
    class Box<T> {
      public kind: 'box' = 'box';
      public value: T;
      constructor(value: T) {
        this.value = value;
      }
    }

    class Bag<U> {
      public kind: 'bag' = 'bag';
      public value: U;
      constructor(value: U) {
        this.value = value;
      }
    }

    function composeCtor<T, U, V>(
      F: new (x: T) => U,
      G: new (y: U) => V
    ): (x: T) => V {
      return (x: T): V => new G(new F(x));
    }

    it('should compose generic constructor functions', () => {
      const f: <T>(x: T) => Bag<Box<T>> = composeCtor(Box, Bag);
      const bagBox: Bag<Box<number>> = f(1024);
      const box: Box<number> = bagBox.value;
      expect(box.value).toEqual(1024);
    });
  });
});
