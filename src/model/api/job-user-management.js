import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const jobUserManagement = {
    // 获取职务表格列表数据
    getTableData(params){
        return httpReqest.post('/api/interfaces/positionmnt/findPositionList', params);
    },

    // 职务列表-新增
    addTableData(params){
        return httpReqest.post('/api/interfaces/positionmnt/insertPosition', params);
    },

    // 职务列表-编辑
    updateTableData(params){
        return httpReqest.post('/api/interfaces/positionmnt/updatePosition', params);
    },

    // 职务列表-删除
    deleteTableData(params){
        return httpReqest.get('/api/interfaces/positionmnt/deletePosition?foId='+ params);
    },

    // 用户-列表查询
    getUserTableData(params){
        return httpReqest.post('/api/interfaces/userManage/findUserBypage', params);
    },

    // 用户列表-新增
    addUserTableData(params){
        return httpReqest.post('/api/interfaces/userManage/addUser', params);
    },

    // 用户-根据ID查找用户
    addUserData(params){
        return httpReqest.post('/api/interfaces/userManage/findeUserById', params);
    },

    // 用户列表-编辑
     updateUserTableData(params){
        return httpReqest.post('/api/interfaces/userManage/editUser', params);
    },

    // 人员-列表查询
    getPeopleTableData(params){
        return httpReqest.post('/api/interfaces/staffManage/findStaffByPage', params);
    },

    //  人员-根据ID查找人员
    addPeopleData(params){
        return httpReqest.post('/Lapi/staffManage/findStaffById?id=' + params);
    },

     //  人员-根据公司查找人员
     addDepartData(params){
        return httpReqest.post('/Lapi/staffManage/getStaffByCompany',params);
    },
};

export default jobUserManagement;