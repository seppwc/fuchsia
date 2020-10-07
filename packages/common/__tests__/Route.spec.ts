import { Route } from '../Route';
import { HTTP } from '../constants';

describe('Route Component', () => {
  it.each([
    [
      { path: '/', method: 'GET', callback: async () => {} },
      ['/', HTTP.GET, Function],
    ],
    [
      { path: '/one', method: 'POST', callback: async () => {} },
      ['/one', HTTP.POST, Function],
    ],
    [
      { path: '/two', method: 'DELETE', callback: async () => {} },
      ['/two', HTTP.DELETE, Function],
    ],
    [
      { path: '/three', method: 'PUT', callback: async () => {} },
      ['/three', HTTP.PUT, Function],
    ],
    [{ callback: async () => {} }, ['/', HTTP.GET, Function]],
  ])('', (a, expected) => {
    const r = new Route(a);
    expect(r).toHaveProperty('path');
    expect(r.path).toBe(expected[0]);
    expect(r).toHaveProperty('method');
    expect(r.method).toBe(expected[1]);
    expect(r).toHaveProperty('callback');
    expect(r.callback).toBeInstanceOf(Function);
  });
});
