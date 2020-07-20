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

};

export default svg;