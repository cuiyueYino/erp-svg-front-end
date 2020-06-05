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
        <el-dialog title="流程维护" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
                    <el-input v-model="form.fcode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
                    <el-input v-model="form.fname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组织结构单元：" :label-width="formLabelWidth">
                    <el-input v-model="form.date2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="子流程：" :label-width="formLabelWidth">
                    <el-checkbox v-model="checked"></el-checkbox>
                </el-form-item>
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input maxlength="1000" show-word-limit autosize type="textarea" v-model="form.fremark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    name:'businessProcess',
    data() {
        return {
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
                title: '状态'
            },
            {
                key: 'fname',
                title: '单据号'
            },
            {
                key: 'fsubprocess',
                title: '部门'
            },
            {
                key: 'fstatus',
                title: '公司'
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
    components: {
      DynamicTable,
    },
    created(){
        this.$nextTick(()=>{
            this.getTableData('')
        })
    },
    computed:{
        
    },
    methods:{
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
.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
}

</style>