<template>
	<div>
		<el-card>
			<formIcon :dis="dis" :showAdd="showAdd" :key="count" ref="mainTableChild" show="1" :form-data="formData.top">
				<slot></slot>
			</formIcon>
		</el-card>
		<el-row style="text-align: center;margin-bottom: 10px;">
			工作事项模板子表
		</el-row>
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane :label="item.showName" v-for="(item,index) in formData.bottom" :name="item.id" :key="index">
				<formIcon :dis="dis" :showAdd="showAdd" :key="count" ref="refCon" show="2" v-if="item.type == 1" :form-data="item"></formIcon>
				<tableDynamic :dis="dis" :key="count" ref="refCon" v-else :form-data="item"></tableDynamic>
			</el-tab-pane>
			<el-tab-pane name="wobuxinnengchongfu" label="附件">
				<el-upload :disabled="dis != 3" :on-preview="downFiles" :auto-upload="false" :on-change="getFile" :on-remove="delFile" multiple :data="uploadData" ref="upload" class="upload-demo" action="" :file-list="fileList">
					<el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	//预览
	import formIcon from '../../../views/collaborative-office/components/encapsulation/form-dynamic';
	import tableDynamic from '../../../views/collaborative-office/components/encapsulation/table-dynamic';
	import axios from 'axios';
	export default {
		components: {
			formIcon,
			tableDynamic
		},
		props: {
			//传入的data值
			formData: {
				type: Object,
				required: true
			},
			showAdd: {
				type: String,
				required: true
			},
			dis: {
				type: String,
				required: true
			},
			files: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				count: 0,
				conData: {},
				fileList: [],
				uploadData: {
					userCode: "user1",
					meauCode: "workItem",
					voucherId: ""
				},
				delFiles: []
			};
		},
		computed: {
			activeName: {
				get() {
					this.count++
						if(typeof(this.formData.bottom) != "undefined") {
							if(typeof(this.formData.bottom[0]) != "undefined") {
								return this.formData.bottom[0].id
							} else {
								return "wobuxinnengchongfu"
							}
						} else {
							return "wobuxinnengchongfu"
						}
				},
				set() {}
			}
		},
		created() {
			console.log(this.files)
			if(this.files.length != 0) {
				this.files.forEach(item => {
					var a = {
						name: item.fileName,
						id: item.id
					}
					this.fileList.push(a)
				})
			}
		},
		methods: {
			getFile(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 20;
				if(isLt2M) {
					this.fileList.push(file.raw)
				} else {
					this.$message.error('上传大小不能超过 20MB!');
					for(var i = 0; i < fileList.length; i++) {
						if(fileList[i].uid == file.uid) {
							fileList.splice(i, 1)
						}
					}
				}
			},
			delFile(file, fileList) {
				if(typeof(file.id) != "undefined") {
					this.delFiles.push(file.id)
				}
				console.log(this.delFiles)
				this.fileList = fileList
			},
			downFiles(file) {
				this.popup('是否下载文件<' + file.name + '>?').then(res => {
					axios.interceptors.request.use(
						config => {
							if(localStorage.getItem('ms_tokenId')) {
								config.headers.Authorization = 'bearer ' + localStorage.getItem('ms_tokenId');
							}
							return config;
						},
						error => Promise.error(error)
					);
					axios({
						method: 'post',
						url: '/api/interfaces/attachment/downloadFile',
						params: {
							attachmentId: file.id
						},
						responseType: 'blob'
					}).then(response => {
						this.download(response, file.name);
					}).catch((error) => {

					})
				}).catch(() => {})
			},
			//下载文件
			download(data, fileName) {
				debugger;
				if(!data) {
					return
				}
				let url = window.URL.createObjectURL(new Blob([data.data]))
				let link = document.createElement('a')
				link.style.display = 'none'
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
			},
			toUpload(id) {   
				this.fileList.forEach(item => {
					if(typeof(item.id) == "undefined") {
						var formData  = new  FormData();
						formData.append('userCode', localStorage.getItem('ms_userId'));
						formData.append('menuCode', "workItem");
						formData.append('voucherId', id);
						formData.append('file', item);
						this.$api.collaborativeOffice.uploadFile(formData).then(data => {})
					}
				})
				this.delFiles.forEach(item => {
					this.$api.collaborativeOffice.deleteInfo({
						id: item
					}).then(data => {})
				})
			},
			onSubmit() {
				var state = true
				if(!this.$refs.mainTableChild.onSubmit()) {
					state = false
				}
				if(typeof(this.$refs.refCon) != "undefined") {
					this.$refs.refCon.forEach(item => {
						if(!item.onSubmit()) {
							state = false
						}
					})
				}
				if(state) {
					this.conData = this.$refs.mainTableChild.ruleForm
					if(typeof(this.$refs.refCon) != "undefined") {
						this.$refs.refCon.forEach(item => {
							if(item.formData.type == 1) {
								this.$set(this.conData, item.formData.id, [])
								this.conData[item.formData.id].push(item.ruleForm)
							} else {
								this.$set(this.conData, item.formData.id, item.ruleForm.lines)
							}
						})
					}
					return true
				}
			}
		},

	}
</script>

<style scoped>
	>>>.el-upload--text {
		height: 30px!important;
		width: 80px!important;
	}
	
	.upload-btn {
		display: inline-block;
	}
</style>