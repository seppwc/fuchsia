import { Controller } from '../Controller';
import { Route } from '../Route';

describe('Controller Component', () => {
  it.each([
    [{ path: '/' }, [], { path: '/', children: [], length: 0 }],
    [
      { path: '/test' },
      [new Route({ callback: async (): Promise<void> => {} })],
      {
        path: '/test',
        children: [new Route({ callback: async (): Promise<void> => {} })],
        length: 1,
      },
    ],
    [
      { path: '/test2' },
      [
        new Route({ callback: async (): Promise<void> => {} }),
        new Route({ callback: async (): Promise<void> => {} }),
      ],

      {
        path: '/test2',
        children: [
          new Route({ callback: async (): Promise<void> => {} }),
          new Route({ callback: async (): Promise<void> => {} }),
        ],
        length: 2,
      },
    ],
  ])('should take a %o prop and array of Routes', (a, b, expected) => {
    const c = new Controller(a, b);
    expect(c.path).toBe(expected.path);
    expect(c.children).toBeInstanceOf(Array);
    expect(c.children.length).toBe(expected.length);
  });
});
