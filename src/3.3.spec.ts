describe('Improved behavior calling union types', () => {
    describe('intersection', () => {
        type Fruit = 'apple' | 'orange';
        type Color = 'red' | 'orange';

        type FruitEater = (fruit: Fruit) => number; // eats and ranks the fruit
        type ColorConsumer = (color: Color) => string; // consumes and describes the colors

        const consumeColor: ColorConsumer = (color: Color): string => color.toString();
        const rankFruits: FruitEater = (fruit: Fruit): number => {
            switch (fruit) {
                case 'apple':
                    return 1;
                case 'orange':
                    return 2;
            }
        };

        it('should allow only intersection', () => {
            let applyFn: FruitEater | ColorConsumer;

            applyFn = rankFruits;
            const fruitRank: number = applyFn('orange');
            expect(fruitRank).toBe(2);

            applyFn = consumeColor;
            const colorValue = applyFn('orange');
            expect(colorValue).toBe('orange');
            // f('orange'); // It works! Returns a 'number | string'.
            // only when intersect
            // f("apple");  // error - Argument of type '"apple"' is not assignable to parameter of type '"orange"'.

            // f("red");    // error - Argument of type '"red"' is not assignable to parameter of type '"orange"'.
        });
    });

    describe('forEach', () => {
        interface Dog {
            kind: 'dog';
            dogProp: any;
        }
        interface Cat {
            kind: 'cat';
            catProp: any;
        }

        const checkAnimal = (catOrDogArray: Dog[] | Cat[]): void => {
            catOrDogArray.forEach((animal: Dog | Cat) => {
                switch (animal.kind) {
                    case 'dog':
                        expect(animal.dogProp).toBeDefined();
                        break;
                    case 'cat':
                        expect(animal.catProp).toBeDefined();
                        break;
                }
            });
        };

        it('should allow cat or dog union in forEach', () => {
            const cats: Cat[] = [
                { kind: 'cat', catProp: 'Siamese' },
                { kind: 'cat', catProp: 'Tabby' },
            ];
            const dogs: Dog[] = [
                { kind: 'dog', dogProp: 'Terrier' },
                { kind: 'dog', dogProp: 'Bulldog' },
            ];
            checkAnimal(cats);
            checkAnimal(dogs);
        });
    });
});
