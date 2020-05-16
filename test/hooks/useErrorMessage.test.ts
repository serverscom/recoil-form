import { useErrorMessage } from '../../src';

describe('`useErrorMessage` hook', () => {
  it('should be defined', () => {
    expect(useErrorMessage).toBeDefined();
  });

  it('should throw an error', () => {
    expect(useErrorMessage).toThrowError();
  });
});
