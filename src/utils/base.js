/*
 * 
 * 公共方法--孟鹏飞
2020-07-28

使用方式：
直接在JS中使用 this.goOut()来使用

* */

export default {
	install(Vue, options) {
		//获取字段类型
		Vue.prototype.getFieldTypeList = function(error) {
			return [{
				id: '1',
				label: '浏览框',
			}, {
				id: '2',
				label: '字符型'
			}, {
				id: '3',
				label: '文本型'
			}, {
				id: '4',
				label: '整型'
			}, {
				id: '5',
				label: '浮点型'
			}, {
				id: '6',
				label: '富文本'
			}, {
				id: '7',
				label: '日期控件'
			}, {
				id: '8',
				label: '时间控件'
			}, {
				id: '9',
				label: '枚举项'
			}, {
				id: '10',
				label: '复选框'
			}]
		};
		//警告框弹出
		Vue.prototype.goOut = function(error) {
			this.$message.error(error);
		};
		//成功框弹出
		Vue.prototype.goOk = function(success) {
			this.$message.success(success);
		};
		//弹框
		/* 例子:
		this.popup('XXXX?').then(res => {
			
		}).catch(() => {

		})
		*/
		Vue.prototype.popup = function(data) {
			return this.$confirm(data, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
		};
		//非空的公共方法
		Vue.prototype.noNull = function(val) {
			if(val == "" || val == null || val == "null" || typeof(val) == "undefined") {
				return true
			} else {
				return false
			}
		};
		//对象非空
		Vue.prototype.noObject = function(val) {
			if(JSON.stringify(val) == "{}") {
				return true
			} else {
				return false
			}
		};

		//后台返回值
		Vue.prototype.dataBack = function(data, val) {
			console.log(data)
			if(data.data.code == 0) {
				if(val != "") {
					this.goOk(val)
				}
				return true
			} else {
				this.goOut(data.data.msg)
				return false
			}
		};
		//下载公共方法(对象,名字)
		Vue.prototype.downloadContext = function(item, name) {
			this.$http.post("/report/export", item, {
				responseType: 'blob'
			}).then(data => {
				const content = data;
				const blob = new Blob([content], {
					type: 'application/ms-excel'
				});
				const fileName = name + '.xlsx';
				var userAgent = navigator.userAgent;
				if('download' in document.createElement('a')) { // 非IE下载
					if(userAgent.indexOf("Edge") != -1) {
						navigator.msSaveBlob(blob, fileName);
					} else {
						const elink = document.createElement('a');
						elink.download = fileName;
						elink.style.display = 'none';
						elink.href = URL.createObjectURL(blob);
						document.body.appendChild(elink);
						elink.click();
						URL.revokeObjectURL(elink.href); // 释放URL 对象
						document.body.removeChild(elink);
					}
				} else { // IE10+下载
					navigator.msSaveBlob(blob, fileName);
				}
			}).catch(function(error) {
				console.log(error);
			});
		};
	}
}