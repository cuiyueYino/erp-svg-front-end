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
                        <el-col :span="10">
                            <el-form-item label="显示顺序" prop="orderNum">
                                <el-input v-model="formdata.orderNum" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="菜单类型" prop="menuType">
                                <el-select v-model="formdata.menuType" value-key="value" clearable>
                                    <el-option
                                        v-for="item in menuData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="业务活动">
                                <el-input v-model="formdata.activityName" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchCSCSubject(formdata)"></el-button>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="是否可见">
                                <el-checkbox v-model="formdata.visible"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="链接">
                                <el-input type="textarea" v-model="formdata.pictureUrl" :rows="1" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.remark" maxlength="250" :rows="3" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onHandleSave">保存</el-button>
            </span>
        </el-dialog>
        <busActpage  :rowBAtype="rowBAtype" :rowBADataObj="rowBADataObj" @changeShow="showAddBusAct"/>
    </div>
</template>
<script>
import busActpage from './business-activities.vue'
export default {
    props: {
        rowNMMDataObj:Object,
        rowNMMtype: Boolean
    },
    components: {
      busActpage,
    },
    inject: ['reload'],
    data(){
        return{
            ShowFinancVisible:false,
            rowBAtype:false,
            rowBADataObj:{},
            formdata:{
                visible:false,
            },
            checked:false,
            title:'',
            menuData:[
                {
                    value: 0,
                    label: '--请选择--'
                },
                {
                    value: 1,
                    label: '菜单'
                },
                {
                    value: 2,
                    label: '菜单项'
                },
            ],
            labelPosition: 'left',
            rules: {
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                orderNum:[{ required: true, message: '请输入显示顺序', trigger: 'blur' }],
                menuType:[{ required: true, message: '请输入菜单类型', trigger: 'change' }],
            },
            NewOrEditFlag:'',
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        MoreSearchCSCSubject(){
            this.rowBAtype = true;
            let finandata={};
            finandata.finanrowname="业务活动查询方案_不带工作类型";
            finandata.finanrowId="E10704181645156201";
            finandata.nametitle="菜单管理";
            this.rowBADataObj=finandata;
        },
        onHandleSave(){
            let fromDataS={};
            fromDataS=this.formdata;
            let SaveFlag=false;
            if(this.formdata.code){
                fromDataS.code=this.formdata.code;
                SaveFlag=true;
            }else{
                this.$message.error('请输入编号!');
                SaveFlag=false;
                return;
            }
            if(this.formdata.name){
                fromDataS.name=this.formdata.name;
                SaveFlag=true;
            }else{
                this.$message.error('请输入名称!');
                SaveFlag=false;
                return;
            }
            if(this.formdata.orderNum){
                SaveFlag=true;
            }else{
                this.$message.error('请输入显示顺序!');
                SaveFlag=false;
                return;
            }
            if(this.formdata.menuType){
                SaveFlag=true;
            }else{
                this.$message.error('请选择菜单类型!');
                SaveFlag=false;
                return;
            }
            if(this.NewOrEditFlag==="NEW"){
                fromDataS.creator=localStorage.getItem('ms_userId');
            }else{
                fromDataS.handler=localStorage.getItem('ms_userId');
            }
            if(this.formdata.activityName){  
            }else{
                fromDataS.activityId='';
            }
            if(SaveFlag){
                if(this.NewOrEditFlag==="NEW"){
                    this.saveNewMenu(fromDataS);
                }else{
                    this.saveEditmenu(fromDataS);
                }
            }
        },
        //查询业务活动返回处理
        showAddBusAct(data,type){
            if(type === false){
                this.rowBAtype = false
            }else{
                this.rowBAtype = true
            }
            if(data.selectBADataObj){
                this.formdata.activityName=data.selectBADataObj.fname;
                this.formdata.activityId=data.selectBADataObj.foid;
            }
        },
        //根据ID查询菜单
        getMenuByIDFunction(data){
            let formDataA =data;
            this.$api.SystemSet.getMenuById(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.formdata = tableDataArr;
                } else {
                    this.$message.success('查询失败!');
                }
            })
        },
        //新建menu提交
        saveNewMenu(data){
            let formDataA =data;
            this.$api.SystemSet.insertMenuModel(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data=="success") {
                    this.$message.success('新建成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false);
                    //this.reload();
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        },
        //修改menu提交
        saveEditmenu(data){
            let formDataA =data;
            this.$api.SystemSet.updateMenuModel(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data=="success") {
                    this.$message.success('修改成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false);
                    //this.reload();
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        }
    },
    watch:{
        rowNMMtype(oldVal,newVal){
            if(this.rowNMMtype){
                this.ShowFinancVisible=this.rowNMMtype;
                this.title=this.rowNMMDataObj.nametitle;
                this.NewOrEditFlag=this.rowNMMDataObj.NewOrEditFlag;
                if(this.rowNMMDataObj.NewOrEditFlag==="NEW"){
                    this.formdata={};
                    this.formdata.company=this.rowNMMDataObj.company;
                    this.formdata.parentId=this.rowNMMDataObj.parentId;
                    this.formdata.strutid=this.rowNMMDataObj.strutid;   
                }else{
                    let fromdataA={};
                    fromdataA.id=this.rowNMMDataObj.MenuID;
                    this.getMenuByIDFunction(fromdataA);
                }
            }
        }
    }
}
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