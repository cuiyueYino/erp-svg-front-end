import httpReqest from '../../utils/https';
import httpUpload from "../../views/document-management/base/httpUpload";

const insideMail = {

    // 发送邮件
    sendInsideMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/sendInsideMail', params);
    },
    // 获取发件箱
    getSendMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/getSendMail', params);
    },
    // 获取收件箱
    getReceiveMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/getReceiveMail', params);
    },
    // 获取草稿箱
    getDraftMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/getDraftMail', params);
    },
    // 获取回收站
    getRecycleMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/getRecycleMail', params);
    },
    // 查询具体邮件
    getMailById(params) {
        var valueS='?';
        for(var item in params){
            valueS+=item+"="+params[item]+"&";
        }
        if(valueS.slice(valueS.length-1,valueS.length) ==="&"){
            valueS=valueS.slice(0,valueS.length-1);
        }
        return httpReqest.get('/api/interfaces/insideMail/getMailById'+valueS);
    },
    // 编辑邮件
    updateInsideMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/updateInsideMail', params);
    },
    // 更改邮件（逻辑删除/还原,设置已读/未读）0：未，1：已
    modifyMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/modifyMail', params);
    },
    // 删除邮件（物理删除）
    deleteMailById(params) {
        return httpReqest.post('/api/interfaces/insideMail/deleteMailById', params);
    },
    // 获取未读数量
    unReadCountById(params) {
        return httpReqest.post('/api/interfaces/insideMail/unReadCountById', params);
    },
    // 全部已读
    setReadAll(params) {
        return httpReqest.post('/api/interfaces/insideMail/setReadAll', params);
    },
    // 回复（邮件体拼接）
    reply(params) {
        return httpReqest.post('/api/interfaces/insideMail/reply', params);
    },
    // 全部回复（邮件体拼接）
    replyAll(params) {
        return httpReqest.post('/api/interfaces/insideMail/replyAll', params);
    },
    // 转发（邮件体拼接）
    relay(params) {
        return httpReqest.post('/api/interfaces/insideMail/relay', params);
    },

    //---------------------------------附件-begin-----------------------------------------------------------
    //单文件上传
    uploadFile(params){
      return httpUpload.post('/api/interfaces/attachment/uploadFile',params);
    },
    //批量上传文件
    uploadFileBatch(params){
      return httpUpload.post('/api/interfaces/attachment/uploadFileBatch',params);
    },
    //查询所有附件信息
    findInfosList(params){
      return httpReqest.post('/api/interfaces/attachment/findInfosList',params);
    },
    //批量删除文件
    deleteInfoByIds(params){
      return httpReqest.get('/api/interfaces/attachment/deleteInfoByIds?ids='+ params);
    },
    //文件下载
    downloadFile(params){
      return httpReqest.post('/api/interfaces/attachment/downloadFile?attachmentId='+ params);
    },
    //文件下载
    getHtmlPreviewAttachmentById(params){
      return httpReqest.get('/api/interfaces/attachment/getHtmlPreviewAttachmentById?id='+ params);
    },
    //---------------------------------附件-end-----------------------------------------------------------

};

export default insideMail;
