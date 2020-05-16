import { ErrorMessage } from '../../src';

describe('`ErrorMessage` component', () => {
  it('should be defined', () => {
    expect(ErrorMessage).toBeDefined();
  });

  it('should throw an error', () => {
    expect(ErrorMessage).toThrowError();
  });
});
