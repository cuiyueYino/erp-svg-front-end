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
                <!-- Condition -->
                <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                    <el-input ref="nameInput" v-model="formData.name" @input="change($event)" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="审核工作" :label-width="formLabelWidth" prop="work">
                    <el-input v-model="formData.work" autocomplete="off"></el-input>
                    <img class="icon-search" @click="workSearch('审核工作')" src="../../../assets/img/search.svg">
                    <el-button type="primary" plain class="joinWorkBtn" @click="addJoinWork('新增审核业务')">新增审核</el-button>
                </el-form-item>
                <el-form-item label="源单据业务" :label-width="formLabelWidth" >
                    <el-input v-model="formData.workData" autocomplete="off"></el-input>
                    <img class="icon-search"  @click="workSearch('源单据业务')" src="../../../assets/img/search.svg">
                </el-form-item>
                <el-form-item label="业务数据" :label-width="formLabelWidth" >
                    <el-input v-model="formData.fmclassName" autocomplete="off" :disabled="true"></el-input>
                   
                </el-form-item>
                <!-- <el-form-item label="组织结构" :label-width="formLabelWidth" >
                    <el-input v-model="formData.structure" autocomplete="off"></el-input>
                     <img class="icon-search" @click="baseInputTable('用户','组织结构查询')" src="../../../assets/img/search.svg">
                </el-form-item> 
                 <el-form-item label="隐藏" :label-width="formLabelWidth">
                    <el-checkbox v-model="formData.checked"></el-checkbox>
                </el-form-item> -->
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input maxlength="500"  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
                </el-form-item>
                <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="基本设置" name="2">
                <!-- Condition -->
                <el-form-item label="审批类型" :label-width="formLabelWidth" prop="wfAuditType">
                     <el-radio-group v-model="formData.wfAuditType">
                        <el-radio label="普通审批" ></el-radio>
                        <el-radio label="并行会签"></el-radio>
                         <el-radio label="串行会签"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="最大工作时间" :label-width="formLabelWidth" prop="maxWorkTime">
                    <el-input v-model="formData.maxWorkTime" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间单位" :label-width="formLabelWidth" prop="timeUnit">
                     <el-radio-group v-model="formData.timeUnit">
                        <el-radio label="1">小时</el-radio>
                    </el-radio-group>
                </el-form-item>
                 <el-form-item  :label-width="formLabelWidth" prop="autoSubmit">
                    <el-checkbox v-model="formData.autoSubmit" @change="changeAutoSubmit">超过最大时间系统自动提交审批</el-checkbox>
                </el-form-item>
                <el-form-item  :label-width="formLabelWidth" prop="autoHurry">
                    <el-checkbox v-model="formData.autoHurry"  @change="changeAutoHurry">超过最大时间系统自动发送催办消息</el-checkbox>
                </el-form-item>
                 <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="参与者" name="3">
                <!-- Condition -->
                <el-checkbox-group v-model="checkedCities" label @change="checkboxChange" >
                    <el-checkbox v-for="item in itemOptions"  :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
                <!-- <el-radio-group v-model="formData.joinCheckBox" class="joinCheckBox">
                    <el-radio :label="1">由权限控制</el-radio>
                    <el-radio :label="2">手工指定下一节点参与者</el-radio>
                    <el-radio :label="3">可略过</el-radio>
                    <el-radio :label="4">多封邮件</el-radio>
                </el-radio-group> -->
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="columns"
                            :table-data="joinusertableData"
                            @selection-change="onJoinUserSelectionChange"
                            v-loading="false"
                            :height="200"
                            :isShowPager="false"
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
                            :columns="columns"
                            :table-data="tableData"
                            @selection-change="onCopyToSelectionChange"
                            v-loading="false"
                            :height="200"
                            :isShowPager="false"
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
                    ref="joinTable"
                    @selection-change="onJoinSelectionChange"
                    v-loading="false"
                    :isShowPager="false"
                    element-loading-text="加载中"
                 ></dynamic-table>
                 </el-row>
                <!-- Condition END-->
            </el-tab-pane>
            <el-tab-pane label="决策类型" name="6">
                 <!-- Condition -->
                <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="24">
                        <dynamic-table
                            :columns="columns4"
                            ref="decisionTable"
                            :isShowPager="false"
                            :table-data="tableData3"
                            @selection-change="onSelectionDecision"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
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
            <div v-show="showBaseInfo" class="base-info">
          <el-tabs v-model="baseActiveName"  @tab-click="basehandleClick">
            <el-tab-pane label="角色" name="1">
              <el-form-item label="角色" :label-width="formLabelWidth">
                <el-input placeholder="请选择" v-model="roleReq.name" :disabled="true"></el-input>
                <img
                  class="icon-search"
                  src="../../../assets/img/search.svg"
                  @click="baseInputTable('角色','角色查询')"
                />
              </el-form-item>
              <el-form-item label="条件表达式" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="roleReq.role_expression" :disabled="true"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="用户" name="2">
              <el-form-item label="用户" :label-width="formLabelWidth">
                <el-input placeholder="请选择" v-model="UserListReq.fname" :disabled="true"></el-input>
                <img
                  class="icon-search"
                  src="../../../assets/img/search.svg"
                  @click="baseInputTable('用户','用户查询')"
                />
              </el-form-item>
              <el-form-item label="条件表达式" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="UserListReq.fenglishname" :disabled="true"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="服务" name="3">
              <el-form-item label="服务" :label-width="formLabelWidth">
                <el-input placeholder="请选择" v-model="serveReq.fname" :disabled="true"></el-input>
                <img
                  class="icon-search"
                  src="../../../assets/img/search.svg"
                  @click="baseInputTable('服务','服务查询')"
                />
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
                <el-input placeholder="请选择" v-model="posLReq.fname" :disabled="true"></el-input>
                <img
                  class="icon-search"
                  src="../../../assets/img/search.svg"
                  @click="baseInputTable('职务','职务查询')"
                />
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
                  <el-col :span="10">
                    <el-form-item label="编码" label-width="60px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="10">
                    <el-form-item label="名称" label-width="60px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-col> 
                  <!-- <el-col :span="8">
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
                  </el-col>  -->
             </el-row>
             <el-row :gutter="24">
                <el-col :span="6" :offset="18">
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable('formData')">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable('')">搜索</el-button>
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
                <el-button   size="small"   @click="gridDataAdd">确定</el-button>
                <!-- <el-button  type="primary" size="small" plain @click="dialogTableVisible = false">关闭</el-button> -->
            </footer>
            <!-- footer END-->
           </el-dialog>
         <!-- 第三层弹窗 -->
            <base-info-dialog class="children-dialog" :visible="baseInputTableF" :type="baseInputType" :title="baseInputTitle" @closeDialog="closeBaseInfo"></base-info-dialog>
         <!-- 表单弹窗 -->
            <join-dialog :visible="baseFormF" @closeDialog="closeForm" :title="baseFormTitle"></join-dialog>
             </el-form>
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
import baseInfoDialog from './base-info-dialog'
import joinDialog from './Join-dialog'

