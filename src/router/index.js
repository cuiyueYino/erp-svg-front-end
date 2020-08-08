import Vue from 'vue';
import Router from 'vue-router';
import Finance from '../views/finance/route';
import Process from '../views/process-set/route';
import Users from '../views/user-management/route';
import Jobs from '../views/job-management/route';
import Management from '../views/management/route';
import Peoples from '../views/people-management/route';
import RoleMen from '../views/role-management/route';
import MenuMen from '../views/system-setting/route';
import DocumentManagement from '../views/document-management/route';
import InsideMail from '../views/inside-mail/route';
import confMangement from '../views/conference/route';
import collaborativeOffice from '../views/collaborative-office/route';
import OaHome from '../views/oa-home-page/route';

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
        ...Users,
        ...Jobs,
        ...Management,
        ...Peoples,
        ...RoleMen,
        ...MenuMen,
        ...DocumentManagement,
        ...InsideMail,
        ...confMangement,
        ...collaborativeOffice,
        ...OaHome,
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
    },
    {
      path: '/confMnt/login',
      name: 'confMntLogin',
      component: () => import(/* webpackChunkName: "login" */ '../components/page/ConfMntLogin.vue'),
      meta: {
        title: '会议室控制台登录'
      }
    },
    {
      path: '/confMnt',
      name: 'confManagement',
      component: () => import(/* webpackChunkName: "login" */ '../views/confmangement/conference-management.vue'),
      meta: {
        title: '会议室控制台'
      }
    }
  ]
});
