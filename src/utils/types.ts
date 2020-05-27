import * as React from 'react';

// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
export type PropsOf<
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>;

export interface PolymorphicComponentOwnProps<E extends React.ElementType = React.ElementType> {
  as?: E;
}

export type PolymorphicComponentProps<E extends React.ElementType> = PolymorphicComponentOwnProps<E> &
  Omit<PropsOf<E>, keyof PolymorphicComponentOwnProps>;

export interface AnyObject extends JSX.LibraryManagedAttributes<any, any> {
  [key: string]: any;
}
