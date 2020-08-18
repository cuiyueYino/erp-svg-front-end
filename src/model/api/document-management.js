import base from './base'; // 导入接口域名列表
import httpReqest from '../../utils/https';
import httpUpload from '../../views/document-management/base/httpUpload.js';


const v = base.dev;

const baseURI = '/api/interfaces/';

const documentManagement = {

    //---------------------------------文件类别维护接口-begin--------------------------------------------------------- 
    //获取文件类别组织
    getDocumentCategoryOrgArch(){
        return httpReqest.get(baseURI + 'documentcategory/getDocumentCategoryOrgArch');
    },
    //查询文件类别:分页
    findDocumentCategoryByPage(params){
        return httpReqest.post(baseURI + 'documentcategory/findDocumentCategoryByPage',params);
    },
    //新增文件类别
    insertDocumentCategory(params){
        return httpReqest.post(baseURI + 'documentcategory/insertDocumentCategory',params);
    },
    //编辑文件类别
    updateDocumentCategory(params){
        return httpReqest.post(baseURI + 'documentcategory/updateDocumentCategory',params);
    },
    //删除文件类别
    deleteDocumentCategory(params){
        return httpReqest.get(baseURI + 'documentcategory/deleteDocumentCategory?id='+params.id);
    },
    //查询文件类别 by foid
    findDocumentCategoryById(params){
        return httpReqest.get(baseURI + 'documentcategory/findDocumentCategoryById?id='+params.id);
    },
    //---------------------------------文件类别维护接口-end----------------------------------------------------------- 

    //---------------------------------文件管理-begin--------------------------------------------------------- 
    //查询文件管理:分页
    findDocumentManageByPage(params){
        return httpReqest.post(baseURI + 'documentmanage/findDocumentManageByPage',params);
    },
    //新增文件管理
    insertDocumentManage(params){
        return httpReqest.post(baseURI + 'documentmanage/insertDocumentManage',params);
    },
    //编辑文件管理
    updateDocumentManage(params){
        return httpReqest.post(baseURI + 'documentmanage/updateDocumentManage',params);
    },
    //删除文件管理
    deleteDocumentManage(params){
        return httpReqest.get(baseURI + 'documentmanage/deleteDocumentManage?id='+params.id);
    },
    //查询文件管理 by foid
    findDocumentManageById(params){
        return httpReqest.post(baseURI + 'documentmanage/findDocumentManageById',params);
    },
    //查询操作纪录
    getDocumentRecordByMasterid(params){
        return httpReqest.post(baseURI + 'documentmanage/getDocumentRecordByMasterid',params);
    },
    //---------------------------------文件管理-end----------------------------------------------------------- 

    //---------------------------------文件授权-begin--------------------------------------------------------- 
    //查询文件授权:分页
    findDocumentAuthorityByPage(params){
        return httpReqest.post(baseURI + 'documentauthority/findDocumentAuthorityByPage',params);
    },
    //新增文件授权
    insertDocumentAuthority(params){
        return httpReqest.post(baseURI + 'documentauthority/insertDocumentAuthority',params);
    },
    //编辑文件授权
    updateDocumentAuthority(params){
        return httpReqest.post(baseURI + 'documentauthority/updateDocumentAuthority',params);
    },
    //删除文件授权
    deleteDocumentAuthority(params){
        return httpReqest.get(baseURI + 'documentauthority/deleteDocumentAuthority?id='+params.id);
    },
    //查询文件授权 by foid
    findDocumentAuthorityById(params){
        return httpReqest.get(baseURI + 'documentauthority/findDocumentAuthorityById?id='+params.foid);
    },
    //查询角色文件
    findOARoleInfosByPage(params){
        return httpReqest.post(baseURI + 'documentauthority/findOARoleInfosByPage',params);
    },
    //查询:是否具有某一（查看/下载/打印）权限
    isHaveDocAuthority(params){
        return httpReqest.post(baseURI + 'documentauthority/isHaveDocAuthority',params);
    },
    //---------------------------------文件授权-end----------------------------------------------------------- 

    //---------------------------------附件-begin-----------------------------------------------------------
    //单文件上传
    uploadFile(params){
        return httpUpload.post(baseURI + 'attachment/uploadFile',params);
    },
    //批量上传文件
    uploadFileBatch(params){
        return httpUpload.post(baseURI + 'attachment/uploadFileBatch',params);
    },
    //查询所有附件信息
    findInfosList(params){
        return httpReqest.post(baseURI + 'attachment/findInfosList',params);
    },
    //批量删除文件
    deleteInfoByIds(params){
        return httpReqest.get(baseURI + 'attachment/deleteInfoByIds?ids='+ params);
    },
    //文件下载
    downloadFile(params){
        return httpReqest.post(baseURI + 'attachment/downloadFile?attachmentId='+ params);
    },
    //文件下载
    getHtmlPreviewAttachmentById(params){
        return httpReqest.get(baseURI + 'attachment/getHtmlPreviewAttachmentById?id='+ params);
    },
    //---------------------------------附件-end-----------------------------------------------------------

};

export default documentManagement;