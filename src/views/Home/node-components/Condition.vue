<template>
<!-- 弹出框内容 -->
        <div v-show="visible">
        <!-- TAB页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="1">
                <!-- Condition -->
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                    <el-input ref="nameInput" v-model="formData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="业务工作" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="formData.work" autocomplete="off"></el-input>
                    <img class="icon-search" @click="workSearch" src="../../../assets/img/search.svg">
                </el-form-item>
                <el-form-item label="业务数据" :label-width="formLabelWidth" >
                    <el-input v-model="formData.workData" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组织结构" :label-width="formLabelWidth" >
                    <el-input v-model="formData.structure" autocomplete="off"></el-input>
                     <img class="icon-search" src="../../../assets/img/search.svg" @click="baseInputTable('用户','组织结构查询')">
                </el-form-item>
                <el-form-item label="隐藏" :label-width="formLabelWidth">
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item>
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input maxlength="1000"  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
                </el-form-item>
                <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="基本设置" name="2">
                <!-- Condition -->
                <el-form-item label="最大工作时间" :label-width="formLabelWidth" prop="maxTime">
                    <el-input v-model="formData.maxTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间单位" :label-width="formLabelWidth" prop="resource">
                     <el-radio-group v-model="formData.resource">
                        <el-radio label="小时"></el-radio>
                        <el-radio label="天"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  :label-width="formLabelWidth" prop="autoSend">
                    <el-checkbox v-model="autoSendChecked">超过最大时间系统自动发送催办消息</el-checkbox>
                </el-form-item>
                <el-form-item label="回收处理服务" :label-width="formLabelWidth" prop="recovery">
                    <el-input v-model="formData.recovery" autocomplete="off"></el-input>
                     <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('服务','回收处理服务查询')">
                </el-form-item>
                 <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="参与者" name="3">
                <!-- Condition -->
                <el-radio-group v-model="joinCheckBox" class="joinCheckBox">
                    <el-radio :label="1">由权限控制</el-radio>
                    <el-radio  :label="2">手工指定下一节点参与者</el-radio>
                    <el-radio  :label="3">可略过</el-radio>
                    <el-radio  :label="4">多封邮件</el-radio>
                </el-radio-group>
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="columns"
                            :table-data="tableData"
                            @selection-change="onSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                    <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" plain @click="joinSearch('新增参与者')">新增</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg">删除</el-button>
                     
                    </el-col>
                </el-row>
                 <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="抄送" name="4">
                <!-- Condition -->
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="columns"
                            :table-data="tableData"
                            @selection-change="onSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                    <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" plain @click="joinSearch('新增抄送')">新增</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg">删除</el-button>
                     
                    </el-col>
                </el-row>
                 <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="审核单范围" name="5">
                 <!-- Condition -->
                 <el-row :gutter="24" class="rangeTableBox">
                 <dynamic-table
                    :columns="columns2"
                    :table-data="tableData2"
                    @selection-change="onSelectionChange"
                    v-loading="false"
                    element-loading-text="加载中"
                 ></dynamic-table>
                 </el-row>
                <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="业务功能" name="6">
                 <!-- Condition -->
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="columns4"
                            :table-data="tableData"
                            @selection-change="onSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                    <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" plain @click="joinSearch('定义关系')">定义关系</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg">删除关系</el-button>
                     
                    </el-col>
                </el-row>
                 <!-- Condition END-->
            </el-tab-pane>
        </el-tabs>

        <!-- 弹出框 -->
        <el-dialog 
        :title="titleStr"
        class="workDialog"
         :modal="false"
          :close-on-click-modal="closeConfig"
          :visible.sync="dialogTableVisible">
            <!-- 基本信息 -->
            <div v-show="showBaseInfo && titleStr!=='定义关系'" class="base-info">
                <el-tabs v-model="baseActiveName" @tab-click="handleClick">
                    <el-tab-pane label="角色" name="1">
                         <el-form-item label="角色" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="baseInput" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg" @click="baseInputTable('角色','角色查询')" >
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="用户" name="2">
                        <el-form-item label="用户" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="baseInput" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg" @click="baseInputTable('用户','用户查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="服务" name="3">
                        <el-form-item label="服务" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="baseInput" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('服务','服务查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="表达式" name="4">
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="职务" name="5">
                        <el-form-item label="职务" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="baseInput" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('职务','职务查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 基本信息 END-->
            <!-- 定义关系 -->
             <el-col :span="16" style="margin-bottom: 170px;">
                <el-form-item label="关系类型" label-width="70px">
                        <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> 
            <!-- 定义关系 END-->
            <!-- 角色选择 -->
            <div v-show="showInfoCheck">
            <!-- 搜索框 -->
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
                  <el-col :span="8">
                    <el-form-item label="工作类型" label-width="70px">
                         <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
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
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
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
            </div>
            <!-- 角色选择 END-->
            
            <!-- footer -->
            <footer>
                <el-button   size="small"  @click="gridDataAdd">确定</el-button>
                <!-- <el-button  type="primary" size="small" plain @click="dialogTableVisible = false">关闭</el-button> -->
            </footer>
            <!-- footer END-->
           </el-dialog>
        <!-- 第三层弹窗 -->
            <base-info-dialog class="children-dialog" :visible="baseInputTableF" :type="baseInputType" :title="baseInputTitle" @closeDialog="closeBaseInfo"></base-info-dialog>
        
        </div>
         <!-- </el-form> -->
    <!-- </el-dialog> -->
</template>

<script>
/**
* @description 节点配置组件
* @create 2019-04-11
* @author liyuanquan
*/
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import baseInfoDialog from './base-info-dialog'
export default {
    name: 'NodeCondition',
     components: {
      DynamicTable,
      baseInfoDialog,
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
    watch:{
        visible(val){
            this.visible = val
        },
    },
    data () {
        return {
            baseInputType:'',
            baseInputTitle:'',
            titleStr:'',
            tableLoading:false,
            checked:false,
            autoSendChecked:false,
            dialogTableVisible:false,
            baseInputTableF:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            activeName: '1',
            formLabelWidth: '120px',
            joinCheckBox:1,
            // 关闭对话框配置
            closeConfig: false,
            // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {
                joinCheckBox:1
            },
           
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
         columns4: [
             {
                type: 'selection'
            },
            {
                key: 'fcode',
                title: '功能'
            },
            {
                key: 'fname',
                title: '数据源'
            },
            {
                key: 'fremark',
                title: '生成关系'
            }
        ],
        tableData:[],
        tableData2:[],
        gridData:[],
        multipleSelection: [],
        options: [],
        showBaseInfo:false,
        showInfoCheck:false,
        baseActiveName:'1',
        baseInput:'',
        baseTextarea:'',
        };
    },
    computed: {
        // title () {
        //     const typeConfig = {
        //         Start: '端点配置',
        //         End: '端点配置',
        //         Condition: '手工活动配置',
        //         Fork: '自由活动配置',
        //         Join: '审核活动配置',
        //         Task: '路由配置',
        //         Line: '连接线配置'
        //     };
        //     return typeConfig[this.type] || '保存工作流';
        // }
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                this.formData = JSON.parse(JSON.stringify(obj));
                // console.log( this.formData)
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
            }
        }
    },
    methods: {
       
        handleClick(tab, event) {
            // console.log(tab, event);
        },
         //业务工作-新增
        gridDataAdd(){
            if(this.titleStr = '定义关系'){
                
            }else{
                 if(this.multipleSelection.length == 0 || this.multipleSelection.length >1  ){
                    this.$message.error('请正确选择');
                    return
                 }
                this.formData.work = this.multipleSelection[0].fname
            }
             this.dialogTableVisible = false;
             console.log(this.formData.work )
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
        //业务工作弹窗
        workSearch(){
            this.titleStr = '业务工作'
             this.showInfoCheck = true;
             this.showBaseInfo = false;
             // 业务工作-搜索枚举项
            this.workSearchOption()
            this.workSearchTable()
        },
        // 业务工作-获取表格数据
        workSearchTable(){
            this.dialogTableVisible = true;
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
                this.pageNum = res.data.data.page
                this.total = res.data.data.total
                
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
        // 参与人弹窗
        joinSearch(Str){
            this.titleStr = Str;
            this.dialogTableVisible = true;
            this.showInfoCheck = false;
            this.showBaseInfo = true;

        },
        // 参与人-获取表格数据
        joinSearchTable(){
            this.dialogTableVisible = true;
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
                this.pageNum = res.data.data.page
                this.total = res.data.data.total
                
            },error=>{
                console.log(error)
            })
        },
        baseInputTable(str,title){ 
            this.baseInputTableF = true;
            this.baseInputTitle= title
            this.baseInputType = str;
        },
        closeBaseInfo(){
            
            this.baseInputTableF = false;
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
     justify-content: center;
     button{
         margin-bottom: 10px;
     }
     /deep/ .el-button+.el-button{
         margin-left: 0; 
     }
 }
 .rangeTableBox{
      margin: 18px 0 !important;
 }
 .workDialog{
     /deep/ .el-dialog{
          min-height: 370px;
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
 .children-dialog{
      /deep/ .el-dialog{
          min-height: 370px;
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
 .base-info{
     height: 200px;
     /deep/ .el-input{
            width: 70% ;
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
