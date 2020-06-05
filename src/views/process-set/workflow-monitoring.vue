<template>
    <div>     
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="10" :offset="14">
                     <el-button type="success" icon="el-icon-refresh" plain @click="refresh">刷新</el-button>
                     <el-button type="success" icon="el-icon-search" plain @click="search">查询</el-button>
                     <el-button type="danger" icon="el-icon-more" plain @click="deleteMsg">流转</el-button>
                     <el-button type="warning" icon="el-icon-edit" plain @click="toEdit">修改</el-button>
                     <el-button type="success" icon="el-icon-delete-solid" plain @click="effectOrDisableMsg">删除</el-button>
                     <el-button type="danger" icon="el-icon-document" plain @click="effectOrDisableMsg">查看</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <!-- 表格 -->
        <el-card class="box-card">
            <dynamic-table
                :columns="columns"
                :table-data="tableData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
        <!-- 查询 -->
        <el-dialog title="工作流监控" :visible.sync="dialogWFMVisible" :close-on-click-modal="false">
            <el-form 
                :model="DataForm" 
                label-width="100px"
                class="dataForm"
                size="mini"
                :label-position="labelPosition">
                <el-card>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="pbackground">查询条件</el-col>
                        <el-col :span="6"  class="pbackground">操作符</el-col>
                        <el-col :span="12" class="pbackground">条件值</el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">类型</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.WFMtype" size="mini">
                                <el-option
                                    v-for="item in WFMtypeoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">来源单据公司</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.WFMtype" size="mini">
                                <el-option
                                    v-for="item in WFMtypeoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">业务数据</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.WFMtype" size="mini">
                                <el-option
                                    v-for="item in WFMtypeoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">业务工作</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.documentNo" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">主题</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.documentNo" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">接收时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.docDateStart"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">接收时间</el-col>
                        <el-col :span="6"  class="elColCenter">小于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.docDateStart"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">发起人</el-col>
                        <el-col :span="6"  class="elColCenter">等于</el-col>
                        <el-col :span="5">
                        <el-input v-model="DataForm.documentNo" size="mini"></el-input>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(DataForm)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">发起时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.docDateStart"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">发起时间</el-col>
                        <el-col :span="6"  class="elColCenter">小于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.docDateStart"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">超时</el-col>
                        <el-col :span="6"  class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-radio v-model="DataForm.radio" label="1">是</el-radio>
                            <el-radio v-model="DataForm.radio" label="2">否</el-radio>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWFMVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
export default {
    name:'workProcess',
    data() {
        return {
            dialogWFMVisible:false,
            rowPStype:false,
            rowPSDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            labelPosition: 'left',
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '状态'
                },
                {
                    key: 'fcode',
                    title: '类型'
                },
                {
                    key: 'fcode',
                    title: '单据类型'
                },
                {
                    key: 'fcode',
                    title: '业务工作'
                },
                {
                    key: 'fcode',
                    title: '发起人'
                },
                {
                    key: 'fcode',
                    title: '发起时间'
                },
                {
                    key: 'fcode',
                    title: '主题'
                },
                {
                    key: 'fcode',
                    title: '上一节点'
                },
                {
                    key: 'fcode',
                    title: '审批人接收时间'
                },
                {
                    key: 'fcode',
                    title: '标准用时'
                },
                {
                    key: 'fcode',
                    title: '已耗时'
                },{
                    key: 'fcode',
                    title: '转发人'
                },
                {
                    key: 'fcode',
                    title: '转发时间'
                },
                {
                    key: 'fcode',
                    title: '委托人'
                },
                {
                    key: 'fcode',
                    title: '委托时间'
                }
            ],
            tableData:[],
            multipleSelection: [],
            checked:false,
            DataForm: {
                WFMtype: '',
                radio: 1,
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                fremark: ''
            },
            WFMtypeoptions:[],
            formLabelWidth: '120px',
        };
    },
    components: {
      DynamicTable,
      PSpage
    },
    created(){
        this.$nextTick(()=>{
            this.getTableData('')
        })
    },
    computed:{
        
    },
    methods:{
        //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页、下一页
        onCurrentChange(val){
             this.pageNum = val;
            this.getTableData('')
        },
        //刷新
        refresh(){

        },
        //查询
        search(){
            this.dialogWFMVisible=true;
        },
        // 搜索
        onSubmit(){
            this.getTableData(this.formCode);
        },
        getAll(){
            this.getTableData('')
        },
        // 获取表格数据
        getTableData(params){
            let data = {
                fcode: params,
                page:this.pageNum,
                size:this.pageSize
            };
            this.$api.processSet.getTableData(data).then(res=>{
                this.tableData = res.data.data.rows
                for(let i in this.tableData){
                    switch ( this.tableData[i].fstatus) {
                        case 3:
                             this.tableData[i].fstatus = '禁用'
                             break;
                        case 8:
                             this.tableData[i].fstatus = '生效'
                             break;
                        default:
                            break;
                    }
                    switch ( this.tableData[i].fsubprocess) {
                    case 1:
                            this.tableData[i].fsubprocess = '是'
                            break;
                    case 0:
                            this.tableData[i].fsubprocess = '否'
                            break;
                    default:
                        break;
                }
                }
            },error=>{
                console.log(error)
            })
        },
        //新增
        add(){
            this.dialogFormVisible = true
        },
        addSubmit(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.processSet.addSubmit(this.form).then(res=>{
                        if(res.data.data.msg = "success"){
                            this.dialogFormVisible = false
                            this.$message.success('新增成功');
                            //刷新表格
                            this.getTableData('')
                        }
                    }),error=>{
                        console.log(error);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
             });

        },
        //删除
        deleteMsg(){
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个删除');
                 return;
            }
            this.$api.processSet.deleteMsg(this.multipleSelection[0].foid).then(res=>{
                    if(res.data.data.msg = "success"){
                        this.$message.success('删除成功');
                        //刷新表格
                        this.getTableData('')
                    }
                }),error=>{
                    console.log(error);
                }
        },
         //生效/禁用
        effectOrDisableMsg(){
            let status = this.multipleSelection[0];
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个删除');
                 return;
            }else if(this.multipleSelection.length = 0){
                this.$message.error('请选择一项删除');
                 return;
            };
            
            switch (status.fstatus) {
                case '生效':
                    status.fstatus = 3
                    break;
                case '禁用':
                    status.fstatus = 8
                    break;
                default:
                    break;
            }
            let data = {
                foid  : status.foid,
                status  : status.fstatus
            }
            this.$api.processSet.effectOrDisable(data).then(res=>{
                    if(res.data.data.msg = "success"){
                        this.$message.success('操作成功');
                        //刷新表格
                        this.getTableData('')
                       
                    }
                }),error=>{
                    console.log(error);
                }
        },
        toEdit(){
             if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个编辑');
                 return;
            }else if(this.multipleSelection.length = 0){
                this.$message.error('请选择一项编辑');
                 return;
            };
             this.$router.push({
                name:"svgIndex",
                params:{
                    data: this.multipleSelection[0]
                    }
             })
            
        },
        //查询发起人员
        MoreSearchPS(data){
            this.rowPStype = true;
            let finandata=data;
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="工作流监控";
            this.rowPSDataObj=finandata;
        },
        //获取人员查询结果
        showORhideForPS(data){
            if(data === false){
                this.rowPStype = false
            }else{
                this.rowPStype = true
            }
        },
    },
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>