<template>
    <div>
        <el-card>
            <div slot="header" class="result">
                <div class="fr">
                    <el-select v-model="formInline.company" placeholder="公司" clearable>
                        <el-option
                            v-for="item in companyData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="inline fr">
                    <el-button class="sky" size="small" icon="el-icon-edit" @click="onRowAddButtonClick" round>新建</el-button>
                    <el-button class="sky" size="small" icon="el-icon-edit" @click="onRowUpdateButtonClick" round >修改</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link" @click="onRowRemoveButtonClick" round>删除</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowLookButtonClick" round>查看</el-button>
                </div>
            </div>
            <div class="container">
                <div class="search-left">
                    <el-select v-model="formInline.searchName" placeholder="名称" clearable>
                        <el-option
                            v-for="item in address"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="frdiv" v-show="formInline.searchName === ''"><el-input v-model="formInline.searchValue"></el-input></div>
                    <div class="frdiv" v-show="formInline.searchName === '001'"><el-input v-model="formInline.searchValue"></el-input></div>
                    <div class="frdiv" v-show="formInline.searchName === '002'"><el-input v-model="formInline.searchValue"></el-input></div>
                    <div class="frdiv" v-show="formInline.searchName === '003'">
                        <el-select v-model="formInline.serchcompany" placeholder="公司" clearable>
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-right">
                    <div class="fr">
                        <el-button class="sky" size="small" @click="onHandleSearch" round>查询</el-button>
                        <el-button class="sky" size="small" @click="MoreSearchVisible = true" round>高级查询</el-button>
                    </div>
                </div>
            </div>
            <dynamic-table
                :columns="columns"
                :table-data="tableData"
                :total="total"
                ref="multipleTable"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                @size-change="onSizeChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
        <el-dialog title="付息方式"  :visible.sync="NewEditVisible" :append-to-body="true" v-if="NewEditVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                :model="formdata"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="公司" prop="company">
                            <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                                <el-option
                                    v-for="item in companyoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item v-if="showCheckBox">
                            <el-checkbox v-model="checked" >连续追加</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="编码" prop="code">
                            <el-input v-model="formdata.code" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="项目描述">
                            <el-input type="textarea" v-model="formdata.remark" :rows="8" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="NewEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNewAndEdit">提交</el-button>
            </span>
        </el-dialog>
        <el-dialog title="付息方式缺省查询方案" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="pbackground">查询条件</el-col>
                    <el-col :span="6"  class="pbackground">操作符</el-col>
                    <el-col :span="12" class="pbackground">条件值</el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">公司</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.company">
                            <el-option
                                v-for="item in companyoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">编码</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.codeNomber"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.name"></el-input>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MoreSearchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSearch">查询</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
