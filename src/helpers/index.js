/**
 * @description 判断当前浏览器内核方法
 * @param {} null
 * @return {String} browserName 浏览器名称
 */
export const browserType = () => {
    const userAgent = navigator.userAgent;
    const isOpera = userAgent.indexOf('Opera') > -1;
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera;
    const isEdge = userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE;
    const isFF = userAgent.indexOf('Firefox') > -1;
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
    const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari');

    if (isFF) {
        return 'FF';
    }
    if (isOpera) {
        return 'Opera';
    }
    if (isSafari) {
        return 'Safari';
    }
    if (isChrome) {
        return 'Chrome';
    }
    if (isEdge) {
        return 'Edge';
    }
};

/**
 * @param {Any} val 待判断类型数据源
 * @description 通过Object.prototype准确判断数据类型
 * @returns {Boolean} isType 待检测数据是否符合预期值
 */
function getPrototype (param) {
    return Object.prototype.toString.call(param).replace(/^\[object\s|\]$/g, '');
};

/**
 * @description 检测目标参数是否为字符串类型
 * @param {String} val 待检测类型参数
 * @return {Boolean} isString 是否为字符串类型
 */
export function isString (val) {
    return getPrototype(val) === 'String';
};

/**
 * @description 检测目标参数是否为数组类型
 * @param {Any[]} arr 待检测类型参数
 * @return {Boolean} isArray 是否为数组类型
 */
export function isArray (arr) {
    return getPrototype(arr) === 'Array';
};

/**
 * @description 检测目标参数是否为数字类型
 * @param {Number}} num 待检测类型参数
 * @return {Boolean} isNumber 是否为数字类型
 */
export function isNumber (num) {
    return getPrototype(num) === 'Number';
};

/**
 * @description 检测目标参数是否为布尔类型
 * @param {Boolean} bool 待检测类型参数
 * @return {Boolean} isBoolean 是否为布尔类型
 */
export function isBoolean (bool) {
    return getPrototype(bool) === 'Boolean';
};

/**
 * @description 检测目标参数是否为object类型
 * @param {String} obj 待检测类型参数
 * @return {Boolean} isObject 是否为object类型
 */
export function isObject (obj) {
    return getPrototype(obj) === 'Object';
};

/**
 * @description 判断目标对象是否为空
 * @param {Object} obj 需判空的对象
 * @returns {Boolean} isEmpty 目标对象是否为空
 */
export function isEmptyObj (obj = {}) {
    return isObject(obj) && Object.keys(obj).length === 0;
};

/**
 * @description 检测目标参数是否为undefined
 * @param {Undefined} tar 待检测类型参数
 * @return {Boolean} isUndefined 是否为undefined
 */
export function isUndefined (tar) {
    return getPrototype(tar) === 'Undefined';
};

/**
 * @description 检测目标参数是否为null
 * @param {Null} tar 待检测类型参数
 * @return {Boolean} isNull 是否为null
 */
export function isNull (tar) {
    return getPrototype(tar) === 'Null';
};

/**
 * @description 检测目标参数是否为symbol类型
 * @param {Symbol} sym 待检测类型参数
 * @return {Boolean} isSymbol 是否为symbol类型
 */
export function isSymbol (sym) {
    return getPrototype(sym) === 'Symbol';
};

/**
 * @description 检测目标参数是否为function类型
 * @param {Function} func 待检测类型参数
 * @return {Boolean} isObject 是否为function类型
 */
export function isFunction (func) {
    return getPrototype(func) === 'Function';
};

/**
 * @param {} null
 * @description 根据当前时间以及随机数生成唯一键
 * @return {String} randomKey 根据执行时间生成唯一键
 */
export function randomKey () {
    return `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
};

/**
 * @description 首字母大写方法
 * @param {String} str 需要转换首字母大写的字符串
 * @return {String} upperCase 首字母大写字符
 */
export function upperCase (str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
};
