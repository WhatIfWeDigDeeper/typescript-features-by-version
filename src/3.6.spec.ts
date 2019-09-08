/**
 * - yields numbers
 * - returns strings
 * - can be passed in booleans
 */
function* counter(): Generator<number, string, boolean> {
    let i = 0;
    while (true) {
        if (yield i++) {
            break;
        }
    }
    return 'done!';
}

describe('generator', () => {
    it('should set value to string when done', () => {
        const iter: Generator<number, string, boolean> = counter();
        let curr: IteratorResult<number, string> = iter.next();
        while (!curr.done) {
            curr = iter.next(curr.value === 5);
        }
        expect(curr.done).toBe(true);
        expect(curr.value).toEqual('done!');
    });
});
