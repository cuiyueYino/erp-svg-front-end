<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-content01">
        <div class="ms-title">会议室管理系统</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="请输入用户名">
              <el-button class="login-input" tabindex=-1 slot="prepend" size="mini"><img src="../../views/confmangement/img/login-user.png" sizes="mini"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="param.password"
                      @keyup.enter.native="submitForm()">
              <el-button class="login-input" tabindex=-1 slot="prepend" size="small"><img src="../../views/confmangement/img/login-password.png" sizes="mini"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" style="color: #c1c1e0;">记住我的登录信息</el-checkbox>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        param: {
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: false
      };
    },
    methods: {
      submitForm() {
        var usernameS = this.param.username;
        var passwordS = this.param.password;
        // if(!usernameS){
        //     this.$message.error("请输入用户名!");
        // }
        // if(!passwordS){
        //     this.$message.error("请输入密码!");
        // }
        if (usernameS && passwordS) {
          //     let paramdata={};
          //     paramdata.username=usernameS;
          //     paramdata.password=passwordS;
          //     paramdata.grant_type = 'password';
          //     this.$api.common.getToken(paramdata).then((response)=>{
          //         var responsevalue=response;
          //         if(responsevalue){
          //             if(responsevalue.data && responsevalue.data !=""){
          //                 let returndata =responsevalue.data;
          //                 localStorage.setItem('ms_tokenId',  returndata.access_token);
          // this.getUserInfo()
          //             }else{
          //                 this.$message.error("请输入正确用户名和密码!");
          //                 return false;
          //             }
          //         }else{
          //             this.$message.error("请输入正确用户名和密码!");
          //             return false;
          //         }
          //     });

          localStorage.setItem('ms_username', '王世超');
          localStorage.setItem('ms_name', '王世超');
          if (usernameS === 'OA') {
            localStorage.setItem('ms_roleId', '3');
          } else if (usernameS === 'CW') {
            //财务
            localStorage.setItem('ms_roleId', '2');
          } else {
            localStorage.setItem('ms_roleId', '0');
          }
          localStorage.setItem('ms_userId', 'BFPID000000LR40002');
          //localStorage.setItem('ms_userId',  'BFPID000000OV60NOU');
          //localStorage.setItem('ms_userId',  'BFPID000000M4J0I62');
          //localStorage.setItem('ms_userId',  'BFPID000000OV60NO8');
          //用户部门
          localStorage.setItem('ms_userDepartId', 'BFPID12333LSN033N');
          localStorage.setItem('ms_userDepartName', '集团信息中心');
          localStorage.setItem('ms_companyId', '_DefaultCompanyOId');
          localStorage.setItem('ms_tokenId', "9a00a32c-c59c-471d-8638-297e7f00f7f6");
          //localStorage.setItem('ms_tokenId',  "fcb1eb0d-27e8-4029-befe-a1f3db56cc7a");
          this.$router.push('/confMnt');
        } else {
          this.$message.error("请输入用户名和密码!");
          return false;
        }
      },
      // 获取登录人信息
      getUserInfo() {
        let data = {
          tel: this.param.username,
          password: this.param.password
        }
        this.$api.common.getUserInfo(data).then(res => {
          let returndata = res.data;
          localStorage.setItem('ms_data', JSON.stringify(returndata));
          localStorage.setItem('ms_name', returndata.name);
          localStorage.setItem('ms_id', returndata.id);
          localStorage.setItem('ms_username', returndata.username);
          localStorage.setItem('ms_roleId', returndata.roleId);
          localStorage.setItem('ms_authId', returndata.authId);
          this.$router.push('/confManagement');
          this.$message.success('登录成功');
        })
      },
    }
  };
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../views/confmangement/img/login-bg.png);
    background-size: 100%;
  }

  .ms-title {
    height:45px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    color: #FFFFFF;
  }

  .ms-login {
    position: absolute;
    left: 70%;
    top: 53%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;

    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  /deep/ .login-input .el-button{
    background:rgba(255,255,255,1);
  }

  /deep/ .el-input__inner{
    width:250px;
    height:34px;
    background:rgba(255,255,255,1);
    border-radius:2px;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .ms-title01 {
    margin-bottom: 50px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
