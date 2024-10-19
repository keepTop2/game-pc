
/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
import { NetPacket } from "@/netBase/NetPacket";
import * as Utils from "@/net/Utils";
import { NetEnumDef } from "@/netBase/NetEnumDef";
import { Net } from "@/net/Net";
export const Local = {
	// 设置永久缓存
	set<T>(key: string, val: T) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// 获取永久缓存
	get(key: string) {
		if (window.localStorage.getItem(key)) {
			let json = <string>window.localStorage.getItem(key);
			return JSON.parse(json);
		}

	},
	// 移除永久缓存
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: string) {

		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {

		let json = <string>window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {

		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {

		window.sessionStorage.clear();
	},
};
export const needLoginApi = async () => {
	// 继续登录服务器
	if (Local.get('user')?.token) {
		let tb_req = NetPacket.req_role_login_with_ip();
		tb_req.uid = Local.get('user').user_id;
		tb_req.server_id = 2;
		tb_req.token = Local.get('user').token;
		tb_req.type = NetEnumDef.connect_type.re_connect;
		tb_req.version = NetEnumDef.get_proto_version();
		tb_req.device_id = await Utils.getDeviceId();
		Net.instance.sendRequest(tb_req);

		// 目前观察好像没有什么用，先去掉
		// let req_roleinfo_with_id = NetPacket.req_roleinfo_with_id();
		// req_roleinfo_with_id.id = Local.get('user').user_id;
		// Net.instance.sendRequest(req_roleinfo_with_id);
		let req_user_info = NetPacket.req_user_info();
		Net.instance.sendRequest(req_user_info);
		let vipInfoReq = NetPacket.req_vip_info();
		Net.instance.sendRequest(vipInfoReq);
		// 获取所有收藏id集合

		const query = NetPacket.req_all_collected()
		Net.instance.sendRequest(query);

	}

}

