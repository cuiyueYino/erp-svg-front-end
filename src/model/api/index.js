/**
 * api接口的统一出口
 */
import task from './task';
import processSet from './processSet';
import common from './common';
import jobUserManagement from './job-user-management';
import management from './management';
import RoleManagement from './roleManagement';
import SystemSet from './systemset';

// 其他模块的接口……

// 导出接口
export default {
    task,
    processSet,
    common,
    management,
    RoleManagement,
    SystemSet,
    jobUserManagement,
    // ……
};