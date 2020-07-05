describe('3.9', (): void => {
    describe('@ts-expect-error', (): void => {
        it('should expect error', (): void => {
            // @ts-expect-error
            console.log(47 * 'octopus');
        });
        it('will fail if expect error and does not error', (): void => {
            // @ts -expect-error // note had to insert space
            console.log(1 + 1);
        });
    });

    describe('stricter checks on intersections and optional properties', (): void => {
        interface A {
            a: number; // notice this is 'number'
        }

        interface B {
            b: string;
        }

        interface C {
            a?: boolean; // notice this is 'boolean'
            b: string;
        }

        type X = A & B;
        type Y = C;

        it('should error with A & B incompatible with type C', (): void => {
            const x: X = { a: 10, b: 'test' };
            let y: Y = { a: false, b: 'no' };
            y.a = true;
            // @ts-expect-error
            y = x;
        });
    });
});
