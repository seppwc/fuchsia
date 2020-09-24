import { h } from '../h';

const mockFunction = jest.fn((a, b) => [a, b]);
h(mockFunction, { prop: 1 }, [
  h(mockFunction, { prop: 2 }, 'hello'),
  h(mockFunction, { prop: 3 }, 'goodbye'),
]);

describe('h pragma', () => {
  it('should be called and call any children inside', () => {
    expect(mockFunction.mock.calls.length).toBe(3);
  });
});
