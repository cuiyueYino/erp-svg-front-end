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
    //获取待办事项
    getunhandledTask(params){
        return httpReqest.post('/api/workFlow/unhandledTask', params);
    },
    //部门的详细数据查询
    getdepaSearch(params){
        return httpReqest.post('/api/workFlow/departmentSearch', params);
    },
    //发起人详细数据查询
    getaddresserSearch(params){
        return httpReqest.post('/api/workFlow/addresserSearch', params);
    },
    //查找业务数据workFlow/getProcessClass
    getProcessClass(params){
        return httpReqest.post('/api/workFlow/getProcessClass', params);
    },
    //公司部门人员树
    getUserTreeData(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/workFlow/findCompanyDeptStaffInfoByOrgUnitIdFromRedis'+valueS);
    },
    //待办事项-转发
    setencyclic(params){
        return httpReqest.post('/api/workFlow/encyclic', params);
    },
    //委托
    transmit(params){
        return httpReqest.post('/api/workFlow/transmit', params);
    },
    //关注
    addAttention(params){
        return httpReqest.post('/api/workFlow/addAttention', params);
    },
    //加签
    SeTaddTag(params){
        return httpReqest.post('/api/workFlow/addTag', params);
    },
    //移除
    RemoveTBin(params){
        return httpReqest.post('/api/workFlow/removeToRecyleBin', params);
    },
    //流程图
    viewProcess(params){
        return httpReqest.post('/api/workFlow/viewProcess', params);
    },
    //获取关注事项数据
    attentionTask(params){
        return httpReqest.post('/api/workFlow/attentionTask', params);
    },
    //取消关注
    deleteAttention(params){
        return httpReqest.post('/api/workFlow/deleteAttention', params);
    },
    //获取已办消息
    handledTask(params){
        return httpReqest.post('/api/workFlow/handledTask', params);
    },
    //加批

    //获取邮件列表
    getMailInfo(){
        return httpReqest.post('api/interfaces/processMonitor/getMailInfoBypage', params);
    },

    //获取邮件详细信息
    getMailDetailInfo(){
        return httpReqest.post('api/interfaces/processMonitor/getMailDetail', params);
    },

    //获取回复信息
    getAuditReplyMsg(){
        return httpReqest.post('api/interfaces/processMonitor/getAuditReplyMsg', params);
    },

    //新增审批回复信息
    addAuditReply(){
        return httpReqest.post('api/interfaces/processMonitor/addAuditReply', params);
    },

    //删除邮件
    removeMail(){
        return httpReqest.post('api/interfaces/processMonitor/removeMail', params);
    },

    //保存编辑信息
    saveEdit(){
        return httpReqest.post('api/interfaces/processMonitor/confirm', params);
    },
};

export default processSet;