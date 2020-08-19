<template>
	<div class="login-wrap">
		<iframe src="http://localhost:6013/login" style="width:100%;height:764px;border:0px;padding:0px;display:none"  class="taskStructure"  ref="iframe"></iframe>
		<div class="ms-login">
			<div class="ms-title01"><img src="../../assets/img/logo-bg.png" height="45" width="360" /></div>
			<div class="ms-content01">
				<div class="ms-title">用户登录</div>
				<el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
					<el-form-item prop="username">
						<el-input v-model="param.username" placeholder="username">
							<el-button tabindex=-1 slot="prepend" icon="el-icon-lx-people"></el-button>
						</el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
							<el-button tabindex=-1 slot="prepend" icon="el-icon-lx-lock"></el-button>
						</el-input>
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
		data: function() {
			return {	
				iframeWin:{},
				eventObject:{},
				param: {
					grant_type: 'password',
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		mounted () {
    		this.iframeWin = this.$refs.iframe.contentWindow
		},
		methods: {
			 handleMessage (event) {
				const data = event.data
				switch (data.cmd) {
					case 'getHtmlData':
					this.eventObject = event;
					break;
				}
    		},
			submitForm() {
				//清空本地的缓存
				localStorage.clear()
				//校验用户名和密码
				this.$refs.login.validate((valid) => {
					if(valid) {
						//获取token
						this.$api.common.login(this.param).then(val => {
							//存入本地缓存,登陆后的每次接口调用都要带着token
							localStorage.setItem('ms_tokenId', val.data.access_token);
							//根据token查询登陆人的信息并存入缓存
							this.$api.common.getUserInfo().then(data => {
								//用户ID
								localStorage.setItem('ms_userId', data.data.principal.accountId);
								//用户名称
								localStorage.setItem('ms_username', data.data.principal.fullname);
								//部门ID
								localStorage.setItem('ms_userDepartId', data.data.principal.deptmentId);
								//部门名称
								localStorage.setItem('ms_userDepartName', data.data.principal.deptmentName);
								//公司ID
								localStorage.setItem('ms_companyId', data.data.principal.companyId);
								//公司名称
								localStorage.setItem('ms_companyName', data.data.principal.companyName);
								//跳转门户
								sessionStorage.setItem("oaMenu", true);
								this.$router.push("/oaCompanyHome")
							})
							
						})
							//跳转门户
							sessionStorage.setItem("oaMenu", true);
							this.$router.push("/oaCompanyHome")
						// 向html的login方法反动数据 	
							this.iframeWin.postMessage({
								cmd: 'sendLoginData',
								params: {
			                        'username':this.param.username,
			                        'pass': this.param.password,
			                    }
							}, '*');
						this.handleMessage(this.eventObject);
					} else {
						this.$message.error("请输入用户名和密码!");
					}
				});
			},
		}
	};
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../../assets/img/Logo-title.png);
		background-size: 100%;
	}
	
	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: #000;
		border-bottom: 1px solid #ddd;
	}
	
	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 350px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		overflow: hidden;
	}
	
	.ms-content01 {
		background: rgba(255, 255, 255, 0.3);
	}
	
	.ms-content {
		padding: 30px 30px;
	}
	
	.login-btn {
		text-align: center;
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