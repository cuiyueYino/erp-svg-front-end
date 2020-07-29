<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="2">
                    <el-select v-model="form.select" placeholder="请选择" size="mini">
                        <el-option label="发送者" value="senderName"></el-option>
                        <el-option label="主题" value="subject"></el-option>
                        <el-option label="内容" value="content"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="form.selectVal"  placeholder="根据标题或内容搜索"  prefix-icon="el-icon-search" size="mini" clearable />
                </el-col >
                <el-col :span="3">
                    <el-button el-button type="primary" @click="search" icon="el-icon-search" size="mini">搜索</el-button>
                </el-col>
                <el-col :span="14" style="text-align: right;">
                    <el-button type="primary" plain class="el-icon-s-promotion" @click="reply" size="mini">回复</el-button>
                    <el-button type="primary" plain class="el-icon-s-promotion" @click="replyAll" size="mini">回复全部</el-button>
                    <el-button type="primary" plain class="el-icon-share" @click="relay" size="mini">转发</el-button>
                    <el-button type="info" plain class="el-icon-reading" @click="read" size="mini">查看</el-button>
                    <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg" size="mini">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 表格 -->
        <el-card>
            <dynamic-table
                :columns="columns"
                :table-data="tableData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                v-loading="false"
                @current-change="onCurrentChange"
                @selection-change = "selection"
                element-loading-text="加载中">
            </dynamic-table>
        </el-card>
    </div>
</template>
<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
    name: 'mailOutbox',
    data() {
        return{
            name: "insideMailOutbox",
            pageNum: 1,
            pageSize: 10,
            total: 100,
            form: {
                select: [],
                selectVal: "",
            },
            columns: [
                {
                type: "selection"
                },
                {
                width: 200,
                key: "senderName",
                title: "发送者"
                },
                {
                key: "subject",
                title: "主题"
                },
                {
                width: 300,
                key: "sendTime",
                title: "发送时间"
                },
                {
                width: 80,
                key: "isRead",
                title: "是否已读"
                }
            ],
            tableData: [],
            multipleSelection: [],
            params: {},

        }
    },
    components: {
      DynamicTable
    },
    created() {
        this.$nextTick(() => {
            this.getSendMail();
        });
        console.log("进入发件箱")
    },
    methods: {

        /**
         * 选择器
         */
        selection(val) {
            this.multipleSelection = val;
        },
        /**
         * 分页、下一页
         */
        onCurrentChange(val) {
            this.pageNum = val;
            this.getSendMail();
        },
        getSendMail(){
            //表格查询基础参数
            let reqParam={
                owner: 'BFPID000000LSN000E',
                page: this.pageNum,
                size: this.pageSize
            };
            //拼入其他条件参数
            Object.assign(reqParam,this.params);
            //查询结果处理
            this.$api.insideMail.getSendMail(reqParam).then(
                res => {
                    if(res.data.code==0){
                        this.tableData = res.data.data.rows;
                        this.total = res.data.data.total;
                        for(var i=0,len=this.tableData.length; i<len;i++ ){
                            switch(this.tableData[i].isRead){
                                case 0:
                                this.tableData[i].isRead = "未读";
                                break;
                                case 1:
                                this.tableData[i].isRead = "已读";
                                break;
                                default :
                                break;              
                            }
                        }
                    }else{
                        this.$message.error(res.data.msg)
                    };
                }
            );
        },
        
        /**
        * 搜索
         */
        search() {
            //清空共享参数，拼装需要的参数
            this.emptyParam();
            this.params = {
                [this.form.select] : this.form.selectVal,
            };
            this.pageNum = 1;
            // 刷新列表
            this.getSendMail();
        },
        /**
         * 清空共享参数列表
         */
        emptyParam(){
            for(let key of Object.keys(this.params)){
                delete this.params[key];
            }
        },        

        /**
         * 回复
         */
        reply(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("未选中任何邮件");
                return;
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error("回复只能选择一封邮件");
                return;
            }
            let reqParam = {
                id: this.multipleSelection[0].id
            };
            this.$api.insideMail.reply(reqParam).then(
                res => {
                if(res.data.code==0){
                    let data = res.data.data;
                    this.$parent.$parent.$parent.toNewMail(data);
                }else{
                    this.$message.error(res.data.msg)
                };
                }
            )
        },

        /**
         * 回复全部
         */
        replyAll(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("未选中任何邮件");
                return;
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error("回复只能选择一封邮件");
                return;
            }
            let reqParam = {
                id: this.multipleSelection[0].id
            };
            this.$api.insideMail.replyAll(reqParam).then(
                res => {
                if(res.data.code==0){
                    let data = res.data.data;
                    this.$parent.$parent.$parent.toNewMail(data);
                }else{
                    this.$message.error(res.data.msg)
                };
                }
            )
        },

        /**
         * 转发
         */
        relay(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("未选中任何邮件");
                return;
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error("转发只能选择一封邮件");
                return;
            }
            let reqParam = {
                id: this.multipleSelection[0].id
            };
            this.$api.insideMail.relay(reqParam).then(
                res => {
                if(res.data.code==0){
                    let data = res.data.data;
                    this.$parent.$parent.$parent.toNewMail(data);
                }else{
                    this.$message.error(res.data.msg)
                };
                }
            )
        },

        /**
         * 查看
         */
        read(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("未选中任何邮件");
                return;
            }
            if (this.multipleSelection.length > 1) {
                this.$message.error("查看只能选择一封邮件");
                return;
            }
            this.$parent.$parent.$parent.toDetail(this.multipleSelection[0].id,"outbox");
        },

        /**
        * 删除
        */
        deleteMsg(){
            if(this.multipleSelection.length==0){
                this.$message.error("未选中任何邮件");
                return;
            }
            let reqParam=[];
            this.multipleSelection.forEach(item => {
                let req={
                id: item.id,
                isDelete: 1,
                };
                reqParam.push(req);
            });
            this.$api.insideMail.modifyMail(reqParam).then(
                res => {
                if(res.data.code==0){
                    this.$message.success("删除成功")
                    // 刷新表格
                    this.getSendMail();
                }else{
                    this.$message.error(res.data.msg)
                };  
                },
            );
        },
    },
}
</script>
<style scoped>

</style>