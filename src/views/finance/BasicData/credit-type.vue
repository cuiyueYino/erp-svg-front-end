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
                    <el-button class="sky" size="small" icon="el-icon-link" round>删除</el-button>
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
                    <div class="fr"><el-input v-model="formInline.searchValue"></el-input></div>
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
        <el-dialog title="授信品种" :visible.sync="NewEditVisible" :append-to-body="true" v-if="NewEditVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="formdata"
                class="dataForm"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="公司" prop="number">
                            <el-select v-model="formdata.company">
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
                        <el-form-item prop="number" >
                            <el-checkbox v-model="formdata.checked" v-if="showCheckBox">连续追加</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="编码" prop="number">
                            <el-input v-model="formdata.codeNomber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="formdata.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="项目描述">
                            <el-input type="textarea" v-model="formdata.ownertel" :rows="8"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="NewEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="NewEditVisible = false">提交</el-button>
            </span>
        </el-dialog>
        <el-dialog title="授信品种缺省查询方案" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
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
                <el-button type="primary" @click="MoreSearchVisible = false">查询</el-button>
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
    data() {
        return {
            MoreSearchVisible: false,
            NewEditVisible: false,
            showCheckBox: false,
            dialogImageUrl: '',
            dialogVisible: false,
            labelPosition: 'left',
            formInline: {
                searchName: '',
                searchValue: '',
                company:''
            },
            companyoptions: new proData().company,
            companyData:[
                {
                    value: '001',
                    label: '福佳集团'
                },
                {
                    value: '002',
                    label: '芳烃公司'
                }
            ],
            address: [
                {
                    value: '001',
                    label: '编码'
                },
                {
                    value: '002',
                    label: '公司'
                }
            ],
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'state',
                    title: '状态'
                },
                {
                    key: 'codeNomber',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'ownertel',
                    title: '描述'
                }
            ],
            tableData: [
                {
                    state: '家园2-3',
                    codeNomber: '1212121221',
                    name: '王小虎',
                    ownertel: '2016-05-02'
                },
                {
                    state: '家园3',
                    codeNomber: '12121222',
                    name: '张小明',
                    ownertel: '2016-05-02'
                }
            ],
            pageNum: 1,
            pageSize: 2,
            total: 10,
            editVisible: false,
            replyVisible: false,
            formdata: {
                company: '',
                checked: false,
                codeNomber: '',
                ownertel: '',
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
            replycon: ''
        };
    },
    mounted() {},
    methods: {
        // 搜索按钮
        onHandleSearch() {
            console.log('搜索按钮', this.formInline.company);
        },
        onHandleMoreSearch() {
            console.log('高级查询按钮');
        },
        onSelectionChange(val) {
            console.log('多选', val);
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            console.log(val);
            this.pageSize = val;
        },
        onCurrentChange(val) {
            console.log('单选',val);
            this.pageNum = val;
        },
        // 新建
        onRowAddButtonClick(row) {
            console.log(row, '新建');
            this.NewEditVisible= true;
            this.showCheckBox= true;
            this.editVisible = true;
            this.formdata = row;
            this.visibleSub = 'block';
        },
        // 查看
        onRowLookButtonClick(row) {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.NewEditVisible= true;
                    this.showCheckBox= false;
                    this.editVisible = true;
                    this.formdata = row;
                    this.visibleSub = 'none';
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
            console.log(row, '查看');
            console.log(this.tableData);
        },
        //修改
        onRowUpdateButtonClick(row) {
            console.log(row, '修改');
            this.NewEditVisible= true;
            this.showCheckBox= false;
            this.editVisible = true;
            this.formdata = row;
            this.visibleSub = 'block';
        },
        //受理保存
        saveEdit() {
            this.editVisible = false;
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