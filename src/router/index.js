import Vue from 'vue';
import Router from 'vue-router';
import Finance from '../views/finance/route';

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
                {
                    path: 'Home',
                    name: 'Home',
                    component: () => import(/* webpackChunkName: "tabs" */ 'views/Home'),
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
