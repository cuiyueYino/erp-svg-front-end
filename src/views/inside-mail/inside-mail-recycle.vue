<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="2">
                    <el-select v-model="form.select" placeholder="请选择" size="mini">
                        <el-option label="发送者" value="senderName"></el-option>
                        <el-option label="主题" value="subject"></el-option>
                        <el-option label="内容" value="content"></el-option>
                        <el-option label="发送时间" value="sendTime"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-input v-if="isNormal" v-model="form.selectVal"  placeholder="根据标题或内容搜索"  prefix-icon="el-icon-search" size="mini" clearable />
                    <el-date-picker
                        v-if="isDate"
                        clearable
                        v-model="form.startTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择开始日期"
                        size="mini"
                        style="width:140px">
                    </el-date-picker>
                    <el-date-picker
                        v-if="isDate"
                        clearable
                        v-model="form.endTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择结束日期"
                        size="mini"
                        style="width:140px">
                    </el-date-picker>
                </el-col >
                <el-col :span="4">
                    <el-button el-button type="primary" @click="search" icon="el-icon-search" size="mini">搜索</el-button>
                    <el-button type="primary" plain class="el-icon-paperclip" @click="showAll" size="mini">显示全部</el-button>
                </el-col>
                <el-col :span="13" style="text-align: right;">
                    <el-button type="primary" plain class="el-icon-refresh" @click="recover" size="mini">还原</el-button>
                    <el-button type="info" plain class="el-icon-reading" @click="read" size="mini">查看</el-button>
                    <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg" size="mini">删除</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- 表格 -->
        <el-card>
            <dynamic-table
                ref="dataTable"
                :columns="columns"
                :table-data="tableData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                v-loading="false"
                @current-change="onCurrentChange"
                @selection-change = "selection"
                element-loading-text="加载中"
                @Row-Click="clickRow">
            </dynamic-table>
        </el-card>
    </div>
</template>
<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
    name: 'mailRecycle',
    data() {
        return{
            name: 'insideMailRecycle',
            pageNum: 1,
            pageSize: 10,
            total: 0,

            userName: localStorage.getItem('ms_username'),
            userId: localStorage.getItem('ms_staffId'),
            form : {
                select:[],
                selectVal: "",
                endTime:'',
                startTime:''
            },
            isDate: false,
            isNormal: true,
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
                key: "status",
                title: "来源"
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
        this.$nextTick(()=>{
            this.getRecycleMail();
        })
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
        this.getRecycleMail();
        },
        getRecycleMail(){
            //表格查询基础参数
            let reqParam={
                owner: this.userId,
                // owner: 'BFPID000000LSN000E',
                page: this.pageNum,
                size: this.pageSize
            };
            //拼入其他条件参数
            Object.assign(reqParam,this.params);
            //查询结果处理
            this.$api.insideMail.getRecycleMail(reqParam).then(
                res => {
                    if(this.dataBack(res,"")){
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
                            };
                            switch(this.tableData[i].status){
                                case 1:
                                this.tableData[i].status = "草稿箱";
                                break;
                                case 2:
                                this.tableData[i].status = "发件箱";
                                break;
                                case 3:
                                this.tableData[i].status = "收件箱";
                                break;
                                default :
                                break;
                            }
                        }
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
            if(this.isDate){
                this.params={
                    startTime : this.form.startTime,
                    endTime : this.form.endTime
                };
            }else{
                this.params={
                    [this.form.select] : this.form.selectVal
                };
            }
            this.pageNum = 1;
            // 刷新列表
            this.getRecycleMail();
        },

        /**
         * 显示全部
         */
        showAll() {
            this.emptyParam();
            this.pageNum = 1;
            this.getRecycleMail();
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
         * 还原
         */
        recover(){
            if(this.multipleSelection.length==0){
                this.$message.error("未选中任何邮件");
                return ;
            }
            let reqParam=[];
            this.multipleSelection.forEach(item => {
                let req={
                id: item.id,
                isDelete: 0,
                };
                reqParam.push(req);
            });
            this.$api.insideMail.modifyMail(reqParam).then(
                res => {
                if(this.dataBack(res,"还原成功")){
                    // 刷新表格
                    this.getRecycleMail();
                };
                },
            );
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
            this.$parent.$parent.$parent.toDetail(this.multipleSelection[0].id,"recycle");
        },

        /**
         * 删除
         */
        deleteMsg(){
            if(this.multipleSelection.length==0){
                this.$message.error("未选中任何邮件");
                return ;
            }
            if(this.multipleSelection.length>1){
                this.$message.error("只能选中一封邮件");
                return ;
            }
            let reqParam ={
                id: this.multipleSelection[0].id
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.insideMail.deleteMailById(reqParam).then(res =>{
                    if(this.dataBack(res,"删除成功")){
                        this.getRecycleMail();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        clickRow(val) {
            //  选中点击
            this.$refs.dataTable.toggleRowSelection(val);
        },

    },
    computed: {
        querySelect() {
        return this.form.select;
        },
    },
    watch: {
        querySelect(val) {
        this.form.selectVal = null;
        if (val == "sendTime") {
            // 开始，结束时间查询时
            this.isDate = true;
            this.isNormal = false;
        } else {
            this.isNormal = true;
            this.isDate = false;
        }
        },
    },
}
</script>
<style lang="scss" scoped>
/deep/ .el-table__fixed-right::before {
background-color: revert;
}
</style>
