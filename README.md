# `recoil-form`: blazing fast React forms build on top of Recoil

## Installation
```
npm install --save recoil-form recoil
// or
yarn add recoil-form recoil
```

## Work in progress

This project is currently in "Work in progress" status

## API and Usage

### `Form` component

Use `Form` component as a main container for your form. This component creates a special form context, so all other components may only be used inside the `Form` component.

#### Props

##### `initialValues: { [name: string]: any | Promise<any> }`

Initial field values of the form. If promise is passed as an initial value of the field, then field is suspended until promise is resolved and resolved promise value will be used as a field value. See `Field` for more details.

##### `onSubmit: (values, { setErrors, setValues, resetForm }) => void | Promise<void>`

Your form submission handler. It is passed your forms values and special methods to change form state:

* `setErrors: ({ [name: string]: any }) => void` – set form errors by passing errors object. Key is used as field name and value is used as an error value.
* `setErrors: (name: key, value: any, ...) => void` – set form errors by passing name-value pairs
* `setValues: ({ [name: string]: any }) => void` – set form values by passing values object (similar to `initialValues`).
* `setValues: (name: key, value: any, ...) => void` – set form values by passing name-value pairs
* `resetForm: () => void` – reset form to initial state (clear form values, errors and touched states)

### `Field` component

Use `Field` component to add a new field to your form. `Field` component may represent default `input` or `select` components or any other custom component.

#### Props

##### `name: string`

Field name. The name is used as main field identifier and as a key in `values` object in `onSubmit` form handler.

##### `type?: string`

Field type. Used only if `as` property is not set. `type` defines which default underlying component will be used to represent the field. See supported types below.

##### `value?: any`

Field value. Used for `checkbox` and `radio` components. We do not use `event.target.value` internally, so you may use the value of any type. See more details below.

##### `as: ElementType`

React component which is used to render the field. Default is `'input'`.

##### `fallback: ReactNode`

If you pass a `Promise` as a field value or initial value, this promise will be used with `React.Suspense`. Component will be suspended with `fallback` until promise is resolved. Once resolved, promise value will be used as field value or initial value.

#### Supported types

##### `type="checkbox"`

Renders the checkbox. WIP.

##### `type="radio"`

Not supported yet. WIP.

##### `type="file"`

Not supported yet. WIP.

##### `component="select"`

Not supported yet. WIP.

### `ErrorMessage` component

Use `ErrorMessage` component to render error message related to the field. Error message is only shown for `touched` fields which has an truthy error value.

#### Props

##### `name: string`

The name of the field to which current error message is related.

##### `as: ElementType`

React component which is used to render the error message. Default is `'small'`.

### `FieldArray` component

Not ready yet. WIP

### `useForm` hook

Not ready yet. WIP

### `useFormState` hook

`useFormState` is a custom hook to retrieve current form state. Either `'ready'` or `'submitting'` is returned from this hook

#### Reference

`useFormState(): 'ready' | 'submitting'`

### `useFormValues` hook

`useFormValues` is a custom hook to retrieve current form values.

#### Reference

`useFormValues(): any`

### `useField` hook

`useField` is a custom React hook that will help you hook up inputs to `recoil-form`. You can use it to build your own custom input or input-related component.

#### Reference

##### `useField<TValue = any>(name: string, initialValue?: string): [FieldInputProps<TValue>, FieldMetaProps, FieldHelperProps]`

A custom React Hook that returns a 3-tuple (an array with three elements) containing `FieldProps`, `FieldMetaProps` and `FieldHelperProps`. It accepts a string of a field `name` and optional `initialValue`.

##### `FieldInputProps<Value>`

* `name: string` - The name of the field
* `value: TValue` - The field's value
* `onBlur: (event: React.FocusEvent) => void` - A blur event handler
* `onChange: (event: React.ChangeEvent<any>) => void` - A change event handler

##### `FieldMetaProps<Value>`

WIP

##### `FieldHelperProps`

An object that contains helper functions which you can use to imperatively change the value, error value or touched status for the field in question. This is useful for components which need to change a field's status directly, without triggering change or blur events.

* `setValue(value: any): void` - A function to change the field's value
* `setTouched(value: boolean): void` - A function to change the field's touched status
* `setError(value: any): void` - A function to change the field's error value

### `useErrorMessage` / `useFieldError` hook
`useErrorMessage` (or it's alias `useFieldError`) is a custom react hook that will allow you to get the field error. Your component will be automatically re-rendered when error is changed.

#### Reference

##### `useFieldError<TValue = any>(name: string): TValue | null`

### `useFieldValue` hook

`useFieldValue` is a custom react hook that will allow you to get the current field value. Your component will be automatically re-rendered when value is changed.

### `useSetFieldError` hook

`useSetFieldError` is a custom React hook that will allow you to get error updater function without subscription to field's error state.

### `useSetFieldValue` hook

`useSetFieldValue` is a custom React hook that will allow you to get value updater function without subscription to field's value state.


## License

MIT
