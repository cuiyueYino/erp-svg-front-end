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
                            <el-form-item label="显示顺序">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="菜单类型">
                                <el-select v-model="formdata.company" clearable>
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
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchCSCSubject(formdata)"></el-button>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="是否可见">
                                <el-checkbox v-model="checked"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="链接">
                                <el-input type="textarea" v-model="formdata.purpose" :rows="1" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="显示位置">
                                <el-select v-model="formdata.company" clearable>
                                    <el-option
                                        v-for="item in positionData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="提示">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="图标">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.purpose" :rows="3" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
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
    data(){
        return{
            ShowFinancVisible:false,
            rowBAtype:false,
            rowBADataObj:{},
            formdata:{

            },
            checked:false,
            title:'',
            menuData:[
                {
                    value: '',
                    label: '--请选择--'
                },
                {
                    value: '1',
                    label: '菜单'
                },
                {
                    value: '2',
                    label: '菜单项'
                },
            ],
            positionData:[
                {
                    value: '',
                    label: '--请选择--'
                },
                {
                    value: '1',
                    label: '缺省'
                },
                {
                    value: '2',
                    label: '新窗口'
                },
                {
                    value: '3',
                    label: '顶层窗口'
                },
            ],
            labelPosition: 'left',
            rules: {
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
            }
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowNRMDataObj,false);
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
          this.$emit('changeShow',this.rowNRMDataObj,false);  
        },
        showAddBusAct(data,type){
            if(type === false){
                this.rowBAtype = false
            }else{
                this.rowBAtype = true
            }
        }
    },
    watch:{
        rowNMMtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowNMMtype;
            this.title=this.rowNMMDataObj.nametitle;
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