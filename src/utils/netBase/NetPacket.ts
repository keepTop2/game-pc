import { EncodeUtils } from "@/utils/net/EncodeUtils";
import { NetMsgType } from "./NetMsgType";

export module NetPacket {
	export function req_check_version() {
		let tb: any = {
			version: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_check_version"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.version, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.version = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_check_version"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function stime() {
		let tb: any = {
			year: 0,
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_stime"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.year, buf);
				EncodeUtils.int32ToByte(tb.month, buf);
				EncodeUtils.int32ToByte(tb.day, buf);
				EncodeUtils.int32ToByte(tb.hour, buf);
				EncodeUtils.int32ToByte(tb.minute, buf);
				EncodeUtils.int32ToByte(tb.second, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.year = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.month = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.day = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.hour = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.minute = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.second = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_stime"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function common_good() {
		let tb: any = {
			type: 0,
			id: 0,
			num: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_common_good"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.int32ToByte(tb.num, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_common_good"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_role_login() {
		let tb: any = {
			uid: '',
			server_id: 0,
			token: '',
			type: 0,
			version: 0,
			device_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_role_login"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.uid, buf);
				EncodeUtils.int32ToByte(tb.server_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.token, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.version, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let uid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uid = uid_value[0];
				startIndex += uid_value[1];
				tb.server_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
				startIndex += token_value[1];
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.version = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let device_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_id = device_id_value[0];
				startIndex += device_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_role_login"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_login_result() {
		let tb: any = {
			id: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_login_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_login_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_check_version() {
		let tb: any = {
			result: 0,
			curtime: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_check_version"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				tb.curtime.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.curtime.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_check_version"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_login_check() {
		let tb: any = {
			uid: '',
			token: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_login_check"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.uid, buf);
				EncodeUtils.utf8StrtoBytes(tb.token, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let uid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uid = uid_value[0];
				startIndex += uid_value[1];
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
				startIndex += token_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_login_check"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_login_check_result() {
		let tb: any = {
			result: 0,
			error_code: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_login_check_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.error_code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.error_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_login_check_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_loading_end() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_loading_end"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_loading_end"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_sys_msg() {
		let tb: any = {
			code: 0,
			type: 0,
			Params: [],
			priority: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_sys_msg"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.uInt16ToByte(tb.Params.length, buf);
				for (let i = 0; i < tb.Params.length; ++i) {
					EncodeUtils.utf8StrtoBytes(tb.Params[i], buf);
				}
				EncodeUtils.int32ToByte(tb.priority, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let Params_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < Params_len; ++i) {
					let Params_value = EncodeUtils.byteToString(buf, startIndex);
					tb.Params.push(Params_value[0]);
					startIndex += Params_value[1];
				}
				tb.priority = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_sys_msg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function pack_item() {
		let tb: any = {
			item_id: 0,
			temp_id: 0,
			item_type: 0,
			amount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_pack_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.item_id, buf);
				EncodeUtils.int32ToByte(tb.temp_id, buf);
				EncodeUtils.int32ToByte(tb.item_type, buf);
				EncodeUtils.int32ToByte(tb.amount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.item_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.temp_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.item_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_pack_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function game_record_item() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			bet_count: 0,
			get_count: 0,
			update_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_game_record_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.bet_count, buf);
				EncodeUtils.int64ToByte(tb.get_count, buf);
				tb.update_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.bet_count = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_count = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.update_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_game_record_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge() {
		let tb: any = {
			order_id: 0,
			user_id: 0,
			role_id: 0,
			charge_from: 0,
			recharge_id: 0,
			channel_id: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.order_id, buf);
				EncodeUtils.int64ToByte(tb.user_id, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.charge_from, buf);
				EncodeUtils.int32ToByte(tb.recharge_id, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.order_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.user_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.charge_from = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.recharge_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buy_mooncard() {
		let tb: any = {
			type: 0,
			recharge_id: 0,
			get_emoney: 0,
			give_emoney: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buy_mooncard"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.recharge_id, buf);
				EncodeUtils.int32ToByte(tb.get_emoney, buf);
				EncodeUtils.int32ToByte(tb.give_emoney, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.recharge_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.get_emoney = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.give_emoney = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buy_mooncard"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_convert_cdkey() {
		let tb: any = {
			award_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_convert_cdkey"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.award_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.award_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_convert_cdkey"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function award_item() {
		let tb: any = {
			temp_id: 0,
			amount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_award_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.temp_id, buf);
				EncodeUtils.int32ToByte(tb.amount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.temp_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_award_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function award_info() {
		let tb: any = {
			award_id: 0,
			award_value: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_award_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.award_id, buf);
				EncodeUtils.int64ToByte(tb.award_value, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.award_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.award_value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_award_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_heartbeat() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_heartbeat"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_heartbeat"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_check_time() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_check_time"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_check_time"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_check_time() {
		let tb: any = {
			curtime: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_check_time"];
			},
			encode: function (buf: any) {
				tb.curtime.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.curtime.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_check_time"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_repeat_login() {
		let tb: any = {
			account: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_repeat_login"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.account, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let account_value = EncodeUtils.byteToString(buf, startIndex);
				tb.account = account_value[0];
				startIndex += account_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_repeat_login"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function cur_rec() {
		let tb: any = {
			currencyid: 0,
			rate: 0,
			desc: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_cur_rec"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.currencyid, buf);
				EncodeUtils.int32ToByte(tb.rate, buf);
				EncodeUtils.utf8StrtoBytes(tb.desc, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.currencyid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desc_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desc = desc_value[0];
				startIndex += desc_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_cur_rec"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_create_role() {
		let tb: any = {
			nickname: '',
			server_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_create_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.server_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.server_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_create_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_create_role_result() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_create_role_result"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_create_role_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_role_info_msg() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_role_info_msg"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_role_info_msg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_roleinfo_msg() {
		let tb: any = {
			id: 0,
			nickname: '',
			head_photo: '',
			money: 0,
			vip_lv: 0,
			sex: 0,
			signature: '',
			mobile: '',
			bank_money: 0,
			password_state: 0,
			agent_level: 0,
			recharge_amount: 0,
			reserve0: 0,
			reserve1: 0,
			reserve2: 0,
			reserve3: 0,
			reserve4: 0,
			withdraw_pwd_status: 0,
			withdraw_pwd: '',
			currencyrate: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_roleinfo_msg"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.vip_lv, buf);
				EncodeUtils.int32ToByte(tb.sex, buf);
				EncodeUtils.utf8StrtoBytes(tb.signature, buf);
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
				EncodeUtils.int64ToByte(tb.bank_money, buf);
				EncodeUtils.int32ToByte(tb.password_state, buf);
				EncodeUtils.int32ToByte(tb.agent_level, buf);
				EncodeUtils.int64ToByte(tb.recharge_amount, buf);
				EncodeUtils.int64ToByte(tb.reserve0, buf);
				EncodeUtils.int64ToByte(tb.reserve1, buf);
				EncodeUtils.int64ToByte(tb.reserve2, buf);
				EncodeUtils.int64ToByte(tb.reserve3, buf);
				EncodeUtils.int64ToByte(tb.reserve4, buf);
				EncodeUtils.int32ToByte(tb.withdraw_pwd_status, buf);
				EncodeUtils.utf8StrtoBytes(tb.withdraw_pwd, buf);
				EncodeUtils.int64ToByte(tb.currencyrate, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let head_photo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo = head_photo_value[0];
				startIndex += head_photo_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.vip_lv = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.signature = signature_value[0];
				startIndex += signature_value[1];
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				tb.bank_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.password_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.agent_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.recharge_amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.reserve0 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.reserve1 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.reserve2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.reserve3 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.reserve4 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.withdraw_pwd_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let withdraw_pwd_value = EncodeUtils.byteToString(buf, startIndex);
				tb.withdraw_pwd = withdraw_pwd_value[0];
				startIndex += withdraw_pwd_value[1];
				tb.currencyrate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_roleinfo_msg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_roleinfo_with_id() {
		let tb: any = {
			id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_roleinfo_with_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_roleinfo_with_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_roleinfo_with_id() {
		let tb: any = {
			id: 0,
			nickname: '',
			head_photo: '',
			money: 0,
			vip_lv: 0,
			sex: 0,
			signature: '',
			bank_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_roleinfo_with_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.vip_lv, buf);
				EncodeUtils.int32ToByte(tb.sex, buf);
				EncodeUtils.utf8StrtoBytes(tb.signature, buf);
				EncodeUtils.int64ToByte(tb.bank_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let head_photo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo = head_photo_value[0];
				startIndex += head_photo_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.vip_lv = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.signature = signature_value[0];
				startIndex += signature_value[1];
				tb.bank_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_roleinfo_with_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_game_reconnect() {
		let tb: any = {
			version: 0,
			user_id: '',
			token: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_game_reconnect"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.version, buf);
				EncodeUtils.utf8StrtoBytes(tb.user_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.token, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.version = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let user_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.user_id = user_id_value[0];
				startIndex += user_id_value[1];
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
				startIndex += token_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_game_reconnect"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_reconnect_result() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_reconnect_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_reconnect_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_money_update() {
		let tb: any = {
			money: 0,
			flag: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_money_update"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.flag, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_money_update"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rename() {
		let tb: any = {
			new_name: '',
			captcha: '',
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rename"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.new_name, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let new_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_name = new_name_value[0];
				startIndex += new_name_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rename"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rename_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rename_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rename_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_select_head_icon() {
		let tb: any = {
			new_head_icon: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_select_head_icon"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.new_head_icon, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let new_head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_head_icon = new_head_icon_value[0];
				startIndex += new_head_icon_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_select_head_icon"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_select_head_icon_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_select_head_icon_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_select_head_icon_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_sex() {
		let tb: any = {
			new_sex: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_sex"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.new_sex, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.new_sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_sex"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_sex_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_sex_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_sex_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_signature() {
		let tb: any = {
			new_signature: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_signature"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.new_signature, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let new_signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_signature = new_signature_value[0];
				startIndex += new_signature_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_signature"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_signature_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_signature_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_signature_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_auto() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_auto"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_auto"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_auto() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_auto"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_auto"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_weixin_id() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_weixin_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_weixin_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_weixin_id_result() {
		let tb: any = {
			weixin_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_weixin_id_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let weixin_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.weixin_id = weixin_id_value[0];
				startIndex += weixin_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_weixin_id_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_weixin_id() {
		let tb: any = {
			new_weixin_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_weixin_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.new_weixin_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let new_weixin_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_weixin_id = new_weixin_id_value[0];
				startIndex += new_weixin_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_weixin_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_weixin_id_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_weixin_id_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_weixin_id_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_set_bank_password() {
		let tb: any = {
			password: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_set_bank_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_set_bank_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_set_bank_password_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_set_bank_password_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_set_bank_password_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_reset_bank_password() {
		let tb: any = {
			old_password: '',
			new_password: '',
			new_password_confirm: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_reset_bank_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let old_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.old_password = old_password_value[0];
				startIndex += old_password_value[1];
				let new_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password = new_password_value[0];
				startIndex += new_password_value[1];
				let new_password_confirm_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password_confirm = new_password_confirm_value[0];
				startIndex += new_password_confirm_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_reset_bank_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_reset_bank_password_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_reset_bank_password_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_reset_bank_password_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_bank_password() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_bank_password"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_bank_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_bank_password_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_bank_password_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_bank_password_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_set_mobile_apply() {
		let tb: any = {
			mobile: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_set_mobile_apply"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_set_mobile_apply"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_set_mobile_apply_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_set_mobile_apply_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_set_mobile_apply_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_set_mobile() {
		let tb: any = {
			verify_code: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_set_mobile"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.verify_code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let verify_code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.verify_code = verify_code_value[0];
				startIndex += verify_code_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_set_mobile"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_set_mobile_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_set_mobile_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_set_mobile_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_auth_bank_password() {
		let tb: any = {
			password: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_auth_bank_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_auth_bank_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_auth_bank_password_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_auth_bank_password_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_auth_bank_password_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_save() {
		let tb: any = {
			money: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_save"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_save"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_save_result() {
		let tb: any = {
			is_success: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_save_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_save_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_take() {
		let tb: any = {
			money: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_take"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_take"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_take_result() {
		let tb: any = {
			is_success: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_take_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_take_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_transfer_apply() {
		let tb: any = {
			role_id: '',
			money: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_transfer_apply"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
				startIndex += role_id_value[1];
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_transfer_apply"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_transfer_apply_result() {
		let tb: any = {
			is_success: 0,
			role_id: 0,
			nickname: '',
			money: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_transfer_apply_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_transfer_apply_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_transfer_confirm() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_transfer_confirm"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_transfer_confirm"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_transfer_confirm_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_transfer_confirm_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_transfer_confirm_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function transfer_log() {
		let tb: any = {
			role_id: 0,
			money: 0,
			nickname: '',
			time: stime(),
			status: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_transfer_log"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				tb.time.encode(buf);
				EncodeUtils.int32ToByte(tb.status, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				startIndex += tb.time.decode(buf, startIndex);
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_transfer_log"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_transfer_log() {
		let tb: any = {
			type: 0,
			page: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_transfer_log"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.page, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_transfer_log"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_transfer_log() {
		let tb: any = {
			type: 0,
			page: 0,
			log_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_transfer_log"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.page, buf);
				EncodeUtils.uInt16ToByte(tb.log_list.length, buf);
				for (let i = 0; i < tb.log_list.length; ++i) {
					tb.log_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let log_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < log_list_len; ++i) {
					let tmp = transfer_log();
					startIndex += tmp.decode(buf, startIndex);
					tb.log_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_transfer_log"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_money_refresh() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_money_refresh"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_money_refresh"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_money_refresh() {
		let tb: any = {
			money: 0,
			bank_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_money_refresh"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.bank_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bank_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_money_refresh"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function agent_item() {
		let tb: any = {
			name: '',
			weixin_id: '',
			role_id: 0,
			qq: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_agent_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.qq, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				let weixin_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.weixin_id = weixin_id_value[0];
				startIndex += weixin_id_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let qq_value = EncodeUtils.byteToString(buf, startIndex);
				tb.qq = qq_value[0];
				startIndex += qq_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_agent_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_agent_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_agent_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_agent_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_agent_list() {
		let tb: any = {
			agent_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_agent_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.agent_list.length, buf);
				for (let i = 0; i < tb.agent_list.length; ++i) {
					tb.agent_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let agent_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < agent_list_len; ++i) {
					let tmp = agent_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.agent_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_agent_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rank_item() {
		let tb: any = {
			rank: 0,
			role_id: 0,
			head_icon: '',
			nickname: '',
			money: 0,
			signature: '',
			weixin_id: '',
			sex: 0,
			qq: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_rank_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rank, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.signature, buf);
				EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
				EncodeUtils.int32ToByte(tb.sex, buf);
				EncodeUtils.utf8StrtoBytes(tb.qq, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
				startIndex += head_icon_value[1];
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.signature = signature_value[0];
				startIndex += signature_value[1];
				let weixin_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.weixin_id = weixin_id_value[0];
				startIndex += weixin_id_value[1];
				tb.sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let qq_value = EncodeUtils.byteToString(buf, startIndex);
				tb.qq = qq_value[0];
				startIndex += qq_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rank_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rank_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rank_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rank_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rank_list() {
		let tb: any = {
			rich_list: [],
			win_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rank_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rich_list.length, buf);
				for (let i = 0; i < tb.rich_list.length; ++i) {
					tb.rich_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.win_list.length, buf);
				for (let i = 0; i < tb.win_list.length; ++i) {
					tb.win_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rich_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rich_list_len; ++i) {
					let tmp = rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rich_list.push(tmp);
				}
				let win_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < win_list_len; ++i) {
					let tmp = rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.win_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rank_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function email() {
		let tb: any = {
			email_id: '',
			type: 0,
			email_type: 0,
			addressor: '',
			title: '',
			content: '',
			attachments: [],
			recv_time: stime(),
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_email"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
				EncodeUtils.uInt8ToByte(tb.type, buf);
				EncodeUtils.uInt8ToByte(tb.email_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.addressor, buf);
				EncodeUtils.utf8StrtoBytes(tb.title, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
				EncodeUtils.uInt16ToByte(tb.attachments.length, buf);
				for (let i = 0; i < tb.attachments.length; ++i) {
					tb.attachments[i].encode(buf);
				}
				tb.recv_time.encode(buf);
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
				startIndex += email_id_value[1];
				tb.type = EncodeUtils.ByteTouInt8(buf, startIndex);
				startIndex += 1;
				tb.email_type = EncodeUtils.ByteTouInt8(buf, startIndex);
				startIndex += 1;
				let addressor_value = EncodeUtils.byteToString(buf, startIndex);
				tb.addressor = addressor_value[0];
				startIndex += addressor_value[1];
				let title_value = EncodeUtils.byteToString(buf, startIndex);
				tb.title = title_value[0];
				startIndex += title_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				let attachments_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < attachments_len; ++i) {
					let tmp = award_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.attachments.push(tmp);
				}
				startIndex += tb.recv_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_email_list() {
		let tb: any = {
			emails: [],
			email_readed: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_email_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.emails.length, buf);
				for (let i = 0; i < tb.emails.length; ++i) {
					tb.emails[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.email_readed.length, buf);
				for (let i = 0; i < tb.email_readed.length; ++i) {
					EncodeUtils.utf8StrtoBytes(tb.email_readed[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let emails_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < emails_len; ++i) {
					let tmp = email();
					startIndex += tmp.decode(buf, startIndex);
					tb.emails.push(tmp);
				}
				let email_readed_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < email_readed_len; ++i) {
					let email_readed_value = EncodeUtils.byteToString(buf, startIndex);
					tb.email_readed.push(email_readed_value[0]);
					startIndex += email_readed_value[1];
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_email_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_email_attachments() {
		let tb: any = {
			email_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_email_attachments"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
				startIndex += email_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_email_attachments"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_email_attachments() {
		let tb: any = {
			email_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_email_attachments"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
				startIndex += email_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_email_attachments"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_new_email() {
		let tb: any = {
			new_email: email(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_new_email"];
			},
			encode: function (buf: any) {
				tb.new_email.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.new_email.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_new_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_read_email() {
		let tb: any = {
			email_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_read_email"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
				startIndex += email_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_read_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_read_email() {
		let tb: any = {
			email_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_read_email"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
				startIndex += email_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_read_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_add_money() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_add_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_add_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_reduce_money() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_reduce_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_reduce_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pay_reward() {
		let tb: any = {
			order_no: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pay_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.order_no, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let order_no_value = EncodeUtils.byteToString(buf, startIndex);
				tb.order_no = order_no_value[0];
				startIndex += order_no_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pay_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pay_reward() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pay_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pay_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_gm_run() {
		let tb: any = {
			gm_cmd: '',
			gm_params: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_gm_run"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.gm_cmd, buf);
				EncodeUtils.uInt16ToByte(tb.gm_params.length, buf);
				for (let i = 0; i < tb.gm_params.length; ++i) {
					EncodeUtils.int32ToByte(tb.gm_params[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let gm_cmd_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gm_cmd = gm_cmd_value[0];
				startIndex += gm_cmd_value[1];
				let gm_params_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < gm_params_len; ++i) {
					tb.gm_params.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_gm_run"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function award_state() {
		let tb: any = {
			type: 0,
			state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_award_state"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_award_state"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_day_task() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_day_task"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_day_task"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function task_msg() {
		let tb: any = {
			task_id: 0,
			cur_times: 0,
			state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_task_msg"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.task_id, buf);
				EncodeUtils.int32ToByte(tb.cur_times, buf);
				EncodeUtils.int32ToByte(tb.state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.cur_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_task_msg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_day_task() {
		let tb: any = {
			task: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_day_task"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.task.length, buf);
				for (let i = 0; i < tb.task.length; ++i) {
					tb.task[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let task_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < task_len; ++i) {
					let tmp = task_msg();
					startIndex += tmp.decode(buf, startIndex);
					tb.task.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_day_task"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_day_task_state() {
		let tb: any = {
			award_states: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_day_task_state"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.award_states.length, buf);
				for (let i = 0; i < tb.award_states.length; ++i) {
					tb.award_states[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let award_states_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < award_states_len; ++i) {
					let tmp = award_state();
					startIndex += tmp.decode(buf, startIndex);
					tb.award_states.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_day_task_state"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_reward() {
		let tb: any = {
			id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_reward() {
		let tb: any = {
			id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_login_award() {
		let tb: any = {
			days: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_login_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.days, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_login_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_login_award() {
		let tb: any = {
			days: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_login_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.days, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_login_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_sign_award() {
		let tb: any = {
			days: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_sign_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.days, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_sign_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_sign_award() {
		let tb: any = {
			days: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_sign_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.days, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_sign_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_weixin_share_task_finish() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_weixin_share_task_finish"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_weixin_share_task_finish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_weixin_share_task_finish() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_weixin_share_task_finish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_weixin_share_task_finish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function shz_item() {
		let tb: any = {
			icon: 0,
			pos: 0,
			is_flash: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_shz_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.icon, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.is_flash, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.icon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_flash = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_shz_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shz_lottery() {
		let tb: any = {
			line: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shz_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shz_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shz_lottery_result() {
		let tb: any = {
			item_list: [],
			lines: [],
			money: 0,
			mali_times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shz_lottery_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					tb.item_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					EncodeUtils.int32ToByte(tb.lines[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.mali_times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					let tmp = shz_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.item_list.push(tmp);
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					tb.lines.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.mali_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shz_lottery_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shz_bibei() {
		let tb: any = {
			bet: 0,
			dice: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shz_bibei"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet, buf);
				EncodeUtils.int32ToByte(tb.dice, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.dice = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shz_bibei"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shz_bibei_result() {
		let tb: any = {
			get_score: 0,
			dice_list: [],
			is_success: 0,
			add_score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shz_bibei_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.get_score, buf);
				EncodeUtils.uInt16ToByte(tb.dice_list.length, buf);
				for (let i = 0; i < tb.dice_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.is_success, buf);
				EncodeUtils.int64ToByte(tb.add_score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.get_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let dice_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_list_len; ++i) {
					tb.dice_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.add_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shz_bibei_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shz_mali() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shz_mali"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shz_mali"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shz_mali_result() {
		let tb: any = {
			get_score: [],
			icon_list: [],
			circle_icon: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shz_mali_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.get_score.length, buf);
				for (let i = 0; i < tb.get_score.length; ++i) {
					EncodeUtils.int64ToByte(tb.get_score[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.icon_list.length, buf);
				for (let i = 0; i < tb.icon_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.icon_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.circle_icon.length, buf);
				for (let i = 0; i < tb.circle_icon.length; ++i) {
					EncodeUtils.int32ToByte(tb.circle_icon[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let get_score_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < get_score_len; ++i) {
					tb.get_score.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let icon_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < icon_list_len; ++i) {
					tb.icon_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let circle_icon_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < circle_icon_len; ++i) {
					tb.circle_icon.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shz_mali_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function room_table() {
		let tb: any = {
			id: '',
			name: '',
			cur_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_room_table"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.int32ToByte(tb.cur_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.id = id_value[0];
				startIndex += id_value[1];
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				tb.cur_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_room_table"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_table_list() {
		let tb: any = {
			room_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_table_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_table_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_table_list() {
		let tb: any = {
			table_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_table_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.table_list.length, buf);
				for (let i = 0; i < tb.table_list.length; ++i) {
					tb.table_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let table_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < table_list_len; ++i) {
					let tmp = room_table();
					startIndex += tmp.decode(buf, startIndex);
					tb.table_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_table_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function room_msg_kv() {
		let tb: any = {
			key: '',
			val: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_room_msg_kv"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.key, buf);
				EncodeUtils.utf8StrtoBytes(tb.val, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.key = key_value[0];
				startIndex += key_value[1];
				let val_value = EncodeUtils.byteToString(buf, startIndex);
				tb.val = val_value[0];
				startIndex += val_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_room_msg_kv"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function room_role_base() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			money: 0,
			head_photo: '',
			gender: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_room_role_base"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
				EncodeUtils.int32ToByte(tb.gender, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_photo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo = head_photo_value[0];
				startIndex += head_photo_value[1];
				tb.gender = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_room_role_base"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_leave_room() {
		let tb: any = {
			param1: '',
			param2: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_leave_room"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.param1, buf);
				EncodeUtils.utf8StrtoBytes(tb.param2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let param1_value = EncodeUtils.byteToString(buf, startIndex);
				tb.param1 = param1_value[0];
				startIndex += param1_value[1];
				let param2_value = EncodeUtils.byteToString(buf, startIndex);
				tb.param2 = param2_value[0];
				startIndex += param2_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_leave_room"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_leave_room_result() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_leave_room_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_leave_room_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_leave_room() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_leave_room"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_leave_room"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_leave_minigame_room() {
		let tb: any = {
			room_type_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_leave_minigame_room"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_leave_minigame_room"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_leave_minigame_room_result() {
		let tb: any = {
			room_type_id: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_leave_minigame_room_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_leave_minigame_room_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_room_msg() {
		let tb: any = {
			msg_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_room_msg"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.msg_list.length, buf);
				for (let i = 0; i < tb.msg_list.length; ++i) {
					tb.msg_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let msg_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < msg_list_len; ++i) {
					let tmp = room_msg_kv();
					startIndex += tmp.decode(buf, startIndex);
					tb.msg_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_room_msg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_enter_room() {
		let tb: any = {
			room_type_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_enter_room"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_enter_room"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_enter_room_result() {
		let tb: any = {
			result: 0,
			room_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_enter_room_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.utf8StrtoBytes(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let room_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.room_id = room_id_value[0];
				startIndex += room_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_enter_room_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_enter_room_with_room_id() {
		let tb: any = {
			room_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_enter_room_with_room_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let room_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.room_id = room_id_value[0];
				startIndex += room_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_enter_room_with_room_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_room_with_room_id_result() {
		let tb: any = {
			result: 0,
			room_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_room_with_room_id_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.utf8StrtoBytes(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let room_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.room_id = room_id_value[0];
				startIndex += room_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_room_with_room_id_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_change_room() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_change_room"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_change_room"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_change_room_result() {
		let tb: any = {
			result: 0,
			room_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_change_room_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.utf8StrtoBytes(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let room_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.room_id = room_id_value[0];
				startIndex += room_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_change_room_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_role_enter() {
		let tb: any = {
			role: room_role_base(),
			pos: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_role_enter"];
			},
			encode: function (buf: any) {
				tb.role.encode(buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.role.decode(buf, startIndex);
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_role_enter"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_role_prepare() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_role_prepare"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_role_prepare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function room_role_money() {
		let tb: any = {
			role_id: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_room_role_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_room_role_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_room_roles_money() {
		let tb: any = {
			roles_money_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_room_roles_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.roles_money_list.length, buf);
				for (let i = 0; i < tb.roles_money_list.length; ++i) {
					tb.roles_money_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let roles_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_money_list_len; ++i) {
					let tmp = room_role_money();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles_money_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_room_roles_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function role_get_money_item() {
		let tb: any = {
			role_id: 0,
			get_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_role_get_money_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.get_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_role_get_money_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh_card_item() {
		let tb: any = {
			type: 0,
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh_card_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh_role_item() {
		let tb: any = {
			role_id: 0,
			sum_bet: 0,
			pos: 0,
			role_status: 0,
			is_card_showed: 0,
			is_give_up: 0,
			is_fail: 0,
			seconds_for_decision: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh_role_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.sum_bet, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.role_status, buf);
				EncodeUtils.int32ToByte(tb.is_card_showed, buf);
				EncodeUtils.int32ToByte(tb.is_give_up, buf);
				EncodeUtils.int32ToByte(tb.is_fail, buf);
				EncodeUtils.int32ToByte(tb.seconds_for_decision, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.sum_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_card_showed = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_give_up = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_fail = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.seconds_for_decision = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh_role_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh_game_role_info() {
		let tb: any = {
			role_id: 0,
			role_base: room_role_base(),
			role_item: zjh_role_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh_game_role_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.role_base.encode(buf);
				tb.role_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.role_base.decode(buf, startIndex);
				startIndex += tb.role_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh_game_role_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_prepare() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_prepare"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_prepare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_allin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_allin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_allin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_see_cards() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_see_cards"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_see_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_apply_compare() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_apply_compare"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_apply_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_compare_role() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_compare_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_compare_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_follow() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_follow"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_follow"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_add_bet() {
		let tb: any = {
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_add_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_add_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh_give_up() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh_give_up"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh_give_up"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_card_item() {
		let tb: any = {
			card_item: zjh_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_card_item"];
			},
			encode: function (buf: any) {
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_room_info() {
		let tb: any = {
			game_status: 0,
			roles: [],
			banker: 0,
			cur_operator: 0,
			cur_total_bet: 0,
			cur_bet: 0,
			chip_link: [],
			rand_seed: 0,
			cur_round: 0,
			start_time: stime(),
			my_card_item: zjh_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				EncodeUtils.uInt16ToByte(tb.roles.length, buf);
				for (let i = 0; i < tb.roles.length; ++i) {
					tb.roles[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.banker, buf);
				EncodeUtils.int64ToByte(tb.cur_operator, buf);
				EncodeUtils.int64ToByte(tb.cur_total_bet, buf);
				EncodeUtils.int64ToByte(tb.cur_bet, buf);
				EncodeUtils.uInt16ToByte(tb.chip_link.length, buf);
				for (let i = 0; i < tb.chip_link.length; ++i) {
					EncodeUtils.int32ToByte(tb.chip_link[i], buf);
				}
				EncodeUtils.int32ToByte(tb.rand_seed, buf);
				EncodeUtils.int32ToByte(tb.cur_round, buf);
				tb.start_time.encode(buf);
				tb.my_card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_len; ++i) {
					let tmp = zjh_game_role_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles.push(tmp);
				}
				tb.banker = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_operator = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_total_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let chip_link_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < chip_link_len; ++i) {
					tb.chip_link.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.rand_seed = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.cur_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.my_card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_game_start() {
		let tb: any = {
			role_ids: [],
			banker_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_game_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.role_ids.length, buf);
				for (let i = 0; i < tb.role_ids.length; ++i) {
					EncodeUtils.int64ToByte(tb.role_ids[i], buf);
				}
				EncodeUtils.int64ToByte(tb.banker_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_ids_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_ids_len; ++i) {
					tb.role_ids.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.banker_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_game_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_round_update() {
		let tb: any = {
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_round_update"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_round_update"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_see_cards() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_see_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_see_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_start_counting() {
		let tb: any = {
			start_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_start_counting"];
			},
			encode: function (buf: any) {
				tb.start_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.start_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_allin() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_allin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_allin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_apply_compare() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_apply_compare"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_apply_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_compare() {
		let tb: any = {
			a_role_id: 0,
			b_role_id: 0,
			win_role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_compare"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.a_role_id, buf);
				EncodeUtils.int64ToByte(tb.b_role_id, buf);
				EncodeUtils.int64ToByte(tb.win_role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.a_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.b_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.win_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_follow() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_follow"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_follow"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_add_bet() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_add_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_add_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_give_up() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_give_up"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_give_up"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_operator_role() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_operator_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_operator_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh_settlement_item() {
		let tb: any = {
			role_id: 0,
			get_score: 0,
			card_item: zjh_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.get_score, buf);
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh_settlement() {
		let tb: any = {
			win_role_id: 0,
			settlement_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh_settlement"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.win_role_id, buf);
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.win_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = zjh_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh_settlement"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dn_card_item() {
		let tb: any = {
			type: 0,
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_dn_card_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dn_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dn_role_item() {
		let tb: any = {
			role_id: 0,
			pos: 0,
			role_status: 0,
			bet_times: 0,
			rob_times_index: 0,
			card_item: dn_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_dn_role_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.role_status, buf);
				EncodeUtils.int32ToByte(tb.bet_times, buf);
				EncodeUtils.int32ToByte(tb.rob_times_index, buf);
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.rob_times_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dn_role_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dn_game_role_info() {
		let tb: any = {
			role_id: 0,
			role_base: room_role_base(),
			role_item: dn_role_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_dn_game_role_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.role_base.encode(buf);
				tb.role_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.role_base.decode(buf, startIndex);
				startIndex += tb.role_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dn_game_role_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_room_info() {
		let tb: any = {
			game_status: 0,
			roles: [],
			bet_base: 0,
			start_time: stime(),
			banker: 0,
			rob_times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				EncodeUtils.uInt16ToByte(tb.roles.length, buf);
				for (let i = 0; i < tb.roles.length; ++i) {
					tb.roles[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.bet_base, buf);
				tb.start_time.encode(buf);
				EncodeUtils.int64ToByte(tb.banker, buf);
				EncodeUtils.int32ToByte(tb.rob_times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_len; ++i) {
					let tmp = dn_game_role_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles.push(tmp);
				}
				tb.bet_base = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				tb.banker = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.rob_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dn_prepare() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dn_prepare"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dn_prepare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_start_counting() {
		let tb: any = {
			start_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_start_counting"];
			},
			encode: function (buf: any) {
				tb.start_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.start_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_game_start() {
		let tb: any = {
			role_ids: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_game_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.role_ids.length, buf);
				for (let i = 0; i < tb.role_ids.length; ++i) {
					EncodeUtils.int64ToByte(tb.role_ids[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_ids_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_ids_len; ++i) {
					tb.role_ids.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_game_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_show_card() {
		let tb: any = {
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_show_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_show_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dn_rob_banker() {
		let tb: any = {
			rob_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dn_rob_banker"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rob_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rob_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dn_rob_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_rob_banker() {
		let tb: any = {
			role_id: 0,
			rob_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_rob_banker"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.rob_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.rob_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_rob_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_rob_banker_result() {
		let tb: any = {
			banker: 0,
			rob_times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_rob_banker_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.banker, buf);
				EncodeUtils.int32ToByte(tb.rob_times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.banker = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.rob_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_rob_banker_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dn_bet_times() {
		let tb: any = {
			bet_times_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dn_bet_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_times_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_times_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dn_bet_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_bet_times() {
		let tb: any = {
			role_id: 0,
			bet_times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_bet_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.bet_times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bet_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_bet_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_all_cards() {
		let tb: any = {
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_all_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_all_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_select_cards_start() {
		let tb: any = {
			select_end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_select_cards_start"];
			},
			encode: function (buf: any) {
				tb.select_end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.select_end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_select_cards_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dn_select_cards() {
		let tb: any = {
			cards_index: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dn_select_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cards_index.length, buf);
				for (let i = 0; i < tb.cards_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards_index[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cards_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_index_len; ++i) {
					tb.cards_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dn_select_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_select_cards() {
		let tb: any = {
			role_id: 0,
			card_item: dn_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_select_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_select_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dn_settlement_item() {
		let tb: any = {
			role_id: 0,
			get_score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dn_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.get_score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dn_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dn_settlement() {
		let tb: any = {
			settlement_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dn_settlement"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = dn_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dn_settlement"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dot21_card_item() {
		let tb: any = {
			cards: [],
			is_stop: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dot21_card_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
				EncodeUtils.int32ToByte(tb.is_stop, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.is_stop = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dot21_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dot21_role_item() {
		let tb: any = {
			role_id: 0,
			pos: 0,
			chip_link: [],
			card1: dot21_card_item(),
			card2: dot21_card_item(),
			is_bought_insurance: 0,
			role_status: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dot21_role_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.uInt16ToByte(tb.chip_link.length, buf);
				for (let i = 0; i < tb.chip_link.length; ++i) {
					EncodeUtils.int32ToByte(tb.chip_link[i], buf);
				}
				tb.card1.encode(buf);
				tb.card2.encode(buf);
				EncodeUtils.int32ToByte(tb.is_bought_insurance, buf);
				EncodeUtils.int32ToByte(tb.role_status, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let chip_link_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < chip_link_len; ++i) {
					tb.chip_link.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				startIndex += tb.card1.decode(buf, startIndex);
				startIndex += tb.card2.decode(buf, startIndex);
				tb.is_bought_insurance = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dot21_role_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dot21_game_role_info() {
		let tb: any = {
			role_id: 0,
			role_base: room_role_base(),
			role_item: dot21_role_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_dot21_game_role_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.role_base.encode(buf);
				tb.role_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.role_base.decode(buf, startIndex);
				startIndex += tb.role_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dot21_game_role_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_room_info() {
		let tb: any = {
			game_status: 0,
			roles: [],
			banker_card: dot21_card_item(),
			start_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				EncodeUtils.uInt16ToByte(tb.roles.length, buf);
				for (let i = 0; i < tb.roles.length; ++i) {
					tb.roles[i].encode(buf);
				}
				tb.banker_card.encode(buf);
				tb.start_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_len; ++i) {
					let tmp = dot21_game_role_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles.push(tmp);
				}
				startIndex += tb.banker_card.decode(buf, startIndex);
				startIndex += tb.start_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_bet() {
		let tb: any = {
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_bet() {
		let tb: any = {
			role_id: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dot21_role_with_card() {
		let tb: any = {
			role_id: 0,
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_dot21_role_with_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dot21_role_with_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_game_start() {
		let tb: any = {
			roles: [],
			is_insurance_open: 0,
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_game_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.roles.length, buf);
				for (let i = 0; i < tb.roles.length; ++i) {
					tb.roles[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.is_insurance_open, buf);
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_len; ++i) {
					let tmp = dot21_role_with_card();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles.push(tmp);
				}
				tb.is_insurance_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_game_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_buy_insurance() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_buy_insurance"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_buy_insurance"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_buy_insurance() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_buy_insurance"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_buy_insurance"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_divide_card() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_divide_card"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_divide_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_divide_card() {
		let tb: any = {
			role_id: 0,
			cards1: [],
			cards2: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_divide_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.uInt16ToByte(tb.cards1.length, buf);
				for (let i = 0; i < tb.cards1.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards1[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.cards2.length, buf);
				for (let i = 0; i < tb.cards2.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards2[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let cards1_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards1_len; ++i) {
					tb.cards1.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let cards2_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards2_len; ++i) {
					tb.cards2.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_divide_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_get_card() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_get_card"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_get_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_get_card() {
		let tb: any = {
			role_id: 0,
			card: 0,
			card_group: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_get_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.card, buf);
				EncodeUtils.int32ToByte(tb.card_group, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card_group = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_get_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_stop_card() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_stop_card"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_stop_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_stop_card() {
		let tb: any = {
			role_id: 0,
			card_group: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_stop_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.card_group, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.card_group = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_stop_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dot21_double_card() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dot21_double_card"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dot21_double_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_double_card() {
		let tb: any = {
			role_id: 0,
			card: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_double_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.card, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_double_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_banker_first_card() {
		let tb: any = {
			card: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_banker_first_card"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.card, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_banker_first_card"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_banker_all_cards() {
		let tb: any = {
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_banker_all_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_banker_all_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dot21_settlement_item() {
		let tb: any = {
			role_id: 0,
			cur_moeny: 0,
			get_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dot21_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.cur_moeny, buf);
				EncodeUtils.int64ToByte(tb.get_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_moeny = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dot21_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buy_insurance_settlement() {
		let tb: any = {
			settlement_list: [],
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buy_insurance_settlement"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = dot21_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buy_insurance_settlement"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dot21_settlement() {
		let tb: any = {
			settlement_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dot21_settlement"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = dot21_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dot21_settlement"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function niu100_pool_info_item() {
		let tb: any = {
			pool_index: 0,
			card_item: dn_card_item(),
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_niu100_pool_info_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				tb.card_item.encode(buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.card_item.decode(buf, startIndex);
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_niu100_pool_info_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function niu100_history_item() {
		let tb: any = {
			result: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_niu100_history_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.result.length, buf);
				for (let i = 0; i < tb.result.length; ++i) {
					EncodeUtils.int32ToByte(tb.result[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < result_len; ++i) {
					tb.result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_niu100_history_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_room_info() {
		let tb: any = {
			game_status: 0,
			start_time: stime(),
			banker: room_role_base(),
			banker_round: 0,
			player_list: [],
			my_bet_info: [],
			pool_info_list: [],
			banker_candidate_list: [],
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				tb.start_time.encode(buf);
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.banker_round, buf);
				EncodeUtils.uInt16ToByte(tb.player_list.length, buf);
				for (let i = 0; i < tb.player_list.length; ++i) {
					tb.player_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_bet_info.length, buf);
				for (let i = 0; i < tb.my_bet_info.length; ++i) {
					EncodeUtils.int64ToByte(tb.my_bet_info[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_candidate_list.length, buf);
				for (let i = 0; i < tb.banker_candidate_list.length; ++i) {
					tb.banker_candidate_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					tb.history_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.banker.decode(buf, startIndex);
				tb.banker_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let player_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.player_list.push(tmp);
				}
				let my_bet_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_bet_info_len; ++i) {
					tb.my_bet_info.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = niu100_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				let banker_candidate_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate_list.push(tmp);
				}
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					let tmp = niu100_history_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_start_beting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_start_beting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_start_beting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function niu100_settlement_item() {
		let tb: any = {
			pool_index: 0,
			is_win: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_niu100_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int32ToByte(tb.is_win, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_win = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_niu100_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_myself_get_money() {
		let tb: any = {
			cur_money: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_myself_get_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_myself_get_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_start_comparing() {
		let tb: any = {
			settlement_list: [],
			pool_info_list: [],
			banker_card_item: dn_card_item(),
			role_get_money_list: [],
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_start_comparing"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				tb.banker_card_item.encode(buf);
				EncodeUtils.uInt16ToByte(tb.role_get_money_list.length, buf);
				for (let i = 0; i < tb.role_get_money_list.length; ++i) {
					tb.role_get_money_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = niu100_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = niu100_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				startIndex += tb.banker_card_item.decode(buf, startIndex);
				let role_get_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_get_money_list_len; ++i) {
					let tmp = role_get_money_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.role_get_money_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_start_comparing"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function niu100_bet_item() {
		let tb: any = {
			role_id: 0,
			money: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_niu100_bet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_niu100_bet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_niu100_bet() {
		let tb: any = {
			bet_index: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_niu100_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_niu100_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_self_bet() {
		let tb: any = {
			bet_info: niu100_bet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_self_bet"];
			},
			encode: function (buf: any) {
				tb.bet_info.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.bet_info.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_bet() {
		let tb: any = {
			bet_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					tb.bet_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					let tmp = niu100_bet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_niu100_banker_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_niu100_banker_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_niu100_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_banker_list() {
		let tb: any = {
			banker_candidate: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_banker_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.banker_candidate.length, buf);
				for (let i = 0; i < tb.banker_candidate.length; ++i) {
					tb.banker_candidate[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let banker_candidate_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_niu100_banker_in() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_niu100_banker_in"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_niu100_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_banker_in() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_banker_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_niu100_banker_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_niu100_banker_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_niu100_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_banker_out() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_banker_out"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_niu100_cur_banker() {
		let tb: any = {
			banker: room_role_base(),
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_niu100_cur_banker"];
			},
			encode: function (buf: any) {
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.banker.decode(buf, startIndex);
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_niu100_cur_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bjl_pool_info_item() {
		let tb: any = {
			pool_index: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bjl_pool_info_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bjl_pool_info_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bjl_history_item() {
		let tb: any = {
			result: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_bjl_history_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.result.length, buf);
				for (let i = 0; i < tb.result.length; ++i) {
					EncodeUtils.int32ToByte(tb.result[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < result_len; ++i) {
					tb.result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bjl_history_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bjl_history_point_item() {
		let tb: any = {
			banker_point: 0,
			player_point: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bjl_history_point_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.banker_point, buf);
				EncodeUtils.int32ToByte(tb.player_point, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.banker_point = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.player_point = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bjl_history_point_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_room_info() {
		let tb: any = {
			game_status: 0,
			start_time: stime(),
			banker: room_role_base(),
			banker_round: 0,
			game_round: 0,
			game_turn: 0,
			player_list: [],
			my_bet_info: [],
			banker_card: [],
			player_card: [],
			pool_info_list: [],
			banker_candidate_list: [],
			history_point_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				tb.start_time.encode(buf);
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.banker_round, buf);
				EncodeUtils.int32ToByte(tb.game_round, buf);
				EncodeUtils.int32ToByte(tb.game_turn, buf);
				EncodeUtils.uInt16ToByte(tb.player_list.length, buf);
				for (let i = 0; i < tb.player_list.length; ++i) {
					tb.player_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_bet_info.length, buf);
				for (let i = 0; i < tb.my_bet_info.length; ++i) {
					EncodeUtils.int64ToByte(tb.my_bet_info[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_card.length, buf);
				for (let i = 0; i < tb.banker_card.length; ++i) {
					EncodeUtils.int32ToByte(tb.banker_card[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.player_card.length, buf);
				for (let i = 0; i < tb.player_card.length; ++i) {
					EncodeUtils.int32ToByte(tb.player_card[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_candidate_list.length, buf);
				for (let i = 0; i < tb.banker_candidate_list.length; ++i) {
					tb.banker_candidate_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_point_list.length, buf);
				for (let i = 0; i < tb.history_point_list.length; ++i) {
					tb.history_point_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.banker.decode(buf, startIndex);
				tb.banker_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_turn = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let player_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.player_list.push(tmp);
				}
				let my_bet_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_bet_info_len; ++i) {
					tb.my_bet_info.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let banker_card_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_card_len; ++i) {
					tb.banker_card.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let player_card_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_card_len; ++i) {
					tb.player_card.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = bjl_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				let banker_candidate_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate_list.push(tmp);
				}
				let history_point_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_point_list_len; ++i) {
					let tmp = bjl_history_point_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_point_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_start_beting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_start_beting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_start_beting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bjl_settlement_item() {
		let tb: any = {
			pool_index: 0,
			is_win: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bjl_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int32ToByte(tb.is_win, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_win = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bjl_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_myself_get_money() {
		let tb: any = {
			cur_money: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_myself_get_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_myself_get_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_start_comparing() {
		let tb: any = {
			settlement_list: [],
			banker_card: [],
			player_card: [],
			role_get_money_list: [],
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_start_comparing"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_card.length, buf);
				for (let i = 0; i < tb.banker_card.length; ++i) {
					EncodeUtils.int32ToByte(tb.banker_card[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.player_card.length, buf);
				for (let i = 0; i < tb.player_card.length; ++i) {
					EncodeUtils.int32ToByte(tb.player_card[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.role_get_money_list.length, buf);
				for (let i = 0; i < tb.role_get_money_list.length; ++i) {
					tb.role_get_money_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = bjl_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				let banker_card_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_card_len; ++i) {
					tb.banker_card.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let player_card_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_card_len; ++i) {
					tb.player_card.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let role_get_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_get_money_list_len; ++i) {
					let tmp = role_get_money_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.role_get_money_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_start_comparing"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bjl_bet_item() {
		let tb: any = {
			role_id: 0,
			money: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bjl_bet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bjl_bet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bjl_bet() {
		let tb: any = {
			bet_index: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bjl_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bjl_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_self_bet() {
		let tb: any = {
			bet_info: bjl_bet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_self_bet"];
			},
			encode: function (buf: any) {
				tb.bet_info.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.bet_info.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_bet() {
		let tb: any = {
			bet_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					tb.bet_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					let tmp = bjl_bet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bjl_banker_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bjl_banker_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bjl_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_banker_list() {
		let tb: any = {
			banker_candidate: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_banker_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.banker_candidate.length, buf);
				for (let i = 0; i < tb.banker_candidate.length; ++i) {
					tb.banker_candidate[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let banker_candidate_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bjl_banker_in() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bjl_banker_in"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bjl_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_banker_in() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_banker_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bjl_banker_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bjl_banker_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bjl_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_banker_out() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_banker_out"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bjl_cur_banker() {
		let tb: any = {
			banker: room_role_base(),
			round: 0,
			get_score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bjl_cur_banker"];
			},
			encode: function (buf: any) {
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int64ToByte(tb.get_score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.banker.decode(buf, startIndex);
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.get_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bjl_cur_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bullet_item() {
		let tb: any = {
			bullet_id: 0,
			bullet_type: 0,
			angle: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bullet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bullet_id, buf);
				EncodeUtils.int32ToByte(tb.bullet_type, buf);
				EncodeUtils.int32ToByte(tb.angle, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bullet_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bullet_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.angle = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bullet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function cannon_item() {
		let tb: any = {
			pos: 0,
			role_id: 0,
			role_base: room_role_base(),
			angle: 0,
			type: 0,
			times: 0,
			target_fish_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_cannon_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.role_base.encode(buf);
				EncodeUtils.int32ToByte(tb.angle, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.times, buf);
				EncodeUtils.int32ToByte(tb.target_fish_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.role_base.decode(buf, startIndex);
				tb.angle = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.target_fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_cannon_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function buyu_fish_item() {
		let tb: any = {
			fish_id: 0,
			fish_tplt_id: 0,
			line_id: 0,
			life_time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_buyu_fish_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.fish_id, buf);
				EncodeUtils.int32ToByte(tb.fish_tplt_id, buf);
				EncodeUtils.int32ToByte(tb.line_id, buf);
				EncodeUtils.int32ToByte(tb.life_time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fish_tplt_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.line_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.life_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_buyu_fish_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_room_info() {
		let tb: any = {
			cannon_list: [],
			bullet_list: [],
			fish_list: [],
			map_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.cannon_list.length, buf);
				for (let i = 0; i < tb.cannon_list.length; ++i) {
					tb.cannon_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.bullet_list.length, buf);
				for (let i = 0; i < tb.bullet_list.length; ++i) {
					tb.bullet_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.fish_list.length, buf);
				for (let i = 0; i < tb.fish_list.length; ++i) {
					tb.fish_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.map_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cannon_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cannon_list_len; ++i) {
					let tmp = cannon_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.cannon_list.push(tmp);
				}
				let bullet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bullet_list_len; ++i) {
					let tmp = bullet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bullet_list.push(tmp);
				}
				let fish_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < fish_list_len; ++i) {
					let tmp = buyu_fish_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.fish_list.push(tmp);
				}
				tb.map_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buyu_shoot() {
		let tb: any = {
			bullet_type: 0,
			angle: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buyu_shoot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bullet_type, buf);
				EncodeUtils.int32ToByte(tb.angle, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bullet_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.angle = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buyu_shoot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_shoot() {
		let tb: any = {
			pos: 0,
			bullet: bullet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_shoot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pos, buf);
				tb.bullet.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.bullet.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_shoot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buyu_update_cannon_times() {
		let tb: any = {
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buyu_update_cannon_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buyu_update_cannon_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_update_cannon_times() {
		let tb: any = {
			pos: 0,
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_update_cannon_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_update_cannon_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buyu_hit_fish() {
		let tb: any = {
			bullet_id: 0,
			fish_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buyu_hit_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bullet_id, buf);
				EncodeUtils.int32ToByte(tb.fish_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bullet_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buyu_hit_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_hit_fish() {
		let tb: any = {
			is_hit: 0,
			bullet_id: 0,
			fish_id_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_hit_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_hit, buf);
				EncodeUtils.int32ToByte(tb.bullet_id, buf);
				EncodeUtils.uInt16ToByte(tb.fish_id_list.length, buf);
				for (let i = 0; i < tb.fish_id_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.fish_id_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_hit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bullet_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let fish_id_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < fish_id_list_len; ++i) {
					tb.fish_id_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_hit_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_fish_spawn() {
		let tb: any = {
			fish_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_fish_spawn"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.fish_list.length, buf);
				for (let i = 0; i < tb.fish_list.length; ++i) {
					tb.fish_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let fish_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < fish_list_len; ++i) {
					let tmp = buyu_fish_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.fish_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_fish_spawn"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_change_map() {
		let tb: any = {
			map_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_change_map"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.map_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.map_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_change_map"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buyu_target_fish() {
		let tb: any = {
			fish_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buyu_target_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.fish_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buyu_target_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_target_fish() {
		let tb: any = {
			role_id: 0,
			fish_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_target_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.fish_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_target_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function texas_role_item() {
		let tb: any = {
			role_id: 0,
			sum_bet: 0,
			pos: 0,
			role_status: 0,
			is_card_showed: 0,
			is_give_up: 0,
			is_fail: 0,
			seconds_for_decision: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_texas_role_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.sum_bet, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.role_status, buf);
				EncodeUtils.int32ToByte(tb.is_card_showed, buf);
				EncodeUtils.int32ToByte(tb.is_give_up, buf);
				EncodeUtils.int32ToByte(tb.is_fail, buf);
				EncodeUtils.int32ToByte(tb.seconds_for_decision, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.sum_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_card_showed = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_give_up = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_fail = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.seconds_for_decision = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_texas_role_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function texas_game_role_info() {
		let tb: any = {
			role_id: 0,
			role_base: room_role_base(),
			role_item: texas_role_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_texas_game_role_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				tb.role_base.encode(buf);
				tb.role_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.role_base.decode(buf, startIndex);
				startIndex += tb.role_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_texas_game_role_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_prepare() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_prepare"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_prepare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_allin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_allin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_allin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_see_cards() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_see_cards"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_see_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_apply_compare() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_apply_compare"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_apply_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_compare_role() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_compare_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_compare_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_follow() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_follow"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_follow"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_add_bet() {
		let tb: any = {
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_add_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_add_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_texas_give_up() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_texas_give_up"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_texas_give_up"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function texas_card_item() {
		let tb: any = {
			type: 0,
			cards: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_texas_card_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.uInt16ToByte(tb.cards.length, buf);
				for (let i = 0; i < tb.cards.length; ++i) {
					EncodeUtils.int32ToByte(tb.cards[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < cards_len; ++i) {
					tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_texas_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_card_item() {
		let tb: any = {
			card_item: texas_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_card_item"];
			},
			encode: function (buf: any) {
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_card_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_room_info() {
		let tb: any = {
			game_status: 0,
			roles: [],
			banker: 0,
			cur_operator: 0,
			cur_total_bet: 0,
			cur_bet: 0,
			chip_link: [],
			rand_seed: 0,
			cur_round: 0,
			start_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				EncodeUtils.uInt16ToByte(tb.roles.length, buf);
				for (let i = 0; i < tb.roles.length; ++i) {
					tb.roles[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.banker, buf);
				EncodeUtils.int64ToByte(tb.cur_operator, buf);
				EncodeUtils.int64ToByte(tb.cur_total_bet, buf);
				EncodeUtils.int64ToByte(tb.cur_bet, buf);
				EncodeUtils.uInt16ToByte(tb.chip_link.length, buf);
				for (let i = 0; i < tb.chip_link.length; ++i) {
					EncodeUtils.int32ToByte(tb.chip_link[i], buf);
				}
				EncodeUtils.int32ToByte(tb.rand_seed, buf);
				EncodeUtils.int32ToByte(tb.cur_round, buf);
				tb.start_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < roles_len; ++i) {
					let tmp = texas_game_role_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.roles.push(tmp);
				}
				tb.banker = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_operator = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_total_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let chip_link_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < chip_link_len; ++i) {
					tb.chip_link.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.rand_seed = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.cur_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_game_start() {
		let tb: any = {
			role_ids: [],
			banker_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_game_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.role_ids.length, buf);
				for (let i = 0; i < tb.role_ids.length; ++i) {
					EncodeUtils.int64ToByte(tb.role_ids[i], buf);
				}
				EncodeUtils.int64ToByte(tb.banker_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_ids_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_ids_len; ++i) {
					tb.role_ids.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.banker_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_game_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_round_update() {
		let tb: any = {
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_round_update"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_round_update"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_see_cards() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_see_cards"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_see_cards"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_start_counting() {
		let tb: any = {
			start_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_start_counting"];
			},
			encode: function (buf: any) {
				tb.start_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.start_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_allin() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_allin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_allin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_apply_compare() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_apply_compare"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_apply_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_compare() {
		let tb: any = {
			a_role_id: 0,
			b_role_id: 0,
			win_role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_compare"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.a_role_id, buf);
				EncodeUtils.int64ToByte(tb.b_role_id, buf);
				EncodeUtils.int64ToByte(tb.win_role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.a_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.b_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.win_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_compare"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_follow() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_follow"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_follow"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_add_bet() {
		let tb: any = {
			role_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_add_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_add_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_give_up() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_give_up"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_give_up"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function texas_settlement_item() {
		let tb: any = {
			role_id: 0,
			get_score: 0,
			card_item: texas_card_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_texas_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.get_score, buf);
				tb.card_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.card_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_texas_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_texas_settlement() {
		let tb: any = {
			win_role_id: 0,
			settlement_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_texas_settlement"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.win_role_id, buf);
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.win_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = texas_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_texas_settlement"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function scratch_item() {
		let tb: any = {
			icon: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_scratch_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.icon, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.icon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_scratch_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_scratch_ticket() {
		let tb: any = {
			room_type_id: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_scratch_ticket"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
				EncodeUtils.int64ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_scratch_ticket"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_scratch_ticket() {
		let tb: any = {
			times_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_scratch_ticket"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.times_list.length, buf);
				for (let i = 0; i < tb.times_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.times_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let times_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < times_list_len; ++i) {
					tb.times_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_scratch_ticket"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_odd_monkey() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_odd_monkey"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_odd_monkey"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_odd_monkey() {
		let tb: any = {
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_odd_monkey"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_odd_monkey"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_odd_monkey_jackpot() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_odd_monkey_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_odd_monkey_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bmw_pool_info_item() {
		let tb: any = {
			pool_index: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bmw_pool_info_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bmw_pool_info_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_room_info() {
		let tb: any = {
			game_status: 0,
			start_time: stime(),
			banker: room_role_base(),
			banker_round: 0,
			player_list: [],
			my_bet_info: [],
			pool_info_list: [],
			banker_candidate_list: [],
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				tb.start_time.encode(buf);
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.banker_round, buf);
				EncodeUtils.uInt16ToByte(tb.player_list.length, buf);
				for (let i = 0; i < tb.player_list.length; ++i) {
					tb.player_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_bet_info.length, buf);
				for (let i = 0; i < tb.my_bet_info.length; ++i) {
					EncodeUtils.int64ToByte(tb.my_bet_info[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_candidate_list.length, buf);
				for (let i = 0; i < tb.banker_candidate_list.length; ++i) {
					tb.banker_candidate_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.banker.decode(buf, startIndex);
				tb.banker_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let player_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.player_list.push(tmp);
				}
				let my_bet_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_bet_info_len; ++i) {
					tb.my_bet_info.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = bmw_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				let banker_candidate_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate_list.push(tmp);
				}
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					tb.history_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_start_beting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_start_beting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_start_beting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_myself_get_money() {
		let tb: any = {
			cur_money: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_myself_get_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_myself_get_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bmw_win_rank_item() {
		let tb: any = {
			nickname: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bmw_win_rank_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bmw_win_rank_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_start_comparing() {
		let tb: any = {
			pool_info_list: [],
			bmw_random_index: 0,
			win_pool_index: 0,
			role_get_money_list: [],
			end_time: stime(),
			rank_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_start_comparing"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.bmw_random_index, buf);
				EncodeUtils.int32ToByte(tb.win_pool_index, buf);
				EncodeUtils.uInt16ToByte(tb.role_get_money_list.length, buf);
				for (let i = 0; i < tb.role_get_money_list.length; ++i) {
					tb.role_get_money_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.rank_list.length, buf);
				for (let i = 0; i < tb.rank_list.length; ++i) {
					tb.rank_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = bmw_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				tb.bmw_random_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.win_pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let role_get_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_get_money_list_len; ++i) {
					let tmp = role_get_money_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.role_get_money_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				let rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_list_len; ++i) {
					let tmp = bmw_win_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_start_comparing"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bmw_bet_item() {
		let tb: any = {
			role_id: 0,
			money: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bmw_bet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bmw_bet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bmw_bet() {
		let tb: any = {
			bet_index: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bmw_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bmw_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_self_bet() {
		let tb: any = {
			bet_info: bmw_bet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_self_bet"];
			},
			encode: function (buf: any) {
				tb.bet_info.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.bet_info.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_bet() {
		let tb: any = {
			bet_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					tb.bet_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					let tmp = bmw_bet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bmw_banker_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bmw_banker_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bmw_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_banker_list() {
		let tb: any = {
			banker_candidate: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_banker_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.banker_candidate.length, buf);
				for (let i = 0; i < tb.banker_candidate.length; ++i) {
					tb.banker_candidate[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let banker_candidate_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bmw_banker_in() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bmw_banker_in"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bmw_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_banker_in() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_banker_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bmw_banker_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bmw_banker_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bmw_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_banker_out() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_banker_out"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bmw_cur_banker() {
		let tb: any = {
			banker: room_role_base(),
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bmw_cur_banker"];
			},
			encode: function (buf: any) {
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.banker.decode(buf, startIndex);
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bmw_cur_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lhdb() {
		let tb: any = {
			bet_index: 0,
			bet_line: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lhdb"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.bet_line, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lhdb"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lhdb() {
		let tb: any = {
			times: 0,
			cur_rate: 0,
			is_get_drill: 0,
			bet_index: 0,
			bet_line: 0,
			remain_brick: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lhdb"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
				EncodeUtils.int32ToByte(tb.cur_rate, buf);
				EncodeUtils.int32ToByte(tb.is_get_drill, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.bet_line, buf);
				EncodeUtils.int32ToByte(tb.remain_brick, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.cur_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_get_drill = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.remain_brick = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lhdb"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lhdb_jackpot() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lhdb_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lhdb_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lhdb_game_save() {
		let tb: any = {
			is_game_save: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lhdb_game_save"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_game_save, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_game_save = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lhdb_game_save"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lhdb_game_save() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lhdb_game_save"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lhdb_game_save"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lhdb_game_info() {
		let tb: any = {
			cur_rate: 0,
			remain_brick: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lhdb_game_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.cur_rate, buf);
				EncodeUtils.int32ToByte(tb.remain_brick, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.remain_brick = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lhdb_game_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_ball() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_ball"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_ball"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_ball() {
		let tb: any = {
			get_money: 0,
			money_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_ball"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.get_money, buf);
				EncodeUtils.uInt16ToByte(tb.money_list.length, buf);
				for (let i = 0; i < tb.money_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.money_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < money_list_len; ++i) {
					tb.money_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_ball"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_huj5() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_huj5"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_huj5"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_huj5() {
		let tb: any = {
			times: 0,
			get_jackpot_index: 0,
			get_jackpot_money: 0,
			box_times_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_huj5"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
				EncodeUtils.int32ToByte(tb.get_jackpot_index, buf);
				EncodeUtils.int64ToByte(tb.get_jackpot_money, buf);
				EncodeUtils.uInt16ToByte(tb.box_times_list.length, buf);
				for (let i = 0; i < tb.box_times_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.box_times_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.get_jackpot_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.get_jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let box_times_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < box_times_list_len; ++i) {
					tb.box_times_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_huj5"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_huj5_jackpot() {
		let tb: any = {
			money: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_huj5_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.money.length, buf);
				for (let i = 0; i < tb.money.length; ++i) {
					EncodeUtils.int64ToByte(tb.money[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < money_len; ++i) {
					tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_huj5_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_return_money_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_return_money_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_return_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_return_money_info() {
		let tb: any = {
			return_money: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_return_money_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.return_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let return_money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.return_money = return_money_value[0];
				startIndex += return_money_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_return_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_return_money() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_return_money"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_return_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_return_money() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_return_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_return_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh100_pool_info_item() {
		let tb: any = {
			pool_index: 0,
			card_item: dn_card_item(),
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh100_pool_info_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				tb.card_item.encode(buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.card_item.decode(buf, startIndex);
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh100_pool_info_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh100_history_item() {
		let tb: any = {
			result: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh100_history_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.result.length, buf);
				for (let i = 0; i < tb.result.length; ++i) {
					EncodeUtils.int32ToByte(tb.result[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < result_len; ++i) {
					tb.result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh100_history_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_room_info() {
		let tb: any = {
			game_status: 0,
			start_time: stime(),
			banker: room_role_base(),
			banker_round: 0,
			player_list: [],
			my_bet_info: [],
			pool_info_list: [],
			banker_candidate_list: [],
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				tb.start_time.encode(buf);
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.banker_round, buf);
				EncodeUtils.uInt16ToByte(tb.player_list.length, buf);
				for (let i = 0; i < tb.player_list.length; ++i) {
					tb.player_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_bet_info.length, buf);
				for (let i = 0; i < tb.my_bet_info.length; ++i) {
					EncodeUtils.int64ToByte(tb.my_bet_info[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_candidate_list.length, buf);
				for (let i = 0; i < tb.banker_candidate_list.length; ++i) {
					tb.banker_candidate_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					tb.history_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.banker.decode(buf, startIndex);
				tb.banker_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let player_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.player_list.push(tmp);
				}
				let my_bet_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_bet_info_len; ++i) {
					tb.my_bet_info.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = zjh100_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				let banker_candidate_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate_list.push(tmp);
				}
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					let tmp = zjh100_history_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_start_beting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_start_beting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_start_beting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh100_settlement_item() {
		let tb: any = {
			pool_index: 0,
			is_win: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh100_settlement_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int32ToByte(tb.is_win, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_win = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh100_settlement_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_myself_get_money() {
		let tb: any = {
			cur_money: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_myself_get_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_myself_get_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_start_comparing() {
		let tb: any = {
			settlement_list: [],
			pool_info_list: [],
			banker_card_item: dn_card_item(),
			role_get_money_list: [],
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_start_comparing"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
				for (let i = 0; i < tb.settlement_list.length; ++i) {
					tb.settlement_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				tb.banker_card_item.encode(buf);
				EncodeUtils.uInt16ToByte(tb.role_get_money_list.length, buf);
				for (let i = 0; i < tb.role_get_money_list.length; ++i) {
					tb.role_get_money_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < settlement_list_len; ++i) {
					let tmp = zjh100_settlement_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.settlement_list.push(tmp);
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = zjh100_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				startIndex += tb.banker_card_item.decode(buf, startIndex);
				let role_get_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_get_money_list_len; ++i) {
					let tmp = role_get_money_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.role_get_money_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_start_comparing"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function zjh100_bet_item() {
		let tb: any = {
			role_id: 0,
			money: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_zjh100_bet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_zjh100_bet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh100_bet() {
		let tb: any = {
			bet_index: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh100_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh100_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_self_bet() {
		let tb: any = {
			bet_info: zjh100_bet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_self_bet"];
			},
			encode: function (buf: any) {
				tb.bet_info.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.bet_info.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_bet() {
		let tb: any = {
			bet_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					tb.bet_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					let tmp = zjh100_bet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh100_banker_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh100_banker_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh100_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_banker_list() {
		let tb: any = {
			banker_candidate: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_banker_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.banker_candidate.length, buf);
				for (let i = 0; i < tb.banker_candidate.length; ++i) {
					tb.banker_candidate[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let banker_candidate_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh100_banker_in() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh100_banker_in"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh100_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_banker_in() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_banker_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zjh100_banker_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zjh100_banker_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zjh100_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_banker_out() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_banker_out"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zjh100_cur_banker() {
		let tb: any = {
			banker: room_role_base(),
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zjh100_cur_banker"];
			},
			encode: function (buf: any) {
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.banker.decode(buf, startIndex);
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zjh100_cur_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_mobile_cancel() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_mobile_cancel"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_mobile_cancel"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_mobile_cancel() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_mobile_cancel"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_mobile_cancel"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function laba_item() {
		let tb: any = {
			icon: 0,
			pos: 0,
			is_flash: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_laba_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.icon, buf);
				EncodeUtils.int32ToByte(tb.pos, buf);
				EncodeUtils.int32ToByte(tb.is_flash, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.icon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_flash = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_laba_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_laba_room_info() {
		let tb: any = {
			free_times: 0,
			lock_bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_laba_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.free_times, buf);
				EncodeUtils.int32ToByte(tb.lock_bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lock_bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_laba_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_laba() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_laba"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_laba"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_laba() {
		let tb: any = {
			money: 0,
			free_times: 0,
			box_times: 0,
			item_list: [],
			lines: [],
			is_box_open: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_laba"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_times, buf);
				EncodeUtils.int32ToByte(tb.box_times, buf);
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					tb.item_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					EncodeUtils.int32ToByte(tb.lines[i], buf);
				}
				EncodeUtils.int32ToByte(tb.is_box_open, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.box_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					let tmp = laba_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.item_list.push(tmp);
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					tb.lines.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.is_box_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_laba"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_slots_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_slots_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_slots_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_slots_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_slots_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_slots_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function msg_kv() {
		let tb: any = {
			key: '',
			val: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_msg_kv"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.key, buf);
				EncodeUtils.uInt16ToByte(tb.val.length, buf);
				for (let i = 0; i < tb.val.length; ++i) {
					EncodeUtils.int32ToByte(tb.val[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.key = key_value[0];
				startIndex += key_value[1];
				let val_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < val_len; ++i) {
					tb.val.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_msg_kv"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function line_item() {
		let tb: any = {
			line: 0,
			pos: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_line_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.pos.length, buf);
				for (let i = 0; i < tb.pos.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_len; ++i) {
					tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_line_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			free_spins: 0,
			bonus: 0,
			extra_info: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.bonus, buf);
				EncodeUtils.uInt16ToByte(tb.extra_info.length, buf);
				for (let i = 0; i < tb.extra_info.length; ++i) {
					tb.extra_info[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bonus = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let extra_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_info_len; ++i) {
					let tmp = msg_kv();
					startIndex += tmp.decode(buf, startIndex);
					tb.extra_info.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function slots_open_box() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_slots_open_box"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_slots_open_box"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_slots_open_box() {
		let tb: any = {
			box_times_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_slots_open_box"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.box_times_list.length, buf);
				for (let i = 0; i < tb.box_times_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.box_times_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let box_times_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < box_times_list_len; ++i) {
					tb.box_times_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_slots_open_box"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jincan_update_cannon_times() {
		let tb: any = {
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jincan_update_cannon_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jincan_update_cannon_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jincan_update_cannon_times() {
		let tb: any = {
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jincan_update_cannon_times"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jincan_update_cannon_times"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jincan_hit_fish() {
		let tb: any = {
			bullet_id: 0,
			bullet_times: 0,
			fish_id: 0,
			fish_tplt_id: 0,
			hit_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jincan_hit_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bullet_id, buf);
				EncodeUtils.int32ToByte(tb.bullet_times, buf);
				EncodeUtils.int32ToByte(tb.fish_id, buf);
				EncodeUtils.int32ToByte(tb.fish_tplt_id, buf);
				EncodeUtils.int32ToByte(tb.hit_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bullet_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bullet_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fish_tplt_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.hit_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jincan_hit_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jincan_hit_fish() {
		let tb: any = {
			bullet_id: 0,
			bullet_times: 0,
			fish_id: 0,
			new_cur_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jincan_hit_fish"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bullet_id, buf);
				EncodeUtils.int32ToByte(tb.bullet_times, buf);
				EncodeUtils.int32ToByte(tb.fish_id, buf);
				EncodeUtils.int64ToByte(tb.new_cur_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bullet_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bullet_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fish_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.new_cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jincan_hit_fish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jincan_banker_money() {
		let tb: any = {
			bank_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jincan_banker_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.bank_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bank_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jincan_banker_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_info() {
		let tb: any = {
			room_type_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_info() {
		let tb: any = {
			bet_index: [],
			free_spins: 0,
			locked_bet: 0,
			win_score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
				EncodeUtils.int64ToByte(tb.win_score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.win_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_spin() {
		let tb: any = {
			bet_index: 0,
			room_type_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_spin() {
		let tb: any = {
			symbol_id: 0,
			acc_win: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.symbol_id, buf);
				EncodeUtils.int64ToByte(tb.acc_win, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.symbol_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.acc_win = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_take_coin() {
		let tb: any = {
			room_type_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_take_coin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_take_coin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_take_coin() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_take_coin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_take_coin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_jackpot() {
		let tb: any = {
			pool_money1: 0,
			pool_money2: 0,
			pool_money3: 0,
			pool_money4: 0,
			pool_money5: 0,
			pool_money6: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.pool_money1, buf);
				EncodeUtils.int64ToByte(tb.pool_money2, buf);
				EncodeUtils.int64ToByte(tb.pool_money3, buf);
				EncodeUtils.int64ToByte(tb.pool_money4, buf);
				EncodeUtils.int64ToByte(tb.pool_money5, buf);
				EncodeUtils.int64ToByte(tb.pool_money6, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_money1 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_money2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_money3 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_money4 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_money5 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_money6 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_get_self_record() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_get_self_record"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_get_self_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_get_self_record() {
		let tb: any = {
			record_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_get_self_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
				for (let i = 0; i < tb.record_item.length; ++i) {
					tb.record_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_item_len; ++i) {
					let tmp = game_record_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_get_self_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_get_all_record() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_get_all_record"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_get_all_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_get_all_record() {
		let tb: any = {
			record_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_get_all_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
				for (let i = 0; i < tb.record_item.length; ++i) {
					tb.record_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_item_len; ++i) {
					let tmp = game_record_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_get_all_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_suggest() {
		let tb: any = {
			suggest: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_suggest"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.suggest, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let suggest_value = EncodeUtils.byteToString(buf, startIndex);
				tb.suggest = suggest_value[0];
				startIndex += suggest_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_suggest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_suggest() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_suggest"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_suggest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pt888_acc_win() {
		let tb: any = {
			room_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pt888_acc_win"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pt888_acc_win"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_pt888_acc_win() {
		let tb: any = {
			acc_win: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_pt888_acc_win"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.acc_win, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.acc_win = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_pt888_acc_win"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jmp_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jmp_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jmp_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jmp_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jmp_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jmp_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jmp_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jmp_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jmp_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jmp_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jmp_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jmp_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_qtds_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_qtds_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_qtds_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_qtds_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			game_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_qtds_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int64ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.int32ToByte(tb.game_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_qtds_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_qtds_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_qtds_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_qtds_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_qtds_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_qtds_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_qtds_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_qtds_free_spin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_qtds_free_spin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_qtds_free_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_qtds_free_spin_result() {
		let tb: any = {
			symbol_list: [],
			money: 0,
			gamestate: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_qtds_free_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.gamestate, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.gamestate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_qtds_free_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_qtds_free_detail() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_qtds_free_detail"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_qtds_free_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_qtds_free_detail_result() {
		let tb: any = {
			fight_list: [],
			free_time: 0,
			bet_index: 0,
			total_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_qtds_free_detail_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.fight_list.length, buf);
				for (let i = 0; i < tb.fight_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.fight_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.free_time, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.total_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let fight_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < fight_list_len; ++i) {
					tb.fight_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_qtds_free_detail_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recommend_role() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recommend_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recommend_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recommend_role() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recommend_role"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recommend_role"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_yiyuan_buy() {
		let tb: any = {
			round: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_yiyuan_buy"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_yiyuan_buy"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_yiyuan_buy() {
		let tb: any = {
			buy_num_list: [],
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_yiyuan_buy"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.buy_num_list.length, buf);
				for (let i = 0; i < tb.buy_num_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.buy_num_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let buy_num_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < buy_num_list_len; ++i) {
					tb.buy_num_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_yiyuan_buy"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_yiyuan_history() {
		let tb: any = {
			room_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_yiyuan_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_yiyuan_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function yiyuan_history_item() {
		let tb: any = {
			round: 0,
			lucky_num: 0,
			money: 0,
			nickname: '',
			buy_role_count: 0,
			time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_yiyuan_history_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int32ToByte(tb.lucky_num, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.buy_role_count, buf);
				tb.time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lucky_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.buy_role_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_yiyuan_history_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_yiyuan_history() {
		let tb: any = {
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_yiyuan_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					tb.history_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					let tmp = yiyuan_history_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_yiyuan_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_yiyuan_self_history() {
		let tb: any = {
			room_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_yiyuan_self_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_yiyuan_self_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function self_history_item() {
		let tb: any = {
			round: 0,
			lucky_num: 0,
			money: 0,
			buy_num_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_self_history_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int32ToByte(tb.lucky_num, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.uInt16ToByte(tb.buy_num_list.length, buf);
				for (let i = 0; i < tb.buy_num_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.buy_num_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lucky_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let buy_num_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < buy_num_list_len; ++i) {
					tb.buy_num_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_self_history_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_yiyuan_self_history() {
		let tb: any = {
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_yiyuan_self_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					tb.history_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					let tmp = self_history_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_yiyuan_self_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_yiyuan_broadcast_round() {
		let tb: any = {
			round: 0,
			remain_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_yiyuan_broadcast_round"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int32ToByte(tb.remain_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.remain_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_yiyuan_broadcast_round"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_yiyuan_broadcast_lottery() {
		let tb: any = {
			round: 0,
			lucky_num: 0,
			lucky_role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_yiyuan_broadcast_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.round, buf);
				EncodeUtils.int32ToByte(tb.lucky_num, buf);
				EncodeUtils.int64ToByte(tb.lucky_role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lucky_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lucky_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_yiyuan_broadcast_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function item_info() {
		let tb: any = {
			item_id: 0,
			item_num: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_item_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.item_id, buf);
				EncodeUtils.int64ToByte(tb.item_num, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.item_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.item_num = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_item_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zhuanpan_info() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zhuanpan_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zhuanpan_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zhuanpan_info() {
		let tb: any = {
			left_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zhuanpan_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.left_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.left_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zhuanpan_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_zhuanpan_start() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_zhuanpan_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_zhuanpan_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_zhuanpan_reward() {
		let tb: any = {
			item: item_info(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_zhuanpan_reward"];
			},
			encode: function (buf: any) {
				tb.item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_zhuanpan_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_help_money_info() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_help_money_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_help_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_help_money_info() {
		let tb: any = {
			left_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_help_money_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.left_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.left_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_help_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_help_money_draw() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_help_money_draw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_help_money_draw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_help_money_draw() {
		let tb: any = {
			status: 0,
			score: 0,
			left_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_help_money_draw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int32ToByte(tb.left_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.left_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_help_money_draw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function game_task_data() {
		let tb: any = {
			task_id: 0,
			game_type: 0,
			task_desc: '',
			cur_count: 0,
			total_count: 0,
			task_reward: 0,
			status: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_game_task_data"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.task_id, buf);
				EncodeUtils.int32ToByte(tb.game_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.task_desc, buf);
				EncodeUtils.int32ToByte(tb.cur_count, buf);
				EncodeUtils.int32ToByte(tb.total_count, buf);
				EncodeUtils.int64ToByte(tb.task_reward, buf);
				EncodeUtils.int32ToByte(tb.status, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let task_desc_value = EncodeUtils.byteToString(buf, startIndex);
				tb.task_desc = task_desc_value[0];
				startIndex += task_desc_value[1];
				tb.cur_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.task_reward = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_game_task_data"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_game_task_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_game_task_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_game_task_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_game_task_list() {
		let tb: any = {
			game_task_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_game_task_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.game_task_list.length, buf);
				for (let i = 0; i < tb.game_task_list.length; ++i) {
					tb.game_task_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let game_task_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < game_task_list_len; ++i) {
					let tmp = game_task_data();
					startIndex += tmp.decode(buf, startIndex);
					tb.game_task_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_game_task_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_game_task_draw() {
		let tb: any = {
			task_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_game_task_draw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.task_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_game_task_draw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_game_task_draw() {
		let tb: any = {
			status: 0,
			task_id: 0,
			score: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_game_task_draw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int32ToByte(tb.task_id, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_game_task_draw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function wx_share_req() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_wx_share_req"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_wx_share_req"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_wx_share() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_wx_share"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_wx_share"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_role_login_with_ip() {
		let tb: any = {
			uid: '',
			server_id: 0,
			token: '',
			type: 0,
			version: 0,
			device_id: '',
			ip: '',
			flag_id: 0,
			flag_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_role_login_with_ip"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.uid, buf);
				EncodeUtils.int32ToByte(tb.server_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.token, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.version, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.int32ToByte(tb.flag_id, buf);
				EncodeUtils.int32ToByte(tb.flag_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let uid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uid = uid_value[0];
				startIndex += uid_value[1];
				tb.server_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
				startIndex += token_value[1];
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.version = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let device_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_id = device_id_value[0];
				startIndex += device_id_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				tb.flag_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.flag_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_role_login_with_ip"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_role_return_money_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_role_return_money_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_role_return_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_role_return_money_info() {
		let tb: any = {
			self_money: 0,
			spread_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_role_return_money_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.self_money, buf);
				EncodeUtils.int64ToByte(tb.spread_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.self_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.spread_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_role_return_money_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_role_return_money() {
		let tb: any = {
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_role_return_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_role_return_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_role_return_money() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_role_return_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_role_return_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_weixin_daily_give_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_weixin_daily_give_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_weixin_daily_give_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_weixin_daily_give_info() {
		let tb: any = {
			times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_weixin_daily_give_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_weixin_daily_give_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_weixin_daily_give() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_weixin_daily_give"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_weixin_daily_give"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_weixin_daily_give() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_weixin_daily_give"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_weixin_daily_give"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_account_verify_code() {
		let tb: any = {
			mobile: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_account_verify_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_account_verify_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_account_verify_code() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_account_verify_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_account_verify_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_account() {
		let tb: any = {
			password: '',
			verify_code: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.utf8StrtoBytes(tb.verify_code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				let verify_code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.verify_code = verify_code_value[0];
				startIndex += verify_code_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_account() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_invite_time_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_invite_time_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_invite_time_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_invite_time_out() {
		let tb: any = {
			time_out: stime(),
			is_time_out: 0,
			invite_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_invite_time_out"];
			},
			encode: function (buf: any) {
				tb.time_out.encode(buf);
				EncodeUtils.int32ToByte(tb.is_time_out, buf);
				EncodeUtils.int32ToByte(tb.invite_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.time_out.decode(buf, startIndex);
				tb.is_time_out = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.invite_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_invite_time_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function sign_in_cfg() {
		let tb: any = {
			day: 0,
			reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_sign_in_cfg"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.day, buf);
				EncodeUtils.int64ToByte(tb.reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.day = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.reward = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_sign_in_cfg"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_sign_in_config() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_sign_in_config"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_sign_in_config"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_sign_in_list() {
		let tb: any = {
			sign_in_cfgs_0: [],
			sign_in_cfgs_1: [],
			sign_type: 0,
			count: 0,
			is_sign_in: 0,
			is_15day_sign_in: 0,
			is_28day_sign_in: 0,
			extra_15day_reward_0: 0,
			extra_28day_reward_0: 0,
			extra_15day_reward_1: 0,
			extra_28day_reward_1: 0,
			bet_count: 0,
			total_bet_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_sign_in_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.sign_in_cfgs_0.length, buf);
				for (let i = 0; i < tb.sign_in_cfgs_0.length; ++i) {
					tb.sign_in_cfgs_0[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.sign_in_cfgs_1.length, buf);
				for (let i = 0; i < tb.sign_in_cfgs_1.length; ++i) {
					tb.sign_in_cfgs_1[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.sign_type, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
				EncodeUtils.int32ToByte(tb.is_sign_in, buf);
				EncodeUtils.int32ToByte(tb.is_15day_sign_in, buf);
				EncodeUtils.int32ToByte(tb.is_28day_sign_in, buf);
				EncodeUtils.int64ToByte(tb.extra_15day_reward_0, buf);
				EncodeUtils.int64ToByte(tb.extra_28day_reward_0, buf);
				EncodeUtils.int64ToByte(tb.extra_15day_reward_1, buf);
				EncodeUtils.int64ToByte(tb.extra_28day_reward_1, buf);
				EncodeUtils.int32ToByte(tb.bet_count, buf);
				EncodeUtils.int32ToByte(tb.total_bet_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let sign_in_cfgs_0_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < sign_in_cfgs_0_len; ++i) {
					let tmp = sign_in_cfg();
					startIndex += tmp.decode(buf, startIndex);
					tb.sign_in_cfgs_0.push(tmp);
				}
				let sign_in_cfgs_1_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < sign_in_cfgs_1_len; ++i) {
					let tmp = sign_in_cfg();
					startIndex += tmp.decode(buf, startIndex);
					tb.sign_in_cfgs_1.push(tmp);
				}
				tb.sign_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_sign_in = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_15day_sign_in = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_28day_sign_in = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.extra_15day_reward_0 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.extra_28day_reward_0 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.extra_15day_reward_1 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.extra_28day_reward_1 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bet_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_bet_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_sign_in_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_sign_in() {
		let tb: any = {
			sign_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_sign_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.sign_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.sign_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_sign_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_sign_in() {
		let tb: any = {
			result: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_sign_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_sign_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buyu_shoot_list() {
		let tb: any = {
			shoot_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buyu_shoot_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.shoot_list.length, buf);
				for (let i = 0; i < tb.shoot_list.length; ++i) {
					tb.shoot_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let shoot_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < shoot_list_len; ++i) {
					let tmp = notify_buyu_shoot();
					startIndex += tmp.decode(buf, startIndex);
					tb.shoot_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buyu_shoot_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_gif() {
		let tb: any = {
			id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_gif"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_gif"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_whether_can_open_red_packet() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_whether_can_open_red_packet"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_whether_can_open_red_packet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_whether_can_open_red_packet() {
		let tb: any = {
			is_can_open: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_whether_can_open_red_packet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_can_open, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_can_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_whether_can_open_red_packet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_open_red_packet() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_open_red_packet"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_open_red_packet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_open_red_packet() {
		let tb: any = {
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_open_red_packet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_open_red_packet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_info() {
		let tb: any = {
			bet_list: [],
			mult_list: [],
			min_bet: 0,
			fuzi_level: 0,
			bet_index: 0,
			mult_index: 0,
			pool_list: [],
			open_prize: 0,
			game_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.mult_list.length, buf);
				for (let i = 0; i < tb.mult_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.mult_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.min_bet, buf);
				EncodeUtils.int32ToByte(tb.fuzi_level, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.mult_index, buf);
				EncodeUtils.uInt16ToByte(tb.pool_list.length, buf);
				for (let i = 0; i < tb.pool_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.pool_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.open_prize, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					tb.bet_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let mult_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < mult_list_len; ++i) {
					tb.mult_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.fuzi_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pool_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_list_len; ++i) {
					tb.pool_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.open_prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_spin() {
		let tb: any = {
			bet_index: 0,
			mult_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.mult_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_spin_result() {
		let tb: any = {
			symbol_list: [],
			money: 0,
			free_time: 0,
			fuzi_level: 0,
			is_prize: 0,
			pool_list: [],
			prize_num: 0,
			prize_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_time, buf);
				EncodeUtils.int32ToByte(tb.fuzi_level, buf);
				EncodeUtils.int32ToByte(tb.is_prize, buf);
				EncodeUtils.uInt16ToByte(tb.pool_list.length, buf);
				for (let i = 0; i < tb.pool_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.pool_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.prize_num, buf);
				EncodeUtils.int64ToByte(tb.prize_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fuzi_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pool_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_list_len; ++i) {
					tb.pool_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.prize_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.prize_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_free_spin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_free_spin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_free_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_free_spin_result() {
		let tb: any = {
			symbol_list: [],
			money: 0,
			total_money: 0,
			free_time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_free_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.total_money, buf);
				EncodeUtils.int32ToByte(tb.free_time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_free_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_free_detail() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_free_detail"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_free_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_free_detail_result() {
		let tb: any = {
			free_time: 0,
			bet_index: 0,
			mult_index: 0,
			pool_index: 0,
			total_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_free_detail_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.free_time, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.mult_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int64ToByte(tb.total_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_free_detail_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_prize_pool_refresh() {
		let tb: any = {
			pool_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_prize_pool_refresh"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.pool_list.length, buf);
				for (let i = 0; i < tb.pool_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.pool_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let pool_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_list_len; ++i) {
					tb.pool_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_prize_pool_refresh"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_milu_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_milu_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_milu_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_milu_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_milu_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int64ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_milu_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_milu_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_milu_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_milu_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_milu_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			left_free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_milu_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.left_free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_milu_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_spin_result_whiteBones() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			free_spins: 0,
			bonus: 0,
			extra_info: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_spin_result_whiteBones"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.bonus, buf);
				EncodeUtils.uInt16ToByte(tb.extra_info.length, buf);
				for (let i = 0; i < tb.extra_info.length; ++i) {
					tb.extra_info[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bonus = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let extra_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_info_len; ++i) {
					let tmp = msg_kv();
					startIndex += tmp.decode(buf, startIndex);
					tb.extra_info.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_spin_result_whiteBones"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_knight_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_knight_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_knight_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_knight_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			symbol_list: [],
			game_state: 0,
			score: 0,
			totalscore: 0,
			combos: 0,
			free_game_total_times: 0,
			free_game_remain_times: 0,
			free_game_combos: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_knight_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int64ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.totalscore, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
				EncodeUtils.int32ToByte(tb.free_game_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_remain_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_combos, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalscore = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_knight_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_knight_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_knight_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_knight_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_knight_spin_result() {
		let tb: any = {
			symbol_list: [],
			pos_list: [],
			column_list: [],
			bet_index: 0,
			score: 0,
			totalscore: 0,
			game_state: 0,
			combos: 0,
			dragon_treasure: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_knight_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pos_list.length, buf);
				for (let i = 0; i < tb.pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.column_list.length, buf);
				for (let i = 0; i < tb.column_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.column_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.totalscore, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
				EncodeUtils.int32ToByte(tb.dragon_treasure, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_list_len; ++i) {
					tb.pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let column_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < column_list_len; ++i) {
					tb.column_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalscore = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.dragon_treasure = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_knight_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_knight_free_game_select() {
		let tb: any = {
			free_game_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_knight_free_game_select"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.free_game_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_game_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_knight_free_game_select"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_knight_free_game_select() {
		let tb: any = {
			symbol: 0,
			free_spins: 0,
			game_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_knight_free_game_select"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.symbol, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.symbol = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_knight_free_game_select"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_knight_free_game_spin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_knight_free_game_spin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_knight_free_game_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_knight_free_game_spin_result() {
		let tb: any = {
			symbol_list: [],
			pos_list: [],
			column_list: [],
			score: 0,
			totalscore: 0,
			game_state: 0,
			combos: 0,
			free_game_combos: 0,
			free_game_total_times: 0,
			free_game_remain_times: 0,
			dragon_treasure: 0,
			normal_symbol_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_knight_free_game_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pos_list.length, buf);
				for (let i = 0; i < tb.pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.column_list.length, buf);
				for (let i = 0; i < tb.column_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.column_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.totalscore, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
				EncodeUtils.int32ToByte(tb.free_game_combos, buf);
				EncodeUtils.int32ToByte(tb.free_game_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_remain_times, buf);
				EncodeUtils.int32ToByte(tb.dragon_treasure, buf);
				EncodeUtils.uInt16ToByte(tb.normal_symbol_list.length, buf);
				for (let i = 0; i < tb.normal_symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.normal_symbol_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_list_len; ++i) {
					tb.pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let column_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < column_list_len; ++i) {
					tb.column_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalscore = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.dragon_treasure = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let normal_symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < normal_symbol_list_len; ++i) {
					tb.normal_symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_knight_free_game_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_open_prize() {
		let tb: any = {
			skin_index: [],
			click_index: [],
			is_open: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_open_prize"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.skin_index.length, buf);
				for (let i = 0; i < tb.skin_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.skin_index[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.click_index.length, buf);
				for (let i = 0; i < tb.click_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.click_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.is_open, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let skin_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < skin_index_len; ++i) {
					tb.skin_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let click_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < click_index_len; ++i) {
					tb.click_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_open_prize"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_open_prize_result() {
		let tb: any = {
			is_open: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_open_prize_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_open_prize_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dcdf_open_prize_detail() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dcdf_open_prize_detail"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dcdf_open_prize_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dcdf_open_prize_detail_result() {
		let tb: any = {
			skin_index: [],
			click_index: [],
			pool_list: [],
			prize_num: 0,
			prize_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dcdf_open_prize_detail_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.skin_index.length, buf);
				for (let i = 0; i < tb.skin_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.skin_index[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.click_index.length, buf);
				for (let i = 0; i < tb.click_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.click_index[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_list.length, buf);
				for (let i = 0; i < tb.pool_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.pool_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.prize_num, buf);
				EncodeUtils.int64ToByte(tb.prize_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let skin_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < skin_index_len; ++i) {
					tb.skin_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let click_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < click_index_len; ++i) {
					tb.click_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pool_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_list_len; ++i) {
					tb.pool_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.prize_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.prize_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dcdf_open_prize_detail_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jump_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jump_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jump_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jump_info() {
		let tb: any = {
			mult_list: [],
			min_bet: 0,
			game_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jump_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.mult_list.length, buf);
				for (let i = 0; i < tb.mult_list.length; ++i) {
					EncodeUtils.int64ToByte(tb.mult_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.min_bet, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mult_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < mult_list_len; ++i) {
					tb.mult_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jump_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jump_spin() {
		let tb: any = {
			mult_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jump_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.mult_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jump_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jump_spin_result() {
		let tb: any = {
			symbol_list: [],
			money: 0,
			free_time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jump_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jump_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jump_free_spin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jump_free_spin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jump_free_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jump_free_spin_result() {
		let tb: any = {
			symbol_list: [],
			add_mult: 0,
			money: 0,
			total_money: 0,
			free_time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jump_free_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.add_mult, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.total_money, buf);
				EncodeUtils.int32ToByte(tb.free_time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.add_mult = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jump_free_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_jump_free_detail() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_jump_free_detail"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_jump_free_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_jump_free_detail_result() {
		let tb: any = {
			free_time: 0,
			mult_index: 0,
			total_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_jump_free_detail_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.free_time, buf);
				EncodeUtils.int32ToByte(tb.mult_index, buf);
				EncodeUtils.int64ToByte(tb.total_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_jump_free_detail_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rank_item_bet() {
		let tb: any = {
			rank: 0,
			role_id: 0,
			head_icon: '',
			nickname: '',
			sex: 0,
			score: 0,
			money: 0,
			has_reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rank_item_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rank, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.sex, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.has_reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
				startIndex += head_icon_value[1];
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rank_item_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rank_bet() {
		let tb: any = {
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rank_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rank_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rank_bet() {
		let tb: any = {
			type: 0,
			rank_item: [],
			self_rank_item: rank_item_bet(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rank_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
				for (let i = 0; i < tb.rank_item.length; ++i) {
					tb.rank_item[i].encode(buf);
				}
				tb.self_rank_item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_item_len; ++i) {
					let tmp = rank_item_bet();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_item.push(tmp);
				}
				startIndex += tb.self_rank_item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rank_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rank_getreward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rank_getreward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rank_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rank_getreward() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rank_getreward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rank_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_qq() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_qq"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_qq"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_qq_result() {
		let tb: any = {
			qq: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_qq_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.qq, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let qq_value = EncodeUtils.byteToString(buf, startIndex);
				tb.qq = qq_value[0];
				startIndex += qq_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_qq_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_update_qq() {
		let tb: any = {
			new_qq: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_update_qq"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.new_qq, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let new_qq_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_qq = new_qq_value[0];
				startIndex += new_qq_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_update_qq"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_qq_result() {
		let tb: any = {
			is_success: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_qq_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_success, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_qq_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_three_little_pigs_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_three_little_pigs_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_three_little_pigs_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_three_little_pigs_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			symbol_list: [],
			pos_list: [],
			pigs_replace_pos_list: [],
			wolf_replace_pos_list: [],
			game_state: 0,
			score: 0,
			combos: 0,
			free_game_total_times: 0,
			free_game_remain_times: 0,
			free_game_combos: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_three_little_pigs_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int64ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pos_list.length, buf);
				for (let i = 0; i < tb.pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pigs_replace_pos_list.length, buf);
				for (let i = 0; i < tb.pigs_replace_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pigs_replace_pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.wolf_replace_pos_list.length, buf);
				for (let i = 0; i < tb.wolf_replace_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.wolf_replace_pos_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
				EncodeUtils.int32ToByte(tb.free_game_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_remain_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_combos, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_list_len; ++i) {
					tb.pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pigs_replace_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pigs_replace_pos_list_len; ++i) {
					tb.pigs_replace_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let wolf_replace_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < wolf_replace_pos_list_len; ++i) {
					tb.wolf_replace_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_three_little_pigs_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_three_little_pigs_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_three_little_pigs_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_three_little_pigs_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_three_little_pigs_spin_result() {
		let tb: any = {
			symbol_list: [],
			pos_list: [],
			pigs_replace_pos_list: [],
			bet_index: 0,
			score: 0,
			totalscore: 0,
			game_state: 0,
			combos: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_three_little_pigs_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pos_list.length, buf);
				for (let i = 0; i < tb.pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pigs_replace_pos_list.length, buf);
				for (let i = 0; i < tb.pigs_replace_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pigs_replace_pos_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.totalscore, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_list_len; ++i) {
					tb.pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pigs_replace_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pigs_replace_pos_list_len; ++i) {
					tb.pigs_replace_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalscore = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_three_little_pigs_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_three_little_pigs_free_game_spin() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_three_little_pigs_free_game_spin"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_three_little_pigs_free_game_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_three_little_pigs_free_game_spin_result() {
		let tb: any = {
			symbol_list: [],
			pos_list: [],
			pigs_replace_pos_list: [],
			wolf_replace_pos_list: [],
			score: 0,
			totalscore: 0,
			game_state: 0,
			normal_combos: 0,
			combos: 0,
			free_game_total_times: 0,
			free_game_remain_times: 0,
			normal_symbol_list: [],
			normal_pos_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_three_little_pigs_free_game_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pos_list.length, buf);
				for (let i = 0; i < tb.pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pigs_replace_pos_list.length, buf);
				for (let i = 0; i < tb.pigs_replace_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.pigs_replace_pos_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.wolf_replace_pos_list.length, buf);
				for (let i = 0; i < tb.wolf_replace_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.wolf_replace_pos_list[i], buf);
				}
				EncodeUtils.int64ToByte(tb.score, buf);
				EncodeUtils.int64ToByte(tb.totalscore, buf);
				EncodeUtils.int32ToByte(tb.game_state, buf);
				EncodeUtils.int32ToByte(tb.normal_combos, buf);
				EncodeUtils.int32ToByte(tb.combos, buf);
				EncodeUtils.int32ToByte(tb.free_game_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_game_remain_times, buf);
				EncodeUtils.uInt16ToByte(tb.normal_symbol_list.length, buf);
				for (let i = 0; i < tb.normal_symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.normal_symbol_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.normal_pos_list.length, buf);
				for (let i = 0; i < tb.normal_pos_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.normal_pos_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_list_len; ++i) {
					tb.pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pigs_replace_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pigs_replace_pos_list_len; ++i) {
					tb.pigs_replace_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let wolf_replace_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < wolf_replace_pos_list_len; ++i) {
					tb.wolf_replace_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalscore = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.normal_combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.combos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_game_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let normal_symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < normal_symbol_list_len; ++i) {
					tb.normal_symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let normal_pos_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < normal_pos_list_len; ++i) {
					tb.normal_pos_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_three_little_pigs_free_game_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function fruit_mali_line_item() {
		let tb: any = {
			line: 0,
			pos: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_fruit_mali_line_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.pos.length, buf);
				for (let i = 0; i < tb.pos.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_len; ++i) {
					tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_fruit_mali_line_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fruit_mali_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fruit_mali_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fruit_mali_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fruit_mali_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			bet_cost: 0,
			item_list: [],
			lines: [],
			free_total_times: 0,
			free_remain_times: 0,
			jackpot_money: 0,
			get_score: [],
			icon_list: [],
			circle_icon: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fruit_mali_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int64ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.int64ToByte(tb.bet_cost, buf);
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.item_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.free_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_remain_times, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
				EncodeUtils.uInt16ToByte(tb.get_score.length, buf);
				for (let i = 0; i < tb.get_score.length; ++i) {
					EncodeUtils.int64ToByte(tb.get_score[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.icon_list.length, buf);
				for (let i = 0; i < tb.icon_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.icon_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.circle_icon.length, buf);
				for (let i = 0; i < tb.circle_icon.length; ++i) {
					EncodeUtils.int32ToByte(tb.circle_icon[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.bet_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					tb.item_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = fruit_mali_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.free_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let get_score_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < get_score_len; ++i) {
					tb.get_score.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let icon_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < icon_list_len; ++i) {
					tb.icon_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let circle_icon_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < circle_icon_len; ++i) {
					tb.circle_icon.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fruit_mali_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fruit_mali_jackpot() {
		let tb: any = {
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fruit_mali_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fruit_mali_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fruit_mali_lottery() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fruit_mali_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fruit_mali_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fruit_mali_lottery_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			free_spins: 0,
			mali_times: 0,
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fruit_mali_lottery_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.mali_times, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = fruit_mali_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.mali_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fruit_mali_lottery_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fruit_mali_mali() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fruit_mali_mali"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fruit_mali_mali"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fruit_mali_mali_result() {
		let tb: any = {
			get_score: [],
			icon_list: [],
			circle_icon: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fruit_mali_mali_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.get_score.length, buf);
				for (let i = 0; i < tb.get_score.length; ++i) {
					EncodeUtils.int64ToByte(tb.get_score[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.icon_list.length, buf);
				for (let i = 0; i < tb.icon_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.icon_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.circle_icon.length, buf);
				for (let i = 0; i < tb.circle_icon.length; ++i) {
					EncodeUtils.int32ToByte(tb.circle_icon[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let get_score_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < get_score_len; ++i) {
					tb.get_score.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let icon_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < icon_list_len; ++i) {
					tb.icon_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let circle_icon_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < circle_icon_len; ++i) {
					tb.circle_icon.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fruit_mali_mali_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fruit_mali_mali_finish() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fruit_mali_mali_finish"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fruit_mali_mali_finish"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function fqzs_pool_info_item() {
		let tb: any = {
			pool_index: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_fqzs_pool_info_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pool_index, buf);
				EncodeUtils.int64ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_fqzs_pool_info_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_room_info() {
		let tb: any = {
			game_status: 0,
			start_time: stime(),
			banker: room_role_base(),
			banker_round: 0,
			player_list: [],
			my_bet_info: [],
			pool_info_list: [],
			banker_candidate_list: [],
			history_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_room_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_status, buf);
				tb.start_time.encode(buf);
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.banker_round, buf);
				EncodeUtils.uInt16ToByte(tb.player_list.length, buf);
				for (let i = 0; i < tb.player_list.length; ++i) {
					tb.player_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_bet_info.length, buf);
				for (let i = 0; i < tb.my_bet_info.length; ++i) {
					EncodeUtils.int32ToByte(tb.my_bet_info[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.banker_candidate_list.length, buf);
				for (let i = 0; i < tb.banker_candidate_list.length; ++i) {
					tb.banker_candidate_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_list.length, buf);
				for (let i = 0; i < tb.history_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.banker.decode(buf, startIndex);
				tb.banker_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let player_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < player_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.player_list.push(tmp);
				}
				let my_bet_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_bet_info_len; ++i) {
					tb.my_bet_info.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = fqzs_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				let banker_candidate_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_list_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate_list.push(tmp);
				}
				let history_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_list_len; ++i) {
					tb.history_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_room_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_start_counting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_start_counting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_start_counting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_start_beting() {
		let tb: any = {
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_start_beting"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_start_beting"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_myself_get_money() {
		let tb: any = {
			cur_money: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_myself_get_money"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_myself_get_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function fqzs_win_rank_item() {
		let tb: any = {
			nickname: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_fqzs_win_rank_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_fqzs_win_rank_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_start_comparing() {
		let tb: any = {
			pool_info_list: [],
			fqzs_random_index: 0,
			win_pool_index: 0,
			role_get_money_list: [],
			end_time: stime(),
			rank_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_start_comparing"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.pool_info_list.length, buf);
				for (let i = 0; i < tb.pool_info_list.length; ++i) {
					tb.pool_info_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.fqzs_random_index, buf);
				EncodeUtils.int32ToByte(tb.win_pool_index, buf);
				EncodeUtils.uInt16ToByte(tb.role_get_money_list.length, buf);
				for (let i = 0; i < tb.role_get_money_list.length; ++i) {
					tb.role_get_money_list[i].encode(buf);
				}
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.rank_list.length, buf);
				for (let i = 0; i < tb.rank_list.length; ++i) {
					tb.rank_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let pool_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pool_info_list_len; ++i) {
					let tmp = fqzs_pool_info_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.pool_info_list.push(tmp);
				}
				tb.fqzs_random_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.win_pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let role_get_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < role_get_money_list_len; ++i) {
					let tmp = role_get_money_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.role_get_money_list.push(tmp);
				}
				startIndex += tb.end_time.decode(buf, startIndex);
				let rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_list_len; ++i) {
					let tmp = fqzs_win_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_start_comparing"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function fqzs_bet_item() {
		let tb: any = {
			role_id: 0,
			money: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_fqzs_bet_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_fqzs_bet_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fqzs_bet() {
		let tb: any = {
			bet_index: 0,
			pool_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fqzs_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int32ToByte(tb.pool_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pool_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fqzs_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_self_bet() {
		let tb: any = {
			bet_info: fqzs_bet_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_self_bet"];
			},
			encode: function (buf: any) {
				tb.bet_info.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.bet_info.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_bet() {
		let tb: any = {
			bet_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_list.length, buf);
				for (let i = 0; i < tb.bet_list.length; ++i) {
					tb.bet_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_list_len; ++i) {
					let tmp = fqzs_bet_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fqzs_banker_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fqzs_banker_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fqzs_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_banker_list() {
		let tb: any = {
			banker_candidate: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_banker_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.banker_candidate.length, buf);
				for (let i = 0; i < tb.banker_candidate.length; ++i) {
					tb.banker_candidate[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let banker_candidate_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < banker_candidate_len; ++i) {
					let tmp = room_role_base();
					startIndex += tmp.decode(buf, startIndex);
					tb.banker_candidate.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_banker_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fqzs_banker_in() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fqzs_banker_in"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fqzs_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_banker_in() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_banker_in"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_banker_in"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fqzs_banker_out() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fqzs_banker_out"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fqzs_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_banker_out() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_banker_out"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_banker_out"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_cur_banker() {
		let tb: any = {
			banker: room_role_base(),
			round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_cur_banker"];
			},
			encode: function (buf: any) {
				tb.banker.encode(buf);
				EncodeUtils.int32ToByte(tb.round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.banker.decode(buf, startIndex);
				tb.round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_cur_banker"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fqzs_bank_list_have_real_player() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fqzs_bank_list_have_real_player"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fqzs_bank_list_have_real_player"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_milu2_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_milu2_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_milu2_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_milu2_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_milu2_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int64ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_milu2_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_milu2_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_milu2_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_milu2_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_milu2_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			left_free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_milu2_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.left_free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_milu2_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nine_line_line_item() {
		let tb: any = {
			line: 0,
			pos: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_nine_line_line_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.pos.length, buf);
				for (let i = 0; i < tb.pos.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_len; ++i) {
					tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nine_line_line_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_nine_line_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_nine_line_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_nine_line_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_nine_line_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			bet_cost: 0,
			item_list: [],
			lines: [],
			free_remain_times: 0,
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_nine_line_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int64ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.int64ToByte(tb.bet_cost, buf);
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.item_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.free_remain_times, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.bet_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					tb.item_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = nine_line_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.free_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_nine_line_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_nine_line_jackpot() {
		let tb: any = {
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_nine_line_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_nine_line_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_nine_line_lottery() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_nine_line_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_nine_line_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_nine_line_lottery_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			free_spins: 0,
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_nine_line_lottery_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = nine_line_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_nine_line_lottery_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rebate_item_bet() {
		let tb: any = {
			gameType: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rebate_item_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.gameType, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.gameType = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rebate_item_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bet_rebate() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bet_rebate"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bet_rebate"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bet_rebate() {
		let tb: any = {
			today_rebate_item: [],
			yesterday_rebate_item: [],
			has_reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bet_rebate"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.today_rebate_item.length, buf);
				for (let i = 0; i < tb.today_rebate_item.length; ++i) {
					tb.today_rebate_item[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.yesterday_rebate_item.length, buf);
				for (let i = 0; i < tb.yesterday_rebate_item.length; ++i) {
					tb.yesterday_rebate_item[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.has_reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let today_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < today_rebate_item_len; ++i) {
					let tmp = rebate_item_bet();
					startIndex += tmp.decode(buf, startIndex);
					tb.today_rebate_item.push(tmp);
				}
				let yesterday_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < yesterday_rebate_item_len; ++i) {
					let tmp = rebate_item_bet();
					startIndex += tmp.decode(buf, startIndex);
					tb.yesterday_rebate_item.push(tmp);
				}
				tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bet_rebate"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rebate_getreward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rebate_getreward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rebate_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rebate_getreward() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rebate_getreward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rebate_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rebate_all_item_bet() {
		let tb: any = {
			gameType: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rebate_all_item_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.gameType, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let gameType_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameType = gameType_value[0];
				startIndex += gameType_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rebate_all_item_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rebate_to_date() {
		let tb: any = {
			rebate_date: 0,
			rebate_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rebate_to_date"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rebate_date, buf);
				EncodeUtils.int64ToByte(tb.rebate_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rebate_date = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.rebate_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rebate_to_date"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rebate_benefit_status() {
		let tb: any = {
			rebate_money: 0,
			has_reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rebate_benefit_status"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.rebate_money, buf);
				EncodeUtils.int32ToByte(tb.has_reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rebate_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rebate_benefit_status"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bet_rebate_all_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bet_rebate_all_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bet_rebate_all_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bet_rebate_all_info() {
		let tb: any = {
			first_rebate_benefit: rebate_to_date(),
			second_rebate_benefit: rebate_to_date(),
			third_rebate_benefit: rebate_to_date(),
			total_rebate: 0,
			has_reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bet_rebate_all_info"];
			},
			encode: function (buf: any) {
				tb.first_rebate_benefit.encode(buf);
				tb.second_rebate_benefit.encode(buf);
				tb.third_rebate_benefit.encode(buf);
				EncodeUtils.int64ToByte(tb.total_rebate, buf);
				EncodeUtils.int32ToByte(tb.has_reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.first_rebate_benefit.decode(buf, startIndex);
				startIndex += tb.second_rebate_benefit.decode(buf, startIndex);
				startIndex += tb.third_rebate_benefit.decode(buf, startIndex);
				tb.total_rebate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bet_rebate_all_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bet_rebate_all_details() {
		let tb: any = {
			rebate_date: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bet_rebate_all_details"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rebate_date, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rebate_date = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bet_rebate_all_details"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bet_rebate_all_details() {
		let tb: any = {
			today_rebate_item: [],
			total_rebate: 0,
			first_rebate_benefit: rebate_benefit_status(),
			second_rebate_benefit: rebate_benefit_status(),
			third_rebate_benefit: rebate_benefit_status(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bet_rebate_all_details"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.today_rebate_item.length, buf);
				for (let i = 0; i < tb.today_rebate_item.length; ++i) {
					tb.today_rebate_item[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.total_rebate, buf);
				tb.first_rebate_benefit.encode(buf);
				tb.second_rebate_benefit.encode(buf);
				tb.third_rebate_benefit.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let today_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < today_rebate_item_len; ++i) {
					let tmp = rebate_all_item_bet();
					startIndex += tmp.decode(buf, startIndex);
					tb.today_rebate_item.push(tmp);
				}
				tb.total_rebate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.first_rebate_benefit.decode(buf, startIndex);
				startIndex += tb.second_rebate_benefit.decode(buf, startIndex);
				startIndex += tb.third_rebate_benefit.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bet_rebate_all_details"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rebate_all_getreward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rebate_all_getreward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rebate_all_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rebate_all_getreward() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rebate_all_getreward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rebate_all_getreward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function vip_reward_status() {
		let tb: any = {
			status: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_vip_reward_status"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_vip_reward_status"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function vip_level_config() {
		let tb: any = {
			level: 0,
			target_bet_money: 0,
			promotional_reward_status: vip_reward_status(),
			gift_money_amount: 0,
			ratio: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_vip_level_config"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int64ToByte(tb.target_bet_money, buf);
				tb.promotional_reward_status.encode(buf);
				EncodeUtils.int64ToByte(tb.gift_money_amount, buf);
				EncodeUtils.utf8StrtoBytes(tb.ratio, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.target_bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.promotional_reward_status.decode(buf, startIndex);
				tb.gift_money_amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let ratio_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ratio = ratio_value[0];
				startIndex += ratio_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_vip_level_config"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_vip_info() {
		let tb: any = {
			total_bet_money: 0,
			current_vip_level: 0,
			last_month_vip_level: 0,
			gift_money_status: vip_reward_status(),
			holiday_reward_status: vip_reward_status(),
			mysterious_reward_status: 0,
			vip_level_reward_config: [],
			daily_rebate: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_vip_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.total_bet_money, buf);
				EncodeUtils.int32ToByte(tb.current_vip_level, buf);
				EncodeUtils.int32ToByte(tb.last_month_vip_level, buf);
				tb.gift_money_status.encode(buf);
				tb.holiday_reward_status.encode(buf);
				EncodeUtils.int32ToByte(tb.mysterious_reward_status, buf);
				EncodeUtils.uInt16ToByte(tb.vip_level_reward_config.length, buf);
				for (let i = 0; i < tb.vip_level_reward_config.length; ++i) {
					tb.vip_level_reward_config[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.daily_rebate, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.current_vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.last_month_vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.gift_money_status.decode(buf, startIndex);
				startIndex += tb.holiday_reward_status.decode(buf, startIndex);
				tb.mysterious_reward_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let vip_level_reward_config_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < vip_level_reward_config_len; ++i) {
					let tmp = vip_level_config();
					startIndex += tmp.decode(buf, startIndex);
					tb.vip_level_reward_config.push(tmp);
				}
				tb.daily_rebate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_vip_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_claim_promotional_reward() {
		let tb: any = {
			vip_level: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_claim_promotional_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.vip_level, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_claim_promotional_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_claim_gift_money() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_claim_gift_money"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_claim_gift_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_claim_holiday_reward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_claim_holiday_reward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_claim_holiday_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_claim_mysterious_reward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_claim_mysterious_reward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_claim_mysterious_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_vip_claim_status() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_vip_claim_status"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_vip_claim_status"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_level() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_level"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_level"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_vip_level() {
		let tb: any = {
			vip_level: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_vip_level"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.vip_level, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_vip_level"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function new_rank_item() {
		let tb: any = {
			rank: 0,
			role_id: 0,
			head_icon: '',
			nickname: '',
			vip_level: 0,
			game_type: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_new_rank_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rank, buf);
				EncodeUtils.int32ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.vip_level, buf);
				EncodeUtils.int32ToByte(tb.game_type, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
				startIndex += head_icon_value[1];
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_new_rank_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_new_rank_list() {
		let tb: any = {
			room_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_new_rank_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_new_rank_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_new_rank_list() {
		let tb: any = {
			room_type: 0,
			room_rank_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_new_rank_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.room_type, buf);
				EncodeUtils.uInt16ToByte(tb.room_rank_list.length, buf);
				for (let i = 0; i < tb.room_rank_list.length; ++i) {
					tb.room_rank_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.room_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let room_rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < room_rank_list_len; ++i) {
					let tmp = new_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.room_rank_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_new_rank_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bank_card_info() {
		let tb: any = {
			bank_id: 0,
			bank_name: '',
			account_number: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_bank_card_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bank_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.bank_name, buf);
				EncodeUtils.utf8StrtoBytes(tb.account_number, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bank_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bank_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_name = bank_name_value[0];
				startIndex += bank_name_value[1];
				let account_number_value = EncodeUtils.byteToString(buf, startIndex);
				tb.account_number = account_number_value[0];
				startIndex += account_number_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bank_card_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_card_info_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_card_info_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_card_info_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bank_card_info_list() {
		let tb: any = {
			cardholder_name: '',
			bank_card_info_list: [],
			min_withdraw_money: 0,
			max_withdraw_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bank_card_info_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.cardholder_name, buf);
				EncodeUtils.uInt16ToByte(tb.bank_card_info_list.length, buf);
				for (let i = 0; i < tb.bank_card_info_list.length; ++i) {
					tb.bank_card_info_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.min_withdraw_money, buf);
				EncodeUtils.int32ToByte(tb.max_withdraw_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let cardholder_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.cardholder_name = cardholder_name_value[0];
				startIndex += cardholder_name_value[1];
				let bank_card_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bank_card_info_list_len; ++i) {
					let tmp = bank_card_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.bank_card_info_list.push(tmp);
				}
				tb.min_withdraw_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.max_withdraw_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bank_card_info_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_new_bank_card_info() {
		let tb: any = {
			bank_id: 0,
			cardholder_name: '',
			account_number: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_new_bank_card_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bank_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.cardholder_name, buf);
				EncodeUtils.utf8StrtoBytes(tb.account_number, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bank_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let cardholder_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.cardholder_name = cardholder_name_value[0];
				startIndex += cardholder_name_value[1];
				let account_number_value = EncodeUtils.byteToString(buf, startIndex);
				tb.account_number = account_number_value[0];
				startIndex += account_number_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_new_bank_card_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_req_new_bank_card_info() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_req_new_bank_card_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_req_new_bank_card_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bank_info() {
		let tb: any = {
			bank_id: 0,
			bank_name: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_bank_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bank_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.bank_name, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bank_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bank_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_name = bank_name_value[0];
				startIndex += bank_name_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bank_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bank_name_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bank_name_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bank_name_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_req_bank_name_list() {
		let tb: any = {
			bank_name_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_req_bank_name_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bank_name_list.length, buf);
				for (let i = 0; i < tb.bank_name_list.length; ++i) {
					tb.bank_name_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bank_name_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bank_name_list_len; ++i) {
					let tmp = bank_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.bank_name_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_req_bank_name_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function recharge_record() {
		let tb: any = {
			way_id: 0,
			pay_money: 0,
			order_status: 0,
			pay_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_recharge_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.way_id, buf);
				EncodeUtils.int64ToByte(tb.pay_money, buf);
				EncodeUtils.int32ToByte(tb.order_status, buf);
				tb.pay_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.way_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pay_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.order_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.pay_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_recharge_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function withdraw_record() {
		let tb: any = {
			id: 0,
			trans_id: '',
			money: 0,
			bank_card_id: '',
			createtime: stime(),
			status: 0,
			remark: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_withdraw_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.trans_id, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.bank_card_id, buf);
				tb.createtime.encode(buf);
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.utf8StrtoBytes(tb.remark, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let trans_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.trans_id = trans_id_value[0];
				startIndex += trans_id_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bank_card_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_card_id = bank_card_id_value[0];
				startIndex += bank_card_id_value[1];
				startIndex += tb.createtime.decode(buf, startIndex);
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let remark_value = EncodeUtils.byteToString(buf, startIndex);
				tb.remark = remark_value[0];
				startIndex += remark_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_withdraw_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_recharge_record_list() {
		let tb: any = {
			page: 0,
			start_time: stime(),
			end_time: stime(),
			status: 0,
			currency: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_recharge_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int32ToByte(tb.currency, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.currency = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_recharge_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_recharge_record_list() {
		let tb: any = {
			total_page: 0,
			recharge_record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_recharge_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_page, buf);
				EncodeUtils.uInt16ToByte(tb.recharge_record_list.length, buf);
				for (let i = 0; i < tb.recharge_record_list.length; ++i) {
					tb.recharge_record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let recharge_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < recharge_record_list_len; ++i) {
					let tmp = recharge_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.recharge_record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_recharge_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_apply_withdraw() {
		let tb: any = {
			money: '',
			bank_card_id: '',
			bank_id: 0,
			way: 0,
			passwd: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_apply_withdraw"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.bank_card_id, buf);
				EncodeUtils.int32ToByte(tb.bank_id, buf);
				EncodeUtils.int32ToByte(tb.way, buf);
				EncodeUtils.utf8StrtoBytes(tb.passwd, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				let bank_card_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_card_id = bank_card_id_value[0];
				startIndex += bank_card_id_value[1];
				tb.bank_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.way = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let passwd_value = EncodeUtils.byteToString(buf, startIndex);
				tb.passwd = passwd_value[0];
				startIndex += passwd_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_apply_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_apply_withdraw() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_apply_withdraw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_apply_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_cancel_apply_withdraw() {
		let tb: any = {
			id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_cancel_apply_withdraw"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.id = id_value[0];
				startIndex += id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_cancel_apply_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_cancel_apply_withdraw() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_cancel_apply_withdraw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_cancel_apply_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_withdraw_record_list() {
		let tb: any = {
			page: 0,
			start_time: stime(),
			end_time: stime(),
			status: 0,
			currency: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_withdraw_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int32ToByte(tb.currency, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.currency = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_withdraw_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_withdraw_record_list() {
		let tb: any = {
			total_page: 0,
			withdraw_record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_withdraw_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_page, buf);
				EncodeUtils.uInt16ToByte(tb.withdraw_record_list.length, buf);
				for (let i = 0; i < tb.withdraw_record_list.length; ++i) {
					tb.withdraw_record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let withdraw_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < withdraw_record_list_len; ++i) {
					let tmp = recharge_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.withdraw_record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_withdraw_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_accounting_change_record_list() {
		let tb: any = {
			page: 0,
			start_time: stime(),
			end_time: stime(),
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_accounting_change_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_accounting_change_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function accounting_change_record() {
		let tb: any = {
			type: 0,
			b_type: 0,
			pay_money: 0,
			item: 0,
			create_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_accounting_change_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.b_type, buf);
				EncodeUtils.int64ToByte(tb.pay_money, buf);
				EncodeUtils.int32ToByte(tb.item, buf);
				tb.create_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.b_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pay_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.item = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.create_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_accounting_change_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_accounting_change_record_list() {
		let tb: any = {
			total_page: 0,
			record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_accounting_change_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_page, buf);
				EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
				for (let i = 0; i < tb.record_list.length; ++i) {
					tb.record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_list_len; ++i) {
					let tmp = accounting_change_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_accounting_change_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_captain_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_captain_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_captain_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_captain_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_captain_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_captain_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_captain_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_captain_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_captain_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_captain_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			left_free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_captain_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.left_free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_captain_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function gfxm_symbol_item() {
		let tb: any = {
			time: 0,
			symbol_array: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_gfxm_symbol_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.time, buf);
				EncodeUtils.uInt16ToByte(tb.symbol_array.length, buf);
				for (let i = 0; i < tb.symbol_array.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_array[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let symbol_array_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_array_len; ++i) {
					tb.symbol_array.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_gfxm_symbol_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_gfxm_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_gfxm_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_gfxm_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_gfxm_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_gfxm_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_gfxm_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_gfxm_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_gfxm_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_gfxm_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_gfxm_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			free_money: 0,
			free_symbol_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_gfxm_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int64ToByte(tb.free_money, buf);
				EncodeUtils.uInt16ToByte(tb.free_symbol_list.length, buf);
				for (let i = 0; i < tb.free_symbol_list.length; ++i) {
					tb.free_symbol_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let free_symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < free_symbol_list_len; ++i) {
					let tmp = gfxm_symbol_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.free_symbol_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_gfxm_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function lucky_lion_line_item() {
		let tb: any = {
			line: 0,
			pos: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_lucky_lion_line_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.pos.length, buf);
				for (let i = 0; i < tb.pos.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_len; ++i) {
					tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_lucky_lion_line_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function lucky_lion_extra_game() {
		let tb: any = {
			extra_symbol_list: [],
			extraTimes: 0,
			extra_lines: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_lucky_lion_extra_game"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.extra_symbol_list.length, buf);
				for (let i = 0; i < tb.extra_symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.extra_symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.extraTimes, buf);
				EncodeUtils.uInt16ToByte(tb.extra_lines.length, buf);
				for (let i = 0; i < tb.extra_lines.length; ++i) {
					tb.extra_lines[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let extra_symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_symbol_list_len; ++i) {
					tb.extra_symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.extraTimes = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let extra_lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_lines_len; ++i) {
					let tmp = lucky_lion_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.extra_lines.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_lucky_lion_extra_game"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lucky_lion_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lucky_lion_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lucky_lion_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_lion_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			bet_cost: 0,
			item_list: [],
			lines: [],
			lucky_jackpot: 0,
			caideng_jackpot: 0,
			xiuqiu_jackpot: 0,
			caideng_count: 0,
			xiuqiu_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_lion_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int32ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.int64ToByte(tb.bet_cost, buf);
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.item_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.lucky_jackpot, buf);
				EncodeUtils.int64ToByte(tb.caideng_jackpot, buf);
				EncodeUtils.int64ToByte(tb.xiuqiu_jackpot, buf);
				EncodeUtils.int32ToByte(tb.caideng_count, buf);
				EncodeUtils.int32ToByte(tb.xiuqiu_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					tb.item_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = lucky_lion_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.lucky_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.caideng_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.xiuqiu_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.caideng_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.xiuqiu_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_lion_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lucky_lion_lottery() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lucky_lion_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lucky_lion_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_lion_lottery_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			allsame_times: 0,
			lucky_jackpot: 0,
			caideng_jackpot: 0,
			xiuqiu_jackpot: 0,
			caideng_count: 0,
			xiuqiu_count: 0,
			hit_lucky_jackpot: 0,
			hit_caideng_jackpot: 0,
			hit_xiuqiu_jackpot: 0,
			extra_caideng_score: 0,
			extra_xiuqiu_score: 0,
			extra_caideng: [],
			extra_xiuqiu: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_lion_lottery_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.allsame_times, buf);
				EncodeUtils.int64ToByte(tb.lucky_jackpot, buf);
				EncodeUtils.int64ToByte(tb.caideng_jackpot, buf);
				EncodeUtils.int64ToByte(tb.xiuqiu_jackpot, buf);
				EncodeUtils.int32ToByte(tb.caideng_count, buf);
				EncodeUtils.int32ToByte(tb.xiuqiu_count, buf);
				EncodeUtils.int64ToByte(tb.hit_lucky_jackpot, buf);
				EncodeUtils.int64ToByte(tb.hit_caideng_jackpot, buf);
				EncodeUtils.int64ToByte(tb.hit_xiuqiu_jackpot, buf);
				EncodeUtils.int64ToByte(tb.extra_caideng_score, buf);
				EncodeUtils.int64ToByte(tb.extra_xiuqiu_score, buf);
				EncodeUtils.uInt16ToByte(tb.extra_caideng.length, buf);
				for (let i = 0; i < tb.extra_caideng.length; ++i) {
					tb.extra_caideng[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.extra_xiuqiu.length, buf);
				for (let i = 0; i < tb.extra_xiuqiu.length; ++i) {
					tb.extra_xiuqiu[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = lucky_lion_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.allsame_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.lucky_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.caideng_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.xiuqiu_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.caideng_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.xiuqiu_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.hit_lucky_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.hit_caideng_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.hit_xiuqiu_jackpot = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.extra_caideng_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.extra_xiuqiu_score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let extra_caideng_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_caideng_len; ++i) {
					let tmp = lucky_lion_extra_game();
					startIndex += tmp.decode(buf, startIndex);
					tb.extra_caideng.push(tmp);
				}
				let extra_xiuqiu_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < extra_xiuqiu_len; ++i) {
					let tmp = lucky_lion_extra_game();
					startIndex += tmp.decode(buf, startIndex);
					tb.extra_xiuqiu.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_lion_lottery_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_level_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_level_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_level_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_level_info() {
		let tb: any = {
			cur_recharge: 0,
			next_level: 0,
			award_value: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_level_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.cur_recharge, buf);
				EncodeUtils.int32ToByte(tb.next_level, buf);
				EncodeUtils.int64ToByte(tb.award_value, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cur_recharge = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.next_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.award_value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_level_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_level_award() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_level_award"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_level_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_level_award() {
		let tb: any = {
			res: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_level_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.res, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.res = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_level_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_level_day_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_level_day_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_level_day_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_level_day_info() {
		let tb: any = {
			level: 0,
			award_value: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_level_day_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int64ToByte(tb.award_value, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.award_value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_level_day_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_level_day_award() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_level_day_award"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_level_day_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_level_day_award() {
		let tb: any = {
			res: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_level_day_award"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.res, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.res = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_level_day_award"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function wucaishen_line_item() {
		let tb: any = {
			line: 0,
			pos: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_wucaishen_line_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.pos.length, buf);
				for (let i = 0; i < tb.pos.length; ++i) {
					EncodeUtils.int32ToByte(tb.pos[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pos_len; ++i) {
					tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_wucaishen_line_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_wucaishen_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_wucaishen_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_wucaishen_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_wucaishen_info() {
		let tb: any = {
			line: 0,
			betlist: [],
			bet_cost: 0,
			item_list: [],
			lines: [],
			free_total_times: 0,
			free_remain_times: 0,
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_wucaishen_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
				for (let i = 0; i < tb.betlist.length; ++i) {
					EncodeUtils.int32ToByte(tb.betlist[i], buf);
				}
				EncodeUtils.int64ToByte(tb.bet_cost, buf);
				EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
				for (let i = 0; i < tb.item_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.item_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.free_total_times, buf);
				EncodeUtils.int32ToByte(tb.free_remain_times, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betlist_len; ++i) {
					tb.betlist.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < item_list_len; ++i) {
					tb.item_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = wucaishen_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.free_total_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_remain_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_wucaishen_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_wucaishen_jackpot() {
		let tb: any = {
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_wucaishen_jackpot"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_wucaishen_jackpot"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_wucaishen_lottery() {
		let tb: any = {
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_wucaishen_lottery"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_wucaishen_lottery"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_wucaishen_lottery_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			lines: [],
			money: 0,
			free_spins: 0,
			jackpot_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_wucaishen_lottery_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.uInt16ToByte(tb.lines.length, buf);
				for (let i = 0; i < tb.lines.length; ++i) {
					tb.lines[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int64ToByte(tb.jackpot_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < lines_len; ++i) {
					let tmp = wucaishen_line_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.lines.push(tmp);
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_wucaishen_lottery_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_buy_vip() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_buy_vip"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_buy_vip"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_buy_vip() {
		let tb: any = {
			result: 0,
			time_out: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_buy_vip"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				tb.time_out.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.time_out.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_buy_vip"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_signin_extra_reward() {
		let tb: any = {
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_signin_extra_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_signin_extra_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_signin_extra_reward() {
		let tb: any = {
			result: 0,
			money: 0,
			go_to_next_round: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_signin_extra_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.go_to_next_round, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.go_to_next_round = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_signin_extra_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function invite_role_data() {
		let tb: any = {
			create_time: stime(),
			name: '',
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_invite_role_data"];
			},
			encode: function (buf: any) {
				tb.create_time.encode(buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.create_time.decode(buf, startIndex);
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_invite_role_data"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_invite_time_out2() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_invite_time_out2"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_invite_time_out2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_invite_time_out2() {
		let tb: any = {
			time_out: stime(),
			is_time_out: 0,
			invite_count: 0,
			invite_data: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_invite_time_out2"];
			},
			encode: function (buf: any) {
				tb.time_out.encode(buf);
				EncodeUtils.int32ToByte(tb.is_time_out, buf);
				EncodeUtils.int32ToByte(tb.invite_count, buf);
				EncodeUtils.uInt16ToByte(tb.invite_data.length, buf);
				for (let i = 0; i < tb.invite_data.length; ++i) {
					tb.invite_data[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.time_out.decode(buf, startIndex);
				tb.is_time_out = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.invite_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let invite_data_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < invite_data_len; ++i) {
					let tmp = invite_role_data();
					startIndex += tmp.decode(buf, startIndex);
					tb.invite_data.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_invite_time_out2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_red_point() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_red_point"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_red_point"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_red_point() {
		let tb: any = {
			red_point_array: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_red_point"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.red_point_array.length, buf);
				for (let i = 0; i < tb.red_point_array.length; ++i) {
					EncodeUtils.int32ToByte(tb.red_point_array[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let red_point_array_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < red_point_array_len; ++i) {
					tb.red_point_array.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_red_point"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_exp_room_time() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_exp_room_time"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_exp_room_time"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_exp_room_time() {
		let tb: any = {
			times: 0,
			is_end: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_exp_room_time"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.times, buf);
				EncodeUtils.int32ToByte(tb.is_end, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_end = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_exp_room_time"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_mjhl_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_mjhl_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_mjhl_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_mjhl_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_mjhl_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_mjhl_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_mjhl_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_mjhl_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_mjhl_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_mjhl_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			left_free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_mjhl_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.left_free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_mjhl_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function agent_item2() {
		let tb: any = {
			role_id: 0,
			head_icon: '',
			nickname: '',
			money: 0,
			signature: '',
			weixin_id: '',
			sex: 0,
			qq: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_agent_item2"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.utf8StrtoBytes(tb.signature, buf);
				EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
				EncodeUtils.int32ToByte(tb.sex, buf);
				EncodeUtils.utf8StrtoBytes(tb.qq, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
				startIndex += head_icon_value[1];
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.signature = signature_value[0];
				startIndex += signature_value[1];
				let weixin_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.weixin_id = weixin_id_value[0];
				startIndex += weixin_id_value[1];
				tb.sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let qq_value = EncodeUtils.byteToString(buf, startIndex);
				tb.qq = qq_value[0];
				startIndex += qq_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_agent_item2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_agent_list2() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_agent_list2"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_agent_list2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_agent_list2() {
		let tb: any = {
			agent_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_agent_list2"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.agent_list.length, buf);
				for (let i = 0; i < tb.agent_list.length; ++i) {
					tb.agent_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let agent_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < agent_list_len; ++i) {
					let tmp = agent_item2();
					startIndex += tmp.decode(buf, startIndex);
					tb.agent_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_agent_list2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_code_redeem() {
		let tb: any = {
			role_id: '',
			code: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_code_redeem"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
				startIndex += role_id_value[1];
				let code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.code = code_value[0];
				startIndex += code_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_code_redeem"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_code_redeem() {
		let tb: any = {
			result: 0,
			take_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_code_redeem"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.take_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.take_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_code_redeem"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_need_endless() {
		let tb: any = {
			code: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_need_endless"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_need_endless"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_need_endless() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_need_endless"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_need_endless"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_endless_bind() {
		let tb: any = {
			role_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_endless_bind"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
				startIndex += role_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_endless_bind"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_endless_bind() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_endless_bind"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_endless_bind"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_endless_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_endless_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_endless_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_endless_info() {
		let tb: any = {
			direct: 0,
			others: 0,
			yt_direct_total: 0,
			yt_others_total: 0,
			total_taken: 0,
			total_can_take: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_endless_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.direct, buf);
				EncodeUtils.int32ToByte(tb.others, buf);
				EncodeUtils.int64ToByte(tb.yt_direct_total, buf);
				EncodeUtils.int64ToByte(tb.yt_others_total, buf);
				EncodeUtils.int64ToByte(tb.total_taken, buf);
				EncodeUtils.int64ToByte(tb.total_can_take, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.direct = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.others = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.yt_direct_total = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.yt_others_total = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_taken = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_can_take = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_endless_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_endless_income_take() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_endless_income_take"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_endless_income_take"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_endless_income_take_result() {
		let tb: any = {
			result: 0,
			total_can_take: 0,
			total_taken: 0,
			take_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_endless_income_take_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.total_can_take, buf);
				EncodeUtils.int64ToByte(tb.total_taken, buf);
				EncodeUtils.int64ToByte(tb.take_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_can_take = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_taken = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.take_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_endless_income_take_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function endless_detail() {
		let tb: any = {
			role_id: 0,
			total_income: 0,
			create: stime(),
			nickname: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_endless_detail"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int64ToByte(tb.total_income, buf);
				tb.create.encode(buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.total_income = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.create.decode(buf, startIndex);
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_endless_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_endless_details() {
		let tb: any = {
			page: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_endless_details"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_endless_details"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_endless_details() {
		let tb: any = {
			totals: 0,
			details: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_endless_details"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.totals, buf);
				EncodeUtils.uInt16ToByte(tb.details.length, buf);
				for (let i = 0; i < tb.details.length; ++i) {
					tb.details[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.totals = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let details_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < details_len; ++i) {
					let tmp = endless_detail();
					startIndex += tmp.decode(buf, startIndex);
					tb.details.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_endless_details"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_svip_signup() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_svip_signup"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_svip_signup"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_svip_signup() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_svip_signup"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_svip_signup"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_svip_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_svip_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_svip_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_svip_info() {
		let tb: any = {
			start_time: stime(),
			end_time: stime(),
			recharge_time: stime(),
			init_money: 0,
			get_money: 0,
			svip_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_svip_info"];
			},
			encode: function (buf: any) {
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				tb.recharge_time.encode(buf);
				EncodeUtils.int64ToByte(tb.init_money, buf);
				EncodeUtils.int64ToByte(tb.get_money, buf);
				EncodeUtils.int32ToByte(tb.svip_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				startIndex += tb.recharge_time.decode(buf, startIndex);
				tb.init_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.svip_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_svip_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_svip_getreawrd() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_svip_getreawrd"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_svip_getreawrd"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_svip_getreawrd() {
		let tb: any = {
			result: 0,
			get_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_svip_getreawrd"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.get_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_svip_getreawrd"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function christmas_rank_data() {
		let tb: any = {
			name: '',
			role_id: 0,
			head_icon: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_christmas_rank_data"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
				startIndex += head_icon_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_christmas_rank_data"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_christmas_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_christmas_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_christmas_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_christmas_info() {
		let tb: any = {
			start_time: stime(),
			end_time: stime(),
			is_open: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_christmas_info"];
			},
			encode: function (buf: any) {
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.is_open, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_christmas_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_christmas_countdown() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_christmas_countdown"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_christmas_countdown"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_christmas_hit() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_christmas_hit"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_christmas_hit"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_christmas_hit() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_christmas_hit"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_christmas_hit"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_christmas_reward() {
		let tb: any = {
			get_money: 0,
			rank_data: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_christmas_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.get_money, buf);
				EncodeUtils.uInt16ToByte(tb.rank_data.length, buf);
				for (let i = 0; i < tb.rank_data.length; ++i) {
					tb.rank_data[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let rank_data_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_data_len; ++i) {
					let tmp = christmas_rank_data();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_data.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_christmas_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_voucher_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_voucher_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_voucher_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_voucher_info() {
		let tb: any = {
			is_open: 0,
			start_time: stime(),
			end_time: stime(),
			voucher_money: 0,
			voucher_money_cost: 0,
			voucher_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_voucher_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int64ToByte(tb.voucher_money, buf);
				EncodeUtils.int64ToByte(tb.voucher_money_cost, buf);
				EncodeUtils.int32ToByte(tb.voucher_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.voucher_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.voucher_money_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.voucher_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_voucher_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_voucher() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_voucher"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_voucher"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_voucher_result() {
		let tb: any = {
			voucher_money: 0,
			voucher_money_cost: 0,
			voucher_state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_voucher_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.voucher_money, buf);
				EncodeUtils.int64ToByte(tb.voucher_money_cost, buf);
				EncodeUtils.int32ToByte(tb.voucher_state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.voucher_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.voucher_money_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.voucher_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_voucher_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_free_spell_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_free_spell_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_free_spell_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_free_spell_info() {
		let tb: any = {
			state: 0,
			free_amount_got: 0,
			start_time: stime(),
			end_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_free_spell_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.state, buf);
				EncodeUtils.int64ToByte(tb.free_amount_got, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_amount_got = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_free_spell_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_free_amount() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_free_amount"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_free_amount"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_free_amount() {
		let tb: any = {
			free_amount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_free_amount"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.free_amount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_free_amount"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function invite_detail() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			invite_create_time: stime(),
			state: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_invite_detail"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				tb.invite_create_time.encode(buf);
				EncodeUtils.int32ToByte(tb.state, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				startIndex += tb.invite_create_time.decode(buf, startIndex);
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_invite_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function free_record_detail() {
		let tb: any = {
			free_amount: 0,
			free_amount_got: 0,
			free_completion_rate: 0,
			invite_num: 0,
			invite_details: [],
			remain_invite_seconds: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_free_record_detail"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.free_amount, buf);
				EncodeUtils.int64ToByte(tb.free_amount_got, buf);
				EncodeUtils.int32ToByte(tb.free_completion_rate, buf);
				EncodeUtils.int32ToByte(tb.invite_num, buf);
				EncodeUtils.uInt16ToByte(tb.invite_details.length, buf);
				for (let i = 0; i < tb.invite_details.length; ++i) {
					tb.invite_details[i].encode(buf);
				}
				EncodeUtils.int64ToByte(tb.remain_invite_seconds, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.free_amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_amount_got = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_completion_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.invite_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let invite_details_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < invite_details_len; ++i) {
					let tmp = invite_detail();
					startIndex += tmp.decode(buf, startIndex);
					tb.invite_details.push(tmp);
				}
				tb.remain_invite_seconds = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_free_record_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_free_record() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_free_record"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_free_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_free_record_result() {
		let tb: any = {
			total_record_num: 0,
			record_details: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_free_record_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_record_num, buf);
				EncodeUtils.uInt16ToByte(tb.record_details.length, buf);
				for (let i = 0; i < tb.record_details.length; ++i) {
					tb.record_details[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_record_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let record_details_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_details_len; ++i) {
					let tmp = free_record_detail();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_details.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_free_record_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_load_ip() {
		let tb: any = {
			role_id: 0,
			md5_key: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_load_ip"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.md5_key, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let md5_key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.md5_key = md5_key_value[0];
				startIndex += md5_key_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_load_ip"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_load_id() {
		let tb: any = {
			code: 0,
			ip_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_load_id"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.uInt16ToByte(tb.ip_list.length, buf);
				for (let i = 0; i < tb.ip_list.length; ++i) {
					EncodeUtils.utf8StrtoBytes(tb.ip_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let ip_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < ip_list_len; ++i) {
					let ip_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.ip_list.push(ip_list_value[0]);
					startIndex += ip_list_value[1];
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_load_id"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_login() {
		let tb: any = {
			login_type: 0,
			username: '',
			password: '',
			device_id: '',
			debug: '',
			device_model: '',
			app_version: '',
			channel_id: 0,
			aaa: '',
			bbb: '',
			ip: '',
			captcha: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_login"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.login_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.debug, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.utf8StrtoBytes(tb.app_version, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.login_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				let device_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_id = device_id_value[0];
				startIndex += device_id_value[1];
				let debug_value = EncodeUtils.byteToString(buf, startIndex);
				tb.debug = debug_value[0];
				startIndex += debug_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				let app_version_value = EncodeUtils.byteToString(buf, startIndex);
				tb.app_version = app_version_value[0];
				startIndex += app_version_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_login"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_login() {
		let tb: any = {
			code: 0,
			message: '',
			user_id: 0,
			token: '',
			account_type: 0,
			is_default_bankpwd: 0,
			tokenid: '',
			newguidestate: 0,
			ipGroupName: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_login"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
				EncodeUtils.int64ToByte(tb.user_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.token, buf);
				EncodeUtils.int32ToByte(tb.account_type, buf);
				EncodeUtils.int32ToByte(tb.is_default_bankpwd, buf);
				EncodeUtils.utf8StrtoBytes(tb.tokenid, buf);
				EncodeUtils.int32ToByte(tb.newguidestate, buf);
				EncodeUtils.utf8StrtoBytes(tb.ipGroupName, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				tb.user_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
				startIndex += token_value[1];
				tb.account_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_default_bankpwd = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tokenid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tokenid = tokenid_value[0];
				startIndex += tokenid_value[1];
				tb.newguidestate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let ipGroupName_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ipGroupName = ipGroupName_value[0];
				startIndex += ipGroupName_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_login"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_confirm_agent_level1_transfer() {
		let tb: any = {
			aaa: '',
			bbb: '',
			transferId: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_confirm_agent_level1_transfer"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int32ToByte(tb.transferId, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.transferId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_confirm_agent_level1_transfer"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_confirm_agent_level1_transfer() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_confirm_agent_level1_transfer"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_confirm_agent_level1_transfer"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_agent_lock_bankmoney() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_agent_lock_bankmoney"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_agent_lock_bankmoney"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_agent_lock_bankmoney() {
		let tb: any = {
			code: 0,
			message: '',
			agent_lock_bankmoney: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_agent_lock_bankmoney"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
				EncodeUtils.int64ToByte(tb.agent_lock_bankmoney, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				tb.agent_lock_bankmoney = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_agent_lock_bankmoney"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function set_newguidestate() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_set_newguidestate"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_set_newguidestate"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_config() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			channel_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_config"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_config"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_config() {
		let tb: any = {
			code: 0,
			message: '',
			share_url: '',
			omm_state: 0,
			omm_content: '',
			rank_status: 0,
			rebate_status: 0,
			znhl_starttime: 0,
			znhl_endtime: 0,
			show_rank: 0,
			show_user_bind_new: 0,
			show_newbees: 0,
			show_win_100: 0,
			show_lucky_roulette: 0,
			show_first_recharge: 0,
			show_rebate: 0,
			show_vip: 0,
			show_notice: 0,
			show_dragon: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_config"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
				EncodeUtils.utf8StrtoBytes(tb.share_url, buf);
				EncodeUtils.int32ToByte(tb.omm_state, buf);
				EncodeUtils.utf8StrtoBytes(tb.omm_content, buf);
				EncodeUtils.int32ToByte(tb.rank_status, buf);
				EncodeUtils.int32ToByte(tb.rebate_status, buf);
				EncodeUtils.int64ToByte(tb.znhl_starttime, buf);
				EncodeUtils.int64ToByte(tb.znhl_endtime, buf);
				EncodeUtils.int32ToByte(tb.show_rank, buf);
				EncodeUtils.int32ToByte(tb.show_user_bind_new, buf);
				EncodeUtils.int32ToByte(tb.show_newbees, buf);
				EncodeUtils.int32ToByte(tb.show_win_100, buf);
				EncodeUtils.int32ToByte(tb.show_lucky_roulette, buf);
				EncodeUtils.int32ToByte(tb.show_first_recharge, buf);
				EncodeUtils.int32ToByte(tb.show_rebate, buf);
				EncodeUtils.int32ToByte(tb.show_vip, buf);
				EncodeUtils.int32ToByte(tb.show_notice, buf);
				EncodeUtils.int32ToByte(tb.show_dragon, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				let share_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.share_url = share_url_value[0];
				startIndex += share_url_value[1];
				tb.omm_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let omm_content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.omm_content = omm_content_value[0];
				startIndex += omm_content_value[1];
				tb.rank_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.rebate_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.znhl_starttime = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.znhl_endtime = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.show_rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_user_bind_new = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_newbees = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_win_100 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_lucky_roulette = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_first_recharge = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_rebate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_vip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_notice = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.show_dragon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_config"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function set_channel() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			channel_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_set_channel"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_set_channel"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function set_client_ip() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_set_client_ip"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_set_client_ip"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_submit_suggest() {
		let tb: any = {
			aaa: '',
			bbb: '',
			role_id: 0,
			content: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_submit_suggest"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_submit_suggest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_submit_suggest() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_submit_suggest"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_submit_suggest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_send_sms_check_code() {
		let tb: any = {
			username: '',
			password: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_send_sms_check_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_send_sms_check_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_send_sms_check_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_send_sms_check_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_send_sms_check_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_check_sms_code() {
		let tb: any = {
			username: '',
			verify_code: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_check_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.int32ToByte(tb.verify_code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				tb.verify_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_check_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_check_sms_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_check_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_check_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_reset_password() {
		let tb: any = {
			mobile: '',
			new_password: '',
			verify_code: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_reset_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
				EncodeUtils.int32ToByte(tb.verify_code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				let new_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password = new_password_value[0];
				startIndex += new_password_value[1];
				tb.verify_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_reset_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_reset_password() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_reset_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_reset_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_send_create_user_sms_code() {
		let tb: any = {
			mobile: '',
			ip: '',
			type: 0,
			username: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_send_create_user_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_send_create_user_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_send_create_user_sms_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_send_create_user_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_send_create_user_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_add_guest() {
		let tb: any = {
			username: '',
			password: '',
			captcha: '',
			sign: '',
			ip: '',
			ip_error: '',
			device_model: '',
			aaa: '',
			bbb: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_add_guest"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip_error, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let ip_error_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip_error = ip_error_value[0];
				startIndex += ip_error_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_add_guest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_add_guest() {
		let tb: any = {
			code: 0,
			message: '',
			username: '',
			password: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_add_guest"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_add_guest"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_create_v2() {
		let tb: any = {
			username: '',
			password: '',
			verify_code: 0,
			sign: '',
			ip: '',
			ip_error: '',
			device_model: '',
			channel_id: 0,
			agent_id: 0,
			aaa: '',
			bbb: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_create_v2"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.int32ToByte(tb.verify_code, buf);
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip_error, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.int32ToByte(tb.agent_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				tb.verify_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let ip_error_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip_error = ip_error_value[0];
				startIndex += ip_error_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.agent_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_create_v2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_create_v2() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_create_v2"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_create_v2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_mobile_sms_login_code() {
		let tb: any = {
			mobile: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_mobile_sms_login_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_mobile_sms_login_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function nodify_get_mobile_sms_login_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_nodify_get_mobile_sms_login_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_nodify_get_mobile_sms_login_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function minigame_rank_item() {
		let tb: any = {
			rank: 0,
			nickname: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_minigame_rank_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rank, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_minigame_rank_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dice_item() {
		let tb: any = {
			dice_num: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_dice_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
				for (let i = 0; i < tb.dice_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_num[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_num_len; ++i) {
					tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dice_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_info() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			beted_money: [],
			dice_num: [],
			beted_playercount: [],
			self_beted_money: [],
			min_bet: 0,
			max_bet: 0,
			history_result: [],
			server_timestamp: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
				for (let i = 0; i < tb.beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.beted_money[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
				for (let i = 0; i < tb.dice_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_num[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
				for (let i = 0; i < tb.beted_playercount.length; ++i) {
					EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
				for (let i = 0; i < tb.self_beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
				}
				EncodeUtils.int64ToByte(tb.min_bet, buf);
				EncodeUtils.int64ToByte(tb.max_bet, buf);
				EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
				for (let i = 0; i < tb.history_result.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_result[i], buf);
				}
				EncodeUtils.int64ToByte(tb.server_timestamp, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_money_len; ++i) {
					tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_num_len; ++i) {
					tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_playercount_len; ++i) {
					tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < self_beted_money_len; ++i) {
					tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_result_len; ++i) {
					tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_stage() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			balance_result: 0,
			dice_num: [],
			money: 0,
			money2: 0,
			cur_money: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_stage"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.balance_result, buf);
				EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
				for (let i = 0; i < tb.dice_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_num[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.money2, buf);
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_num_len; ++i) {
					tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_stage"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bigsmall_bet() {
		let tb: any = {
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bigsmall_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bigsmall_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_self_bet() {
		let tb: any = {
			result: 0,
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_self_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_bet() {
		let tb: any = {
			money: [],
			bet_player_num: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.money.length, buf);
				for (let i = 0; i < tb.money.length; ++i) {
					EncodeUtils.int64ToByte(tb.money[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
				for (let i = 0; i < tb.bet_player_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < money_len; ++i) {
					tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_player_num_len; ++i) {
					tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bigsmall_rank() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bigsmall_rank"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bigsmall_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_rank() {
		let tb: any = {
			rank_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_rank"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
				for (let i = 0; i < tb.rank_item.length; ++i) {
					tb.rank_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_item_len; ++i) {
					let tmp = minigame_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bigsmall_history() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bigsmall_history"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bigsmall_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_history() {
		let tb: any = {
			record_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
				for (let i = 0; i < tb.record_item.length; ++i) {
					tb.record_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_item_len; ++i) {
					let tmp = game_record_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bigsmall_trendchart() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bigsmall_trendchart"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bigsmall_trendchart"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bigsmall_trendchart() {
		let tb: any = {
			history_result: [],
			dice_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bigsmall_trendchart"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
				for (let i = 0; i < tb.history_result.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_result[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.dice_list.length, buf);
				for (let i = 0; i < tb.dice_list.length; ++i) {
					tb.dice_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_result_len; ++i) {
					tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let dice_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_list_len; ++i) {
					let tmp = dice_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.dice_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bigsmall_trendchart"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bettime_bigsmall_to_all() {
		let tb: any = {
			end_time: stime(),
			end_time2: 0,
			server_timestamp: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bettime_bigsmall_to_all"];
			},
			encode: function (buf: any) {
				tb.end_time.encode(buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
				EncodeUtils.int64ToByte(tb.server_timestamp, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bettime_bigsmall_to_all"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function minigame_chat_item() {
		let tb: any = {
			id: 0,
			role_id: 0,
			viplevel: 0,
			nickname: '',
			content: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_minigame_chat_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.viplevel, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.viplevel = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_minigame_chat_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_minigame_chat() {
		let tb: any = {
			content: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_minigame_chat"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_minigame_chat"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_minigame_chat() {
		let tb: any = {
			id: 0,
			role_id: 0,
			viplevel: 0,
			nickname: '',
			content: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_minigame_chat"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.id, buf);
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.viplevel, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.viplevel = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_minigame_chat"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_minigame_chat_record() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_minigame_chat_record"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_minigame_chat_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_minigame_chat_record() {
		let tb: any = {
			chat_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_minigame_chat_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.chat_item.length, buf);
				for (let i = 0; i < tb.chat_item.length; ++i) {
					tb.chat_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let chat_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < chat_item_len; ++i) {
					let tmp = minigame_chat_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.chat_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_minigame_chat_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_info() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			beted_money: [],
			dice_num: [],
			beted_playercount: [],
			self_beted_money: [],
			min_bet: 0,
			max_bet: 0,
			history_result: [],
			server_timestamp: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
				for (let i = 0; i < tb.beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.beted_money[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
				for (let i = 0; i < tb.dice_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_num[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
				for (let i = 0; i < tb.beted_playercount.length; ++i) {
					EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
				for (let i = 0; i < tb.self_beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
				}
				EncodeUtils.int32ToByte(tb.min_bet, buf);
				EncodeUtils.int64ToByte(tb.max_bet, buf);
				EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
				for (let i = 0; i < tb.history_result.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_result[i], buf);
				}
				EncodeUtils.int64ToByte(tb.server_timestamp, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_money_len; ++i) {
					tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_num_len; ++i) {
					tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_playercount_len; ++i) {
					tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < self_beted_money_len; ++i) {
					tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_result_len; ++i) {
					tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_stage() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			balance_result: 0,
			dice_num: [],
			money: 0,
			money2: 0,
			cur_money: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_stage"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.balance_result, buf);
				EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
				for (let i = 0; i < tb.dice_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.dice_num[i], buf);
				}
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.money2, buf);
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < dice_num_len; ++i) {
					tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_stage"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_longhu_bet() {
		let tb: any = {
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_longhu_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_longhu_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_self_bet() {
		let tb: any = {
			result: 0,
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_self_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_bet() {
		let tb: any = {
			money: [],
			bet_player_num: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.money.length, buf);
				for (let i = 0; i < tb.money.length; ++i) {
					EncodeUtils.int64ToByte(tb.money[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
				for (let i = 0; i < tb.bet_player_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < money_len; ++i) {
					tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_player_num_len; ++i) {
					tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_longhu_rank() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_longhu_rank"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_longhu_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_rank() {
		let tb: any = {
			rank_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_rank"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
				for (let i = 0; i < tb.rank_item.length; ++i) {
					tb.rank_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_item_len; ++i) {
					let tmp = minigame_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_longhu_history() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_longhu_history"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_longhu_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_history() {
		let tb: any = {
			record_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
				for (let i = 0; i < tb.record_item.length; ++i) {
					tb.record_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_item_len; ++i) {
					let tmp = game_record_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_longhu_trendchart() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_longhu_trendchart"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_longhu_trendchart"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_longhu_trendchart() {
		let tb: any = {
			history_result: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_longhu_trendchart"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
				for (let i = 0; i < tb.history_result.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_result[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_result_len; ++i) {
					tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_longhu_trendchart"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_info() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			beted_money: [],
			balance_result: 0,
			beted_playercount: [],
			self_beted_money: [],
			min_bet: 0,
			max_bet: 0,
			history_result: [],
			server_timestamp: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
				for (let i = 0; i < tb.beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.beted_money[i], buf);
				}
				EncodeUtils.int32ToByte(tb.balance_result, buf);
				EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
				for (let i = 0; i < tb.beted_playercount.length; ++i) {
					EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
				for (let i = 0; i < tb.self_beted_money.length; ++i) {
					EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
				}
				EncodeUtils.int32ToByte(tb.min_bet, buf);
				EncodeUtils.int64ToByte(tb.max_bet, buf);
				EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
				for (let i = 0; i < tb.history_result.length; ++i) {
					EncodeUtils.int32ToByte(tb.history_result[i], buf);
				}
				EncodeUtils.int64ToByte(tb.server_timestamp, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_money_len; ++i) {
					tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < beted_playercount_len; ++i) {
					tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < self_beted_money_len; ++i) {
					tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_result_len; ++i) {
					tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_stage() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			balance_result: 0,
			money: 0,
			money2: 0,
			cur_money: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_stage"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.balance_result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int64ToByte(tb.money2, buf);
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.money2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_stage"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shuangdan_bet() {
		let tb: any = {
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shuangdan_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shuangdan_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_self_bet() {
		let tb: any = {
			result: 0,
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_self_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_self_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_bet() {
		let tb: any = {
			money: [],
			bet_player_num: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.money.length, buf);
				for (let i = 0; i < tb.money.length; ++i) {
					EncodeUtils.int64ToByte(tb.money[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
				for (let i = 0; i < tb.bet_player_num.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < money_len; ++i) {
					tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
				}
				let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_player_num_len; ++i) {
					tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shuangdan_rank() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shuangdan_rank"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shuangdan_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_rank() {
		let tb: any = {
			rank_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_rank"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
				for (let i = 0; i < tb.rank_item.length; ++i) {
					tb.rank_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_item_len; ++i) {
					let tmp = minigame_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_shuangdan_history() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_shuangdan_history"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_shuangdan_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_shuangdan_history() {
		let tb: any = {
			record_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_shuangdan_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
				for (let i = 0; i < tb.record_item.length; ++i) {
					tb.record_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_item_len; ++i) {
					let tmp = game_record_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_shuangdan_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function lucky_roulette_record() {
		let tb: any = {
			name: '',
			win: '',
			update_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_lucky_roulette_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.utf8StrtoBytes(tb.win, buf);
				tb.update_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				let win_value = EncodeUtils.byteToString(buf, startIndex);
				tb.win = win_value[0];
				startIndex += win_value[1];
				startIndex += tb.update_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_lucky_roulette_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lucky_roulette_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lucky_roulette_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lucky_roulette_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function action_info() {
		let tb: any = {
			require_times: 0,
			done_times: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_action_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.require_times, buf);
				EncodeUtils.int32ToByte(tb.done_times, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.require_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.done_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_action_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_roulette_info() {
		let tb: any = {
			is_open: 0,
			result: 0,
			start_time: stime(),
			end_time: stime(),
			latest_id: 0,
			task_detail: [],
			my_list: [],
			record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_roulette_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.latest_id, buf);
				EncodeUtils.uInt16ToByte(tb.task_detail.length, buf);
				for (let i = 0; i < tb.task_detail.length; ++i) {
					tb.task_detail[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.my_list.length, buf);
				for (let i = 0; i < tb.my_list.length; ++i) {
					tb.my_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
				for (let i = 0; i < tb.record_list.length; ++i) {
					tb.record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.latest_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let task_detail_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < task_detail_len; ++i) {
					let tmp = action_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.task_detail.push(tmp);
				}
				let my_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < my_list_len; ++i) {
					let tmp = lucky_roulette_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.my_list.push(tmp);
				}
				let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_list_len; ++i) {
					let tmp = lucky_roulette_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lucky_roulette_start() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lucky_roulette_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lucky_roulette_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_roulette_reward() {
		let tb: any = {
			result: 0,
			item_no: 0,
			win: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_roulette_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.item_no, buf);
				EncodeUtils.utf8StrtoBytes(tb.win, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.item_no = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let win_value = EncodeUtils.byteToString(buf, startIndex);
				tb.win = win_value[0];
				startIndex += win_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_roulette_record() {
		let tb: any = {
			new_record: lucky_roulette_record(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_roulette_record"];
			},
			encode: function (buf: any) {
				tb.new_record.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.new_record.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_roulette_got_chance() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_roulette_got_chance"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_got_chance"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_lucky_roulette_latest_record() {
		let tb: any = {
			record_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_lucky_roulette_latest_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.record_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.record_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_lucky_roulette_latest_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_lucky_roulette_latest_record() {
		let tb: any = {
			new_record: lucky_roulette_record(),
			latest_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_lucky_roulette_latest_record"];
			},
			encode: function (buf: any) {
				tb.new_record.encode(buf);
				EncodeUtils.int32ToByte(tb.latest_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.new_record.decode(buf, startIndex);
				tb.latest_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_latest_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_3rd_game_login() {
		let tb: any = {
			agentId: 0,
			gameId: '',
			kindId: '',
			lang: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_3rd_game_login"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.agentId, buf);
				EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
				EncodeUtils.utf8StrtoBytes(tb.kindId, buf);
				EncodeUtils.int32ToByte(tb.lang, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let gameId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameId = gameId_value[0];
				startIndex += gameId_value[1];
				let kindId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.kindId = kindId_value[0];
				startIndex += kindId_value[1];
				tb.lang = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_3rd_game_login"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_3rd_game_login_result() {
		let tb: any = {
			code: 0,
			url: '',
			msg: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_3rd_game_login_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.url, buf);
				EncodeUtils.utf8StrtoBytes(tb.msg, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
				startIndex += url_value[1];
				let msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.msg = msg_value[0];
				startIndex += msg_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_3rd_game_login_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bag_item() {
		let tb: any = {
			id: 0,
			item_id: 0,
			count: 0,
			info1: 0,
			info2: 0,
			info3: 0,
			info4: 0,
			info5: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_bag_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.int32ToByte(tb.item_id, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
				EncodeUtils.int32ToByte(tb.info1, buf);
				EncodeUtils.int32ToByte(tb.info2, buf);
				EncodeUtils.int32ToByte(tb.info3, buf);
				EncodeUtils.int32ToByte(tb.info4, buf);
				EncodeUtils.int32ToByte(tb.info5, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.item_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.info1 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.info2 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.info3 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.info4 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.info5 = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bag_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_role_bag() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_role_bag"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_role_bag"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_role_bag() {
		let tb: any = {
			items: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_role_bag"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.items.length, buf);
				for (let i = 0; i < tb.items.length; ++i) {
					tb.items[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let items_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < items_len; ++i) {
					let tmp = bag_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.items.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_role_bag"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_use_item() {
		let tb: any = {
			id: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_use_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_use_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_use_item() {
		let tb: any = {
			result: 0,
			item: bag_item(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_use_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				tb.item.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.item.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_use_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_update_item() {
		let tb: any = {
			id: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_update_item"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_update_item"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_exchange() {
		let tb: any = {
			code: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_exchange"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.code, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.code = code_value[0];
				startIndex += code_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_exchange"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_exchange() {
		let tb: any = {
			result: 0,
			code_type: 0,
			money: 0,
			game_type: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_exchange"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.code_type, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.game_type, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.code_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_exchange"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_first_recharge_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_first_recharge_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_first_recharge_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_first_recharge_info() {
		let tb: any = {
			is_open: 0,
			start_time: stime(),
			end_time: stime(),
			process: [],
			amount: 0,
			turnover: 0,
			left_time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_first_recharge_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.uInt16ToByte(tb.process.length, buf);
				for (let i = 0; i < tb.process.length; ++i) {
					EncodeUtils.int32ToByte(tb.process[i], buf);
				}
				EncodeUtils.int64ToByte(tb.amount, buf);
				EncodeUtils.int64ToByte(tb.turnover, buf);
				EncodeUtils.int32ToByte(tb.left_time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				let process_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < process_len; ++i) {
					tb.process.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.turnover = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.left_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_first_recharge_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_first_recharge_start() {
		let tb: any = {
			taskID: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_first_recharge_start"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.taskID, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.taskID = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_first_recharge_start"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_first_recharge_reward() {
		let tb: any = {
			result: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_first_recharge_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_first_recharge_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_first_recharge_show() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_first_recharge_show"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_first_recharge_show"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_first_recharge_show() {
		let tb: any = {
			show: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_first_recharge_show"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.show, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.show = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_first_recharge_show"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge2() {
		let tb: any = {
			money: '',
			channel_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge2"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.money, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
				startIndex += money_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_req_recharge2() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_req_recharge2"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_req_recharge2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_money_update2() {
		let tb: any = {
			update_money: 0,
			cur_money: 0,
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_money_update2"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.update_money, buf);
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.update_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_money_update2"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_set_invitecode() {
		let tb: any = {
			superior_id: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_set_invitecode"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.superior_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let superior_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.superior_id = superior_id_value[0];
				startIndex += superior_id_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_set_invitecode"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_refresh_money() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_refresh_money"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_refresh_money"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_3rd_game_kick() {
		let tb: any = {
			agentId: 0,
			gameId: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_3rd_game_kick"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.agentId, buf);
				EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let gameId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameId = gameId_value[0];
				startIndex += gameId_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_3rd_game_kick"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_rank_with_robot_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_rank_with_robot_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_rank_with_robot_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_rank_with_robot_list() {
		let tb: any = {
			room_rank_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_rank_with_robot_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.room_rank_list.length, buf);
				for (let i = 0; i < tb.room_rank_list.length; ++i) {
					tb.room_rank_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let room_rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < room_rank_list_len; ++i) {
					let tmp = new_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.room_rank_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_rank_with_robot_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function recharge_list() {
		let tb: any = {
			paymenttype: 0,
			minrecharge: 0,
			maxrecharge: 0,
			paymethod: '',
			payname: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_recharge_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.paymenttype, buf);
				EncodeUtils.int64ToByte(tb.minrecharge, buf);
				EncodeUtils.int64ToByte(tb.maxrecharge, buf);
				EncodeUtils.utf8StrtoBytes(tb.paymethod, buf);
				EncodeUtils.utf8StrtoBytes(tb.payname, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.paymenttype = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.minrecharge = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.maxrecharge = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let paymethod_value = EncodeUtils.byteToString(buf, startIndex);
				tb.paymethod = paymethod_value[0];
				startIndex += paymethod_value[1];
				let payname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.payname = payname_value[0];
				startIndex += payname_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_recharge_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function recharge_discount() {
		let tb: any = {
			discount_ID: 0,
			limit: 0,
			ratio: 0,
			require: 0,
			restrict: '',
			name: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_recharge_discount"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.discount_ID, buf);
				EncodeUtils.int32ToByte(tb.limit, buf);
				EncodeUtils.int32ToByte(tb.ratio, buf);
				EncodeUtils.int32ToByte(tb.require, buf);
				EncodeUtils.utf8StrtoBytes(tb.restrict, buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.discount_ID = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.limit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.ratio = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.require = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let restrict_value = EncodeUtils.byteToString(buf, startIndex);
				tb.restrict = restrict_value[0];
				startIndex += restrict_value[1];
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_recharge_discount"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function pay_info() {
		let tb: any = {
			pay_id: 0,
			pay_name: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_pay_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.pay_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.pay_name, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.pay_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pay_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.pay_name = pay_name_value[0];
				startIndex += pay_name_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_pay_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_shop_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_shop_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_shop_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_req_get_shop_info() {
		let tb: any = {
			rechargelist_by_paymenttype: [],
			discount_list: [],
			bank_list: [],
			usdt_viet_rate: 0,
			is_speical_player: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_req_get_shop_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rechargelist_by_paymenttype.length, buf);
				for (let i = 0; i < tb.rechargelist_by_paymenttype.length; ++i) {
					tb.rechargelist_by_paymenttype[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.discount_list.length, buf);
				for (let i = 0; i < tb.discount_list.length; ++i) {
					tb.discount_list[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.bank_list.length, buf);
				for (let i = 0; i < tb.bank_list.length; ++i) {
					tb.bank_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.usdt_viet_rate, buf);
				EncodeUtils.int32ToByte(tb.is_speical_player, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rechargelist_by_paymenttype_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rechargelist_by_paymenttype_len; ++i) {
					let tmp = recharge_list();
					startIndex += tmp.decode(buf, startIndex);
					tb.rechargelist_by_paymenttype.push(tmp);
				}
				let discount_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < discount_list_len; ++i) {
					let tmp = recharge_discount();
					startIndex += tmp.decode(buf, startIndex);
					tb.discount_list.push(tmp);
				}
				let bank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bank_list_len; ++i) {
					let tmp = pay_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.bank_list.push(tmp);
				}
				tb.usdt_viet_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_speical_player = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_req_get_shop_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_from_third() {
		let tb: any = {
			amount: '',
			channel_type: 0,
			bank_channel_type: 0,
			got_discount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_from_third"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.amount, buf);
				EncodeUtils.int32ToByte(tb.channel_type, buf);
				EncodeUtils.int32ToByte(tb.bank_channel_type, buf);
				EncodeUtils.int32ToByte(tb.got_discount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let amount_value = EncodeUtils.byteToString(buf, startIndex);
				tb.amount = amount_value[0];
				startIndex += amount_value[1];
				tb.channel_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bank_channel_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.got_discount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_from_third"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_from_third() {
		let tb: any = {
			code: 0,
			url: '',
			msg: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_from_third"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.url, buf);
				EncodeUtils.utf8StrtoBytes(tb.msg, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
				startIndex += url_value[1];
				let msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.msg = msg_value[0];
				startIndex += msg_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_from_third"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_recharge_success_from_third() {
		let tb: any = {
			amount: 0,
			is_first_recharge: 0,
			reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_recharge_success_from_third"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.amount, buf);
				EncodeUtils.int32ToByte(tb.is_first_recharge, buf);
				EncodeUtils.int64ToByte(tb.reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.is_first_recharge = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.reward = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_recharge_success_from_third"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_pay_name_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_pay_name_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_pay_name_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_req_pay_name_list() {
		let tb: any = {
			pay_name_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_req_pay_name_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.pay_name_list.length, buf);
				for (let i = 0; i < tb.pay_name_list.length; ++i) {
					tb.pay_name_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let pay_name_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < pay_name_list_len; ++i) {
					let tmp = pay_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.pay_name_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_req_pay_name_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_win_100_history() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_win_100_history"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_win_100_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function win_100_record() {
		let tb: any = {
			index: 0,
			name: '',
			item: '',
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_win_100_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.index, buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.utf8StrtoBytes(tb.item, buf);
				EncodeUtils.int32ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				let item_value = EncodeUtils.byteToString(buf, startIndex);
				tb.item = item_value[0];
				startIndex += item_value[1];
				tb.money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_win_100_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function win_100_record_with_date() {
		let tb: any = {
			his_date: '',
			win_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_win_100_record_with_date"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.his_date, buf);
				EncodeUtils.uInt16ToByte(tb.win_list.length, buf);
				for (let i = 0; i < tb.win_list.length; ++i) {
					tb.win_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let his_date_value = EncodeUtils.byteToString(buf, startIndex);
				tb.his_date = his_date_value[0];
				startIndex += his_date_value[1];
				let win_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < win_list_len; ++i) {
					let tmp = win_100_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.win_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_win_100_record_with_date"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_win_100_history() {
		let tb: any = {
			win_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_win_100_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.win_list.length, buf);
				for (let i = 0; i < tb.win_list.length; ++i) {
					tb.win_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let win_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < win_list_len; ++i) {
					let tmp = win_100_record_with_date();
					startIndex += tmp.decode(buf, startIndex);
					tb.win_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_win_100_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_win_100_join() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_win_100_join"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_win_100_join"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function win_100_join_record() {
		let tb: any = {
			name: '',
			ts: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_win_100_join_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				tb.ts.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				startIndex += tb.ts.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_win_100_join_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_win_100_join() {
		let tb: any = {
			join_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_win_100_join"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.join_list.length, buf);
				for (let i = 0; i < tb.join_list.length; ++i) {
					tb.join_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let join_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < join_list_len; ++i) {
					let tmp = win_100_join_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.join_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_win_100_join"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_win_100_info() {
		let tb: any = {
			req: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_win_100_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.req, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.req = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_win_100_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_win_100_info() {
		let tb: any = {
			is_open: 0,
			start_time: stime(),
			end_time: stime(),
			rlt: 0,
			num: 0,
			countdown: 0,
			status: 0,
			days: 0,
			first: 0,
			info: '',
			livestream_url: '',
			share_url: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_win_100_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.rlt, buf);
				EncodeUtils.int32ToByte(tb.num, buf);
				EncodeUtils.int32ToByte(tb.countdown, buf);
				EncodeUtils.int32ToByte(tb.status, buf);
				EncodeUtils.int32ToByte(tb.days, buf);
				EncodeUtils.int32ToByte(tb.first, buf);
				EncodeUtils.utf8StrtoBytes(tb.info, buf);
				EncodeUtils.utf8StrtoBytes(tb.livestream_url, buf);
				EncodeUtils.utf8StrtoBytes(tb.share_url, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.countdown = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.first = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let info_value = EncodeUtils.byteToString(buf, startIndex);
				tb.info = info_value[0];
				startIndex += info_value[1];
				let livestream_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.livestream_url = livestream_url_value[0];
				startIndex += livestream_url_value[1];
				let share_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.share_url = share_url_value[0];
				startIndex += share_url_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_win_100_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_win_100_share() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_win_100_share"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_win_100_share"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_win_100_share() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_win_100_share"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_win_100_share"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_game_card_leftscore() {
		let tb: any = {
			game_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_game_card_leftscore"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_game_card_leftscore"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_game_card_leftscore() {
		let tb: any = {
			leftscore: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_game_card_leftscore"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.leftscore, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.leftscore = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_game_card_leftscore"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_newbees_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_newbees_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_newbees_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_newbees_info() {
		let tb: any = {
			is_open: 0,
			start_time: stime(),
			end_time: stime(),
			amount: 0,
			status: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_newbees_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int64ToByte(tb.amount, buf);
				EncodeUtils.int32ToByte(tb.status, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_newbees_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_newbees_prize() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_newbees_prize"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_newbees_prize"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_newbees_prize() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_newbees_prize"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_newbees_prize"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_game_giftcard_remainpoints() {
		let tb: any = {
			game_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_game_giftcard_remainpoints"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.game_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_game_giftcard_remainpoints"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_game_giftcard_remainpoints() {
		let tb: any = {
			remainpoints: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_game_giftcard_remainpoints"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.remainpoints, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.remainpoints = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_game_giftcard_remainpoints"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_register_account() {
		let tb: any = {
			username: '',
			password: '',
			register_type: 0,
			sign: '',
			ip: '',
			ip_error: '',
			device_model: '',
			channel_id: 0,
			agent_id: 0,
			aaa: '',
			bbb: '',
			captcha: '',
			currency: 0,
			from_url: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_register_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.int32ToByte(tb.register_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip_error, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.int32ToByte(tb.agent_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
				EncodeUtils.int32ToByte(tb.currency, buf);
				EncodeUtils.utf8StrtoBytes(tb.from_url, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				tb.register_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let ip_error_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip_error = ip_error_value[0];
				startIndex += ip_error_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.agent_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				tb.currency = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let from_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.from_url = from_url_value[0];
				startIndex += from_url_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_register_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_register_account() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_register_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_register_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bind_account() {
		let tb: any = {
			turist_username: '',
			turist_password: '',
			username: '',
			password: '',
			nickname: '',
			register_type: 0,
			sign: '',
			ip: '',
			ip_error: '',
			device_model: '',
			channel_id: 0,
			agent_id: 0,
			aaa: '',
			bbb: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bind_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.turist_username, buf);
				EncodeUtils.utf8StrtoBytes(tb.turist_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.register_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip_error, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.int32ToByte(tb.agent_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let turist_username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.turist_username = turist_username_value[0];
				startIndex += turist_username_value[1];
				let turist_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.turist_password = turist_password_value[0];
				startIndex += turist_password_value[1];
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.register_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let ip_error_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip_error = ip_error_value[0];
				startIndex += ip_error_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.agent_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bind_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bind_account() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bind_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bind_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_customer_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_customer_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_customer_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_customer_info() {
		let tb: any = {
			url: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_customer_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.url, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
				startIndex += url_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_customer_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_register_captcha() {
		let tb: any = {
			sign: '',
			aaa: '',
			bbb: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_register_captcha"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_register_captcha"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_register_captcha() {
		let tb: any = {
			url: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_register_captcha"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.url, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
				startIndex += url_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_register_captcha"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_kickplayer_reason() {
		let tb: any = {
			reason: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_kickplayer_reason"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.reason, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let reason_value = EncodeUtils.byteToString(buf, startIndex);
				tb.reason = reason_value[0];
				startIndex += reason_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_kickplayer_reason"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_recharge_from_third_add() {
		let tb: any = {
			got_discount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_recharge_from_third_add"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.got_discount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.got_discount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_recharge_from_third_add"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_fllm_reward() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_fllm_reward"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_fllm_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_fllm_reward() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_fllm_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_fllm_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function guaguacard_record() {
		let tb: any = {
			card1state: 0,
			card2state: 0,
			card3state: 0,
			card1content: 0,
			card2content: 0,
			card3content: 0,
			card1opentime: stime(),
			card2opentime: stime(),
			card3opentime: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_guaguacard_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.card1state, buf);
				EncodeUtils.int32ToByte(tb.card2state, buf);
				EncodeUtils.int32ToByte(tb.card3state, buf);
				EncodeUtils.int32ToByte(tb.card1content, buf);
				EncodeUtils.int32ToByte(tb.card2content, buf);
				EncodeUtils.int32ToByte(tb.card3content, buf);
				tb.card1opentime.encode(buf);
				tb.card2opentime.encode(buf);
				tb.card3opentime.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.card1state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card2state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card3state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card1content = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card2content = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.card3content = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.card1opentime.decode(buf, startIndex);
				startIndex += tb.card2opentime.decode(buf, startIndex);
				startIndex += tb.card3opentime.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_guaguacard_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function watering_record() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			head_photo: '',
			level: 0,
			watering_count: 0,
			rank: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_watering_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.watering_count, buf);
				EncodeUtils.int32ToByte(tb.rank, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				let head_photo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo = head_photo_value[0];
				startIndex += head_photo_value[1];
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.watering_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_watering_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function get_water_record() {
		let tb: any = {
			task_id: 0,
			state: 0,
			complete_count: 0,
			total_count: 0,
			water_count_from: 0,
			water_count_to: 0,
			ready_num: 0,
			task_desc: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_get_water_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.task_id, buf);
				EncodeUtils.int32ToByte(tb.state, buf);
				EncodeUtils.int32ToByte(tb.complete_count, buf);
				EncodeUtils.int32ToByte(tb.total_count, buf);
				EncodeUtils.int32ToByte(tb.water_count_from, buf);
				EncodeUtils.int32ToByte(tb.water_count_to, buf);
				EncodeUtils.int32ToByte(tb.ready_num, buf);
				EncodeUtils.utf8StrtoBytes(tb.task_desc, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.complete_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.total_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.water_count_from = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.water_count_to = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.ready_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let task_desc_value = EncodeUtils.byteToString(buf, startIndex);
				tb.task_desc = task_desc_value[0];
				startIndex += task_desc_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_get_water_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function tree_upgrade_record() {
		let tb: any = {
			level: 0,
			water_count: 0,
			fertilizer_count: 0,
			reward: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_tree_upgrade_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.water_count, buf);
				EncodeUtils.int32ToByte(tb.fertilizer_count, buf);
				EncodeUtils.int32ToByte(tb.reward, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fertilizer_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_tree_upgrade_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_info() {
		let tb: any = {
			is_open: 0,
			start_time: stime(),
			end_time: stime(),
			level: 0,
			level_reward: 0,
			watering_count: 0,
			fertilize_count: 0,
			tree_upgrade: [],
			left_fertilizer_count: 0,
			left_water_count: 0,
			invite_reward_type: 0,
			nickname: '',
			card_record: guaguacard_record(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.is_open, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.level_reward, buf);
				EncodeUtils.int32ToByte(tb.watering_count, buf);
				EncodeUtils.int32ToByte(tb.fertilize_count, buf);
				EncodeUtils.uInt16ToByte(tb.tree_upgrade.length, buf);
				for (let i = 0; i < tb.tree_upgrade.length; ++i) {
					tb.tree_upgrade[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.left_fertilizer_count, buf);
				EncodeUtils.int32ToByte(tb.left_water_count, buf);
				EncodeUtils.int32ToByte(tb.invite_reward_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				tb.card_record.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.level_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.watering_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fertilize_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tree_upgrade_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < tree_upgrade_len; ++i) {
					let tmp = tree_upgrade_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.tree_upgrade.push(tmp);
				}
				tb.left_fertilizer_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.invite_reward_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				startIndex += tb.card_record.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_open_guaguacard() {
		let tb: any = {
			cardid: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_open_guaguacard"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.cardid, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.cardid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_open_guaguacard"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_open_guaguacard() {
		let tb: any = {
			card_state: guaguacard_record(),
			left_water_count: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_open_guaguacard"];
			},
			encode: function (buf: any) {
				tb.card_state.encode(buf);
				EncodeUtils.int32ToByte(tb.left_water_count, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				startIndex += tb.card_state.decode(buf, startIndex);
				tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_open_guaguacard"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_fertilize_watering() {
		let tb: any = {
			type: 0,
			count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_fertilize_watering"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int32ToByte(tb.count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_fertilize_watering"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_fertilize_watering() {
		let tb: any = {
			left_fertilizer: 0,
			left_water_count: 0,
			tree_level: 0,
			fertilize_count: 0,
			watering_count: 0,
			level_reward: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_fertilize_watering"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.left_fertilizer, buf);
				EncodeUtils.int32ToByte(tb.left_water_count, buf);
				EncodeUtils.int32ToByte(tb.tree_level, buf);
				EncodeUtils.int32ToByte(tb.fertilize_count, buf);
				EncodeUtils.int32ToByte(tb.watering_count, buf);
				EncodeUtils.int32ToByte(tb.level_reward, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.left_fertilizer = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.tree_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fertilize_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.watering_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.level_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_fertilize_watering"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_watering_competition() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_watering_competition"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_watering_competition"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_watering_competition() {
		let tb: any = {
			watering_list: [],
			remain_seconds: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_watering_competition"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.watering_list.length, buf);
				for (let i = 0; i < tb.watering_list.length; ++i) {
					tb.watering_list[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.remain_seconds, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let watering_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < watering_list_len; ++i) {
					let tmp = watering_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.watering_list.push(tmp);
				}
				tb.remain_seconds = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_watering_competition"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_invite_friend() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_invite_friend"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_invite_friend"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_invite_friend() {
		let tb: any = {
			friend_count: 0,
			role_id1: 0,
			nickname1: '',
			head_photo1: '',
			role_id2: 0,
			nickname2: '',
			head_photo2: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.friend_count, buf);
				EncodeUtils.int64ToByte(tb.role_id1, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname1, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo1, buf);
				EncodeUtils.int64ToByte(tb.role_id2, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname2, buf);
				EncodeUtils.utf8StrtoBytes(tb.head_photo2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.friend_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.role_id1 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname1_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname1 = nickname1_value[0];
				startIndex += nickname1_value[1];
				let head_photo1_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo1 = head_photo1_value[0];
				startIndex += head_photo1_value[1];
				tb.role_id2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname2_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname2 = nickname2_value[0];
				startIndex += nickname2_value[1];
				let head_photo2_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo2 = head_photo2_value[0];
				startIndex += head_photo2_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_get_water_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_get_water_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_water_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_get_water_list() {
		let tb: any = {
			water_task: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_get_water_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.water_task.length, buf);
				for (let i = 0; i < tb.water_task.length; ++i) {
					tb.water_task[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let water_task_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < water_task_len; ++i) {
					let tmp = get_water_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.water_task.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_water_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_get_water() {
		let tb: any = {
			task_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_get_water"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.task_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_water"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_get_water() {
		let tb: any = {
			water_count: 0,
			left_water_count: 0,
			state: 0,
			state_arr: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_get_water"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.water_count, buf);
				EncodeUtils.int32ToByte(tb.left_water_count, buf);
				EncodeUtils.int32ToByte(tb.state, buf);
				EncodeUtils.uInt16ToByte(tb.state_arr.length, buf);
				for (let i = 0; i < tb.state_arr.length; ++i) {
					EncodeUtils.int32ToByte(tb.state_arr[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let state_arr_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < state_arr_len; ++i) {
					tb.state_arr.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_water"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_get_fertilizer_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_get_fertilizer_list() {
		let tb: any = {
			fertilizer_task: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.fertilizer_task.length, buf);
				for (let i = 0; i < tb.fertilizer_task.length; ++i) {
					tb.fertilizer_task[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let fertilizer_task_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < fertilizer_task_len; ++i) {
					let tmp = get_water_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.fertilizer_task.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_get_fertilizer() {
		let tb: any = {
			reward_type: 0,
			task_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.reward_type, buf);
				EncodeUtils.int32ToByte(tb.task_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.reward_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_get_fertilizer() {
		let tb: any = {
			fertilizer_count: 0,
			left_fertilizer_count: 0,
			is_get_gift: 0,
			nickname2: '',
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.fertilizer_count, buf);
				EncodeUtils.int32ToByte(tb.left_fertilizer_count, buf);
				EncodeUtils.int32ToByte(tb.is_get_gift, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname2, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.fertilizer_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_fertilizer_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.is_get_gift = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let nickname2_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname2 = nickname2_value[0];
				startIndex += nickname2_value[1];
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_invite_friend_get_gift() {
		let tb: any = {
			reward_type: 0,
			task_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_invite_friend_get_gift"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.reward_type, buf);
				EncodeUtils.int32ToByte(tb.task_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.reward_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_invite_friend_get_gift"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_invite_friend_get_gift() {
		let tb: any = {
			gift_type: 0,
			gift_count: 0,
			left_water_count: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend_get_gift"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.gift_type, buf);
				EncodeUtils.int32ToByte(tb.gift_count, buf);
				EncodeUtils.int32ToByte(tb.left_water_count, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.gift_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.gift_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend_get_gift"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_get_reward() {
		let tb: any = {
			reward_count: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_get_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.reward_count, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.reward_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_get_reward() {
		let tb: any = {
			level: 0,
			watering_count: 0,
			fertilize_count: 0,
			level_reward: 0,
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_get_reward"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.watering_count, buf);
				EncodeUtils.int32ToByte(tb.fertilize_count, buf);
				EncodeUtils.int32ToByte(tb.level_reward, buf);
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.watering_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.fertilize_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.level_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_reward"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dragon_fortune_claim_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dragon_fortune_claim_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dragon_fortune_claim_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dragon_fortune_claim_info() {
		let tb: any = {
			gift_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dragon_fortune_claim_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.gift_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.gift_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_claim_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_history_100() {
		let tb: any = {
			killroom: 0,
			killcount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_history_100"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.killroom, buf);
				EncodeUtils.int32ToByte(tb.killcount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.killcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_history_100"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_history_10() {
		let tb: any = {
			killroom: 0,
			roundid: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_history_10"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.killroom, buf);
				EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roundid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.roundid = roundid_value[0];
				startIndex += roundid_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_history_10"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_betchips() {
		let tb: any = {
			value: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_betchips"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.value, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_betchips"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_bet_info() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			poolIndex: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_bet_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_bet_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_totalbet_info() {
		let tb: any = {
			poolIndex: 0,
			money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_totalbet_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_totalbet_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_gameover_time() {
		let tb: any = {
			poolIndex: 0,
			time: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_gameover_time"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.time, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_gameover_time"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_self_record_detail() {
		let tb: any = {
			roundid: '',
			create_timestamp: 0,
			bet: 0,
			win: 0,
			betpool: 0,
			winpool: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_self_record_detail"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
				EncodeUtils.int64ToByte(tb.create_timestamp, buf);
				EncodeUtils.int64ToByte(tb.bet, buf);
				EncodeUtils.int64ToByte(tb.win, buf);
				EncodeUtils.int32ToByte(tb.betpool, buf);
				EncodeUtils.int32ToByte(tb.winpool, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let roundid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.roundid = roundid_value[0];
				startIndex += roundid_value[1];
				tb.create_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.win = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.betpool = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.winpool = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_self_record_detail"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function dataosha_self_record() {
		let tb: any = {
			totalbet: 0,
			totalwin: 0,
			selfdetail: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_dataosha_self_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.totalbet, buf);
				EncodeUtils.int64ToByte(tb.totalwin, buf);
				EncodeUtils.uInt16ToByte(tb.selfdetail.length, buf);
				for (let i = 0; i < tb.selfdetail.length; ++i) {
					tb.selfdetail[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.totalbet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.totalwin = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let selfdetail_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < selfdetail_len; ++i) {
					let tmp = dataosha_self_record_detail();
					startIndex += tmp.decode(buf, startIndex);
					tb.selfdetail.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_dataosha_self_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dataosha_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dataosha_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dataosha_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_info() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			killroom: 0,
			killroomtotalbet: 0,
			winamount: 0,
			all_betinfo: [],
			totalbetAmount: [],
			gameover_time: [],
			bet_time: 0,
			betchips: [],
			self_betinfo: dataosha_bet_info(),
			min_bet: 0,
			max_bet: 0,
			server_timestamp: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.killroom, buf);
				EncodeUtils.int64ToByte(tb.killroomtotalbet, buf);
				EncodeUtils.int64ToByte(tb.winamount, buf);
				EncodeUtils.uInt16ToByte(tb.all_betinfo.length, buf);
				for (let i = 0; i < tb.all_betinfo.length; ++i) {
					tb.all_betinfo[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.totalbetAmount.length, buf);
				for (let i = 0; i < tb.totalbetAmount.length; ++i) {
					tb.totalbetAmount[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.gameover_time.length, buf);
				for (let i = 0; i < tb.gameover_time.length; ++i) {
					tb.gameover_time[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.bet_time, buf);
				EncodeUtils.uInt16ToByte(tb.betchips.length, buf);
				for (let i = 0; i < tb.betchips.length; ++i) {
					tb.betchips[i].encode(buf);
				}
				tb.self_betinfo.encode(buf);
				EncodeUtils.int32ToByte(tb.min_bet, buf);
				EncodeUtils.int64ToByte(tb.max_bet, buf);
				EncodeUtils.int64ToByte(tb.server_timestamp, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.killroomtotalbet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.winamount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let all_betinfo_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < all_betinfo_len; ++i) {
					let tmp = dataosha_bet_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.all_betinfo.push(tmp);
				}
				let totalbetAmount_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < totalbetAmount_len; ++i) {
					let tmp = dataosha_totalbet_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.totalbetAmount.push(tmp);
				}
				let gameover_time_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < gameover_time_len; ++i) {
					let tmp = dataosha_gameover_time();
					startIndex += tmp.decode(buf, startIndex);
					tb.gameover_time.push(tmp);
				}
				tb.bet_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let betchips_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < betchips_len; ++i) {
					let tmp = dataosha_betchips();
					startIndex += tmp.decode(buf, startIndex);
					tb.betchips.push(tmp);
				}
				startIndex += tb.self_betinfo.decode(buf, startIndex);
				tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_gameover() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			betmoney: 0,
			killroom: 0,
			killroomtotalbet: 0,
			winamount: 0,
			cur_money: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_gameover"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int64ToByte(tb.betmoney, buf);
				EncodeUtils.int32ToByte(tb.killroom, buf);
				EncodeUtils.int64ToByte(tb.killroomtotalbet, buf);
				EncodeUtils.int64ToByte(tb.winamount, buf);
				EncodeUtils.int64ToByte(tb.cur_money, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.betmoney = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.killroomtotalbet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.winamount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_gameover"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_batch_dataosha_stage() {
		let tb: any = {
			stageIndex: 0,
			end_time: stime(),
			killroom: 0,
			end_time2: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_batch_dataosha_stage"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.stageIndex, buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.killroom, buf);
				EncodeUtils.int64ToByte(tb.end_time2, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_batch_dataosha_stage"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_others_enter() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_others_enter"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_others_enter"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_others_leave() {
		let tb: any = {
			role_id: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_others_leave"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_others_leave"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dataosha_bet() {
		let tb: any = {
			poolIndex: 0,
			bet_money: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dataosha_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dataosha_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rsp_dataosha_bet() {
		let tb: any = {
			result: 0,
			poolIndex: 0,
			bet_money: 0,
			pre_poolIndex: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_rsp_dataosha_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
				EncodeUtils.int32ToByte(tb.pre_poolIndex, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pre_poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rsp_dataosha_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_others_bet() {
		let tb: any = {
			role_id: 0,
			nickname: '',
			poolIndex: 0,
			bet_money: 0,
			pre_poolIndex: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_others_bet"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
				EncodeUtils.int32ToByte(tb.poolIndex, buf);
				EncodeUtils.int32ToByte(tb.bet_money, buf);
				EncodeUtils.int32ToByte(tb.pre_poolIndex, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
				startIndex += nickname_value[1];
				tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pre_poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_others_bet"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dataosha_rank() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dataosha_rank"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dataosha_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_dataosha_rank() {
		let tb: any = {
			rank_item: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_dataosha_rank"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
				for (let i = 0; i < tb.rank_item.length; ++i) {
					tb.rank_item[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < rank_item_len; ++i) {
					let tmp = minigame_rank_item();
					startIndex += tmp.decode(buf, startIndex);
					tb.rank_item.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_dataosha_rank"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_dataosha_history() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_dataosha_history"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_dataosha_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function rsp_dataosha_history() {
		let tb: any = {
			history_100: [],
			history_10: [],
			self_record: dataosha_self_record(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_rsp_dataosha_history"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.history_100.length, buf);
				for (let i = 0; i < tb.history_100.length; ++i) {
					tb.history_100[i].encode(buf);
				}
				EncodeUtils.uInt16ToByte(tb.history_10.length, buf);
				for (let i = 0; i < tb.history_10.length; ++i) {
					tb.history_10[i].encode(buf);
				}
				tb.self_record.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let history_100_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_100_len; ++i) {
					let tmp = dataosha_history_100();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_100.push(tmp);
				}
				let history_10_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < history_10_len; ++i) {
					let tmp = dataosha_history_10();
					startIndex += tmp.decode(buf, startIndex);
					tb.history_10.push(tmp);
				}
				startIndex += tb.self_record.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_rsp_dataosha_history"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_mjhl2_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_mjhl2_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_mjhl2_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_mjhl2_info() {
		let tb: any = {
			singlebet: 0,
			bet_index: [],
			line: 0,
			free_spins: 0,
			locked_bet: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_mjhl2_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.singlebet, buf);
				EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
				for (let i = 0; i < tb.bet_index.length; ++i) {
					EncodeUtils.int32ToByte(tb.bet_index[i], buf);
				}
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.locked_bet, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_index_len; ++i) {
					tb.bet_index.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.locked_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_mjhl2_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_mjhl2_spin() {
		let tb: any = {
			line: 0,
			bet_index: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_mjhl2_spin"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.line, buf);
				EncodeUtils.int32ToByte(tb.bet_index, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_mjhl2_spin"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_mjhl2_spin_result() {
		let tb: any = {
			symbol_list: [],
			bet_index: 0,
			money: 0,
			free_spins: 0,
			left_free_spins: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_mjhl2_spin_result"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
				for (let i = 0; i < tb.symbol_list.length; ++i) {
					EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
				}
				EncodeUtils.int32ToByte(tb.bet_index, buf);
				EncodeUtils.int64ToByte(tb.money, buf);
				EncodeUtils.int32ToByte(tb.free_spins, buf);
				EncodeUtils.int32ToByte(tb.left_free_spins, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < symbol_list_len; ++i) {
					tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
				}
				tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.left_free_spins = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_mjhl2_spin_result"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_daily_return_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_daily_return_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_daily_return_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_daily_return_info() {
		let tb: any = {
			level: 0,
			ratio: 0,
			personal_money: 0,
			team_money: 0,
			s_link: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_daily_return_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.ratio, buf);
				EncodeUtils.int64ToByte(tb.personal_money, buf);
				EncodeUtils.int64ToByte(tb.team_money, buf);
				EncodeUtils.utf8StrtoBytes(tb.s_link, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.ratio = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.personal_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.team_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let s_link_value = EncodeUtils.byteToString(buf, startIndex);
				tb.s_link = s_link_value[0];
				startIndex += s_link_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_daily_return_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_daily_return_claim() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_daily_return_claim"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_daily_return_claim"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_daily_return_claim() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_daily_return_claim"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_daily_return_claim"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function daily_return_record() {
		let tb: any = {
			role_id: 0,
			level: 0,
			team_num: 0,
			personal_bet: 0,
			team_bet: 0,
			personal_return: 0,
			team_return: 0,
			username: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_daily_return_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.level, buf);
				EncodeUtils.int32ToByte(tb.team_num, buf);
				EncodeUtils.int64ToByte(tb.personal_bet, buf);
				EncodeUtils.int64ToByte(tb.team_bet, buf);
				EncodeUtils.int64ToByte(tb.personal_return, buf);
				EncodeUtils.int64ToByte(tb.team_return, buf);
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.team_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.personal_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.team_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.personal_return = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.team_return = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_daily_return_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_daily_return_his() {
		let tb: any = {
			search_name: '',
			search_lev: 0,
			start_time: stime(),
			end_time: stime(),
			page: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_daily_return_his"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.search_name, buf);
				EncodeUtils.int32ToByte(tb.search_lev, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.page, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let search_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.search_name = search_name_value[0];
				startIndex += search_name_value[1];
				tb.search_lev = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_daily_return_his"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_daily_return_his() {
		let tb: any = {
			records: [],
			total: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_daily_return_his"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.records.length, buf);
				for (let i = 0; i < tb.records.length; ++i) {
					tb.records[i].encode(buf);
				}
				EncodeUtils.int32ToByte(tb.total, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let records_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < records_len; ++i) {
					let tmp = daily_return_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.records.push(tmp);
				}
				tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_daily_return_his"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_improve_agent_lev() {
		let tb: any = {
			role_id: '',
			level: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_improve_agent_lev"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.level, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
				startIndex += role_id_value[1];
				tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_improve_agent_lev"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_improve_agent_lev() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_improve_agent_lev"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_improve_agent_lev"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_email_verification_code() {
		let tb: any = {
			operate_type: 0,
			email: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_email_verification_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.email, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let email_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email = email_value[0];
				startIndex += email_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_email_verification_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_email_verification_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_email_verification_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_email_verification_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bind_modify_email() {
		let tb: any = {
			username: '',
			password: '',
			operate_type: 0,
			sign: '',
			ip: '',
			ip_error: '',
			device_model: '',
			channel_id: 0,
			agent_id: 0,
			aaa: '',
			bbb: '',
			captcha: '',
			email: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bind_modify_email"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.utf8StrtoBytes(tb.password, buf);
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip, buf);
				EncodeUtils.utf8StrtoBytes(tb.ip_error, buf);
				EncodeUtils.utf8StrtoBytes(tb.device_model, buf);
				EncodeUtils.int32ToByte(tb.channel_id, buf);
				EncodeUtils.int32ToByte(tb.agent_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
				EncodeUtils.utf8StrtoBytes(tb.email, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
				startIndex += password_value[1];
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
				startIndex += ip_value[1];
				let ip_error_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip_error = ip_error_value[0];
				startIndex += ip_error_value[1];
				let device_model_value = EncodeUtils.byteToString(buf, startIndex);
				tb.device_model = device_model_value[0];
				startIndex += device_model_value[1];
				tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.agent_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				let email_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email = email_value[0];
				startIndex += email_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bind_modify_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bind_modify_email() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bind_modify_email"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bind_modify_email"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_can_modify_account() {
		let tb: any = {
			operate_type: 0,
			newusername: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_can_modify_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.newusername, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let newusername_value = EncodeUtils.byteToString(buf, startIndex);
				tb.newusername = newusername_value[0];
				startIndex += newusername_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_can_modify_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_can_modify_account() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_can_modify_account"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_can_modify_account"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_reset_account_password() {
		let tb: any = {
			username: '',
			modify_type: 0,
			operate_type: 0,
			mobile_or_email: '',
			captcha: '',
			old_password: '',
			new_password: '',
			new_password_confirm: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_reset_account_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.username, buf);
				EncodeUtils.int32ToByte(tb.modify_type, buf);
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.mobile_or_email, buf);
				EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
				EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
				startIndex += username_value[1];
				tb.modify_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let mobile_or_email_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile_or_email = mobile_or_email_value[0];
				startIndex += mobile_or_email_value[1];
				let captcha_value = EncodeUtils.byteToString(buf, startIndex);
				tb.captcha = captcha_value[0];
				startIndex += captcha_value[1];
				let old_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.old_password = old_password_value[0];
				startIndex += old_password_value[1];
				let new_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password = new_password_value[0];
				startIndex += new_password_value[1];
				let new_password_confirm_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password_confirm = new_password_confirm_value[0];
				startIndex += new_password_confirm_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_reset_account_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_reset_account_password() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_reset_account_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_reset_account_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_open_or_close_withdraw_password() {
		let tb: any = {
			role_id: 0,
			operate_type: 0,
			withdraw_password: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_open_or_close_withdraw_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.withdraw_password, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let withdraw_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.withdraw_password = withdraw_password_value[0];
				startIndex += withdraw_password_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_open_or_close_withdraw_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_open_or_close_withdraw_password() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_open_or_close_withdraw_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_open_or_close_withdraw_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_bind_or_modify_withdraw_password() {
		let tb: any = {
			role_id: 0,
			operate_type: 0,
			old_password: '',
			new_password: '',
			new_password_confirm: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_bind_or_modify_withdraw_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.role_id, buf);
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
				EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let old_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.old_password = old_password_value[0];
				startIndex += old_password_value[1];
				let new_password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password = new_password_value[0];
				startIndex += new_password_value[1];
				let new_password_confirm_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_password_confirm = new_password_confirm_value[0];
				startIndex += new_password_confirm_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_bind_or_modify_withdraw_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_bind_or_modify_withdraw_password() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_bind_or_modify_withdraw_password"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_bind_or_modify_withdraw_password"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function bet_record() {
		let tb: any = {
			platform_id: '',
			game_type: '',
			bet_total: 0,
			net_value: 0,
			balance_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_bet_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.platform_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.game_type, buf);
				EncodeUtils.int64ToByte(tb.bet_total, buf);
				EncodeUtils.int64ToByte(tb.net_value, buf);
				tb.balance_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let platform_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.platform_id = platform_id_value[0];
				startIndex += platform_id_value[1];
				let game_type_value = EncodeUtils.byteToString(buf, startIndex);
				tb.game_type = game_type_value[0];
				startIndex += game_type_value[1];
				tb.bet_total = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.net_value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				startIndex += tb.balance_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_bet_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_bet_record_list() {
		let tb: any = {
			platform_id: '',
			game_type: '',
			play_type: '',
			start_time: stime(),
			end_time: stime(),
			page_num: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_bet_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.platform_id, buf);
				EncodeUtils.utf8StrtoBytes(tb.game_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.play_type, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.page_num, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let platform_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.platform_id = platform_id_value[0];
				startIndex += platform_id_value[1];
				let game_type_value = EncodeUtils.byteToString(buf, startIndex);
				tb.game_type = game_type_value[0];
				startIndex += game_type_value[1];
				let play_type_value = EncodeUtils.byteToString(buf, startIndex);
				tb.play_type = play_type_value[0];
				startIndex += play_type_value[1];
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.page_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_bet_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_bet_record_list() {
		let tb: any = {
			total_pages: 0,
			bet_record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_bet_record_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_pages, buf);
				EncodeUtils.uInt16ToByte(tb.bet_record_list.length, buf);
				for (let i = 0; i < tb.bet_record_list.length; ++i) {
					tb.bet_record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_pages = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bet_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_record_list_len; ++i) {
					let tmp = bet_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_bet_record_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_bet_record_list_by_page() {
		let tb: any = {
			page_num: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_bet_record_list_by_page"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page_num, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_bet_record_list_by_page"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_bet_record_list_by_page() {
		let tb: any = {
			bet_record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_bet_record_list_by_page"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.bet_record_list.length, buf);
				for (let i = 0; i < tb.bet_record_list.length; ++i) {
					tb.bet_record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bet_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < bet_record_list_len; ++i) {
					let tmp = bet_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.bet_record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_bet_record_list_by_page"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_auto_trans() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_auto_trans"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_auto_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_auto_trans() {
		let tb: any = {
			auto_trans: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_auto_trans"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.auto_trans, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.auto_trans = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_auto_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_inner_trans() {
		let tb: any = {
			to_bank: 0,
			amount: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_inner_trans"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.to_bank, buf);
				EncodeUtils.int64ToByte(tb.amount, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.to_bank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_inner_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_inner_trans() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_inner_trans"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_inner_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_user_info() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_user_info"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_user_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_user_info() {
		let tb: any = {
			result: 0,
			full_name: '',
			email: '',
			currency: 0,
			country: 0,
			usdt_rate: 0,
			real_name: '',
			mobile: '',
			account_type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_user_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
				EncodeUtils.utf8StrtoBytes(tb.full_name, buf);
				EncodeUtils.utf8StrtoBytes(tb.email, buf);
				EncodeUtils.int32ToByte(tb.currency, buf);
				EncodeUtils.int32ToByte(tb.country, buf);
				EncodeUtils.int32ToByte(tb.usdt_rate, buf);
				EncodeUtils.utf8StrtoBytes(tb.real_name, buf);
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
				EncodeUtils.int32ToByte(tb.account_type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let full_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.full_name = full_name_value[0];
				startIndex += full_name_value[1];
				let email_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email = email_value[0];
				startIndex += email_value[1];
				tb.currency = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.country = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.usdt_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let real_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.real_name = real_name_value[0];
				startIndex += real_name_value[1];
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				tb.account_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_user_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_set_default_bankcard() {
		let tb: any = {
			bankcard: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_set_default_bankcard"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.bankcard, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bankcard_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bankcard = bankcard_value[0];
				startIndex += bankcard_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_set_default_bankcard"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_set_default_bankcard() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_set_default_bankcard"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_set_default_bankcard"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_agent_trans() {
		let tb: any = {
			amount: 0,
			name: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_agent_trans"];
			},
			encode: function (buf: any) {
				EncodeUtils.int64ToByte(tb.amount, buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_agent_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_agent_trans() {
		let tb: any = {
			rlt: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_agent_trans"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_agent_trans"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_activites() {
		let tb: any = {
			show: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_activites"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.show, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.show = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_activites"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function activity_info() {
		let tb: any = {
			id: 0,
			tag: '',
			pic_link: '',
			name: '',
			restrict: '',
			content: '',
			details: '',
			rules: '',
			total: 0,
			current: 0,
			bonus: 0,
			have_save: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_activity_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.tag, buf);
				EncodeUtils.utf8StrtoBytes(tb.pic_link, buf);
				EncodeUtils.utf8StrtoBytes(tb.name, buf);
				EncodeUtils.utf8StrtoBytes(tb.restrict, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
				EncodeUtils.utf8StrtoBytes(tb.details, buf);
				EncodeUtils.utf8StrtoBytes(tb.rules, buf);
				EncodeUtils.int64ToByte(tb.total, buf);
				EncodeUtils.int64ToByte(tb.current, buf);
				EncodeUtils.int64ToByte(tb.bonus, buf);
				EncodeUtils.utf8StrtoBytes(tb.have_save, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tag_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tag = tag_value[0];
				startIndex += tag_value[1];
				let pic_link_value = EncodeUtils.byteToString(buf, startIndex);
				tb.pic_link = pic_link_value[0];
				startIndex += pic_link_value[1];
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
				startIndex += name_value[1];
				let restrict_value = EncodeUtils.byteToString(buf, startIndex);
				tb.restrict = restrict_value[0];
				startIndex += restrict_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				let details_value = EncodeUtils.byteToString(buf, startIndex);
				tb.details = details_value[0];
				startIndex += details_value[1];
				let rules_value = EncodeUtils.byteToString(buf, startIndex);
				tb.rules = rules_value[0];
				startIndex += rules_value[1];
				tb.total = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.current = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.bonus = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let have_save_value = EncodeUtils.byteToString(buf, startIndex);
				tb.have_save = have_save_value[0];
				startIndex += have_save_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_activity_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_activites() {
		let tb: any = {
			promo: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_activites"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.promo.length, buf);
				for (let i = 0; i < tb.promo.length; ++i) {
					tb.promo[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let promo_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < promo_len; ++i) {
					let tmp = activity_info();
					startIndex += tmp.decode(buf, startIndex);
					tb.promo.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_activites"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_login_captcha() {
		let tb: any = {
			sign: '',
			aaa: '',
			bbb: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_login_captcha"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.sign, buf);
				EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
				EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let sign_value = EncodeUtils.byteToString(buf, startIndex);
				tb.sign = sign_value[0];
				startIndex += sign_value[1];
				let aaa_value = EncodeUtils.byteToString(buf, startIndex);
				tb.aaa = aaa_value[0];
				startIndex += aaa_value[1];
				let bbb_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bbb = bbb_value[0];
				startIndex += bbb_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_login_captcha"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_login_captcha() {
		let tb: any = {
			url: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_login_captcha"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.url, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
				startIndex += url_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_login_captcha"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_vip_daily_claim() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_vip_daily_claim"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_vip_daily_claim"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_mobile_sms_code() {
		let tb: any = {
			operate_type: 0,
			mobile: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_mobile_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.operate_type, buf);
				EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
				startIndex += mobile_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_mobile_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_mobile_sms_code() {
		let tb: any = {
			code: 0,
			message: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_mobile_sms_code"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.code, buf);
				EncodeUtils.utf8StrtoBytes(tb.message, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
				startIndex += message_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_mobile_sms_code"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function plat_rec() {
		let tb: any = {
			id: 0,
			platform: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_plat_rec"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.id, buf);
				EncodeUtils.utf8StrtoBytes(tb.platform, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let platform_value = EncodeUtils.byteToString(buf, startIndex);
				tb.platform = platform_value[0];
				startIndex += platform_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_plat_rec"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_platform_gametype_list() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_platform_gametype_list"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_platform_gametype_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_platform_gametype_list() {
		let tb: any = {
			plat_rec_list: [],
			gtype_rec_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_platform_gametype_list"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.plat_rec_list.length, buf);
				for (let i = 0; i < tb.plat_rec_list.length; ++i) {
					EncodeUtils.utf8StrtoBytes(tb.plat_rec_list[i], buf);
				}
				EncodeUtils.uInt16ToByte(tb.gtype_rec_list.length, buf);
				for (let i = 0; i < tb.gtype_rec_list.length; ++i) {
					EncodeUtils.utf8StrtoBytes(tb.gtype_rec_list[i], buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let plat_rec_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < plat_rec_list_len; ++i) {
					let plat_rec_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.plat_rec_list.push(plat_rec_list_value[0]);
					startIndex += plat_rec_list_value[1];
				}
				let gtype_rec_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < gtype_rec_list_len; ++i) {
					let gtype_rec_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.gtype_rec_list.push(gtype_rec_list_value[0]);
					startIndex += gtype_rec_list_value[1];
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_platform_gametype_list"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_agent_accounting_change() {
		let tb: any = {
			page: 0,
			start_time: stime(),
			end_time: stime(),
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_agent_accounting_change"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_agent_accounting_change"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_get_audit_record() {
		let tb: any = {
			page: 0,
			start_time: stime(),
			end_time: stime(),
			type: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_get_audit_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.page, buf);
				tb.start_time.encode(buf);
				tb.end_time.encode(buf);
				EncodeUtils.int32ToByte(tb.type, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.start_time.decode(buf, startIndex);
				startIndex += tb.end_time.decode(buf, startIndex);
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_get_audit_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function audit_record() {
		let tb: any = {
			title: '',
			amount: 0,
			progess: 0,
			type: 0,
			create_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_audit_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.title, buf);
				EncodeUtils.int64ToByte(tb.amount, buf);
				EncodeUtils.int64ToByte(tb.progess, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				tb.create_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let title_value = EncodeUtils.byteToString(buf, startIndex);
				tb.title = title_value[0];
				startIndex += title_value[1];
				tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.progess = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				startIndex += tb.create_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_audit_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_audit_record() {
		let tb: any = {
			total_page: 0,
			record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_audit_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_page, buf);
				EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
				for (let i = 0; i < tb.record_list.length; ++i) {
					tb.record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_list_len; ++i) {
					let tmp = audit_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_audit_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function agent_accounting_change_record() {
		let tb: any = {
			type: 0,
			pay_money: 0,
			item: 0,
			trans_to: '',
			create_time: stime(),
			getMsgID: function () {
				return NetMsgType.msgType["msg_agent_accounting_change_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.int64ToByte(tb.pay_money, buf);
				EncodeUtils.int32ToByte(tb.item, buf);
				EncodeUtils.utf8StrtoBytes(tb.trans_to, buf);
				tb.create_time.encode(buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.pay_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.item = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let trans_to_value = EncodeUtils.byteToString(buf, startIndex);
				tb.trans_to = trans_to_value[0];
				startIndex += trans_to_value[1];
				startIndex += tb.create_time.decode(buf, startIndex);
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_agent_accounting_change_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_get_agent_accounting_change() {
		let tb: any = {
			total_page: 0,
			record_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_get_agent_accounting_change"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.total_page, buf);
				EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
				for (let i = 0; i < tb.record_list.length; ++i) {
					tb.record_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < record_list_len; ++i) {
					let tmp = agent_accounting_change_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.record_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_get_agent_accounting_change"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notice_record() {
		let tb: any = {
			position: 0,
			type: 0,
			title: '',
			content: '',
			priority: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notice_record"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.position, buf);
				EncodeUtils.int32ToByte(tb.type, buf);
				EncodeUtils.utf8StrtoBytes(tb.title, buf);
				EncodeUtils.utf8StrtoBytes(tb.content, buf);
				EncodeUtils.int32ToByte(tb.priority, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.position = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let title_value = EncodeUtils.byteToString(buf, startIndex);
				tb.title = title_value[0];
				startIndex += title_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
				startIndex += content_value[1];
				tb.priority = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notice_record"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_send_system_notice() {
		let tb: any = {
			notice_list: [],
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_send_system_notice"];
			},
			encode: function (buf: any) {
				EncodeUtils.uInt16ToByte(tb.notice_list.length, buf);
				for (let i = 0; i < tb.notice_list.length; ++i) {
					tb.notice_list[i].encode(buf);
				}
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let notice_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
				startIndex += 2;
				for (let i = 0; i < notice_list_len; ++i) {
					let tmp = notice_record();
					startIndex += tmp.decode(buf, startIndex);
					tb.notice_list.push(tmp);
				}
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_send_system_notice"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_can_withdraw() {
		let tb: any = {
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_can_withdraw"];
			},
			encode: function (_buf: any) {
			},
			decode: function (_buf: any, index: number) {
				let startIndex = index;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_can_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_can_withdraw() {
		let tb: any = {
			rlt: 0,
			can_withdraw: 0,
			canot_withdraw: 0,
			turnover: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_can_withdraw"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.rlt, buf);
				EncodeUtils.int64ToByte(tb.can_withdraw, buf);
				EncodeUtils.int64ToByte(tb.canot_withdraw, buf);
				EncodeUtils.int64ToByte(tb.turnover, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				tb.can_withdraw = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.canot_withdraw = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				tb.turnover = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_can_withdraw"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function req_del_bank_card_info() {
		let tb: any = {
			bankcard: '',
			getMsgID: function () {
				return NetMsgType.msgType["msg_req_del_bank_card_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.utf8StrtoBytes(tb.bankcard, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				let bankcard_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bankcard = bankcard_value[0];
				startIndex += bankcard_value[1];
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_req_del_bank_card_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
	export function notify_del_bank_card_info() {
		let tb: any = {
			result: 0,
			getMsgID: function () {
				return NetMsgType.msgType["msg_notify_del_bank_card_info"];
			},
			encode: function (buf: any) {
				EncodeUtils.int32ToByte(tb.result, buf);
			},
			decode: function (buf: any, index: number) {
				let startIndex = index;
				tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
			build: function (buf: any) {
				EncodeUtils.uInt16ToByte(NetMsgType.msgType["msg_notify_del_bank_card_info"], buf);
				return tb.encode(buf);
			}
		};
		return tb;
	}
}