<template>
    <div>
        <div style="width:200px;height:40px;float:right;">
            <el-button size="small" style="margin-left:50px;magin-right:5px;" @click.prevent="addfileRow()">新增</el-button>
            <el-button size="small" @click.prevent="delfileData()">删除</el-button>
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
                @selection-change='selectfileRow'>
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
                                <el-input v-model="scope.row.awardfile" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search" @click="MoreSearchfileVisile(scope.row)"></el-button>
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
<script>
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowDataFileObj:Object
    },
    inject: ['reload'],
    data(){
        return{
            enclosuretableData: [],
            rowNum: 1,
            selectfilelistRow:[],
            filestyleoptions:new proData().filestyle,
            disabled:false,
            MoreSearchuserVisible:false
        }
    },
    methods: {
        // 获取附件表格选中时的数据
        selectfileRow (val) {
            this.selectfilelistRow = val
        },
        // 增加附件行
        addfileRow () {
            var list = {
            rowNum:this.rowNum,
            filestyle:'',
            awardfile: '',
            remark:''
            };
            this.enclosuretableData.unshift(list)
            this.rowNum += 1;
        },
        // 删除选中附件行
        delfileData () {
            for (let i = 0; i < this.selectfilelistRow.length; i++) {
                let val = this.selectfilelistRow;
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
        MoreSearchfileVisile(data){
            this.$emit('changeShow',data);
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