import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import { Form, Field } from '../dist';

const initialValues = {
  email: 'some@email.com',
  delayed: new Promise((resolve) => setTimeout(() => resolve('delayed value'), 3000)),
};

const App = () => {
  return (
    <RecoilRoot>
      <div>
        <Form initialValues={initialValues}>
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
        </Form>
      </div>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
