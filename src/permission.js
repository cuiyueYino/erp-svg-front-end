/*路由拦截*/

import router from './router'

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `福佳集团 | ${to.meta.title} `;
  const token = localStorage.getItem('ms_tokenId');
  if (!token && to.path === '/confMnt/login') {
    next();
  } else if (!token && to.path === '/confMnt') {
    next('/confMnt/login');
  }else if(!token && to.path !== '/login'){
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    next();
  }
});

