<template>
<!-- 弹出框内容 -->
        <div v-if="visible">
            <el-form
            label-width="110px"
            :rules="configRules"
            ref="formData"
            class="dataForm"
            :model="formData"
            >
                <!-- TAB页 -->
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="1">
                        <!-- Condition -->
                        <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                            <el-input ref="nameInput" v-model="formData.name" autocomplete="off" @input="change($event)" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="业务工作" :label-width="formLabelWidth" prop="work">
                            <el-input v-model="formData.work" autocomplete="off"></el-input>
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="workSearch"></el-button>
                            <!-- <img class="icon-search" @click="workSearch" src="../../../assets/img/search.svg">-->
                        </el-form-item>
                        <el-form-item label="业务数据" :label-width="formLabelWidth"   prop="workData">
                            <el-input v-model="formData.workData" autocomplete="off" :disabled="true" ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="隐藏" :label-width="formLabelWidth" prop="work">
                            <el-checkbox v-model="formData.checked"></el-checkbox>
                        </el-form-item> -->
                        <el-form-item label="描述：" :label-width="formLabelWidth" prop="fremark">
                            <el-input maxlength="500" clearable  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
                        </el-form-item>
                        <!-- Condition END-->
                    </el-tab-pane>
                    <!-- <el-tab-pane label="业务服务参数列表" name="2">
                        <el-form-item label="业务服务" label-width="84px" prop="maxTime">
                            <el-input v-model="formData.maxTime" disabled autocomplete="off"></el-input>
                        </el-form-item>
                        <dynamic-table
                            class="workTable"
                            :height="310"
                            :columns="columns3"
                            :table-data="tableData"
                            :total="total"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            @current-change="onCurrentChange"
                            @selection-change="onSelectionChange"
                            v-loading="tableLoading"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-tab-pane> -->
                
                </el-tabs>
                <!-- 弹出框 -->
                <el-dialog 
                title="业务工作"
                class="workDialog"
                :modal="false"
                :close-on-click-modal="closeConfig"
                :visible.sync="dialogTableVisible">
                    <!-- Condition -->
                    <!-- 搜索框 -->
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-form-item label="编码 " label-width="43px">
                                <el-input clearable size="small" v-model="formData.formCode" @input="change($event)" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="名称 " label-width="43px">
                                <el-input clearable size="small" v-model="formData.formName" @input="change($event)" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="工作类型 " label-width="70px">
                                <el-select v-model="formData.formCtionTypeCon" @input="change($event)" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                
                            </el-form-item>
                        </el-col> 
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6" :offset="18">
                            <el-button type="primary" size="small" icon='el-icon-refresh'  @click="reWorkSearchTable('formData')">重置</el-button>
                            <el-button type="primary" size="small" icon='el-icon-search'  @click="workSearchTableBtn">搜索</el-button>
                        </el-col>
                    </el-row>
                    <!-- 表格 -->
                    <dynamic-table
                        class="workTable"
                        :height="310"
                        :columns="columns3"
                        :table-data="gridData"
                        :total="total"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        @current-change="onCurrentChange"
                        @selection-change="onSelectionChange"
                        v-loading="tableLoading"
                        element-loading-text="加载中"
                    ></dynamic-table>
                    <!-- Condition END-->
                    <!-- footer -->
                    <footer>
                        <el-button  type='success' icon='el-icon-check' size="small"  @click="gridDataAdd">确定</el-button>
                        <!-- <el-button  type="primary" size="small"  @click="dialogTableVisible = false">关闭</el-button> -->
                    </footer>
                    <!-- footer END-->
                </el-dialog>
             </el-form>
             <el-row :gutter="20">
                <el-col :span="12" style="text-align: right;">
                    <el-button icon='el-icon-copy-document' size="small" type='success' @click="saveConfig">保存</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button icon='el-icon-close' size="small" type='warning' @click="cancelConfig">取消</el-button>
                </el-col>
            </el-row>
        </div>
        
    <!-- </el-dialog> -->
