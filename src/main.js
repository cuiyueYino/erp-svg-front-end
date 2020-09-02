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
//公共方法
import base from './utils/base.js';
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)
Vue.use(base);
//全局变量文件
import globalVariable from './utils/global_variable.js';

// 路由拦截
import permission from './permission.js'

//打印
import Print from 'vue-print-nb'

import erpDialog from './components/page/erpDialog.vue'
Vue.component('erpDialog', erpDialog)

Vue.prototype.$GLOBAL = globalVariable;

Vue.config.productionTip = false;

// 将 `helpers` 绑定到 `Vue` 实例上
Vue.prototype.$helpers = helpers;
Vue.prototype.$api = api;
Vue.prototype.$Uformat = formatS;
Vue.prototype.$Uconfirm = confirmapi.installF;
Vue.use(ElementUI);

Vue.use(Print);//注册打印

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
