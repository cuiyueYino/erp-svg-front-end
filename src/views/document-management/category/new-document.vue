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
                ref="formdata"
            >
                <el-card>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="编码" prop="fcode">
                                <el-input v-model="formdata.fcode" :disabled="isEdit" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="名称" prop="fname" >
                                <el-input v-model="formdata.fname" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="文档类别级别">
                                <el-input v-model="formdata.flevel"  :disabled="true" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="显示顺序" prop="forder">
                                <el-input v-model="formdata.forder" @keyup.native="changeForder" :disabled="isEdit" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="是否门户显示">
                                <el-checkbox v-model="formdata.fisportalshow" :disabled="isEdit" ></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述" prop="fdescription">
                                <el-input type="textarea" v-model="formdata.fdescription" :rows="10" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="isShow" @click="handleClose">取 消</el-button>
                <el-button v-if="isShow" @click="submitForm('formdata')">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        rowNMMDataObj:Object,
        rowNMMtype: Boolean
    },
    components: {
    },
    data(){
        return{
            isShow:true,
            isEdit: false,
            ShowFinancVisible:false,
            rowBAtype:false,
            rowBADataObj:{},
            formdata:{
                fisportalshow:false,
            },
            checked:false,
            title:'',
            labelPosition: 'left',
            rules: {
                fcode:[
                        { required: true, message: '请输入编码', trigger: 'blur' },
                        { max: 50, message: "编码最大长度 50 字节", trigger: "blur"},
                        {
                            validator: function(rule, value, callback) {
                            //  校验字母、数字和英文符号的正则
                            if (/^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/.test(value) == false) {
                                callback(new Error("仅支持字母、数字和英文符号"));
                            } else {
                                //校验通过
                                callback();
                            }
                            },
                            trigger: "blur"
                        }
                    ],
                fname:[
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { max: 100, message: "名称最大长度 100 字节", trigger: "blur"}
                    ],
                forder:[{ required: true, message: '请输入显示顺序', trigger: 'blur' },],
                fdescription:[{ max: 3000, message: "描述最大长度 3000 字节", trigger: "blur" }],
            },
            NewOrEditFlag:'',
        }
    },
    methods: {
        //只允许1.录入数字 2.允许输入两位小数
        changeForder () {
            debugger;
            this.formdata.forder = this.formdata.forder.replace(/[^\d.]/g, '');
            if(this.formdata.forder.indexOf(".") != -1){
                let s = this.formdata.forder.substring('.');
                if(s.length > 2){
                    this.formdata.forder = this.formdata.forder.substring(0,this.formdata.forder.indexOf(".") + 3);
                }
            }
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false,1);
        },
        //submit 校验
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.onHandleSave();
            } else {
              // console.log('error submit!!');
              return false;
            }
          });
        },
        //提交
        onHandleSave(){
            let fromDataS={};
            fromDataS=this.formdata;
            let SaveFlag=false;
            if(this.formdata.fcode){
                fromDataS.fcode=this.formdata.fcode;
                SaveFlag=true;
            }else{
                this.$message.error('请输入编码!');
                SaveFlag=false
            }
            if(SaveFlag){
                if(this.formdata.fname){
                    fromDataS.fname=this.formdata.fname;
                    SaveFlag=true;
                }else{
                    this.$message.error('请输入名称!');
                    SaveFlag=false
                }
            }
            if(SaveFlag){
                if(this.formdata.forder){
                    fromDataS.forder=this.formdata.forder;
                    SaveFlag=true;
                }else{
                    this.$message.error('请输入显示顺序!');
                    SaveFlag=false
                }
            }
            if(this.NewOrEditFlag==="NEW"){
                fromDataS.creator=localStorage.getItem('ms_userId');
            }else{
                fromDataS.handler=localStorage.getItem('ms_userId');
            }
            if(SaveFlag){
                if(this.NewOrEditFlag==="NEW"){
                    this.saveNewMenu(fromDataS);
                }else{
                    this.saveEditmenu(fromDataS);
                }
            }

        },
        //根据ID查询文档类别
        findDocCategoryById(data){
            let formDataA =data;
            this.$api.documentManagement.findDocumentCategoryById(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    if(1 == tableDataArr.flevel){
                        tableDataArr.flevel = '一级';
                    } else if(2 == tableDataArr.flevel){
                        tableDataArr.flevel = '二级';
                    }
                    if('是' == tableDataArr.fisportalshow ){
                        tableDataArr.fisportalshow = true;
                    } else {
                        tableDataArr.fisportalshow = false;
                    }
                    this.formdata = tableDataArr;
                } else {
                    this.$message.success('查询失败!');
                }
            })
        },
        //新建文档类别提交
        saveNewMenu(data){
            debugger;
            if(true == data.fisportalshow){
                data.fisportalshow = '1';
            } else {
                data.fisportalshow = '0';
            }
            if('一级' == data.flevel){
                data.flevel = 1;
            } else if('二级' == data.flevel) {
                data.flevel = 2;
            }
            data.fpid = this.rowNMMDataObj.fpid;
            let formDataA =data;
            this.$api.documentManagement.insertDocumentCategory(formDataA).then(response => {
                let responsevalue = response;
                if(responsevalue.data.code != 0){
                    this.$message.success(responsevalue.data.msg);
                    debugger;
                    if( 1 == data.flevel){
                      data.flevel = '一级';
                    } else if(2 == data.flevel) {
                      data.flevel = '二级';
                    }
                } else {
                    if (responsevalue.data.data.msg=="success") {
                        this.$message.success('新建成功!');
                        this.ShowFinancVisible=false;
                        this.$emit('changeShow',false,0);
                    } else {
                        this.$message.error(responsevalue.data.msg);
                    }
                }

            });
        },
        //修改文档类别提交
        saveEditmenu(data){
            let formDataA =data;
            if(true == data.fisportalshow){
                data.fisportalshow = '1';
            } else {
                data.fisportalshow = '0';
            }
            if('一级' == data.flevel){
                data.flevel = 1;
            } else if('二级' == data.flevel) {
                data.flevel = 2;
            }
            this.$api.documentManagement.updateDocumentCategory(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue.data.data.msg=="success") {
                    this.$message.success('修改成功!');
                    this.ShowFinancVisible=false;
                    this.$emit('changeShow',false,0);
                } else {
                    this.$message.error(responsevalue.data.msg);
                }
            });
        }
    },
    watch:{
        rowNMMtype(oldVal,newVal){
            this.isShow = true;
            this.ShowFinancVisible=this.rowNMMtype;
            this.title=this.rowNMMDataObj.nametitle;
            this.NewOrEditFlag=this.rowNMMDataObj.NewOrEditFlag;
            if(this.rowNMMDataObj.NewOrEditFlag==="NEW"){
                this.isEdit = false;
                this.formdata={};
                this.formdata.flevel=this.rowNMMDataObj.flevel;
            } else if (this.rowNMMDataObj.NewOrEditFlag==="EDIT"){
                this.isEdit = false;
                let fromdataA={};
                fromdataA.id=this.rowNMMDataObj.foid;
                this.findDocCategoryById(fromdataA);
            } else if (this.rowNMMDataObj.NewOrEditFlag==="SHOW"){
                this.isShow = false;
                this.isEdit = true;
                let fromdataA={};
                fromdataA.id=this.rowNMMDataObj.foid;
                this.findDocCategoryById(fromdataA);
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
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>