export default {
    name: 'NodeJoin',
     components: {
      DynamicTable,
      baseInfoDialog,
      joinDialog,
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
            itemOptions:['由权限控制', '手工指定下一节点参与者', '可略过', '多封邮件'],
            checkedCities:['由权限控制'],
            tableLoading:false,
            checked:false,
            checked1:false,
            autoSendChecked:false,
            autoSendChecked1:false,
            dialogTableVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            baseFormTitle:'',
            activeName: '1',
            formLabelWidth: '120px',
            // 关闭对话框配置
            closeConfig: false,
            // 配置表单校验规则
            configRules: {
                work: { required: true, message: "请选择业务工作", trigger: "blur" },
                name: { required: true, message: "请输入名称", trigger: "blur" },
                performType: {
                required: true,
                message: "请选择参与类型",
                trigger: "change"
                }
            },
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {
                name:'',
                work:'',
                workData:'',
                fmclassName:'',
                fremark:'',
                wfAuditType:'',
                maxWorkTime:'',
                autoSubmit:'',
                autoHurry:'',
                timeUnit:'1'
            },
            columns: [
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
        columns2: [
            {
                type: 'selection'
            },
            {
                key: 'fname',
                title: '节点'
            },
            {
                key: 'ftype',
                title: '节点类别'
            },
            
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
                key: 'decisionText',
                title: '功能'
            },
            // {
            //     key: 'fname',
            //     title: '显示标签'
            // }
        ],
        joinusertableData:[],
        tableData:[],
        tableData2:[],
        baseActiveNameStr: "角色",
        tableData3:[
            {
                "decisionType":1,
				"decisionText":"同意"
            },
            {
                "decisionType":2,
				"decisionText":"不同意"
            },
            {
                "decisionType":3,
				"decisionText":" 待处理"
            },
            {
                "decisionType":4,
				"decisionText":"其他"
            },
        ],
        gridData:[],
        editData:{},  
        multipleSelection: [],
        decisionSelection:[],
        joinSelection:[],
        copyToSelection:[],
        joinUserSelection:[],
        options: [],
        titleStr:'',
        baseInputTableF:false,
        baseInputTitle:'',
        baseInputType:'',
        baseFormF :false,
        showBaseInfo:false,
        showInfoCheck:false,
        baseActiveName:'1',
        baseInput:'',
        baseTextarea:'',
        roleReq: {
            name: "",
            role_expression: ""
        },
        serveReq: {
            fname: "",
            fenglishname: ""
        },
        posLReq: {
            fname: "",
            fenglishname: ""
        },
        UserListReq: {
            fname: "",
            fenglishname: ""
        },
        };
    },
    computed: {
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                if(obj.name === "Join"){
                    console.log("审核活动数据",obj)
                    if(!obj.oid && (obj.isSaveFlag==undefined)){
                        this.formData = {};
                        this.editData= {};
                        this.joinusertableData=[];
                        this.tableData=[];
                        this.decisionSelection=[];
                        this.checkedCities = ['由权限控制'];
                        this.formData.name = obj.displayName
                    }else{
                        this.checkedCities = [];
                        this.editData = obj;
                        this.formData.oid = this.editData.oid;
                        this.formData.name = this.editData.displayName
                        this.formData.work = this.editData.mactivity.name
                        this.formData.workId = this.editData.mactivity.oid
                        this.formData.workCode = this.editData.mactivity.code
                        this.formData.workData = this.editData.srcActivity.name
                        this.formData.workDataId = this.editData.srcActivity.oid
                        this.formData.workDataCode = this.editData.srcActivity.code
                        this.formData.fmclassOid = this.editData.dataType.oid
                        this.formData.fmclassCode = this.editData.dataType.code
                        this.formData.fmclassName = this.editData.dataType.name
                        this.formData.fremark = this.editData.fremark    
                        this.formData.maxWorkTime = this.editData.maxWorkTime
                        this.formData.timeUnit = this.editData.timeUnit       
                        this.formData.autoSubmit = this.editData.autoSubmit==1?true:false 
                        this.formData.autoHurry = this.editData.autoHurry==1?true:false
                        switch (this.editData.wfAuditType) {
                            case 1:
                                this.formData.wfAuditType = '普通审批'
                            break;
                            case 2:
                                this.formData.wfAuditType = '并行会签'
                            break;
                            case 3:
                                this.formData.wfAuditType = '串行会签'
                            break;
                            default:
                            break;
                        }
                        if(this.editData.permission=='1'){
                            this.checkedCities.push('由权限控制');
                        }
                        if(this.editData.mntNextJoin=='1'){
                            this.checkedCities.push('手工指定下一节点参与者');
                        }
                        if(this.editData.canSkip=='1'){
                            this.checkedCities.push('可略过');
                        }
                        if(this.editData.multMail=='1'){
                            this.checkedCities.push('多封邮件');
                        }
                        //this.checkedCities.push(this.editData.permission=='1'?'由权限控制':this.editData.mntNextJoin=='1'?'手工指定下一节点参与者':this.editData.canSkip=='1'?'可略过':this.editData.multMail=='1'?'多封邮件':null)
                        //    this.joinusertableData = this.editData.wfParticipator.participator
                        let joinusertable = [];
                        if( this.editData.wfParticipator.participator.length == 0){}else{
                            this.editData.wfParticipator.participator.forEach(item=>{
                                switch (item.type) {
                                    case 3://用户
                                        joinusertable.push({
                                        fUsercode: "用户",
                                        fUsername: item.user.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.user.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'user',
                                        })
                                        break;
                                    case 2://角色
                                        joinusertable.push({
                                        fUsercode:  "角色",
                                        fUsername: item.role.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.role.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'role',
                                        })
                                        break;
                                    case 4://服务
                                        joinusertable.push({
                                        fUsercode: "服务",
                                        fUsername: item.service.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.service.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'service',
                                        })
                                        break;
                                    case 6://职务
                                        joinusertable.push({
                                        fUsercode: "职务",
                                        fUsername: item.position.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.position.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'position',
                                        })
                                        break;
                                    case 5://表达式
                                        joinusertable.push({
                                        fUsercode: "表达式",
                                        fUsername: item.expression.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.expression.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'expression',
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        
                        if( this.joinusertableData.length === 0 && joinusertable.length !== 0){
                            joinusertable.forEach(item=>{
                                this.joinusertableData.push(item)
                            })
                        }
                        console.log(this.joinusertableData,joinusertable);
                        let tableDataNewSet = []
                        if( this.editData.wfCopyTo.copyTo.length == 0){}else{
                            this.editData.wfCopyTo.copyTo.forEach(item=>{
                                switch (item.type) {
                                    case 3://用户
                                        tableDataNewSet.push({
                                        fUsercode: "用户",
                                        fUsername: item.user.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.user.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'user',
                                        })
                                        break;
                                    case 2://角色
                                        tableDataNewSet.push({
                                        fUsercode: "角色",
                                        fUsername: item.role.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.role.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'role',
                                        })
                                        break;
                                    case 4://服务
                                        tableDataNewSet.push({
                                        fUsercode:  "服务",
                                        fUsername: item.service.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.service.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'service',
                                        })
                                        break;
                                    case 6://职务
                                        tableDataNewSet.push({
                                        fUsercode: "职务",
                                        fUsername: item.position.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.position.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'position',
                                        })
                                        break;
                                    case 5://表达式
                                        tableDataNewSet.push({
                                        fUsercode: "表达式",
                                        fUsername: item.expression.name,
                                        fUserRemake: item.expression,
                                        fUseroid:item.expression.oid,
                                        oid:item.oid,
                                        type:item.type,
                                        typeName:'expression',
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            });
                        }
                        
                        if( this.tableData.length === 0 && tableDataNewSet.length !== 0){
                            tableDataNewSet.forEach(item=>{
                                this.tableData.push(item)
                            })
                        }
                        this.$nextTick(()=>{
                            //设置审核活动决策类型选中
                            this.tableData3.forEach(row => {
                                this.editData.decisions.decision.forEach(row1 => {
                                    if (row1.decisionText === row.decisionText) {
                                        this.$refs.decisionTable.toggleRowSelection(row,true);
                                    }
                                });
                            })
                            //设置审核活动选中
                            this.tableData2.forEach((item)=>{
                                this.editData.wfViewOtherComments.wfViewOtherComment.forEach(row2 => {
                                    if (row2.fname === item.fname) {
                                        this.$refs.joinTable.toggleRowSelection(item,true);
                                    }
                                });
                            })
                            /*this.editData.decisions.decision.forEach((item)=>{
                                if(this.tableData3.indexOf(item) >=0){
                                    debugger
                                    this.$refs.decisionTable.toggleRowSelection(item,true);//选中所在行
                                }
                            })*/
                        })
                        /*this.tableData2 = this.editData.wfViewOtherComments.wfViewOtherComment;
                        this.tableData3 = this.editData.decisions.decision;
                        this.tableData3.forEach(row => {
                            this.$refs.decisionTable.toggleRowSelection(row);
                        });*/
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
            }else{console.log(this.decisionSelection)
                  this.formData.checkedCities = this.checkedCities;
                  let tableData3Chose = this.decisionSelection
                    this.$emit(
                    "saveFormData",
                    this.formData,
                    this.joinusertableData,
                    this.tableData,
                    this.tableData2,
                    tableData3Chose,
                    this.gridData,
                    ); 
            }
        },
    },
    methods: {
        changeAutoSubmit(val){
            if(val){
               this.formData.autoHurry = false
            }
            console.log(val)
        },
        changeAutoHurry(val){
            if(val){
               this.formData.autoSubmit = false
            }
            console.log(val)
        },
         checkboxChange(e){
            switch (e[e.length-1]) {
            case "由权限控制":
                    for(let i =0 ; i<e.length; i++){
                        if( e[i] == "可略过" ){
                            e.splice(i,1)
                        }
                    }
                break;
            case "可略过":
                    for(let j =0 ; j<e.length; j++){
                        if( e[j] == "由权限控制" ){
                            e.splice(j,1)
                        }
                    }
                break;
            default:
                break;
            }
        this.checkedCities = e;
        console.log(this.checkedCities)
        },
         basehandleClick(tab, event) {
            this.baseActiveNameStr = tab.label;
        },
        // 新增审核工作
        addJoinWork(str){
            this.baseFormF = true;
            this.baseFormTitle = str;
        },
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
        handleClick() {//
            if(this.activeName == '5'){//
                this.tableData2 =[]
                let allData = JSON.parse( sessionStorage.getItem('allData') );
                if(allData.length>0){
                    allData.forEach(item=>{
                        if(item.data){
                            if(item.type == 'Join' && (item.data.displayName !== this.formData.name) && (item.data.displayName !== "审核活动")){
                                this.tableData2.push({
                                    fname:item.data.displayName,
                                    ftype:item.data.name,
                                    wfProcessor: item.oid?item.oid:item.key
                                })
                            }
                            // item.wfViewOtherComments.wfViewOtherComment.forEach(vOcItime=>{
                            //     vOcItime.push({
                            //         fname:item.data.displayName,
                            //         ftype:item.data.name,
                            //         wfProcessor:vOcItime.wfProcessor
                            //     })
                            // })
                        }
                    })
                }
            }   
            
        },
         // 参与人弹窗
        joinSearch(Str){
            this.titleStr = Str;
            this.dialogTableVisible = true;
            this.showInfoCheck = false;
            this.showBaseInfo = true;
             if (Str == "新增参与者") {
                this.roleReq = [];
                this.serveReq = [];
                this.posLReq = [];
                this.UserListReq = [];
                this.baseTextarea = "";
            } else if (Str == "新增抄送") {
                this.roleReq = [];
                this.serveReq = [];
                this.posLReq = [];
                this.UserListReq = [];
                this.baseTextarea = "";
            }
        },
         //业务工作-新增
        gridDataAdd(){
            // if(this.multipleSelection.length == 0 || this.multipleSelection.length >1  ){
            //     this.$message.error('请正确选择');
            //     return
            // }
             if (this.titleStr === "新增参与者") {
                if (this.baseActiveNameStr == "角色") {
                if (this.roleReq.name) {
                    let roleObj = {};
                    roleObj = this.roleReq;
                    roleObj.type = 2;
                    roleObj.typeName = "role";
                    roleObj.fUseroid = roleObj.foid;
                    roleObj.fUsername = roleObj.name;
                    roleObj.fUsercode = this.baseActiveNameStr;
                    roleObj.fUserRemake = roleObj.role_expression;
                    this.joinusertableData.push(roleObj);
                }
                } else if (this.baseActiveNameStr == "用户") {
                if (this.UserListReq.fname) {
                    let UroleObj = {};
                    UroleObj = this.UserListReq;
                    UroleObj.type = 3;
                    UroleObj.typeName = "user";
                    UroleObj.oid = this.UserListReq.userid;
                    UroleObj.fUsername = UroleObj.fname;
                    //UroleObj.fUseroid = UroleObj.foid;
                    UroleObj.fUseroid=this.UserListReq.userid;
                    UroleObj.fUsercode = this.baseActiveNameStr;
                    UroleObj.fUserRemake = UroleObj.fenglishname;
                    this.joinusertableData.push(UroleObj);
                }
                } else if (this.baseActiveNameStr == "服务") {
                if (this.serveReq.fname) {
                    let SroleObj = {};
                    SroleObj = this.serveReq;
                    SroleObj.type = 4;
                    SroleObj.typeName = "service";
                    SroleObj.fUsername = SroleObj.fname;
                    SroleObj.fUseroid = SroleObj.foid;
                    SroleObj.fUsercode = this.baseActiveNameStr;
                    SroleObj.fUserRemake = SroleObj.fenglishname;
                    this.joinusertableData.push(SroleObj);
                }
                } else if (this.baseActiveNameStr == "职务") {
                if (this.posLReq.fname) {
                    let ProleObj = {};
                    ProleObj = this.posLReq;
                    ProleObj.type = 6;
                    ProleObj.typeName = "position";
                    ProleObj.fUsername = ProleObj.fname;
                    ProleObj.fUsercode = this.baseActiveNameStr;
                    ProleObj.fUserRemake = ProleObj.fenglishname;
                    this.joinusertableData.push(ProleObj);
                }
                } else if (this.baseActiveNameStr == "表达式") {
                if (this.baseTextarea) {
                    let BroleObj = {};
                    BroleObj.type = 5;
                    BroleObj.typeName = "expression";
                    BroleObj.fUseroid = BroleObj.foid;
                    BroleObj.fUsername = this.baseTextarea;
                    BroleObj.fUsercode = this.baseActiveNameStr;
                    BroleObj.fUserRemake = "";
                    this.joinusertableData.push(BroleObj);
                }
                }
            } else if (this.titleStr === "新增抄送") {
                if (this.baseActiveNameStr == "角色") {
                if (this.roleReq.name) {
                    let roleObj = {};
                    roleObj = this.roleReq; //console.log(roleObj)
                    roleObj.type = 2;
                    roleObj.typeName = "role";
                    roleObj.fUsername = roleObj.name;
                    roleObj.fUseroid = roleObj.foid;
                    roleObj.fUsercode = this.baseActiveNameStr;
                    roleObj.fUserRemake = roleObj.role_expression;
                    this.tableData.push(roleObj);
                }
                } else if (this.baseActiveNameStr == "用户") {
                if (this.UserListReq.fname) {
                    let UroleObj = {};
                    UroleObj = this.UserListReq;
                    UroleObj.type = 3;
                    UroleObj.typeName = "user";
                    //UroleObj.fUseroid = UroleObj.foid;
                    UroleObj.fUseroid=this.UserListReq.userid;
                    UroleObj.fUsername = UroleObj.fname;
                    UroleObj.fUsercode = this.baseActiveNameStr;
                    UroleObj.fUserRemake = UroleObj.fenglishname;
                    this.tableData.push(UroleObj);
                }
                } else if (this.baseActiveNameStr == "服务") {
                if (this.serveReq.fname) {
                    let SroleObj = {};
                    SroleObj = this.serveReq;
                    SroleObj.type = 4;
                    SroleObj.typeName = "service";
                    SroleObj.fUseroid = SroleObj.foid;
                    SroleObj.fUsername = SroleObj.fname;
                    SroleObj.fUsercode = this.baseActiveNameStr;
                    SroleObj.fUserRemake = SroleObj.fenglishname;
                    this.tableData.push(SroleObj);
                }
                } else if (this.baseActiveNameStr == "职务") {
                if (this.posLReq.fname) {
                    let ProleObj = {};
                    ProleObj = this.posLReq;
                    ProleObj.type = 6;
                    ProleObj.typeName = "position";
                    ProleObj.fUsername = ProleObj.fname;
                    ProleObj.fUseroid = ProleObj.foid;
                    ProleObj.fUsercode = this.baseActiveNameStr;
                    ProleObj.fUserRemake = ProleObj.fenglishname;
                    this.tableData.push(ProleObj);
                }
                } else if (this.baseActiveNameStr == "表达式") {
                if (this.baseTextarea) {
                    let BroleObj = {};
                    BroleObj.type = 5;
                    BroleObj.typeName = "expression";
                    BroleObj.fUseroid = BroleObj.foid;
                    BroleObj.fUsername = this.baseTextarea;
                    BroleObj.fUsercode = this.baseActiveNameStr;
                    BroleObj.fUserRemake = "";
                    this.tableData.push(BroleObj);
                }
                }
      }
       else if (this.titleStr === "审核工作") {
    //     let selectOption = this.WorkmultipleSelection;
    //     if (selectOption.length > 0) {
    //       if (selectOption.length > 1) {
    //         this.$message.error("只能选择一行!");
    //       } else {
    //         //返回选中的父组件选中的row,并修某些改值
    //         this.formData.work = selectOption[0].fname;
    //         this.formData.workCode = selectOption[0].fcode;
    //         this.formData.workId = selectOption[0].foid;
    //         this.formData.workDataId = selectOption[0].fmclassOid;
    //         this.formData.workData = selectOption[0].fmclassName;
    //         this.formData.workDataCode = selectOption[0].fmclassCode;
            this.formData.work = this.multipleSelection[0].fname;
            this.formData.workId = this.multipleSelection[0].foid;
            this.formData.workCode = this.multipleSelection[0].fcode;
          }
    //     } else {
    //       this.$message.error("请选择一行数据!");
    //     }
    //   }
           

             this.dialogTableVisible = false;
             //console.log(this.formData.work )
        },
        add(){

        },
        
        //删除
        deleteMsg(Str){
            if (Str == "新增参与者") {
                let selectData = this.multipleSelection;
                let updateDate = this.joinusertableData;
                for (var i = 0; i < selectData.length; i++) {
                for (var j = 0; j < updateDate.length; j++) {
                    if (selectData[i].fUsername === updateDate[j].fUsername) {
                        updateDate.splice(j, 1);
                        }
                    }
                }
                this.joinusertableData = updateDate;
            } else if (Str == "新增抄送") {
                let selectCCData = this.multipleSelection;
                let updateCCDate = this.tableData;
                for (var i = 0; i < selectCCData.length; i++) {
                for (var j = 0; j < updateCCDate.length; j++) {
                    if (selectCCData[i].fUsername === updateCCDate[j].fUsername) {
                    updateCCDate.splice(j, 1);
                    }
                }
                }
                this.tableData = updateCCDate;
            }
        },
        //决策类型-多选
        onSelectionDecision(val){
            this.decisionSelection = val;console.log(this.decisionSelection)
        },
        //审核单范围-多选
        onJoinSelectionChange(val){
            this.joinSelection = val;
        },
        //抄送-多选
        onCopyToSelectionChange(val){
             this.copyToSelection = val;
        },
        //参与者-多选
        onJoinUserSelectionChange(val){
             this.joinUserSelection = val;
        },
         //多选
        onSelectionChange(val) { console.log(val)
            if(val.length>0){
                this.multipleSelection = val;
                switch (this.titleStr) {
                    case '源单据业务':
                            this.formData.workDataCode = val[0].fcode?val[0].fcode:'';
                            this.formData.workData = val[0].fname?val[0].fname:'';
                            this.formData.workDataId = val[0].foid?val[0].foid:'';
                        break;
                    case '审核工作':
                            this.formData.work = val[0].fname?val[0].fname:'';
                            this.formData.workId = val[0].foid?val[0].foid:'';
                            this.formData.workCode = val[0].fcode?val[0].fcode:'';
                            this.formData.fmclassName = val[0].fmclassName?val[0].fmclassName:'';
                            this.formData.fmclassOid = val[0].fmclassOid?val[0].fmclassOid:'';
                            this.formData.fmclassCode = val[0].fmclassCode?val[0].fmclassCode:'';
                        break;
                
                    default:
                        break;
                }
            }
        },
          // 业务工作-获取表格数据-重置
        reWorkSearchTable(formName){
             this.$refs[formName].resetFields();
            this.pageNum = 1
            this.workSearchTable('')
        },
         baseInputTable(str,title){ 
            this.baseInputTableF = true;
            this.baseInputTitle= title
            this.baseInputType = str;
        },
        closeBaseInfo(data, dialogtitle, type){console.log(data)
            if (data.length > 0) {
                if (type === "用户") {
                if (dialogtitle === "组织结构查询") {
                    this.formData.structure = data[0].fname;
                    this.formData.structurecode = data[0].fcode;
                    this.formData.structureId = data[0].foid;
                } else if (dialogtitle === "用户查询") {
                    this.UserListReq = data[0];
                }
                } else if (type === "角色") {
                this.roleReq = data[0];
                } else if (type === "服务") {
                this.serveReq = data[0];
                } else if (type === "职务") {
                this.posLReq = data[0];
                }
            }
            this.baseInputTableF = false;
        },
        closeForm(){
             this.baseFormF = false;
        },
         workSearch(str){
             this.titleStr = str;
             // 业务工作-搜索枚举项
            // this.workSearchOption()
           
            this.showInfoCheck = true;
            this.showBaseInfo = false;
            this.dialogTableVisible = true;
            switch (str) {
                case '审核工作':
                         this.formData.formCtionTypeCon = 3;
                         this.workSearchTable('')
                    break;
                case '源单据业务':
                         this.formData.formCtionTypeCon = 1;
                         this.workSearchTable('源单据业务')
                    break;
            
                default:
                    break;
            }
        },
        // 业务工作-获取表格数据
        workSearchTable(str){
            this.tableLoading = true;
             let data;
            switch (str) {
                case '源单据业务':
                     data = {
                        fmclassName: this.formData.fmclassName,
                        fmclass:this.formData.fmclassOid,
                        fcode: this.formData.formCode,
                        fname: this.formData.formName,
                        fmfunctiontypecon: this.formData.formCtionTypeCon,
                        page:this.pageNum,
                        size:this.pageSize
                    };
                    break;
                case '':
                    data = {
                        fcode: this.formData.formCode,
                        fname: this.formData.formName,
                        fmfunctiontypecon: this.formData.formCtionTypeCon,
                        page:this.pageNum,
                        size:this.pageSize
                    };
                    break;
                default:
                    break;
            }
            this.$api.processSet.workSearchData(data).then(res=>{
                this.tableLoading = false;
                this.gridData = res.data.data.rows;
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
        change(e){
            this.$forceUpdate()
        },
         //分页、下一页
        onCurrentChange(val){
             this.pageNum = val;
            this.workSearch('审核工作')
        },
    }
};
</script>
<style  lang="scss" scoped>

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
    //  margin-top: 10px;
 }
 .joinWorkBtn{
     margin-left: 14px;
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
         width: 70%;
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
