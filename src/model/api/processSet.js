import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const processSet = {
    // 新建工作业务组保存
    addWorkGroup(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/saveWorkGroup', params);
    },

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
        return httpReqest.post('/api/wfInterfaces/workFlow/unhandledTask', params);
    },
    // 获取待办事项的popForm表单数据
    getunhandledTaskForm(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/taskStructure/init'+valueS);
    },
     //获取处理表单详情数据
     getunhandledTaskFormDetail(params){
        return httpReqest.post('/api/scha/workFlow/unhandledTaskFormDetail', params);
    },
    //部门的详细数据查询
    getdepaSearch(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/departmentSearch', params);
    },
    //发起人详细数据查询
    getaddresserSearch(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addresserSearch', params);
    },
    //查找业务数据
    getProcessClass(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getProcessClass', params);
    },
    //公司部门人员树
    getUserTreeData(params){
        return httpReqest.post('/api/interfaces/staffManage/getStaffTree', params);
    },
    //待办事项-转发
    setencyclic(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/encyclic', params);
    },
    //委托
    transmit(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/transmit', params);
    },
    //关注
    addAttention(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addAttention', params);
    },
    //加签
    SeTaddTag(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addTag', params);
    },
    //移除
    RemoveTBin(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/removeToRecyleBin', params);
    },
    //流程图
    viewProcess(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/viewProcess', params);
    },
    //获取关注事项数据
    attentionTask(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/attentionTask', params);
    },
    //取消关注
    deleteAttention(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/deleteAttention', params);
    },
    //获取已办消息
    handledTask(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/handledTask', params);
    },
    //加批

    //获取邮件列表
    getMailInfo(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/getMailInfoBypage', params);
    },

    //获取邮件详细信息
    getMailDetailInfo(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/getMailDetail', params);
    },

    //获取审批信息及回复信息
    getAuditAndReplyMsg(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/getAuditAndReplyMsg', params);
    },

    //新增审批回复信息
    addAuditReply(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/addAuditReply', params);
    },

    //删除邮件
    removeMail(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/removeMail', params);
    },

    // 查询公司
    getCompanyData(){
        return httpReqest.get('/api/interfaces/organization/getCompanyData');
    },

    //获取业务数据列表
    getTmClass(){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/getTmClass');
    },

    //保存编辑信息
    saveEdit(params){
        return httpReqest.post('api/wfInterfaces/workFlow/processMonitor/confirm', params);
    },

    addSign(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addSign', params);
    },
    //已发事项查询
    sendedTask(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/sendedTask', params);
    },
    //获取回收站数据
    getRecycleBinList(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getRecycleBinList', params);
    },
    //还原回收站代办邮件
    reductionRecycleBin(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/reductionRecycleBin', params);
    },
    //流程业务查询
    getProBusList(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getProcessBussinessList', params);
    },
    //部门的详细数据查询
    getdepartmentList(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/departmentSearch', params);
    },
    //查询角色列表
    findRolePage(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getRoles', params);
    },
    //查询状态信息
    getStatus(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getStatus', params);
    },
    //查询公司
    getCompanyData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getCompanyData', params);
    },
    //流程业务新增
    saveProBusData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/saveProcessBussiness', params);
    },
    //流程业务修改
    updateProBusData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/updateProcessBussiness', params);
    },
    //删除流程业务
    delProBusData(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/delProcessBussinessList'+valueS);
    },
    //获取某一条流程业务数据
    getProBusData(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/getProcessBussiness'+valueS);
    },
};

export default processSet;