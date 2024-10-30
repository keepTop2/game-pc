import { EncodeUtils } from "@/net/EncodeUtils";
import { NetMsgType } from "./NetMsgType";

export module NetPacket
{
    export function stime()
    {
        let tb = {
    	    year : 0,
    	    month : 0,
    	    day : 0,
    	    hour : 0,
    	    minute : 0,
    	    second : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_stime"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.year, buf);
    		    EncodeUtils.int32ToByte(tb.month, buf);
    		    EncodeUtils.int32ToByte(tb.day, buf);
    		    EncodeUtils.int32ToByte(tb.hour, buf);
    		    EncodeUtils.int32ToByte(tb.minute, buf);
    		    EncodeUtils.int32ToByte(tb.second, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_stime"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function game_record_item()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    bet_count : 0,
    	    get_count : 0,
    	    update_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_game_record_item"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.int64ToByte(tb.bet_count, buf);
    			EncodeUtils.int64ToByte(tb.get_count, buf);
        		tb.update_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_game_record_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_init_connect()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_init_connect"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_init_connect"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_check_version()
    {
        let tb = {
    	    version : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_check_version"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.version, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.version = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_check_version"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_check_version()
    {
        let tb = {
    	    result : 0,
    	    curtime : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_check_version"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		tb.curtime.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.curtime.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_check_version"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_heartbeat()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_heartbeat"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_heartbeat"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_check_time()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_check_time"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_check_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_check_time()
    {
        let tb = {
    	    curtime : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_check_time"];
    		},
		    encode:function(buf)
		    {
        		tb.curtime.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.curtime.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_check_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_sys_msg()
    {
        let tb = {
    	    code : 0,
    	    type : 0,
    	    Params : [],
    	    priority : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_sys_msg"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
       			EncodeUtils.uInt16ToByte(tb.Params.length, buf);
       			for (let i = 0; i < tb.Params.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.Params[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.priority, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let Params_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < Params_len; ++i)
		 		{
					let Params_value = EncodeUtils.byteToString(buf, startIndex);
					tb.Params.push(Params_value[0]);
					startIndex += Params_value[1];
        		}
        		tb.priority = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_sys_msg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notice_record()
    {
        let tb = {
    	    position : 0,
    	    type : 0,
    	    title : '',
    	    content : '',
    	    priority : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notice_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.position, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.title, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    		    EncodeUtils.int32ToByte(tb.priority, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notice_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_send_system_notice()
    {
        let tb = {
    	    notice_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_send_system_notice"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.notice_list.length, buf);
        		for (let i = 0; i < tb.notice_list.length; ++i)
				{
            		tb.notice_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let notice_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < notice_list_len; ++i)
				{
            		let tmp = notice_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.notice_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_send_system_notice"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_register_captcha()
    {
        let tb = {
    	    sign : '',
    	    aaa : '',
    	    bbb : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_register_captcha"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.sign, buf);
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_register_captcha"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_register_captcha()
    {
        let tb = {
    	    url : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_register_captcha"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.url, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
 				startIndex += url_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_register_captcha"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_login_captcha()
    {
        let tb = {
    	    sign : '',
    	    aaa : '',
    	    bbb : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_login_captcha"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.sign, buf);
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_login_captcha"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_login_captcha()
    {
        let tb = {
    	    url : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_login_captcha"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.url, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
 				startIndex += url_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_login_captcha"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_mobile_sms_login_code()
    {
        let tb = {
    	    mobile : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_mobile_sms_login_code"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
 				startIndex += mobile_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_mobile_sms_login_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_get_mobile_sms_login_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_get_mobile_sms_login_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_get_mobile_sms_login_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_email_verification_code()
    {
        let tb = {
    	    operate_type : 0,
    	    email : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_email_verification_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.email, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let email_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email = email_value[0];
 				startIndex += email_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_email_verification_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_email_verification_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_email_verification_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_email_verification_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_register_account()
    {
        let tb = {
    	    username : '',
    	    password : '',
    	    register_type : 0,
    	    sign : '',
    	    ip : '',
    	    ip_error : '',
    	    device_model : '',
    	    channel_id : 0,
    	    agent_id : 0,
    	    aaa : '',
    	    bbb : '',
    	    captcha : '',
    	    currency : 0,
    	    from_url : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_register_account"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_register_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_register_account()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_register_account"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_register_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_create_role()
    {
        let tb = {
    	    nickname : '',
    	    server_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_create_role"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.server_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
 				startIndex += nickname_value[1];
        		tb.server_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_create_role"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_create_role_result()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_create_role_result"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_create_role_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_create_v2()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_create_v2"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_create_v2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_role_login()
    {
        let tb = {
    	    uid : '',
    	    server_id : 0,
    	    token : '',
    	    type : 0,
    	    version : 0,
    	    device_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_role_login"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.uid, buf);
    		    EncodeUtils.int32ToByte(tb.server_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.token, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.version, buf);
    			EncodeUtils.utf8StrtoBytes(tb.device_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_role_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_login_result()
    {
        let tb = {
    	    id : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_login_result"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_login_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_role_login_with_ip()
    {
        let tb = {
    	    uid : '',
    	    server_id : 0,
    	    token : '',
    	    type : 0,
    	    version : 0,
    	    device_id : '',
    	    ip : '',
    	    flag_id : 0,
    	    flag_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_role_login_with_ip"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_role_login_with_ip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_login_check()
    {
        let tb = {
    	    uid : '',
    	    token : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_login_check"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.uid, buf);
    			EncodeUtils.utf8StrtoBytes(tb.token, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let uid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uid = uid_value[0];
 				startIndex += uid_value[1];
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
 				startIndex += token_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_login_check"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_login_check_result()
    {
        let tb = {
    	    result : 0,
    	    error_code : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_login_check_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.error_code, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.error_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_login_check_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_user_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_user_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_user_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_user_info()
    {
        let tb = {
    	    result : 0,
    	    full_name : '',
    	    email : '',
    	    currency : 0,
    	    country : 0,
    	    usdt_rate : 0,
    	    real_name : '',
    	    mobile : '',
    	    account_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_user_info"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_user_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_repeat_login()
    {
        let tb = {
    	    account : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_repeat_login"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.account, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let account_value = EncodeUtils.byteToString(buf, startIndex);
				tb.account = account_value[0];
 				startIndex += account_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_repeat_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_kickplayer_reason()
    {
        let tb = {
    	    reason : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_kickplayer_reason"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.reason, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let reason_value = EncodeUtils.byteToString(buf, startIndex);
				tb.reason = reason_value[0];
 				startIndex += reason_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_kickplayer_reason"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_loading_end()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_loading_end"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_loading_end"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bind_account()
    {
        let tb = {
    	    turist_username : '',
    	    turist_password : '',
    	    username : '',
    	    password : '',
    	    nickname : '',
    	    register_type : 0,
    	    sign : '',
    	    ip : '',
    	    ip_error : '',
    	    device_model : '',
    	    channel_id : 0,
    	    agent_id : 0,
    	    aaa : '',
    	    bbb : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bind_account"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bind_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bind_account()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bind_account"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bind_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_mobile_cancel()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_mobile_cancel"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_mobile_cancel"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_mobile_cancel()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_mobile_cancel"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_mobile_cancel"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_update_account_verify_code()
    {
        let tb = {
    	    mobile : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_update_account_verify_code"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
 				startIndex += mobile_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_update_account_verify_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_account_verify_code()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_account_verify_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_account_verify_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_update_account()
    {
        let tb = {
    	    password : '',
    	    verify_code : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_update_account"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.verify_code, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
 				startIndex += password_value[1];
				let verify_code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.verify_code = verify_code_value[0];
 				startIndex += verify_code_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_update_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_account()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_account"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_customer_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_customer_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_customer_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_customer_info()
    {
        let tb = {
    	    url : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_customer_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.url, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.url = url_value[0];
 				startIndex += url_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_customer_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_3rd_game_login()
    {
        let tb = {
    	    agentId : 0,
    	    gameId : '',
    	    kindId : '',
    	    lang : 0,
    	    device_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_3rd_game_login"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.kindId, buf);
    		    EncodeUtils.int32ToByte(tb.lang, buf);
    		    EncodeUtils.int32ToByte(tb.device_type, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		tb.device_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_3rd_game_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_3rd_game_login_result()
    {
        let tb = {
    	    code : 0,
    	    url : '',
    	    msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_3rd_game_login_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.url, buf);
    			EncodeUtils.utf8StrtoBytes(tb.msg, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_3rd_game_login_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_role_single_link_login()
    {
        let tb = {
    	    token : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_role_single_link_login"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.token, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let token_value = EncodeUtils.byteToString(buf, startIndex);
				tb.token = token_value[0];
 				startIndex += token_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_role_single_link_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bind_modify_email()
    {
        let tb = {
    	    username : '',
    	    password : '',
    	    operate_type : 0,
    	    sign : '',
    	    ip : '',
    	    ip_error : '',
    	    device_model : '',
    	    channel_id : 0,
    	    agent_id : 0,
    	    aaa : '',
    	    bbb : '',
    	    captcha : '',
    	    email : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bind_modify_email"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bind_modify_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bind_modify_email()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bind_modify_email"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bind_modify_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_mobile_sms_code()
    {
        let tb = {
    	    operate_type : 0,
    	    mobile : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_mobile_sms_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
 				startIndex += mobile_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_mobile_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_mobile_sms_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_mobile_sms_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_mobile_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_can_modify_account()
    {
        let tb = {
    	    operate_type : 0,
    	    newusername : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_can_modify_account"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.newusername, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let newusername_value = EncodeUtils.byteToString(buf, startIndex);
				tb.newusername = newusername_value[0];
 				startIndex += newusername_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_can_modify_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_can_modify_account()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_can_modify_account"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_can_modify_account"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_reset_account_password()
    {
        let tb = {
    	    username : '',
    	    modify_type : 0,
    	    operate_type : 0,
    	    mobile_or_email : '',
    	    captcha : '',
    	    old_password : '',
    	    new_password : '',
    	    new_password_confirm : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_reset_account_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.modify_type, buf);
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.mobile_or_email, buf);
    			EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
    			EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_reset_account_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_reset_account_password()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_reset_account_password"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_reset_account_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_open_or_close_withdraw_password()
    {
        let tb = {
    	    role_id : 0,
    	    operate_type : 0,
    	    withdraw_password : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_open_or_close_withdraw_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.withdraw_password, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_open_or_close_withdraw_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_open_or_close_withdraw_password()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_open_or_close_withdraw_password"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_open_or_close_withdraw_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bind_or_modify_withdraw_password()
    {
        let tb = {
    	    role_id : 0,
    	    operate_type : 0,
    	    step : 0,
    	    mobile_or_email : '',
    	    captcha : '',
    	    old_password : '',
    	    new_password : '',
    	    new_password_confirm : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bind_or_modify_withdraw_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.operate_type, buf);
    		    EncodeUtils.int32ToByte(tb.step, buf);
    			EncodeUtils.utf8StrtoBytes(tb.mobile_or_email, buf);
    			EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
    			EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.operate_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.step = EncodeUtils.ByteToint32(buf, startIndex);
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bind_or_modify_withdraw_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bind_or_modify_withdraw_password()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bind_or_modify_withdraw_password"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bind_or_modify_withdraw_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_recharge()
    {
        let tb = {
    	    order_id : 0,
    	    user_id : 0,
    	    role_id : 0,
    	    charge_from : 0,
    	    recharge_id : 0,
    	    channel_id : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_recharge"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.order_id, buf);
    			EncodeUtils.int64ToByte(tb.user_id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.charge_from, buf);
    		    EncodeUtils.int32ToByte(tb.recharge_id, buf);
    		    EncodeUtils.int32ToByte(tb.channel_id, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_recharge"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_load_ip()
    {
        let tb = {
    	    role_id : 0,
    	    md5_key : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_load_ip"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.md5_key, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let md5_key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.md5_key = md5_key_value[0];
 				startIndex += md5_key_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_load_ip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_load_id()
    {
        let tb = {
    	    code : 0,
    	    ip_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_load_id"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
       			EncodeUtils.uInt16ToByte(tb.ip_list.length, buf);
       			for (let i = 0; i < tb.ip_list.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.ip_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let ip_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < ip_list_len; ++i)
		 		{
					let ip_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.ip_list.push(ip_list_value[0]);
					startIndex += ip_list_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_load_id"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_login()
    {
        let tb = {
    	    login_type : 0,
    	    username : '',
    	    password : '',
    	    device_id : '',
    	    debug : '',
    	    device_model : '',
    	    app_version : '',
    	    channel_id : 0,
    	    aaa : '',
    	    bbb : '',
    	    ip : '',
    	    captcha : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_login"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_login()
    {
        let tb = {
    	    code : 0,
    	    message : '',
    	    user_id : 0,
    	    token : '',
    	    account_type : 0,
    	    is_default_bankpwd : 0,
    	    tokenid : '',
    	    newguidestate : 0,
    	    ipGroupName : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_login"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_login"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_confirm_agent_level1_transfer()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    transferId : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_confirm_agent_level1_transfer"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    		    EncodeUtils.int32ToByte(tb.transferId, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_confirm_agent_level1_transfer"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_confirm_agent_level1_transfer()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_confirm_agent_level1_transfer"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_confirm_agent_level1_transfer"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_agent_lock_bankmoney()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_agent_lock_bankmoney"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_agent_lock_bankmoney"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_get_agent_lock_bankmoney()
    {
        let tb = {
    	    code : 0,
    	    message : '',
    	    agent_lock_bankmoney : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_get_agent_lock_bankmoney"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    			EncodeUtils.int64ToByte(tb.agent_lock_bankmoney, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_get_agent_lock_bankmoney"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function set_newguidestate()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_set_newguidestate"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_set_newguidestate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_config()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
    	    channel_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_config"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.channel_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_get_config()
    {
        let tb = {
    	    code : 0,
    	    message : '',
    	    share_url : '',
    	    omm_state : 0,
    	    omm_content : '',
    	    rank_status : 0,
    	    rebate_status : 0,
    	    znhl_starttime : 0,
    	    znhl_endtime : 0,
    	    show_rank : 0,
    	    show_user_bind_new : 0,
    	    show_newbees : 0,
    	    show_win_100 : 0,
    	    show_lucky_roulette : 0,
    	    show_first_recharge : 0,
    	    show_rebate : 0,
    	    show_vip : 0,
    	    show_notice : 0,
    	    show_dragon : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_get_config"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_get_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function set_channel()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
    	    channel_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_set_channel"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.channel_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_set_channel"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function set_client_ip()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_set_client_ip"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_set_client_ip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_submit_suggest()
    {
        let tb = {
    	    aaa : '',
    	    bbb : '',
    	    role_id : 0,
    	    content : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_submit_suggest"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.aaa, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bbb, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_submit_suggest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_submit_suggest()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_submit_suggest"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_submit_suggest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_send_sms_check_code()
    {
        let tb = {
    	    username : '',
    	    password : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_send_sms_check_code"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    			EncodeUtils.utf8StrtoBytes(tb.password, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
 				startIndex += password_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_send_sms_check_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_get_send_sms_check_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_get_send_sms_check_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_get_send_sms_check_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_check_sms_code()
    {
        let tb = {
    	    username : '',
    	    verify_code : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_check_sms_code"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.verify_code, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.verify_code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_check_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_check_sms_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_check_sms_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_check_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_reset_password()
    {
        let tb = {
    	    mobile : '',
    	    new_password : '',
    	    verify_code : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_reset_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
    		    EncodeUtils.int32ToByte(tb.verify_code, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_reset_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_reset_password()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_reset_password"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_reset_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_send_create_user_sms_code()
    {
        let tb = {
    	    mobile : '',
    	    ip : '',
    	    type : 0,
    	    username : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_send_create_user_sms_code"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    			EncodeUtils.utf8StrtoBytes(tb.ip, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_send_create_user_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_get_send_create_user_sms_code()
    {
        let tb = {
    	    code : 0,
    	    message : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_get_send_create_user_sms_code"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.code = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let message_value = EncodeUtils.byteToString(buf, startIndex);
				tb.message = message_value[0];
 				startIndex += message_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_get_send_create_user_sms_code"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_add_guest()
    {
        let tb = {
    	    username : '',
    	    password : '',
    	    captcha : '',
    	    sign : '',
    	    ip : '',
    	    ip_error : '',
    	    device_model : '',
    	    aaa : '',
    	    bbb : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_add_guest"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_add_guest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_add_guest()
    {
        let tb = {
    	    code : 0,
    	    message : '',
    	    username : '',
    	    password : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_add_guest"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.message, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    			EncodeUtils.utf8StrtoBytes(tb.password, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_add_guest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_create_v2()
    {
        let tb = {
    	    username : '',
    	    password : '',
    	    verify_code : 0,
    	    sign : '',
    	    ip : '',
    	    ip_error : '',
    	    device_model : '',
    	    channel_id : 0,
    	    agent_id : 0,
    	    aaa : '',
    	    bbb : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_create_v2"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_create_v2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_3rd_game_kick()
    {
        let tb = {
    	    agentId : 0,
    	    gameId : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_3rd_game_kick"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let gameId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameId = gameId_value[0];
 				startIndex += gameId_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_3rd_game_kick"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_recharge_from_third()
    {
        let tb = {
    	    amount : '',
    	    channel_type : 0,
    	    bank_channel_type : 0,
    	    got_discount : 0,
    	    network_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_recharge_from_third"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.amount, buf);
    		    EncodeUtils.int32ToByte(tb.channel_type, buf);
    		    EncodeUtils.int32ToByte(tb.bank_channel_type, buf);
    		    EncodeUtils.int32ToByte(tb.got_discount, buf);
    		    EncodeUtils.int32ToByte(tb.network_type, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		tb.network_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_recharge_from_third"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_recharge_from_third()
    {
        let tb = {
    	    code : 0,
    	    url : '',
    	    msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_recharge_from_third"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.code, buf);
    			EncodeUtils.utf8StrtoBytes(tb.url, buf);
    			EncodeUtils.utf8StrtoBytes(tb.msg, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_recharge_from_third"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_recharge_success_from_third()
    {
        let tb = {
    	    amount : 0,
    	    is_first_recharge : 0,
    	    reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_recharge_success_from_third"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.amount, buf);
    		    EncodeUtils.int32ToByte(tb.is_first_recharge, buf);
    			EncodeUtils.int64ToByte(tb.reward, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.is_first_recharge = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.reward = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_recharge_success_from_third"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_recharge_from_third_add()
    {
        let tb = {
    	    got_discount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_recharge_from_third_add"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.got_discount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.got_discount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_recharge_from_third_add"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_recharge2()
    {
        let tb = {
    	    money : '',
    	    channel_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_recharge2"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.channel_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
 				startIndex += money_value[1];
        		tb.channel_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_recharge2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_money_update2()
    {
        let tb = {
    	    update_money : 0,
    	    cur_money : 0,
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_money_update2"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.update_money, buf);
    			EncodeUtils.int64ToByte(tb.cur_money, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.update_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.cur_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_money_update2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_roleinfo_msg()
    {
        let tb = {
    	    id : 0,
    	    nickname : '',
    	    head_photo : '',
    	    money : 0,
    	    vip_lv : 0,
    	    sex : 0,
    	    signature : '',
    	    mobile : '',
    	    bank_money : 0,
    	    password_state : 0,
    	    agent_level : 0,
    	    recharge_amount : 0,
    	    reserve0 : 0,
    	    reserve1 : 0,
    	    reserve2 : 0,
    	    reserve3 : 0,
    	    reserve4 : 0,
    	    withdraw_pwd_status : 0,
    	    withdraw_pwd : '',
    	    currencyrate : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_roleinfo_msg"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_roleinfo_msg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_roleinfo_with_id()
    {
        let tb = {
    	    id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_roleinfo_with_id"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_roleinfo_with_id"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_roleinfo_with_id()
    {
        let tb = {
    	    id : 0,
    	    nickname : '',
    	    head_photo : '',
    	    money : 0,
    	    vip_lv : 0,
    	    sex : 0,
    	    signature : '',
    	    bank_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_roleinfo_with_id"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.vip_lv, buf);
    		    EncodeUtils.int32ToByte(tb.sex, buf);
    			EncodeUtils.utf8StrtoBytes(tb.signature, buf);
    			EncodeUtils.int64ToByte(tb.bank_money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_roleinfo_with_id"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_money_update()
    {
        let tb = {
    	    money : 0,
    	    flag : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_money_update"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.flag, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_money_update"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rename()
    {
        let tb = {
    	    new_name : '',
    	    captcha : '',
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rename"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.new_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.captcha, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rename"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rename_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rename_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rename_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_select_head_icon()
    {
        let tb = {
    	    new_head_icon : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_select_head_icon"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.new_head_icon, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let new_head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_head_icon = new_head_icon_value[0];
 				startIndex += new_head_icon_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_select_head_icon"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_select_head_icon_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_select_head_icon_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_select_head_icon_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_update_sex()
    {
        let tb = {
    	    new_sex : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_update_sex"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.new_sex, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.new_sex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_update_sex"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_sex_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_sex_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_sex_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_update_signature()
    {
        let tb = {
    	    new_signature : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_update_signature"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.new_signature, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let new_signature_value = EncodeUtils.byteToString(buf, startIndex);
				tb.new_signature = new_signature_value[0];
 				startIndex += new_signature_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_update_signature"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_signature_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_signature_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_signature_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_update_auto()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_update_auto"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_update_auto"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_auto()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_auto"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_auto"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_mobile_apply()
    {
        let tb = {
    	    mobile : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_mobile_apply"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.mobile, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let mobile_value = EncodeUtils.byteToString(buf, startIndex);
				tb.mobile = mobile_value[0];
 				startIndex += mobile_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_mobile_apply"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_mobile_apply_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_mobile_apply_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_mobile_apply_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_mobile()
    {
        let tb = {
    	    verify_code : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_mobile"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.verify_code, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let verify_code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.verify_code = verify_code_value[0];
 				startIndex += verify_code_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_mobile"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_mobile_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_mobile_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_mobile_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_custom_head_icon_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_custom_head_icon_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_custom_head_icon_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_custom_head_icon_info()
    {
        let tb = {
    	    sta : 0,
    	    head_icon_name : '',
    	    upload_address : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_custom_head_icon_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.sta, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.upload_address, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.sta = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let head_icon_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon_name = head_icon_name_value[0];
 				startIndex += head_icon_name_value[1];
				let upload_address_value = EncodeUtils.byteToString(buf, startIndex);
				tb.upload_address = upload_address_value[0];
 				startIndex += upload_address_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_custom_head_icon_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_auto_trans()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_auto_trans"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_auto_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_auto_trans()
    {
        let tb = {
    	    auto_trans : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_auto_trans"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.auto_trans, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.auto_trans = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_auto_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_inner_trans()
    {
        let tb = {
    	    to_bank : 0,
    	    amount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_inner_trans"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.to_bank, buf);
    			EncodeUtils.int64ToByte(tb.amount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.to_bank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_inner_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_inner_trans()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_inner_trans"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_inner_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_default_bankcard()
    {
        let tb = {
    	    bankcard : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_default_bankcard"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.bankcard, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let bankcard_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bankcard = bankcard_value[0];
 				startIndex += bankcard_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_default_bankcard"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_default_bankcard()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_default_bankcard"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_default_bankcard"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_bank_password()
    {
        let tb = {
    	    password : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_bank_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.password, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
 				startIndex += password_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_bank_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_bank_password_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_bank_password_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_bank_password_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_reset_bank_password()
    {
        let tb = {
    	    old_password : '',
    	    new_password : '',
    	    new_password_confirm : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_reset_bank_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.old_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password, buf);
    			EncodeUtils.utf8StrtoBytes(tb.new_password_confirm, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_reset_bank_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_reset_bank_password_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_reset_bank_password_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_reset_bank_password_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_bank_password()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_bank_password"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_bank_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_bank_password_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_bank_password_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_bank_password_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_auth_bank_password()
    {
        let tb = {
    	    password : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_auth_bank_password"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.password, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let password_value = EncodeUtils.byteToString(buf, startIndex);
				tb.password = password_value[0];
 				startIndex += password_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_auth_bank_password"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_auth_bank_password_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_auth_bank_password_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_auth_bank_password_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_save()
    {
        let tb = {
    	    money : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_save"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
 				startIndex += money_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_save"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_save_result()
    {
        let tb = {
    	    is_success : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_save_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_save_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_take()
    {
        let tb = {
    	    money : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_take"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
 				startIndex += money_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_take"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_take_result()
    {
        let tb = {
    	    is_success : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_take_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_take_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_transfer_apply()
    {
        let tb = {
    	    role_id : '',
    	    money : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_transfer_apply"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
 				startIndex += role_id_value[1];
				let money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.money = money_value[0];
 				startIndex += money_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_transfer_apply"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_transfer_apply_result()
    {
        let tb = {
    	    is_success : 0,
    	    role_id : 0,
    	    nickname : '',
    	    money : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_transfer_apply_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_transfer_apply_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_transfer_confirm()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_transfer_confirm"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_transfer_confirm"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_transfer_confirm_result()
    {
        let tb = {
    	    is_success : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_transfer_confirm_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_success, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_success = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_transfer_confirm_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function transfer_log()
    {
        let tb = {
    	    role_id : 0,
    	    money : 0,
    	    nickname : '',
    	    time : stime(),
    	    status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_transfer_log"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
        		tb.time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_transfer_log"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_transfer_log()
    {
        let tb = {
    	    type : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_transfer_log"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_transfer_log"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_transfer_log()
    {
        let tb = {
    	    type : 0,
    	    page : 0,
    	    log_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_transfer_log"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		EncodeUtils.uInt16ToByte(tb.log_list.length, buf);
        		for (let i = 0; i < tb.log_list.length; ++i)
				{
            		tb.log_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let log_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < log_list_len; ++i)
				{
            		let tmp = transfer_log();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.log_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_transfer_log"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_money_refresh()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_money_refresh"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_money_refresh"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_money_refresh()
    {
        let tb = {
    	    money : 0,
    	    bank_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_money_refresh"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.int64ToByte(tb.bank_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.bank_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_money_refresh"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function bank_card_info()
    {
        let tb = {
    	    bank_id : 0,
    	    bank_name : '',
    	    account_number : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_bank_card_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bank_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bank_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.account_number, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_bank_card_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_card_info_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_card_info_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_card_info_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bank_card_info_list()
    {
        let tb = {
    	    cardholder_name : '',
    	    bank_card_info_list : [],
    	    min_withdraw_money : 0,
    	    max_withdraw_money : 0,
    	    max_withdraw_count : 0,
    	    min_usdt : 0,
    	    max_usdt : 0,
    	    bank_card_maintain_status : 0,
    	    usdt_maintain_status : 0,
    	    bankrule_tip_status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bank_card_info_list"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.cardholder_name, buf);
        		EncodeUtils.uInt16ToByte(tb.bank_card_info_list.length, buf);
        		for (let i = 0; i < tb.bank_card_info_list.length; ++i)
				{
            		tb.bank_card_info_list[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.min_withdraw_money, buf);
    		    EncodeUtils.int32ToByte(tb.max_withdraw_money, buf);
    		    EncodeUtils.int32ToByte(tb.max_withdraw_count, buf);
    		    EncodeUtils.int32ToByte(tb.min_usdt, buf);
    		    EncodeUtils.int32ToByte(tb.max_usdt, buf);
    		    EncodeUtils.int32ToByte(tb.bank_card_maintain_status, buf);
    		    EncodeUtils.int32ToByte(tb.usdt_maintain_status, buf);
    		    EncodeUtils.int32ToByte(tb.bankrule_tip_status, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let cardholder_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.cardholder_name = cardholder_name_value[0];
 				startIndex += cardholder_name_value[1];
        		let bank_card_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bank_card_info_list_len; ++i)
				{
            		let tmp = bank_card_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.bank_card_info_list.push(tmp);
        		}
        		tb.min_withdraw_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_withdraw_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_withdraw_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.min_usdt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_usdt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bank_card_maintain_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.usdt_maintain_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bankrule_tip_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bank_card_info_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_new_bank_card_info()
    {
        let tb = {
    	    bank_id : 0,
    	    cardholder_name : '',
    	    account_number : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_new_bank_card_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bank_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.cardholder_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.account_number, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_new_bank_card_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_req_new_bank_card_info()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_req_new_bank_card_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_req_new_bank_card_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function bank_info()
    {
        let tb = {
    	    bank_id : 0,
    	    bank_name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_bank_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bank_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bank_name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bank_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bank_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_name = bank_name_value[0];
 				startIndex += bank_name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_bank_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bank_name_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bank_name_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bank_name_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_req_bank_name_list()
    {
        let tb = {
    	    bank_name_list : [],
    	    status_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_req_bank_name_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.bank_name_list.length, buf);
        		for (let i = 0; i < tb.bank_name_list.length; ++i)
				{
            		tb.bank_name_list[i].encode(buf);
	     		}
       			EncodeUtils.uInt16ToByte(tb.status_list.length, buf);
       			for (let i = 0; i < tb.status_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.status_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let bank_name_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bank_name_list_len; ++i)
				{
            		let tmp = bank_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.bank_name_list.push(tmp);
        		}
        		let status_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < status_list_len; ++i)
		 		{
             		tb.status_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_req_bank_name_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function recharge_record()
    {
        let tb = {
    	    way_id : 0,
    	    pay_money : 0,
    	    bonus : 0,
    	    order_status : 0,
    	    pay_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_recharge_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.way_id, buf);
    			EncodeUtils.int64ToByte(tb.pay_money, buf);
    			EncodeUtils.int64ToByte(tb.bonus, buf);
    		    EncodeUtils.int32ToByte(tb.order_status, buf);
        		tb.pay_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.way_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.pay_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.bonus = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.order_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.pay_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_recharge_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function withdraw_record()
    {
        let tb = {
    	    id : 0,
    	    type : 0,
    	    trans_id : '',
    	    money : 0,
    	    bank_card_id : '',
    	    createtime : stime(),
    	    status : 0,
    	    remark : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_withdraw_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.trans_id, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bank_card_id, buf);
        		tb.createtime.encode(buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    			EncodeUtils.utf8StrtoBytes(tb.remark, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_withdraw_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_recharge_record_list()
    {
        let tb = {
    	    page : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    status : 0,
    	    currency : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_recharge_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    		    EncodeUtils.int32ToByte(tb.currency, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_recharge_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_recharge_record_list()
    {
        let tb = {
    	    total_page : 0,
    	    recharge_record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_recharge_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.recharge_record_list.length, buf);
        		for (let i = 0; i < tb.recharge_record_list.length; ++i)
				{
            		tb.recharge_record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let recharge_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < recharge_record_list_len; ++i)
				{
            		let tmp = recharge_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.recharge_record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_recharge_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_apply_withdraw()
    {
        let tb = {
    	    money : '',
    	    bank_card_id : '',
    	    bank_id : 0,
    	    way : 0,
    	    passwd : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_apply_withdraw"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bank_card_id, buf);
    		    EncodeUtils.int32ToByte(tb.bank_id, buf);
    		    EncodeUtils.int32ToByte(tb.way, buf);
    			EncodeUtils.utf8StrtoBytes(tb.passwd, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_apply_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_apply_withdraw()
    {
        let tb = {
    	    result : 0,
    	    tip : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_apply_withdraw"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.tip, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tip = tip_value[0];
 				startIndex += tip_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_apply_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_cancel_apply_withdraw()
    {
        let tb = {
    	    id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_cancel_apply_withdraw"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.id = id_value[0];
 				startIndex += id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_cancel_apply_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_cancel_apply_withdraw()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_cancel_apply_withdraw"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_cancel_apply_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_withdraw_record_list()
    {
        let tb = {
    	    page : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    status : 0,
    	    currency : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_withdraw_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    		    EncodeUtils.int32ToByte(tb.currency, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_withdraw_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_withdraw_record_list()
    {
        let tb = {
    	    total_page : 0,
    	    withdraw_record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_withdraw_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.withdraw_record_list.length, buf);
        		for (let i = 0; i < tb.withdraw_record_list.length; ++i)
				{
            		tb.withdraw_record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let withdraw_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < withdraw_record_list_len; ++i)
				{
            		let tmp = recharge_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.withdraw_record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_withdraw_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_accounting_change_record_list()
    {
        let tb = {
    	    page : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_accounting_change_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_accounting_change_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function accounting_change_record()
    {
        let tb = {
    	    type : 0,
    	    b_type : 0,
    	    pay_money : 0,
    	    item : 0,
    	    create_time : stime(),
    	    remark : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_accounting_change_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.b_type, buf);
    			EncodeUtils.int64ToByte(tb.pay_money, buf);
    		    EncodeUtils.int32ToByte(tb.item, buf);
        		tb.create_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.remark, buf);
    	    },
    		decode:function(buf, index)
			{
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
				let remark_value = EncodeUtils.byteToString(buf, startIndex);
				tb.remark = remark_value[0];
 				startIndex += remark_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_accounting_change_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_accounting_change_record_list()
    {
        let tb = {
    	    total_page : 0,
    	    record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_accounting_change_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
        		for (let i = 0; i < tb.record_list.length; ++i)
				{
            		tb.record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_list_len; ++i)
				{
            		let tmp = accounting_change_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_accounting_change_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_can_withdraw()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_can_withdraw"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_can_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_can_withdraw()
    {
        let tb = {
    	    rlt : 0,
    	    can_withdraw : 0,
    	    canot_withdraw : 0,
    	    turnover : 0,
    	    revenueratio_withdraw : '',
    	    exchange_ratio_withdraw : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_can_withdraw"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    			EncodeUtils.int64ToByte(tb.can_withdraw, buf);
    			EncodeUtils.int64ToByte(tb.canot_withdraw, buf);
    			EncodeUtils.int64ToByte(tb.turnover, buf);
    			EncodeUtils.utf8StrtoBytes(tb.revenueratio_withdraw, buf);
    			EncodeUtils.utf8StrtoBytes(tb.exchange_ratio_withdraw, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.can_withdraw = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.canot_withdraw = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.turnover = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let revenueratio_withdraw_value = EncodeUtils.byteToString(buf, startIndex);
				tb.revenueratio_withdraw = revenueratio_withdraw_value[0];
 				startIndex += revenueratio_withdraw_value[1];
				let exchange_ratio_withdraw_value = EncodeUtils.byteToString(buf, startIndex);
				tb.exchange_ratio_withdraw = exchange_ratio_withdraw_value[0];
 				startIndex += exchange_ratio_withdraw_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_can_withdraw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_del_bank_card_info()
    {
        let tb = {
    	    bankcard : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_del_bank_card_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.bankcard, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let bankcard_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bankcard = bankcard_value[0];
 				startIndex += bankcard_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_del_bank_card_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_del_bank_card_info()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_del_bank_card_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_del_bank_card_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function recharge_list()
    {
        let tb = {
    	    paymenttype : 0,
    	    minrecharge : 0,
    	    maxrecharge : 0,
    	    paymethod : '',
    	    payname : '',
    	    status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_recharge_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.paymenttype, buf);
    			EncodeUtils.int64ToByte(tb.minrecharge, buf);
    			EncodeUtils.int64ToByte(tb.maxrecharge, buf);
    			EncodeUtils.utf8StrtoBytes(tb.paymethod, buf);
    			EncodeUtils.utf8StrtoBytes(tb.payname, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_recharge_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function recharge_discount()
    {
        let tb = {
    	    discount_ID : 0,
    	    limit : 0,
    	    ratio : 0,
    	    require : 0,
    	    restrict : '',
    	    name : '',
    	    threshold : 0,
    	    save_trigger : 0,
    	    save_ratio : 0,
    	    save_require : 0,
    	    up_limit : 0,
    	    bind_card : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_recharge_discount"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.discount_ID, buf);
    		    EncodeUtils.int32ToByte(tb.limit, buf);
    		    EncodeUtils.int32ToByte(tb.ratio, buf);
    		    EncodeUtils.int32ToByte(tb.require, buf);
    			EncodeUtils.utf8StrtoBytes(tb.restrict, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.int64ToByte(tb.threshold, buf);
    			EncodeUtils.int64ToByte(tb.save_trigger, buf);
    		    EncodeUtils.int32ToByte(tb.save_ratio, buf);
    		    EncodeUtils.int32ToByte(tb.save_require, buf);
    			EncodeUtils.int64ToByte(tb.up_limit, buf);
    		    EncodeUtils.int32ToByte(tb.bind_card, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		tb.threshold = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.save_trigger = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.save_ratio = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.save_require = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.up_limit = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.bind_card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_recharge_discount"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function pay_info()
    {
        let tb = {
    	    pay_id : 0,
    	    pay_name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_pay_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.pay_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.pay_name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.pay_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let pay_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.pay_name = pay_name_value[0];
 				startIndex += pay_name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_pay_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_shop_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_shop_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_shop_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_req_get_shop_info()
    {
        let tb = {
    	    rechargelist_by_paymenttype : [],
    	    discount_list : [],
    	    bank_list : [],
    	    usdt_viet_rate : 0,
    	    is_speical_player : 0,
    	    last_bank : 0,
    	    bank_name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_req_get_shop_info"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rechargelist_by_paymenttype.length, buf);
        		for (let i = 0; i < tb.rechargelist_by_paymenttype.length; ++i)
				{
            		tb.rechargelist_by_paymenttype[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.discount_list.length, buf);
        		for (let i = 0; i < tb.discount_list.length; ++i)
				{
            		tb.discount_list[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.bank_list.length, buf);
        		for (let i = 0; i < tb.bank_list.length; ++i)
				{
            		tb.bank_list[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.usdt_viet_rate, buf);
    		    EncodeUtils.int32ToByte(tb.is_speical_player, buf);
    		    EncodeUtils.int32ToByte(tb.last_bank, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bank_name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rechargelist_by_paymenttype_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rechargelist_by_paymenttype_len; ++i)
				{
            		let tmp = recharge_list();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rechargelist_by_paymenttype.push(tmp);
        		}
        		let discount_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < discount_list_len; ++i)
				{
            		let tmp = recharge_discount();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.discount_list.push(tmp);
        		}
        		let bank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bank_list_len; ++i)
				{
            		let tmp = pay_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.bank_list.push(tmp);
        		}
        		tb.usdt_viet_rate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_speical_player = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.last_bank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bank_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bank_name = bank_name_value[0];
 				startIndex += bank_name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_req_get_shop_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pay_name_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pay_name_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pay_name_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_req_pay_name_list()
    {
        let tb = {
    	    pay_name_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_req_pay_name_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.pay_name_list.length, buf);
        		for (let i = 0; i < tb.pay_name_list.length; ++i)
				{
            		tb.pay_name_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let pay_name_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < pay_name_list_len; ++i)
				{
            		let tmp = pay_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.pay_name_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_req_pay_name_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_add_usdt_info()
    {
        let tb = {
    	    usdt_type : 0,
    	    usdt_addr : '',
    	    desc : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_add_usdt_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.usdt_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.usdt_addr, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desc, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.usdt_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let usdt_addr_value = EncodeUtils.byteToString(buf, startIndex);
				tb.usdt_addr = usdt_addr_value[0];
 				startIndex += usdt_addr_value[1];
				let desc_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desc = desc_value[0];
 				startIndex += desc_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_add_usdt_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_add_usdt_info()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_add_usdt_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_add_usdt_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function usdt_info()
    {
        let tb = {
    	    usdt_type : 0,
    	    usdt_addr : '',
    	    desc : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_usdt_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.usdt_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.usdt_addr, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desc, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.usdt_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let usdt_addr_value = EncodeUtils.byteToString(buf, startIndex);
				tb.usdt_addr = usdt_addr_value[0];
 				startIndex += usdt_addr_value[1];
				let desc_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desc = desc_value[0];
 				startIndex += desc_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_usdt_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_usdt_info_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_usdt_info_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_usdt_info_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_usdt_info_list()
    {
        let tb = {
    	    usdt_info_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_usdt_info_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.usdt_info_list.length, buf);
        		for (let i = 0; i < tb.usdt_info_list.length; ++i)
				{
            		tb.usdt_info_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let usdt_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < usdt_info_list_len; ++i)
				{
            		let tmp = usdt_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.usdt_info_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_usdt_info_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function revenue_ratio()
    {
        let tb = {
    	    type : 0,
    	    ratio : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_revenue_ratio"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.ratio, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let ratio_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ratio = ratio_value[0];
 				startIndex += ratio_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_revenue_ratio"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_usdt_and_revenue_ratio()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_usdt_and_revenue_ratio"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_usdt_and_revenue_ratio"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_usdt_and_revenue_ratio()
    {
        let tb = {
    	    u_ratio : 0,
    	    rev_ratio_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_usdt_and_revenue_ratio"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.u_ratio, buf);
        		EncodeUtils.uInt16ToByte(tb.rev_ratio_list.length, buf);
        		for (let i = 0; i < tb.rev_ratio_list.length; ++i)
				{
            		tb.rev_ratio_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.u_ratio = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let rev_ratio_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rev_ratio_list_len; ++i)
				{
            		let tmp = revenue_ratio();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rev_ratio_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_usdt_and_revenue_ratio"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_withdraw_count()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_withdraw_count"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_withdraw_count"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function nodify_withdraw_count()
    {
        let tb = {
    	    waitstart : 0,
    	    waitend : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_nodify_withdraw_count"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.waitstart, buf);
    		    EncodeUtils.int32ToByte(tb.waitend, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.waitstart = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.waitend = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_nodify_withdraw_count"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_del_usdt_info()
    {
        let tb = {
    	    usdtaddr : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_del_usdt_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.usdtaddr, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let usdtaddr_value = EncodeUtils.byteToString(buf, startIndex);
				tb.usdtaddr = usdtaddr_value[0];
 				startIndex += usdtaddr_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_del_usdt_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_del_usdt_info()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_del_usdt_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_del_usdt_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_default_usdt()
    {
        let tb = {
    	    usdtaddr : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_default_usdt"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.usdtaddr, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let usdtaddr_value = EncodeUtils.byteToString(buf, startIndex);
				tb.usdtaddr = usdtaddr_value[0];
 				startIndex += usdtaddr_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_default_usdt"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_default_usdt()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_default_usdt"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_default_usdt"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function agent_item()
    {
        let tb = {
    	    name : '',
    	    weixin_id : '',
    	    role_id : 0,
    	    qq : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_agent_item"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.qq, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_agent_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_agent_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_agent_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_agent_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_agent_list()
    {
        let tb = {
    	    agent_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_agent_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.agent_list.length, buf);
        		for (let i = 0; i < tb.agent_list.length; ++i)
				{
            		tb.agent_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let agent_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < agent_list_len; ++i)
				{
            		let tmp = agent_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.agent_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_agent_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rank_item()
    {
        let tb = {
    	    rank : 0,
    	    role_id : 0,
    	    head_icon : '',
    	    nickname : '',
    	    money : 0,
    	    signature : '',
    	    weixin_id : '',
    	    sex : 0,
    	    qq : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rank_item"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rank_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rank_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rank_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rank_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rank_list()
    {
        let tb = {
    	    rich_list : [],
    	    win_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rank_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rich_list.length, buf);
        		for (let i = 0; i < tb.rich_list.length; ++i)
				{
            		tb.rich_list[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.win_list.length, buf);
        		for (let i = 0; i < tb.win_list.length; ++i)
				{
            		tb.win_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rich_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rich_list_len; ++i)
				{
            		let tmp = rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rich_list.push(tmp);
        		}
        		let win_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < win_list_len; ++i)
				{
            		let tmp = rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.win_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rank_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rank_item_bet()
    {
        let tb = {
    	    rank : 0,
    	    role_id : 0,
    	    head_icon : '',
    	    nickname : '',
    	    sex : 0,
    	    score : 0,
    	    money : 0,
    	    has_reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rank_item_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.sex, buf);
    			EncodeUtils.int64ToByte(tb.score, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.has_reward, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rank_item_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rank_bet()
    {
        let tb = {
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rank_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rank_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rank_bet()
    {
        let tb = {
    	    type : 0,
    	    rank_item : [],
    	    self_rank_item : rank_item_bet(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rank_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
        		EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
        		for (let i = 0; i < tb.rank_item.length; ++i)
				{
            		tb.rank_item[i].encode(buf);
	     		}
        		tb.self_rank_item.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_item_len; ++i)
				{
            		let tmp = rank_item_bet();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_item.push(tmp);
        		}
        		startIndex += tb.self_rank_item.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rank_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rank_getreward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rank_getreward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rank_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rank_getreward()
    {
        let tb = {
    	    result : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rank_getreward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rank_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function new_rank_item()
    {
        let tb = {
    	    rank : 0,
    	    role_id : 0,
    	    head_icon : '',
    	    nickname : '',
    	    vip_level : 0,
    	    game_type : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_new_rank_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    		    EncodeUtils.int32ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.vip_level, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_new_rank_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_new_rank_list()
    {
        let tb = {
    	    room_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_new_rank_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_new_rank_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_new_rank_list()
    {
        let tb = {
    	    room_type : 0,
    	    room_rank_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_new_rank_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_type, buf);
        		EncodeUtils.uInt16ToByte(tb.room_rank_list.length, buf);
        		for (let i = 0; i < tb.room_rank_list.length; ++i)
				{
            		tb.room_rank_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let room_rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < room_rank_list_len; ++i)
				{
            		let tmp = new_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.room_rank_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_new_rank_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rank_with_robot_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rank_with_robot_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rank_with_robot_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rank_with_robot_list()
    {
        let tb = {
    	    room_rank_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rank_with_robot_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.room_rank_list.length, buf);
        		for (let i = 0; i < tb.room_rank_list.length; ++i)
				{
            		tb.room_rank_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let room_rank_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < room_rank_list_len; ++i)
				{
            		let tmp = new_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.room_rank_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rank_with_robot_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function award_info()
    {
        let tb = {
    	    award_id : 0,
    	    award_value : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_award_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.award_id, buf);
    			EncodeUtils.int64ToByte(tb.award_value, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.award_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.award_value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_award_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function email()
    {
        let tb = {
    	    email_id : '',
    	    type : 0,
    	    email_type : 0,
    	    addressor : '',
    	    title : '',
    	    content : '',
    	    attachments : [],
    	    recv_time : stime(),
    	    end_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_email"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
    			EncodeUtils.uInt8ToByte(tb.type, buf);
    			EncodeUtils.uInt8ToByte(tb.email_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.addressor, buf);
    			EncodeUtils.utf8StrtoBytes(tb.title, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
        		EncodeUtils.uInt16ToByte(tb.attachments.length, buf);
        		for (let i = 0; i < tb.attachments.length; ++i)
				{
            		tb.attachments[i].encode(buf);
	     		}
        		tb.recv_time.encode(buf);
        		tb.end_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
        		for(let i = 0; i < attachments_len; ++i)
				{
            		let tmp = award_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.attachments.push(tmp);
        		}
        		startIndex += tb.recv_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_email_list()
    {
        let tb = {
    	    emails : [],
    	    email_readed : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_email_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.emails.length, buf);
        		for (let i = 0; i < tb.emails.length; ++i)
				{
            		tb.emails[i].encode(buf);
	     		}
       			EncodeUtils.uInt16ToByte(tb.email_readed.length, buf);
       			for (let i = 0; i < tb.email_readed.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.email_readed[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let emails_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < emails_len; ++i)
				{
            		let tmp = email();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.emails.push(tmp);
        		}
        		let email_readed_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < email_readed_len; ++i)
		 		{
					let email_readed_value = EncodeUtils.byteToString(buf, startIndex);
					tb.email_readed.push(email_readed_value[0]);
					startIndex += email_readed_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_email_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_email_attachments()
    {
        let tb = {
    	    email_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_email_attachments"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
 				startIndex += email_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_email_attachments"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_email_attachments()
    {
        let tb = {
    	    email_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_email_attachments"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
 				startIndex += email_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_email_attachments"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_new_email()
    {
        let tb = {
    	    new_email : email(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_new_email"];
    		},
		    encode:function(buf)
		    {
        		tb.new_email.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.new_email.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_new_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_read_email()
    {
        let tb = {
    	    email_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_read_email"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
 				startIndex += email_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_read_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_read_email()
    {
        let tb = {
    	    email_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_read_email"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.email_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let email_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.email_id = email_id_value[0];
 				startIndex += email_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_read_email"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function award_state()
    {
        let tb = {
    	    type : 0,
    	    state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_award_state"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_award_state"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_day_task()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_day_task"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_day_task"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function task_msg()
    {
        let tb = {
    	    task_id : 0,
    	    cur_times : 0,
    	    state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_task_msg"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.task_id, buf);
    		    EncodeUtils.int32ToByte(tb.cur_times, buf);
    		    EncodeUtils.int32ToByte(tb.state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.cur_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_task_msg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_day_task()
    {
        let tb = {
    	    task : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_day_task"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.task.length, buf);
        		for (let i = 0; i < tb.task.length; ++i)
				{
            		tb.task[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let task_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < task_len; ++i)
				{
            		let tmp = task_msg();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.task.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_day_task"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_day_task_state()
    {
        let tb = {
    	    award_states : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_day_task_state"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.award_states.length, buf);
        		for (let i = 0; i < tb.award_states.length; ++i)
				{
            		tb.award_states[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let award_states_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < award_states_len; ++i)
				{
            		let tmp = award_state();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.award_states.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_day_task_state"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_reward()
    {
        let tb = {
    	    id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_reward()
    {
        let tb = {
    	    id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_login_award()
    {
        let tb = {
    	    days : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_login_award"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.days, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_login_award"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_login_award()
    {
        let tb = {
    	    days : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_login_award"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.days, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_login_award"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_sign_award()
    {
        let tb = {
    	    days : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_sign_award"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.days, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_sign_award"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_sign_award()
    {
        let tb = {
    	    days : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_sign_award"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.days, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.days = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_sign_award"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function desk()
    {
        let tb = {
    	    id : '',
    	    name : '',
    	    cur_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_desk"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    		    EncodeUtils.int32ToByte(tb.cur_count, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_desk_list()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_desk_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_desk_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_desk_list()
    {
        let tb = {
    	    desk_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_desk_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.desk_list.length, buf);
        		for (let i = 0; i < tb.desk_list.length; ++i)
				{
            		tb.desk_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let desk_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < desk_list_len; ++i)
				{
            		let tmp = desk();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.desk_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_desk_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_msg_kv()
    {
        let tb = {
    	    key : '',
    	    val : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_msg_kv"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.key, buf);
    			EncodeUtils.utf8StrtoBytes(tb.val, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.key = key_value[0];
 				startIndex += key_value[1];
				let val_value = EncodeUtils.byteToString(buf, startIndex);
				tb.val = val_value[0];
 				startIndex += val_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_msg_kv"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_role_base()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    money : 0,
    	    head_photo : '',
    	    gender : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_role_base"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.gender, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_role_base"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_leave_room()
    {
        let tb = {
    	    param1 : '',
    	    param2 : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_leave_room"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.param1, buf);
    			EncodeUtils.utf8StrtoBytes(tb.param2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let param1_value = EncodeUtils.byteToString(buf, startIndex);
				tb.param1 = param1_value[0];
 				startIndex += param1_value[1];
				let param2_value = EncodeUtils.byteToString(buf, startIndex);
				tb.param2 = param2_value[0];
 				startIndex += param2_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_leave_room"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_leave_room_result()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_leave_room_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_leave_room_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_leave_room()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_leave_room"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_leave_room"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_leave_minigame_room()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_leave_minigame_room"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_leave_minigame_room"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_leave_minigame_room_result()
    {
        let tb = {
    	    room_id : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_leave_minigame_room_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_leave_minigame_room_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_msg()
    {
        let tb = {
    	    msg_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_msg"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.msg_list.length, buf);
        		for (let i = 0; i < tb.msg_list.length; ++i)
				{
            		tb.msg_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let msg_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < msg_list_len; ++i)
				{
            		let tmp = room_msg_kv();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.msg_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_msg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_enter_room()
    {
        let tb = {
    	    room_id : 0,
    	    take_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_enter_room"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.take_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.take_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_enter_room"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_enter_room_result()
    {
        let tb = {
    	    result : 0,
    	    desk_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_enter_room_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desk_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_id = desk_id_value[0];
 				startIndex += desk_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_enter_room_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_enter_desk()
    {
        let tb = {
    	    desk_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_enter_desk"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let desk_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_id = desk_id_value[0];
 				startIndex += desk_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_enter_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_enter_desk_result()
    {
        let tb = {
    	    result : 0,
    	    desk_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_enter_desk_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desk_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_id = desk_id_value[0];
 				startIndex += desk_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_enter_desk_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_change_desk()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_change_desk"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_change_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_change_desk_result()
    {
        let tb = {
    	    result : 0,
    	    desk_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_change_desk_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desk_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_id = desk_id_value[0];
 				startIndex += desk_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_change_desk_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_role_enter()
    {
        let tb = {
    	    role : room_role_base(),
    	    pos : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_role_enter"];
    		},
		    encode:function(buf)
		    {
        		tb.role.encode(buf);
    		    EncodeUtils.int32ToByte(tb.pos, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.role.decode(buf, startIndex);
        		tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_role_enter"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_role_prepare()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_role_prepare"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_role_prepare"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_role_money()
    {
        let tb = {
    	    role_id : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_role_money"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_role_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_roles_money()
    {
        let tb = {
    	    roles_money_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_roles_money"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.roles_money_list.length, buf);
        		for (let i = 0; i < tb.roles_money_list.length; ++i)
				{
            		tb.roles_money_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let roles_money_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < roles_money_list_len; ++i)
				{
            		let tmp = room_role_money();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.roles_money_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_roles_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function role_get_money_item()
    {
        let tb = {
    	    role_id : 0,
    	    get_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_role_get_money_item"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.get_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_role_get_money_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_game_info()
    {
        let tb = {
    	    game_type : 0,
    	    role_count : 0,
    	    status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_game_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.role_count, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_config()
    {
        let tb = {
    	    room_id : 0,
    	    level : 0,
    	    type : 0,
    	    play_type : 0,
    	    club_id : 0,
    	    game_type : 0,
    	    name : '',
    	    icon : '',
    	    min_bet : 0,
    	    need_chip : 0,
    	    max_chip : 0,
    	    max_player : 0,
    	    desk_count : 0,
    	    role_count : 0,
    	    is_open : 0,
    	    ip_limit : 0,
    	    extra1 : [],
    	    extra2 : [],
    	    extra3 : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_config"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.play_type, buf);
    			EncodeUtils.int64ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.icon, buf);
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    		    EncodeUtils.int32ToByte(tb.need_chip, buf);
    		    EncodeUtils.int32ToByte(tb.max_chip, buf);
    		    EncodeUtils.int32ToByte(tb.max_player, buf);
    		    EncodeUtils.int32ToByte(tb.desk_count, buf);
    		    EncodeUtils.int32ToByte(tb.role_count, buf);
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
    		    EncodeUtils.int32ToByte(tb.ip_limit, buf);
       			EncodeUtils.uInt16ToByte(tb.extra1.length, buf);
       			for (let i = 0; i < tb.extra1.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra1[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra2.length, buf);
       			for (let i = 0; i < tb.extra2.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra2[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra3.length, buf);
       			for (let i = 0; i < tb.extra3.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra3[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.play_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.icon = icon_value[0];
 				startIndex += icon_value[1];
        		tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.need_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_player = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.desk_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ip_limit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let extra1_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra1_len; ++i)
		 		{
             		tb.extra1.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra2_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra2_len; ++i)
		 		{
             		tb.extra2.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra3_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra3_len; ++i)
		 		{
             		tb.extra3.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_game_info()
    {
        let tb = {
    	    game_type_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_game_info"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.game_type_list.length, buf);
       			for (let i = 0; i < tb.game_type_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.game_type_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let game_type_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < game_type_list_len; ++i)
		 		{
             		tb.game_type_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_game_info()
    {
        let tb = {
    	    game_info_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_game_info"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.game_info_list.length, buf);
        		for (let i = 0; i < tb.game_info_list.length; ++i)
				{
            		tb.game_info_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let game_info_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < game_info_list_len; ++i)
				{
            		let tmp = room_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.game_info_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_list()
    {
        let tb = {
    	    game_type : 0,
    	    club_id : 0,
    	    page_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.page_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_list()
    {
        let tb = {
    	    room_list : [],
    	    total_page : 0,
    	    page_index : 0,
    	    play_type : [],
    	    is_tournament : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.room_list.length, buf);
        		for (let i = 0; i < tb.room_list.length; ++i)
				{
            		tb.room_list[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
    		    EncodeUtils.int32ToByte(tb.page_index, buf);
       			EncodeUtils.uInt16ToByte(tb.play_type.length, buf);
       			for (let i = 0; i < tb.play_type.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.play_type[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.is_tournament, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let room_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < room_list_len; ++i)
				{
            		let tmp = room_config();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.room_list.push(tmp);
        		}
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let play_type_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < play_type_len; ++i)
		 		{
             		tb.play_type.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.is_tournament = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_info()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_info()
    {
        let tb = {
    	    room_config : room_config(),
    	    can_update : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_info"];
    		},
		    encode:function(buf)
		    {
        		tb.room_config.encode(buf);
    		    EncodeUtils.int32ToByte(tb.can_update, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.room_config.decode(buf, startIndex);
        		tb.can_update = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_create()
    {
        let tb = {
    	    type : 0,
    	    play_type : 0,
    	    club_id : 0,
    	    game_type : 0,
    	    name : '',
    	    icon : '',
    	    min_bet : 0,
    	    need_chip : 0,
    	    max_chip : 0,
    	    max_player : 0,
    	    desk_count : 0,
    	    ip_limit : 0,
    	    extra1 : [],
    	    extra2 : [],
    	    extra3 : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_create"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.play_type, buf);
    			EncodeUtils.int64ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.icon, buf);
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    		    EncodeUtils.int32ToByte(tb.need_chip, buf);
    		    EncodeUtils.int32ToByte(tb.max_chip, buf);
    		    EncodeUtils.int32ToByte(tb.max_player, buf);
    		    EncodeUtils.int32ToByte(tb.desk_count, buf);
    		    EncodeUtils.int32ToByte(tb.ip_limit, buf);
       			EncodeUtils.uInt16ToByte(tb.extra1.length, buf);
       			for (let i = 0; i < tb.extra1.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra1[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra2.length, buf);
       			for (let i = 0; i < tb.extra2.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra2[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra3.length, buf);
       			for (let i = 0; i < tb.extra3.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra3[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.play_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.icon = icon_value[0];
 				startIndex += icon_value[1];
        		tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.need_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_player = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.desk_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ip_limit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let extra1_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra1_len; ++i)
		 		{
             		tb.extra1.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra2_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra2_len; ++i)
		 		{
             		tb.extra2.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra3_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra3_len; ++i)
		 		{
             		tb.extra3.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_create"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_create()
    {
        let tb = {
    	    room : room_config(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_create"];
    		},
		    encode:function(buf)
		    {
        		tb.room.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.room.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_create"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_delete()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_delete"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_delete"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_update()
    {
        let tb = {
    	    room_id : 0,
    	    name : '',
    	    icon : '',
    	    min_bet : 0,
    	    need_chip : 0,
    	    max_chip : 0,
    	    ip_limit : 0,
    	    extra1 : [],
    	    extra2 : [],
    	    extra3 : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_update"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.icon, buf);
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    		    EncodeUtils.int32ToByte(tb.need_chip, buf);
    		    EncodeUtils.int32ToByte(tb.max_chip, buf);
    		    EncodeUtils.int32ToByte(tb.ip_limit, buf);
       			EncodeUtils.uInt16ToByte(tb.extra1.length, buf);
       			for (let i = 0; i < tb.extra1.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra1[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra2.length, buf);
       			for (let i = 0; i < tb.extra2.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra2[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.extra3.length, buf);
       			for (let i = 0; i < tb.extra3.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra3[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.icon = icon_value[0];
 				startIndex += icon_value[1];
        		tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.need_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_chip = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ip_limit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let extra1_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra1_len; ++i)
		 		{
             		tb.extra1.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra2_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra2_len; ++i)
		 		{
             		tb.extra2.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let extra3_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra3_len; ++i)
		 		{
             		tb.extra3.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_update"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_update()
    {
        let tb = {
    	    config : room_update(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_update"];
    		},
		    encode:function(buf)
		    {
        		tb.config.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.config.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_update"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_update()
    {
        let tb = {
    	    room : room_config(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_update"];
    		},
		    encode:function(buf)
		    {
        		tb.room.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.room.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_update"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_close()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_close"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_close"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_open()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_open"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_open"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_room_current_desk()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_room_current_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_room_current_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_room_current_desk()
    {
        let tb = {
    	    room_id : 0,
    	    desk_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_room_current_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desk_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_id = desk_id_value[0];
 				startIndex += desk_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_room_current_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function scratch_item()
    {
        let tb = {
    	    icon : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_scratch_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.icon, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.icon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_scratch_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_scratch_ticket()
    {
        let tb = {
    	    room_id : 0,
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_scratch_ticket"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    			EncodeUtils.int64ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.count = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_scratch_ticket"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_scratch_ticket()
    {
        let tb = {
    	    times_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_scratch_ticket"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.times_list.length, buf);
       			for (let i = 0; i < tb.times_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.times_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let times_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < times_list_len; ++i)
		 		{
             		tb.times_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_scratch_ticket"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_suggest()
    {
        let tb = {
    	    suggest : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_suggest"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.suggest, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let suggest_value = EncodeUtils.byteToString(buf, startIndex);
				tb.suggest = suggest_value[0];
 				startIndex += suggest_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_suggest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_suggest()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_suggest"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_suggest"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_help_money_info()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_help_money_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_help_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_help_money_info()
    {
        let tb = {
    	    left_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_help_money_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.left_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.left_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_help_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_help_money_draw()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_help_money_draw"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_help_money_draw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_help_money_draw()
    {
        let tb = {
    	    status : 0,
    	    score : 0,
    	    left_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_help_money_draw"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.status, buf);
    			EncodeUtils.int64ToByte(tb.score, buf);
    		    EncodeUtils.int32ToByte(tb.left_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.left_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_help_money_draw"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_role_return_money_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_role_return_money_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_role_return_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_role_return_money_info()
    {
        let tb = {
    	    self_money : 0,
    	    spread_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_role_return_money_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.self_money, buf);
    			EncodeUtils.int64ToByte(tb.spread_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.self_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.spread_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_role_return_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_role_return_money()
    {
        let tb = {
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_role_return_money"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_role_return_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_role_return_money()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_role_return_money"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_role_return_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_return_money_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_return_money_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_return_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_return_money_info()
    {
        let tb = {
    	    return_money : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_return_money_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.return_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let return_money_value = EncodeUtils.byteToString(buf, startIndex);
				tb.return_money = return_money_value[0];
 				startIndex += return_money_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_return_money_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_return_money()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_return_money"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_return_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_return_money()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_return_money"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_return_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_invite_time_out()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_invite_time_out"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_invite_time_out"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_invite_time_out()
    {
        let tb = {
    	    time_out : stime(),
    	    is_time_out : 0,
    	    invite_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_invite_time_out"];
    		},
		    encode:function(buf)
		    {
        		tb.time_out.encode(buf);
    		    EncodeUtils.int32ToByte(tb.is_time_out, buf);
    		    EncodeUtils.int32ToByte(tb.invite_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.time_out.decode(buf, startIndex);
        		tb.is_time_out = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.invite_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_invite_time_out"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function sign_in_cfg()
    {
        let tb = {
    	    bet : 0,
    	    day : 0,
    	    week : 0,
    	    month : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_sign_in_cfg"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bet, buf);
    		    EncodeUtils.int32ToByte(tb.day, buf);
    		    EncodeUtils.int32ToByte(tb.week, buf);
    		    EncodeUtils.int32ToByte(tb.month, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.day = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.week = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.month = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_sign_in_cfg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_sign_in_config()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_sign_in_config"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_sign_in_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_sign_in_list()
    {
        let tb = {
    	    is_open : 0,
    	    sign_in_cfgs_0 : [],
    	    sign_status : [],
    	    add_sign_in : 0,
    	    day_status : 0,
    	    day_money : 0,
    	    week_money : 0,
    	    month_money : 0,
    	    cur_bet : 0,
    	    used_bet : 0,
    	    cur_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_sign_in_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
        		EncodeUtils.uInt16ToByte(tb.sign_in_cfgs_0.length, buf);
        		for (let i = 0; i < tb.sign_in_cfgs_0.length; ++i)
				{
            		tb.sign_in_cfgs_0[i].encode(buf);
	     		}
       			EncodeUtils.uInt16ToByte(tb.sign_status.length, buf);
       			for (let i = 0; i < tb.sign_status.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.sign_status[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.add_sign_in, buf);
    		    EncodeUtils.int32ToByte(tb.day_status, buf);
    		    EncodeUtils.int32ToByte(tb.day_money, buf);
    		    EncodeUtils.int32ToByte(tb.week_money, buf);
    		    EncodeUtils.int32ToByte(tb.month_money, buf);
    			EncodeUtils.int64ToByte(tb.cur_bet, buf);
    		    EncodeUtils.int32ToByte(tb.used_bet, buf);
        		tb.cur_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let sign_in_cfgs_0_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < sign_in_cfgs_0_len; ++i)
				{
            		let tmp = sign_in_cfg();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.sign_in_cfgs_0.push(tmp);
        		}
        		let sign_status_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < sign_status_len; ++i)
		 		{
             		tb.sign_status.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.add_sign_in = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.day_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.day_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.week_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.month_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.cur_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.used_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.cur_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_sign_in_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_sign_in()
    {
        let tb = {
    	    sign_date : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_sign_in"];
    		},
		    encode:function(buf)
		    {
        		tb.sign_date.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.sign_date.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_sign_in"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_sign_in()
    {
        let tb = {
    	    result : 0,
    	    bonus : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_sign_in"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
       			EncodeUtils.uInt16ToByte(tb.bonus.length, buf);
       			for (let i = 0; i < tb.bonus.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bonus[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let bonus_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bonus_len; ++i)
		 		{
             		tb.bonus.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_sign_in"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_whether_can_open_red_packet()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_whether_can_open_red_packet"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_whether_can_open_red_packet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_whether_can_open_red_packet()
    {
        let tb = {
    	    is_can_open : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_whether_can_open_red_packet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_can_open, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_can_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_whether_can_open_red_packet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_open_red_packet()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_open_red_packet"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_open_red_packet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_open_red_packet()
    {
        let tb = {
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_open_red_packet"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_open_red_packet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rebate_item_bet()
    {
        let tb = {
    	    gameType : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rebate_item_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.gameType, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.gameType = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rebate_item_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bet_rebate()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bet_rebate"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bet_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bet_rebate()
    {
        let tb = {
    	    today_rebate_item : [],
    	    yesterday_rebate_item : [],
    	    has_reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bet_rebate"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.today_rebate_item.length, buf);
        		for (let i = 0; i < tb.today_rebate_item.length; ++i)
				{
            		tb.today_rebate_item[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.yesterday_rebate_item.length, buf);
        		for (let i = 0; i < tb.yesterday_rebate_item.length; ++i)
				{
            		tb.yesterday_rebate_item[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.has_reward, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let today_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < today_rebate_item_len; ++i)
				{
            		let tmp = rebate_item_bet();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.today_rebate_item.push(tmp);
        		}
        		let yesterday_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < yesterday_rebate_item_len; ++i)
				{
            		let tmp = rebate_item_bet();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.yesterday_rebate_item.push(tmp);
        		}
        		tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bet_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rebate_getreward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rebate_getreward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rebate_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rebate_getreward()
    {
        let tb = {
    	    result : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rebate_getreward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rebate_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rebate_all_item_bet()
    {
        let tb = {
    	    gameType : '',
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rebate_all_item_bet"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.gameType, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let gameType_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameType = gameType_value[0];
 				startIndex += gameType_value[1];
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rebate_all_item_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rebate_to_date()
    {
        let tb = {
    	    rebate_date : 0,
    	    rebate_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rebate_to_date"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rebate_date, buf);
    			EncodeUtils.int64ToByte(tb.rebate_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rebate_date = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rebate_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rebate_to_date"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rebate_benefit_status()
    {
        let tb = {
    	    rebate_money : 0,
    	    has_reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rebate_benefit_status"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.rebate_money, buf);
    		    EncodeUtils.int32ToByte(tb.has_reward, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rebate_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.has_reward = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rebate_benefit_status"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bet_rebate_all_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bet_rebate_all_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bet_rebate_all_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bet_rebate_all_info()
    {
        let tb = {
    	    first_rebate_benefit : rebate_to_date(),
    	    second_rebate_benefit : rebate_to_date(),
    	    third_rebate_benefit : rebate_to_date(),
    	    total_rebate : 0,
    	    has_reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bet_rebate_all_info"];
    		},
		    encode:function(buf)
		    {
        		tb.first_rebate_benefit.encode(buf);
        		tb.second_rebate_benefit.encode(buf);
        		tb.third_rebate_benefit.encode(buf);
    			EncodeUtils.int64ToByte(tb.total_rebate, buf);
    		    EncodeUtils.int32ToByte(tb.has_reward, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bet_rebate_all_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bet_rebate_all_details()
    {
        let tb = {
    	    rebate_date : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bet_rebate_all_details"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rebate_date, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rebate_date = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bet_rebate_all_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bet_rebate_all_details()
    {
        let tb = {
    	    today_rebate_item : [],
    	    total_rebate : 0,
    	    first_rebate_benefit : rebate_benefit_status(),
    	    second_rebate_benefit : rebate_benefit_status(),
    	    third_rebate_benefit : rebate_benefit_status(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bet_rebate_all_details"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.today_rebate_item.length, buf);
        		for (let i = 0; i < tb.today_rebate_item.length; ++i)
				{
            		tb.today_rebate_item[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.total_rebate, buf);
        		tb.first_rebate_benefit.encode(buf);
        		tb.second_rebate_benefit.encode(buf);
        		tb.third_rebate_benefit.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let today_rebate_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < today_rebate_item_len; ++i)
				{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bet_rebate_all_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_rebate_all_getreward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_rebate_all_getreward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_rebate_all_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_rebate_all_getreward()
    {
        let tb = {
    	    result : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_rebate_all_getreward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_rebate_all_getreward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function vip_reward_status()
    {
        let tb = {
    	    status : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_vip_reward_status"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.status, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_vip_reward_status"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function vip_level_config()
    {
        let tb = {
    	    level : 0,
    	    target_bet_money : 0,
    	    promotional_reward_status : vip_reward_status(),
    	    gift_money_amount : 0,
    	    ratio : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_vip_level_config"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.level, buf);
    			EncodeUtils.int64ToByte(tb.target_bet_money, buf);
        		tb.promotional_reward_status.encode(buf);
    			EncodeUtils.int64ToByte(tb.gift_money_amount, buf);
    			EncodeUtils.utf8StrtoBytes(tb.ratio, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_vip_level_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_vip_info()
    {
        let tb = {
    	    total_bet_money : 0,
    	    current_vip_level : 0,
    	    last_month_vip_level : 0,
    	    gift_money_status : vip_reward_status(),
    	    holiday_reward_status : vip_reward_status(),
    	    mysterious_reward_status : 0,
    	    vip_level_reward_config : [],
    	    daily_rebate : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_vip_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.total_bet_money, buf);
    		    EncodeUtils.int32ToByte(tb.current_vip_level, buf);
    		    EncodeUtils.int32ToByte(tb.last_month_vip_level, buf);
        		tb.gift_money_status.encode(buf);
        		tb.holiday_reward_status.encode(buf);
    		    EncodeUtils.int32ToByte(tb.mysterious_reward_status, buf);
        		EncodeUtils.uInt16ToByte(tb.vip_level_reward_config.length, buf);
        		for (let i = 0; i < tb.vip_level_reward_config.length; ++i)
				{
            		tb.vip_level_reward_config[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.daily_rebate, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		for(let i = 0; i < vip_level_reward_config_len; ++i)
				{
            		let tmp = vip_level_config();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.vip_level_reward_config.push(tmp);
        		}
        		tb.daily_rebate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_vip_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_claim_promotional_reward()
    {
        let tb = {
    	    vip_level : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_claim_promotional_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.vip_level, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_claim_promotional_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_claim_gift_money()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_claim_gift_money"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_claim_gift_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_claim_holiday_reward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_claim_holiday_reward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_claim_holiday_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_claim_mysterious_reward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_claim_mysterious_reward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_claim_mysterious_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_vip_claim_status()
    {
        let tb = {
    	    result : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_vip_claim_status"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_vip_claim_status"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_level()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_level"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_level"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_vip_level()
    {
        let tb = {
    	    vip_level : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_vip_level"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.vip_level, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.vip_level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_vip_level"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_buy_vip()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_buy_vip"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_buy_vip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_buy_vip()
    {
        let tb = {
    	    result : 0,
    	    time_out : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_buy_vip"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		tb.time_out.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.time_out.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_buy_vip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_signin_extra_reward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_signin_extra_reward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_signin_extra_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_signin_extra_reward()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_signin_extra_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_signin_extra_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function invite_role_data()
    {
        let tb = {
    	    create_time : stime(),
    	    name : '',
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_invite_role_data"];
    		},
		    encode:function(buf)
		    {
        		tb.create_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.create_time.decode(buf, startIndex);
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_invite_role_data"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_invite_time_out2()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_invite_time_out2"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_invite_time_out2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_invite_time_out2()
    {
        let tb = {
    	    time_out : stime(),
    	    is_time_out : 0,
    	    invite_count : 0,
    	    invite_data : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_invite_time_out2"];
    		},
		    encode:function(buf)
		    {
        		tb.time_out.encode(buf);
    		    EncodeUtils.int32ToByte(tb.is_time_out, buf);
    		    EncodeUtils.int32ToByte(tb.invite_count, buf);
        		EncodeUtils.uInt16ToByte(tb.invite_data.length, buf);
        		for (let i = 0; i < tb.invite_data.length; ++i)
				{
            		tb.invite_data[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.time_out.decode(buf, startIndex);
        		tb.is_time_out = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.invite_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let invite_data_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < invite_data_len; ++i)
				{
            		let tmp = invite_role_data();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.invite_data.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_invite_time_out2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_vip_daily_claim()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_vip_daily_claim"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_vip_daily_claim"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_vip_rebate()
    {
        let tb = {
    	    page : 0,
    	    type : 0,
    	    start_time : stime(),
    	    end_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_vip_rebate"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_vip_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function vip_rebate_record()
    {
        let tb = {
    	    bet_money : 0,
    	    rebate : 0,
    	    type : 0,
    	    create_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_vip_rebate_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.bet_money, buf);
    			EncodeUtils.int64ToByte(tb.rebate, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
        		tb.create_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.rebate = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.create_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_vip_rebate_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_vip_rebate()
    {
        let tb = {
    	    total_page : 0,
    	    record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_vip_rebate"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
        		for (let i = 0; i < tb.record_list.length; ++i)
				{
            		tb.record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_list_len; ++i)
				{
            		let tmp = vip_rebate_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_vip_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_svip_signup()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_svip_signup"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_svip_signup"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_svip_signup()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_svip_signup"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_svip_signup"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_svip_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_svip_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_svip_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_svip_info()
    {
        let tb = {
    	    start_time : stime(),
    	    end_time : stime(),
    	    recharge_time : stime(),
    	    init_money : 0,
    	    get_money : 0,
    	    svip_state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_svip_info"];
    		},
		    encode:function(buf)
		    {
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
        		tb.recharge_time.encode(buf);
    			EncodeUtils.int64ToByte(tb.init_money, buf);
    			EncodeUtils.int64ToByte(tb.get_money, buf);
    		    EncodeUtils.int32ToByte(tb.svip_state, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_svip_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_svip_getreawrd()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_svip_getreawrd"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_svip_getreawrd"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_svip_getreawrd()
    {
        let tb = {
    	    result : 0,
    	    get_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_svip_getreawrd"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.get_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_svip_getreawrd"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_red_point()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_red_point"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_red_point"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_red_point()
    {
        let tb = {
    	    red_point_array : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_red_point"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.red_point_array.length, buf);
       			for (let i = 0; i < tb.red_point_array.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.red_point_array[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let red_point_array_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < red_point_array_len; ++i)
		 		{
             		tb.red_point_array.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_red_point"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_exp_room_time()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_exp_room_time"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_exp_room_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_exp_room_time()
    {
        let tb = {
    	    times : 0,
    	    is_end : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_exp_room_time"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.times, buf);
    		    EncodeUtils.int32ToByte(tb.is_end, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_end = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_exp_room_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function agent_item2()
    {
        let tb = {
    	    role_id : 0,
    	    head_icon : '',
    	    nickname : '',
    	    money : 0,
    	    signature : '',
    	    weixin_id : '',
    	    sex : 0,
    	    qq : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_agent_item2"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.signature, buf);
    			EncodeUtils.utf8StrtoBytes(tb.weixin_id, buf);
    		    EncodeUtils.int32ToByte(tb.sex, buf);
    			EncodeUtils.utf8StrtoBytes(tb.qq, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_agent_item2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_agent_list2()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_agent_list2"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_agent_list2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_agent_list2()
    {
        let tb = {
    	    agent_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_agent_list2"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.agent_list.length, buf);
        		for (let i = 0; i < tb.agent_list.length; ++i)
				{
            		tb.agent_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let agent_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < agent_list_len; ++i)
				{
            		let tmp = agent_item2();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.agent_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_agent_list2"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function christmas_rank_data()
    {
        let tb = {
    	    name : '',
    	    role_id : 0,
    	    head_icon : '',
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_christmas_rank_data"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_christmas_rank_data"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_christmas_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_christmas_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_christmas_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_christmas_info()
    {
        let tb = {
    	    start_time : stime(),
    	    end_time : stime(),
    	    is_open : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_christmas_info"];
    		},
		    encode:function(buf)
		    {
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_christmas_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_christmas_countdown()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_christmas_countdown"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_christmas_countdown"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_christmas_hit()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_christmas_hit"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_christmas_hit"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_christmas_hit()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_christmas_hit"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_christmas_hit"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_christmas_reward()
    {
        let tb = {
    	    get_money : 0,
    	    rank_data : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_christmas_reward"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.get_money, buf);
        		EncodeUtils.uInt16ToByte(tb.rank_data.length, buf);
        		for (let i = 0; i < tb.rank_data.length; ++i)
				{
            		tb.rank_data[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let rank_data_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_data_len; ++i)
				{
            		let tmp = christmas_rank_data();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_data.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_christmas_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function lucky_roulette_record()
    {
        let tb = {
    	    name : '',
    	    win : '',
    	    update_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_lucky_roulette_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.win, buf);
        		tb.update_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_lucky_roulette_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_lucky_roulette_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_lucky_roulette_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_lucky_roulette_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function action_info()
    {
        let tb = {
    	    require_times : 0,
    	    done_times : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_action_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.require_times, buf);
    		    EncodeUtils.int32ToByte(tb.done_times, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.require_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.done_times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_action_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_lucky_roulette_info()
    {
        let tb = {
    	    is_open : 0,
    	    result : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    latest_id : 0,
    	    task_detail : [],
    	    my_list : [],
    	    record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_lucky_roulette_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.latest_id, buf);
        		EncodeUtils.uInt16ToByte(tb.task_detail.length, buf);
        		for (let i = 0; i < tb.task_detail.length; ++i)
				{
            		tb.task_detail[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.my_list.length, buf);
        		for (let i = 0; i < tb.my_list.length; ++i)
				{
            		tb.my_list[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
        		for (let i = 0; i < tb.record_list.length; ++i)
				{
            		tb.record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
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
        		for(let i = 0; i < task_detail_len; ++i)
				{
            		let tmp = action_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.task_detail.push(tmp);
        		}
        		let my_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < my_list_len; ++i)
				{
            		let tmp = lucky_roulette_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.my_list.push(tmp);
        		}
        		let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_list_len; ++i)
				{
            		let tmp = lucky_roulette_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_lucky_roulette_start()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_lucky_roulette_start"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_lucky_roulette_start"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_lucky_roulette_reward()
    {
        let tb = {
    	    result : 0,
    	    item_no : 0,
    	    win : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_lucky_roulette_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.item_no, buf);
    			EncodeUtils.utf8StrtoBytes(tb.win, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_lucky_roulette_record()
    {
        let tb = {
    	    new_record : lucky_roulette_record(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_lucky_roulette_record"];
    		},
		    encode:function(buf)
		    {
        		tb.new_record.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.new_record.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_lucky_roulette_got_chance()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_lucky_roulette_got_chance"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_got_chance"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_lucky_roulette_latest_record()
    {
        let tb = {
    	    record_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_lucky_roulette_latest_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.record_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.record_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_lucky_roulette_latest_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_lucky_roulette_latest_record()
    {
        let tb = {
    	    new_record : lucky_roulette_record(),
    	    latest_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_lucky_roulette_latest_record"];
    		},
		    encode:function(buf)
		    {
        		tb.new_record.encode(buf);
    		    EncodeUtils.int32ToByte(tb.latest_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.new_record.decode(buf, startIndex);
        		tb.latest_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_lucky_roulette_latest_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function bag_item()
    {
        let tb = {
    	    id : 0,
    	    item_id : 0,
    	    count : 0,
    	    info1 : 0,
    	    info2 : 0,
    	    info3 : 0,
    	    info4 : 0,
    	    info5 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_bag_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    		    EncodeUtils.int32ToByte(tb.item_id, buf);
    		    EncodeUtils.int32ToByte(tb.count, buf);
    		    EncodeUtils.int32ToByte(tb.info1, buf);
    		    EncodeUtils.int32ToByte(tb.info2, buf);
    		    EncodeUtils.int32ToByte(tb.info3, buf);
    		    EncodeUtils.int32ToByte(tb.info4, buf);
    		    EncodeUtils.int32ToByte(tb.info5, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_bag_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_role_bag()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_role_bag"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_role_bag"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_role_bag()
    {
        let tb = {
    	    items : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_role_bag"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.items.length, buf);
        		for (let i = 0; i < tb.items.length; ++i)
				{
            		tb.items[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let items_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < items_len; ++i)
				{
            		let tmp = bag_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.items.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_role_bag"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_use_item()
    {
        let tb = {
    	    id : 0,
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_use_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    		    EncodeUtils.int32ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_use_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_use_item()
    {
        let tb = {
    	    result : 0,
    	    item : bag_item(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_use_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		tb.item.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.item.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_use_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_update_item()
    {
        let tb = {
    	    id : 0,
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_update_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    		    EncodeUtils.int32ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_update_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_exchange()
    {
        let tb = {
    	    code : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_exchange"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.code, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let code_value = EncodeUtils.byteToString(buf, startIndex);
				tb.code = code_value[0];
 				startIndex += code_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_exchange"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_exchange()
    {
        let tb = {
    	    result : 0,
    	    code_type : 0,
    	    money : 0,
    	    game_type : 0,
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_exchange"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.code_type, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_exchange"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_first_recharge_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_first_recharge_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_first_recharge_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_first_recharge_info()
    {
        let tb = {
    	    is_open : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    process : [],
    	    amount : 0,
    	    turnover : 0,
    	    left_time : 0,
    	    prize_ratio : [],
    	    turnover_times : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_first_recharge_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
       			EncodeUtils.uInt16ToByte(tb.process.length, buf);
       			for (let i = 0; i < tb.process.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.process[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.amount, buf);
    			EncodeUtils.int64ToByte(tb.turnover, buf);
    		    EncodeUtils.int32ToByte(tb.left_time, buf);
       			EncodeUtils.uInt16ToByte(tb.prize_ratio.length, buf);
       			for (let i = 0; i < tb.prize_ratio.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.prize_ratio[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.turnover_times.length, buf);
       			for (let i = 0; i < tb.turnover_times.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.turnover_times[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		let process_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < process_len; ++i)
		 		{
             		tb.process.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.turnover = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.left_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let prize_ratio_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < prize_ratio_len; ++i)
		 		{
             		tb.prize_ratio.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let turnover_times_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < turnover_times_len; ++i)
		 		{
             		tb.turnover_times.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_first_recharge_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_first_recharge_start()
    {
        let tb = {
    	    taskID : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_first_recharge_start"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.taskID, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.taskID = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_first_recharge_start"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_first_recharge_reward()
    {
        let tb = {
    	    result : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_first_recharge_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_first_recharge_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_first_recharge_show()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_first_recharge_show"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_first_recharge_show"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_first_recharge_show()
    {
        let tb = {
    	    show : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_first_recharge_show"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.show, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.show = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_first_recharge_show"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_invitecode()
    {
        let tb = {
    	    superior_id : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_invitecode"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.superior_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let superior_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.superior_id = superior_id_value[0];
 				startIndex += superior_id_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_invitecode"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_refresh_money()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_refresh_money"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_refresh_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_win_100_share()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_win_100_share"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_win_100_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_win_100_share()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_win_100_share"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_win_100_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_game_card_leftscore()
    {
        let tb = {
    	    game_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_game_card_leftscore"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_game_card_leftscore"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_game_card_leftscore()
    {
        let tb = {
    	    leftscore : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_game_card_leftscore"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.leftscore, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.leftscore = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_game_card_leftscore"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_newbees_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_newbees_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_newbees_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_newbees_info()
    {
        let tb = {
    	    is_open : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    is_follow_fb : 0,
    	    is_follow_fb_group : 0,
    	    is_follow_tg_group : 0,
    	    is_bind_card : 0,
    	    amount : 0,
    	    status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_newbees_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.is_follow_fb, buf);
    		    EncodeUtils.int32ToByte(tb.is_follow_fb_group, buf);
    		    EncodeUtils.int32ToByte(tb.is_follow_tg_group, buf);
    		    EncodeUtils.int32ToByte(tb.is_bind_card, buf);
    			EncodeUtils.int64ToByte(tb.amount, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_open = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.is_follow_fb = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_follow_fb_group = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_follow_tg_group = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_bind_card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_newbees_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_newbees_prize()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_newbees_prize"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_newbees_prize"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_newbees_prize()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_newbees_prize"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_newbees_prize"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_contact_customer_service()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_contact_customer_service"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_contact_customer_service"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_contact_customer_service()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_contact_customer_service"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_contact_customer_service"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_game_giftcard_remainpoints()
    {
        let tb = {
    	    game_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_game_giftcard_remainpoints"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_game_giftcard_remainpoints"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_game_giftcard_remainpoints()
    {
        let tb = {
    	    remainpoints : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_game_giftcard_remainpoints"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.remainpoints, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.remainpoints = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_game_giftcard_remainpoints"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_fllm_reward()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_fllm_reward"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_fllm_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_fllm_reward()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_fllm_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_fllm_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function guaguacard_record()
    {
        let tb = {
    	    card1state : 0,
    	    card2state : 0,
    	    card3state : 0,
    	    card1content : 0,
    	    card2content : 0,
    	    card3content : 0,
    	    card1opentime : stime(),
    	    card2opentime : stime(),
    	    card3opentime : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_guaguacard_record"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_guaguacard_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function watering_record()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    head_photo : '',
    	    level : 0,
    	    watering_count : 0,
    	    rank : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_watering_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.watering_count, buf);
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_watering_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function get_water_record()
    {
        let tb = {
    	    task_id : 0,
    	    state : 0,
    	    complete_count : 0,
    	    total_count : 0,
    	    water_count_from : 0,
    	    water_count_to : 0,
    	    ready_num : 0,
    	    task_desc : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_get_water_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.task_id, buf);
    		    EncodeUtils.int32ToByte(tb.state, buf);
    		    EncodeUtils.int32ToByte(tb.complete_count, buf);
    		    EncodeUtils.int32ToByte(tb.total_count, buf);
    		    EncodeUtils.int32ToByte(tb.water_count_from, buf);
    		    EncodeUtils.int32ToByte(tb.water_count_to, buf);
    		    EncodeUtils.int32ToByte(tb.ready_num, buf);
    			EncodeUtils.utf8StrtoBytes(tb.task_desc, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_get_water_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tree_upgrade_record()
    {
        let tb = {
    	    level : 0,
    	    water_count : 0,
    	    fertilizer_count : 0,
    	    reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tree_upgrade_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.water_count, buf);
    		    EncodeUtils.int32ToByte(tb.fertilizer_count, buf);
    		    EncodeUtils.int32ToByte(tb.reward, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tree_upgrade_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_info()
    {
        let tb = {
    	    is_open : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    level : 0,
    	    level_reward : 0,
    	    watering_count : 0,
    	    fertilize_count : 0,
    	    tree_upgrade : [],
    	    left_fertilizer_count : 0,
    	    left_water_count : 0,
    	    invite_reward_type : 0,
    	    nickname : '',
    	    card_record : guaguacard_record(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_open, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.level_reward, buf);
    		    EncodeUtils.int32ToByte(tb.watering_count, buf);
    		    EncodeUtils.int32ToByte(tb.fertilize_count, buf);
        		EncodeUtils.uInt16ToByte(tb.tree_upgrade.length, buf);
        		for (let i = 0; i < tb.tree_upgrade.length; ++i)
				{
            		tb.tree_upgrade[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.left_fertilizer_count, buf);
    		    EncodeUtils.int32ToByte(tb.left_water_count, buf);
    		    EncodeUtils.int32ToByte(tb.invite_reward_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
        		tb.card_record.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
        		for(let i = 0; i < tree_upgrade_len; ++i)
				{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_open_guaguacard()
    {
        let tb = {
    	    cardid : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_open_guaguacard"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.cardid, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.cardid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_open_guaguacard"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_open_guaguacard()
    {
        let tb = {
    	    card_state : guaguacard_record(),
    	    left_water_count : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_open_guaguacard"];
    		},
		    encode:function(buf)
		    {
        		tb.card_state.encode(buf);
    		    EncodeUtils.int32ToByte(tb.left_water_count, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.card_state.decode(buf, startIndex);
        		tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_open_guaguacard"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_fertilize_watering()
    {
        let tb = {
    	    type : 0,
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_fertilize_watering"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_fertilize_watering"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_fertilize_watering()
    {
        let tb = {
    	    left_fertilizer : 0,
    	    left_water_count : 0,
    	    tree_level : 0,
    	    fertilize_count : 0,
    	    watering_count : 0,
    	    level_reward : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_fertilize_watering"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.left_fertilizer, buf);
    		    EncodeUtils.int32ToByte(tb.left_water_count, buf);
    		    EncodeUtils.int32ToByte(tb.tree_level, buf);
    		    EncodeUtils.int32ToByte(tb.fertilize_count, buf);
    		    EncodeUtils.int32ToByte(tb.watering_count, buf);
    		    EncodeUtils.int32ToByte(tb.level_reward, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_fertilize_watering"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_watering_competition()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_watering_competition"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_watering_competition"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_watering_competition()
    {
        let tb = {
    	    watering_list : [],
    	    remain_seconds : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_watering_competition"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.watering_list.length, buf);
        		for (let i = 0; i < tb.watering_list.length; ++i)
				{
            		tb.watering_list[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.remain_seconds, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let watering_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < watering_list_len; ++i)
				{
            		let tmp = watering_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.watering_list.push(tmp);
        		}
        		tb.remain_seconds = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_watering_competition"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_invite_friend()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_invite_friend"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_invite_friend"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_invite_friend()
    {
        let tb = {
    	    friend_count : 0,
    	    role_id1 : 0,
    	    nickname1 : '',
    	    head_photo1 : '',
    	    role_id2 : 0,
    	    nickname2 : '',
    	    head_photo2 : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.friend_count, buf);
    			EncodeUtils.int64ToByte(tb.role_id1, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname1, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo1, buf);
    			EncodeUtils.int64ToByte(tb.role_id2, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname2, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo2, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_get_water_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_get_water_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_water_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_get_water_list()
    {
        let tb = {
    	    water_task : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_get_water_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.water_task.length, buf);
        		for (let i = 0; i < tb.water_task.length; ++i)
				{
            		tb.water_task[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let water_task_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < water_task_len; ++i)
				{
            		let tmp = get_water_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.water_task.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_water_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_get_water()
    {
        let tb = {
    	    task_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_get_water"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.task_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_water"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_get_water()
    {
        let tb = {
    	    water_count : 0,
    	    left_water_count : 0,
    	    state : 0,
    	    state_arr : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_get_water"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.water_count, buf);
    		    EncodeUtils.int32ToByte(tb.left_water_count, buf);
    		    EncodeUtils.int32ToByte(tb.state, buf);
       			EncodeUtils.uInt16ToByte(tb.state_arr.length, buf);
       			for (let i = 0; i < tb.state_arr.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.state_arr[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.left_water_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let state_arr_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < state_arr_len; ++i)
		 		{
             		tb.state_arr.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_water"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_get_fertilizer_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_get_fertilizer_list()
    {
        let tb = {
    	    fertilizer_task : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.fertilizer_task.length, buf);
        		for (let i = 0; i < tb.fertilizer_task.length; ++i)
				{
            		tb.fertilizer_task[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let fertilizer_task_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < fertilizer_task_len; ++i)
				{
            		let tmp = get_water_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.fertilizer_task.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_get_fertilizer()
    {
        let tb = {
    	    reward_type : 0,
    	    task_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.reward_type, buf);
    		    EncodeUtils.int32ToByte(tb.task_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.reward_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_fertilizer"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_get_fertilizer()
    {
        let tb = {
    	    fertilizer_count : 0,
    	    left_fertilizer_count : 0,
    	    is_get_gift : 0,
    	    nickname2 : '',
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.fertilizer_count, buf);
    		    EncodeUtils.int32ToByte(tb.left_fertilizer_count, buf);
    		    EncodeUtils.int32ToByte(tb.is_get_gift, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname2, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_fertilizer"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_invite_friend_get_gift()
    {
        let tb = {
    	    reward_type : 0,
    	    task_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_invite_friend_get_gift"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.reward_type, buf);
    		    EncodeUtils.int32ToByte(tb.task_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.reward_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.task_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_invite_friend_get_gift"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_invite_friend_get_gift()
    {
        let tb = {
    	    gift_type : 0,
    	    gift_count : 0,
    	    left_water_count : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend_get_gift"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.gift_type, buf);
    		    EncodeUtils.int32ToByte(tb.gift_count, buf);
    		    EncodeUtils.int32ToByte(tb.left_water_count, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_invite_friend_get_gift"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_get_reward()
    {
        let tb = {
    	    reward_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_get_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.reward_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.reward_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_get_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_get_reward()
    {
        let tb = {
    	    level : 0,
    	    watering_count : 0,
    	    fertilize_count : 0,
    	    level_reward : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_get_reward"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.watering_count, buf);
    		    EncodeUtils.int32ToByte(tb.fertilize_count, buf);
    		    EncodeUtils.int32ToByte(tb.level_reward, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_get_reward"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dragon_fortune_claim_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dragon_fortune_claim_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dragon_fortune_claim_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dragon_fortune_claim_info()
    {
        let tb = {
    	    gift_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dragon_fortune_claim_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.gift_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.gift_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dragon_fortune_claim_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_daily_return_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_daily_return_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_daily_return_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_daily_return_info()
    {
        let tb = {
    	    level : 0,
    	    ratio : '',
    	    personal_money : 0,
    	    team_money : 0,
    	    s_link : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_daily_return_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.level, buf);
    			EncodeUtils.utf8StrtoBytes(tb.ratio, buf);
    			EncodeUtils.int64ToByte(tb.personal_money, buf);
    			EncodeUtils.int64ToByte(tb.team_money, buf);
    			EncodeUtils.utf8StrtoBytes(tb.s_link, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let ratio_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ratio = ratio_value[0];
 				startIndex += ratio_value[1];
        		tb.personal_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.team_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let s_link_value = EncodeUtils.byteToString(buf, startIndex);
				tb.s_link = s_link_value[0];
 				startIndex += s_link_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_daily_return_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_daily_return_claim()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_daily_return_claim"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_daily_return_claim"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_daily_return_claim()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_daily_return_claim"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_daily_return_claim"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function daily_return_record()
    {
        let tb = {
    	    role_id : 0,
    	    level : 0,
    	    team_num : 0,
    	    personal_bet : 0,
    	    team_bet : 0,
    	    personal_return : 0,
    	    team_return : 0,
    	    username : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_daily_return_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.team_num, buf);
    			EncodeUtils.int64ToByte(tb.personal_bet, buf);
    			EncodeUtils.int64ToByte(tb.team_bet, buf);
    			EncodeUtils.int64ToByte(tb.personal_return, buf);
    			EncodeUtils.int64ToByte(tb.team_return, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_daily_return_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_daily_return_his()
    {
        let tb = {
    	    search_name : '',
    	    search_lev : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_daily_return_his"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.search_name, buf);
    		    EncodeUtils.int32ToByte(tb.search_lev, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_daily_return_his"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_daily_return_his()
    {
        let tb = {
    	    records : [],
    	    total : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_daily_return_his"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.records.length, buf);
        		for (let i = 0; i < tb.records.length; ++i)
				{
            		tb.records[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.total, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let records_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < records_len; ++i)
				{
            		let tmp = daily_return_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.records.push(tmp);
        		}
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_daily_return_his"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_improve_agent_lev()
    {
        let tb = {
    	    role_id : '',
    	    level : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_improve_agent_lev"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let role_id_value = EncodeUtils.byteToString(buf, startIndex);
				tb.role_id = role_id_value[0];
 				startIndex += role_id_value[1];
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_improve_agent_lev"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_improve_agent_lev()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_improve_agent_lev"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_improve_agent_lev"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function bet_record()
    {
        let tb = {
    	    platform_id : '',
    	    game_type : '',
    	    bet_total : 0,
    	    net_value : 0,
    	    video : '',
    	    balance_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_bet_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.platform_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.game_type, buf);
    			EncodeUtils.int64ToByte(tb.bet_total, buf);
    			EncodeUtils.int64ToByte(tb.net_value, buf);
    			EncodeUtils.utf8StrtoBytes(tb.video, buf);
        		tb.balance_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
				let video_value = EncodeUtils.byteToString(buf, startIndex);
				tb.video = video_value[0];
 				startIndex += video_value[1];
        		startIndex += tb.balance_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_bet_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_bet_record_list()
    {
        let tb = {
    	    platform_id : '',
    	    game_type : '',
    	    play_type : '',
    	    start_time : stime(),
    	    end_time : stime(),
    	    page_num : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_bet_record_list"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.platform_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.game_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.play_type, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.page_num, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_bet_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_bet_record_list()
    {
        let tb = {
    	    total_pages : 0,
    	    bet_record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_bet_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_pages, buf);
        		EncodeUtils.uInt16ToByte(tb.bet_record_list.length, buf);
        		for (let i = 0; i < tb.bet_record_list.length; ++i)
				{
            		tb.bet_record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_pages = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let bet_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_record_list_len; ++i)
				{
            		let tmp = bet_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.bet_record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_bet_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_bet_record_list_by_page()
    {
        let tb = {
    	    page_num : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_bet_record_list_by_page"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page_num, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_bet_record_list_by_page"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_bet_record_list_by_page()
    {
        let tb = {
    	    bet_record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_bet_record_list_by_page"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.bet_record_list.length, buf);
        		for (let i = 0; i < tb.bet_record_list.length; ++i)
				{
            		tb.bet_record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let bet_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_record_list_len; ++i)
				{
            		let tmp = bet_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.bet_record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_bet_record_list_by_page"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_agent_trans()
    {
        let tb = {
    	    amount : 0,
    	    name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_agent_trans"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.amount, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.amount = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_agent_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_agent_trans()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_agent_trans"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_agent_trans"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_activites()
    {
        let tb = {
    	    show : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_activites"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.show, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.show = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_activites"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function activity_info()
    {
        let tb = {
    	    id : 0,
    	    tag : '',
    	    pic_link : '',
    	    name : '',
    	    restrict : '',
    	    content : '',
    	    details : '',
    	    rules : '',
    	    total : 0,
    	    current : 0,
    	    bonus : 0,
    	    have_save : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_activity_info"];
    		},
		    encode:function(buf)
		    {
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
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_activity_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_activites()
    {
        let tb = {
    	    promo : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_activites"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.promo.length, buf);
        		for (let i = 0; i < tb.promo.length; ++i)
				{
            		tb.promo[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let promo_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < promo_len; ++i)
				{
            		let tmp = activity_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.promo.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_activites"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function plat_rec()
    {
        let tb = {
    	    id : 0,
    	    platform : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_plat_rec"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.platform, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let platform_value = EncodeUtils.byteToString(buf, startIndex);
				tb.platform = platform_value[0];
 				startIndex += platform_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_plat_rec"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_platform_gametype_list()
    {
        let tb = {
    	    start_time : stime(),
    	    end_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_platform_gametype_list"];
    		},
		    encode:function(buf)
		    {
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_platform_gametype_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_platform_gametype_list()
    {
        let tb = {
    	    plat_rec_list : [],
    	    gtype_rec_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_platform_gametype_list"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.plat_rec_list.length, buf);
       			for (let i = 0; i < tb.plat_rec_list.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.plat_rec_list[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.gtype_rec_list.length, buf);
       			for (let i = 0; i < tb.gtype_rec_list.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.gtype_rec_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let plat_rec_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < plat_rec_list_len; ++i)
		 		{
					let plat_rec_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.plat_rec_list.push(plat_rec_list_value[0]);
					startIndex += plat_rec_list_value[1];
        		}
        		let gtype_rec_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gtype_rec_list_len; ++i)
		 		{
					let gtype_rec_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.gtype_rec_list.push(gtype_rec_list_value[0]);
					startIndex += gtype_rec_list_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_platform_gametype_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_agent_accounting_change()
    {
        let tb = {
    	    page : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_agent_accounting_change"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_agent_accounting_change"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_audit_record()
    {
        let tb = {
    	    page : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_audit_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_audit_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function audit_record()
    {
        let tb = {
    	    title : '',
    	    amount : 0,
    	    progess : 0,
    	    type : 0,
    	    create_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_audit_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.title, buf);
    			EncodeUtils.int64ToByte(tb.amount, buf);
    			EncodeUtils.int64ToByte(tb.progess, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
        		tb.create_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_audit_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_audit_record()
    {
        let tb = {
    	    total_page : 0,
    	    record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_audit_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
        		for (let i = 0; i < tb.record_list.length; ++i)
				{
            		tb.record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_list_len; ++i)
				{
            		let tmp = audit_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_audit_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function agent_accounting_change_record()
    {
        let tb = {
    	    type : 0,
    	    pay_money : 0,
    	    item : 0,
    	    trans_to : '',
    	    create_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_agent_accounting_change_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    			EncodeUtils.int64ToByte(tb.pay_money, buf);
    		    EncodeUtils.int32ToByte(tb.item, buf);
    			EncodeUtils.utf8StrtoBytes(tb.trans_to, buf);
        		tb.create_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_agent_accounting_change_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_agent_accounting_change()
    {
        let tb = {
    	    total_page : 0,
    	    record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_agent_accounting_change"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.record_list.length, buf);
        		for (let i = 0; i < tb.record_list.length; ++i)
				{
            		tb.record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_list_len; ++i)
				{
            		let tmp = agent_accounting_change_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_agent_accounting_change"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function club_info_record()
    {
        let tb = {
    	    club_id : 0,
    	    club_name : '',
    	    club_logo : '',
    	    is_official : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_club_info_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_logo, buf);
    		    EncodeUtils.int32ToByte(tb.is_official, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let club_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_name = club_name_value[0];
 				startIndex += club_name_value[1];
				let club_logo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_logo = club_logo_value[0];
 				startIndex += club_logo_value[1];
        		tb.is_official = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_club_info_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function member_info()
    {
        let tb = {
    	    role_id : 0,
    	    username : '',
    	    head_photo : 0,
    	    level : 0,
    	    is_admin : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_member_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.is_admin, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.head_photo = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_admin = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_member_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function user_info()
    {
        let tb = {
    	    username : '',
    	    head_photo : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_user_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.head_photo, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.head_photo = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_user_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function member_state()
    {
        let tb = {
    	    role_id : 0,
    	    username : '',
    	    head_photo : 0,
    	    level : 0,
    	    approval_state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_member_state"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.approval_state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.head_photo = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.approval_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_member_state"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function club_game_info()
    {
        let tb = {
    	    game_type : 0,
    	    game_icon : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_club_game_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.game_icon, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.game_icon = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_club_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function desk_info()
    {
        let tb = {
    	    room_id : 0,
    	    game_type : 0,
    	    desk_name : '',
    	    min_bet : 0,
    	    need_chip : 0,
    	    min_money : 0,
    	    max_money : 0,
    	    game_logo : 0,
    	    current_players : 0,
    	    max_players : 0,
    	    desk_state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_desk_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.desk_name, buf);
    			EncodeUtils.int64ToByte(tb.min_bet, buf);
    			EncodeUtils.int64ToByte(tb.need_chip, buf);
    			EncodeUtils.int64ToByte(tb.min_money, buf);
    			EncodeUtils.int64ToByte(tb.max_money, buf);
    		    EncodeUtils.int32ToByte(tb.game_logo, buf);
    		    EncodeUtils.int32ToByte(tb.current_players, buf);
    		    EncodeUtils.int32ToByte(tb.max_players, buf);
    		    EncodeUtils.int32ToByte(tb.desk_state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let desk_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.desk_name = desk_name_value[0];
 				startIndex += desk_name_value[1];
        		tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.need_chip = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.min_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.max_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.game_logo = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.current_players = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_players = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.desk_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_desk_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_agent_rebate()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_agent_rebate"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_agent_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_agent_rebate()
    {
        let tb = {
    	    result : 0,
    	    rebate : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_agent_rebate"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.rebate, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rebate = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_agent_rebate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_create_club()
    {
        let tb = {
    	    club_name : '',
    	    club_introduction : '',
    	    club_logo : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_create_club"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.club_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_introduction, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_logo, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let club_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_name = club_name_value[0];
 				startIndex += club_name_value[1];
				let club_introduction_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_introduction = club_introduction_value[0];
 				startIndex += club_introduction_value[1];
				let club_logo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_logo = club_logo_value[0];
 				startIndex += club_logo_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_create_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_create_club()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_create_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_create_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_disband_club()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_disband_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_disband_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_disband_club()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_disband_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_disband_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_modify_club_info()
    {
        let tb = {
    	    club_id : 0,
    	    club_name : '',
    	    club_intro : '',
    	    club_logo : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_modify_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_intro, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_logo, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let club_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_name = club_name_value[0];
 				startIndex += club_name_value[1];
				let club_intro_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_intro = club_intro_value[0];
 				startIndex += club_intro_value[1];
				let club_logo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_logo = club_logo_value[0];
 				startIndex += club_logo_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_modify_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_modify_club_info()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_modify_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_modify_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_club_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_club_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_club_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_club_list()
    {
        let tb = {
    	    created_club_list : [],
    	    joined_club_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_club_list"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.created_club_list.length, buf);
        		for (let i = 0; i < tb.created_club_list.length; ++i)
				{
            		tb.created_club_list[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.joined_club_list.length, buf);
        		for (let i = 0; i < tb.joined_club_list.length; ++i)
				{
            		tb.joined_club_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let created_club_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < created_club_list_len; ++i)
				{
            		let tmp = club_info_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.created_club_list.push(tmp);
        		}
        		let joined_club_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < joined_club_list_len; ++i)
				{
            		let tmp = club_info_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.joined_club_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_club_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_club_info()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_club_info()
    {
        let tb = {
    	    club_id : 0,
    	    club_logo : '',
    	    club_name : '',
    	    club_introduction : '',
    	    is_official : 0,
    	    is_admin : 0,
    	    is_creator : 0,
    	    totalmember : 0,
    	    userinfo : [],
    	    gamelist : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_logo, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.club_introduction, buf);
    		    EncodeUtils.int32ToByte(tb.is_official, buf);
    		    EncodeUtils.int32ToByte(tb.is_admin, buf);
    		    EncodeUtils.int32ToByte(tb.is_creator, buf);
    		    EncodeUtils.int32ToByte(tb.totalmember, buf);
        		EncodeUtils.uInt16ToByte(tb.userinfo.length, buf);
        		for (let i = 0; i < tb.userinfo.length; ++i)
				{
            		tb.userinfo[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.gamelist.length, buf);
        		for (let i = 0; i < tb.gamelist.length; ++i)
				{
            		tb.gamelist[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let club_logo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_logo = club_logo_value[0];
 				startIndex += club_logo_value[1];
				let club_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_name = club_name_value[0];
 				startIndex += club_name_value[1];
				let club_introduction_value = EncodeUtils.byteToString(buf, startIndex);
				tb.club_introduction = club_introduction_value[0];
 				startIndex += club_introduction_value[1];
        		tb.is_official = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_admin = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_creator = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.totalmember = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let userinfo_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < userinfo_len; ++i)
				{
            		let tmp = user_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.userinfo.push(tmp);
        		}
        		let gamelist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gamelist_len; ++i)
				{
            		let tmp = club_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gamelist.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_extra_club_info()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_extra_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_extra_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_extra_club_info()
    {
        let tb = {
    	    allow_admin_createtable : 0,
    	    approve_count : 0,
    	    room_count : 0,
    	    table_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_extra_club_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.allow_admin_createtable, buf);
    		    EncodeUtils.int32ToByte(tb.approve_count, buf);
    		    EncodeUtils.int32ToByte(tb.room_count, buf);
    		    EncodeUtils.int32ToByte(tb.table_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.allow_admin_createtable = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.approve_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.room_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.table_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_extra_club_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_search_member()
    {
        let tb = {
    	    search_type : 0,
    	    club_id : 0,
    	    username : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_search_member"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.search_type, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.search_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_search_member"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_search_member()
    {
        let tb = {
    	    result : 0,
    	    role_id : 0,
    	    head_photo : 0,
    	    level : 0,
    	    is_admin : 0,
    	    approve_state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_search_member"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.level, buf);
    		    EncodeUtils.int32ToByte(tb.is_admin, buf);
    		    EncodeUtils.int32ToByte(tb.approve_state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.head_photo = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_admin = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.approve_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_search_member"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_add_admin()
    {
        let tb = {
    	    club_id : 0,
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_add_admin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_add_admin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_add_admin()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_add_admin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_add_admin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_del_admin()
    {
        let tb = {
    	    club_id : 0,
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_del_admin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_del_admin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_del_admin()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_del_admin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_del_admin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_admin_list()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_admin_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_admin_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_admin_list()
    {
        let tb = {
    	    total_added_admin : 0,
    	    add_admin_limit : 0,
    	    adminlist : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_admin_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_added_admin, buf);
    		    EncodeUtils.int32ToByte(tb.add_admin_limit, buf);
        		EncodeUtils.uInt16ToByte(tb.adminlist.length, buf);
        		for (let i = 0; i < tb.adminlist.length; ++i)
				{
            		tb.adminlist[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_added_admin = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.add_admin_limit = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let adminlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < adminlist_len; ++i)
				{
            		let tmp = member_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.adminlist.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_admin_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_admin_create_table()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_admin_create_table"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_admin_create_table"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_admin_create_table()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_admin_create_table"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_admin_create_table"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_unapproved_member_count()
    {
        let tb = {
    	    count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_unapproved_member_count"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_unapproved_member_count"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_club_minigame()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_club_minigame"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_club_minigame"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_club_minigame()
    {
        let tb = {
    	    result : 0,
    	    gamelist : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_club_minigame"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		EncodeUtils.uInt16ToByte(tb.gamelist.length, buf);
        		for (let i = 0; i < tb.gamelist.length; ++i)
				{
            		tb.gamelist[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let gamelist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gamelist_len; ++i)
				{
            		let tmp = club_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gamelist.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_club_minigame"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_club_othergame()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_club_othergame"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_club_othergame"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_club_othergame()
    {
        let tb = {
    	    result : 0,
    	    gamelist : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_club_othergame"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		EncodeUtils.uInt16ToByte(tb.gamelist.length, buf);
        		for (let i = 0; i < tb.gamelist.length; ++i)
				{
            		tb.gamelist[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let gamelist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gamelist_len; ++i)
				{
            		let tmp = club_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gamelist.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_club_othergame"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_club_game_competition_list()
    {
        let tb = {
    	    club_id : 0,
    	    game_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_club_game_competition_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_club_game_competition_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_club_game_competition_list()
    {
        let tb = {
    	    result : 0,
    	    gamelist : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_club_game_competition_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
        		EncodeUtils.uInt16ToByte(tb.gamelist.length, buf);
        		for (let i = 0; i < tb.gamelist.length; ++i)
				{
            		tb.gamelist[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let gamelist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gamelist_len; ++i)
				{
            		let tmp = club_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gamelist.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_club_game_competition_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_display_desk_reach_max_capacity()
    {
        let tb = {
    	    is_display : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_display_desk_reach_max_capacity"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.is_display, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.is_display = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_display_desk_reach_max_capacity"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_display_desk_reach_max_capacity()
    {
        let tb = {
    	    result : 0,
    	    total : 0,
    	    desk_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_display_desk_reach_max_capacity"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.desk_list.length, buf);
        		for (let i = 0; i < tb.desk_list.length; ++i)
				{
            		tb.desk_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let desk_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < desk_list_len; ++i)
				{
            		let tmp = desk_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.desk_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_display_desk_reach_max_capacity"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_join_desk()
    {
        let tb = {
    	    desk_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_join_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.desk_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.desk_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_join_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_join_desk()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_join_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_join_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_joined_dest_list()
    {
        let tb = {
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_joined_dest_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_joined_dest_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_joined_dest_list()
    {
        let tb = {
    	    total : 0,
    	    desk_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_joined_dest_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.desk_list.length, buf);
        		for (let i = 0; i < tb.desk_list.length; ++i)
				{
            		tb.desk_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let desk_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < desk_list_len; ++i)
				{
            		let tmp = desk_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.desk_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_joined_dest_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_quick_start_game()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_quick_start_game"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_quick_start_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_quick_start_game()
    {
        let tb = {
    	    result : 0,
    	    room_id : 0,
    	    official_game_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_quick_start_game"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
        		EncodeUtils.uInt16ToByte(tb.official_game_list.length, buf);
        		for (let i = 0; i < tb.official_game_list.length; ++i)
				{
            		tb.official_game_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let official_game_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < official_game_list_len; ++i)
				{
            		let tmp = club_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.official_game_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_quick_start_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_filter_desk()
    {
        let tb = {
    	    club_id : 0,
    	    game_type : 0,
    	    play_type : 0,
    	    min_buy : 0,
    	    max_buy : 0,
    	    big_blind : 0,
    	    player_count : 0,
    	    blind_count : 0,
    	    limit_bet_rule : 0,
    	    all_insurance : 0,
    	    min_carry_money : 0,
    	    min_bet : 0,
    	    win_rule : 0,
    	    page_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_filter_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.play_type, buf);
    			EncodeUtils.int64ToByte(tb.min_buy, buf);
    			EncodeUtils.int64ToByte(tb.max_buy, buf);
    			EncodeUtils.int64ToByte(tb.big_blind, buf);
    		    EncodeUtils.int32ToByte(tb.player_count, buf);
    		    EncodeUtils.int32ToByte(tb.blind_count, buf);
    		    EncodeUtils.int32ToByte(tb.limit_bet_rule, buf);
    		    EncodeUtils.int32ToByte(tb.all_insurance, buf);
    			EncodeUtils.int64ToByte(tb.min_carry_money, buf);
    			EncodeUtils.int64ToByte(tb.min_bet, buf);
    		    EncodeUtils.int32ToByte(tb.win_rule, buf);
    		    EncodeUtils.int32ToByte(tb.page_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.play_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.min_buy = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.max_buy = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.big_blind = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.player_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.blind_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.limit_bet_rule = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.all_insurance = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.min_carry_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.win_rule = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_filter_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_filter_desk()
    {
        let tb = {
    	    total_page : 0,
    	    room_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_filter_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.room_list.length, buf);
        		for (let i = 0; i < tb.room_list.length; ++i)
				{
            		tb.room_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let room_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < room_list_len; ++i)
				{
            		let tmp = room_config();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.room_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_filter_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_search_club()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_search_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_search_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_search_club()
    {
        let tb = {
    	    club_info : club_info_record(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_search_club"];
    		},
		    encode:function(buf)
		    {
        		tb.club_info.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.club_info.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_search_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_join_club()
    {
        let tb = {
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_join_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_join_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_join_club()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_join_club"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_join_club"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_unapproved_list()
    {
        let tb = {
    	    page : 0,
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_unapproved_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_unapproved_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_unapproved_list()
    {
        let tb = {
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_unapproved_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = member_state();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_unapproved_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_approved_list()
    {
        let tb = {
    	    page : 0,
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_approved_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_approved_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_approved_list()
    {
        let tb = {
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_approved_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = member_state();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_approved_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_approve()
    {
        let tb = {
    	    role_id : 0,
    	    club_id : 0,
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_approve"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_approve"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_club_operate()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_club_operate"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_club_operate"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_member()
    {
        let tb = {
    	    page : 0,
    	    club_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_member"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_member"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function member_turnover()
    {
        let tb = {
    	    role_id : 0,
    	    username : '',
    	    turnover : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_member_turnover"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    			EncodeUtils.int64ToByte(tb.turnover, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.turnover = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_member_turnover"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_club_member()
    {
        let tb = {
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_club_member"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = member_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_club_member"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_kickout()
    {
        let tb = {
    	    club_id : 0,
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_kickout"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_kickout"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_modify()
    {
        let tb = {
    	    club_id : 0,
    	    name : '',
    	    details : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_modify"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.details, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let details_value = EncodeUtils.byteToString(buf, startIndex);
				tb.details = details_value[0];
 				startIndex += details_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_modify"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_game()
    {
        let tb = {
    	    club_id : 0,
    	    page : 0,
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_game"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function room_info()
    {
        let tb = {
    	    type : 0,
    	    status : 0,
    	    table_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_room_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    		    EncodeUtils.int32ToByte(tb.table_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.table_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_room_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_club_game()
    {
        let tb = {
    	    total : 0,
    	    tables : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_club_game"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.tables.length, buf);
        		for (let i = 0; i < tb.tables.length; ++i)
				{
            		tb.tables[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let tables_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < tables_len; ++i)
				{
            		let tmp = room_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.tables.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_club_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_club_manage_game()
    {
        let tb = {
    	    table_id : 0,
    	    club_id : 0,
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_club_manage_game"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.table_id, buf);
    		    EncodeUtils.int32ToByte(tb.club_id, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.table_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.club_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_club_manage_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_resource_upload_url()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_resource_upload_url"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_resource_upload_url"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_resource_upload_url()
    {
        let tb = {
    	    upload_url : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_resource_upload_url"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.upload_url, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let upload_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.upload_url = upload_url_value[0];
 				startIndex += upload_url_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_resource_upload_url"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function web_game_info()
    {
        let tb = {
    	    game_type : 0,
    	    game_name : '',
    	    game_icon : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_web_game_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.game_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.game_icon, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let game_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.game_name = game_name_value[0];
 				startIndex += game_name_value[1];
				let game_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.game_icon = game_icon_value[0];
 				startIndex += game_icon_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_web_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_search_game()
    {
        let tb = {
    	    game_name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_search_game"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.game_name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let game_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.game_name = game_name_value[0];
 				startIndex += game_name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_search_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_search_game()
    {
        let tb = {
    	    game_info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_search_game"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.game_info.length, buf);
        		for (let i = 0; i < tb.game_info.length; ++i)
				{
            		tb.game_info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let game_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < game_info_len; ++i)
				{
            		let tmp = web_game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.game_info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_search_game"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tournament_info()
    {
        let tb = {
    	    room_id : 0,
    	    tournm_name : '',
    	    tournm_logo : '',
    	    game_type : 0,
    	    apply_count : 0,
    	    need_chip : 0,
    	    begin_time : stime(),
    	    end_time : stime(),
    	    tournm_state : 0,
    	    countdown : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tournament_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.tournm_name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.tournm_logo, buf);
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.apply_count, buf);
    			EncodeUtils.int64ToByte(tb.need_chip, buf);
        		tb.begin_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.tournm_state, buf);
    		    EncodeUtils.int32ToByte(tb.countdown, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tournm_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tournm_name = tournm_name_value[0];
 				startIndex += tournm_name_value[1];
				let tournm_logo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tournm_logo = tournm_logo_value[0];
 				startIndex += tournm_logo_value[1];
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.apply_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.need_chip = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		startIndex += tb.begin_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.tournm_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.countdown = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tournament_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tournament_rankings()
    {
        let tb = {
    	    ranking : 0,
    	    username : '',
    	    points : 0,
    	    bonus : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tournament_rankings"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.ranking, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    			EncodeUtils.int64ToByte(tb.points, buf);
    			EncodeUtils.int64ToByte(tb.bonus, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.ranking = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.points = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.bonus = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tournament_rankings"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tournament_blind()
    {
        let tb = {
    	    level : 0,
    	    big_blind : 0,
    	    front_bet : 0,
    	    points : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tournament_blind"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.level, buf);
    			EncodeUtils.int64ToByte(tb.big_blind, buf);
    			EncodeUtils.int64ToByte(tb.front_bet, buf);
    			EncodeUtils.int64ToByte(tb.points, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.level = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.big_blind = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.front_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.points = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tournament_blind"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_events_list()
    {
        let tb = {
    	    game_type : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_events_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_events_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_events_list()
    {
        let tb = {
    	    total_page : 0,
    	    tournm_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_events_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.tournm_list.length, buf);
        		for (let i = 0; i < tb.tournm_list.length; ++i)
				{
            		tb.tournm_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let tournm_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < tournm_list_len; ++i)
				{
            		let tmp = tournament_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.tournm_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_events_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_events_share()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_events_share"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_events_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_events_share()
    {
        let tb = {
    	    room_id : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_events_share"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_events_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_introduction()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_introduction"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_introduction"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_introduction()
    {
        let tb = {
    	    introduction : '',
    	    detail : '',
    	    rule : '',
    	    applyway : '',
    	    banner : '',
    	    tournament_state : 0,
    	    downcount : 0,
    	    bonus_detail : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_introduction"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.introduction, buf);
    			EncodeUtils.utf8StrtoBytes(tb.detail, buf);
    			EncodeUtils.utf8StrtoBytes(tb.rule, buf);
    			EncodeUtils.utf8StrtoBytes(tb.applyway, buf);
    			EncodeUtils.utf8StrtoBytes(tb.banner, buf);
    		    EncodeUtils.int32ToByte(tb.tournament_state, buf);
    		    EncodeUtils.int32ToByte(tb.downcount, buf);
    			EncodeUtils.utf8StrtoBytes(tb.bonus_detail, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let introduction_value = EncodeUtils.byteToString(buf, startIndex);
				tb.introduction = introduction_value[0];
 				startIndex += introduction_value[1];
				let detail_value = EncodeUtils.byteToString(buf, startIndex);
				tb.detail = detail_value[0];
 				startIndex += detail_value[1];
				let rule_value = EncodeUtils.byteToString(buf, startIndex);
				tb.rule = rule_value[0];
 				startIndex += rule_value[1];
				let applyway_value = EncodeUtils.byteToString(buf, startIndex);
				tb.applyway = applyway_value[0];
 				startIndex += applyway_value[1];
				let banner_value = EncodeUtils.byteToString(buf, startIndex);
				tb.banner = banner_value[0];
 				startIndex += banner_value[1];
        		tb.tournament_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.downcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let bonus_detail_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bonus_detail = bonus_detail_value[0];
 				startIndex += bonus_detail_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_introduction"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_bonus()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_bonus"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_bonus"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_bonus()
    {
        let tb = {
    	    bonus_detail : '',
    	    tournament_state : 0,
    	    downcount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_bonus"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.bonus_detail, buf);
    		    EncodeUtils.int32ToByte(tb.tournament_state, buf);
    		    EncodeUtils.int32ToByte(tb.downcount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let bonus_detail_value = EncodeUtils.byteToString(buf, startIndex);
				tb.bonus_detail = bonus_detail_value[0];
 				startIndex += bonus_detail_value[1];
        		tb.tournament_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.downcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_bonus"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_desk()
    {
        let tb = {
    	    room_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_desk()
    {
        let tb = {
    	    tournament_state : 0,
    	    downcount : 0,
    	    player_count : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_desk"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.tournament_state, buf);
    		    EncodeUtils.int32ToByte(tb.downcount, buf);
    		    EncodeUtils.int32ToByte(tb.player_count, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.tournament_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.downcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.player_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_desk"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_rankings()
    {
        let tb = {
    	    room_id : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_rankings"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_rankings"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_rankings()
    {
        let tb = {
    	    total_page : 0,
    	    ranking_info : [],
    	    tournament_state : 0,
    	    downcount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_rankings"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.ranking_info.length, buf);
        		for (let i = 0; i < tb.ranking_info.length; ++i)
				{
            		tb.ranking_info[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.tournament_state, buf);
    		    EncodeUtils.int32ToByte(tb.downcount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let ranking_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < ranking_info_len; ++i)
				{
            		let tmp = tournament_rankings();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.ranking_info.push(tmp);
        		}
        		tb.tournament_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.downcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_rankings"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_blind()
    {
        let tb = {
    	    room_id : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_blind"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.room_id, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.room_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_blind"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_blind()
    {
        let tb = {
    	    total_page : 0,
    	    blind_info : [],
    	    tournament_state : 0,
    	    downcount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_blind"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.blind_info.length, buf);
        		for (let i = 0; i < tb.blind_info.length; ++i)
				{
            		tb.blind_info[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.tournament_state, buf);
    		    EncodeUtils.int32ToByte(tb.downcount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let blind_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < blind_info_len; ++i)
				{
            		let tmp = tournament_blind();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.blind_info.push(tmp);
        		}
        		tb.tournament_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.downcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_blind"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_filter_tournament()
    {
        let tb = {
    	    game_type : 0,
    	    start_time : stime(),
    	    end_time : stime(),
    	    tournament_type : 0,
    	    page_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_filter_tournament"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_type, buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.tournament_type, buf);
    		    EncodeUtils.int32ToByte(tb.page_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.tournament_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_filter_tournament"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_filter_tournament()
    {
        let tb = {
    	    total_page : 0,
    	    tournm_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_filter_tournament"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_page, buf);
        		EncodeUtils.uInt16ToByte(tb.tournm_list.length, buf);
        		for (let i = 0; i < tb.tournm_list.length; ++i)
				{
            		tb.tournm_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let tournm_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < tournm_list_len; ++i)
				{
            		let tmp = tournament_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.tournm_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_filter_tournament"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tournament_events_gametype_list()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tournament_events_gametype_list"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tournament_events_gametype_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tournament_events_gametype_list()
    {
        let tb = {
    	    gametype_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tournament_events_gametype_list"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.gametype_list.length, buf);
       			for (let i = 0; i < tb.gametype_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.gametype_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let gametype_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gametype_list_len; ++i)
		 		{
             		tb.gametype_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tournament_events_gametype_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function minigame_chat_item()
    {
        let tb = {
    	    id : 0,
    	    role_id : 0,
    	    viplevel : 0,
    	    nickname : '',
    	    content : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_minigame_chat_item"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.viplevel, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_minigame_chat_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_minigame_chat()
    {
        let tb = {
    	    content : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_minigame_chat"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
 				startIndex += content_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_minigame_chat"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_minigame_chat()
    {
        let tb = {
    	    id : 0,
    	    role_id : 0,
    	    viplevel : 0,
    	    nickname : '',
    	    content : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_minigame_chat"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.id, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.viplevel, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_minigame_chat"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_minigame_chat_record()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_minigame_chat_record"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_minigame_chat_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_minigame_chat_record()
    {
        let tb = {
    	    chat_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_minigame_chat_record"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.chat_item.length, buf);
        		for (let i = 0; i < tb.chat_item.length; ++i)
				{
            		tb.chat_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let chat_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < chat_item_len; ++i)
				{
            		let tmp = minigame_chat_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.chat_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_minigame_chat_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_recent_games()
    {
        let tb = {
    	    platform : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_recent_games"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.platform, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.platform = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_recent_games"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_recent_games()
    {
        let tb = {
    	    gameId : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_recent_games"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.gameId.length, buf);
       			for (let i = 0; i < tb.gameId.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.gameId[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let gameId_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gameId_len; ++i)
		 		{
					let gameId_value = EncodeUtils.byteToString(buf, startIndex);
					tb.gameId.push(gameId_value[0]);
					startIndex += gameId_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_recent_games"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_discount_details()
    {
        let tb = {
    	    activity_ID : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_discount_details"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.activity_ID, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.activity_ID = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_discount_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_discount_details()
    {
        let tb = {
    	    details : recharge_discount(),
    	    extra : [],
    	    start_time : stime(),
    	    end_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_discount_details"];
    		},
		    encode:function(buf)
		    {
        		tb.details.encode(buf);
       			EncodeUtils.uInt16ToByte(tb.extra.length, buf);
       			for (let i = 0; i < tb.extra.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.extra[i], buf);
       			}
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.details.decode(buf, startIndex);
        		let extra_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < extra_len; ++i)
		 		{
             		tb.extra.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_discount_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_my_recharge_discount()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_my_recharge_discount"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_my_recharge_discount"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function my_recharge_discount()
    {
        let tb = {
    	    id : 0,
    	    tag : '',
    	    name : '',
    	    content : '',
    	    details : '',
    	    bonus : 0,
    	    status : 0,
    	    bind_card : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_my_recharge_discount"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.tag, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.content, buf);
    			EncodeUtils.utf8StrtoBytes(tb.details, buf);
    			EncodeUtils.int64ToByte(tb.bonus, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    		    EncodeUtils.int32ToByte(tb.bind_card, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let tag_value = EncodeUtils.byteToString(buf, startIndex);
				tb.tag = tag_value[0];
 				startIndex += tag_value[1];
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let content_value = EncodeUtils.byteToString(buf, startIndex);
				tb.content = content_value[0];
 				startIndex += content_value[1];
				let details_value = EncodeUtils.byteToString(buf, startIndex);
				tb.details = details_value[0];
 				startIndex += details_value[1];
        		tb.bonus = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bind_card = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_my_recharge_discount"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_my_recharge_discount()
    {
        let tb = {
    	    dis : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_my_recharge_discount"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.dis.length, buf);
        		for (let i = 0; i < tb.dis.length; ++i)
				{
            		tb.dis[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let dis_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dis_len; ++i)
				{
            		let tmp = my_recharge_discount();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.dis.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_my_recharge_discount"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_numbers_betting_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_numbers_betting_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_numbers_betting_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function latest_record()
    {
        let tb = {
    	    role_id : 0,
    	    username : '',
    	    numbers : 0,
    	    ranking : 0,
    	    bet_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_latest_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.numbers, buf);
    		    EncodeUtils.int32ToByte(tb.ranking, buf);
        		tb.bet_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.numbers = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ranking = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.bet_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_latest_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function his_record()
    {
        let tb = {
    	    role_id : 0,
    	    username : '',
    	    numbers : 0,
    	    ranking : 0,
    	    prize : 0,
    	    roundid : 0,
    	    status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_his_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.numbers, buf);
    		    EncodeUtils.int32ToByte(tb.ranking, buf);
    		    EncodeUtils.int32ToByte(tb.prize, buf);
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.numbers = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ranking = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_his_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function reward_cfg()
    {
        let tb = {
    	    ranking : '',
    	    prize : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_reward_cfg"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.ranking, buf);
    		    EncodeUtils.int32ToByte(tb.prize, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let ranking_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ranking = ranking_value[0];
 				startIndex += ranking_value[1];
        		tb.prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_reward_cfg"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_numbers_betting_info()
    {
        let tb = {
    	    qualified : 0,
    	    roundid : 0,
    	    result : 0,
    	    status : 0,
    	    joined : 0,
    	    set_fb : 0,
    	    numbers : 0,
    	    cur_time : stime(),
    	    open_time : stime(),
    	    start_time : stime(),
    	    end_time : stime(),
    	    share_url : '',
    	    share_words : '',
    	    reason : '',
    	    prize_cfg : [],
    	    my_records : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_numbers_betting_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.qualified, buf);
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    		    EncodeUtils.int32ToByte(tb.joined, buf);
    		    EncodeUtils.int32ToByte(tb.set_fb, buf);
    		    EncodeUtils.int32ToByte(tb.numbers, buf);
        		tb.cur_time.encode(buf);
        		tb.open_time.encode(buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.share_url, buf);
    			EncodeUtils.utf8StrtoBytes(tb.share_words, buf);
    			EncodeUtils.utf8StrtoBytes(tb.reason, buf);
        		EncodeUtils.uInt16ToByte(tb.prize_cfg.length, buf);
        		for (let i = 0; i < tb.prize_cfg.length; ++i)
				{
            		tb.prize_cfg[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.my_records.length, buf);
        		for (let i = 0; i < tb.my_records.length; ++i)
				{
            		tb.my_records[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.qualified = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.joined = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.set_fb = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.numbers = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.cur_time.decode(buf, startIndex);
        		startIndex += tb.open_time.decode(buf, startIndex);
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				let share_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.share_url = share_url_value[0];
 				startIndex += share_url_value[1];
				let share_words_value = EncodeUtils.byteToString(buf, startIndex);
				tb.share_words = share_words_value[0];
 				startIndex += share_words_value[1];
				let reason_value = EncodeUtils.byteToString(buf, startIndex);
				tb.reason = reason_value[0];
 				startIndex += reason_value[1];
        		let prize_cfg_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < prize_cfg_len; ++i)
				{
            		let tmp = reward_cfg();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.prize_cfg.push(tmp);
        		}
        		let my_records_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < my_records_len; ++i)
				{
            		let tmp = his_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.my_records.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_numbers_betting_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_numbers_record_details()
    {
        let tb = {
    	    roundid : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_numbers_record_details"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_numbers_record_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_numbers_record_details()
    {
        let tb = {
    	    total : 0,
    	    my_records : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_numbers_record_details"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.my_records.length, buf);
        		for (let i = 0; i < tb.my_records.length; ++i)
				{
            		tb.my_records[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let my_records_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < my_records_len; ++i)
				{
            		let tmp = latest_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.my_records.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_numbers_record_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_numbers_betting_rank()
    {
        let tb = {
    	    roundid : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_numbers_betting_rank"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_numbers_betting_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_numbers_betting_rank()
    {
        let tb = {
    	    total : 0,
    	    pos : 0,
    	    my_records : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_numbers_betting_rank"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
    		    EncodeUtils.int32ToByte(tb.pos, buf);
        		EncodeUtils.uInt16ToByte(tb.my_records.length, buf);
        		for (let i = 0; i < tb.my_records.length; ++i)
				{
            		tb.my_records[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let my_records_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < my_records_len; ++i)
				{
            		let tmp = his_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.my_records.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_numbers_betting_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_start_betting()
    {
        let tb = {
    	    numbers : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_start_betting"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.numbers, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.numbers = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_start_betting"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_start_betting()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_start_betting"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_start_betting"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_numbers_betting_share()
    {
        let tb = {
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_numbers_betting_share"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_numbers_betting_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_numbers_betting_share()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_numbers_betting_share"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_numbers_betting_share"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_set_fb_homepage()
    {
        let tb = {
    	    home : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_set_fb_homepage"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.home, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let home_value = EncodeUtils.byteToString(buf, startIndex);
				tb.home = home_value[0];
 				startIndex += home_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_set_fb_homepage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_set_fb_homepage()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_set_fb_homepage"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_set_fb_homepage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_numbers_betting_claim_bonus()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_numbers_betting_claim_bonus"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_numbers_betting_claim_bonus"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_numbers_betting_claim_bonus()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_numbers_betting_claim_bonus"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_numbers_betting_claim_bonus"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function game_info()
    {
        let tb = {
    	    gameId : '',
    	    ismMintain : 0,
    	    direction : 0,
    	    name : '',
    	    gamePictureH5 : '',
    	    gamePicturePC : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_game_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
    		    EncodeUtils.int32ToByte(tb.ismMintain, buf);
    		    EncodeUtils.int32ToByte(tb.direction, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    			EncodeUtils.utf8StrtoBytes(tb.gamePictureH5, buf);
    			EncodeUtils.utf8StrtoBytes(tb.gamePicturePC, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let gameId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameId = gameId_value[0];
 				startIndex += gameId_value[1];
        		tb.ismMintain = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.direction = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				let gamePictureH5_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gamePictureH5 = gamePictureH5_value[0];
 				startIndex += gamePictureH5_value[1];
				let gamePicturePC_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gamePicturePC = gamePicturePC_value[0];
 				startIndex += gamePicturePC_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_games_in_platform()
    {
        let tb = {
    	    agentId : 0,
    	    kindId : 0,
    	    page : 0,
    	    pageSize : 0,
    	    lableId : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_games_in_platform"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    		    EncodeUtils.int32ToByte(tb.kindId, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.pageSize, buf);
    		    EncodeUtils.int32ToByte(tb.lableId, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.kindId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.pageSize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.lableId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_games_in_platform"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_games_in_platform()
    {
        let tb = {
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_games_in_platform"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_games_in_platform"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_get_kind_in_platform()
    {
        let tb = {
    	    agentId : 0,
    	    kindId : 0,
    	    pageSize : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_get_kind_in_platform"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    		    EncodeUtils.int32ToByte(tb.kindId, buf);
    		    EncodeUtils.int32ToByte(tb.pageSize, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.kindId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.pageSize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_get_kind_in_platform"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function game_kind_info()
    {
        let tb = {
    	    kindId : 0,
    	    kind_name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_game_kind_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.kindId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.kind_name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.kindId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let kind_name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.kind_name = kind_name_value[0];
 				startIndex += kind_name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_game_kind_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_get_kind_in_platform()
    {
        let tb = {
    	    total : 0,
    	    info : [],
    	    label : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_get_kind_in_platform"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.label.length, buf);
        		for (let i = 0; i < tb.label.length; ++i)
				{
            		tb.label[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
        		let label_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < label_len; ++i)
				{
            		let tmp = game_kind_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.label.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_get_kind_in_platform"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_look_for_game_name()
    {
        let tb = {
    	    agentId : 0,
    	    kindId : 0,
    	    name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_look_for_game_name"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    		    EncodeUtils.int32ToByte(tb.kindId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.kindId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_look_for_game_name"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_look_for_game_name()
    {
        let tb = {
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_look_for_game_name"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = game_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_look_for_game_name"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_all_collected()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_all_collected"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_all_collected"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_all_collected()
    {
        let tb = {
    	    collected : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_all_collected"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.collected.length, buf);
       			for (let i = 0; i < tb.collected.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.collected[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let collected_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < collected_len; ++i)
		 		{
					let collected_value = EncodeUtils.byteToString(buf, startIndex);
					tb.collected.push(collected_value[0]);
					startIndex += collected_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_all_collected"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function prize_info()
    {
        let tb = {
    	    ranking : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_prize_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.ranking, buf);
    		    EncodeUtils.int32ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.ranking = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_prize_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function video_info()
    {
        let tb = {
    	    num_likes : 0,
    	    video_id : 0,
    	    voted : 0,
    	    uploader : '',
    	    upload_time : stime(),
    	    name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_video_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.num_likes, buf);
    		    EncodeUtils.int32ToByte(tb.video_id, buf);
    		    EncodeUtils.int32ToByte(tb.voted, buf);
    			EncodeUtils.utf8StrtoBytes(tb.uploader, buf);
        		tb.upload_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.num_likes = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.video_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.voted = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let uploader_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uploader = uploader_value[0];
 				startIndex += uploader_value[1];
        		startIndex += tb.upload_time.decode(buf, startIndex);
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_video_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_share_vote_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_share_vote_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_share_vote_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_share_vote_info()
    {
        let tb = {
    	    vote_prize : 0,
    	    join_prize : [],
    	    rank_prize : [],
    	    marquee : [],
    	    num_likes : 0,
    	    can_vote : 0,
    	    got_amount : 0,
    	    ready_amount : 0,
    	    cur_time : stime(),
    	    start_time : stime(),
    	    end_time : stime(),
    	    share_url : '',
    	    vote_flag : 0,
    	    join_flag : 0,
    	    rank_flag : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_share_vote_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.vote_prize, buf);
        		EncodeUtils.uInt16ToByte(tb.join_prize.length, buf);
        		for (let i = 0; i < tb.join_prize.length; ++i)
				{
            		tb.join_prize[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.rank_prize.length, buf);
        		for (let i = 0; i < tb.rank_prize.length; ++i)
				{
            		tb.rank_prize[i].encode(buf);
	     		}
       			EncodeUtils.uInt16ToByte(tb.marquee.length, buf);
       			for (let i = 0; i < tb.marquee.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.marquee[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.num_likes, buf);
    		    EncodeUtils.int32ToByte(tb.can_vote, buf);
    		    EncodeUtils.int32ToByte(tb.got_amount, buf);
    		    EncodeUtils.int32ToByte(tb.ready_amount, buf);
        		tb.cur_time.encode(buf);
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.share_url, buf);
    		    EncodeUtils.int32ToByte(tb.vote_flag, buf);
    		    EncodeUtils.int32ToByte(tb.join_flag, buf);
    		    EncodeUtils.int32ToByte(tb.rank_flag, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.vote_prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let join_prize_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < join_prize_len; ++i)
				{
            		let tmp = prize_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.join_prize.push(tmp);
        		}
        		let rank_prize_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_prize_len; ++i)
				{
            		let tmp = prize_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_prize.push(tmp);
        		}
        		let marquee_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < marquee_len; ++i)
		 		{
					let marquee_value = EncodeUtils.byteToString(buf, startIndex);
					tb.marquee.push(marquee_value[0]);
					startIndex += marquee_value[1];
        		}
        		tb.num_likes = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.can_vote = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.got_amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ready_amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.cur_time.decode(buf, startIndex);
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				let share_url_value = EncodeUtils.byteToString(buf, startIndex);
				tb.share_url = share_url_value[0];
 				startIndex += share_url_value[1];
        		tb.vote_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.join_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rank_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_share_vote_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_share_vote_reward_details()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_share_vote_reward_details"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_share_vote_reward_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_share_vote_reward_details()
    {
        let tb = {
    	    got_vote_money : 0,
    	    got_join_money : 0,
    	    got_rank_money : 0,
    	    ready_vote_money : 0,
    	    ready_join_money : 0,
    	    ready_rank_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_share_vote_reward_details"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.got_vote_money, buf);
    		    EncodeUtils.int32ToByte(tb.got_join_money, buf);
    		    EncodeUtils.int32ToByte(tb.got_rank_money, buf);
    		    EncodeUtils.int32ToByte(tb.ready_vote_money, buf);
    		    EncodeUtils.int32ToByte(tb.ready_join_money, buf);
    		    EncodeUtils.int32ToByte(tb.ready_rank_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.got_vote_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.got_join_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.got_rank_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ready_vote_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ready_join_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.ready_rank_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_share_vote_reward_details"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_ranking_videos()
    {
        let tb = {
    	    roundid : 0,
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_ranking_videos"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_ranking_videos"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_ranking_videos()
    {
        let tb = {
    	    page : 0,
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_ranking_videos"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = video_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_ranking_videos"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_my_shared_videos()
    {
        let tb = {
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_my_shared_videos"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_my_shared_videos"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function my_video_info()
    {
        let tb = {
    	    roundid : 0,
    	    num_likes : 0,
    	    video_id : 0,
    	    status : 0,
    	    uploader : '',
    	    upload_time : stime(),
    	    name : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_my_video_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.num_likes, buf);
    		    EncodeUtils.int32ToByte(tb.video_id, buf);
    		    EncodeUtils.int32ToByte(tb.status, buf);
    			EncodeUtils.utf8StrtoBytes(tb.uploader, buf);
        		tb.upload_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.name, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.num_likes = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.video_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let uploader_value = EncodeUtils.byteToString(buf, startIndex);
				tb.uploader = uploader_value[0];
 				startIndex += uploader_value[1];
        		startIndex += tb.upload_time.decode(buf, startIndex);
				let name_value = EncodeUtils.byteToString(buf, startIndex);
				tb.name = name_value[0];
 				startIndex += name_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_my_video_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function my_one_round()
    {
        let tb = {
    	    roundid : 0,
    	    got_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_my_one_round"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.got_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.got_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_my_one_round"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_my_shared_videos()
    {
        let tb = {
    	    page : 0,
    	    total : 0,
    	    videos : [],
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_my_shared_videos"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.videos.length, buf);
        		for (let i = 0; i < tb.videos.length; ++i)
				{
            		tb.videos[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let videos_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < videos_len; ++i)
				{
            		let tmp = my_video_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.videos.push(tmp);
        		}
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = my_one_round();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_my_shared_videos"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_num_likes_ranking_info()
    {
        let tb = {
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_num_likes_ranking_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_num_likes_ranking_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function num_likes_info()
    {
        let tb = {
    	    username : '',
    	    num_likes : 0,
    	    prize : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_num_likes_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    		    EncodeUtils.int32ToByte(tb.num_likes, buf);
    		    EncodeUtils.int32ToByte(tb.prize, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.num_likes = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.prize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_num_likes_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_num_likes_ranking_info()
    {
        let tb = {
    	    page : 0,
    	    total : 0,
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_num_likes_ranking_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.total, buf);
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = num_likes_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_num_likes_ranking_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_like_a_video()
    {
        let tb = {
    	    video_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_like_a_video"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.video_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.video_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_like_a_video"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_like_a_video()
    {
        let tb = {
    	    rlt : 0,
    	    video_id : 0,
    	    amount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_like_a_video"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    		    EncodeUtils.int32ToByte(tb.video_id, buf);
    		    EncodeUtils.int32ToByte(tb.amount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.video_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_like_a_video"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_claim_share_vote_prize()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_claim_share_vote_prize"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_claim_share_vote_prize"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_claim_share_vote_prize()
    {
        let tb = {
    	    rlt : 0,
    	    amount : 0,
    	    vote_flag : 0,
    	    join_flag : 0,
    	    rank_flag : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_claim_share_vote_prize"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    		    EncodeUtils.int32ToByte(tb.amount, buf);
    		    EncodeUtils.int32ToByte(tb.vote_flag, buf);
    		    EncodeUtils.int32ToByte(tb.join_flag, buf);
    		    EncodeUtils.int32ToByte(tb.rank_flag, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.amount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.vote_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.join_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rank_flag = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_claim_share_vote_prize"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_marquee_update()
    {
        let tb = {
    	    type : 0,
    	    total_like_num : 0,
    	    username : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_marquee_update"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.type, buf);
    		    EncodeUtils.int32ToByte(tb.total_like_num, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total_like_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_marquee_update"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_free_treasure_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_free_treasure_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_free_treasure_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function gameInfo()
    {
        let tb = {
    	    gameId : 0,
    	    roomId : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_gameInfo"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.gameId, buf);
    		    EncodeUtils.int32ToByte(tb.roomId, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.gameId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.roomId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_gameInfo"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_free_treasure_info()
    {
        let tb = {
    	    qualified : 0,
    	    rank : 0,
    	    winner_num : 0,
    	    score : 0,
    	    gameIds : [],
    	    start_time : stime(),
    	    end_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_free_treasure_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.qualified, buf);
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    		    EncodeUtils.int32ToByte(tb.winner_num, buf);
    			EncodeUtils.int64ToByte(tb.score, buf);
        		EncodeUtils.uInt16ToByte(tb.gameIds.length, buf);
        		for (let i = 0; i < tb.gameIds.length; ++i)
				{
            		tb.gameIds[i].encode(buf);
	     		}
        		tb.start_time.encode(buf);
        		tb.end_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.qualified = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.winner_num = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let gameIds_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gameIds_len; ++i)
				{
            		let tmp = gameInfo();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gameIds.push(tmp);
        		}
        		startIndex += tb.start_time.decode(buf, startIndex);
        		startIndex += tb.end_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_free_treasure_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_free_treasure_his()
    {
        let tb = {
    	    roundid : 0,
    	    page : 0,
    	    pageSize : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_free_treasure_his"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.roundid, buf);
    		    EncodeUtils.int32ToByte(tb.page, buf);
    		    EncodeUtils.int32ToByte(tb.pageSize, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.roundid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.pageSize = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_free_treasure_his"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function free_treasure_rank_data()
    {
        let tb = {
    	    rank : 0,
    	    role_id : 0,
    	    head_icon : '',
    	    username : '',
    	    score : 0,
    	    reward : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_free_treasure_rank_data"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_icon, buf);
    			EncodeUtils.utf8StrtoBytes(tb.username, buf);
    			EncodeUtils.int64ToByte(tb.score, buf);
    			EncodeUtils.int64ToByte(tb.reward, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rank = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let head_icon_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_icon = head_icon_value[0];
 				startIndex += head_icon_value[1];
				let username_value = EncodeUtils.byteToString(buf, startIndex);
				tb.username = username_value[0];
 				startIndex += username_value[1];
        		tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.reward = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_free_treasure_rank_data"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_free_treasure_his()
    {
        let tb = {
    	    info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_free_treasure_his"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.info.length, buf);
        		for (let i = 0; i < tb.info.length; ++i)
				{
            		tb.info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < info_len; ++i)
				{
            		let tmp = free_treasure_rank_data();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_free_treasure_his"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function login_record()
    {
        let tb = {
    	    login_type : 0,
    	    ip : '',
    	    device_model : 0,
    	    login_time : stime(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_login_record"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.login_type, buf);
    			EncodeUtils.utf8StrtoBytes(tb.ip, buf);
    		    EncodeUtils.int32ToByte(tb.device_model, buf);
        		tb.login_time.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.login_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
 				startIndex += ip_value[1];
        		tb.device_model = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.login_time.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_login_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_login_record_list()
    {
        let tb = {
    	    page : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_login_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.page, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.page = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_login_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_login_record_list()
    {
        let tb = {
    	    total_pages : 0,
    	    login_record_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_login_record_list"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total_pages, buf);
        		EncodeUtils.uInt16ToByte(tb.login_record_list.length, buf);
        		for (let i = 0; i < tb.login_record_list.length; ++i)
				{
            		tb.login_record_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total_pages = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let login_record_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < login_record_list_len; ++i)
				{
            		let tmp = login_record();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.login_record_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_login_record_list"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_offline_notification()
    {
        let tb = {
    	    login_time : stime(),
    	    device_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_offline_notification"];
    		},
		    encode:function(buf)
		    {
        		tb.login_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.device_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.login_time.decode(buf, startIndex);
        		tb.device_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_offline_notification"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_diff_loc_login_notification()
    {
        let tb = {
    	    login_time : stime(),
    	    ip : '',
    	    device_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_diff_loc_login_notification"];
    		},
		    encode:function(buf)
		    {
        		tb.login_time.encode(buf);
    			EncodeUtils.utf8StrtoBytes(tb.ip, buf);
    		    EncodeUtils.int32ToByte(tb.device_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.login_time.decode(buf, startIndex);
				let ip_value = EncodeUtils.byteToString(buf, startIndex);
				tb.ip = ip_value[0];
 				startIndex += ip_value[1];
        		tb.device_id = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_diff_loc_login_notification"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_modify_collect()
    {
        let tb = {
    	    agentId : 0,
    	    gameId : '',
    	    type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_modify_collect"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agentId, buf);
    			EncodeUtils.utf8StrtoBytes(tb.gameId, buf);
    		    EncodeUtils.int32ToByte(tb.type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agentId = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let gameId_value = EncodeUtils.byteToString(buf, startIndex);
				tb.gameId = gameId_value[0];
 				startIndex += gameId_value[1];
        		tb.type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_modify_collect"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_modify_collect()
    {
        let tb = {
    	    rlt : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_modify_collect"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rlt, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.rlt = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_modify_collect"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_slots_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_slots_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_slots_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_slots_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_slots_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_slots_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function msg_kv()
    {
        let tb = {
    	    key : '',
    	    val : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_msg_kv"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.key, buf);
       			EncodeUtils.uInt16ToByte(tb.val.length, buf);
       			for (let i = 0; i < tb.val.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.val[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let key_value = EncodeUtils.byteToString(buf, startIndex);
				tb.key = key_value[0];
 				startIndex += key_value[1];
        		let val_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < val_len; ++i)
		 		{
             		tb.val.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_msg_kv"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function line_item()
    {
        let tb = {
    	    line : 0,
    	    pos : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_line_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
       			EncodeUtils.uInt16ToByte(tb.pos.length, buf);
       			for (let i = 0; i < tb.pos.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.pos[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < pos_len; ++i)
		 		{
             		tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_line_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    lines : [],
    	    money : 0,
    	    free_spins : 0,
    	    bonus : 0,
    	    extra_info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
        		EncodeUtils.uInt16ToByte(tb.lines.length, buf);
        		for (let i = 0; i < tb.lines.length; ++i)
				{
            		tb.lines[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.bonus, buf);
        		EncodeUtils.uInt16ToByte(tb.extra_info.length, buf);
        		for (let i = 0; i < tb.extra_info.length; ++i)
				{
            		tb.extra_info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
             		tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < lines_len; ++i)
				{
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
        		for(let i = 0; i < extra_info_len; ++i)
				{
            		let tmp = msg_kv();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.extra_info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function slots_open_box()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_slots_open_box"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_slots_open_box"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_slots_open_box()
    {
        let tb = {
    	    box_times_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_slots_open_box"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.box_times_list.length, buf);
       			for (let i = 0; i < tb.box_times_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.box_times_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let box_times_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < box_times_list_len; ++i)
		 		{
             		tb.box_times_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_slots_open_box"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jmp_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jmp_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jmp_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jmp_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jmp_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jmp_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jmp_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jmp_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jmp_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jmp_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jmp_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jmp_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_milu_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_milu_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_milu_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_milu_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_milu_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_milu_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_milu_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_milu_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_milu_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_milu_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
    	    left_free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_milu_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.left_free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_milu_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_milu2_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_milu2_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_milu2_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_milu2_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_milu2_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_milu2_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_milu2_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_milu2_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_milu2_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_milu2_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
    	    left_free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_milu2_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.left_free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_milu2_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jump_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jump_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jump_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jump_info()
    {
        let tb = {
    	    mult_list : [],
    	    min_bet : 0,
    	    game_state : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jump_info"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.mult_list.length, buf);
       			for (let i = 0; i < tb.mult_list.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.mult_list[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.min_bet, buf);
    		    EncodeUtils.int32ToByte(tb.game_state, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let mult_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < mult_list_len; ++i)
		 		{
             		tb.mult_list.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.game_state = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jump_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jump_spin()
    {
        let tb = {
    	    mult_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jump_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.mult_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jump_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jump_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    money : 0,
    	    free_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jump_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
             		tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jump_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jump_free_spin()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jump_free_spin"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jump_free_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jump_free_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    add_mult : 0,
    	    money : 0,
    	    total_money : 0,
    	    free_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jump_free_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.add_mult, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.int64ToByte(tb.total_money, buf);
    		    EncodeUtils.int32ToByte(tb.free_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jump_free_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_jump_free_detail()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_jump_free_detail"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_jump_free_detail"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_jump_free_detail_result()
    {
        let tb = {
    	    free_time : 0,
    	    mult_index : 0,
    	    total_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_jump_free_detail_result"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.free_time, buf);
    		    EncodeUtils.int32ToByte(tb.mult_index, buf);
    			EncodeUtils.int64ToByte(tb.total_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.free_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.mult_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.total_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_jump_free_detail_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_captain_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_captain_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_captain_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_captain_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_captain_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_captain_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_captain_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_captain_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_captain_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_captain_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
    	    left_free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_captain_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.left_free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_captain_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function wucaishen_line_item()
    {
        let tb = {
    	    line : 0,
    	    pos : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_wucaishen_line_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
       			EncodeUtils.uInt16ToByte(tb.pos.length, buf);
       			for (let i = 0; i < tb.pos.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.pos[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let pos_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < pos_len; ++i)
		 		{
             		tb.pos.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_wucaishen_line_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_wucaishen_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_wucaishen_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_wucaishen_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_wucaishen_info()
    {
        let tb = {
    	    line : 0,
    	    betlist : [],
    	    bet_cost : 0,
    	    item_list : [],
    	    lines : [],
    	    free_total_times : 0,
    	    free_remain_times : 0,
    	    jackpot_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_wucaishen_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
       			EncodeUtils.uInt16ToByte(tb.betlist.length, buf);
       			for (let i = 0; i < tb.betlist.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.betlist[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.bet_cost, buf);
       			EncodeUtils.uInt16ToByte(tb.item_list.length, buf);
       			for (let i = 0; i < tb.item_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.item_list[i], buf);
       			}
        		EncodeUtils.uInt16ToByte(tb.lines.length, buf);
        		for (let i = 0; i < tb.lines.length; ++i)
				{
            		tb.lines[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.free_total_times, buf);
    		    EncodeUtils.int32ToByte(tb.free_remain_times, buf);
    			EncodeUtils.int64ToByte(tb.jackpot_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let betlist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < betlist_len; ++i)
		 		{
             		tb.betlist.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.bet_cost = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let item_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < item_list_len; ++i)
		 		{
             		tb.item_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < lines_len; ++i)
				{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_wucaishen_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_wucaishen_jackpot()
    {
        let tb = {
    	    jackpot_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_wucaishen_jackpot"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.jackpot_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.jackpot_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_wucaishen_jackpot"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_wucaishen_lottery()
    {
        let tb = {
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_wucaishen_lottery"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_wucaishen_lottery"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_wucaishen_lottery_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    lines : [],
    	    money : 0,
    	    free_spins : 0,
    	    jackpot_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_wucaishen_lottery_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
        		EncodeUtils.uInt16ToByte(tb.lines.length, buf);
        		for (let i = 0; i < tb.lines.length; ++i)
				{
            		tb.lines[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    			EncodeUtils.int64ToByte(tb.jackpot_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
             		tb.symbol_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let lines_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < lines_len; ++i)
				{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_wucaishen_lottery_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_mjhl_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_mjhl_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_mjhl_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_mjhl_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_mjhl_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_mjhl_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_mjhl_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_mjhl_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_mjhl_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_mjhl_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
    	    left_free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_mjhl_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.left_free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_mjhl_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_mjhl2_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_mjhl2_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_mjhl2_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_mjhl2_info()
    {
        let tb = {
    	    singlebet : 0,
    	    bet_index : [],
    	    line : 0,
    	    free_spins : 0,
    	    locked_bet : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_mjhl2_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.singlebet, buf);
       			EncodeUtils.uInt16ToByte(tb.bet_index.length, buf);
       			for (let i = 0; i < tb.bet_index.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_index[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.locked_bet, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.singlebet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let bet_index_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_index_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_mjhl2_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_mjhl2_spin()
    {
        let tb = {
    	    line : 0,
    	    bet_index : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_mjhl2_spin"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.line, buf);
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.line = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_index = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_mjhl2_spin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_mjhl2_spin_result()
    {
        let tb = {
    	    symbol_list : [],
    	    bet_index : 0,
    	    money : 0,
    	    free_spins : 0,
    	    left_free_spins : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_mjhl2_spin_result"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.symbol_list.length, buf);
       			for (let i = 0; i < tb.symbol_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.symbol_list[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.bet_index, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.free_spins, buf);
    		    EncodeUtils.int32ToByte(tb.left_free_spins, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let symbol_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < symbol_list_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_mjhl2_spin_result"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function minigame_rank_item()
    {
        let tb = {
    	    rank : 0,
    	    nickname : '',
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_minigame_rank_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.rank, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_minigame_rank_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dice_item()
    {
        let tb = {
    	    dice_num : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dice_item"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
       			for (let i = 0; i < tb.dice_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.dice_num[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_num_len; ++i)
		 		{
             		tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dice_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_info()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    beted_money : [],
    	    dice_num : [],
    	    beted_playercount : [],
    	    self_beted_money : [],
    	    min_bet : 0,
    	    max_bet : 0,
    	    history_result : [],
    	    server_timestamp : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
       			EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
       			for (let i = 0; i < tb.beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.beted_money[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
       			for (let i = 0; i < tb.dice_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.dice_num[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
       			for (let i = 0; i < tb.beted_playercount.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
       			for (let i = 0; i < tb.self_beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.min_bet, buf);
    			EncodeUtils.int64ToByte(tb.max_bet, buf);
       			EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
       			for (let i = 0; i < tb.history_result.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.history_result[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_money_len; ++i)
		 		{
             		tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_num_len; ++i)
		 		{
             		tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_playercount_len; ++i)
		 		{
             		tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < self_beted_money_len; ++i)
		 		{
             		tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		tb.min_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_result_len; ++i)
		 		{
             		tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_stage()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    balance_result : 0,
    	    dice_num : [],
    	    money : 0,
    	    money2 : 0,
    	    cur_money : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_stage"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.balance_result, buf);
       			EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
       			for (let i = 0; i < tb.dice_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.dice_num[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.int64ToByte(tb.money2, buf);
    			EncodeUtils.int64ToByte(tb.cur_money, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_num_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_stage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bigsmall_bet()
    {
        let tb = {
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bigsmall_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bigsmall_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_self_bet()
    {
        let tb = {
    	    result : 0,
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_self_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_self_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_bet()
    {
        let tb = {
    	    money : [],
    	    bet_player_num : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_bet"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.money.length, buf);
       			for (let i = 0; i < tb.money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.money[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
       			for (let i = 0; i < tb.bet_player_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < money_len; ++i)
		 		{
             		tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_player_num_len; ++i)
		 		{
             		tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bigsmall_rank()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bigsmall_rank"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bigsmall_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_rank()
    {
        let tb = {
    	    rank_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_rank"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
        		for (let i = 0; i < tb.rank_item.length; ++i)
				{
            		tb.rank_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_item_len; ++i)
				{
            		let tmp = minigame_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bigsmall_history()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bigsmall_history"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bigsmall_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_history()
    {
        let tb = {
    	    record_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_history"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
        		for (let i = 0; i < tb.record_item.length; ++i)
				{
            		tb.record_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_item_len; ++i)
				{
            		let tmp = game_record_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_bigsmall_trendchart()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_bigsmall_trendchart"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_bigsmall_trendchart"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bigsmall_trendchart()
    {
        let tb = {
    	    history_result : [],
    	    dice_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bigsmall_trendchart"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
       			for (let i = 0; i < tb.history_result.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.history_result[i], buf);
       			}
        		EncodeUtils.uInt16ToByte(tb.dice_list.length, buf);
        		for (let i = 0; i < tb.dice_list.length; ++i)
				{
            		tb.dice_list[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_result_len; ++i)
		 		{
             		tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let dice_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_list_len; ++i)
				{
            		let tmp = dice_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.dice_list.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bigsmall_trendchart"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_bettime_bigsmall_to_all()
    {
        let tb = {
    	    end_time : stime(),
    	    end_time2 : 0,
    	    server_timestamp : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_bettime_bigsmall_to_all"];
    		},
		    encode:function(buf)
		    {
        		tb.end_time.encode(buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_bettime_bigsmall_to_all"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_info()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    beted_money : [],
    	    dice_num : [],
    	    beted_playercount : [],
    	    self_beted_money : [],
    	    min_bet : 0,
    	    max_bet : 0,
    	    history_result : [],
    	    server_timestamp : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
       			EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
       			for (let i = 0; i < tb.beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.beted_money[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
       			for (let i = 0; i < tb.dice_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.dice_num[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
       			for (let i = 0; i < tb.beted_playercount.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
       			for (let i = 0; i < tb.self_beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    			EncodeUtils.int64ToByte(tb.max_bet, buf);
       			EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
       			for (let i = 0; i < tb.history_result.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.history_result[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_money_len; ++i)
		 		{
             		tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_num_len; ++i)
		 		{
             		tb.dice_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_playercount_len; ++i)
		 		{
             		tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < self_beted_money_len; ++i)
		 		{
             		tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_result_len; ++i)
		 		{
             		tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_stage()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    balance_result : 0,
    	    dice_num : [],
    	    money : 0,
    	    money2 : 0,
    	    cur_money : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_stage"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.balance_result, buf);
       			EncodeUtils.uInt16ToByte(tb.dice_num.length, buf);
       			for (let i = 0; i < tb.dice_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.dice_num[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.int64ToByte(tb.money2, buf);
    			EncodeUtils.int64ToByte(tb.cur_money, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let dice_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < dice_num_len; ++i)
		 		{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_stage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_longhu_bet()
    {
        let tb = {
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_longhu_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_longhu_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_self_bet()
    {
        let tb = {
    	    result : 0,
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_self_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_self_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_bet()
    {
        let tb = {
    	    money : [],
    	    bet_player_num : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_bet"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.money.length, buf);
       			for (let i = 0; i < tb.money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.money[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
       			for (let i = 0; i < tb.bet_player_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < money_len; ++i)
		 		{
             		tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_player_num_len; ++i)
		 		{
             		tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_longhu_rank()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_longhu_rank"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_longhu_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_rank()
    {
        let tb = {
    	    rank_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_rank"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
        		for (let i = 0; i < tb.rank_item.length; ++i)
				{
            		tb.rank_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_item_len; ++i)
				{
            		let tmp = minigame_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_longhu_history()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_longhu_history"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_longhu_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_history()
    {
        let tb = {
    	    record_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_history"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
        		for (let i = 0; i < tb.record_item.length; ++i)
				{
            		tb.record_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_item_len; ++i)
				{
            		let tmp = game_record_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_longhu_trendchart()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_longhu_trendchart"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_longhu_trendchart"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_longhu_trendchart()
    {
        let tb = {
    	    history_result : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_longhu_trendchart"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
       			for (let i = 0; i < tb.history_result.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.history_result[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_result_len; ++i)
		 		{
             		tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_longhu_trendchart"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_info()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    beted_money : [],
    	    balance_result : 0,
    	    beted_playercount : [],
    	    self_beted_money : [],
    	    min_bet : 0,
    	    max_bet : 0,
    	    history_result : [],
    	    server_timestamp : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
       			EncodeUtils.uInt16ToByte(tb.beted_money.length, buf);
       			for (let i = 0; i < tb.beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.beted_money[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.balance_result, buf);
       			EncodeUtils.uInt16ToByte(tb.beted_playercount.length, buf);
       			for (let i = 0; i < tb.beted_playercount.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.beted_playercount[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.self_beted_money.length, buf);
       			for (let i = 0; i < tb.self_beted_money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.self_beted_money[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    			EncodeUtils.int64ToByte(tb.max_bet, buf);
       			EncodeUtils.uInt16ToByte(tb.history_result.length, buf);
       			for (let i = 0; i < tb.history_result.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.history_result[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.stageIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.end_time.decode(buf, startIndex);
        		let beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_money_len; ++i)
		 		{
             		tb.beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		tb.balance_result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let beted_playercount_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < beted_playercount_len; ++i)
		 		{
             		tb.beted_playercount.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		let self_beted_money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < self_beted_money_len; ++i)
		 		{
             		tb.self_beted_money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		tb.min_bet = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.max_bet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let history_result_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_result_len; ++i)
		 		{
             		tb.history_result.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_stage()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    balance_result : 0,
    	    money : 0,
    	    money2 : 0,
    	    cur_money : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_stage"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.balance_result, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    			EncodeUtils.int64ToByte(tb.money2, buf);
    			EncodeUtils.int64ToByte(tb.cur_money, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_stage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_shuangdan_bet()
    {
        let tb = {
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_shuangdan_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_shuangdan_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_self_bet()
    {
        let tb = {
    	    result : 0,
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_self_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_self_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_bet()
    {
        let tb = {
    	    money : [],
    	    bet_player_num : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_bet"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.money.length, buf);
       			for (let i = 0; i < tb.money.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.money[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.bet_player_num.length, buf);
       			for (let i = 0; i < tb.bet_player_num.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.bet_player_num[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let money_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < money_len; ++i)
		 		{
             		tb.money.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let bet_player_num_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < bet_player_num_len; ++i)
		 		{
             		tb.bet_player_num.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_shuangdan_rank()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_shuangdan_rank"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_shuangdan_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_rank()
    {
        let tb = {
    	    rank_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_rank"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
        		for (let i = 0; i < tb.rank_item.length; ++i)
				{
            		tb.rank_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_item_len; ++i)
				{
            		let tmp = minigame_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_shuangdan_history()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_shuangdan_history"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_shuangdan_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_shuangdan_history()
    {
        let tb = {
    	    record_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_shuangdan_history"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.record_item.length, buf);
        		for (let i = 0; i < tb.record_item.length; ++i)
				{
            		tb.record_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let record_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < record_item_len; ++i)
				{
            		let tmp = game_record_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.record_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_shuangdan_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_history_100()
    {
        let tb = {
    	    killroom : 0,
    	    killcount : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_history_100"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.killroom, buf);
    		    EncodeUtils.int32ToByte(tb.killcount, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.killcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_history_100"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_history_10()
    {
        let tb = {
    	    killroom : 0,
    	    roundid : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_history_10"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.killroom, buf);
    			EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.killroom = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let roundid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.roundid = roundid_value[0];
 				startIndex += roundid_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_history_10"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_betchips()
    {
        let tb = {
    	    value : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_betchips"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.value, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.value = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_betchips"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_bet_info()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    poolIndex : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_bet_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_bet_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_totalbet_info()
    {
        let tb = {
    	    poolIndex : 0,
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_totalbet_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_totalbet_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_gameover_time()
    {
        let tb = {
    	    poolIndex : 0,
    	    time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_gameover_time"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_gameover_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_self_record_detail()
    {
        let tb = {
    	    roundid : '',
    	    create_timestamp : 0,
    	    bet : 0,
    	    win : 0,
    	    betpool : 0,
    	    winpool : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_self_record_detail"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
    			EncodeUtils.int64ToByte(tb.create_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.bet, buf);
    			EncodeUtils.int64ToByte(tb.win, buf);
    		    EncodeUtils.int32ToByte(tb.betpool, buf);
    		    EncodeUtils.int32ToByte(tb.winpool, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_self_record_detail"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function dataosha_self_record()
    {
        let tb = {
    	    totalbet : 0,
    	    totalwin : 0,
    	    selfdetail : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_dataosha_self_record"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.totalbet, buf);
    			EncodeUtils.int64ToByte(tb.totalwin, buf);
        		EncodeUtils.uInt16ToByte(tb.selfdetail.length, buf);
        		for (let i = 0; i < tb.selfdetail.length; ++i)
				{
            		tb.selfdetail[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.totalbet = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.totalwin = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let selfdetail_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < selfdetail_len; ++i)
				{
            		let tmp = dataosha_self_record_detail();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.selfdetail.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_dataosha_self_record"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_info()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    killroom : 0,
    	    killroomtotalbet : 0,
    	    winamount : 0,
    	    all_betinfo : [],
    	    totalbetAmount : [],
    	    nobetplayer : [],
    	    gameover_time : [],
    	    bet_time : 0,
    	    betchips : [],
    	    my_chip : 0,
    	    self_betinfo : dataosha_bet_info(),
    	    min_bet : 0,
    	    max_bet : 0,
    	    server_timestamp : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.killroom, buf);
    			EncodeUtils.int64ToByte(tb.killroomtotalbet, buf);
    			EncodeUtils.int64ToByte(tb.winamount, buf);
        		EncodeUtils.uInt16ToByte(tb.all_betinfo.length, buf);
        		for (let i = 0; i < tb.all_betinfo.length; ++i)
				{
            		tb.all_betinfo[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.totalbetAmount.length, buf);
        		for (let i = 0; i < tb.totalbetAmount.length; ++i)
				{
            		tb.totalbetAmount[i].encode(buf);
	     		}
       			EncodeUtils.uInt16ToByte(tb.nobetplayer.length, buf);
       			for (let i = 0; i < tb.nobetplayer.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.nobetplayer[i], buf);
       			}
        		EncodeUtils.uInt16ToByte(tb.gameover_time.length, buf);
        		for (let i = 0; i < tb.gameover_time.length; ++i)
				{
            		tb.gameover_time[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.bet_time, buf);
        		EncodeUtils.uInt16ToByte(tb.betchips.length, buf);
        		for (let i = 0; i < tb.betchips.length; ++i)
				{
            		tb.betchips[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.my_chip, buf);
        		tb.self_betinfo.encode(buf);
    		    EncodeUtils.int32ToByte(tb.min_bet, buf);
    			EncodeUtils.int64ToByte(tb.max_bet, buf);
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
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
        		for(let i = 0; i < all_betinfo_len; ++i)
				{
            		let tmp = dataosha_bet_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.all_betinfo.push(tmp);
        		}
        		let totalbetAmount_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < totalbetAmount_len; ++i)
				{
            		let tmp = dataosha_totalbet_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.totalbetAmount.push(tmp);
        		}
        		let nobetplayer_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < nobetplayer_len; ++i)
		 		{
             		tb.nobetplayer.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let gameover_time_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < gameover_time_len; ++i)
				{
            		let tmp = dataosha_gameover_time();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.gameover_time.push(tmp);
        		}
        		tb.bet_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let betchips_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < betchips_len; ++i)
				{
            		let tmp = dataosha_betchips();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.betchips.push(tmp);
        		}
        		tb.my_chip = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_gameover()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    betmoney : 0,
    	    killroom : 0,
    	    killroomtotalbet : 0,
    	    winamount : 0,
    	    cur_money : 0,
    	    end_time2 : 0,
    	    server_ciphertext : '',
    	    roundid : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_gameover"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    			EncodeUtils.int64ToByte(tb.betmoney, buf);
    		    EncodeUtils.int32ToByte(tb.killroom, buf);
    			EncodeUtils.int64ToByte(tb.killroomtotalbet, buf);
    			EncodeUtils.int64ToByte(tb.winamount, buf);
    			EncodeUtils.int64ToByte(tb.cur_money, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    			EncodeUtils.utf8StrtoBytes(tb.server_ciphertext, buf);
    			EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
    	    },
    		decode:function(buf, index)
			{
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
				let server_ciphertext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.server_ciphertext = server_ciphertext_value[0];
 				startIndex += server_ciphertext_value[1];
				let roundid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.roundid = roundid_value[0];
 				startIndex += roundid_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_gameover"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_batch_dataosha_stage()
    {
        let tb = {
    	    stageIndex : 0,
    	    end_time : stime(),
    	    killroom : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_batch_dataosha_stage"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.stageIndex, buf);
        		tb.end_time.encode(buf);
    		    EncodeUtils.int32ToByte(tb.killroom, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_batch_dataosha_stage"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_others_enter()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_others_enter"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
 				startIndex += nickname_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_others_enter"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_others_leave()
    {
        let tb = {
    	    role_id : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_others_leave"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_others_leave"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_bet()
    {
        let tb = {
    	    poolIndex : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.poolIndex = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_money = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_dataosha_bet()
    {
        let tb = {
    	    result : 0,
    	    poolIndex : 0,
    	    bet_money : 0,
    	    pre_poolIndex : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_dataosha_bet"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    		    EncodeUtils.int32ToByte(tb.pre_poolIndex, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_dataosha_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_others_bet()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    poolIndex : 0,
    	    bet_money : 0,
    	    pre_poolIndex : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_others_bet"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.poolIndex, buf);
    		    EncodeUtils.int32ToByte(tb.bet_money, buf);
    		    EncodeUtils.int32ToByte(tb.pre_poolIndex, buf);
    	    },
    		decode:function(buf, index)
			{
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
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_others_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_rank()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_rank"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_dataosha_rank()
    {
        let tb = {
    	    rank_item : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_dataosha_rank"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.rank_item.length, buf);
        		for (let i = 0; i < tb.rank_item.length; ++i)
				{
            		tb.rank_item[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let rank_item_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < rank_item_len; ++i)
				{
            		let tmp = minigame_rank_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.rank_item.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_dataosha_rank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_history()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_history"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_dataosha_history()
    {
        let tb = {
    	    history_100 : [],
    	    history_10 : [],
    	    self_record : dataosha_self_record(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_dataosha_history"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.history_100.length, buf);
        		for (let i = 0; i < tb.history_100.length; ++i)
				{
            		tb.history_100[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.history_10.length, buf);
        		for (let i = 0; i < tb.history_10.length; ++i)
				{
            		tb.history_10[i].encode(buf);
	     		}
        		tb.self_record.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let history_100_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_100_len; ++i)
				{
            		let tmp = dataosha_history_100();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.history_100.push(tmp);
        		}
        		let history_10_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < history_10_len; ++i)
				{
            		let tmp = dataosha_history_10();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.history_10.push(tmp);
        		}
        		startIndex += tb.self_record.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_dataosha_history"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_seed()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_seed"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_seed"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_dataosha_seed()
    {
        let tb = {
    	    client_seed : '',
    	    server_ciphertext : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_dataosha_seed"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.client_seed, buf);
    			EncodeUtils.utf8StrtoBytes(tb.server_ciphertext, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let client_seed_value = EncodeUtils.byteToString(buf, startIndex);
				tb.client_seed = client_seed_value[0];
 				startIndex += client_seed_value[1];
				let server_ciphertext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.server_ciphertext = server_ciphertext_value[0];
 				startIndex += server_ciphertext_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_dataosha_seed"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_fair_verify()
    {
        let tb = {
    	    roundid : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_fair_verify"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.roundid, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let roundid_value = EncodeUtils.byteToString(buf, startIndex);
				tb.roundid = roundid_value[0];
 				startIndex += roundid_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_fair_verify"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_dataosha_fair_verify()
    {
        let tb = {
    	    client_seed : '',
    	    server_ciphertext : '',
    	    server_plaintext : '',
    	    complete_plaintext : '',
    	    complete_ciphertext : '',
    	    prefix5 : '',
    	    prefix5_decimal : '',
    	    prefix5_decimal_mod : '',
    	    killroom : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_dataosha_fair_verify"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.client_seed, buf);
    			EncodeUtils.utf8StrtoBytes(tb.server_ciphertext, buf);
    			EncodeUtils.utf8StrtoBytes(tb.server_plaintext, buf);
    			EncodeUtils.utf8StrtoBytes(tb.complete_plaintext, buf);
    			EncodeUtils.utf8StrtoBytes(tb.complete_ciphertext, buf);
    			EncodeUtils.utf8StrtoBytes(tb.prefix5, buf);
    			EncodeUtils.utf8StrtoBytes(tb.prefix5_decimal, buf);
    			EncodeUtils.utf8StrtoBytes(tb.prefix5_decimal_mod, buf);
    			EncodeUtils.utf8StrtoBytes(tb.killroom, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let client_seed_value = EncodeUtils.byteToString(buf, startIndex);
				tb.client_seed = client_seed_value[0];
 				startIndex += client_seed_value[1];
				let server_ciphertext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.server_ciphertext = server_ciphertext_value[0];
 				startIndex += server_ciphertext_value[1];
				let server_plaintext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.server_plaintext = server_plaintext_value[0];
 				startIndex += server_plaintext_value[1];
				let complete_plaintext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.complete_plaintext = complete_plaintext_value[0];
 				startIndex += complete_plaintext_value[1];
				let complete_ciphertext_value = EncodeUtils.byteToString(buf, startIndex);
				tb.complete_ciphertext = complete_ciphertext_value[0];
 				startIndex += complete_ciphertext_value[1];
				let prefix5_value = EncodeUtils.byteToString(buf, startIndex);
				tb.prefix5 = prefix5_value[0];
 				startIndex += prefix5_value[1];
				let prefix5_decimal_value = EncodeUtils.byteToString(buf, startIndex);
				tb.prefix5_decimal = prefix5_decimal_value[0];
 				startIndex += prefix5_decimal_value[1];
				let prefix5_decimal_mod_value = EncodeUtils.byteToString(buf, startIndex);
				tb.prefix5_decimal_mod = prefix5_decimal_mod_value[0];
 				startIndex += prefix5_decimal_mod_value[1];
				let killroom_value = EncodeUtils.byteToString(buf, startIndex);
				tb.killroom = killroom_value[0];
 				startIndex += killroom_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_dataosha_fair_verify"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_dataosha_set_my_chip()
    {
        let tb = {
    	    chip : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_dataosha_set_my_chip"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.chip, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.chip = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_dataosha_set_my_chip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_dataosha_set_my_chip()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_dataosha_set_my_chip"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_dataosha_set_my_chip"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function pdk_user_info()
    {
        let tb = {
    	    role_id : 0,
    	    nickname : '',
    	    role_status : 0,
    	    gender : 0,
    	    head_photo : '',
    	    chairid : 0,
    	    current_money : 0,
    	    score : 0,
    	    leftcarddata : [],
    	    leftcardcount : 0,
    	    turn_card_data : [],
    	    tianhutype : 0,
    	    tianhu_carddata : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_pdk_user_info"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.utf8StrtoBytes(tb.nickname, buf);
    		    EncodeUtils.int32ToByte(tb.role_status, buf);
    		    EncodeUtils.int32ToByte(tb.gender, buf);
    			EncodeUtils.utf8StrtoBytes(tb.head_photo, buf);
    		    EncodeUtils.int32ToByte(tb.chairid, buf);
    			EncodeUtils.int64ToByte(tb.current_money, buf);
    			EncodeUtils.int64ToByte(tb.score, buf);
       			EncodeUtils.uInt16ToByte(tb.leftcarddata.length, buf);
       			for (let i = 0; i < tb.leftcarddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.leftcarddata[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.leftcardcount, buf);
       			EncodeUtils.uInt16ToByte(tb.turn_card_data.length, buf);
       			for (let i = 0; i < tb.turn_card_data.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.turn_card_data[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.tianhutype, buf);
       			EncodeUtils.uInt16ToByte(tb.tianhu_carddata.length, buf);
       			for (let i = 0; i < tb.tianhu_carddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.tianhu_carddata[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				let nickname_value = EncodeUtils.byteToString(buf, startIndex);
				tb.nickname = nickname_value[0];
 				startIndex += nickname_value[1];
        		tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.gender = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let head_photo_value = EncodeUtils.byteToString(buf, startIndex);
				tb.head_photo = head_photo_value[0];
 				startIndex += head_photo_value[1];
        		tb.chairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.current_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.score = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let leftcarddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < leftcarddata_len; ++i)
		 		{
             		tb.leftcarddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.leftcardcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let turn_card_data_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < turn_card_data_len; ++i)
		 		{
             		tb.turn_card_data.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.tianhutype = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let tianhu_carddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < tianhu_carddata_len; ++i)
		 		{
             		tb.tianhu_carddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_pdk_user_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pdk_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pdk_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pdk_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_pdk_info()
    {
        let tb = {
    	    gamescene : 0,
    	    game_mode : 0,
    	    userinfo : [],
    	    bankchairid : 0,
    	    outcardchairid : 0,
    	    currentchairid : 0,
    	    bet_base : 0,
    	    timeslist : [],
    	    server_timestamp : 0,
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_pdk_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.gamescene, buf);
    		    EncodeUtils.int32ToByte(tb.game_mode, buf);
        		EncodeUtils.uInt16ToByte(tb.userinfo.length, buf);
        		for (let i = 0; i < tb.userinfo.length; ++i)
				{
            		tb.userinfo[i].encode(buf);
	     		}
    		    EncodeUtils.int32ToByte(tb.bankchairid, buf);
    		    EncodeUtils.int32ToByte(tb.outcardchairid, buf);
    		    EncodeUtils.int32ToByte(tb.currentchairid, buf);
    		    EncodeUtils.int32ToByte(tb.bet_base, buf);
       			EncodeUtils.uInt16ToByte(tb.timeslist.length, buf);
       			for (let i = 0; i < tb.timeslist.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.timeslist[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.server_timestamp, buf);
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.gamescene = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.game_mode = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let userinfo_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < userinfo_len; ++i)
				{
            		let tmp = pdk_user_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.userinfo.push(tmp);
        		}
        		tb.bankchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.outcardchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.currentchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.bet_base = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let timeslist_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < timeslist_len; ++i)
		 		{
             		tb.timeslist.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.server_timestamp = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_pdk_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pdk_ready()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pdk_ready"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pdk_ready"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_pdk_start_counting()
    {
        let tb = {
    	    role_state_list : [],
    	    end_time2 : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_pdk_start_counting"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.role_state_list.length, buf);
       			for (let i = 0; i < tb.role_state_list.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.role_state_list[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.end_time2, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let role_state_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_state_list_len; ++i)
		 		{
             		tb.role_state_list.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.end_time2 = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_pdk_start_counting"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pdk_out_card()
    {
        let tb = {
    	    carddata : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pdk_out_card"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.carddata.length, buf);
       			for (let i = 0; i < tb.carddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.carddata[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let carddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < carddata_len; ++i)
		 		{
             		tb.carddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pdk_out_card"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_s2c_out_card()
    {
        let tb = {
    	    outcardchairid : 0,
    	    currentchairid : 0,
    	    carddata : [],
    	    leftcardcount : 0,
    	    is_realtime_settle : 0,
    	    losechairid : 0,
    	    winchairid : 0,
    	    score : [],
    	    new_self_score : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_s2c_out_card"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.outcardchairid, buf);
    		    EncodeUtils.int32ToByte(tb.currentchairid, buf);
       			EncodeUtils.uInt16ToByte(tb.carddata.length, buf);
       			for (let i = 0; i < tb.carddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.carddata[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.leftcardcount, buf);
    		    EncodeUtils.int32ToByte(tb.is_realtime_settle, buf);
    		    EncodeUtils.int32ToByte(tb.losechairid, buf);
    		    EncodeUtils.int32ToByte(tb.winchairid, buf);
       			EncodeUtils.uInt16ToByte(tb.score.length, buf);
       			for (let i = 0; i < tb.score.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.score[i], buf);
       			}
       			EncodeUtils.uInt16ToByte(tb.new_self_score.length, buf);
       			for (let i = 0; i < tb.new_self_score.length; ++i)
				{
		    		EncodeUtils.int64ToByte(tb.new_self_score[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.outcardchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.currentchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let carddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < carddata_len; ++i)
		 		{
             		tb.carddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.leftcardcount = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.is_realtime_settle = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.losechairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.winchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let score_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < score_len; ++i)
		 		{
             		tb.score.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
        		let new_self_score_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < new_self_score_len; ++i)
		 		{
             		tb.new_self_score.push(EncodeUtils.ByteToint64(buf, startIndex));
					startIndex += 8;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_s2c_out_card"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pdk_pass_card()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pdk_pass_card"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pdk_pass_card"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_s2c_pass_card()
    {
        let tb = {
    	    passcardchairid : 0,
    	    currentchairid : 0,
    	    turnover : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_s2c_pass_card"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.passcardchairid, buf);
    		    EncodeUtils.int32ToByte(tb.currentchairid, buf);
    		    EncodeUtils.int32ToByte(tb.turnover, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.passcardchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.currentchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.turnover = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_s2c_pass_card"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_pdk_error()
    {
        let tb = {
    	    errormsg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_pdk_error"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.utf8StrtoBytes(tb.errormsg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				let errormsg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.errormsg = errormsg_value[0];
 				startIndex += errormsg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_pdk_error"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_s2c_game_start()
    {
        let tb = {
    	    bankchairid : 0,
    	    firstoutchairid : 0,
    	    carddata : [],
    	    tianhu_type : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_s2c_game_start"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.bankchairid, buf);
    		    EncodeUtils.int32ToByte(tb.firstoutchairid, buf);
       			EncodeUtils.uInt16ToByte(tb.carddata.length, buf);
       			for (let i = 0; i < tb.carddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.carddata[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.tianhu_type, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bankchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.firstoutchairid = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let carddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < carddata_len; ++i)
		 		{
             		tb.carddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.tianhu_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_s2c_game_start"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_s2c_game_over()
    {
        let tb = {
    	    userinfo : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_s2c_game_over"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.userinfo.length, buf);
        		for (let i = 0; i < tb.userinfo.length; ++i)
				{
            		tb.userinfo[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let userinfo_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < userinfo_len; ++i)
				{
            		let tmp = pdk_user_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.userinfo.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_s2c_game_over"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_pdk_cheat()
    {
        let tb = {
    	    carddata : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_pdk_cheat"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.carddata.length, buf);
       			for (let i = 0; i < tb.carddata.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.carddata[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let carddata_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < carddata_len; ++i)
		 		{
             		tb.carddata.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_pdk_cheat"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function rsp_pdk_cheat()
    {
        let tb = {
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_rsp_pdk_cheat"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_rsp_pdk_cheat"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function pdk_config()
    {
        let tb = {
    	    betbase : 0,
    	    tdle_time : 0,
    	    start_counting_time : 0,
    	    tianhu_counting_time : 0,
    	    action_counting_time : 0,
    	    settlement_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_pdk_config"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.betbase, buf);
    		    EncodeUtils.int32ToByte(tb.tdle_time, buf);
    		    EncodeUtils.int32ToByte(tb.start_counting_time, buf);
    		    EncodeUtils.int32ToByte(tb.tianhu_counting_time, buf);
    		    EncodeUtils.int32ToByte(tb.action_counting_time, buf);
    		    EncodeUtils.int32ToByte(tb.settlement_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.betbase = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.tdle_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.start_counting_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.tianhu_counting_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.action_counting_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.settlement_time = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_pdk_config"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_bet_money()
    {
        let tb = {
    	    role_id : 0,
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_bet_money"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_bet_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_multi_cards()
    {
        let tb = {
    	    cards : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_multi_cards"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.cards.length, buf);
       			for (let i = 0; i < tb.cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.cards[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_len; ++i)
		 		{
             		tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_multi_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_role_cards()
    {
        let tb = {
    	    role_id : 0,
    	    cards : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_role_cards"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
       			EncodeUtils.uInt16ToByte(tb.cards.length, buf);
       			for (let i = 0; i < tb.cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.cards[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_len; ++i)
		 		{
             		tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_role_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_role_outs()
    {
        let tb = {
    	    role_id : 0,
    	    outs : [],
    	    win_ratio : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_role_outs"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
       			EncodeUtils.uInt16ToByte(tb.outs.length, buf);
       			for (let i = 0; i < tb.outs.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.outs[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.win_ratio, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let outs_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < outs_len; ++i)
		 		{
             		tb.outs.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.win_ratio = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_role_outs"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_blind_money()
    {
        let tb = {
    	    role_id : 0,
    	    blind_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_blind_money"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.blind_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.blind_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_blind_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_score_info()
    {
        let tb = {
    	    com_cards : [],
    	    com_type : 0,
    	    score : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_score_info"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.com_cards.length, buf);
       			for (let i = 0; i < tb.com_cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.com_cards[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.com_type, buf);
    		    EncodeUtils.int32ToByte(tb.score, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let com_cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < com_cards_len; ++i)
		 		{
             		tb.com_cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.com_type = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.score = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_score_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_start()
    {
        let tb = {
    	    banker_id : 0,
    	    role_cards : [],
    	    blind_moneys : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_start"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.banker_id, buf);
        		EncodeUtils.uInt16ToByte(tb.role_cards.length, buf);
        		for (let i = 0; i < tb.role_cards.length; ++i)
				{
            		tb.role_cards[i].encode(buf);
	     		}
        		EncodeUtils.uInt16ToByte(tb.blind_moneys.length, buf);
        		for (let i = 0; i < tb.blind_moneys.length; ++i)
				{
            		tb.blind_moneys[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.banker_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let role_cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_cards_len; ++i)
				{
            		let tmp = tx_role_cards();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.role_cards.push(tmp);
        		}
        		let blind_moneys_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < blind_moneys_len; ++i)
				{
            		let tmp = tx_blind_money();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.blind_moneys.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_start"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_turn()
    {
        let tb = {
    	    cards_list : [],
    	    pod_money : 0,
    	    game_status : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_turn"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.cards_list.length, buf);
        		for (let i = 0; i < tb.cards_list.length; ++i)
				{
            		tb.cards_list[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.pod_money, buf);
    		    EncodeUtils.int32ToByte(tb.game_status, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let cards_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_list_len; ++i)
				{
            		let tmp = tx_multi_cards();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.cards_list.push(tmp);
        		}
        		tb.pod_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_turn"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_operator()
    {
        let tb = {
    	    role_id : 0,
    	    time_bank : 0,
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_operator"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.time_bank, buf);
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.time_bank = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_operator"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_show_cards()
    {
        let tb = {
    	    role_cards : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_show_cards"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.role_cards.length, buf);
        		for (let i = 0; i < tb.role_cards.length; ++i)
				{
            		tb.role_cards[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let role_cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_cards_len; ++i)
				{
            		let tmp = tx_role_cards();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.role_cards.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_show_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_insurance()
    {
        let tb = {
    	    role_outs : [],
    	    odds_role_id : 0,
    	    outs_min_pay : 0,
    	    outs_max_pay : 0,
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_insurance"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.role_outs.length, buf);
        		for (let i = 0; i < tb.role_outs.length; ++i)
				{
            		tb.role_outs[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.odds_role_id, buf);
    			EncodeUtils.int64ToByte(tb.outs_min_pay, buf);
    			EncodeUtils.int64ToByte(tb.outs_max_pay, buf);
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let role_outs_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_outs_len; ++i)
				{
            		let tmp = tx_role_outs();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.role_outs.push(tmp);
        		}
        		tb.odds_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.outs_min_pay = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.outs_max_pay = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_insurance"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_bet()
    {
        let tb = {
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_bet"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_bet()
    {
        let tb = {
    	    bet : tx_bet_money(),
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_bet"];
    		},
		    encode:function(buf)
		    {
        		tb.bet.encode(buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.bet.decode(buf, startIndex);
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_bet"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_call()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_call"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_call"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_call()
    {
        let tb = {
    	    bet : tx_bet_money(),
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_call"];
    		},
		    encode:function(buf)
		    {
        		tb.bet.encode(buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.bet.decode(buf, startIndex);
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_call"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_raise()
    {
        let tb = {
    	    bet_money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_raise"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.bet_money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.bet_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_raise"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_raise()
    {
        let tb = {
    	    bet : tx_bet_money(),
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_raise"];
    		},
		    encode:function(buf)
		    {
        		tb.bet.encode(buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.bet.decode(buf, startIndex);
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_raise"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_check()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_check"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_check"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_check()
    {
        let tb = {
    	    role_id : 0,
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_check"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_check"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_fold()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_fold"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_fold"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_fold()
    {
        let tb = {
    	    role_id : 0,
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_fold"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_fold"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_allin()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_allin"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_allin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_allin()
    {
        let tb = {
    	    bet : tx_bet_money(),
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_allin"];
    		},
		    encode:function(buf)
		    {
        		tb.bet.encode(buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.bet.decode(buf, startIndex);
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_allin"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_add_insurance_time()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_add_insurance_time"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_add_insurance_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_add_insurance_time()
    {
        let tb = {
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_add_insurance_time"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_add_insurance_time"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_buy_insurance()
    {
        let tb = {
    	    cards : [],
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_buy_insurance"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.cards.length, buf);
       			for (let i = 0; i < tb.cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.cards[i], buf);
       			}
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_len; ++i)
		 		{
             		tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_buy_insurance"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_buy_insurance()
    {
        let tb = {
    	    odds_role_id : 0,
    	    is_bought : 0,
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_buy_insurance"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.odds_role_id, buf);
    		    EncodeUtils.int32ToByte(tb.is_bought, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.odds_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.is_bought = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_buy_insurance"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_multi_deals()
    {
        let tb = {
    	    role_outs : [],
    	    role_id : 0,
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_multi_deals"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.role_outs.length, buf);
        		for (let i = 0; i < tb.role_outs.length; ++i)
				{
            		tb.role_outs[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let role_outs_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_outs_len; ++i)
				{
            		let tmp = tx_role_outs();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.role_outs.push(tmp);
        		}
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_multi_deals"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_multi_deals()
    {
        let tb = {
    	    times : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_multi_deals"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.times, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_multi_deals"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_req_multi_deals()
    {
        let tb = {
    	    from_role_id : 0,
    	    to_role_id : 0,
    	    times : 0,
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_req_multi_deals"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.from_role_id, buf);
    			EncodeUtils.int64ToByte(tb.to_role_id, buf);
    		    EncodeUtils.int32ToByte(tb.times, buf);
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.from_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.to_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_req_multi_deals"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_agree_multi_deals()
    {
        let tb = {
    	    agree : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_agree_multi_deals"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.agree, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.agree = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_agree_multi_deals"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_agree_multi_deals()
    {
        let tb = {
    	    role_id : 0,
    	    agree : 0,
    	    times : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_agree_multi_deals"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    		    EncodeUtils.int32ToByte(tb.agree, buf);
    		    EncodeUtils.int32ToByte(tb.times, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.agree = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.times = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_agree_multi_deals"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_show_role_cards()
    {
        let tb = {
    	    cards : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_show_role_cards"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.cards.length, buf);
       			for (let i = 0; i < tb.cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.cards[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_len; ++i)
		 		{
             		tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_show_role_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_show_role_cards()
    {
        let tb = {
    	    role_cards : tx_role_cards(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_show_role_cards"];
    		},
		    encode:function(buf)
		    {
        		tb.role_cards.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.role_cards.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_show_role_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_show_desktop_cards()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_show_desktop_cards"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_show_desktop_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_show_desktop_cards()
    {
        let tb = {
    	    cards : [],
    	    result : 0,
    	    err_msg : '',
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_show_desktop_cards"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.cards.length, buf);
       			for (let i = 0; i < tb.cards.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.cards[i], buf);
       			}
    		    EncodeUtils.int32ToByte(tb.result, buf);
    			EncodeUtils.utf8StrtoBytes(tb.err_msg, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let cards_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_len; ++i)
		 		{
             		tb.cards.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				let err_msg_value = EncodeUtils.byteToString(buf, startIndex);
				tb.err_msg = err_msg_value[0];
 				startIndex += err_msg_value[1];
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_show_desktop_cards"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_take_money()
    {
        let tb = {
    	    money : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_take_money"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.money, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_take_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_take_money()
    {
        let tb = {
    	    role_id : 0,
    	    money : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_take_money"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.money, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_take_money"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_use_time_bank()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_use_time_bank"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_use_time_bank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_use_time_bank()
    {
        let tb = {
    	    role_id : 0,
    	    time_bank : 0,
    	    result : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_use_time_bank"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.time_bank, buf);
    		    EncodeUtils.int32ToByte(tb.result, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.time_bank = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.result = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_use_time_bank"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_video_record10()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_video_record10"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_video_record10"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_video_record10()
    {
        let tb = {
    	    video_list : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_video_record10"];
    		},
		    encode:function(buf)
		    {
       			EncodeUtils.uInt16ToByte(tb.video_list.length, buf);
       			for (let i = 0; i < tb.video_list.length; ++i)
				{
		    		EncodeUtils.utf8StrtoBytes(tb.video_list[i], buf);
       			}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let video_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < video_list_len; ++i)
		 		{
					let video_list_value = EncodeUtils.byteToString(buf, startIndex);
					tb.video_list.push(video_list_value[0]);
					startIndex += video_list_value[1];
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_video_record10"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_game_info()
    {
        let tb = {
    	    total : 0,
    	    win : 0,
    	    play : 0,
    	    raise : 0,
    	    fold : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_game_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.total, buf);
    		    EncodeUtils.int32ToByte(tb.win, buf);
    		    EncodeUtils.int32ToByte(tb.play, buf);
    		    EncodeUtils.int32ToByte(tb.raise, buf);
    		    EncodeUtils.int32ToByte(tb.fold, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.total = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.win = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.play = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.raise = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.fold = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_game_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_pot_role()
    {
        let tb = {
    	    role_id : 0,
    	    win : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_pot_role"];
    		},
		    encode:function(buf)
		    {
    			EncodeUtils.int64ToByte(tb.role_id, buf);
    			EncodeUtils.int64ToByte(tb.win, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.win = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_pot_role"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_pot()
    {
        let tb = {
    	    pot_roles : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_pot"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.pot_roles.length, buf);
        		for (let i = 0; i < tb.pot_roles.length; ++i)
				{
            		tb.pot_roles[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let pot_roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < pot_roles_len; ++i)
				{
            		let tmp = tx_pot_role();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.pot_roles.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_pot"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_settlement_item()
    {
        let tb = {
    	    role_cards : tx_role_cards(),
    	    cur_moeny : 0,
    	    get_money : 0,
    	    game_info : tx_game_info(),
    	    score_info : [],
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_settlement_item"];
    		},
		    encode:function(buf)
		    {
        		tb.role_cards.encode(buf);
    			EncodeUtils.int64ToByte(tb.cur_moeny, buf);
    			EncodeUtils.int64ToByte(tb.get_money, buf);
        		tb.game_info.encode(buf);
        		EncodeUtils.uInt16ToByte(tb.score_info.length, buf);
        		for (let i = 0; i < tb.score_info.length; ++i)
				{
            		tb.score_info[i].encode(buf);
	     		}
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.role_cards.decode(buf, startIndex);
        		tb.cur_moeny = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.get_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		startIndex += tb.game_info.decode(buf, startIndex);
        		let score_info_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < score_info_len; ++i)
				{
            		let tmp = tx_score_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.score_info.push(tmp);
        		}
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_settlement_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_settlement()
    {
        let tb = {
    	    settlement_list : [],
    	    pod_money : 0,
    	    pot_list : [],
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_settlement"];
    		},
		    encode:function(buf)
		    {
        		EncodeUtils.uInt16ToByte(tb.settlement_list.length, buf);
        		for (let i = 0; i < tb.settlement_list.length; ++i)
				{
            		tb.settlement_list[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.pod_money, buf);
        		EncodeUtils.uInt16ToByte(tb.pot_list.length, buf);
        		for (let i = 0; i < tb.pot_list.length; ++i)
				{
            		tb.pot_list[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		let settlement_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < settlement_list_len; ++i)
				{
            		let tmp = tx_settlement_item();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.settlement_list.push(tmp);
        		}
        		tb.pod_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let pot_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < pot_list_len; ++i)
				{
            		let tmp = tx_pot();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.pot_list.push(tmp);
        		}
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_settlement"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function req_tx_info()
    {
        let tb = {
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_req_tx_info"];
    		},
		    encode:function(buf)
		    {
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_req_tx_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_role_item()
    {
        let tb = {
    	    pos : 0,
    	    chip_link : [],
    	    role_cards : tx_role_cards(),
    	    role_status : 0,
    	    game_info : tx_game_info(),
    	    fold : 0,
    	    allin : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_role_item"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.pos, buf);
       			EncodeUtils.uInt16ToByte(tb.chip_link.length, buf);
       			for (let i = 0; i < tb.chip_link.length; ++i)
				{
		    		EncodeUtils.int32ToByte(tb.chip_link[i], buf);
       			}
        		tb.role_cards.encode(buf);
    		    EncodeUtils.int32ToByte(tb.role_status, buf);
        		tb.game_info.encode(buf);
    		    EncodeUtils.int32ToByte(tb.fold, buf);
    		    EncodeUtils.int32ToByte(tb.allin, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.pos = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let chip_link_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < chip_link_len; ++i)
		 		{
             		tb.chip_link.push(EncodeUtils.ByteToint32(buf, startIndex));
					startIndex += 4;
        		}
        		startIndex += tb.role_cards.decode(buf, startIndex);
        		tb.role_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.game_info.decode(buf, startIndex);
        		tb.fold = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.allin = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_role_item"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function tx_game_role_info()
    {
        let tb = {
    	    role_base : room_role_base(),
    	    role_item : tx_role_item(),
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_tx_game_role_info"];
    		},
		    encode:function(buf)
		    {
        		tb.role_base.encode(buf);
        		tb.role_item.encode(buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		startIndex += tb.role_base.decode(buf, startIndex);
        		startIndex += tb.role_item.decode(buf, startIndex);
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_tx_game_role_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
    export function notify_tx_room_info()
    {
        let tb = {
    	    game_status : 0,
    	    roles : [],
    	    banker_id : 0,
    	    multi_deal_game_status : 0,
    	    multi_deals_count : 0,
    	    cards_list : [],
    	    pod_money : 0,
    	    odds_role_id : 0,
    	    role_outs : [],
    	    outs_min_pay : 0,
    	    outs_max_pay : 0,
    	    current_insurance_add_time_count : 0,
    	    settlement : notify_tx_settlement(),
    	    time_bank : 0,
    	    op_time_bank : 0,
    	    end_time : 0,
			getMsgID:function()
			{
   				return NetMsgType.msgType["msg_notify_tx_room_info"];
    		},
		    encode:function(buf)
		    {
    		    EncodeUtils.int32ToByte(tb.game_status, buf);
        		EncodeUtils.uInt16ToByte(tb.roles.length, buf);
        		for (let i = 0; i < tb.roles.length; ++i)
				{
            		tb.roles[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.banker_id, buf);
    		    EncodeUtils.int32ToByte(tb.multi_deal_game_status, buf);
    			EncodeUtils.int64ToByte(tb.multi_deals_count, buf);
        		EncodeUtils.uInt16ToByte(tb.cards_list.length, buf);
        		for (let i = 0; i < tb.cards_list.length; ++i)
				{
            		tb.cards_list[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.pod_money, buf);
    			EncodeUtils.int64ToByte(tb.odds_role_id, buf);
        		EncodeUtils.uInt16ToByte(tb.role_outs.length, buf);
        		for (let i = 0; i < tb.role_outs.length; ++i)
				{
            		tb.role_outs[i].encode(buf);
	     		}
    			EncodeUtils.int64ToByte(tb.outs_min_pay, buf);
    			EncodeUtils.int64ToByte(tb.outs_max_pay, buf);
    		    EncodeUtils.int32ToByte(tb.current_insurance_add_time_count, buf);
        		tb.settlement.encode(buf);
    			EncodeUtils.int64ToByte(tb.time_bank, buf);
    			EncodeUtils.int64ToByte(tb.op_time_bank, buf);
    			EncodeUtils.int64ToByte(tb.end_time, buf);
    	    },
    		decode:function(buf, index)
			{
				let startIndex = index;
        		tb.game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		let roles_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < roles_len; ++i)
				{
            		let tmp = tx_game_role_info();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.roles.push(tmp);
        		}
        		tb.banker_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.multi_deal_game_status = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		tb.multi_deals_count = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let cards_list_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < cards_list_len; ++i)
				{
            		let tmp = tx_multi_cards();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.cards_list.push(tmp);
        		}
        		tb.pod_money = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.odds_role_id = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		let role_outs_len = EncodeUtils.ByteToUint16(buf, startIndex);
        		startIndex += 2;
        		for(let i = 0; i < role_outs_len; ++i)
				{
            		let tmp = tx_role_outs();
            		startIndex += tmp.decode(buf, startIndex);
            		tb.role_outs.push(tmp);
        		}
        		tb.outs_min_pay = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.outs_max_pay = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.current_insurance_add_time_count = EncodeUtils.ByteToint32(buf, startIndex);
				startIndex += 4;
        		startIndex += tb.settlement.decode(buf, startIndex);
        		tb.time_bank = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.op_time_bank = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
        		tb.end_time = EncodeUtils.ByteToint64(buf, startIndex);
				startIndex += 8;
				return startIndex - index;
			},
    		build:function(buf)
			{
        		EncodeUtils.uInt32ToByte(NetMsgType.msgType["msg_notify_tx_room_info"], buf);
        		return tb.encode(buf);
    		}
		};
    	return tb;
	}
}