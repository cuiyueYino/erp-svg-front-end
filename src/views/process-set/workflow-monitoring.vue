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
                            <el-select v-model="DataForm.status" size="mini">
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
                            <el-select v-model="DataForm.companyId" size="mini">
                                <el-option
                                    v-for="item in conmpanyList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">业务数据</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.mclassId" size="mini">
                                <el-option
                                    v-for="item in tmClassList"
                                    :key="item.foid"
                                    :label="item.fname"
                                    :value="item.foid"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">业务工作</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.factivityName" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">主题</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.subject" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">接收时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.freceiveTimeGt"
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
                                v-model="DataForm.freceiveTimeLt"
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
                        <el-input v-model="DataForm.selectOptionName" size="mini" clearable @clear="cleareAddresser()"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(DataForm)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">发起时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.createTimeGt"
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
                                v-model="DataForm.createTimeLt"
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
                            <el-radio v-model="DataForm.timeOut" label="0">是</el-radio>
                            <el-radio v-model="DataForm.timeOut" label="1">否</el-radio>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWFMVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="删除邮件" :visible.sync="dialogFormVisible">
            <el-form :model="deleteForm">   
                <el-form-item :label-width="formLabelWidth">
                    <el-radio v-model="deleteForm.radio" label="1">只删除选中邮件</el-radio>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-radio v-model="deleteForm.radio" label="2">删除源单据所有邮件、流转记录并回收源单据</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <LWMworkflowpage  :rowLWMDataObj="rowLWMDataObj" :rowLWMtype="rowLWMtype" @changeShow="showORhidelookpage"/>
        <CWMworkflowpage  :rowCWMDataObj="rowCWMDataObj" :rowCWMtype="rowCWMtype" @changeShow="showORhideCpage"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import LWMworkflowpage from './look-workflow-monitoring.vue';
