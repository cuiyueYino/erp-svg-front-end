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
                                <el-button type="success" icon="el-icon-refresh" plain @click="createDepartment">部门</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="success" icon="el-icon-refresh" plain @click="createDuties">职务</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <el-button type="success" icon="el-icon-refresh" plain @click="editCDD">修改</el-button>
                     <el-button type="success" icon="el-icon-search" plain @click="saveCDD">保存</el-button>
                     <el-button type="danger" icon="el-icon-notebook-2" plain @click="remove">删除</el-button>
                     <el-button type="warning" icon="el-icon-document-checked" plain @click="tovoid">作废</el-button>
                     <el-button type="success" icon="el-icon-share" plain @click="toNotvoid">反作废</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="6">
                    <div class="El-tree">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            node-key="foid"
                            :render-content="renderContent"
                            :default-expanded-keys="defaultexpanded"
                            accordion
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
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
                                    <el-form-item label="公司编码" prop="fcode">
                                        <el-input clearable size="small" v-model="ConformData.fcode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="公司名称" prop="fname">
                                        <el-input clearable size="small" v-model="ConformData.fname" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8" :offset="3">
                                    <el-form-item label="公司简称" >
                                        <el-input clearable size="small" v-model="ConformData.fremark" v-bind:disabled="disabled"></el-input>
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
                                    <el-form-item label="部门编码" prop="fcode">
                                        <el-input clearable size="small" v-model="DepformData.fcode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门名称" prop="fname">
                                        <el-input clearable size="small" v-model="DepformData.fname" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门简称" >
                                        <el-input clearable size="small" v-model="DepformData.fremark" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="分管领导" >
                                        <el-input clearable size="small" v-model="DepformData.vicePresidentName" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="disabled==false">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(DepformData,'分管领导')"></el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="部门负责人" >
                                        <el-input clearable size="small" v-model="DepformData.departmentLeaderName" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="disabled==false">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(DepformData,'部门负责人')"></el-button>
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
                                    <el-form-item label="职位编码" prop="fcode">
                                        <el-input clearable size="small" v-model="DutformData.fcode" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="职位名称" prop="fname">
                                        <el-input clearable size="small" v-model="DutformData.fname" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="职务" >
                                        <el-input clearable size="small" v-model="DutformData.positonName" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="disabled==false">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchDUTS(DutformData,'职务')"></el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="行政上级" >
                                        <el-input clearable size="small" v-model="DutformData.directLeaderName" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="disabled==false">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPOSS(DutformData,'Single')"></el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="业务上级" >
                                        <el-input type="textarea" v-model="DutformData.businessLeaderName" :rows="1" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1" v-if="disabled==false">
                                    <el-button type="primary" size="mini"  icon="el-icon-search" @click="MoreSearchPOSS(DutformData,'Multiple')"></el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="岗位职责" >
                                        <el-input type="textarea" v-model="DutformData.responsibility" :rows="3" v-bind:disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <DUTSpage  :rowDUTSDataObj="rowDUTSDataObj" :rowDUTStype="rowDUTStype" @changeShow="showORhideForDUTS"/>
        <POSserachpage  :rowPOSSDataObj="rowPOSSDataObj" :rowPOSStype="rowPOSStype" @changeShow="showORhideForPOSS"/>
    </div>
