const templateMainTableClassification = () =>
	import('./template-main-table-classification.vue');
const templateMainTableClassificationChild = () =>
	import('./template-main-table-classification-child.vue');
const templateMainTable = () =>
	import('./template-main-table.vue');
const templateMainTableChild = () =>
	import('./template-main-table-child.vue');
const enumerationList = () =>
	import('./enumerationList.vue');
const workItems = () =>
	import('./work-items.vue');

const InsideMail = [{
		path: 'templateMainTableClassification',
		name: 'templateMainTableClassification',
		component: templateMainTableClassification,
		meta: {
			title: '主表分类模板'
		}
	},
	{
		path: 'templateMainTable',
		name: 'templateMainTable',
		component: templateMainTable,
		meta: {
			title: '主表模板'
		}
	},
	{
		path: 'enumerationList',
		name: 'enumerationList',
		component: enumerationList,
		meta: {
			title: '枚举内容'
		}
	},
	{
		path: 'templateMainTableClassificationChild',
		name: 'templateMainTableClassificationChild',
		component: templateMainTableClassificationChild,
		meta: {
			title: '子表分类模板'
		}
	},
	{
		path: 'templateMainTableChild',
		name: 'templateMainTableChild',
		component: templateMainTableChild,
		meta: {
			title: '子表模板'
		}
	},
	{
		path: 'workItems',
		name: 'workItems',
		component: workItems,
		meta: {
			title: '工作事项'
		}
	}
];

export default InsideMail;