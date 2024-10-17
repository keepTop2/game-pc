
import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';
import { i18n } from '@/languages';
/**
 * 页面信息
 * @methods setUserInfos 设置用户信息
 */
interface PageState {
    menuActive: number
    menuName: string
    countryOptions: any
    bannerArr: any
    textAnnouncement: any
    serviceUrlObj: any
    settings: any,
    activityList: any,
    activityTitleList: any
    bankListInfo: any,
    adminI18n: any,
    lang: string;
    unread: number,
    homeGameData: any,
    themeColor: string
}
const languages: any = {
    zh: 'zh',
    'zh-CN': 'zh',
    vn: 'vn',
    'vi-VN': 'vn',
    en: 'en',
};
export const Page = defineStore('page', {
    state: (): PageState => ({
        menuActive: -1,
        menuName: '',
        countryOptions: null,
        bannerArr: [],
        textAnnouncement: [],
        serviceUrlObj: {},
        settings: null,
        activityList: null,
        activityTitleList: {},
        bankListInfo: [],
        adminI18n: null,
        lang: 'zh',
        unread: 0,
        homeGameData: null,
        themeColor: 'dayMode', // 日间模式 dayMode， 夜间模式 nightMode
    }),
    actions: {
        // 设置皮肤
        async setTheme(value: any) {
            if (value) {
                this.themeColor = value
            }
            Local.set('themeColor', this.themeColor)
            document.documentElement.setAttribute('theme', this.themeColor)
        },
        // 获取未读消息数量
        async getUnread(isFirst = false) {
            if (isFirst) {
                this.unread = 0
            }
            const customer_server: any = this.$state.settings?.customer_server
            const device_id = localStorage.getItem('device_id')
            if (customer_server && device_id) {
                fetch(customer_server + `/api/message/unread?device_id=${device_id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json(); // 将响应解析为 JSON
                    })
                    .then(res => {
                        this.unread = res?.data?.count || 0
                    })
            }
        },
        // 获取标签下拉选择框数据
        async setMenuActive(value: number, name: string) {
            Local.set('menuActive', value)
            Local.set('menuName', name)
            this.menuActive = value
            this.menuName = name
        },

        async setHomePageGameData(data: any) {
            data.shift()
            this.homeGameData = data
        },
        async setSettings(value: any) {
            this.settings = value
        },
        async setAdminI18n(value: any) {
            this.adminI18n = value
        },
        async setLang(value: any) {
            this.bannerArr = null
            this.textAnnouncement = null
            if (value) {
                this.lang = value
            }

            Local.set('lang', this.lang)
            i18n.global.locale.value = languages[this.lang]

            let keys = Object.keys(this.adminI18n[this.lang])
            let bannerArr: Array<string> = []
            let textAnnouncement: Array<string> = []
            keys.map((e: string) => {
                if (e.indexOf('pc_admin_banner_list') != -1) {
                    bannerArr.push(e)
                }
                if (e.indexOf('system_notice_title') != -1) {
                    textAnnouncement.push(e)
                }
            })

            this.bannerArr = bannerArr
            this.textAnnouncement = textAnnouncement

        },
        async setActivityTitleList(value: any) {
            let list: Array<string> = []




            value.map((e: any) => {
                if (i18n.global.t(e.pic_link).indexOf('http') != -1) {
                    list.push(e.tag)
                }
            })


            if (list.length > 0) {
                let obj: any = {
                    home_page_all: value
                }
                let newList = Array.from(new Set(list))

                newList.map((e: any) => {
                    obj[e] = []
                    value.map((j: any) => {
                        if (j.tag == e) {

                            obj[e].push(j)
                        }
                    })
                })
                this.activityList = value
                this.activityTitleList = obj

            }



        },

        async setTextAnnouncementMore(str: string) {
            this.textAnnouncement.push(str)
            this.textAnnouncement.splice(0, 0)
        },
        async setServiceUrlArr(obj: any) {
            this.serviceUrlObj = obj
        },

        async setBankListInfo(v: any, statusArr: any) {
            // 添加银行维护状态，0 维护，1 开启
            const data = v.map((item: any, index: number) => {
                return {
                    value: item.bank_id,
                    label: item.bank_name,
                    status: statusArr[index]
                }
            }).sort((a: any, b: any) => {
                return b.status - a.status
            });
            this.bankListInfo = [...data];
        },


    },
});
