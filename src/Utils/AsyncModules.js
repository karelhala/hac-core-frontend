import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';

export const ModuleContext = createContext({});

export const asyncLoader = async (container, module) => {
  if (typeof container === 'undefined') {
    throw new Error("container can't be undefined");
  }
  if (typeof module === 'undefined' || module.length === 0) {
    throw new Error("Module can't be undefined or empty");
  }

  if (!module.startsWith('./')) {
    console.warn(
      `Your module ${module} doesn't start with './' this indicates an error`
    );
  }

  // eslint-disable-next-line no-undef
  await __webpack_init_sharing__('default');
  const factory = await container.get(module);
  return factory();
};

export function useModule(scope, module, defaultState) {
  const moduleMap = useContext(ModuleContext);
  const [data, setData] = useState(defaultState);
  const fetchModule = useCallback(async () => {
    const Module = await asyncLoader(moduleMap[scope], module);
    setData(() => Module);
  }, [scope, module, moduleMap]);

  useEffect(() => {
    if (Object.keys(moduleMap).length > 0) {
      fetchModule();
    }
  }, [fetchModule, moduleMap]);

  return data;
}
