import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.demoangular',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  cli: {
    packageManager: 'npm'
  }
} as NativeScriptConfig;