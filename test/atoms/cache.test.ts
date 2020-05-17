import { defineAtom, release } from '../../src/atoms/cache';

const getter = defineAtom(key => ({ key, default: {} }));

describe('cache for atoms', () => {
  it('should create new atoms', () => {
    expect(getter('test1')).toEqual({ key: 'test1' });
    expect(getter('test2')).toEqual({ key: 'test2' });
  });

  it('should reuse created atom', () => {
    const testAtom = getter('test');
    expect(getter('test')).toBe(testAtom);
  });

  it('should recreate atom after releasing', () => {
    const originalAtom = getter('test');
    release('test');
    const recreatedAtom = getter('test');
    expect(originalAtom).toEqual(recreatedAtom);
    expect(originalAtom).not.toBe(recreatedAtom);
  });

  it('should release all nested atoms', () => {
    const originalAtom = getter('namespace/form/field');
    expect(getter('namespace/form/field')).toBe(originalAtom);
    release('namespace/form');
    const recreatedAtom = getter('namespace/form/field');
    expect(originalAtom).toEqual(recreatedAtom);
    expect(originalAtom).not.toBe(recreatedAtom);
  });
});
