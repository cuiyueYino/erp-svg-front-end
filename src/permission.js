/*路由拦截*/

import router from './router'
import api from './model/api/collaborative-office'
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} `;
	const token = localStorage.getItem('ms_tokenId');
	if(token) {
		//跳转页面的url是否存在
		if(to.name == "login" || to.name == "/login") {
			next()
		} else {
			if(to.path.indexOf("none") == "-1") {
				if(JSON.parse(sessionStorage.getItem("menuList")) != null && JSON.parse(sessionStorage.getItem("menuList")).length > 0) {
					var con = ""
					var listAll = JSON.parse(sessionStorage.getItem("menuList"))[0].subs
					getCon(listAll)
					function getCon(list) {
						list.forEach(item => {
							if(typeof(item.url) != 'undefined') {
								if(item.url == to.name) {
									con = item.activityId
								}
							} else {
								getCon(item.subs)
							}
						})
					}
					api.getCompanyData({
						fmactivity: con
					}).then(data => {
						localStorage.setItem('CompanyData', JSON.stringify(data.data));
						next()
					})
				} else {
					next()
				}

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