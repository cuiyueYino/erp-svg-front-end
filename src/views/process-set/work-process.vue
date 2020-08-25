<template>
    <div>     
    <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
               <el-col :span="14">
                    <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item >
                        <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" plain @click="onSubmit">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="getAll" class="search-all">显示全部信息</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="10">
                     <el-button type="success" plain @click="add">新增</el-button>
                     <el-button type="danger" plain @click="deleteMsg">删除</el-button>
                     <el-button type="warning" plain @click="toEdit">编辑</el-button>
                     <el-button type="success" plain @click="effectOrDisableMsg">生效</el-button>
                     <el-button type="danger" plain @click="effectOrDisableMsg">禁用</el-button>
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
    <!-- 弹出框 -->
        <el-dialog title="流程维护" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center >
            <el-form :model="form" :rules="rules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
                            <el-input v-model="form.fcode" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
                            <el-input v-model="form.fname" autocomplete="off" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                         <el-form-item label="子流程：" :label-width="formLabelWidth"> 
                            <el-checkbox v-model="checked"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <!-- <el-form-item label="组织结构" :label-width="formLabelWidth" style="position:relative;">
                        <el-input v-model="form.structure" autocomplete="off"></el-input>
                        <img
                        class="icon-search"
                        src="../../assets/img/search.svg"
                        @click="baseInputTable('用户','组织结构查询')"
                        />
                    </el-form-item> -->
                    <el-col :span="22">
                         <el-form-item label="描述：" :label-width="formLabelWidth"  prop="fremark">
                            <el-input maxlength="500" show-word-limit autosize type="textarea" v-model="form.fremark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog('form')">取 消</el-button>
                <el-button type="primary" @click="addSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
         <el-form :model="formProcess"  ref="formProcess">
         <!-- 第三层弹窗 -->
            <base-info-dialog
                class="children-dialog"
                :visible="baseInputTableF"
                :type="baseInputType"
                :title="baseInputTitle"
                @closeDialog="closeBaseInfo"
            ></base-info-dialog>
        </el-form>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import baseInfoDialog from "../Home/node-components/base-info-dialog";
export default {
    name:'workProcess',
    data() {
        return {
            formProcess:{},
             baseInputType: "",
             baseInputTitle: "",
             baseInputTableF: false,
            dialogFormVisible:false,
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
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
                key: 'fsubprocessName',
                title: '子流程'
            },
            {
                key: 'fgotoauditName',
                title: '按退回节点重新提交'
            },
            {
                key: 'fremark',
                title: '描述'
            },
            {
                key: 'fstatusName',
                title: '状态'
            }
        ],
        tableData:[],
        multipleSelection: [],
        checked:false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          fremark: '',
          fcode:'',
          fname:'',
        },
        formLabelWidth: '120px',
         rules: {
          fcode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
           fname: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
         },
        };
    },
    components: {
      DynamicTable,
       baseInfoDialog
    },
    created(){
        this.$nextTick(()=>{
            this.getTableData('')
        })
    },
    computed:{
    },
    watch:{
        dialogFormVisible(val){
            if(!val){
                this.$refs['form'].resetFields();
            }
        }
    },
    methods:{
        closeDialog(formName){
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //多选
        onSelectionChange(val) {//console.log(val)
            this.multipleSelection = val;
        },
        //分页、下一页
        onCurrentChange(val){
             this.pageNum = val;
            this.getTableData('')
        },
        // 搜索
        onSubmit(){
            this.getTableData(this.formCode);
        },
        getAll(){
            // 清空搜索框数据
            this.formCode = '';
            this.getTableData('')
        },
         closeBaseInfo(data, dialogtitle, type) {
            if (data.length > 0) {
                // this.form.structure = data[0].fname;
                this.form.structurecode = data[0].fcode;
                this.form.structureId = data[0].foid;
            }
            this.baseInputTableF = false;
            },
         baseInputTable(str, title) {
            this.baseInputTableF = true;
            this.baseInputTitle = title;
            this.baseInputType = str;
        },
        // 获取表格数据
        getTableData(params){
            let data = {
                fcode: params,
                page:this.pageNum,
                size:this.pageSize
            };
            this.$api.processSet.getTableData(data).then(res=>{
                this.tableData = res.data.data.rows
                 this.total = res.data.data.total
            },error=>{
                console.log(error)
            })
        },
        //新增
        add(){
            this.dialogFormVisible = true
        },
        addSubmit(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.fsubprocess = this.checked?1:0;
                    this.$api.processSet.addSubmit(this.form).then(res=>{
                        if(res.data.data.msg == "success"){
                            this.dialogFormVisible = false
                            this.$message.success('新增成功');
                            //刷新表格
                            this.getTableData('')
                        }else{
                            this.$message.error(res.data.data.msg );
                        }
                    }),error=>{
                        console.log(error);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
             });

        },
        
        //删除
        deleteMsg(){
            debugger;
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个删除');
                 return;
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项删除');
                 return;
            };
            this.$api.processSet.deleteMsg(this.multipleSelection[0].foid).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success('删除成功');
                        //刷新表格
                        this.getTableData('')
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }),error=>{
                    console.log(error);
                }
        },
         //生效/禁用
        effectOrDisableMsg(){
            let status = this.multipleSelection[0];
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个操作');
                 return;
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项操作');
                 return;
            };
            switch (status.fstatusName) {
                case '生效':
                    status.fstatus = 8
                    break;
                case '禁用':
                    status.fstatus = 3
                    break;
                default:
                    break;
            }
            let data = {
                foid  : status.foid,
                status  : status.fstatus
            }
            this.$api.processSet.effectOrDisable(data).then(res=>{
                    if(res.data.code == 0){
                        this.$message.success('操作成功');
                        //刷新表格
                        this.getTableData('')
                       
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }),error=>{
                    console.log(error);
                }
        },
        toEdit(){
             if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个编辑');
                 return;
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项编辑');
                 return;
            };
                // { "code": this.multipleSelection[0].fcode},
                //    this.multipleSelection[0].fname,
                // this.multipleSelection[0].foid,
            sessionStorage.setItem("eidtMsgSelectID",this.multipleSelection[0].foid);
            this.$router.push({name:"svgIndex"})
            /*this.$api.svg.getSvgSingleData(this.multipleSelection[0].foid).then(res=>{
                if(res.data.data.msg = "success"){
                    sessionStorage.setItem("eidtMsgcode",  res.data.data.code);
                    sessionStorage.setItem("eidtMsgfname",   res.data.data.name);
                    sessionStorage.setItem("eidtMsgfoid",   res.data.data.oid);
                    sessionStorage.setItem("eidtMsg",   JSON.stringify(res.data.data));
                    this.$router.push({
                        name:"svgIndex"
                    })
                }
            }),error=>{
                console.log(error);
            }*/
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
.icon-search {
    position: absolute;
  width: 24px;
  height: auto;
  margin-left: 12px;
  cursor: pointer;
}
</style>