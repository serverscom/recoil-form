import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import { Form, Field, useFormValues } from '../dist';

const initialValues = {
  email: 'some@email.com',
  delayed: new Promise(resolve =>
    setTimeout(() => resolve('delayed value'), 3000)
  ),
};

const onSubmit = (values) => console.log(values);

const Values = () => {
  const values = useFormValues();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

const FieldSet = () => {
  return (
    <>
      <div>
        <label>
          Email:
          <Field name="email" type="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <Field name="password" type="password" />
        </label>
      </div>
      <div>
        <label>
          Delayed field:
          <Field name="delayed" type="text" fallback="loading..." />
        </label>
      </div>
      <div>
        <label>
          <Field name="checkbox" type="checkbox" />
          Checkbox
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </div>
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        <FieldSet />
        <React.Suspense fallback={<div>Loading…</div>}>
          {' '}
          <Values />
        </React.Suspense>
      </Form>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
