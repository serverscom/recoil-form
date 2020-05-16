import { useField } from '../../src';

describe('`useField` hook', () => {
  it('should be defined', () => {
    expect(useField).toBeDefined();
  });

  it('should throw an error', () => {
    expect(useField).toThrowError();
  });
});
