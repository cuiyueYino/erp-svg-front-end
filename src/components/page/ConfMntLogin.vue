<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-content01">
        <div class="ms-title">会议室管理系统</div>
        <el-form :model="param" :rules="rules" ref="conf_login" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="请输入用户名">
              <el-button class="login-input" tabindex=-1 slot="prepend" size="mini"><img
                src="../../views/confmangement/img/login-user.png" sizes="mini"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="param.password"
                      @keyup.enter.native="submitForm()">
              <el-button class="login-input" tabindex=-1 slot="prepend" size="small"><img
                src="../../views/confmangement/img/login-password.png" sizes="mini"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" style="color: #c1c1e0;">记住我的登录信息</el-checkbox>
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
  let Base64 = require('js-base64').Base64;

  export default {
    data: function () {
      return {
        param: {
          grant_type: 'password',
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        remember: false
      };
    },
    created() {
      // 在页面加载时从cookie获取登录信息
      let username = this.getCookie("username");
      let password = Base64.decode(this.getCookie("password"));
      if(username != null && username != "" && password != null && password != ""){
        this.param.username = username;
        this.param.password = password;
        this.remember = true;
      }
    },
    methods: {
      submitForm() {
        //校验用户名和密码
        if(this.param.username !== "admin" && this.param.username !== "admin01" && this.param.username !== "admin02"){
          this.$message.error("用户名或密码错误");
          return;
        }
        localStorage.removeItem('ms_tokenId');
        this.$refs.conf_login.validate((valid) => {
          if (valid) {
            //获取token
            this.$api.common.login(this.param).then(val => {
              //存入本地缓存,登陆后的每次接口调用都要带着token
              localStorage.setItem('ms_tokenId', val.data.access_token);
              this.$router.push('/confMnt');
              //根据token查询登陆人的信息并存入缓存
              this.$api.common.getUserInfo().then(data => {
                //用户ID
                localStorage.setItem('conf_ms_userId', data.data.principal.accountId);
                //用户名称
                localStorage.setItem('conf_ms_username', data.data.principal.fullname);
                //部门ID
                localStorage.setItem('conf_ms_userDepartId', data.data.principal.deptmentId);
                //部门名称
                localStorage.setItem('conf_ms_userDepartName', data.data.principal.deptmentName);
                //公司ID
                localStorage.setItem('conf_ms_companyId', data.data.principal.companyId);
                //公司名称
                localStorage.setItem('conf_ms_companyName', data.data.principal.companyName);
              });
              // 储存登录信息
              this.setUserInfo();
            }, (error) => {
              this.$message.error(error.data.error_description);
            })
          } else {
            this.$message.error("请输入用户名和密码!");
          }
        });
      },
      setUserInfo() {
        // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
        // 如果没有勾选，储存的信息为空
        if (this.remember) {
          this.setCookie("username", this.param.username);
          // base64加密密码
          let passWord = Base64.encode(this.param.password);
          this.setCookie("password", passWord);
          this.setCookie("remember", this.remember);
        } else {
          this.setCookie("account", "")
          this.setCookie("password", "")
        }
      },
      // 获取cookie
      getCookie(key) {
        if (document.cookie.length > 0) {
          let start = document.cookie.indexOf(key + '=')
          if (start !== -1) {
            start = start + key.length + 1
            let end = document.cookie.indexOf(';', start)
            if (end === -1) end = document.cookie.length
            return unescape(document.cookie.substring(start, end))
          }
        }
        return ''
      },
      // 保存cookie
      setCookie(cName, value, expiredays) {
        let exDate = new Date();
        exDate.setDate(exDate.getDate() + expiredays);
        document.cookie = cName + '=' + decodeURIComponent(value) +
          ((expiredays == null) ? '' : ';expires=' + exDate.toUTCString());
      }
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
    height: 45px;
    font-family: Microsoft YaHei;
    font-weight: bold;
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

  /deep/ .login-input .el-button {
    background: rgba(255, 255, 255, 1);
  }

  /deep/ .el-input__inner {
    width: 250px;
    height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
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
