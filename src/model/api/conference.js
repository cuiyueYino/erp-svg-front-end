import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const confMangement = {
    // 获取会议室列表数据
    getConfOfficeList(params){
        return httpReqest.post('/api/interfaces/confOffice/findConfOfficeList', params);
    },

    // 新增或者修改会议室
    submitConfOffice(params){
        return httpReqest.post('/api/interfaces/confOffice/submitConfInfo', params);
    },

    // 修改会议室状态
    editConfOffice(params) {
        return httpReqest.post('/api/interfaces/confOffice/updateConfOffice', params);
    },

    // 删除会议室
    deleteConfOffice(params) {
        return httpReqest.get('/api/interfaces/confOffice/deleteConfOffice?foid='+ params);
    },

    // 获取有效会议室列表
    getAvailableConfOffice(params) {
        return httpReqest.post('/api/interfaces/confOffice/findAvailableConfOffice', params);
    },

    // 根据foid获取会议室
    getConfOfficeById(params) {
        return httpReqest.get('/api/interfaces/confOffice/findConfOfficeById?foid='+ params);
    },

    // 获取会议室使用详情列表数据
    getConfUsageDetail(params) {
        return httpReqest.post('/api/interfaces/confOffice/findConfUsageDetail', params);
    },

    // 会议室使用详情Excel导出
    confUsageDetailExport(params) {
        return httpReqest.post('/api/interfaces/confOffice/confUsageDetailExport', params);
    }
};

export default confMangement;