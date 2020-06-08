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
                        <el-button type="primary" plain @click="getAll" class="search-all">重置</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="10">
                     <el-button type="success" plain @click="add">新增</el-button>
                     <el-button type="danger" plain @click="deleteMsg">删除</el-button>
                     <el-button type="warning" plain @click="toEdit">编辑</el-button>
                     <el-button type="success" plain @click="effectOrDisableMsg">查看</el-button>
                 </el-col>
            </el-row>
        </el-card>
    <!-- 表格 -->
        <el-card class="box-card">
            <dynamic-table
                :columns="columns1"
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
        <el-dialog title="新增业务" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="部门" :label-width="formLabelWidth" prop="fcode">
                    <el-input v-model="form.fcode" autocomplete="off"></el-input>
                    <img class="icon-search" @click="workSearch" src="../../assets/img/search.svg">
                </el-form-item>
            </el-form>
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
                        <el-button type="success" size="mini" plain @click="joinSearch('用户')">新建</el-button>
                        <el-button type="danger" size="mini" plain @click="deleteMsg">删除</el-button>
                    </el-col>
                </el-row>
            <el-row :gutter="20">
            <el-col :span="12" style="text-align: right;">
                <el-button  size="small" @click="saveConfig">保存</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="small" @click="cancelConfig">取消</el-button>
            </el-col>
        </el-row>
        </el-dialog>
        <!-- 部门弹出框 -->
        <pro-bus-dialog :visible="proBusDialogF" :title="titleStr" :type="userType"  @closeDialog="closeBaseInfo"></pro-bus-dialog>

    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proBusDialog from './proces-busines-dialog'
export default {
    name:'businessProcess',
    components: {
      DynamicTable,
      proBusDialog,
    },
    data() {
        return {
            userType:'',
            proBusDialogF:false,
            proApartDialogF:false,
            dialogFormVisible:false,
            titleStr:'',
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
                title: '用户名称'
            },
            {
                key: 'fname',
                title: '角色'
            },
           
        ],
        columns1: [
            {
                type: 'selection'
            },
            {
                key: 'fcode',
                title: '状态'
            },
            {
                key: 'fname',
                title: '单据号'
            },
             {
                key: 'fcode',
                title: '部门'
            },
            {
                key: 'fname',
                title: '公司'
            },
           
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
          fremark: ''
        },
        formLabelWidth: '120px',
         rules: {
          fcode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
           fname: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
         },
        };
    },
    
    created(){
        this.$nextTick(()=>{
            this.getTableData('')
        })
    },
    computed:{
        
    },
    methods:{
        //业务工作弹窗
        workSearch(){
            this.titleStr = '部门查询'
             this.proBusDialogF = true;
              this.userType = ''
            //  this.showBaseInfo = false;
             // 业务工作-搜索枚举项
            // this.workSearchOption()
            // this.workSearchTable()
        },
        joinSearch(Str){
            this.titleStr = '新建用户&角色'
             this.proBusDialogF = true;
             this.userType = Str
        },
        saveConfig(){

        },
        cancelConfig(){
            
        },
         closeBaseInfo(){
            this.proBusDialogF = false;
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
        // 搜索
        onSubmit(){
            this.getTableData(this.formCode);
        },
        getAll(){
            this.getTableData('')
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
                for(let i in this.tableData){
                    switch ( this.tableData[i].fstatus) {
                        case 3:
                             this.tableData[i].fstatus = '禁用'
                             break;
                        case 8:
                             this.tableData[i].fstatus = '生效'
                             break;
                        default:
                            break;
                    }
                    switch ( this.tableData[i].fsubprocess) {
                    case 1:
                            this.tableData[i].fsubprocess = '是'
                            break;
                    case 0:
                            this.tableData[i].fsubprocess = '否'
                            break;
                    default:
                        break;
                }
                }
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
                    this.$api.processSet.addSubmit(this.form).then(res=>{
                        if(res.data.data.msg = "success"){
                            this.dialogFormVisible = false
                            this.$message.success('新增成功');
                            //刷新表格
                            this.getTableData('')
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
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个删除');
                 return;
            }
            this.$api.processSet.deleteMsg(this.multipleSelection[0].foid).then(res=>{
                    if(res.data.data.msg = "success"){
                        this.$message.success('删除成功');
                        //刷新表格
                        this.getTableData('')
                    }
                }),error=>{
                    console.log(error);
                }
        },
         //生效/禁用
        effectOrDisableMsg(){
            let status = this.multipleSelection[0];
            if(this.multipleSelection.length > 1){
                 this.$message.error('只能选择一个删除');
                 return;
            }else if(this.multipleSelection.length = 0){
                this.$message.error('请选择一项删除');
                 return;
            };
            
            switch (status.fstatus) {
                case '生效':
                    status.fstatus = 3
                    break;
                case '禁用':
                    status.fstatus = 8
                    break;
                default:
                    break;
            }
            let data = {
                foid  : status.foid,
                status  : status.fstatus
            }
            this.$api.processSet.effectOrDisable(data).then(res=>{
                    if(res.data.data.msg = "success"){
                        this.$message.success('操作成功');
                        //刷新表格
                        this.getTableData('')
                       
                    }
                }),error=>{
                    console.log(error);
                }
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
 /deep/ .el-input{
         width: 70%;
 }
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
.box-card:first-child{
    margin-bottom: 16px;
}
.box-card{
    /deep/ .el-input{
        width: 100%;
    }
}
.search-all{
    margin-left: 50px;
}
.icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .joinTableBox{
     margin-bottom:30px;
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

</style>