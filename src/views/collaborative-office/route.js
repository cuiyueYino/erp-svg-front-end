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
const templateAuthorizationRole = () =>
	import('./template-authorization-role.vue');
const templateAuthorizationPersonnel = () =>
	import('./template-authorization-personnel.vue');
const seeWorkItem = () =>
	import('../../views/collaborative-office/components/see-work-items-other.vue');

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
	},
	{
		path: 'templateAuthorizationRole',
		name: 'templateAuthorizationRole',
		component: templateAuthorizationRole,
		meta: {
			title: '工作事项模板授权角色'
		}
	},
	{
		path: 'templateAuthorizationPersonnel',
		name: 'templateAuthorizationPersonnel',
		component: templateAuthorizationPersonnel,
		meta: {
			title: '工作事项模板授权人员'
		}
	},
	{
		path: 'seeWorkItem',
		name: 'seeWorkItem',
		component: seeWorkItem,
		meta: {
			title: '工作流查看'
		}
	}
];

export default InsideMail;