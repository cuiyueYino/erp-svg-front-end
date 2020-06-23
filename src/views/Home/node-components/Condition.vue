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
                            :columns="joinusercolumns"
                            :table-data="joinusertableData"
                            @selection-change="onSelectionjoinuserChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                    <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" plain @click="joinSearch('新增参与者')">新增</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg('新增参与者')">删除</el-button>
                    </el-col>
                </el-row>
                 <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="抄送" name="4">
                <!-- Condition -->
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="CCcolumns"
                            :table-data="CCtableData"
                            @selection-change="onSelectionChangeCC"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                    <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" plain @click="joinSearch('新增抄送')">新增</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg('新增抄送')">删除</el-button>
                     
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
            :visible.sync="dialogTableVisible"
            v-if="dialogTableVisible"
            >
            <!-- 基本信息 -->
            <div v-show="showBaseInfo && titleStr!=='定义关系'" class="base-info">
                <el-tabs v-model="baseActiveName" @tab-click="basehandleClick">
                    <el-tab-pane label="角色" name="1">
                         <el-form-item label="角色" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="roleReq.name" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg" @click="baseInputTable('角色','角色查询')" >
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="roleReq.role_expression"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="用户" name="2">
                        <el-form-item label="用户" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="UserListReq.fname" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg" @click="baseInputTable('用户','用户查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="UserListReq.fenglishname"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="服务" name="3">
                        <el-form-item label="服务" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="serveReq.fname" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('服务','服务查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="serveReq.fenglishname"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="表达式" name="4">
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="baseTextarea"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="职务" name="5">
                        <el-form-item label="职务" :label-width="formLabelWidth">
                            <el-input placeholder="请选择" v-model="posLReq.fname" :disabled="true"> </el-input>
                            <img class="icon-search" src="../../../assets/img/search.svg"  @click="baseInputTable('职务','职务查询')">
                        </el-form-item>
                        <el-form-item label="条件表达式" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="posLReq.fenglishname"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- 基本信息 END-->
            <!-- 定义关系 -->
             <el-col :span="16" v-show="titleStr ==='定义关系'" style="margin-bottom: 170px;">
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
                @selection-change="onSelectionWorkChange"
                v-loading="tableLoading"
                element-loading-text="加载中"
            ></dynamic-table>
            </div>
            <!-- 角色选择 END-->
            
            <!-- footer -->
            <footer>
                <el-button   size="small"   @click="gridDataAdd">确定</el-button>
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
            joinusercolumns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fUsercode',
                    title: '类别'
                },
                {
                    key: 'fUsername',
                    title: '内容'
                },
                {
                    key: 'fUserRemake',
                    title: '描述'
                }
            ],
            CCcolumns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fUsercode',
                    title: '类别'
                },
                {
                    key: 'fUsername',
                    title: '内容'
                },
                {
                    key: 'fUserRemake',
                    title: '描述'
                }
            ],
            joinusertableData:[],
            CCtableData:[],
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
        CCmultipleSelection: [],
        joinusermultipleSelection: [],
        WorkmultipleSelection: [],
        options: [],
        showBaseInfo:false,
        showInfoCheck:false,
        baseActiveName:'1',
        baseActiveNameStr:'角色',
        baseInput:'',
        roleReq:{
            name:'',
            role_expression:''
        },
        serveReq:{
            fname:'',
            fenglishname:'',
        },
        posLReq:{
            fname:'',
            fenglishname:'',
        },
        UserListReq:{
            fname:'',
            fenglishname:'',
        },
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
        },
        basehandleClick(tab, event) {
            this.baseActiveNameStr=tab.label;
        },
         //业务工作-新增
        gridDataAdd(){
            if(this.titleStr === '定义关系'){
                
            }else if(this.titleStr === '新增参与者'){
                if(this.baseActiveNameStr=='角色'){
                    if(this.roleReq.name){
                        let roleObj={};
                        roleObj=this.roleReq;
                        roleObj.fUsername=roleObj.name;
                        roleObj.fUsercode=this.baseActiveNameStr;
                        roleObj.fUserRemake=roleObj.role_expression;
                        this.joinusertableData.push(roleObj);
                    }
                }else if(this.baseActiveNameStr=='用户'){
                    if(this.UserListReq.fname){
                        let UroleObj={};
                        UroleObj=this.UserListReq;
                        UroleObj.fUsername=UroleObj.fname;
                        UroleObj.fUsercode=this.baseActiveNameStr;
                        UroleObj.fUserRemake=UroleObj.fenglishname;
                        this.joinusertableData.push(UroleObj);
                    }
                }else if(this.baseActiveNameStr=='服务'){
                    if(this.serveReq.fname){
                        let SroleObj={};
                        SroleObj=this.serveReq;
                        SroleObj.fUsername=SroleObj.fname;
                        SroleObj.fUsercode=this.baseActiveNameStr;
                        SroleObj.fUserRemake=SroleObj.fenglishname;
                        this.joinusertableData.push(SroleObj);
                    }
                }else if(this.baseActiveNameStr=='职务'){
                    if(this.posLReq.fname){
                        let ProleObj={};
                        ProleObj=this.posLReq;
                        ProleObj.fUsername=ProleObj.fname;
                        ProleObj.fUsercode=this.baseActiveNameStr;
                        ProleObj.fUserRemake=ProleObj.fenglishname;
                        this.joinusertableData.push(ProleObj);
                    }
                }else if(this.baseActiveNameStr=='表达式'){
                    if(this.baseTextarea){
                        let BroleObj={};
                        BroleObj.fUsername=this.baseTextarea;
                        BroleObj.fUsercode=this.baseActiveNameStr;
                        BroleObj.fUserRemake='';
                        this.joinusertableData.push(BroleObj);
                    }
                }
            }else if(this.titleStr === '新增抄送'){
                if(this.baseActiveNameStr=='角色'){
                    if(this.roleReq.name){
                        let roleObj={};
                        roleObj=this.roleReq;
                        roleObj.fUsername=roleObj.name;
                        roleObj.fUsercode=this.baseActiveNameStr;
                        roleObj.fUserRemake=roleObj.role_expression;
                        this.CCtableData.push(roleObj);
                    }
                }else if(this.baseActiveNameStr=='用户'){
                    if(this.UserListReq.fname){
                        let UroleObj={};
                        UroleObj=this.UserListReq;
                        UroleObj.fUsername=UroleObj.fname;
                        UroleObj.fUsercode=this.baseActiveNameStr;
                        UroleObj.fUserRemake=UroleObj.fenglishname;
                        this.CCtableData.push(UroleObj);
                    }
                }else if(this.baseActiveNameStr=='服务'){
                    if(this.serveReq.fname){
                        let SroleObj={};
                        SroleObj=this.serveReq;
                        SroleObj.fUsername=SroleObj.fname;
                        SroleObj.fUsercode=this.baseActiveNameStr;
                        SroleObj.fUserRemake=SroleObj.fenglishname;
                        this.CCtableData.push(SroleObj);
                    }
                }else if(this.baseActiveNameStr=='职务'){
                    if(this.posLReq.fname){
                        let ProleObj={};
                        ProleObj=this.posLReq;
                        ProleObj.fUsername=ProleObj.fname;
                        ProleObj.fUsercode=this.baseActiveNameStr;
                        ProleObj.fUserRemake=ProleObj.fenglishname;
                        this.CCtableData.push(ProleObj);
                    }
                }else if(this.baseActiveNameStr=='表达式'){
                    if(this.baseTextarea){
                        let BroleObj={};
                        BroleObj.fUsername=this.baseTextarea;
                        BroleObj.fUsercode=this.baseActiveNameStr;
                        BroleObj.fUserRemake='';
                        this.CCtableData.push(BroleObj);
                    }
                }
            }else if(this.titleStr === '业务工作'){
                let selectOption= this.WorkmultipleSelection;
                if(selectOption.length >0){
                    if(selectOption.length >1){
                        this.$message.error('只能选择一行!');
                    }else{
                        //返回选中的父组件选中的row,并修某些改值
                        this.formData.work=selectOption[0].fname;
                        this.formData.workCode=selectOption[0].fcode;
                    }
                }else{
                    this.$message.error('请选择一行数据!');
                }
            }
            this.dialogTableVisible = false;
            //console.log( )
        },
         //删除
        deleteMsg(Str){
            if(Str=='新增参与者'){
                let selectData=this.joinusermultipleSelection;
                let updateDate=this.joinusertableData;
                for(var i=0;i<selectData.length;i++){
                    for(var j=0;j<updateDate.length;j++){
                        if(selectData[i].fUsername===updateDate[j].fUsername){
                            updateDate.splice(j, 1);
                        }
                    }
                }
                this.joinusertableData=updateDate;
            }else if(Str=='新增抄送'){
               let selectCCData=this.CCmultipleSelection;
                let updateCCDate=this.CCtableData;
                for(var i=0;i<selectCCData.length;i++){
                    for(var j=0;j<updateCCDate.length;j++){
                        if(selectCCData[i].fUsername===updateCCDate[j].fUsername){
                            updateCCDate.splice(j, 1);
                        }
                    }
                }
                this.CCtableData=updateCCDate; 
            }
        },
         //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSelectionjoinuserChange(val) {
            this.joinusermultipleSelection = val;
        },
        onSelectionChangeCC(val) {
            this.CCmultipleSelection = val;
        },
        onSelectionWorkChange(val) {
            this.WorkmultipleSelection = val;
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
            let fromdata={};
            if(this.formData.formCode){
                fromdata.fcode=this.formData.formCode;
            }
            if(this.formData.formName){
                fromdata.fname=this.formData.formName;
            }
            if(this.formData.formCtionTypeCon){
                fromdata.fmfunctiontypecon=this.formData.formCtionTypeCon;
            }
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            this.gridData=[];
            this.$api.processSet.workSearchData(fromdata).then(res=>{
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
            this.options=[];
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
            if(Str=='新增参与者'){
                this.roleReq=[];
                this.serveReq=[];
                this.posLReq=[];
                this.UserListReq=[];
                this.baseTextarea='';
            }else if(Str=='新增抄送'){
                this.roleReq=[];
                this.serveReq=[];
                this.posLReq=[];
                this.UserListReq=[];
                this.baseTextarea='';
            }
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
                //console.log(error)
            })
        },
        baseInputTable(str,title){ 
            this.baseInputTableF = true;
            this.baseInputTitle= title
            this.baseInputType = str;
        },
        closeBaseInfo(data,dialogtitle,type){
            if(data.length>0){
                if(type === '用户'){
                    if(dialogtitle === '组织结构查询'){
                        this.formData.structure=data[0].fname;
                        this.formData.structurecode=data[0].fcode;
                    }else if(dialogtitle === '用户查询'){
                        this.UserListReq=data[0];
                    }
                }else if(type === '角色'){
                    this.roleReq=data[0];
                }else if(type === '服务'){
                    this.serveReq=data[0];
                }else if(type === '职务'){
                    this.posLReq=data[0];
                }
            }
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
