class houseData {
    constructor() {
        this.columns =[
            {
                key: 'salesstate',
                title: '销售状态'
            },
            {
                key: 'leasestate',
                title: '租赁状态'
            },
            {
                key: 'propertystatus',
                title: '物业状态'
            },
            {
                key: 'projectname',
                title: '项目'
            },
            {
                key: 'gallery',
                title: '楼座'
            },
            {
                key: 'roomnumber',
                title: '房号'
            },
            {
                key: 'Chgeroomnumber',
                title: '修正房号'
            },
            {
                key: 'apartmentlayout',
                title: '户型'
            },
            {
                key: 'Unitencodi',
                title: '单元编码'
            },
            {
                key: 'floorencodi',
                title: '楼层编码'
            },
            {
                key: 'Flatencodi',
                title: '平层序号'
            },
            {
                key: 'Builtuparea',
                title: '建筑面积'
            },
            {
                key: 'roomarea',
                title: '套内面积'
            },
            {
                key: 'publicarea',
                title: '分摊面积'
            },
            {
                key: 'leasearea',
                title: '租赁面积'
            },
            {
                key: 'companyarea',
                title: '物业面积'
            },
            {
                key: 'describe',
                title: '描述'
            }
        ],
        this.tableData=[
            {
                salesstate: '未推',
                leasestate: '未推',
                propertystatus: '',
                projectname: '法库项目',
                gallery: '法库2#',
                roomnumber: '2#1-1-1',
                Chgeroomnumber: '',
                apartmentlayout: '两室一厅',
                Unitencodi: '1',
                floorencodi: '1',
                Flatencodi: '1',
                Builtuparea: '120',
                roomarea: '89',
                publicarea: '32',
                leasearea: '100',
                companyarea: '100',
                describe: ''
            },
            {
                salesstate: '契约',
                leasestate: '未推',
                propertystatus: '未入住',
                projectname: '法库项目',
                gallery: '法库2#',
                roomnumber: '3#1-1-1',
                Chgeroomnumber: '',
                apartmentlayout: '两室一厅',
                Unitencodi: '1',
                floorencodi: '1',
                Flatencodi: '1',
                Builtuparea: '120',
                roomarea: '89',
                publicarea: '32',
                leasearea: '100',
                companyarea: '100',
                describe: ''
            },
            {
                salesstate: '未推',
                leasestate: '已租',
                propertystatus: '已入住',
                projectname: '法库项目',
                gallery: '法库2#',
                roomnumber: '2#1-1-2',
                Chgeroomnumber: '',
                apartmentlayout: '一室一厅',
                Unitencodi: '1',
                floorencodi: '1',
                Flatencodi: '1',
                Builtuparea: '120',
                roomarea: '99',
                publicarea: '22',
                leasearea: '100',
                companyarea: '100',
                describe: ''
            }
        ],
        this.GalleryColumns=[
            {
                type: 'selection'
            },
            {
                key: 'company',
                title: '公司'
            },
            {
                key: 'galleryno',
                title: '楼座编码'
            },
            {
                key: 'galleryname',
                title: '楼座名称'
            },
            {
                key: 'Sourcename',
                title: '来源名称'
            },
            {
                key: 'Propertytype',
                title: '物业类型'
            },
            {
                key: 'Houseumber',
                title: '房屋套数'
            },
            {
                key: 'totalarea',
                title: '总面积'
            }
        ],
        this.GallerytableData= [
            {
                company: '未推',
                galleryno: '未推',
                galleryname: '',
                Sourcename: '法库项目',
                Propertytype: '法库2#',
                Houseumber: '2#1-1-1',
                totalarea: ''
            },
            {
                company: '未推',
                galleryno: '未推',
                galleryname: '',
                Sourcename: '法库项目',
                Propertytype: '法库2#',
                Houseumber: '2#1-1-1',
                totalarea: ''
            },
            {
                company: '未推',
                galleryno: '未推',
                galleryname: '',
                Sourcename: '法库项目',
                Propertytype: '法库2#',
                Houseumber: '2#1-1-1',
                totalarea: ''
            }
        ]
    }
}
export default houseData