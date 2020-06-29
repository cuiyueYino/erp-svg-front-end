<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
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
                            <el-form-item label="编码">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="名称">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="角色类别">
                                <el-input v-model="formdata.voucherid" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchCSCSubject(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.purpose" :rows="2" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName">
                        <el-tab-pane label="业务权限" name="first">
                            <el-row>
                                <el-col :span="11">
                                    <el-form-item label="公司" prop="company">
                                        <el-select v-model="formdata.company" @change="CompanyChange" value-key="value" >
                                            <el-option
                                                v-for="item in companyoptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
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
                                        :default-expanded-keys="checkdata"
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
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSave">保存</el-button>
            </span>
        </el-dialog>
        <RMDmaintenpage  :rowRMDtype="rowRMDtype" :rowRMDDataObj="rowRMDDataObj" @changeShow="showMoreRMD"/>
    </div>
</template>
<script>
import RMDmaintenpage from './role-maintenance-detail.vue'
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
            checkdata:['duties03','duties02'],
            rowRMDDataObj:{},
            title:'',
            formdata:{

            },
            labelPosition: 'left',
            atctiveName:'first',
            companyoptions:[
                {
                    value: '_DefaultCompanyOId',
                    label: '福佳集团'
                },
                {
                    value: 'BFPID000000LQX0036',
                    label: '福邦资本控股有限公司'
                },
                {
                    value: 'BFPID000000LQX003T',
                    label: '大连中佳银行（筹备期）股份有限公司'
                },
                {
                    value: 'BFPID000000LQX004G',
                    label: '富佳开发有限公司'
                },
                {
                    value: 'BFPID000000LQX0053',
                    label: '博尔特大酒店'
                },
            ],
            treeData:[
                {
                    label: '角色类别',
                    id:'company01',
                    type:'company',
                    children: [
                        {
                            label: '个人事务角色',
                            id:'duties03',
                            type:'duties',  
                        },
                        {
                            label: '公司架构角色-财务',
                            id:'department01',
                            type:'department',
                            children: [
                                {
                                label: '石化财务',
                                id:'duties01',
                                type:'duties',
                                },
                                {
                                label: '收费员',
                                id:'duties02',
                                type:'duties',
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            rules: {
                creditcontractName:[{ required: true, message: '请选择综合授信合同', trigger: 'blur' }],
                adjustdate:[{ required: true, message: '请选择调整日期', trigger: 'blur' }],
                awardamount:[{ required: true, message: '请输入授信额度', trigger: 'blur' }],
            }
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowNRMDataObj,false);
        },
        MoreSearchCSCSubject(data){
            this.rowRMDtype = true;
            let finandata=data;
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            this.rowRMDDataObj=finandata;
        },
        CompanyChange(event) {
            console.log(event)
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.type =="company"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="department"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="duties"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.type;
        },
        //获取选中的树节点数据
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        //角色查询返回值处理
        showMoreRMD(data,type){
            if(type === false){
                this.rowRMDtype = false
            }else{
                this.rowRMDtype = true
            }
        },
        onHandleSave(){
          this.$emit('changeShow',this.rowNRMDataObj,false);  
        }
    },
    watch:{
        rowNRMtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowNRMtype;
            this.title=this.rowNRMDataObj.nametitle;
        }
    }
}
</script>
<style lang="scss" scoped>
.treeStyle{
    width: 100%;
    height:400px;
    overflow-y: auto;
}
</style>