export default {
    name: 'basetable',
    components: {
        DynamicTable
    },
    inject: ['reload'],
    data() {
        return {
            MoreSearchVisible: false,
            NewEditVisible: false,
            disabled: false,
            editabled:false,
            showCheckBox: false,
            dialogImageUrl: '',
            dialogVisible: false,
            saveflage:'New',
            checked: false,
            labelPosition: 'left',
            formInline: {
                searchName: '001',
                searchValue: '',
                serchcompany:'',
                company:''
            },
            companyoptions: new proData().company,
            companyData:new proData().company,
            address: [
                {
                    value: '001',
                    label: '名称'
                },
                {
                    value: '002',
                    label: '编码'
                },
                {
                    value: '003',
                    label: '公司'
                }
            ],
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'statusString',
                    title: '状态'
                },
                {
                    key: 'code',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'remark',
                    title: '描述'
                }
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            formdata: {
                company: '',
                code: '',
                remark: '',
                name: ''
            },
            dialog: {
                company: '',
                codeNomber: '',
                name: ''
            },
            multipleSelection: [],
            headtype: '1',
            handletype: '', //维修类型
            visibleSub: 'block',
            replycon: '',
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    mounted() {
        //获取付息方式数据
        var form = new FormData();
        form.append('page', this.pageNum);
        form.append('size', this.pageSize);
        this.$api.task.findPayInterestMethodPage(form).then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                let tableDataArr=returndata.rows;
                for(var i =0;i<tableDataArr.length;i++){
                    if(tableDataArr[i].status === 1){
                        tableDataArr[i].statusString="暂存";
                    }else if(tableDataArr[i].status === 2){
                        tableDataArr[i].statusString="提交";
                    }else if(tableDataArr[i].status === 3){
                        tableDataArr[i].statusString="有效";
                    }else {
                        tableDataArr[i].statusString="作废";
                    }
                }
                this.tableData = tableDataArr;
                this.total = returndata.total;
            } else {
                this.$message.success('没有查到数据!');
            }
        });
    },
    methods: {
        // 搜索按钮
        onHandleSearch() {
            var form = new FormData();
            form.append('page', this.pageNum);
            form.append('size', this.pageSize);
            let compV  = this.formInline.searchName;
            if(compV ==="001"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('name', this.formInline.searchValue); 
                }
            }else if(compV ==="002"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('code', this.formInline.searchValue);
                }
            }else if(compV ==="003"){
                let valueS=this.formInline.serchcompany;
                if(valueS && valueS!=''){
                    form.append('company', this.formInline.serchcompany);
                }
            }else{
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('name', this.formInline.searchValue); 
                }
            }
            this.$api.task.findPayInterestMethodPage(form).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            }); 
        },
        onHandleMoreSearch() {
            var form = new FormData();
            form.append('page', this.pageNum);
            form.append('size', this.pageSize);
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                form.append('name', this.dialog.name); 
            }
            let codevalueS=this.dialog.codeNomber;
            if(codevalueS && codevalueS!=''){
                form.append('code', this.dialog.codeNomber);
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                form.append('company', this.dialog.company);
            }
            this.$api.task.findPayInterestMethodPage(form).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                    this.MoreSearchVisible = false;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {
            var form = new FormData();
            form.append('page', val);
            form.append('size', this.pageSize);
            this.$api.task.findPayInterestMethodPage(form).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        // 新建
        onRowAddButtonClick() {
            this.NewEditVisible= true;
            this.showCheckBox= true;
            this.disabled = false;
            this.editabled=true;
            this.saveflage='New';
            this.formdata.company='';
            this.formdata.code='';
            this.formdata.remark='';
            this.formdata.name='';
            this.checked=false;
        },
        // 查看
        onRowLookButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    let formDataA ={};
                    formDataA.id=selectOption[0].id;
                    this.$api.task.getPayInterestMethodVO(formDataA).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            let tableDataArr=returndata.data;
                            this.disabled = true;
                            this.editabled=false;
                            this.formdata=tableDataArr;
                            this.saveflage='Look';
                            this.NewEditVisible= true;
                            this.showCheckBox= false;
                            this.checked=false;
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //修改
        onRowUpdateButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    let formDataA ={};
                    formDataA.id=selectOption[0].id;
                    this.$api.task.getPayInterestMethodVO(formDataA).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            let tableDataArr=returndata.data;
                            this.NewEditVisible= true;
                            this.showCheckBox= false;
                            this.disabled = false;
                            this.editabled=true;
                            this.formdata=tableDataArr;
                            this.checked=false;
                            this.saveflage='Update';
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //删除
        onRowRemoveButtonClick(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    let messageStr="确认删除 "+selectOption[0].code+":"+selectOption[0].name+"?";
                    let tital="删除付息方式";
                    this.$Uconfirm(tital,messageStr).then(() => {
                        let formDataA ={};
                        formDataA.id=selectOption[0].id;
                        this.$api.task.deletePayInterestMethodVO(formDataA).then(response => {
                            this.$message.success('删除成功!');
                            this.reload();
                        });
                    }).catch(() => {
                        this.$message.success('取消删除!');
                    });
                }
            }else{
                this.$message.error('请选择一行你要删除的数据!');
            }
        },
        //提交确认
        saveNewAndEdit(){
            let editflag= this.editabled;
            let savreFlag=true;
            if(editflag){
              let companyS= this.formdata.company;
              if(companyS== ''){
                savreFlag=false;
                this.$message.error('请选择公司!');
              }
              let codeS= this.formdata.code;
              let nameS= this.formdata.name;
              let remarkS= this.formdata.remark;
              let fromObj={};
              let saceFlage=this.saveflage;
              if(saceFlage === 'Update'){
                let selectOption= this.multipleSelection;
                fromObj.id=selectOption[0].id;
              }
              fromObj.company=companyS;
              fromObj.creator=localStorage.getItem('ms_userId');
              fromObj.code=codeS;
              fromObj.name=nameS;
              fromObj.remark=remarkS;
              let checkedS=this.checked;
              let messageStr=codeS+":"+nameS+"?";
              let tital="提交确认:";
              if(savreFlag){
                  this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.savePayInterestMethodVO(fromObj).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            let tableDataArr=returndata.data;
                            this.NewEditVisible= false;
                            if(checkedS ===true){
                                this.onRowAddButtonClick();
                            }else{
                                this.reload();
                            }
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }).catch(() => {
                    this.$message.success('取消提交!');
                });
              }
            }else{
              this.NewEditVisible= false;  
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
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