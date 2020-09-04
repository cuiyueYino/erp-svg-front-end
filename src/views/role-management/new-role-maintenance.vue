<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                :model="formdata"
                size="mini"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="编码" prop="code">
                                <el-input v-model="formdata.code" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="formdata.name" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="角色类别" prop="roleTypeName">
                                <el-input v-model="formdata.roleTypeName" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchCSCSubject(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.remark" :rows="2" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName">
                        <el-tab-pane label="业务权限" name="first">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="公司" prop="company">
                                        <el-select v-model="company" @change="CompanyChange" value-key="value" >
                                            <el-option
                                                v-for="item in companyoptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="treeStyle">
                                    <el-tree
                                        :data="treeData"
                                        :props="defaultProps"
                                        node-key="id"
                                        ref="tree"
                                        :render-content="renderContent"
                                        accordion
                                        show-checkbox
                                        :default-expanded-keys="firstnode"
                                        :default-checked-keys="checkdata"
                                        @node-click="handleNodeClick">
                                    </el-tree>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onHandleSave">确认</el-button>
            </span>
        </el-dialog>
        <RMDmaintenpage  :rowRMDtype="rowRMDtype" :rowRMDDataObj="rowRMDDataObj" @changeShow="showMoreRMD"/>
    </div>
</template>
<script>
import RMDmaintenpage from './role-maintenance-detail.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowNRMDataObj:Object,
        rowNRMtype: Boolean
    },
    name: 'basetable',
    components: {
        RMDmaintenpage,
    },
    inject: ['reload'],
    data(){
        return{
            ShowFinancVisible:false,
            rowRMDtype:false,
            checkdata:[],
            firstnode:[],
            rowRMDDataObj:{},
            title:'',
            formdata:{},
            createtype:'',
            labelPosition: 'left',
            atctiveName:'first',
            company:'_DefaultCompanyOId',
            companyoptions:[],
            treeData:[],
            terrAllMenuData:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编号', trigger: 'blur' }],
                roleTypeName:[{ required: true, message: '请选择角色类别', trigger: 'blur' }],
            }
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
            //this.reload();
        },
        MoreSearchCSCSubject(){
            this.rowRMDtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            this.rowRMDDataObj=finandata;
        },
        //改变公司事件
        CompanyChange(event) {
            if(this.createtype ==="NEW"){
                this.maketree(event);
            }else{
                this.asyncCall(this.company,this.formdata.id);
            }
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.type ==1){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    )
                }else{
                    if(data.children.length ==0){
                        return(
                            <span class="custom-tree-node">
                                <span><i class="el-icon-document"></i></span>
                                <span style="margin-left: 5px;">{node.data.name}</span>
                            </span>
                        )
                    }else{
                        return(
                            <span class="custom-tree-node">
                                <span><i class="el-icon-folder-opened"></i></span>
                                <span style="margin-left: 5px;">{node.data.name}</span>
                            </span>
                        )    
                    }
                } 
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.type;
        },
        //角色查询返回值处理
        showMoreRMD(data,type){
            let SelectData=data;
            if(SelectData.SelectRMDData){
                let DataA=SelectData.SelectRMDData[0];
                this.formdata.roleTypeName=DataA.name;
                this.formdata.roleType=DataA.id;
            }
            if(type === false){
                this.rowRMDtype = false
            }else{
                this.rowRMDtype = true
            }
        },
        // 确认按钮
        onHandleSave(){
            //获取选中节点的所有信息
            let NodeCheckData=this.$refs.tree.getCheckedNodes(false,true);
            let SelectNodeDate = [];
            for(var i=0;i<NodeCheckData.length;i++){
                SelectNodeDate.push(NodeCheckData[i].id);
            }
            //获取选择节点的key_不包含半选
            //let NodeCheckData=this.$refs.tree.getCheckedKeys(false);
            //let NodeCheckData122=this.$refs.tree.getCheckedKeys(true);
            let savetype=false;
            //新建
            if(this.createtype=="NEW"){
                let fromdata={};
                if(this.formdata.code){
                    fromdata.code=this.formdata.code;
                    savetype=true;
                }else{
                    this.$message.error('请输入编号!');
                    savetype=false;
                    return;
                }
                if(this.formdata.name){
                    fromdata.name=this.formdata.name;
                    savetype=true;
                }else{
                    this.$message.error('请输入名称!');
                    savetype=false;
                    return;
                }
                if(this.formdata.roleTypeName){
                    fromdata.roleType=this.formdata.roleType;
                    savetype=true;
                }else{
                    this.$message.error('请选择角色类别!');
                    savetype=false;
                    return;
                }
                if(this.formdata.remark){
                    fromdata.remark=this.formdata.remark;
                }
                /*if(SelectNodeDate.length ===0){
                    this.$message.error('请选择业务权限!');
                    savetype=false;
                    return;
                }else{
                    let MenuObj={};
                    MenuObj.company=this.company;
                    MenuObj.menuIds=SelectNodeDate;
                    fromdata.roleMenu=MenuObj;
                    savetype=true;
                }*/
                let MenuObj={};
                MenuObj.company=this.company;
                MenuObj.menuIds=SelectNodeDate;
                fromdata.roleMenu=MenuObj;
                fromdata.company=this.company;
                fromdata.creator=localStorage.getItem('ms_userId');
                if(savetype){
                    this.$api.RoleManagement.insertRoleModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
                            this.ShowFinancVisible=false;
                            this.reload();
                            this.$emit('changeShow',false);
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                }
                //this.$emit('changeShow',this.rowNRMDataObj,false);
            }else if(this.createtype=="EDIT"){
                //修改
                let fromdata=this.formdata;
                if(this.formdata.code){
                    fromdata.code=this.formdata.code;
                    savetype=true;
                }else{
                    this.$message.error('请输入编号!');
                    savetype=false;
                    return;
                }
                if(this.formdata.name){
                    fromdata.name=this.formdata.name;
                    savetype=true;
                }else{
                    this.$message.error('请输入名称!');
                    savetype=false;
                    return;
                }
                if(this.formdata.roleTypeName){
                    fromdata.roleType=this.formdata.roleType;
                    savetype=true;
                }else{
                    this.$message.error('请选择角色类别!');
                    savetype=false;
                    return;
                }
                if(this.formdata.remark){
                    fromdata.remark=this.formdata.remark;
                }
                fromdata.company=this.company;
                fromdata.creator=localStorage.getItem('ms_userId');
                /*if(SelectNodeDate.length ===0){
                    this.$message.error('请选择业务权限!');
                    savetype=false;
                    return;
                }else{
                    let MenuObj={};
                    MenuObj.company=this.company;
                    MenuObj.roleId=this.formdata.id;
                    MenuObj.menuIds=SelectNodeDate;
                    fromdata.roleMenu=MenuObj;
                    savetype=true;
                }*/
                let MenuObj={};
                MenuObj.company=this.company;
                MenuObj.roleId=this.formdata.id;
                MenuObj.menuIds=SelectNodeDate;
                fromdata.roleMenu=MenuObj;
                if(savetype){
                    this.$api.RoleManagement.updateRoleModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
                            this.ShowFinancVisible=false;
                            this.reload();
                            this.$emit('changeShow',false);
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                }
                //this.$emit('changeShow',false);
            }
        },
        // 循环生成树数据
        toTreeData(data,id,pid,name,code) {
        // 建立个树形结构,需要定义个最顶层的父节点，pId是1
            let parent = [];
            for (let i = 0; i < data.length; i++) {

                if(data[i][pid] !== null){

                }else{
                    let obj = data[i];
                    obj.children=[];
                    obj.type=1;
                    if(data[i].status== 3){
                        obj.statusName='有效';
                    }else{
                        obj.statusName='失效';
                    }
                    parent.push(obj);//数组加数组值
                    this.firstnode.push(obj.id);
                }

            }
            let index=1;
            children(parent,index);
            // 调用子节点方法,参数为父节点的数组
            function children(parent,index) {
                index=index+1;
                if (data.length !== 0) {
                    for (let i = 0; i < parent.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (parent[i].id == data[j][pid]){
                                let obj = data[j];
                                obj.children=[];
                                obj.type=index;
                                if(data[j].status ==3){
                                    obj.statusName='有效';
                                }else{
                                    obj.statusName='失效';
                                }
                                parent[i].children.push(obj);
                            }
                        }
                        children(parent[i].children,index);
                    }
                }
            }
            return parent;
        },
        //生成树
        maketree(company){
            let fromdata={};
            fromdata.company=company;
            return this.$api.SystemSet.findMenuByParam(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.terrAllMenuData=returndata.data;
                    this.treeData = this.toTreeData(returndata.data,"id","parentId","name","code");
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //根据角色、公司查询已授权菜单
        searchRoleMenu(company,roleId){
            let fromdata={};
            fromdata.company=company;
            fromdata.roleId=roleId;
            return this.$api.RoleManagement.findRMByCompany(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let CheckDataArr=this.DeleteParentMenu(this.terrAllMenuData,returndata.data)
                    this.checkdata = CheckDataArr;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            }); 
        },
        //取消父亲节点的选中，保证其为半选中状态
        DeleteParentMenu(ALLData,CheckData){
            for(let i=0;i<CheckData.length;i++){
                for(let j=0;j<ALLData.length;j++){
                    if(CheckData[i]==ALLData[j].parentId){
                        CheckData[i] = "";
                        //CheckData.splice(i,1);
                        break;
                    }
                }
            }
            return CheckData;
        },
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyoptions= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        //异步变同步
        async asyncCall(company,roleid) {
            await this.maketree(company);
            await this.searchRoleMenu(company,roleid);
        }   
    },
    watch:{
        rowNRMtype(oldVal,newVal){
            if(this.rowNRMtype){
                this.ShowFinancVisible=this.rowNRMtype;
                this.title=this.rowNRMDataObj.nametitle;
                this.createtype=this.rowNRMDataObj.createtype;
                if(this.rowNRMDataObj.createtype =="NEW"){
                    this.checkdata=[];
                    this.maketree(this.company);
                    this.formdata={};
                    this.selectCom();
                }else{
                    let selectdata=this.rowNRMDataObj.SelectData;
                    this.selectCom();
                    this.checkdata=[];
                    let fromdata={};
                    fromdata.id=selectdata[0].id;
                    this.$api.RoleManagement.getRoleModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            this.formdata=returndata.data;
                            this.asyncCall(this.company,returndata.data.id);
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }
            }  
        }
    }
}
</script>
<style lang="scss" scoped>
.treeStyle{
    width: 100%;
    height:350px;
    overflow-y: auto;
}
</style>