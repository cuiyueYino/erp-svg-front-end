/**
 * @description 自动注册全局组件
 */
import Vue from 'vue';

// 类型校验
import { isArray, isObject } from 'helpers';

const context = require.context('./global', true, /index.js/);
const keys = context.keys();

keys.forEach(item => {
    const compiledComponent = context(item);
    // 兼容 import default 和 module.export 两种规范
    const matchComponent = compiledComponent.default || compiledComponent;
    if (matchComponent.data) {
        // 导出单个组件
        // 避免遍历组件对象属性 导致注册失败
        Vue.component(matchComponent.name, matchComponent);
    } else {
        if (isObject(matchComponent)) {
            // 如果是对象 则遍历对象下组件 注册全局组件
            for (const key in matchComponent) {
                // eslint-disable-next-line no-prototype-builtins
                if (matchComponent.hasOwnProperty(key)) {
                    const component = matchComponent[key];
                    if (component.name) {
                        Vue.component(component.name, component);
                    }
                }
            }
        } else if (isArray(matchComponent)) {
            // 如果是数组 则遍历数组下组件 注册全局组件
            matchComponent.forEach(component => {
                if (component.name) {
                    Vue.component(component.name, component);
                }
            });
        }
    }
});
