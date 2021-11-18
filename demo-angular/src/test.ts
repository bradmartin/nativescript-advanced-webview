import { runTestApp } from '@nativescript/unit-test-runner';
// import other polyfills here

declare let require: any;

runTestApp({
    runTests: () => {
        const tests = require.context('../../src', true, /^\.\/(?!(?:node_modules)(?![^\/]))(.*?)\.spec\.ts$/);
        tests.keys().map(tests);
    }
})