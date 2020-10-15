import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
import httpReqest2 from '../../utils/https2';
const v = base.dev;
//const testV = base.test;
const processSet = {
    // 工作业务组（查看）
    getWorkGroupDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/getWorkGroup'+valueS);
    },
    // 新建工作业务组保存
    addWorkGroup(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/saveWorkGroup', params);
    },

    // 获取表格列表数据
    getTableData(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/findWorkFlowProcessList', params);
    },

     // 获取表格列表数据(工作业务组 )
     getTableDataGroup(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/getWorkGroupList', params);
    },
    // 新增
    addSubmit(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/addWfprocess', params);
    },

    // 删除
    deleteMsg(params){
        return httpReqest.get('/api/wfInterfaces/workFlow/deleteProcess?foid='+params);
    },
    // 删除（工作业务组）
    delWorkGroupList(params){
        return httpReqest.get('/api/wfInterfaces/workFlow/delWorkGroupList?foids='+params);
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
    // 获取工作事项请求参数接口
    getWorkItemsParams(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/workItem/findBySrcId'+valueS);
    },
    // 获取待办事项的popForm表单数据(临时任务派发)
    getTemporaryMissionDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/temporaryMission/getTemporaryMissionVO'+valueS);
    },
    // 获取待办事项的popForm表单数据(经济指标)
    getEconomicIndicatorsDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.post('/api/scha/optionIndex/findById'+valueS);
    },
    // 获取待办事项的popForm表单数据(员工考评表)
    getTempApprDetail(params){
        return httpReqest2.post('/api/scha/staffAppraisals/findInfoById', params);
    },
    // 获取待办事项的popForm表单数据(一岗一表)
    getPostBidDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/formPost/getFormPostVO'+valueS);
    },
    // 获取待办事项的popForm表单数据(配合任务)
    getCoordinationTaskDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/coordinationTask/getCoordinationTaskVO'+valueS);
    },
    // 获取待办事项的popForm表单数据(公司年度计划汇总)
    getAnnualPlanDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/yearPlanSummary/findInfoById'+valueS);
    },
    //获取待办事项的popForm表单数据(部门月度计划)
    getMonthlyPlanDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/scha/departmentMonthPlan/showDeptMonthPlanDetail'+valueS);
    },
    // 获取待办事项的popForm表单数据(部门年度计划)
    getDepYearPlanDetail(params){
        return httpReqest2.post('/api/scha/departmentYearPlan/findInfoById', params);
    },
    // 获取待办事项的popForm表单数据(一人一表任务表)
    getPersonalTableTaskDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.post('/api/scha/taskEvaluate/findTaskEvaluateAndAdjustById'+valueS);
    },
    // 获取待办事项的报备详情表单数据(一人一表任务表)
    getPersonalTableReportDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.post('/api/scha/taskEvaluate/taskReport'+valueS);
    },
    //任务自评修改申请詳情
    getPersonalTableModifyDetail(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.post('/api/scha/taskUpdateApply/findTaskEvaluateUpdateApplyById'+valueS);
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
    //待办事项-提交
    addWfsubmit(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/wfsubmit', params);
    },
    //新会议申请（退回）-提交
    resubmitconfapplysubmit(params){
        return httpReqest.post('/api/interfaces/confApply/reSubmitConfApply', params);
    },
    //根据 userid 获取到职位[包括兼职]
    getStaffAllFirmpositionname(params){
        return httpReqest.post('/api/interfaces/staffManage/getStaffAllFirmpositionname', params);
    },
    //待办事项- 查询当前节点的配置
    getProcessorByMaile(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/getProcessorByMaile'+valueS);
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
    //获取决策类型数据
    getWfDecisionTypeConByCurNode(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/getWfDecisionTypeConByCurNode'+valueS);
    },
    //加批
    //查询邮件状态
    getWFBizMailInfoByUserId(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/getWFBizMailInfoByUserId'+valueS);
    },
    //操作已阅
    removeBizMail(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/removeBizMail', params);
    },
    //获取邮件列表
    getMailInfo(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/getMailInfoBypage', params);
    },

    //获取邮件详细信息
    getMailDetailInfo(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/getMailDetail', params);
    },

    //获取审批信息及回复信息
    getAuditAndReplyMsg(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/processMonitor/getAuditAndReplyMsg'+valueS);
    },
    //获取审批信息workFlow/auditDetailSearch
    auditDetailSearch(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/auditDetailSearch', params);
    },
    //新增审批回复信息
    addAuditReply(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/addAuditReply', params);
    },
    //新增审批回复信息
    updateReplyAnnexMsg(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/processMonitor/updateReplyAnnexMsg'+valueS);
    },
    //查询审批回复信息
    getReplyMsgByAudit(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/processMonitor/getReplyMsgByAudit'+valueS);
    },
    //删除邮件
    removeMail(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/removeMail', params);
    },

    // 查询公司
    getCompanyData(){
        return httpReqest.get('/api/interfaces/organization/getCompanyData');
    },

    //获取业务数据列表
    getTmClass(){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/getTmClass');
    },
    //保存编辑信息
    getAllowJumpNodes(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/processMonitor/getAllowJumpNodes'+valueS);
    },
    //保存编辑信息
    saveEdit(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/processMonitor/confirm', params);
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
    //根据用户查找公司
    getUserCompany(params){
        return httpReqest.get('/api/interfaces/organization/getCompanyByUser?userId=' + params);
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
    //根据公司获取部门
    getDepartmentInfosByCompany(params){
        return httpReqest.post('/api/wfInterfaces/workFlow/findDepartmentInfosByCompanyoid', params);
    },
};

export default processSet;
