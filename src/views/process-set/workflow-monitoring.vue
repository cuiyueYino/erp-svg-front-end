<template>
    <div>     
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="10" :offset="14">
                     <el-button type="success" icon="el-icon-refresh" plain @click="refresh">刷新</el-button>
                     <el-button type="success" icon="el-icon-search" plain @click="search">查询</el-button>
                     <el-button type="danger" icon="el-icon-more" plain @click="circulation">流转</el-button>
                     <el-button type="warning" icon="el-icon-edit" plain @click="toEdit">修改</el-button>
                     <el-button type="success" icon="el-icon-delete-solid" plain @click="deleteMsg">删除</el-button>
                     <el-button type="danger" icon="el-icon-document" plain @click="Tolook">查看</el-button>
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
        <LWMworkflowpage  :rowLWMDataObj="rowLWMDataObj" :rowLWMtype="rowLWMtype" @changeShow="showORhidelookpage"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import LWMworkflowpage from './look-workflow-monitoring'
export default {
    name:'workProcess',
    data() {
        return {
            dialogWFMVisible:false,
            rowPStype:false,
            rowLWMtype:false,
            rowPSDataObj:{},
            rowLWMDataObj:{},
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
      PSpage,
      LWMworkflowpage
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
        //流转
        circulation(){
        },
        //
        Tolook(){
            /*let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.rowLWMtype=true;
                    let finandata={};
                    finandata.finanrowname="";
                    finandata.finanrowId=selectOption[0].id;
                    finandata.nametitle="工作流监控";
                    this.rowLWMDataObj=finandata;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }*/
            this.rowLWMtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="工作流监控";
            finandata.lookflag="look";
            this.rowLWMDataObj=finandata;
        },
        //查看返回处理
        showORhidelookpage(data){
            if(data === false){
                this.rowLWMtype = false
            }else{
                this.rowLWMtype = true
            }
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
            /*this.$api.processSet.getTableData(data).then(res=>{
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
            })*/
        },
        //提交
        addSubmit(formName){
            
        },
        //删除
        deleteMsg(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个删除');
                return;
            }
        },
        toEdit(){
           /*let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.rowLWMtype=true;
                    let finandata={};
                    finandata.finanrowname="";
                    finandata.finanrowId=selectOption[0].id;
                    finandata.nametitle="工作流监控";
                    this.rowLWMDataObj=finandata;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }*/
            this.rowLWMtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="工作流监控";
            finandata.lookflag="edit";
            this.rowLWMDataObj=finandata;  
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