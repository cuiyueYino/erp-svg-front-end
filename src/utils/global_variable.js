/*
 * 公工参数 -- 孟鹏飞
	2020-07-30

	调用方式 : 
  this.$GLOBAL.XXXX
  
  * 
  * */
const editorOption = {
	placeholder: '请输入内容',
	modules: {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
			['blockquote', 'code-block'], //引用，代码块
			[{
				header: 1
			}, {
				header: 2
			}], // 标题，键值对的形式；1、2表示字体大小
			[{
				list: 'ordered'
			}, {
				list: 'bullet'
			}], //列表
			[{
				script: 'sub'
			}, {
				script: 'super'
			}], // 上下标
			[{
				indent: '-1'
			}, {
				indent: '+1'
			}], // 缩进
			[{
				direction: 'rtl'
			}], // 文本方向
			[{
				size: ['small', false, 'large', 'huge']
			}], // 字体大小
			[{
				header: [1, 2, 3, 4, 5, 6, false]
			}], //几级标题
			[{
				color: []
			}, {
				background: []
			}], // 字体颜色，字体背景颜色
			[{
				font: []
			}], //字体
			[{
				align: []
			}], //对齐方式
			['clean'], //清除字体样式
			['image'] //上传图片、上传视频
		]
	}
}
const fieldTypeList = [{
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
	label: '日期时间控件'
}, {
	id: '9',
	label: '枚举项'
}, {
	id: '10',
	label: '复选框'
}]

export default {
	//富文本
	editorOption,
	//字段类型
	fieldTypeList
}