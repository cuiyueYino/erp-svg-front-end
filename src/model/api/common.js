import httpReqest from '../../utils/https';
import QS from 'qs';

const common = {
	// 获取登录人信息
	login: (params) => {
		return httpReqest.post('/api/uaa/oauth/token', QS.stringify(params));
	},
	findMenuByComputer: (params) => {
		return httpReqest.post('/api/interfaces/menu/findMenuByComputer', params);
	},
	getUserInfo() {
		return httpReqest.get('/api/uaa/me');
	}
};

export default common;