
import { defineStore } from 'pinia';
import { Local } from '@/utils/storage';

/**
 * 页面信息
 * @methods setUserInfos 设置用户信息
 */
interface PageState {
    menuActive: number
    menuName: string
    countryOptions: any
    bannerArr: Array<string>
    textAnnouncement: Array<string>
    serviceUrlObj: any
    settings: any,
    activityList: any,
    activityTitleList: any
    bankListInfo: any
}
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
        activityTitleList: null,
        bankListInfo: []
    }),
    actions: {
        // 获取标签下拉选择框数据
        async setMenuActive(value: number, name: string) {
            Local.set('menuActive', value)
            Local.set('menuName', name)
            this.menuActive = value
            this.menuName = name
        },
        async setBannerArr(arr: Array<string>) {
            this.bannerArr = arr
        },
        async setSettings(value: any) {
            this.settings = value
        },
        async activityTitleList(value: any) {
            let list: Array<string> = []


            let obj: any = {}

            value.map((e: any) => {
                list.push(e.tag)
            })
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

        },
        async setTextAnnouncement(arr: Array<string>) {
            this.textAnnouncement = arr
        },
        async setTextAnnouncementMore(str: string) {
            this.textAnnouncement.push(str)
            this.textAnnouncement.splice(0, 0)
        },
        async setServiceUrlArr(obj: any) {
            this.serviceUrlObj = obj
        },

        async setBankListInfo(v: any) {
            let data = v.map((item: any) => { return { value: item.bank_id, label: item.bank_name } });
            this.bankListInfo = [...data];
        },


    },
});
