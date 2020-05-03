// import type to disambiguate files exporting both types and values
import type { Person } from './3.8sample';
import { fullName } from './3.8sample';
// export * as ns Syntax
export * as sample3_8 from './3.8sample';

describe('3.8', () => {
    describe('import type', () => {
        it('should import type (see import type)', () => {
            const person: Person = {
                firstName: 'Jeremy',
                lastName: 'Bearimy',
            };

            expect(fullName(person)).toEqual('Jeremy Bearimy');
        });
    });
    describe('ECMA Script private fields', () => {
        /**
         * Rules
         * 1. Private fields start with a # character. Sometimes we call these private names.
         * 2. Every private field name is uniquely scoped to its containing class.
         * 3. TypeScript accessibility modifiers like public or private can’t be used on private fields.
         * 4. Private fields can’t be accessed or even detected outside of the containing class – even by JS users!
         *    Sometimes we call this hard privacy.
         */
        class C {
            #foo = 10;

            public cHelper(): number {
                return this.#foo;
            }
        }

        class D extends C {
            #foo = 20;

            public dHelper(): number {
                return this.#foo;
            }
        }
        it('should have different values for subclasses since each private field is unique', () => {
            const instance = new D();
            expect(instance.cHelper()).toEqual(10);
            expect(instance.dHelper()).toEqual(20);
        });
    });
});

/*
Other features

NEW: top-level await
Rules:
 - must be at top of file
 - must be a module, meaning have import or export statements
 - target compiler option is >= ES2017 and module is ESNext or System
const response = await fetch("...");
const greeting = await response.text();
console.log(greeting);

// Make sure we're a module
export {};

NEW: tsconfig options for file/directory watching
"watchOptions": {
    // Use native file system events for files and directories
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",

    // Poll files for updates more frequently
    // when they're updated a lot.
    "fallbackPolling": "dynamicPriority"
}

*/
