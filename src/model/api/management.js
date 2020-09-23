import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const management = {
    // 获取树形结构数据：不包括作废数据
    selectAllOrganizationInfo(){
        return httpReqest.get('/api/interfaces/organization/selectAllOrganizationInfo');
    },
    // 获取树形结构所有数据
    selectAllOrganization(){
        return httpReqest.get('/api/interfaces/organization/selectAllOrganization');
    },
    //查询公司
    getselectCompanyInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/selectCompanyInfo'+valueS);
    },
    //查询部门
    selectDepartmentInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/selectDepartmentInfo'+valueS);
    },
    //查询职务信息
    selectPositionInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/selectPositionInfo'+valueS);
    },
    //保存公司
    saveCompanyInfo(params){
        return httpReqest.post('/api/interfaces/organization/saveCompanyInfo', params);
    },
    //保存部门
    saveDeptmentInfo(params){
        return httpReqest.post('/api/interfaces/organization/saveDeptmentInfo', params);
    },
    //保存职位
    savePositionInfo(params){
        return httpReqest.post('/api/interfaces/organization/savePositionInfo', params);
    },
    //删除部门，公司，职务
    deleteOrganizationInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/deleteOrganizationInfo'+valueS);
    },
    //作废部门，公司，职务
    cancelOrganizationInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/cancelOrganizationInfo'+valueS);
    },
    //反作废部门，公司，职务
    uncancelOrganizationInfo(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/organization/uncancelOrganizationInfo'+valueS);
    },
    // 用户-列表查询
    getUserTableData(params){
        return httpReqest.post('/api/interfaces/userManage/findUserBypage', params);
    },
    // 用户-通过ID字符串查询
    getUserByIds(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/userManage/getUserByIds'+valueS);
    },
    changePassword(params){
        return httpReqest.post('/api/interfaces/userManage/changePassword', params);
    },
    //通过角色查询用户
    findUserByRoleId(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/role/findUserByRoleId'+valueS);
    },
    //通过用户查询角色
    findRoleByUserId(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/role/findRoleByUserId'+valueS);
    },
    //给角色授权用户
    roleAuthUser(params){
        return httpReqest.post('/api/interfaces/role/roleAuthUser', params);
    },
    //给用户授权角色
    userAuthRole(params){
        return httpReqest.post('/api/interfaces/role/userAuthRole', params);
    },
}
export default management;