</template>

<script>
/**
* @description 节点配置组件
* @create 2019-04-11
* @author liyuanquan
*/
import DynamicTable from '../../../components/common/dytable/dytable.vue';

export default {
    name: 'NodeFork',
     components: {
      DynamicTable,
    },
    props: {
        // 配置数据源
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // 当前配置节点类型
        type: {
            type: String,
            default: ''
        },
        // 配置对话框显示标识
        visible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            tableLoading:false,
            checked:false,
            autoSendChecked:false,
            dialogTableVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            activeName: '1',
            formLabelWidth: '120px',
            // 关闭对话框配置
            closeConfig: false,
            // 配置表单校验规则
            configRules: {
                work:[{ required: true, message: "请选择业务工作", trigger:'blur'}],
                name:[{ required: true, message: "请输入名称", trigger: "blur" }],
                performType:[{ required: true, message: '请选择参与类型', trigger: 'change' }]
            },
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {
                work:"",
                workData:"",
                name:'',
                fremark:'',
            },
            // task参与类型
            typeOpt: [
                {
                    label: '普通参与',
                    value: 'NORMAL'
                },
                {
                    label: '会签参与',
                    value: 'ALL'
                }
            ],
            columns: [
            {
                type: 'selection'
            },
            {
                key: 'fcode',
                title: '类别'
            },
            {
                key: 'fname',
                title: '内容'
            },
            {
                key: 'fstatus',
                title: '描述'
            }
        ],
        columns2: [
            {
                key: 'fcode',
                title: '节点'
            },
            {
                key: 'fname',
                title: '节点类别'
            },
            {
                key: 'fstatus',
                title: '选择'
            }
        ],
        columns3: [
             {
                type: 'selection'
            },
            {
                key: 'fcode',
                title: '编码'
            },
            {
                key: 'fname',
                title: '名称'
            },
            {
                key: 'fremark',
                title: '描述'
            }
        ],
        tableData:[],
        tableData2:[],
        gridData:[],
        multipleSelection: [],
        options: [],
        editData:{},
        };
    },
    computed: {
        title () {
            const typeConfig = {
                Start: '端点配置',
                End: '端点配置',
                Condition: '手工活动配置',
                Fork: '自由活动配置',
                Join: '审核活动配置',
                Task: '路由配置',
                Line: '连接线配置'
            };
            return typeConfig[this.type] || '保存工作流';
        }
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                if(obj.name === "Fork"){
                    if(!obj.oid && (obj.isSaveFlag==undefined)){
                        this.formData = {};
                        this.formData.name = obj.displayName;
                        this.formData.work ="";
                    }else{
                        this.editData = obj;
                        this.formData.oid = this.editData.oid;
                        this.formData.name = this.editData.displayName;
                        this.formData.work = this.editData.mactivity.name;
                        this.formData.workId = this.editData.mactivity.oid;
                        this.formData.workCode = this.editData.mactivity.code;
                        this.formData.workData = this.editData.dataType.name;
                        this.formData.workDataId = this.editData.dataType.oid;
                        this.formData.workDataCode = this.editData.dataType.code;
                        this.formData.checked = this.editData.hidden==1?true:false;
                        this.formData.fremark = this.editData.fremark;
                    }
                }
            },
            deep: true,
            immediate: true
        },
        // 监听对话框显示标识
        dialogVisible (bool) {
            this.$emit('update:visible', bool);
        },
        // 对话框显示 自动聚焦name输入框
        visible (bool) {
            this.dialogVisible = bool;
            if (bool) {
                // this.$refs['formData'].resetFields();
            }else {
                 //console.log( this.formData)
            }
        }
    },
    methods: {
        // 取消配置操作
        cancelConfig () {
            this.$emit("saveFormData",this.formData,'CANCEL');
        },
        // 执行保存配置操作
        saveConfig () {
            if(this.formData.name == ''){
                this.$message.error("保存失败,请填写名称!");
                return;
            }
            if(this.formData.work == ''){
                this.$message.error("保存失败,请选择业务工作!");
                return;
            }
            this.$emit("saveFormData",this.formData,'SAVE');
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
         //业务工作-新增
        gridDataAdd(){
            if(this.multipleSelection.length == 0 || this.multipleSelection.length >1  ){
                this.$message.error('请正确选择');
                return
            }
            this.formData.work = this.multipleSelection[0].fname;
            this.formData.workCode = this.multipleSelection[0].fcode;
            this.formData.workId = this.multipleSelection[0].foid;
            this.formData.workDataId = this.multipleSelection[0].fmclassOid;
            this.formData.workData = this.multipleSelection[0].fmclassName;
            this.formData.workDataCode = this.multipleSelection[0].fmclassCode;
            this.dialogTableVisible = false;
            // console.log(this.formData.work )
        },
        add(){

        },
         //删除
        deleteMsg(){
            
        },
         //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
          // 业务工作-获取表格数据-重置
        reWorkSearchTable(formName){
            //this.$refs[formName].resetFields();
            this.formData.formCode='';
            this.formData.formName='';
            this.formData.formCtionTypeCon='';
            this.pageNum = 1;
            this.workSearchTable()
        },
        workSearchTableBtn(){
            this.pageNum = 1;
            this.workSearchTable();
        },
         workSearch(){
            // 业务工作-搜索枚举项
            this.formData.formCode='';
            this.formData.formName='';
            this.formData.formCtionTypeCon='';
            this.pageNum = 1;
            this.workSearchOption();
            this.workSearchTable();
            this.dialogTableVisible = true;
        },
        // 业务工作-获取表格数据
        workSearchTable(){
            this.tableLoading = true;
             let data = {
                fcode: this.formData.formCode,
                fname: this.formData.formName,
                fmfunctiontypecon: 5,
                page:this.pageNum,
                size:this.pageSize
            };
            this.$api.processSet.workSearchData(data).then(res=>{
                this.tableLoading = false;
                this.gridData = res.data.data.rows
                this.total = res.data.data.total;
            },error=>{
                console.log(error)
            })
        },
        // 业务工作-搜索枚举项
        workSearchOption(){
            this.options=[];
            this.$api.processSet.getWorkSearch().then(res=>{
                for( let i in res.data.data ){
                    this.options.push({value: i,label: res.data.data[i]})
                }  
            },error=>{
                console.log(error)
            })
        },
        change(e){
        this.$forceUpdate()
        },
         //分页、下一页
        onCurrentChange(val){
            this.pageNum = val;
            this.workSearchTable('')
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 580px !important;
}
 /deep/ .el-dialog__header{
     display: block !important;
 }
 /deep/ .el-dialog{
         box-shadow: 5px 4px 50px rgba(0,0,0,.3);
 }
 /deep/ .el-input{
         width: 70%;
 }
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
 /deep/ .el-form-item__content{
         display: flex;
 }
 .icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .joinTableBox{
    margin: 18px 0;
 }
 .joinCheckBox{
     margin-top: 10px;
 }
 .joinBtnBox{
     display: flex;
     align-items: center;
     flex-wrap: wrap;
     justify-content: flex-end;
     button{
         margin-bottom: 10px;
     }
 }
 .rangeTableBox{
      margin: 18px 0 !important;
 }
 .workDialog{
     /deep/ .el-dialog{
          min-height: 500px;
     }
    
     /deep/ .el-input{
         width: 100%;
     }
     /deep/ .el-form-item__label{
         padding:0
     }
     button{
         margin-bottom: 10px;
     }
     .workTable{
        /deep/ .el-input{
            width: 50% ;
         }
         /deep/ .el-pagination__jump{
            margin: 0 10px;
         }
     }
 }
 footer{
     margin-top: 18px;
     width: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
    //  button{
    //      margin-left: 50px !important;
    //  }
 }
</style>
