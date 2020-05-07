class ITEMData {
    constructor() {
        this.ITEMAdmin = [{
                index: 'Home',
                title: '工作流'
            },
            {
                index: 'Finance',
                title: '融资管理',
                subs: [{
                    index: 'FinanceData',
                    title: '融资合同基础数据',
                    subs: [{
                        index: 'creditType',
                        title: '授信品种'
                    }]
                }]
            }
        ];
        this.ITEMother = [];
    };
}
export default ITEMData