import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
import QS from 'qs';

// const v = base.dev;
//const testV = base.test;
const common = {
    // 获取token
    login:(params) =>{
    return httpReqest({
        headers:{
            "Authorization":"Basic ZXJwLWFkbWluOmVycC1hZG1pbi1zZWNyZXQ=",
            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        url: '/api/uaa/oauth/token',
        method: 'POST',
        data: QS.stringify(params)
    })
   },

   // 获取登录人信息
   getUserInfo:(params) =>{
        return httpReqest.post('/api/user/getUserInfo', QS.stringify(params));
   }
   
   
};

export default common;