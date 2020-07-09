/**
 * api接口的统一出口
 */
import task from './task';
import processSet from './processSet';
import common from './common';
import jobUserManagement from './job-user-management';
// 其他模块的接口……

// 导出接口
export default {
    task,
    processSet,
    common,
    jobUserManagement,
    // ……
};