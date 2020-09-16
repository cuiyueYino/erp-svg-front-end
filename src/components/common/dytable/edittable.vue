<template>
    <div>
        <div style="width:200px;height:40px;float:right;">
            <el-button style="margin-left:50px;magin-right:5px;" @click.prevent="addRow()" type="primary"  icon="el-icon-folder-add" size="small">新增</el-button>
            <el-button @click.prevent="delRowData()" type="primary"  icon="el-icon-delete" size="small">删除</el-button>
        </div>
        <div>
            <el-table
                :data="tableSData"
                v-loading="false"
                size="mini"
                ref="table"
                @selection-change="onSelectionChange"
                element-loading-text="加载中"
            > 
                <template v-for="(column) in columns">
                    <el-table-column 
                        v-if="column.type && column.type=='selection'" 
                        :type="column.type" 
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key"  
                        :width="column.width==undefined?'45px':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                    </el-table-column>
                    <el-table-column 
                        v-else-if="column.type && column.type=='index'" 
                        :type="column.type" 
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key"
                        :width="column.width==undefined?'80px':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key"  
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--普通input 输入框列-->
                        <template slot-scope="scope" >
                            <el-input
                                size="mini"
                                placeholder="请输入内容"
                                :disabled="column.disabled?column.disabled:false"
                                v-model="scope.row[column.key]">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-number')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--普通input 输入框列-->
                        <template slot-scope="scope" >
                            <el-input
                                size="mini"
                                placeholder="0"
                                :disabled="column.disabled?column.disabled:false"
                                v-model="scope.row[column.key]">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-change')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--带改变事件的input 输入框列-->
                        <template slot-scope="scope"   >
                            <el-input
                                size="mini"
                                placeholder="请输入内容"
                                @change="editInput(column.key,scope.row)"
                                v-model="scope.row[column.key]">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-only-number')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--只能输入数字input 输入框列-->
                        <template slot-scope="scope"   >
                            <el-input
                                size="mini"
                                placeholder="请输入内容"
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                                v-model="scope.row[column.key]">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-button')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--带查询功能的input 输入框列-->
                        <template slot-scope="scope" >
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="scope.row[column.key]" placeholder="请输入内容" size="mini" style="padding:5px" :disabled="column.disabled?column.disabled:false"></el-input>
                                </el-col>
                                <el-col :span="2" style="padding:5px">
                                    <el-button type="primary"  icon="el-icon-search" :disabled="column.searchdisabled?column.searchdisabled:false" size="mini" @click="MoreSearchVisible(column.key,scope.row)"></el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-search-number')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--只能输入数字的带查询的input 输入框列-->
                        <template slot-scope="scope" >
                            <el-row>
                                <el-col :span="16">
                                    <el-input v-model="scope.row[column.key]" oninput="value=value.replace(/[^0-9.]/g,'')" placeholder="0.00" size="mini" style="padding:5px" :disabled="column.disabled?column.disabled:false"></el-input>
                                </el-col>
                                <el-col :span="2" style="padding:5px">
                                    <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchVisible(column.key,scope.row)"></el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='input-change-number')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--只能输入数字的带改变事件的input 输入框列
                        <template slot-scope="scope"  >
                            <el-input v-model="scope.row[column.key]" 
                                @change="editInput(column.key,scope.row)" 
                                oninput="value=value.replace(/[^0-9.]/g,'')" 
                                placeholder="0.00"
                                size="mini" 
                                style="padding:5px"
                                :disabled="(scope.row.CreateOrSearchFlag==='New' && UpdCchecked.checkedFlag===true && UpdCchecked.filedname===column.key)?false:column.disabled">
                            </el-input>
                        </template>-->
                        <template slot-scope="scope"  >
                            <el-input v-model="scope.row[column.key]" 
                                @change="editInput(column.key,scope.row)" 
                                oninput="value=value.replace(/[^0-9.]/g,'')" 
                                placeholder="0.00"
                                size="mini" 
                                style="padding:5px"
                                :disabled="column.disabled?column.disabled:false">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='select')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--select框列-->
                        <template slot-scope="scope"   >
                            <el-select 
                                size="mini"
                                v-model="scope.row[column.key]"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in column.editSelOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-else-if="(column.type && column.type=='select-change')"
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key"  
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <!--带改变事件的select框列-->
                        <template slot-scope="scope"   >
                            <el-select 
                                size="mini"
                                @change="editselect(column.key,scope.row)"
                                v-model="scope.row[column.key]"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in column.editSelOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <!--正常输出字符-->
                    <el-table-column 
                        v-else-if="!column.type" 
                        :type="column.type" 
                        :key="column.key" 
                        align="center"
                        size="mini"
                        :label="column.title"
                        :prop="column.key" 
                        :width="column.width==undefined?'auto':column.width"
                        :sortable="column.sortable?'custom':false" 
                        :fixed="column.fixed">
                        <template slot-scope="scope">
                            <div
                                :style="column.style" 
                                :class="column.tooltip?'btable-tooltip':''"> 
                                {{ column.format?fmtMoney(scope.row[column.key]):scope.row[column.key] }}
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <div class="pagination" v-if="tableSData.length >0 && isShowPager">
                <el-pagination
                    :total="total"
                    background
                    layout="prev, pager, next,jumper,total"
                    :page-size="pageSize"
                    :page-sizes="pageSizes"
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                    :current-page="currentPage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { sortby,fmoney } from './ustil'
export default {
    props: {
        columns: Array,
        tableRowClassName: null,
        defaultsort: null,
        // 查询结果数据
        tableSData: {
            type: Array,
            required: true
        },
        // 是否显示pager组件
        isShowPager: {
            type: Boolean,
            default: true
        },
        rowDataObj:{
            type:Object,
            default:true
        },
        UpdCchecked: {
            type: Object,
            required: true
        },
        // 查询结果总数量
        total: null,
        oprStatus: {
            type: Number,
            default: 1
        },
        // 当前显示页号
        pageNum: {
            type: Number,
            default: 1
        },
        // 当前每页显示数据数量
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            pageSizes: [10, 20, 50, 100],
            selectFacilitylistRow:[],
            rowUpdate:[]
        };
    },
    created() {
        let targetInstance = window;
        if (window.top !== targetInstance) {
            targetInstance = window.top;
        }
        if (targetInstance.dynamicTablePageSizes && typeof targetInstance.dynamicTablePageSizes === 'string') {
            this.pageSizes = targetInstance.dynamicTablePageSizes.split(',');
        }
    },
    methods:{
        fmtMoney(val){//格式化金额
            return fmoney(val);
        },
        sort_change(col){//排序
            this.tableSData.sort(sortby(col.prop,'',col.order));
        },
        // 增加行
        addRow () {
            this.$emit('add-row-change', this.tableSData);
        },
        // 删除选中行
        delRowData () {
            // 删除完数据之后清除勾选框
            this.$emit('del-row-change', this.selectFacilitylistRow,this.tableSData);
            this.$refs.table.clearSelection();
        },
        /**
         * 当前页号变更事件处理
         * @event
         * @param {Number} val 变更后的页号
         */
        onCurrentChange(val) {
            this.$emit('current-change', val);
        },
        /**
         * 当前表格数据显示数量变更事件处理
         * @event
         * @param {Number} val 变更后的表格数据显示数量
         */
        onSizeChange(val) {
            this.$emit('size-change', val);
        },
        /**
         * 选择项发生变化时事件处理
         * @event
         * @param {Array} val 当前的选择项
         */
        onSelectionChange(val) {
            this.selectFacilitylistRow= val;
            this.$emit('selection-change', val);
        },
        //表格内输入框编辑触发
        editInput(key,row){
            let data = this.tableSData;
            this.$emit('Row-input',key,row,data);
        },
        //下拉框
        editselect(key,row){
            this.$emit('Row-select',key,row);
        },
        //查询
        MoreSearchVisible(key,row){
            this.$emit('More-Search',key,row);
        },
    },
    watch:{
        tableSData(oldVal,newVal){
            this.$emit('Udate-Files',oldVal,newVal);
        }
    }
}
</script>
<style lang="scss" scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
.rgb196{
  background: #f4984e;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>