</template>
<script>
// import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import DUTSpage from '../comment/duties-search.vue';
import POSserachpage from '../comment/position-search.vue';
export default {
    name:'workProcess',
    components: {
    //   DynamicTable,
      DUTSpage,
      POSserachpage,
      PSpage
    },
    inject: ['reload'],
    data() {
        return {
            dialogWFMVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            labelPosition: 'left',
            disabled:true,
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'fname'
            },
            ConformData:{},
            defaultexpanded:[],
            DepformData:{},
            DutformData:{},
            NodeClickData:{},
            tableData:[],
            Companyflag:false,
            Departmentflag:false,
            Dutiesflag:false,
            CeateTypeflag:'',
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
            rowPStype:false,
            rowPSDataObj:{},
            rowDUTStype:false,
            rowDUTSDataObj:{},
            rowPOSStype:false,
            rowPOSSDataObj:{},
            rules: {
                fname:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                fcode:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    created(){
      
    },
    mounted() {
        this.$api.management.selectAllOrganizationInfo().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let tabledata=eval('(' + responsevalue.data.data + ')');
                this.treeData=tabledata;
                console.log(tabledata);
            }
        }); 
    },
    computed:{
        
    },
    methods:{
        // 查询行政上级，业务上级的返回值处理
        showORhideForPOSS(data,type){
            if(type === false){
                this.rowPOSStype = false;
            }else{
                this.rowPOSStype = true;
            }
            if(data.SearchData){
                let Sdata=data.SearchData;
                if(data.Searchtype =='Multiple'){
                    let FnameS='';
                    let FoidS='';
                    for(var i=0;i<Sdata.length;i++){
                        FnameS+=Sdata[i].fname+',';
                        FoidS+=Sdata[i].foid+',';
                    }
                    FnameS=FnameS.slice(0,FnameS.length-1);
                    FoidS=FoidS.slice(0,FoidS.length-1);
                    this.DutformData.businessLeaderName=FnameS;
                    this.DutformData.businessLeaderId=FoidS;
                }else{
                    this.DutformData.directLeaderName=Sdata[0].fname;
                    this.DutformData.directLeaderId=Sdata[0].foid;
                }
            }
        },
        //查询行政上级，业务上级
        MoreSearchPOSS(data,type){
            this.rowPOSStype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="组织机构维护";
            finandata.Searchtype=type;
            this.rowPOSSDataObj=finandata;
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.ftype =="1"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-office-building"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }else if(data.ftype=="2"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-help"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }else if(data.ftype=="3"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-s-check"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    );
                }
            }  
        },
        //查询发起人员
        MoreSearchPS(data,type){
            this.rowPStype = true;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="组织机构维护";
            finandata.UserSearchtype=type;
            this.rowPSDataObj=finandata;
        },
        //获取人员查询结果
        showORhideForPS(data,type){
            if(type === false){
                this.rowPStype = false;
            }else{
                this.rowPStype = true;
            }
        },
        //查询职务
        MoreSearchDUTS(data,type){
            this.rowDUTStype = true;
            let finandata={};
            finandata.finanrowname="职务查询方案";
            finandata.finanrowId="QS_0032";
            finandata.nametitle="组织机构维护";
            finandata.UserSearchtype=type;
            this.rowDUTSDataObj=finandata;
        },
        //职务查询结果
        showORhideForDUTS(data,type){
            if(type === false){
                this.rowDUTStype = false;
            }else{
                this.rowDUTStype = true;
            }
        },
        //删除
        remove(){
            this.$confirm('确定要删除这条信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let selectData=this.NodeClickData;
                    if(selectData.fstruid){
                        let fromdata={};
                        fromdata.fstruid=selectData.fstruid;
                        this.$api.management.deleteOrganizationInfo(fromdata).then(response => {
                            let responsevalue = response;
                            this.$message.success('删除成功!');
                            this.reload();
                        });
                    } 
                })
        },
        //作废
        tovoid(){
            let selectData=this.NodeClickData;
            if(selectData.fstruid){
                let fromdata={};
                fromdata.fstruid=selectData.fstruid;
                this.$api.management.cancelOrganizationInfo(fromdata).then(response => {
                    let responsevalue = response;
                    this.$message.success('作废成功!');
                    this.reload();
                });
            } 
        },
        //反作废
        toNotvoid(){
            let selectData=this.NodeClickData;
            if(selectData.fstruid){
                let fromdata={};
                fromdata.fstruid=selectData.fstruid;
                this.$api.management.uncancelOrganizationInfo(fromdata).then(response => {
                    let responsevalue = response;
                    this.$message.success('反作废成功!');
                    this.reload();
                });
            } 
        },
        //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.ftype;
            this.NodeClickData=data;
            if(treeType=="1"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.getselectCompanyInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=true;
                        this.Departmentflag=false;
                        this.Dutiesflag=false;
                        this.disabled=true;
                        this.ConformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }else if(treeType=="2"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.selectDepartmentInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=false;
                        this.Departmentflag=true;
                        this.Dutiesflag=false;
                        this.disabled=true;
                        this.DepformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }else if(treeType=="3"){
                let fromdata={};
                fromdata.foid=data.foid;
                this.$api.management.selectPositionInfo(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        this.Companyflag=false;
                        this.Departmentflag=false;
                        this.Dutiesflag=true;
                        this.disabled=true;
                        this.DutformData=returndata;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
            }
        },
        //创建公司
        createCompany(){
            if(this.NodeClickData){
                if(this.NodeClickData.ftype){
                    let treeType=this.NodeClickData.ftype;
                    if(treeType =='1'){
                        this.ConformData={};
                        this.Companyflag=true;
                        this.Departmentflag=false;
                        this.Dutiesflag=false;
                        this.disabled=false;
                        this.CeateTypeflag='NEW';
                    }else if(treeType=="2"){
                        this.$message.error('部门下不能直接创建公司!');
                    }else if(treeType=="3"){
                        this.$message.error('职务下不能直接创建公司!');
                    }
                }
            }
        },
        //创建部门
        createDepartment(){
            if(this.NodeClickData){
                if(this.NodeClickData.ftype){
                    let treeType=this.NodeClickData.ftype;
                    if(treeType =='1'){
                        this.Companyflag=false;
                        this.Departmentflag=true;
                        this.Dutiesflag=false;
                        this.DepformData={};
                        this.disabled=false;
                        this.CeateTypeflag='NEW';
                    }else if(treeType=="2"){
                        this.$message.error('部门下不能直接创建部门!');
                    }else if(treeType=="3"){
                       this.$message.error('职务下不能直接创建部门!');
                    }
                }
            } 
        },
        //创建职务
        createDuties(){
            if(this.NodeClickData){
                if(this.NodeClickData.ftype){
                    let treeType=this.NodeClickData.ftype;
                    if(treeType =='1'){
                        this.$message.error('公司下不能直接创建职务!');
                    }else if(treeType=="2"){
                        this.Companyflag=false;
                        this.Departmentflag=false;
                        this.Dutiesflag=true;
                        this.disabled=false;
                        this.CeateTypeflag='NEW';
                        this.DutformData={};
                    }else if(treeType=="3"){
                       this.$message.error('职务下不能直接创建职务!');
                    }
                }
            } 
        },
        //修改公司、部门，职务
        editCDD(){
            this.disabled=false;
            this.CeateTypeflag='EDIT';
        },
        //保存数据检查
        checkData(tempData){
            if(tempData.fcode.length > 50){
                this.$message.error('编号长度不能大于50！');
                return true;
            }
            if(tempData.fname.length > 100){
                this.$message.error('名称长度不能大于100！');
                return true;
            }
            if(tempData.fremark != null && tempData.fremark.length > 100){
                this.$message.error('简称长度不能大于100！');
                return true;
            }
            return false;
        },
        //保存公司、部门，职务
        saveCDD(){
            let SelectData=this.NodeClickData;
            if(this.disabled === false){
                //保存公司
                if(this.Companyflag == true){
                    let fromdata={};
                    if(this.CeateTypeflag=='EDIT'){
                        fromdata=SelectData;
                    }else{
                        fromdata.foid='';
                        fromdata.fcompanyOid=SelectData.foid;
                        fromdata.pid=SelectData.foid;
                    }
                    let saveflag=true;
                    if(this.ConformData.fcode){
                        fromdata.fcode=this.ConformData.fcode;
                    }else{
                        this.$message.error('请输入公司编号!');
                        saveflag=false;
                    }
                    if(this.ConformData.fname){
                        fromdata.fname=this.ConformData.fname;
                    }else{
                        this.$message.error('请输入公司名称!');
                        saveflag=false;
                    }
                    if(this.ConformData.fremark){
                        fromdata.fremark=this.ConformData.fremark;
                    }else{
                        fromdata.fremark="";
                    }
                    //长度检查
                    if (this.checkData(this.ConformData)){
                        return;
                    }
                    fromdata.fcreator=localStorage.getItem('ms_userId');
                    if(saveflag === true){
                        this.$api.management.saveCompanyInfo(fromdata).then(response => {
                            let responsevalue = response;
                            if(responsevalue.statusText && responsevalue.statusText=='OK'){
                                this.disabled=true;
                                this.$api.management.selectAllOrganizationInfo().then(response => {
                                    let responsevalue = response;
                                    if (responsevalue) {
                                        let tabledata=eval('(' + responsevalue.data.data + ')');
                                        this.treeData=tabledata;
                                        this.defaultexpanded.push(this.NodeClickData.foid);
                                    }
                                });
                            }else{
                                this.$message.error('保存公司失败!');
                            }
                        });
                    }
                }else if(this.Departmentflag == true){
                    //保存部门
                    let fromdata={};
                    if(this.CeateTypeflag=='EDIT'){
                        fromdata=SelectData;
                    }else{
                        fromdata.foid='';
                        fromdata.fcompanyOid=SelectData.foid;
                        fromdata.pid=SelectData.foid;
                    }
                    let saveflag=true;
                    if(this.DepformData.fcode){
                        fromdata.fcode=this.DepformData.fcode;
                    }else{
                        this.$message.error('请输入部门编号!');
                        saveflag=false;
                    }
                    if(this.DepformData.fname){
                        fromdata.fname=this.DepformData.fname;
                    }else{
                        this.$message.error('请输入部门名称!');
                        saveflag=false;
                    }
                    if(this.DepformData.fremark){
                        fromdata.fremark=this.DepformData.fremark;
                    }else{
                        fromdata.fremark="";
                    }
                    //长度检查
                    if (this.checkData(this.DepformData)){
                        return;
                    }
                    if(this.DepformData.vicePresidentName){
                        fromdata.vicePresidentId=this.DepformData.vicePresidentName;
                    }else{
                        fromdata.vicePresidentId= 'BFPID000000OV20W6X';  
                    }
                    if(this.DepformData.departmentLeaderId){
                        fromdata.departmentLeaderId=this.DepformData.departmentLeaderId;
                    }else{
                        fromdata.departmentLeaderId= 'BFPID000000OV20W6X';  
                    }
                    fromdata.fcreator=localStorage.getItem('ms_userId');
                    if(saveflag === true){
                        this.$api.management.saveDeptmentInfo(fromdata).then(response => {
                            let responsevalue = response;
                            if(responsevalue.statusText && responsevalue.statusText=='OK'){
                                this.disabled=true;
                                this.$api.management.selectAllOrganizationInfo().then(response => {
                                    let responsevalue = response;
                                    if (responsevalue) {
                                        let tabledata=eval('(' + responsevalue.data.data + ')');
                                        this.treeData=tabledata;
                                        this.defaultexpanded.push(this.NodeClickData.foid);
                                    }
                                });
                            }else{
                                this.$message.error('保存部门失败!');
                            }
                        });
                    }
                }else if(this.Dutiesflag == true){
                    //保存职务
                    let fromdata={};
                    if(this.CeateTypeflag=='EDIT'){
                        fromdata=SelectData;
                    }else{
                        fromdata.foid='';
                        fromdata.fcompanyOid=SelectData.foid;
                        fromdata.pid=SelectData.foid;
                    }
                    let saveflag=true;
                    if(this.DutformData.fcode){
                        fromdata.fcode=this.DutformData.fcode;
                    }else{
                        this.$message.error('请输入职位编号!');
                        saveflag=false;
                    }
                    if(this.DutformData.fname){
                        fromdata.fname=this.DutformData.fname;
                    }else{
                        this.$message.error('请输入职位名称!');
                        saveflag=false;
                    }
                    if(this.DutformData.positonName){
                        fromdata.positonId=this.DutformData.positonId;
                    }else{
                        fromdata.positonId="";
                    }
                    if(this.DutformData.businessLeaderName){
                        fromdata.businessLeaderId=this.DutformData.businessLeaderId;
                    }else{
                        fromdata.businessLeaderId= '';  
                    }
                    if(this.DutformData.directLeaderName){
                        fromdata.directLeaderId=this.DutformData.directLeaderId;
                    }else{
                        fromdata.directLeaderId= '';  
                    }
                    if(this.DutformData.responsibility){
                        fromdata.responsibility=this.DutformData.responsibility;
                    }else{
                        fromdata.responsibility= '';  
                    }
                    //长度检查
                    if (this.checkData(this.DutformData)){
                        return;
                    }
                    fromdata.fcreator=localStorage.getItem('ms_userId');
                    if(saveflag === true){
                        this.$api.management.savePositionInfo(fromdata).then(response => {
                            let responsevalue = response;
                            if(responsevalue.statusText && responsevalue.statusText=='OK'){
                                this.disabled=true;
                                this.$api.management.selectAllOrganizationInfo().then(response => {
                                    let responsevalue = response;
                                    if (responsevalue) {
                                        let tabledata=eval('(' + responsevalue.data.data + ')');
                                        this.treeData=tabledata;
                                        this.defaultexpanded.push(this.NodeClickData.foid);
                                    }
                                });
                            }else{
                                this.$message.error('保存职位失败!');
                            }
                        });
                    }
                }
            }
            
        }
    },
};
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
.El-tree{
    height: 400px;
    overflow-y:auto;
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