<template>
<!-- 弹出框内容 -->
        <div v-show="visible">
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
                 <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
                    <el-input ref="nameInput" v-model="formData.code" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                    <el-input  v-model="formData.name" autocomplete="off" clearable></el-input>
                </el-form-item>
                 <!-- <el-form-item label="起点" :label-width="formLabelWidth" >
                    <el-input v-model="formData.workData" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="终点" :label-width="formLabelWidth" >
                    <el-input v-model="formData.workData" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业务数据" :label-width="formLabelWidth" >
                    <el-input v-model="formData.workData" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="隐藏" :label-width="formLabelWidth">
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item> -->
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input maxlength="1000" clearable  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
                </el-form-item>
            </el-tab-pane>
           <el-tab-pane label="流转条件" name="2">
                <el-tabs v-model="baseActiveName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="无条件" name="1">
                       
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" disabled v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="有条件" name="2">
                       
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea"  v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="[否则]条件" name="3">
                       
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" disabled v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="调用服务" name="4">
                         <el-form-item label="条件" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="baseInput" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('服务','服务查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                   
                </el-tabs>
            </el-tab-pane>
           
        </el-tabs>

        <!-- 搜索框 -->
         <el-dialog 
        :title="'调用服务查询'"
        class="workDialog"
         :modal="false"
          :close-on-click-modal="closeConfig"
          :visible.sync="dialogTableVisible">
             <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="编码" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8">
                    <el-form-item label="名称" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8" >
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
            
            <!-- 表格 -->
            <dynamic-table
                class="workTable"
                :height="310"
                :columns="columns"
                :table-data="gridData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                v-loading="tableLoading"
                element-loading-text="加载中"
            ></dynamic-table>
          
            <!-- 角色选择 END-->
            
            <!-- footer -->
            <footer>
                <el-button   size="small"   @click="gridDataAdd">确定</el-button>
                <!-- <el-button  type="primary" size="small" plain @click="dialogTableVisible = false">关闭</el-button> -->
            </footer>
            <!-- footer END-->
           </el-dialog>
            </el-form>
        </div>
</template>

<script>
/**
* @description 节点配置组件
* @create 2019-04-11
* @author liyuanquan
*/
import DynamicTable from '../../../components/common/dytable/dytable.vue';

export default {
    name: 'NodeLine',
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
            baseActiveName:'1',
            tableLoading:false,
            checked:false,
            autoSendChecked:false,
            dialogTableVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            baseTextarea:'',
            baseInput:'',
            activeName: '1',
            formLabelWidth: '120px',
            // 关闭对话框配置
            closeConfig: false,
            // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入名称', trigger: 'blur' },
                code: { required: true, message: '请输入编码', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: this.data,
            columns: [
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
                key: 'fstatus',
                title: '描述'
            }
        ],
        gridData:[],
        multipleSelection: [],
        options: [],
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
             if(obj.name === "Line"){console.log(obj)
                this.editData = obj;
                this.formData.code = this.editData.linefcode
                this.formData.fremark = this.editData.lineremark
                this.formData.name = this.editData.displayName
                switch (this.editData.decisionType ) {
                case 1:
                        this.formData.decisionType = '同意'
                    break;
                case 2:
                        this.formData.decisionType = '不同意'
                    break;
                case 3:
                        this.formData.decisionType = '待处理'
                    break;
                case 4:
                        this.formData.decisionType = '其他'
                    break;
            
                default:
                    break;
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
                setTimeout(() => {
                    this.$refs.nameInput.focus();
                }, 100);
            }else{
                this.$emit(
                    "saveLineData",
                    this.formData,
                    this.gridDatax
                ); 
            }
        }
    },
    created(){
        this.$nextTick(()=>{
            
           
        })
    },
    methods: {
        // 取消配置操作
        cancelConfig () {
            this.dialogVisible = false;
            this.$refs.workflowConfigForm.resetFields();
            this.$emit('cancel');
        },
        // 执行保存配置操作
        saveConfig () {
            this.$refs.workflowConfigForm.validate(valid => {
                if (!valid) return;
                this.$emit('save', this.formData);
                this.dialogVisible = false;
            });
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        baseInputTable(str,title){ 
            this.dialogTableVisible = true;
        },
         //业务工作-新增
        gridDataAdd(){
            if(this.multipleSelection.length == 0 || this.multipleSelection.length >1  ){
                this.$message.error('请正确选择');
                return
            }
            this.formData.work = this.multipleSelection[0].fname
             this.dialogTableVisible = false;
             //console.log(this.formData.work )
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
        reWorkSearchTable(){
            this.formData = []
            this.workSearchTable()
        },
         workSearch(){
             // 业务工作-搜索枚举项
            // this.workSearchOption()
            // this.workSearchTable()
            this.dialogTableVisible = true;
        },
        // 业务工作-获取表格数据
        workSearchTable(){
            
            this.tableLoading = true;
             let data = {
                fcode: this.formData.formCode,
                fname: this.formData.formName,
                fmfunctiontypecon: this.formData.formCtionTypeCon,
                page:this.pageNum,
                size:this.pageSize
            };
            this.$api.processSet.workSearchData(data).then(res=>{
                this.tableLoading = false;
                this.gridData = res.data.data.rows
                
                
            },error=>{
                console.log(error)
            })
        },
        // 业务工作-搜索枚举项
        workSearchOption(){
            this.$api.processSet.getWorkSearch().then(res=>{
                for( let i in res.data.data ){
                    this.options.push({value: i,label: res.data.data[i]})
                }  
            },error=>{
                console.log(error)
            })
        },
       
         //分页、下一页
        onCurrentChange(val){
             this.pageNum = val;
            this.workSearch('')
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 500px !important;
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
