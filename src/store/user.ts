import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';

import { TRoleInfo, TUserInfo, TVIPInfo } from '@/utils/types';
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
interface UserState {
  isLogin: boolean;
  isReg: boolean;
  regPopShow: boolean
  isForget: boolean;
  isNotice: boolean;
  isFirstDeposit: boolean;
  noticeList: any;
  // isSilder: boolean,
  hasLogin: boolean;
  info: TUserInfo; // 用户详情
  loginInfo: any; // 登录详情
  roleInfo: TRoleInfo; // 角色详情
  VIPinfo: TVIPInfo; // vip详情
  myEmail: any; // 邮箱列表
  loadingEnd: boolean;
  wsOpen: boolean;
  agentInfo: any;
  allCollected: any
}

export const User = defineStore('userInfo', {
  state: (): UserState => ({
    wsOpen: false,
    isLogin: false,
    isReg: false,
    regPopShow: false,
    isForget: false,
    isFirstDeposit: false,
    isNotice: false, // 公告开关
    noticeList: [], // 公告列表
    loadingEnd: false,
    hasLogin: false,
    info: {},
    loginInfo: null,
    kefuVisible: false,
    VIPinfo: {},
    agentInfo: {
      moneyauth: 0,   // 是否有转账权限
      muteuser: 0,    // 是否有禁言权限
      user_level: 1,
      user_type: 0,  //0 玩家   1 客服  2 代理
    },

    roleInfo: {
      nickname: '',
      money: 0,
      bank_money: 0,
      head_photo: '',
      vip_lv: 0,
      id: '',
    },
    myEmail: {
      email_id_list: [],
      hasNoRead: false, // 是否有未读消息
      list: [], //消息中心数据
      rewardList: [], //奖励邮箱数据
      email_readed: [], // 是否已读数据
    },
    allCollected: []
  }),
  actions: {
    async setWsOpen(value: boolean) {
      this.wsOpen = value;
    },
    // 获取标签下拉选择框数据
    async setLogin(value: boolean) {
      this.isLogin = value;
    },
    async setLoadingEnd(value: boolean) {
      this.loadingEnd = value;
    },
    async setReg(value: boolean) {
      this.isReg = value;
    },
    async setRegPopShow(value: boolean) {
      this.regPopShow = value;
    },
    async setForget(value: boolean) {
      this.isForget = value;
    },
    async setFirstDeposit(value: boolean) {
      this.isFirstDeposit = value;
    },

    async setNotice(value: boolean) {
      this.isNotice = value;
    },
    async setNoticeList(value: boolean) {
      this.noticeList = value;
    },
    async setHasLogin(value: boolean) {
      this.hasLogin = value;
    },
    async setAgentInfo(info: any) {
      this.agentInfo = info;
    },

    async setEmailList(info: any) {
      this.myEmail = info;
      // this.emailList = info
    },
    async getUserLoginInfo(info: any) {
      if (info) {
        Local.set('user', info);
        this.loginInfo = info;
      } else {
        this.loginInfo = Local.get('user');
      }
    },

    async getInfo(userInfo: TUserInfo) {
      this.info = userInfo;
      this.info.hideString = '******';
    },
    async getVIPInfo(userInfo: TVIPInfo) {
      this.VIPinfo = userInfo;
    },
    async getRoleInfo(roleInfo: TRoleInfo) {
      this.roleInfo = roleInfo;
      Local.set('roleInfo', roleInfo);
    },
    async getCollected(data: any) {
      this.allCollected = data;

    },
  },
});