import CWMworkflowpage from './circulation-workflow-monitoring.vue'
export default {
    name:'workProcess',
    data() {
        return {
            dialogWFMVisible:false,
            rowPStype:false,
            rowLWMtype:false,
            rowCWMtype:false,
            rowPSDataObj:{},
            rowLWMDataObj:{},
            rowCWMDataObj:{},
            dialogFormVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: '',
            labelPosition: 'left',
            deleteForm:{
                radio:'1'
            },
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'statusStr',
                    title: '状态'
                },
                {
                    key: 'statusTyp',
                    title: '类型'
                },
                {
                    key: 'metaClassName',
                    title: '单据类型'
                },
                {
                    key: 'destNodeName',
                    title: '业务工作'
                },
                {
                    key: 'startMan',
                    title: '发起人'
                },
                {
                    key: 'startTime',
                    title: '发起时间'
                },
                {
                    key: 'subject',
                    title: '主题'
                },
                {
                    key: 'addresser',
                    title: '上一节点'
                },
                {
                    key: 'receiveTime',
                    title: '审批人接收时间'
                },
                {
                    key: 'standardTime',
                    title: '标准用时'
                },
                {
                    key: 'handleTime',
                    title: '已耗时'
                },{
                    key: 'encyclicMan',
                    title: '转发人'
                },
                {
                    key: 'encyclicTime',
                    title: '转发时间'
                },
                {
                    key: 'transmitMan',
                    title: '委托人'
                },
                {
                    key: 'transmitTime',
                    title: '委托时间'
                }
            ],
            tableData:[],
            multipleSelection: [],
            checked:false,
            statusType:{
                
            },
            DataForm: {
                status: '',
                selectOptionName:'',
                companyId: '',
                mclassId: '',
                factivityName: '',
                subject: '',
                freceiveTimeLt: '',
                freceiveTimeLt:'',
                promoterStaffId:'',
                createTimeLt: '',
                createTimeGt: '',
                timeOut:''
            },
            WFMtypeoptions:[
                {
                    value:'0',
                    label:'--'
                },
                {
                    value:'1',
                    label:'待办'
                },
                {
                    value:'2',
                    label:'作废'
                },
                {
                    value:'3',
                    label:'已办'
                },
                {
                    value:'4',
                    label:'抄送'
                },
                {
                    value:'5',
                    label:'其他'
                }
            ],
            conmpanyList:[],//公司列表
            tmClassList:[],//业务数据列表
            formLabelWidth: '120px',
        };
    },
    components: {
      DynamicTable,
      PSpage,
      LWMworkflowpage,
      CWMworkflowpage
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
             this.getTableData('')
        },
        //查看
        Tolook(){
            let selectOption = this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.rowLWMtype=true;
                    let finandata={};
                    finandata.foid=selectOption[0].foid;
                    finandata.srcOid=selectOption[0].srcOid;
                    finandata.operationType=false;
                    finandata.lookflag = 'look'
                    finandata.nametitle="工作流监控";
                    this.rowLWMDataObj=finandata;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //查看返回处理
        showORhidelookpage(result){
            if(result){
                this.rowLWMtype = false
                this.refresh()
            } else {
                this.rowLWMtype = false
            }
        },
        //流转
        circulation(){
            // this.rowCWMtype = true;
            // let finandata={};
            // finandata.finanrowname="";
            // finandata.finanrowId="";
            // finandata.nametitle="工作流监控";
            // finandata.lookflag="update";
            // this.rowCWMDataObj=finandata;

            let selectOption = this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.rowCWMtype=true;
                    let finandata={};
                    finandata.foid=selectOption[0].foid;
                    finandata.srcOid=selectOption[0].srcOid;
                    finandata.operationType=false;
                    finandata.nametitle="工作流监控";
                    this.rowCWMDataObj=finandata;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //流转返回处理
        showORhideCpage(data){
            if(data === false){
                this.rowCWMtype = false
            }else{
                this.rowCWMtype = true
            }
        },
        //查询
        search(){
            this.dialogWFMVisible=true;
            
            //获取公司列表
            this.$api.processSet.getCompanyData().then(res=>{
                let array = res.data.data.rows;
                let defaultOption = {
                    id:'0',
                    name:'--'
                };
                array.unshift(defaultOption);
                this.conmpanyList = array;
            },error=>{
                console.log(error)
            })

            //获取业务数据列表
            this.$api.processSet.getTmClass().then(res=>{
                let array = res.data.data;
                let defaultOption = {
                    foid:'0',
                    fname:'--'
                };
                array.unshift(defaultOption);
                this.tmClassList = array;
            },error=>{
                console.log(error)
            })
        },
        // 搜索
        onSubmit(){
            this.dialogWFMVisible=false;
            this.pageNum = 0;
            this.pageSize = 10;
            this.getTableData();
        },
        getAll(){
            this.getTableData('')
        },
        // 获取表格数据
        getTableData(params){
            if(this.DataForm.status == 0){
                this.DataForm.status = null;
            }
            if(this.DataForm.companyId == 0){
                this.DataForm.companyId = null;
            }
            if(this.DataForm.mclassId == 0){
                this.DataForm.mclassId = null;
            }
            let data = {
                findFilter:this.DataForm,
                page:this.pageNum,
                size:this.pageSize
            };
            this.$api.processSet.getMailInfo(data).then(res=>{
                this.total = res.data.data.total;
                this.tableData = res.data.data.rows;
            },error=>{
                console.log(error)
            })
        },
        //提交
        addSubmit(formName){
            
        },
        //删除
        deleteMsg(){
            let selectOption = this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length > 1){
                    this.$message.error('只能选择一个删除');
                    return;
                } else {
                    this.dialogFormVisible=true;
                }
            } else {
                this.$message.error('请选择一行需要删除的数据!');
            }
            
        },
        deleteConfirm(){
            this.dialogFormVisible=false;
            let data = {
                removeType:this.deleteForm.radio,
                mailInfo:{
                    foid:this.multipleSelection[0].foid
                }
            }

            this.$api.processSet.removeMail(data).then(res=>{
                this.refresh()
            },error=>{
                console.log(error)
            })
        },
        toEdit(){
           let selectOption = this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }  else{
                    this.rowLWMtype=true;
                    let finandata={};
                    finandata.foid=selectOption[0].foid;
                    finandata.srcOid=selectOption[0].srcOid;
                    finandata.operationType=false;
                    finandata.lookflag = 'edit';
                    finandata.nametitle="工作流监控";
                    this.rowLWMDataObj=finandata;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
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
            this.rowPStype = false
        },
        //清空发起人
        cleareAddresser(){
            this.DataForm.promoterStaffId='';
        }
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