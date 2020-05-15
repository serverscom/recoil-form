const RecoilForm = require('./index');

describe('`useForm` hook', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.useForm).toThrowError();
  });
});

describe('`useField` hook', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.useField).toThrowError();
  });
});

describe('`useFieldArray` hook', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.useFieldArray).toThrowError();
  });
});

describe('`useErrorMessage` hook', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.useErrorMessage).toThrowError();
  });
});

describe('`Form` component', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.Form).toThrowError();
  });
});

describe('`Field` component', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.Field).toThrowError();
  });
});

describe('`FieldArray` component', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.FieldArray).toThrowError();
  });
});

describe('`ErrorMessage` component', () => {
  it('Should throw an error', () => {
    expect(RecoilForm.ErrorMessage).toThrowError();
  });
});
