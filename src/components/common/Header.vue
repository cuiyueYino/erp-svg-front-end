<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<i v-if="!collapse" class="el-icon-s-fold"></i>
			<i v-else class="el-icon-s-unfold"></i>
		</div>
		<div class="logo">福佳集团ERP管理系统</div>
		<div class="header-right">
			<div class="header-user-con">
				<!-- 进入系统 -->
				<div v-if="showFig" class="el-icon-monitor to-oa" @click="toOa">
					<span>进入系统</span>
				</div>
			</div>
			<div class="header-user-con">
				<!-- 全屏显示 -->
				<div class="btn-fullscreen" @click="handleFullScreen">
					<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
						<i class="el-icon-rank"></i>
					</el-tooltip>
				</div>
				<!-- 用户名下拉菜单 -->
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided command="change">修改密码</el-dropdown-item>
						<el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog  
			title="用户密码修改" 
			@close="handleClose" 
			:visible.sync="dialogVisible" 
			:append-to-body="true" 
			v-if="dialogVisible" 
			:close-on-click-modal="false" 
			width="40%">
			<el-form
				v-model="formdata"
				class="dataForm"
				size="mini"
				:rules="rules"
				ref="ruleFormTable"
				:model="formdata"
				:label-position="labelPosition"
				>
					<el-card>
                    	<el-row>
							<el-col :span="6">
								<el-form-item label="用户名" >
									<el-input v-model="formdata.userName" v-bind:disabled="disabled"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6" :offset="6">
								<el-form-item label="旧密码" prop="oldPassword">
									<el-input type="password" :maxlength="32" v-model="formdata.oldPassword" ></el-input>
								</el-form-item>
							</el-col>
                    	</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label="新密码" prop="newPassword">
									<el-input type="password" :maxlength="32" v-model="formdata.newPassword" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6" :offset="6">
								<el-form-item label="确认密码" prop="conPassword">
									<el-input type="password" :maxlength="32" v-model="formdata.conPassword"></el-input>
								</el-form-item>
							</el-col>
                    	</el-row>
					</el-card>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button type='success' icon='el-icon-copy-document' size="small" @click="saveChangePassword()">提交</el-button>
					<el-button type='warning' icon='el-icon-close' size="small" @click="handleClose()">取消</el-button>
				</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showFig: true,
				dialogVisible: false,
				collapse: false,
				fullscreen: false,
				disabled: true,
				name: '系统管理员',
				username: localStorage.getItem('ms_username'),
				message: 2,
				ruleForm: {
					pass: '',
					checkPass: '',
					oldpass: ''
				},
				labelPosition: 'left',
				formdata:{},
				rules: {
					oldPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
					newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
					conPassword: [{required: true, message: '请输入确认密码', trigger: 'blur'}],
				},
			};
		},
		inject: ['bus'],
		mounted() {
			if(document.body.clientWidth < 1500) {
				this.collapse = true
				this.bus.$emit('collapse', this.collapse);
			}
		},
		created() {
			if(this.$route.name == "oaCompanyHome" || this.$route.name == "oaPersonalHome") {
				this.showFig = true
			} else {
				this.showFig = false
			}
		},
		methods: {
			handleClose(){
				this.$refs.ruleFormTable.resetFields();
				this.dialogVisible=false;
			},
			saveChangePassword(){
				this.$refs.ruleFormTable.validate((valid) => {
					if(valid) {
						let cpass=this.formdata.conPassword;
						let npass=this.formdata.newPassword;
						if(cpass != npass){
							this.$message.error("新密码和确认密码不一致!");
							return;
						}else{
							let formdata={};
							formdata.oid=localStorage.getItem("ms_userId");
							formdata.oldPassword=this.formdata.oldPassword;
							formdata.newPassword=this.formdata.newPassword;
							this.$api.management.changePassword(formdata).then(res => {
								let returndata=res;
								if(returndata.data){
									if(returndata.data.code === 0){
										this.$message.success("密码修改成功,请重新登录");
										this.dialogVisible=false;
										localStorage.removeItem('ms_roleId');
										localStorage.removeItem('ms_username');
										localStorage.removeItem('ms_name');
										localStorage.removeItem('ms_userId');
										this.$router.push({
											name :"/login"
										});
										location.reload();
									}else{
										this.$message.error(returndata.data.msg+'!');
									}
								}else{
									this.$message.error('密码更新失败!');
								}
								console.log(res)
							});
						}
					}
				})
			},
			toOa() {
				sessionStorage.setItem("oaMenu", false);
				//根据token查询登陆人的信息并存入缓存
				//通过用户ID查询菜单
				this.$api.common.findMenuByComputer({
					userId: localStorage.getItem('ms_userId')
				}).then(data2 => {
					//菜单放入本地缓存,并跳转首页
					sessionStorage.setItem("menuList", JSON.stringify(data2.data.data));
					this.$parent.show()
					this.$router.push({
						name: "index"
					});
					this.showFig = false
				}) //获取员工树信息
				this.getStaffTreeList()
			},
			//登录时获取员工树信息
			getStaffTreeList() {
				this.$api.confMangement.getStaffTreeList({}).then(res => {
					let resData = res.data.data;
					let resDataArr = eval("(" + resData + ")");
					localStorage.setItem('conf_staffTree', JSON.stringify(resDataArr));
				})
			},
			// 用户名下拉菜单选择事件
			handleCommand(command) {
				if(command == 'loginout') {
					localStorage.removeItem('ms_roleId');
					localStorage.removeItem('ms_username');
					localStorage.removeItem('ms_name');
					localStorage.removeItem('ms_userId');
					this.$router.push({
						name :"/login"
					});
					location.reload();
				} else if(command == 'change') {
					this.formdata.userName=localStorage.getItem('ms_username');
					this.dialogVisible = true;
				}
			},
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse
				this.bus.$emit('collapse', this.collapse);
			},
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if(this.fullscreen) {
					if(!document.exitFullscreen) {
						document.exitFullscreen();
					} else if(document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if(document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if(document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		},
		watch: {
			$route (to) {
				if(to.name ==='insideMailCommon' || to.name ==='todolist'){
					this.showFig = false;
				}
			}
		}
	};
</script>
<style scoped lang="scss">
	.el-dropdown-menu__item--divided {
		margin-top: 0px!important;
	}
	
	.header {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 70px;
		font-size: 22px;
		color: #fff;
	}
	
	.collapse-btn {
		float: left;
		padding: 0 21px;
		cursor: pointer;
		line-height: 70px;
	}
	
	.header .logo {
		/* background: url(../../assets/img/loginLogo.png); */
		float: left;
		line-height: 70px;
	}
	
	.header-right {
		float: right;
		padding-right: 50px;
		display: flex;
	}
	
	.header-user-con {
		display: flex;
		height: 70px;
		align-items: center;
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
	
	.to-oa {
		cursor: pointer;
		margin-right: 14px;
		font-size: 21px;
		span {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>