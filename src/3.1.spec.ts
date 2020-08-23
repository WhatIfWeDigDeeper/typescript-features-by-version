describe('3.1', (): void => {
  describe('mapped types on tuples and arrays', (): void => {
      type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
      type Coordinate = [number, number];
      type PromiseCoordinate = MapToPromise<Coordinate>; // [Promise<number>, Promise<number>]

      it('when type T is a tuple, only numeric properties are converted', (): void => {
          const point: Coordinate = [10, 20];
          //const promPoint =
      });
  });
  describe('property declarations on functions', (): void => {
      it('allow setting default props on React functions', (): void => {
        const FooComponent = ({ name }: { name: string}): void => {
          // tslint:disable-next-line no-console
          console.log(name);
        }
        FooComponent.defaultProps = { name: "(anonymous)"} ;
      });
  });
});