import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const confMangement = {
    //================================会议室档案==============================================
    // 获取会议室列表数据
    getConfOfficeList(params) {
        return httpReqest.post('/api/interfaces/confOffice/findConfOfficeList', params);
    },

    // 新增或者修改会议室
    submitConfOffice(params) {
        return httpReqest.post('/api/interfaces/confOffice/submitConfInfo', params);
    },

    // 修改会议室状态
    editConfOffice(params) {
        return httpReqest.post('/api/interfaces/confOffice/updateConfOffice', params);
    },

    // 删除会议室
    deleteConfOffice(params) {
        return httpReqest.get('/api/interfaces/confOffice/deleteConfOffice?foid=' + params);
    },

    // 获取有效会议室列表
    getAvailableConfOffice(params) {
        return httpReqest.post('/api/interfaces/confOffice/findAvailableConfOffice', params);
    },

    // 根据foid获取会议室
    getConfOfficeById(params) {
        return httpReqest.get('/api/interfaces/confOffice/findConfOfficeById?foid=' + params);
    },
    //================================会议申请==============================================
    // 获取会议申请列表
    getApplyList(params) {
        return httpReqest.post('/api/interfaces/confApply/findApplyList', params);
    },

    // 暂存会议申请
    stagingConfApply(params) {
        return httpReqest.post('/api/interfaces/confApply/stagingConfApply', params);
    },

    // 提交会议申请
    submitConfApply(params) {
        return httpReqest.post('/api/interfaces/confApply/submitConfApply', params);
    },

    // 取消会议申请
    cancelConfApply(params) {
        return httpReqest.get('/api/interfaces/confApply/cancelConfApply?foid=' + params);
    },

    // 根据foid获取会议室
    getApplyById(params) {
        return httpReqest.get('/api/interfaces/confApply/findApplyById?foid=' + params);
    },

    //================================会议室使用详情==============================================
    // 获取会议室使用详情列表数据
    getConfUsageDetail(params) {
        return httpReqest.post('/api/interfaces/confOffice/findConfUsageDetail', params);
    },

    // 会议室使用详情Excel导出
    confUsageDetailExport() {
        httpReqest.post("/api/interfaces/confOffice/confUsageDetailExport", {}, {
            responseType: "blob", //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
          })
          .then(function (response) {
            const blob = new Blob([response.data]);
            const fileName = "会议室使用详情.xls";
            const linkNode = document.createElement("a");

            linkNode.download = fileName; //a标签的download属性规定下载文件的名称
            linkNode.style.display = "none";
            linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
            document.body.appendChild(linkNode);
            linkNode.click(); //模拟在按钮上的一次鼠标单击

            URL.revokeObjectURL(linkNode.href); // 释放URL 对象
            document.body.removeChild(linkNode);
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    //================================组织架构==============================================
    //  人员-根据ID查找人员
    getStaffInfoById(params) {
        return httpReqest.post('/api/interfaces/staffManage/findStaffById?id=' + params);
    },

    // 获取人员树结构
    getStaffTreeList(params) {
        return httpReqest.post('/api/interfaces/staffManage/getStaffTree', params);
    },

    //公司部门人员树
    getOrgunitTree(params) {
        var valueS = '?';
        for (var item in params) {
            valueS += item + "=" + params[item] + "&";
        }
        if (valueS.slice(valueS.length - 1, valueS.length) === "&") {
            valueS = valueS.slice(0, valueS.length - 1);
        }
        return httpReqest.get('/api/wfInterfaces/workFlow/findCompanyDeptStaffInfoByOrgUnitIdFromRedis' + valueS);
    },

    //================================会议室控制台服务==============================================
    // 根据会议室foid获取该会议室当天会议内容列表
    getTodayApplyList(params) {
        return httpReqest.get('/api/interfaces/confMnt/findTodayApplyList?foid=' + params);
    },

    // 控制台会议室分页查询
    getConfMntList(params) {
        return httpReqest.post('/api/interfaces/confMnt/findConfMntList', params);
    },

    // 当前会议室状态控制，开始、停止、超时
    editConfMnt(params) {
        return httpReqest.post('/api/interfaces/confMnt/editConfMnt', params);
    },
};

export default confMangement;
