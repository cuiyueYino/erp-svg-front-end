<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="24">

        <el-col :span="1" :offset="22">
          <el-button type="success" icon='el-icon-folder-add' size="small" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="6" :offset="6">
          <el-checkbox v-model="checked">是否启用期权标准值</el-checkbox>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        checked: false,
        id:''
      }
    },
    created() {
      //查询系统参数
      this.getparamById();
    },
    methods: {
      //设置系统参数
      submit() {
        let param = {};
        param.id = this.id == undefined || this.id == null ? "" :this.id;
        param.isStandardValue = this.checked ? '1' : '0';
        this.$api.SystemSet.setSystemParam(param).then(response => {
          let responsevalue = response;
          if (responsevalue) {
            if (responsevalue.data != '' && responsevalue.data.code == 0) {
              this.$message.success('设置成功!');
            } else {
              this.$message.error(responsevalue.data.msg);
            }
          } else {
            this.$message.error('设置失败!');
          }
          this.getparamById();
        })
      },

      getparamById(){
        this.$api.SystemSet.getparamById('?id=1').then(response => {
          let responsevalue = response;
          if (responsevalue) {
            if (responsevalue.data != null && responsevalue.data != undefined) {
              if(responsevalue.data.data != null ){
                let returndata = responsevalue.data.data.isStandardValue;
                this.id = responsevalue.data.data.id;
                if (returndata == '1') {
                  this.checked = true;
                } else {
                  this.checked = false;
                }
              } else {
                this.checked = false;
              }
            } else {
              this.checked = false;
            }
          } else {
            this.$message.error('查询失败!');
          }
        })
      }



    }
  }
</script>
<style lang="scss" scoped>
  .box-card:first-child {
    margin-bottom: 16px;
  }
</style>
