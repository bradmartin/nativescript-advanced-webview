import { runTestApp } from '@nativescript/unit-test-runner';

declare let require: any;


const tests1 = require.context('./tests', true, /\.ts$/);
const tests2 = require.context('./', true, /\.spec\.ts$/);

const allDemo = require.context('./app', true, /\.ts$/);
const allPlugin = require.context('../../src', true, /^\.\/(?!(?:node_modules)(?![^\/]))(.*?)(?<!\.d)\.ts$/);
function importAll(r: any) {
    r.keys().forEach((key) => {
        const excludePlatforms = [];
        if(!global.isAndroid) {
            excludePlatforms.push('android');
        }
        if(!global.isIOS) {
            excludePlatforms.push('ios');
        }
        const regExp = new RegExp(`(${excludePlatforms.join('|')})\.(ts|js)$`);
        if(regExp.test(key)) {
            return;
        }
        r(key);
    });
}

importAll(allPlugin);
// importAll(allDemo); // usually not needed

runTestApp({
    runTests: () => {
        importAll(tests1);
        importAll(tests2);
    }
})
