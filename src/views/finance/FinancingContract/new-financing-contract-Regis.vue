<template>
    <div>
        <el-dialog title="综合授信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="70%">
            <el-form
                label-width="110px"
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
                        <el-col :span="10" :offset="3">
                            <el-form-item >
                                <el-checkbox v-model="checked">连续追加</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信合同编码" prop="code">
                                <el-input v-model="formdata.contractcode" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同名称">
                                <el-input v-model="formdata.contractname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="授信主体" prop="code">
                                <el-input v-model="formdata.parta" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" icon="el-icon-search" @click="MoreSearchcreditSubject"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信额度" prop="code">
                                <el-input v-model="formdata.awardamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信品种">
                                <el-input v-model="formdata.awardcreditbreed" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="授信银行" prop="code">
                                <el-input v-model="formdata.awardbankName" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" icon="el-icon-search" @click="MoreSearchBankVisible(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信调整额度">
                                <el-input v-model="formdata.awardadjamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信占用">
                                <el-input v-model="formdata.awardoccupy" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信天数" prop="code">
                                <el-input v-model="formdata.awarddays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="授信可用额度">
                                <el-input v-model="formdata.awardableamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.awardover" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信起始日" prop="code">
                                <el-input v-model="formdata.startdate" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="授信到期日" prop="name">
                                <el-input v-model="formdata.enddate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="剩余天数">
                                <el-input v-model="formdata.overdays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办人">
                                <el-input v-model="formdata.handler" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="经办时间" prop="name">
                                <el-input v-model="formdata.voucherdate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办部门">
                                <el-input v-model="formdata.gestordept" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="项目描述">
                                <el-input type="textarea" v-model="formdata.remark" :rows="8" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName">
                        <el-tab-pane label="授信品种管理" name="first">
                            <template>
                                <div>
                                    <div style="width:200px;height:40px;float:right;">
                                        <el-button size="small" style="margin-left:50px;magin-right:5px;" @click.prevent="addFacilityRow()">新增</el-button>
                                        <el-button size="small" @click.prevent="delFacilityData()">删除</el-button>
                                    </div>
                                    <div>
                                        <el-table
                                            :data="RegistrationtableData"
                                            ref="table"
                                            size="mini"
                                            tooltip-effect="dark"
                                            border
                                            stripe
                                            style="width:100%;"
                                            @selection-change='selectFacilityRow'>
                                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                                            <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
                                            <el-table-column  label="授信品种" align="center">
                                                <template slot-scope="scope">
                                                    <el-row>
                                                        <el-col :span="16">
                                                            <el-input v-model="scope.row.awardcreditbreedName" style="padding:5px"></el-input>
                                                        </el-col>
                                                        <el-col :span="2" style="padding:5px">
                                                            <el-button type="primary"  icon="el-icon-search" @click="MoreSearchTypeVisible(scope.row)"></el-button>
                                                        </el-col>
                                                    </el-row>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="授信额度" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardamount" placeholder="0.00"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="授信可用额度" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardableamount" placeholder="0.00" disabled></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="授信调整额度" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardadjamount" placeholder="0.00" disabled></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="授信占用" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardoccupy" placeholder="0.00" disabled></el-input>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <template>
                                <div>
                                    <div style="width:200px;height:40px;float:right;">
                                        <el-button size="small" style="margin-left:50px;magin-right:5px;" @click.prevent="addRow()">新增</el-button>
                                        <el-button size="small" @click.prevent="delData()">删除</el-button>
                                    </div>
                                    <div>
                                        <el-table
                                            :data="enclosuretableData"
                                            ref="table"
                                            size="mini"
                                            tooltip-effect="dark"
                                            border
                                            stripe
                                            style="width:100%;"
                                            @selection-change='selectRow'>
                                            <el-table-column type="selection" width="45" align="center"></el-table-column>
                                            <el-table-column label="文件类型" width="150px">
                                                <template slot-scope="scope">
                                                   <el-select v-model="scope.row.filestyle" value-key="value" v-bind:disabled="disabled">
                                                        <el-option
                                                            v-for="item in filestyleoptions"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                        ></el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column  label="文件" align="center" width="230px">
                                                <template slot-scope="scope">
                                                    <el-row>
                                                        <el-col :span="16">
                                                            <el-input v-model="scope.row.awardcreditbreed" style="padding:5px"></el-input>
                                                        </el-col>
                                                        <el-col :span="2" style="padding:5px">
                                                            <el-button type="primary"  icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                                                        </el-col>
                                                    </el-row>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="必须" >
                                                <template slot-scope="scope">
                                                    <el-checkbox v-model="scope.row.filechecked"></el-checkbox>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="编制单位" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardableamount"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="负责人" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardableamount"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="审核单位" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardableamount"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="审核人" >
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.awardableamount"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="定版日期" width="250px">
                                                <template slot-scope="scope">
                                                    <el-date-picker
                                                        v-model="scope.row.value1"
                                                        type="date"
                                                        placeholder="选择日期">
                                                    </el-date-picker>
                                                </template>
                                            </el-table-column>
                                            <el-table-column  label="文档密级" align="center" width="220px">
                                                <template slot-scope="scope">
                                                    <el-row>
                                                        <el-col :span="16">
                                                            <el-input v-model="scope.row.awardcreditbreed" style="padding:5px"></el-input>
                                                        </el-col>
                                                        <el-col :span="2" style="padding:5px">
                                                            <el-button type="primary"  icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                                                        </el-col>
                                                    </el-row>
                                                </template>
                                            </el-table-column>
                                            <el-table-column  label="保管期限" align="center" width="220px">
                                                <template slot-scope="scope">
                                                    <el-row>
                                                        <el-col :span="16">
                                                            <el-input v-model="scope.row.awardcreditbreed" style="padding:5px"></el-input>
                                                        </el-col>
                                                        <el-col :span="2" style="padding:5px">
                                                            <el-button type="primary"  icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                                                        </el-col>
                                                    </el-row>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="备注" width="230px">
                                                <template slot-scope="scope">
                                                    <el-input type="textarea" class="remark" v-model="scope.row.remark"></el-input>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                    <dynamic-table
                        :columns="processcolumns"
                        :table-data="processtableData"
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditFinancVisible = false">查看流程图</el-button>
                <el-button type="primary" @click="saveNewAndEdit">提交</el-button>
                <el-button @click="ShowFinancVisible = false">暂存</el-button>
            </span>
        </el-dialog>
        <creditSubjectSearch :rowDataObj="rowDataObj" :financingtype="financingtype" @changeShow="showfinancingData"/>
        <creditBankSearch :rowBankDataObj="rowBankDataObj" :financingBanktype="financingBanktype" @changeShow="showfinancingBankData"/>
        <credittypeSearch :rowTypeDataObj="rowTypeDataObj" :financingTypetype="financingTypetype" @changeShow="showfinancingTypeData"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import creditSubjectSearch from '../credit-subject-search.vue';
import creditBankSearch from '../credit-bank-search.vue';
import credittypeSearch from '../credit-type-search.vue';
export default {
    props: {
        Newfinancingtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creditSubjectSearch,
        creditBankSearch,
        credittypeSearch
    },
    inject: ['reload'],
    data: function() {   
        return {
            sdddd:[],
            rowDataObj:{},
            rowBankDataObj:{},
            rowTypeDataObj:{},
            nametitle:'综合授信合同登记',
            financingtype:false,
            financingBanktype:false,
            financingTypetype:false,
            finanrowId:'',
            finanrowname:'',
            financingformdata:{
                name:'',
                code:''
            },
            financingBankformdata:{
                name:'',
                code:''
            },
            financingTypeformdata:{
                name:'',
                code:''
            },
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            checked:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rowNum: 1,
            selectlistRow:[],
            rowFacilityNum: 0,
            selectFacilitylistRow:[],
            companyoptions:new proData().company,
            objectoptions:new proData().project,
            filestyleoptions:new proData().filestyle,
            formdata: {
                company: '',
                objectName:'',
                code: '',
                remark: '',
                name: ''
            },
            Registrationcolumns:[
                {
                    key: 'Cnumber',
                    title: '序号'
                },
                {
                    key: 'awardcreditbreedName',
                    title: '授信品种'
                },
                {
                    key: 'awardamount',
                    title: '授信额度'
                },
                {
                    key: 'awardableamount',
                    title: '授信可用额度'
                },
                {
                    key: 'awardadjamount',
                    title: '授信调整额度'
                },
                {
                    key: 'awardoccupy',
                    title: '授信占用'
                },
            ],
            enclosurecolumns:[
                {
                    key: 'Cnumber',
                    title: '文件类型'
                },
                {
                    key: 'Cnumber',
                    title: '文件'
                },
                {
                    key: 'Cnumber',
                    type: 'selection',
                    title: '必须'
                },
                {
                    key: 'Cnumber',
                    title: '编制单位'
                },
                {
                    key: 'Cnumber',
                    title: '负责人'
                },
                {
                    key: 'Cnumber',
                    title: '审核单位'
                },
                {
                    key: 'Cnumber',
                    title: '审核人'
                },
                {
                    key: 'Cnumber',
                    title: '定版日期'
                },
                {
                    key: 'Cnumber',
                    title: '文档等级'
                },
                {
                    key: 'Cnumber',
                    title: '保管期限'
                },
                {
                    key: 'Cnumber',
                    title: '备注'
                },
            ],
            processcolumns:[
                {
                    key: 'Cnumber',
                    title: '流程节点'
                },
                {
                    key: 'Cnumber',
                    title: '审批人'
                },
                {
                    key: 'Cnumber',
                    title: '审批结论'
                },
                {
                    key: 'Cnumber',
                    title: '审批说明'
                },
                {
                    key: 'Cnumber',
                    title: '审批时间'
                },
                {
                    key: 'Cnumber',
                    title: '标准时间'
                },
                {
                    key: 'Cnumber',
                    title: '耗时'
                },
                {
                    key: 'Cnumber',
                    title: '回复'
                },
                {
                    key: 'Cnumber',
                    title: '纸质签收日期'
                },
            ],
            RegistrationtableData: [],
            enclosuretableData: [],
            processtableData: [],
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    methods: {
        //获取选中的授信行
        selectFacilityRow(val){
            this.selectFacilitylistRow= val;
        },
        // 增加授信行
        addFacilityRow () {
            var list = {
            rowFacilityNum:this.rowFacilityNum,
            Cnumber:this.RegistrationtableData.Cnumber,
            awardamount:this.RegistrationtableData.awardamount,
            awardableamount:this.RegistrationtableData.awardableamount,
            awardadjamount:this.RegistrationtableData.awardadjamount,
            awardoccupy:this.RegistrationtableData.awardoccupy,
            awardcreditbreed:this.RegistrationtableData.awardcreditbreed,
            awardcreditbreedName:this.RegistrationtableData.awardcreditbreedName,
            awardcreditbreedId:this.RegistrationtableData.awardcreditbreedId,
            };
            this.RegistrationtableData.unshift(list)
            this.rowFacilityNum += 1;
        },
        // 删除选中行
        delFacilityData () {
            for (let i = 0; i < this.selectFacilitylistRow.length; i++) {
            let val = this.selectFacilitylistRow
            val.forEach((val, index) => {
                this.RegistrationtableData.forEach((v, i) => {
                if (val.rowFacilityNum === v.rowFacilityNum) {
                    // i 为选中的索引
                    this.RegistrationtableData.splice(i, 1)
                }
                })
            })
            }
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection()
        },
        // 获取附件表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },
        // 增加附件行
        addRow () {
            var list = {
            rowNum:this.rowNum,
            post_id:[],
            require_des: '',
            remark:''
            };
            this.enclosuretableData.unshift(list)
            this.rowNum += 1;
        },
        // 删除选中附件行
        delData () {
            for (let i = 0; i < this.selectlistRow.length; i++) {
            let val = this.selectlistRow;
            val.forEach((val, index) => {
                this.enclosuretableData.forEach((v, i) => {
                if (val.rowNum === v.rowNum) {
                    // i 为选中的索引
                    this.enclosuretableData.splice(i, 1)
                }
                })
            })
            }
            // 删除完数据之后清除勾选框
            this.$refs.table.clearSelection()
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {},
        //提交确认
        saveNewAndEdit(){
            let editflag= this.editabled;
            if(editflag){
              let companyS= this.formdata.company;
              if(companyS== ''){
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
              this.$Uconfirm(tital,messageStr).then(() => {
                this.$api.task.savepledgeTypeVO(fromObj).then(response => {
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
            }else{
              this.NewEditVisible= false;  
            }
        },
        //查询授信主体
        MoreSearchcreditSubject(){
            let finanrwodata={};
            finanrwodata.finanrowname="甲方单位";
            finanrwodata.finanrowId="4E1712231426568201";
            finanrwodata.nametitle="综合授信合同登记";
            this.rowDataObj=finanrwodata;
            this.financingtype=true;
        },
        //获取授信主题数据
        showfinancingData(data,type){
            this.financingformdata=data;
            if(type === false){
                this.financingtype = false
            }else{
                this.financingtype = true
            }
        },
        //查询授信银行
        MoreSearchBankVisible(data){
            let finandata=data;
            finandata.finanrowname="资金类客户缺省查询方案";
            finandata.finanrowId="401901281025522001";
            finandata.nametitle="综合授信合同登记";
            this.rowBankDataObj=finandata;
            this.financingBanktype=true;
        },
        //获取授信银行
        showfinancingBankData(data,type){
            this.financingBankformdata=data;
            if(type === false){
                this.financingBanktype = false
            }else{
                this.financingBanktype = true
            }
        },
        //查询授信品种
        MoreSearchTypeVisible(row){
            let finandata=row;
            finandata.finanrowname="授信品种缺省查询方案";
            finandata.finanrowId="4F1903301337716602";
            finandata.nametitle="综合授信合同登记";
            this.rowTypeDataObj=finandata;
            this.financingTypetype=true;
        },
        //获取授信品种
        showfinancingTypeData(data,type){
            this.financingTypeformdata=data;
            if(type === false){
                this.financingTypetype = false
            }else{
                this.financingTypetype = true
            }
        },
    },
    watch:{
        Newfinancingtype(oldVal,newVal){
            this.ShowFinancVisible=this.Newfinancingtype;
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