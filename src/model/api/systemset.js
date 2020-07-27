import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const systemSet = {
    //根据条件查询菜单
    findMenuByParam(params){
        return httpReqest.post('/api/interfaces/menu/findMenuByParam', params);
    },
    //分页查询菜单
    findMenuPage(params){
        return httpReqest.post('/api/interfaces/menu/findMenuPage', params);
    },
    //分页查询业务活动
    getProcessActivity(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getProcessActivity', params);
    },
    //根据ID查询菜单
    getMenuById(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/menu/getMenuById'+valueS);
    },
    //新建menu提交
    insertMenuModel(params){
        return httpReqest.post('/api/interfaces/menu/insertMenuModel', params);
    },
    //修改menu提交
    updateMenuModel(params){
        return httpReqest.post('/api/interfaces/menu/updateMenuModel', params);
    },
    //根据ID删除菜单
    deleteMenuModel(params){
        return httpReqest.post('/api/interfaces/menu/deleteMenuModel', params);
    },

}
export default systemSet;