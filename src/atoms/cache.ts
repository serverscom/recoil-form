import {
  atom,
  selector,
  AtomOptions,
  RecoilState,
  ReadOnlySelectorOptions,
  ReadWriteSelectorOptions,
  RecoilValue,
} from 'recoil';

const VALUE = Symbol('value');

type Cache = ITree & IValue;

interface ITree {
  [property: string]: Cache;
}

interface IValue {
  [VALUE]?: RecoilState<any>;
}

const cache: Cache = {};

function define<TArgs extends any[]>(
  creator: typeof atom,
  optionsGetter: (...args: TArgs) => AtomOptions<any>
): (...args: TArgs) => RecoilState<any>;
function define<TArgs extends any[]>(
  creator: typeof selector,
  optionsGetter: (
    ...args: TArgs
  ) => ReadOnlySelectorOptions<any> | ReadWriteSelectorOptions<any>
): (...args: TArgs) => RecoilValue<any>;
function define(creator: any, optionsGetter: any) {
  return (...args: any[]) => {
    const options = optionsGetter(...args);
    const path = options.key.split('/');
    let node = cache;
    for (const segment of path) {
      if (!node[segment]) {
        node[segment] = {};
      }

      node = node[segment];
    }

    if (!node[VALUE]) {
      node[VALUE] = creator(options);
    }

    return node[VALUE]!;
  };
}

export function defineAtom<TArgs extends any[]>(
  fn: (...args: TArgs) => AtomOptions<any>
) {
  return define(atom, fn);
}

export function defineSelector<TArgs extends any[]>(
  fn: (
    ...args: TArgs
  ) => ReadOnlySelectorOptions<any> | ReadWriteSelectorOptions<any>
) {
  return define(selector, fn);
}

export function release(key: string): void {
  const path = key.split('/');
  const lastSegment = path.pop();
  let node = cache;
  for (const segment of path) {
    if (segment in node) {
      node = node[segment];
    } else {
      // Path doesn't exist. Probably, it has been deleted before.
      return;
    }
  }

  if (node && lastSegment) delete node[lastSegment];
}
