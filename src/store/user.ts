import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';
import { i18n } from '@/languages';
import { TRoleInfo, TUserInfo, TVIPInfo } from '@/utils/types';
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
interface UserState {
  isLogin: boolean;
  isReg: boolean;
  isForget: boolean;
  isNotice: boolean;
  noticeList: any;
  // isSilder: boolean,
  hasLogin: boolean;
  info: TUserInfo; // 用户详情
  loginInfo: any; // 登录详情
  roleInfo: TRoleInfo; // 角色详情
  VIPinfo: TVIPInfo; // vip详情
  myEmail: any; // 邮箱列表
  lang: string;
  loadingEnd: boolean;
}
const languages: any = {
  zh: 'zh',
  'zh-CN': 'zh',
  vi: 'vi',
  'vi-VN': 'vi',
  en: 'en',
};
export const User = defineStore('userInfo', {

  state: (): UserState => ({
    isLogin: false,
    isReg: false,
    isForget: false,
    isNotice: false, // 公告开关
    noticeList: [], // 公告列表
    loadingEnd: false,
    hasLogin: false,
    info: {},
    loginInfo: null,
    VIPinfo: {},
    lang: languages[navigator.language] || 'zh',
    roleInfo: {
      nickname: '',
      money: 0,
      bank_money: 0,
      head_photo: '',
      vip_lv: 0,
      id: ''
    },
    myEmail: {
      email_id_list: [],
      hasNoRead: false, // 是否有未读消息
      list: [], //消息中心数据
      rewardList: [], //奖励邮箱数据
      email_readed: [], // 是否已读数据
    },
  }),
  actions: {
    // 获取标签下拉选择框数据
    async setLogin(value: boolean) {
      this.isLogin = value
    },
    async setLoadingEnd(value: boolean) {
      this.loadingEnd = value
    },
    async setReg(value: boolean) {
      this.isReg = value
    },
    async setForget(value: boolean) {
      this.isForget = value
    },
    async setNotice(value: boolean) {
      this.isNotice = value
    },
    async setNoticeList(value: boolean) {
      this.noticeList = value
    },
    async setHasLogin(value: boolean) {
      this.hasLogin = value
    },

    async setEmailList(info: any) {
      console.log(333333333, info)
      this.myEmail = info;
      // this.emailList = info
    },
    async getUserLoginInfo(info: any) {
      if (info) {
        Local.set('user', info)
        this.loginInfo = info
      } else {
        this.loginInfo = Local.get('user')
      }
    },

    async getInfo(userInfo: TUserInfo) {
      this.info = userInfo
      // if (userInfo) {
      //     Local.set('userInfo', userInfo)
      // } else {
      //     this.info = Local.get('userInfo')
      // }

    },
    async getVIPInfo(userInfo: TVIPInfo) {
      this.VIPinfo = userInfo
      // if (userInfo) {
      //     Local.set('VIPInfo', userInfo)

      // } else {
      //     this.VIPinfo = Local.get('VIPInfo')
      // }

    },
    async getRoleInfo(roleInfo: TRoleInfo) {
      this.roleInfo = roleInfo
    },
    async setLang(value: any) {
      Local.set('lang', value)
      i18n.global.locale.value = languages[value]
      this.lang = value
    },
  }
});
