import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const confMangement = {
    // 获取会议室列表数据
    getConfOfficeList(params){
        return httpReqest.post('/api/interfaces/confOffice/findConfOfficeList', params);
    },

};

export default confMangement;