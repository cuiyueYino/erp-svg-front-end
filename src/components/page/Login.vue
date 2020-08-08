<template>
	<div class="login-wrap">
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
				param: {
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
				if(usernameS && passwordS) {
					/*let paramdata={};
					paramdata.grant_type = 'password';
					paramdata.username=usernameS;
					paramdata.password=passwordS;
					localStorage.removeItem("ms_tokenId");
					console.log(this.$api.common.getTokenData(paramdata))
					this.$api.common.getTokenData(paramdata).then((response)=>{
						var responsevalue=response;
						if(responsevalue){
							console.log(responsevalue)
						}else{
							this.$message.error("请输入正确用户名和密码!");
							return false;
						}
					});*/

					localStorage.setItem('ms_username', '王世超');
					localStorage.setItem('ms_name', '王世超');
					if(usernameS === 'OA') {
						localStorage.setItem('ms_roleId', '3');
					} else if(usernameS === 'CW') {
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

					/*
					 * 孟鹏飞 2020-08-06
					 * 
					 * 登陆时调用工作事项内的查询接口，并放置于本地缓存
					 * 
					 * */
					//最上端公司选择
					this.$api.collaborativeOffice.getCompanyData().then(data => {
						localStorage.setItem('CompanyData', JSON.stringify(data.data.data.rows));
					})
					//全部枚举
					this.$api.collaborativeOffice.findList({}).then(data => {
						localStorage.setItem('selectList', JSON.stringify(data.data.data));
					})
					//全部服务
					this.$api.collaborativeOffice.findTServiceByParams({}).then(data => {
						localStorage.setItem('tServiceByParams', JSON.stringify(data.data.data));
					})
					//工作事项
					this.$api.collaborativeOffice.getFieldBrowse().then(data => {
						localStorage.setItem('fieldBrowseList', JSON.stringify(data.data.data));
					})
					//公司 部门 职位
					this.$api.management.selectAllOrganizationInfo().then(data => {
						localStorage.setItem('allOrganizationInfo', JSON.stringify(eval('(' + data.data.data + ')')));
					})
					//人员
					this.$api.collaborativeOffice.findConList("staffManage/findStaffByPage", {
						page: 1,
						size: 100000
					}).then(data => {

						localStorage.setItem('staffList', JSON.stringify(data.data.data.rows));
						console.log(JSON.parse(localStorage.getItem('staffList')))
					})
					//用户
					this.$api.collaborativeOffice.findConList("userManage/findUserBypage", {
						page: 1,
						size: 100000
					}).then(data => {
						localStorage.setItem('userList', JSON.stringify(data.data.data.rows));
						console.log(JSON.parse(localStorage.getItem('userList')))
					})
					//职务
					this.$api.collaborativeOffice.findConList("positionmnt/findPositionList", {
						page: 1,
						size: 100000
					}).then(data => {
						localStorage.setItem('positionList', JSON.stringify(data.data.data.rows));
						console.log(JSON.parse(localStorage.getItem('positionList')))
					})

					this.$router.push('/');
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
					this.$router.push('/');
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