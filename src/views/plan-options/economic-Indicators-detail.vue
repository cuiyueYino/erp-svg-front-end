<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：" prop="company">
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
                    <el-form-item label="单据号：">
                        <el-input v-model="formdata.voucherId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：" >
                        <el-input v-model="formdata.year" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份：">
                        <el-input v-model="formdata.month" :disabled="true"></el-input>
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
                    <el-form-item label="经办日期：">
                        <el-input v-model="formdata.voucherDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="当月比例(%)：" >
                        <el-input v-model="formdata.monthRate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22"> 
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
              </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEconomicIndicatorsDataObj: Object,
        rowEconomicIndicatorstype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            itemOptions:['集团重点','公司重点','部门重点'],
            focusLevelCheckList:[],
            ShowFinancVisible:false,
            labelPosition: 'left',
            formdata:{
                companyName:'',
                voucherId:'',
                year:'',
                month:'',
                gestorName:'',
                voucherDate:'',
                monthRate:'',
            },
            companyData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            tableData:[],
            columns:[
                {
                    key: 'companyName',
                    title: '名称' 
                },
                {
                    key: 'indexRatio',
                    title: '比例(%)'
                },
            ],
        }
    },
    created() {
       
    },
    methods: {
    //获取临时任务派发详情
    getEconomicIndicatorsDetail(data) {
      this.$api.processSet.getEconomicIndicatorsDetail({
          id: data.id,
      })
      .then((res) => {
            if(res.data.code == 0){
              this.formdata = res.data.data;
              this.tableData = res.data.data.optionIndexLine;
            }
        }),error => {
          console.log(error);
        }
    },
    },
    watch:{
        rowEconomicIndicatorstype(oldVal){
            this.ShowFinancVisible=this.rowEconomicIndicatorstype;
            let economicIndicatorsSelected = {};
            economicIndicatorsSelected.id = this.rowEconomicIndicatorsDataObj;
            this.getEconomicIndicatorsDetail(economicIndicatorsSelected);
            },
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
