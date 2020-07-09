import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
const v = base.dev;
//const testV = base.test;
const management = {
    // 获取树形结构数据
    selectAllOrganizationInfo(){
        return httpReqest.get('/api/organization/selectAllOrganizationInfo');
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
        return httpReqest.get('/api/organization/selectCompanyInfo'+valueS);
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
        return httpReqest.get('/api/organization/selectDepartmentInfo'+valueS);
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
        return httpReqest.get('/api/organization/selectPositionInfo'+valueS);
    },
    //保存公司
    saveCompanyInfo(params){
        return httpReqest.post('/api/organization/saveCompanyInfo', params);
    },
    //保存部门
    saveDeptmentInfo(params){
        return httpReqest.post('/api/organization/saveDeptmentInfo', params);
    },
    //保存职位
    savePositionInfo(params){
        return httpReqest.post('/api/organization/savePositionInfo', params);
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
        return httpReqest.get('/api/organization/deleteOrganizationInfo'+valueS);
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
        return httpReqest.get('/api/organization/cancelOrganizationInfo'+valueS);
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
        return httpReqest.get('/api/organization/uncancelOrganizationInfo'+valueS);
    },
    
}
export default management;