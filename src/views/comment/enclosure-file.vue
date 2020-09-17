<template>
    <div>
        <div style="width:200px;height:40px;float:right;">
            <el-button type="success" icon='el-icon-folder-add' size="small" style="magin-right:5px;" @click.prevent="addfileRow()">新增</el-button>
            <el-button type="danger" icon='el-icon-delete' size="small" @click.prevent="delfileData()">删除</el-button>
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
                        <el-select v-model="scope.row.filestyle" size="mini" value-key="value" v-bind:disabled="disabled">
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
                    <!--<template slot-scope="scope">
                        <el-row>
                            <el-col :span="14">
                                <el-input v-model="scope.row.fileName" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="4" style="padding:5px">
                                <el-upload
                                    action=""
                                    :file-list="scope.row.fileList"
                                    :show-file-list="false"
                                    :auto-upload="false">
                                    <el-button type="primary"  icon="el-icon-search"  size="mini"></el-button>
                                </el-upload>
                            </el-col>
                        </el-row>
                    </template>-->
                    <template slot-scope="scope">
                        <input type="file"  id="fileExport" icon="el-icon-search" @change="handleFileChange(scope.row)" ref="inputer">
                    </template>
                </el-table-column>
                <el-table-column label="必须" >
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.filechecked" size="mini"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="编制单位" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="负责人" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="审核单位" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="审核人" >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="定版日期" width="250px">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.value1"
                            type="date"
                            size="mini"
                            placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column  label="文档密级" align="center" width="220px">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="scope.row.awardcreditbreed" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search"  size="mini" @click="MoreSearchuserVisible = true"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column  label="保管期限" align="center" width="220px">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="scope.row.awardcreditbreed" size="mini" style="padding:5px"></el-input>
                            </el-col>
                            <el-col :span="2" style="padding:5px">
                                <el-button type="primary"  icon="el-icon-search" size="mini" @click="MoreSearchuserVisible = true"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="备注" width="230px">
                    <template slot-scope="scope">
                        <el-input type="textarea" class="remark" size="mini" v-model="scope.row.remark" :rows="1"></el-input>
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
        },
        handleChange(event){
            console.log(event)
            /*for(var i = 0;i<file.length;i++){
                //    上传类型判断
                var imgName = file[i].name;
                var idx = imgName.lastIndexOf(".");  
                if (idx != -1){
                    var ext = imgName.substr(idx+1).toUpperCase();   
                    ext = ext.toLowerCase( ); 
                    if (ext!='pdf' && ext!='doc' && ext!='docx'){

                    }else{
                        this.addArr.push(file[i]);
                    }   
                }else{
                }
            }*/
        },
        handleFileChange(event){
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            event.file = inputDOM.files[0];
            /*this.errText = '';

            let size = Math.floor(this.file.size / 1024);
            console.log(this.file)
            //new一个FileReader实例
            let reader = new FileReader();
            let _this = this;
            // reader.readAsText(this.file)  //文本读取，默认utf-8，格式 其他格式：reader.readAsText(this.file, "GBK")  
            reader.readAsDataURL(this.file)  //base 64 读取
            reader.onload=function(e){
                // 读取结果
                console.log(this.result)
                // if (size > ...) {
                //     // 这里可以加个文件大小控制
                //     return false
                // }
            }*/
            console.log(event)
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
/deep/ .el-upload--text{
    width: 45px;
    height: 30px;
    border: none;
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