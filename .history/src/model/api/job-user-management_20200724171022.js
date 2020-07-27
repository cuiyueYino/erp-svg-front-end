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
        return httpReqest.post('/staffManage/findStaffByPage', params);
    },

    //  人员-根据ID查找人员
    addPeopleData(params){
        return httpReqest.post('/api/staffManage/findStaffById?id=' + params);
    },

     //  人员-根据公司查找人员
     addDepartData(params){
        return httpReqest.post('/api/staffManage/getStaffByCompany',params);
    },

    // 人员-公司查询
    getCompanyData(){
        return httpReqest.get('/api/organization/getCompanyData');
    },

    // 人员-职位查询
     getPositonData(params){
        return httpReqest.get('/api/organization/findPositionInfosByDepartmentid?departmentOid=' + params);
    },

    // 人员-部门查询
    getDepartData(params){
        return httpReqest.get('/api/organization/findDepartmentInfosByCompanyoid?companyOid=' + params);
    },

    //  人员-编辑
    updatePeopleData(params){
        return httpReqest.post('/api/staffManage/updateStaff',params);
    },

    //  人员-新增
    addPeopleMsg(params){
        return httpReqest.post('/api/staffManage/insertStaff',params);
    },

    //  人员-删除
    deletePeopleMsg(params){
        return httpReqest.post('/api/staffManage/deleteStaff?id=' + params);
    },

};

export default jobUserManagement;