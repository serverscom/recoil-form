declare module 'recoil' {
  import React from 'react';

  type NodeKey = string;

  interface AbstractRecoilValue<T> {
    readonly key: NodeKey;
    constructor(newKey: NodeKey): AbstractRecoilValue<T>;
  }

  interface RecoilState<T> extends AbstractRecoilValue<T> {}

  interface RecoilValueReadOnly<T> extends AbstractRecoilValue<T> {}

  type DefaultValue = {};
  type RecoilValue<T> = RecoilValueReadOnly<T> | RecoilState<T>;
  type GetRecoilValue = <T>(value: RecoilValue<T>) => T;
  type SetRecoilState = <T>(
    atom: RecoilState<T>,
    value: T | DefaultValue | ((prevValue: T) => T | DefaultValue)
  ) => void;
  type ResetRecoilState = <T>(atom: RecoilState<T>) => void;

  type AtomOptions<T> = Readonly<{
    key: NodeKey;
    default: RecoilValue<T> | Promise<T> | T;
    dangerouslyAllowMutability?: boolean;
  }>;

  type ReadOnlySelectorOptions<T> = Readonly<{
    key: string;
    get: (arg: { get: GetRecoilValue }) => Promise<T> | RecoilValue<T> | T;
    dangerouslyAllowMutability?: boolean;
  }>;

  type ReadWriteSelectorOptions<T> = Readonly<
    ReadOnlySelectorOptions<T> & {
      set: (
        arg: {
          set: SetRecoilState;
          get: GetRecoilValue;
          reset: ResetRecoilState;
        },
        newValue: T | DefaultValue
      ) => void;
    }
  >;

  function atom<T>(options: AtomOptions<T>): RecoilState<T>;
  function selector<T>(
    options: ReadOnlySelectorOptions<T> | ReadWriteSelectorOptions<T>
  ): RecoilValue<T>;

  function useRecoilValue<TValue>(state: RecoilValue<TValue>): TValue;
  function useSetRecoilState<TValue>(
    state: RecoilState<TValue>
  ): React.Dispatch<React.SetStateAction<TValue>>;
}
