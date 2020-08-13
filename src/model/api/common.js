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
                "Authorization":"Basic ZXJwLWFkbWluOmVycC1hZG1pbi1zZWNyZXQ=",
                // "Authorization":'Basic YXBwLWFkbWluOmFwcC1hZG1pbi1zZWNyZXQ=',
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            url: '/api/uaa/oauth/token',
            method: 'POST',
            data: QS.stringify(params)
        })
    },
    getTokenData(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return LhttpReqest.post('/api/uaa/oauth/token'+valueS);
    },
   /*getTokenData:(params) =>{
        return LhttpReqest({
            headers:{
                "Authorization":"Basic ZXJwLWFkbWluOmVycC1hZG1pbi1zZWNyZXQ=",
                // "Authorization":'Basic YXBwLWFkbWluOmFwcC1hZG1pbi1zZWNyZXQ=',
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            url: '/api/uaa/oauth/token',
            method: 'POST',
            auth:{
                Username:'erp-admin',
                Password:'erp-admin-secret'
            },
            data: QS.stringify(params)
        })
    },*/
   // 获取登录人信息
   getUserInfo:(params) =>{
        return LhttpReqest.post('/Lapi/user/getUserInfo', QS.stringify(params));
   }
   
   
};

export default common;