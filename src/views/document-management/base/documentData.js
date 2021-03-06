class documentData {
    constructor() {
        this.document = [
            {
                value: 'fcode',
                label: '编码'
            },
            {
                value: 'fname',
                label: '名称'
            },
            {
                value: 'fcreator',
                label: '创建人'
            },
            {
                value: 'fcreatetime',
                label: '创建时间'
            },
            {
                value: 'fdescription',
                label: '描述'
            },
            {
                value: 'fdocstatus',
                label: '状态'
            }
        ],
        this.docAuthority = [
            {
                value: '1',
                label: '查看'
            },
            {
                value: '2',
                label: '打印'
            }
        ],
        this.docRoleAuth = [
            {
                value: 'code',
                label: '角色编码'
            },
            {
                value: 'name',
                label: '角色名称'
            },
            {
                value: 'companyName',
                label: '公司名称'
            }
        ],
        this.documentBrowse = [
          {
            value: 'fcode',
            label: '编码'
          },
          {
            value: 'fname',
            label: '名称'
          },
          {
            value: 'fcreator',
            label: '创建人'
          },
          {
            value: 'fcreatetime',
            label: '创建时间'
          },
          {
            value: 'fdescription',
            label: '描述'
          }
        ],
        this.docCategory = [
            {
                value: 'fcode',
                label: '编码'
            },
            {
                value: 'fname',
                label: '名称'
            },
            {
                value: 'fdescription',
                label: '描述'
            },
        ]
    }
}
export default documentData
