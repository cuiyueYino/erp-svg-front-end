import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const svg = {
    // SVG新增
    addSvg(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addWfprocessInfoNew', params);
    },
    
    //查询业务数据
    getProcessData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getProcessClass', params);
    },

    //新增审核业务
     addProcessActivity(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addProcessActivity', params);
    },

    //查询单条数据信息
    getSvgSingleData(params){
        return httpReqest.get('/api/wfInterfaces/workFlow/findWfProcessInfoById?foid=' + params);
    },

    //子流程枚举列表  
    getSubProcessList(){
        return httpReqest.get('/api/wfInterfaces/workFlow/findSubWfProcessInfoList');
    },

     //查询角色列表
     getRolesMsg(){
        return httpReqest.get('/api/wfInterfaces/workFlow/getRoleTypeCon');
    },

};

export default svg;