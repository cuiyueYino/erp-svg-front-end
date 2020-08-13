import Qs from 'qs'
import axios from 'axios';

var _uploadAxios = axios.create({ timeout: 1000 * 60 });
_uploadAxios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// _uploadAxios.defaults.headers.post['Authorization'] = 'bearer 9a00a32c-c59c-471d-8638-297e7f00f7f6';

_uploadAxios.interceptors.request.use(
    config => {
        if(localStorage.getItem('ms_tokenId')){
            config.headers.Authorization = 'bearer '+localStorage.getItem('ms_tokenId');
        }else{
            // config.headers.Authorization = 'bearer ooooooooooooooooooo';
        }
        //config.headers.Accept = 'application/json;charset=utf-8';
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => Promise.error(error)
);

export function post(url, params) {
    return new Promise((resolve, reject) => {
        _uploadAxios
            .post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    }).catch((err) => { console.log(err) });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        _uploadAxios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    }).catch(() => { });
}

export default _uploadAxios;