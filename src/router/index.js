import Vue from 'vue';
import Router from 'vue-router';
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
import url404 from '../components/page/404';
import index from '../components/page/index';

Vue.use(Router);

export const constantRouterMap = [{
		path: '/',
		name: 'login',
		component: () =>
			import('../components/page/Login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '*',
		name: 'url404',
		component: url404
	},
	{
		path: '/erp',
		component: () =>
			import('../components/common/Home.vue'),
		redirect: '/erp/oaCompanyHome',
		children: [
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
				path: 'index',
				name: 'index',
				component: index,
				meta: {
					title: '首页'
				}
			},
			{
				path: 'svgIndex',
				name: 'svgIndex',
				component: () =>
					import( /* webpackChunkName: "tabs" */ 'views/Home/svgIndex.vue'),
				meta: {
					title: '工作流'
				}
			}
		]
	},
	{
		path: '/confMnt/login',
		name: 'confMntLogin',
		component: () =>
			import( /* webpackChunkName: "login" */ '../components/page/ConfMntLogin.vue'),
		meta: {
			title: '会议室控制台登录'
		}
	},
	{
		path: '/confMnt',
		name: 'confManagement',
		component: () =>
			import( /* webpackChunkName: "login" */ '../views/confmangement/conference-management.vue'),
		meta: {
			title: '会议室控制台'
		}
	}
]

export default new Router({
	routes: constantRouterMap,
	mode: 'history'
});