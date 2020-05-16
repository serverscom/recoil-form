import { useForm } from '../../src';

describe('`useForm` hook', () => {
  it('should be defined', () => {
    expect(useForm).toBeDefined();
  });

  it('should throw an error', () => {
    expect(useForm).toThrowError();
  });
});
