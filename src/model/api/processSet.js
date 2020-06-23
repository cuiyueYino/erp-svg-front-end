import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const processSet = {
    // 获取表格列表数据
    getTableData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/findWorkFlowProcessList', params);
    },

    // 新增
    addSubmit(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addWfprocess', params);
    },

    // 删除
    deleteMsg(params){
        return httpReqest.get('/api/wfInterfaces/workFlow/deleteProcess?foid='+params);
    },

     // 生效/禁用
     effectOrDisable(params){
        return httpReqest.get('/api/wfInterfaces/workFlow/updateProcess?foid='+params.foid+'&status='+params.status);
    },

    /*
    SVG图标节点信息-手工活动
    */

    // 业务工作-获取表格列表数据 
    
    workSearchData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getProcessActivity', params);
    },

    // 业务工作-获取表格列表数据-搜索枚举项
    getWorkSearch(){
        return httpReqest.get('/api/wfInterfaces/workFlow/getMFunctionTypeCon');
    },
    //20200613
    //查询角色列表
    getRolesData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getRoles', params);
    },
    //公司部门人员树
    getUserTree(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/findCompanyDeptStaffInfoByOrgUnitIdFromRedis'+valueS);
    },
    //查找业务服务
    getWfBusinessService(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getWfBusinessService', params);
    },
    //查找职务
    positionList(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/positionList', params);
    },
};

export default processSet;