import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import { Form, Field } from '../dist';

const initialValues = {
  email: 'some@email.com',
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
            <button type="submit">Login</button>
            <button type="reset">Reset</button>
          </div>
        </Form>
      </div>
    </RecoilRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
