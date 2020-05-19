import Vue from 'vue';
import Router from 'vue-router';
import Finance from '../views/finance/route';
import Process from '../views/process-set/route';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: ''
            },
            children: [
                ...Finance,
                ...Process,
                {
                    path: 'svgIndex',
                    name: 'svgIndex',
                    component: () => import(/* webpackChunkName: "tabs" */ 'views/Home/svgIndex.vue'),
                    meta: {
                        title: '工作流'
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
});
