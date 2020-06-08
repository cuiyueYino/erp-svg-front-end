<template>
    <div>     
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="10" :offset="14">
                     <el-button type="danger" icon="el-icon-refresh" plain @click="refresh">刷新</el-button>
                     <el-button type="success" icon="el-icon-search" plain @click="search">查询</el-button>
                     <el-button type="warning" icon="el-icon-document" plain @click="Tolook">查看</el-button>
                     <el-button type="success" icon="el-icon-share" plain @click="baseInputTable()">转发</el-button>
                     <el-button type="danger" icon="el-icon-circle-plus" plain @click="AddRow">添加</el-button>
                     <el-button type="warning" icon="el-icon-delete-solid" plain @click="DisableRow">取消</el-button>
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
                :tableRowClassName="tableRowClassName"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
        <!-- 查询 -->
        <el-dialog title="关注事项" :visible.sync="dialogWFMVisible" :close-on-click-modal="false" width="50%">
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
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
        <flowchart  :rowFCDDataObj="rowFCDDataObj" :rowFCDtype="rowFCDtype" @changeShow="closeflowchart"/>
        <addConcItem  :rowACIDataObj="rowACIDataObj" :rowACItype="rowACItype" @changeShow="closeaddConcItem"/>
    </div>
</template>
<style>
.el-table .green {
    background: rgba(130, 255, 140, 0.2);
}
.el-table .gray {
    background: rgba(192, 192, 192, 0.616);
}
.el-table .red {
    background: rgba(248, 15, 15, 0.178);
}
.el-table .white {
    background: rgba(255, 255, 255, 1);
}
</style>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import baseInfoDialog from './user-tree-search.vue';
import flowchart from './flow-chart-detail.vue';
import addConcItem from './add-concerns-item.vue';
export default {
    name:'workProcess',
    components: {
      DynamicTable,
      flowchart,
      baseInfoDialog,
      addConcItem,
      PSpage
    },
    data() {
        return {
            dialogWFMVisible:false,
            rowPStype:false,
            rowUTStype:false,
            rowFCDtype:false,
            baseInputTableF:false,
            financingLFCAtype:false,
            rowACItype:false,
            baseInputType:'',
            baseInputTitle:'',
            rowPSDataObj:{},
            rowUTSDataObj:{},
            rowFCDDataObj:{},
            rowACIDataObj:{},
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
                    title: '当前审批人'
                },
                {
                    key: 'fcode',
                    title: '主题'
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
    
    created(){
    },
    computed:{
        
    },
    methods:{
        //根据状态改背景色
        tableRowClassName({ row }) {
            if (row.state === '暂停') {
                return 'gray';
            } else if (row.state === '已作废') {
                return 'red';
            } else if (row.state === '已完结') {
                return 'green';
            }
            return '';
        },
        baseInputTable(){ 
            this.rowUTStype = true;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="待办事项";
            this.rowUTSDataObj=finandata;
        },
        closeBaseInfo(data){
            if(data === false){
                this.rowUTStype = false
            }else{
                this.rowUTStype = true
            }
        },
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
        //添加
        AddRow(){
            this.rowACItype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="关注事项";
            this.rowACIDataObj=finandata;
        },
        closeaddConcItem(data){
            if(data === false){
                this.rowACItype = false
            }else{
                this.rowACItype = true
            }
        },
        //取消
        DisableRow(){},
        //查看
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
        //流程图查看
        flowChart(){
            let selectData=this.multipleSelection;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="入库申请申请人审批";
            this.rowFCDDataObj=finandata;
            this.rowFCDtype=true;
        },
        //流程图关闭
        closeflowchart(data){
            if(data === false){
                this.rowFCDtype = false
            }else{
                this.rowFCDtype = true
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
        },
        //新增
        add(){
            this.dialogFormVisible = true
        },
        addSubmit(formName){
            
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