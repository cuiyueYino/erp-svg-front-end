import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const RoleManagement = {
    //新建角色类别
    insertRoleTypeModel(params){
        return httpReqest.post('/api/interfaces/roleType/insertRoleTypeModel', params);
    },
    //修改就是类别
    updateRoleTypeModel(params){
        return httpReqest.post('/api/interfaces/roleType/updateRoleTypeModel', params);
    },
    //查询全部角色类别
    findRoleTypeList(params){
        return httpReqest.post('/api/interfaces/roleType/findRoleTypeList', params);
    },
    //分页查询角色类别
    findRoleTypePage(params){
        return httpReqest.post('/api/interfaces/roleType/findRoleTypePage', params);
    },
    //用ID查询角色类别
    getRoleTypeModel(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/roleType/getRoleTypeModel'+valueS);
    },
    //用id删除角色类别
    deleteRoleTypeModel(params){
        return httpReqest.post('/api/interfaces/roleType/deleteRoleTypeModel', params);
    },
    //分页查询角色
    findRolePage(params){
        return httpReqest.post('/api/interfaces/role/findRolePage', params);
    },
    //新增角色
    insertRoleModel(params){
        return httpReqest.post('/api/interfaces/role/insertRoleModel', params);
    },
    //修改角色
    updateRoleModel(params){
        return httpReqest.post('/api/interfaces/role/updateRoleModel', params);
    },
    //根据ID删除角色
    deleteRoleModel(params){
        return httpReqest.post('/api/interfaces/role/deleteRoleModel', params);
    },
    //根据角色、公司查询已授权菜单
    findRMByCompany(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/role/findRMByCompany'+valueS);
    },
    //根据ID查询角色
    getRoleModel(params){
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/role/getRoleModel'+valueS);
    },
}
export default RoleManagement;