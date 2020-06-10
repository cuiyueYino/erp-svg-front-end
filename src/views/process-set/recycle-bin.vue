<template>
    <div>     
    <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="2" :offset="22">
                     <el-button type="success" icon="el-icon-more" plain @click="carsh">还原</el-button>
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
  
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    name:'recycleBin',
    components: {
      DynamicTable,
    },
    data() {
        return {
            homeTitle:'',
            userType:'',
            proBusDialogF:false,
            proApartDialogF:false,
            dialogFormVisible:false,
            titleStr:'',
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
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
                title: '单据类型'
            },
             {
                key: 'fcode',
                title: '业务工作'
            },
            {
                key: 'fname',
                title: '发起人'
            },
            {
                key: 'fname',
                title: '发起时间'
            },
             {
                key: 'fcode',
                title: '主题'
            },
            {
                key: 'fname',
                title: '上一节点'
            },
             {
                key: 'fcode',
                title: '审批人接收时间'
            },
            {
                key: 'fname',
                title: '标准用时'
            },
             {
                key: 'fname',
                title: '已耗时'
            },
             {
                key: 'fname',
                title: '转发人'
            },
             {
                key: 'fcode',
                title: '转发时间'
            },
            {
                key: 'fname',
                title: '委托人'
            },
            {
                key: 'fname',
                title: '委托时间'
            },
            {
                key: 'fname',
                title: '移除时间'
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
            this.dialogFormVisible = false;
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
        onSubmit(Str){
            
        },
        carsh(){
            
        },
        look(){
            
        },
        forward(){

        },
        attention(){

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
        add(Str){
            this.homeTitle = Str
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