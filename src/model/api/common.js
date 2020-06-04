import base from './base'; // 导入接口域名列表
import LhttpReqest from '../../utils/https';
import QS from 'qs';

// const v = base.dev;
//const testV = base.test;
const common = {
    // 获取token
    loginAPI:(params) =>{
    return LhttpReqest({
        headers:{
            "Authorization":"Basic YXBwLWFkbWluJTNBYXBwLWFkbWluLXNlY3JldA==",
            // "Authorization":'Basic YXBwLWFkbWluOmFwcC1hZG1pbi1zZWNyZXQ=',
            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        url: '/Lapi/uaa/oauth/token',
        method: 'POST',
        data: QS.stringify(params)
    })
   },

   // 获取登录人信息
   getUserInfo:(params) =>{
        return LhttpReqest.post('/Lapi/user/getUserInfo', QS.stringify(params));
   }
   
   
};

export default common;