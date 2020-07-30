/*
 * 公共方法 -- 孟鹏飞
	2020-07-30

	调用方式 : 
	 this.XXXX()
  
  * 
  * */

export default {
	install(Vue, options) {
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