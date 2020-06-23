<template>
    <div>     
    <!-- 搜索框 -->
        <el-card class="box-table">
           <el-row :gutter="24">
                <el-col :span="11" :offset="13">
                    <el-button type="success" icon="el-icon-refresh" plain @click="refresh">刷新</el-button>
                    <el-button type="success" icon="el-icon-search" plain @click="search">查询</el-button>
                    <el-button type="warning" icon="el-icon-document" plain @click="Tolook">查看</el-button>
                    <el-button type="success" icon="el-icon-share" plain @click="baseInputTable()">转发</el-button>
                    <el-button type="danger" icon="el-icon-more" plain @click="baseInputTable()">加批</el-button>
                    <el-button type="danger" icon="el-icon-view" plain @click="baseInputTable()">关注</el-button>
                    <el-button type="danger" icon="el-icon-printer" plain @click="baseInputTable()">打印</el-button>
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
        <!-- 弹出框 查询 -->
        <el-dialog title="已办事项查询" :visible.sync="dialogWFMVisible" :close-on-click-modal="false" width="50%">
            <el-form 
                :model="DataForm" 
                label-width="97px"
                label-suffix="："
                size="small"
                @submit.native.prevent
                label-position="right">
                 <el-row :gutter="24" >
                 <el-col :span="22" class="box-card" :offset="2">
                            <el-form-item label="来源单据公司" label-width="120px">
                                <el-select v-model="DataForm.WFMtype" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                 </el-col>
                   <el-col :span="22" class="box-card" :offset="2">
                             <el-form-item label="业务数据" label-width="120px">
                                <el-select v-model="DataForm.WFMtype" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                   </el-col>
                    <el-col :span="22" :offset="2">
                            <el-form-item label="业务工作" label-width="120px">
                                <el-input clearable v-model="DataForm.documentNo" placeholder="请输入条件值"></el-input>
                            </el-form-item>
                    </el-col>
                     <el-col :span="22" :offset="2">
                            <el-form-item label="主题" label-width="120px">
                                <el-input clearable  v-model="DataForm.documentNo" placeholder="请输入条件值"></el-input>
                            </el-form-item>
                     </el-col>
                      <el-col :span="22" :offset="2">
                            <el-form-item label="接收时间" label-width="120px">
                                <el-date-picker
                                      v-model="DataForm.docDateStart"
                                      type="datetimerange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                      </el-col>
                       <el-col :span="22" :offset="2">
                            <el-form-item label="发起人" label-width="120px">
                                <el-input clearable  v-model="DataForm.documentNo" placeholder="请输入条件值"></el-input>
                                 <img class="icon-search"  
                                    @click="workSearch"
                                    src="../../assets/img/search.svg">
                            </el-form-item>
                       </el-col>
                        <el-col :span="22" :offset="2">
                            <el-form-item label="发起时间" label-width="120px">
                                <el-date-picker
                                    v-model="DataForm.docDateStart"
                                     type="datetimerange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                         <el-col :span="22" :offset="2">
                            <el-form-item label="超时" label-width="120px">
                               <el-radio-group v-model="DataForm.radio">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                            </el-form-item>
                         </el-col>
                 </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWFMVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="addSubmit('form')" size="medium">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 部门弹出框 -->
        <pro-bus-dialog :visible="proBusDialogF" :title="titleStr" :type="userType"  @closeDialog="closeBaseInfo"></pro-bus-dialog>
       
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proBusDialog from './proces-busines-dialog';

export default {
    name:'issuedItems',
    components: {
      DynamicTable,
      proBusDialog,
    },
    data() {
        return {
            homeTitle:'',
            userType:'',
            rowDStype:false,
            rowDSDataObj:{},
            proBusDialogF:false,
            proApartDialogF:false,
            dialogFormVisible:false,
            dialogWFMVisible:false,
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
                title: '单据类型'
            },
             {
                key: 'fcode',
                title: '业务工作'
            },
            {
                key: 'fname',
                title: '发起时间'
            },
            {
                key: 'fname',
                title: '主题'
            },
            {
                key: 'fcode',
                title: '审批人接收时间'
            },
            {
                key: 'fcode',
                title: '审批时间'
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
           
        ],
        tableData:[],
        options:[],
        WFMtypeoptions:[],
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
        workSearch(){

        },
         
        // 搜索
        onSubmit(Str){
            
        },
        search(){
           this.dialogWFMVisible =true;
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
    width: 70%;
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
 /deep/ .el-input__inner{
         width: 466px;
 }
.box-table:first-child{
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