import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';      //引入多语言组件
import store from './stores/index.js';

// 引入vconsole进行代码调试
import Vconsole from 'vconsole';
let vConsole = new Vconsole();
export default vConsole;

console.hLog = function () {
    let strResult = '';
    for (let val of [...arguments]) {
        strResult += `${typeof val === 'string' ? val : JSON.stringify(val)} `;
    }
    store.dispatch('printLog', { mark: 'H5LOG', data: strResult });
};

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);

app.mount('#app')
