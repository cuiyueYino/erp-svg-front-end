<template>
  <div class="header">
    <div class="logo"></div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <!--<div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            effect="dark"
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>-->
        <!-- 用户名下拉菜单 -->
        <!--<el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
        <div class="header-row">
          <div class="header-li-user">
            <em class="header-img"></em>
            <span class="header-span">
              {{ username }}
            </span>
          </div>
          <div class="header-li">
            <i class="el-icon-bangzhu"></i>
            <span class="header-span">
              帮助
            </span>
          </div>
          <div class="header-li">
            <i class="el-icon-switch-button"></i>
            <span class="header-span" @click="loginOut">退出登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        collapse: false,
        fullscreen: false,
        name: '系统管理员',
        message: 2,
        ruleForm: {
          pass: '',
          checkPass: '',
          oldpass: ''
        }
      };
    },
    computed: {
      username() {
        let username = localStorage.getItem('conf_ms_name');
        return username ? username : this.name;
      }
    },
    inject: ['bus'],
    methods: {
      // 登出
      loginOut(){
        localStorage.removeItem('conf_ms_username');
        localStorage.removeItem('conf_ms_name');
        localStorage.removeItem('conf_ms_userId');
        this.$router.push('/confMnt/login');
      },
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  };
</script>
<style scoped lang="scss">
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 16px;
    color: #fff;
  }

  .header-row{
    width: 100%;
    display: inline-flex;
  }

  .header-li{
    width: 21%;
    text-align: center;
  }

  .header-li-user{
    width: 40%;
    text-align: right;
  }

  .header-span{
    font-size: 14px;
    color: #fff;
    margin-left: 3px;
    cursor:pointer
  }

  .header-img {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(../../assets/img/userIcon.png) no-repeat center center #487de4;
    vertical-align: middle;
    margin-top: -2px;
    border-radius: 50%;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    background-image: url(./img/conferenceHeader.png);
    width: 295px;
    height: 34px;
    position: absolute;
    left: 15px;
    top: 50%;
    margin-top: -20px;
    background-size: 100% 100%;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
    width: 400px;
    margin-right: -80px;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
