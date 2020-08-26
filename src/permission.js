/*路由拦截*/

import router from './router'

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	document.title = `福佳集团 | ${to.meta.title} `;
	const token = localStorage.getItem('ms_tokenId');
	if(token) {
		//跳转页面的url是否存在
		if(to.path == "/login") {
			next('/')
		} else {
			if(to.path.indexOf("none") == "-1") {
				next()
			} else {
				next("/erp/404")
			}
		}
	} else {
		if(to.name == "login" || to.name == "confMntLogin") {
			next();
		} else {
			next('/')
		}
	}
});