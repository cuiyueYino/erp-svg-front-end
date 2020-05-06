import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';

// `element-ui`样式
import 'element-ui/lib/theme-chalk/index.css';

// 扩展图标
import 'assets/iconfont/iconfont.css';

// 导入全局样式
import 'assets/styles/index.scss';

// 注册全局组件
import 'components/index.js';

// 辅助工具
import * as helpers from 'helpers';

Vue.config.productionTip = false;

// 将 `helpers` 绑定到 `Vue` 实例上
Vue.prototype.$helpers = helpers;

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
