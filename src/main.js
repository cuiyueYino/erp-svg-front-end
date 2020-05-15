import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import api from './model/api/index';
import confirmapi from './components/common/confirm/confirm';
import formatS from './utils/formatfun';
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
Vue.prototype.$api = api;
Vue.prototype.$Uformat = formatS;
Vue.prototype.$Uconfirm = confirmapi.installF;
Vue.use(ElementUI);

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `福佳集团 | ${to.meta.title} `;
    const token = localStorage.getItem('ms_tokenId');
    if (!token && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
