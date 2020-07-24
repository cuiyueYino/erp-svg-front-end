import httpReqest from '../../utils/https';

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
        return httpReqest.get('/api/interfaces/insideMail/getMailById', params);
    },
    // 编辑邮件
    updateInsideMail(params) {
        return httpReqest.post('/api/interfaces/insideMail/updateInsideMail', params);
    },
    // 更改邮件（逻辑删除和还原）0：未删除，1：已删除
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
    // 设置已读（可多选）
    setRead(params) {
        return httpReqest.post('/api/interfaces/insideMail/setRead', params);
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
    }
   
};

export default insideMail;