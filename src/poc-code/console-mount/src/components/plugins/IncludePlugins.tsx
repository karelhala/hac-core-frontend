import * as React from 'react';
import { initConsolePlugins } from '@console/dynamic-plugin-sdk/src/runtime/plugin-init';
import { /* ActivePlugin, */ PluginStore } from '@console/plugin-sdk';
import { useReduxStore } from '../../redux';
import { getEnabledDynamicPluginNames } from './utils';

type PluginProps = {
  onPluginRegister: Function
}

const IncludePlugins = ({ onPluginRegister }: PluginProps) => {
  const store = useReduxStore();

  React.useEffect(() => {
    if (store) {
      const activePlugins = [];
        // process.env.NODE_ENV !== 'test'
        //   ? /* eslint-disable global-require, @typescript-eslint/no-require-imports */
        //     // eslint-disable-next-line import/no-unresolved
        //     (require('@console/active-plugins').default as ActivePlugin[])
        //   : [];
      const dynamicPluginNames = getEnabledDynamicPluginNames();
      const pluginStore = new PluginStore(activePlugins, dynamicPluginNames);

      initConsolePlugins(pluginStore, store, (...rest) => onPluginRegister(pluginStore, ...rest));
    }
  }, [store]);

  return null;
};

export default IncludePlugins;
