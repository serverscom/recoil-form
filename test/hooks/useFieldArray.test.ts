import { useFieldArray } from '../../src';

describe('`useFieldArray` hook', () => {
  it('should be defined', () => {
    expect(useFieldArray).toBeDefined();
  });

  it('should throw an error', () => {
    expect(useFieldArray).toThrowError();
  });
});
