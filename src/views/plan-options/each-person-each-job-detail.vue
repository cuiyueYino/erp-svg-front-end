<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
             :disabled="!disFlag"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.companyName" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.departmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="岗位：">
                        <el-input v-model="formdata.positionName"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.versionName"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.gestorName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间：">
                        <el-input v-model="formdata.voucherDate"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本号：">
                        <el-input v-model="formdata.versionNumber"  :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="一岗一表行" name="first">
                    <dynamic-table
                        :columns="columns"
                        :table-data="tableData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"    
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-tab-pane>
                <el-tab-pane label="公司指标" name="second">
                    <dynamic-table
                        :columns="comIndicatorsColumns"
                        :table-data="comIndicatorsData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"    
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-tab-pane>
                    <el-tab-pane label="附件" name="third">
                    <enclosureFile ref="child" :enclosureConfig="enclosureConfig"/>
                </el-tab-pane>
            </el-tabs> 
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
import enclosureFile from '../inside-mail/enclosure-file.vue';
export default {
    props: {
        rowEACHPerEachJobDetDataObj: "",
        rowEACHPerEachJobDettype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
        enclosureFile
    },
    data(){
        return{
            // 附件
            enclosureConfig:{
                voucherId: '',
                isShowButton: false,
                menuCode: 'insideMail',
                isDownload:true,
                isSearch:false,
                haveAttachment:false,
                authStatus:false
            },
            isDeartPopVisible:false,
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            disabled:false,
            labelPosition: 'left',
            formdata:{
                companyName:'',
                departmentName:'',
                positionName:'',
                versionName:'',
                gestorName:'',
                voucherDate:'',
                versionNumber:''
            },
            companyData:[],
            yearsData:[],
            monthData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                // {
                //     type: "selection",
                // },
                {
                    key: 'index',
                    title: '序号'
                },
                {
                    key: 'indexLibraryName',
                    title: '指标库'
                },
                {
                    key: 'kpisName',
                    title: '关键指标'
                },
                {
                    key: 'sonKpisName',
                    title: '子指标'
                },
                {
                    key: 'definition',
                    title: '指标定义'
                },
                {
                    key: 'weights',
                    title: '指标权重'
                },
                {
                    key: 'evalueationMethed',
                    title: '考评方法'
                },
                {
                    key: 'remark',
                    title: '备注'
                },
            ],
            comIndicatorsColumns:[
                // {
                //     type: "selection"
                // },
                {
                    key: 'num',
                    title: '序号'
                },
                {
                    key: 'companyName',
                    title: '公司'
                },
                {
                    key: 'departmentName',
                    title: '部门'
                },
                {
                    key: 'weights',
                    title: '权重'
                },
                {
                    key: 'remark',
                    title: '备注'
                },
            ],
            attachColumns:[
                {
                    key: 'i',
                    title: '序号'
                },
                {
                    key: 'name',
                    title: '名称'
                },
            ],
            tableData:[],
            comIndicatorsData:[],
            attachData:[],
        }
    },
    methods: {
        handleClick() {
            
        },
        //获取一岗一表详情
        getPostBidMission(data) {
        this.$api.processSet.getPostBidDetail({
            id: data.id,
            userId:data.userId,
            xiuding:data.xiuding,
        })
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;
                var tableDataObj = res.data.data.lines;
                var comIndicatorsDataObj = res.data.data.companyLines;
                for(var i=0;i<tableDataObj.length;i++){
                    tableDataObj[i]['index'] = i+1;
                }
                for(var i=0;i<comIndicatorsDataObj.length;i++){
                    comIndicatorsDataObj[i]['num'] = i+1;
                }
                this.tableData = tableDataObj;
                this.comIndicatorsData = comIndicatorsDataObj;
                this.enclosureConfig.voucherId = data.id;
                }
            }),error => {
            console.log(error);
            }
        },
    },
    watch:{
        rowEACHPerEachJobDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEACHPerEachJobDettype;
            let postBidSelected = {};
            postBidSelected.id = this.rowEACHPerEachJobDetDataObj;
            postBidSelected.userId = localStorage.getItem("ms_userId");
            postBidSelected.xiuding = false;
            this.getPostBidMission(postBidSelected);
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
