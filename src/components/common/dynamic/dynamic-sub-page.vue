<template>
    <div>
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <div v-for="(lineArr,Lindex) in fromDataArr" :key="Lindex">
                <el-row v-if="lineArr.length == 1">
                    <el-col :span="22" v-for="(item,index) in lineArr" :key="index">
                        <el-form-item :label="item.label" :prop="item.required?item.name:''">
                            <el-input :type="item.type" :v-model="item.name" :rows="3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-else>
                    <el-col :span="8" v-for="(item,index) in lineArr" :key="index" :offset="index==0?2:0">
                        <el-form-item v-if="item.type == 'date'" :label="item.label" :prop="item.required?item.name:''">
                            <el-date-picker
                                :v-model="item.name"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-else-if="item.type == 'checkbox'" :label="item.label" :prop="item.required?item.name:''">
                            <el-checkbox v-model="item.name"></el-checkbox>
                        </el-form-item>
                        <el-form-item v-else :label="item.label" :prop="item.required?item.name:''">
                            <el-input :type="item.type" :v-model="item.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        rowDSPDataArr:Array,
        rowNMMtype: Boolean
    },
    data(){
        return{
            formdata:{},
            fromDataArr:[],
            labelPosition: 'left',
        }
    },
    created(){
        this.checkposition(this.rowDSPDataArr);
    },
    methods:{
       /**
         * 判断每个item的位置,第4个换行.
         * 返回值为[[{1},{2},{3}],[{4}],[{5},{6},{7}]]
         * @param {data} props 传入数组
        */
        checkposition(data){
            var parent = [];
            var Stynum=0;
            var Lineindex=0;
            for (var i = 0; i < data.length; i++) {
                if(data[i].type ==='textarea'){
                    Stynum=2;
                    Lineindex++;
                }else if(Stynum == 3){
                    Stynum=0;
                    Lineindex++;
                }
                data[i].Lineindex=Lineindex;
                Stynum++;
            }
            for(var j = 0; j <= Lineindex; j++){
                let linedata=[];
                for (var i = 0; i < data.length; i++) {
                    if(data[i].Lineindex === j){
                        linedata.push(data[i]);
                    }
                }
                parent.push(linedata);
            }
            this.fromDataArr=parent;
        } 
    }
}
</script>