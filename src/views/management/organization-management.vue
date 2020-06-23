<template>
    <div>     
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="10" :offset="14">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <el-button type="success" icon="el-icon-refresh" plain >新建</el-button>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button type="success" icon="el-icon-refresh" plain @click="createCompany">公司</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="success" icon="el-icon-refresh" plain @click="remove">部门</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="success" icon="el-icon-refresh" plain @click="remove">职务</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <el-button type="success" icon="el-icon-refresh" plain @click="remove">修改</el-button>
                     <el-button type="success" icon="el-icon-search" plain @click="remove">保存</el-button>
                     <el-button type="danger" icon="el-icon-notebook-2" plain @click="remove">删除</el-button>
                     <el-button type="warning" icon="el-icon-document-checked" plain @click="remove">作废</el-button>
                     <el-button type="success" icon="el-icon-share" plain @click="remove">反作废</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-col>
                <el-col :span="12" :offset="3">
                    <div v-if="Companyflag==true">
                        <el-form 
                            :model="ConformData" 
                            label-width="100px"
                            class="dataForm"
                            :rules="rules"
                            size="mini"
                            :label-position="labelPosition">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="公司编码" prop="formCode">
                                        <el-input clearable size="small" v-model="ConformData.formCode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="公司名称" prop="formCode">
                                        <el-input clearable size="small" v-model="ConformData.label" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="3">
                                    <el-form-item label="公司简称" >
                                        <el-input clearable size="small" v-model="ConformData.type" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="管理员编码" prop="formCode">
                                        <el-input clearable size="small" v-model="ConformData.formCode1" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="3">
                                    <el-form-item label="管理员密码" >
                                        <el-input clearable size="small" v-model="ConformData.formCode2" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div v-if="Departmentflag==true">
                        <el-form 
                            :model="DepformData" 
                            label-width="100px"
                            class="dataForm"
                            :rules="rules"
                            size="mini"
                            :label-position="labelPosition">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门编码" prop="formCode">
                                        <el-input clearable size="small" v-model="DepformData.formCode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门名称" prop="formCode">
                                        <el-input clearable size="small" v-model="DepformData.label" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门简称" >
                                        <el-input clearable size="small" v-model="DepformData.type" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="分管领导" >
                                        <el-input clearable size="small" v-model="DepformData.formCode1" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门负责人" >
                                        <el-input clearable size="small" v-model="DepformData.formCode1" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="虚拟组织" >
                                        <el-checkbox v-model="DepformData.checked" v-bind:disabled="disabled"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div v-if="Dutiesflag==true">
                        <el-form 
                            :model="DutformData" 
                            label-width="100px"
                            class="dataForm"
                            :rules="rules"
                            size="mini"
                            :label-position="labelPosition">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="职位编码" prop="formCode">
                                        <el-input clearable size="small" v-model="DutformData.formCode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="职位名称" prop="formCode">
                                        <el-input clearable size="small" v-model="DutformData.label" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="职务" >
                                        <el-input clearable size="small" v-model="DutformData.type" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="行政上级" >
                                        <el-input clearable size="small" v-model="DutformData.formCode1" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="业务上级" >
                                        <el-input type="textarea" v-model="DutformData.remark" :rows="3" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="岗位职责" >
                                        <el-input type="textarea" v-model="DutformData.remark" :rows="3" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    name:'workProcess',
    components: {
      DynamicTable,
    },
    data() {
        return {
            dialogWFMVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            labelPosition: 'left',
            disabled:true,
            treeData:[
                {
                    label: '一级 1',
                    type:'company',
                    children: [{
                        label: '二级 1-1',
                        type:'department',
                        children: [{
                            label: '三级 1-1-1',
                            type:'duties',
                        }]
                    }]
                },{
                    label: '一级 1',
                    type:'company',
                    children: [{
                        label: '二级 1-1',
                        type:'department',
                        children: [{
                            label: '三级 1-1-1',
                            type:'duties',
                        }]
                    }]
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            ConformData:{},
            DepformData:{},
            DutformData:{},
            NodeClickData:{},
            tableData:[],
            Companyflag:false,
            Departmentflag:false,
            Dutiesflag:false,
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
            rules: {
                formCode:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    
    created(){
        this.$nextTick(()=>{
        })
    },
    computed:{
        
    },
    methods:{
        remove(){},
        handleNodeClick(data) {
            let treeType=data.type;
            this.NodeClickData=data;
            if(treeType=="company"){
                this.Companyflag=true;
                this.Departmentflag=false;
                this.Dutiesflag=false;
                this.ConformData=data;
            }else if(treeType=="department"){
                this.Companyflag=false;
                this.Departmentflag=true;
                this.Dutiesflag=false;
                this.DepformData=data;
            }else if(treeType=="duties"){
                this.Companyflag=false;
                this.Departmentflag=false;
                this.Dutiesflag=true;
                this.DutformData=data;
            }
        },
        createCompany(){

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
 /deep/ .el-dropdown-menu__item{
    padding: 0;
}
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
margin-right: 10px;
}
.el-icon-arrow-down {
font-size: 12px;
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