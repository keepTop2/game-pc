<template>
    <div class="security_settings">
        <n-flex vertical class="items" v-for="(items, i) in state.list " :key="i">
            <span>{{ t(items.text) }}</span>
            <div v-if="items.btns">
                <span>{{ info[items.value] }}</span>
                <div v-if="items.btns.length > 0">
                    <span class="bind_btn" v-for="(item, j) in items.btns " :id="items.text" :key="j"
                        @click="itemClick(items)">
                        <iconpark-icon :icon-id="item.icon" size="1rem"></iconpark-icon>
                        {{ t(item.text) }}</span>
                </div>
            </div>
            <div v-else style="padding: 0;">
                <n-select v-model:value="items.value" :options="state.currencyList" />
            </div>
        </n-flex>
        <PopForm ref="FormRef" @nextChange="nextChange" @changeTab="changePasswordChangeTab" @submitData="submitData">
        </PopForm>
    </div>
</template>

<script setup lang='ts'>
// 国际化使用 homepage
import { onMounted, onUnmounted, reactive, defineAsyncComponent, ref } from 'vue';
import { MessageEvent2 } from '@/net/MessageEvent2';
import { NetMsgType } from '@/netBase/NetMsgType';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import { User } from '@/store/user';
import { aaa, bbb, getRandomSign, getDeviceId } from "@/net/Utils";
import { verifyCaptcha, verifyEmail, verifyMobile, verifyPassword, verifyPhoneCaptcha, verifyWithdrawPwd } from '@/utils/is';
import { NetPacket } from '@/netBase/NetPacket';
import { Net } from '@/net/Net';
import { useI18n } from 'vue-i18n';
import { Message } from '@/utils/discreteApi';
import { Local } from '@/utils/storage';
// import { useRoute } from "vue-router";
import { IP } from '@/utils/others';
const { t } = useI18n();
// const route = useRoute();
const PopForm = defineAsyncComponent(() => import('@/components/PopForm.vue'));
const userInfo = User(pinia);
const FormRef = ref()
const { info, roleInfo } = storeToRefs(userInfo);


const state: any = reactive({
    roleInfo: JSON.parse(JSON.stringify(roleInfo.value)),
    info: JSON.parse(JSON.stringify(info.value)),
    first: 1,
    checkPhoneOremail: false,
    params: null,
    type: 0,
    formData: null,
    list: [
        {
            text: 'home_page_name',
            value: 'real_name',
            btns: [],
        },
        {
            text: 'home_page_account',
            value: 'full_name',
            btns: [],
            formData: {
                title: 'home_page_modifyAccount',
                buttonText: 'home_page_modifyNow',
                showLabel: true,
                formParams: {
                    account: '',
                    operate_type: 2,
                },

                list: {
                    account: {
                        name: "account",
                        type: "text",
                        placeholder: 'home_page_enterAccount1',
                        label: 'home_page_account',
                        slot: !1,
                        leftIcon: "",
                        changeRightIcon: !1,
                        show: true,
                    },
                }
            },
            type: 1
        },
        {
            text: 'home_page_password',
            value: 'hideString',

            btns: [
                { text: 'home_page_modify', icon: 'Group39376', value: 1 }
            ],
            formData: {
                active: 0,
                step: '',  //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
                buttonText: 'home_page_modifyNow',
                title: 'home_page_modifyPassword',
                showLabel: true,
                tabList: [
                    { name: 'home_page_generalModifications', value: 0 },
                    { name: 'home_page_modifyPhone', value: 1 },
                    { name: 'home_page_modifyEmail', value: 2 },
                ],
                formParams: {
                    operate_type: 2, //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
                    modify_type: 1, //1表示常规修改密码，modify_type=2表示通过手机修改密码，modify_type=3表示通过邮箱修改密码
                    phoneCode: "",
                    emailCode: "",
                    mobile: info.value.mobile?.slice(2) || "",
                    email: info.value.email || '',
                    old_password: '',
                    new_password: "",
                    new_password_confirm: "",
                    codeValue: info.value.mobile?.slice(0, 2) || "",
                },

                list: {
                    mobile: {
                        name: "mobile",
                        type: "text",
                        placeholder: 'home_page_enterPhoneNumber',
                        label: 'home_page_phone',
                        slot: !1,
                        leftIcon: false,
                        changeRightIcon: !1,
                        show: false,
                        isMobile: true,
                        disabled: info.value.mobile ? true : false,

                    },

                    email: {
                        name: "email",
                        type: "text",
                        placeholder: 'home_page_enterEmail',
                        label: 'home_page_email',
                        slot: !1,
                        // leftIcon: "Group39361",
                        changeRightIcon: !1,
                        show: false,
                        disabled: info.value.email ? true : false,

                    },
                    old_password: {
                        name: "old_password",
                        type: "password",
                        placeholder: 'home_page_enterOldPassword',
                        label: 'home_page_oldPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: true,
                    },
                    new_password: {
                        name: "new_password",
                        type: "password",
                        placeholder: 'home_page_enterNewPassword',
                        label: 'home_page_newPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: true,
                    },
                    new_password_confirm: {
                        name: "new_password_confirm",
                        type: "password",
                        placeholder: 'home_page_enterAgainNewPassword',
                        label: 'home_page_newPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: true,
                    },
                    phoneCode: {
                        name: "phoneCode",
                        type: "code",
                        placeholder: 'home_page_enterSmsCode',
                        label: 'home_page_smsCode',
                        slot: !0,
                        // leftIcon: "Group39363",
                        changeRightIcon: !1,
                        show: false,
                        disabled: info.value.mobile ? false : true,
                        loading: false,
                        timeText: 'home_page_send',
                        timer: null,
                        btnDisabled: false,
                    },
                    emailCode: {
                        name: "emailCode",
                        type: "code",
                        placeholder: 'home_page_enterVerificationCode',
                        label: 'home_page_verificationCode',
                        slot: !0,
                        // leftIcon: "Group39363",
                        changeRightIcon: !1,
                        show: false,
                        disabled: info.value.email ? false : true,
                        loading: false,
                        timeText: 'home_page_send',
                        timer: null,
                        btnDisabled: false,
                    },
                },
            },
            type: 3
        },
        {
            text: 'home_page_email',
            value: 'email',
            btns: [
                { text: 'home_page_bind', icon: 'Group39377', value: 0 },
                // { text: '修改', icon: 'Group39376', value: 1 }
            ],
            formData: {
                buttonText: 'home_page_bindNow',
                title: 'home_page_bindEmail',
                active: 2,
                showLabel: true,
                formParams: {
                    operate_type: 1, //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
                    modify_type: 1, //1表示常规修改密码，modify_type=2表示通过手机修改密码，modify_type=3表示通过邮箱修改密码
                    verify_code: "",
                    emailCode: '',
                    email: '',
                },

                list: {
                    email: {
                        name: "email",
                        type: "text",
                        placeholder: 'home_page_enterEmail',
                        label: 'home_page_email',
                        slot: !1,
                        leftIcon: "Group39361",
                        changeRightIcon: !1,
                        show: true,
                    },

                    emailCode: {
                        name: "emailCode",
                        type: "code",
                        placeholder: 'home_page_enterVerificationCode',
                        label: 'home_page_verificationCode',
                        slot: !0,
                        leftIcon: "Group39363",
                        changeRightIcon: !1,
                        show: true,
                        disabled: true,
                        loading: false,
                        timeText: 'home_page_send',
                        timer: null,
                        btnDisabled: false,
                    },
                },
            },
            type: 4,

        },
        {
            text: 'home_page_phone',
            value: 'mobile',
            btns: [
                { text: 'home_page_bind', icon: 'Group39377', value: 0 },
                // { text: '修改', icon: 'Group39376', value: 1 }
            ],
            formData: {
                buttonText: 'home_page_bindNow',
                title: 'home_page_bindPhone',
                active: 1,
                showLabel: true,
                formParams: {
                    operate_type: 3, //1表示点击下一步需要校验手机或者邮箱是否已经绑定，验证码是否正确；operate_type=2表示立即修改密码
                    modify_type: 1, //1表示常规修改密码，modify_type=2表示通过手机修改密码，modify_type=3表示通过邮箱修改密码
                    verify_code: "",
                    mobile: "",
                    codeValue: '84',
                },

                list: {
                    mobile: {
                        name: "mobile",
                        type: "text",
                        placeholder: 'home_page_enterPhoneNumber',
                        label: 'home_page_phone',
                        slot: !1,
                        leftIcon: false,
                        changeRightIcon: !1,
                        show: true,
                        isMobile: true
                    },
                    phoneCode: {
                        name: "phoneCode",
                        type: "code",
                        placeholder: 'home_page_enterSmsCode',
                        label: 'home_page_smsCode',
                        slot: !0,
                        leftIcon: "Group39363",
                        changeRightIcon: !1,
                        show: true,
                        disabled: true,
                        loading: false,
                        timeText: 'home_page_send',
                        timer: null,
                        btnDisabled: false,
                    },
                },
            },
            type: 5,

        },
        // {
        //     text: 'home_page_currency',
        //     value: 'VND',
        //     type: 9
        // },
        {
            text: 'home_page_fundPassword',
            value: 'hideString',
            btns: [
                { text: 'home_page_modify', icon: 'Group39376', value: 1 }
            ],
            formData: {
                buttonText: 'home_page_bindNow',
                title: 'home_page_bindFundPassword',
                showLabel: true,
                formParams: {
                    operate_type: 1, // 1表示绑定资金密码；operate_type=2表示修改资金密码
                    old_withdrawPwd: '',
                    new_withdrawPwd: "",
                    new_withdrawPwd_confirm: '',
                },

                list: {
                    old_withdrawPwd: {
                        name: "old_withdrawPwd",
                        type: "password",
                        placeholder: 'home_page_enterOldPassword',
                        label: 'home_page_oldPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: false,
                    },
                    new_withdrawPwd: {
                        name: "new_withdrawPwd",
                        type: "password",
                        placeholder: 'home_page_enterNewPassword',
                        label: 'home_page_newPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: true,
                    },
                    new_withdrawPwd_confirm: {
                        name: "new_withdrawPwd_confirm",
                        type: "password",
                        placeholder: 'home_page_enterAgainNewPassword',
                        label: 'home_page_newPassword',
                        slot: !0,
                        // leftIcon: "Group39362",
                        changeRightIcon: "Group39364",
                        show: true,
                    },

                },
            },
            type: 10,
        },
    ],
    currencyList: [
        { label: 'VND', value: 1 },
        // { label: 'USDT', value: 2 }
    ],

})
// 点击修改某一项
const itemClick = (item: any) => {
    let rules = {
        mobile: [
            {
                key: 'mobile',
                required: !0,
                trigger: "input",
                validator: (_rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterPhoneNumber'))
                    } else
                        if (verifyMobile(state.formData.formParams.codeValue, value)) {
                            state.formData.list.phoneCode.disabled = false
                            return true
                        } else {
                            state.formData.list.phoneCode.disabled = true
                            return new Error(t('home_page_phoneNumberFormatIncorrect'))
                        }

                },
            },
        ],
        verify_code: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterVerificationCode'))
                    } else
                        if (verifyCaptcha(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_verificationCodeFormatIncorrect'))
                        }
                },
            },
        ],
        email: [
            {
                key: 'email',
                required: !0,
                trigger: "input",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterEmail'))
                    } else
                        if (verifyEmail(rule, state.formData.formParams.email)) {
                            state.formData.list.emailCode.disabled = false
                            return true
                        } else {
                            state.formData.list.emailCode.disabled = true
                            return new Error(t('home_page_emailIncorrect'))
                        }
                },

            },
        ],
        old_password: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterPassword'))
                    } else
                        if (verifyPassword(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_passwordFormatIncorrect'))
                        }
                },

            },
        ],
        new_password: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterNewPassword'))
                    } else
                        if (verifyPassword(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_passwordFormatIncorrect'))
                        }
                },


            },
        ],
        new_password_confirm: [
            {
                required: !0,
                trigger: "blur",
                validator: (_rule: any, value: any) => {
                    if (!value) {
                        return new Error(t('home_page_enterAgainNewPassword'))
                    } else
                        if (value != state.formData.formParams.new_password) {
                            return new Error(t('home_page_passwordsInconsistent'))
                        } else {
                            return true
                        }
                },
            },
        ],
        old_withdrawPwd: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterOldPassword'))
                    } else
                        if (verifyWithdrawPwd(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_passwordFormatIncorrect'))
                        }
                },


            },
        ],
        new_withdrawPwd: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterAgainNewPassword'))
                    } else
                        if (verifyWithdrawPwd(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_passwordFormatIncorrect'))
                        }
                },

            },
        ],
        new_withdrawPwd_confirm: [
            {
                required: !0,
                trigger: "blur",
                validator: (_rule: any, value: any) => {
                    if (!value) {
                        return new Error(t('home_page_enterAgainNewPassword'))
                    }
                    if (value != state.formData.formParams.new_withdrawPwd) {
                        return new Error(t('home_page_passwordsInconsistent'))
                    } else {
                        return true
                    }
                },

            },
        ],
        phoneCode: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterSmsCode'))
                    } else
                        if (verifyPhoneCaptcha(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_smsCodeFormatIncorrect'))
                        }
                },



            },
        ],
        emailCode: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterSmsCode'))
                    } else
                        if (verifyCaptcha(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_smsCodeFormatIncorrect'))
                        }
                },
            },
        ],
        account: [
            {
                required: !0,
                trigger: "blur",
                validator: (rule: any, value: string) => {
                    if (!value) {
                        return new Error(t('home_page_enterAccount1'))
                    } else
                        if (verifyPassword(rule, value)) {
                            return true
                        } else {
                            return new Error(t('home_page_accountFormatIncorrect'))
                        }
                },
            },
        ],

    }
    item.formData.rules = rules

    if (item.type == 3) {
        if (!info.value.mobile) {
            let mobileIndex = item.formData.tabList.findIndex((e: any) => e.value == 1)
            if (mobileIndex != -1) {
                item.formData.tabList.splice(mobileIndex, 1)
            }
        }
        if (!info.value.email) {
            let emailIndex = item.formData.tabList.findIndex((e: any) => e.value == 2)
            if (emailIndex != -1) {
                item.formData.tabList.splice(emailIndex, 1)
            }
        }
    }
    state.formData = item.formData
    FormRef.value.openDialog(item.formData, item.type)
}

// 更改密码或验证验证码
const changePassword = (params: any, type: number) => {
    let req = NetPacket.req_reset_account_password();
    // 点击下一步验证手机或邮箱是否绑定
    if (type == 1) {
        req.operate_type = 1
        state.checkPhoneOremail = true
    } else {
        req.operate_type = 2
    }
    if (state.formData.active == 1) {
        req.username = params.codeValue + params.mobile

        req.captcha = params.phoneCode
    }
    if (state.formData.active == 2) {
        req.username = params.email
        req.captcha = params.emailCode
    }

    req.modify_type = params.modify_type

    // req.username = info.value?.full_name
    req.old_password = params.old_password
    req.new_password = params.new_password
    req.new_password_confirm = params.new_password_confirm

    Net.instance.sendRequest(req);
};
const checkAccount = (params: any, _type: number) => {
    let req = NetPacket.req_can_modify_account();
    req.newusername = params.account;
    req.operate_type = 2;
    Net.instance.sendRequest(req);
}
// 修改会员账号和绑定邮箱和绑定手机号
const changeEmailAndPhoneAndAccount = async (params: any, type: number) => {

    let req = NetPacket.req_bind_modify_email();
    // 1为修改会员账号 4 为绑定邮箱 5为绑定手机号
    if (type == 1) {
        req.username = params.account;
    }
    if (type == 4) {
        req.email = params.email;
        req.username = info.value?.full_name;
        req.captcha = params.emailCode;
        state.info.email = params.email
    }
    if (type == 5) {
        req.email = params.codeValue + params.mobile;
        req.username = info.value?.full_name;
        req.captcha = params.phoneCode;
        state.info.mobile = req.email
    }


    req.operate_type = params.operate_type;
    req.agent_id = roleInfo.value.id; //Local.get('agentid')
    req.aaa = aaa;
    req.bbb = bbb;
    req.ip = await IP();
    let id = await getDeviceId()
    req.sign = getRandomSign(id);

    Net.instance.sendRequest(req);
}
// 修改资金密码
const changeMoneyPassword = (params: any) => {
    let req = NetPacket.req_bind_or_modify_withdraw_password();
    req.operate_type = params.operate_type
    req.old_password = params.old_withdrawPwd
    req.new_password = params.new_withdrawPwd
    req.role_id = roleInfo.value?.id
    req.new_password_confirm = params.new_withdrawPwd_confirm
    state.roleInfo.withdraw_pwd = params.new_withdrawPwd
    Net.instance.sendRequest(req);
}
// 某一个表格返回的数据 进行请求操作。
const submitData = (params: any, type: number) => {
    state.params = params
    state.type = type
    let obj: any = {
        1: checkAccount,
        2: changeEmailAndPhoneAndAccount,
        3: changePassword,
        4: changeEmailAndPhoneAndAccount,
        5: changeEmailAndPhoneAndAccount,
        10: changeMoneyPassword,
    }
    obj[type](params, type)
    // console.log(params, type);

}
// 更改tab时
const changePasswordChangeTab = (tabId: number) => {
    state.formData.active = tabId;
    if (state.formData.active == 0) {
        state.formData.list.old_password.show = true
        state.formData.list.new_password.show = true
        state.formData.list.new_password_confirm.show = true
        state.formData.formParams.modify_type = 1
        state.formData.buttonText = t('home_page_modifyNow')
        state.formData.step = 0
    }
    if (state.formData.active == 1) {
        state.formData.list.mobile.show = true
        state.formData.list.phoneCode.show = true
        state.formData.formParams.modify_type = 2
        state.formData.buttonText = t('home_page_next')
        state.formData.step = 1
    }
    if (state.formData.active == 2) {
        state.formData.list.email.show = true
        state.formData.list.emailCode.show = true
        state.formData.formParams.modify_type = 3
        state.formData.buttonText = t('home_page_next')
        state.formData.step = 1
    }

}
// 下一步
const nextChange = (formData: any) => {
    changePassword(formData, 1)
}
// 请求是否可以更改此账号
const getModifyAccount = () => {
    const req = NetPacket.req_can_modify_account();
    req.newusername = info.value?.real_name || ''
    req.operate_type = 1
    Net.instance.sendRequest(req);
};
const resetInputHide = () => {
    for (const key in state.formData.list) {
        state.formData.list[key].show = false
    }
}
// 请求是否可以修改或绑定资金密码
const getModifyWithdrawPassword = () => {
    const req = NetPacket.req_open_or_close_withdraw_password();
    req.operate_type = 4
    req.role_id = roleInfo.value?.id;
    Net.instance.sendRequest(req);
};
// 返回修改密码是否成功或验证手机或邮箱是否绑定
const handleChangePassword = async (res: any) => {
    if (state.checkPhoneOremail) {
        if (res.code == 1) {
            resetInputHide()
            state.formData.buttonText = 'home_page_modifyNow'
            state.formData.step = 2
            state.formData.list.new_password.show = true
            state.formData.list.new_password_confirm.show = true
            state.checkPhoneOremail = false
        }
    } else {
        if (res.code == 1) {
            Message.success(t(res.message))
            FormRef.value.closeDialog()
            await User(pinia).setHasLogin(false)
            Local.remove('user')
            location.href = '/'

        }
    }
}
// 返回是否更改邮箱成功
const handleChangeEmail = (res: any) => {
    if (res.code == 1) {
        Message.success(t(res.message))

        User(pinia).getInfo(state.info)

        setTimeout(() => {
            FormRef.value.closeDialog()
        }, 2000);
    }
}
// 返回是否可以进行修改或绑定资金密码
const handleModifyWithdrawPassword = (res: any) => {
    let findWithdrawPassword = state.list.find((e: any) => e.type == 10)
    // { text: '修改', icon: 'Group39376', value: 1 }
    if (res.code == 1) {
        findWithdrawPassword.formData.formParams.operate_type = 2
        findWithdrawPassword.btns = [{ text: 'home_page_modify', icon: 'Group39376', value: 1 }]
        findWithdrawPassword.formData.list.old_withdrawPwd.show = true
        findWithdrawPassword.formData.title = 'home_page_changeFundPassword'
        findWithdrawPassword.formData.buttonText = 'home_page_modifyNow'
    }
    if (res.code == 2) {
        findWithdrawPassword.value = ''
        findWithdrawPassword.formData.formParams.operate_type = 1
        findWithdrawPassword.btns = [{ text: 'home_page_bind', icon: 'Group39377', value: 2 }]
        findWithdrawPassword.formData.list.old_withdrawPwd.show = false
        findWithdrawPassword.formData.title = 'home_page_bindFundPassword'
        findWithdrawPassword.formData.buttonText = 'home_page_bindNow'
    }
}
// 获取后台通知是否可以更改此账号 并监听是否更改成功
const handleModifyAccount = (res: any) => {
    if (state.first == 1) {
        let find = state.list.find((e: any) => e.type == 1)
        if (res.code == 1) {
            find.btns = [{ text: 'home_page_modify', icon: 'Group39376', value: 1 }]
            state.first = 2
        } else {
            find.btns = []
        }
    } else {
        if (res.code == 1) {

            changeEmailAndPhoneAndAccount(state.params, 1)
        }
    }
}
const handleBindOrModifyWithdrawPassword = (res: any) => {
    if (res.code == 1) {
        let findWithdrawPassword = state.list.find((e: any) => e.type == 10)
        findWithdrawPassword = JSON.parse(JSON.stringify(findWithdrawPassword))
        let index = state.list.findIndex((e: any) => e.type == 10)
        findWithdrawPassword.value = 'hideString'
        findWithdrawPassword.formData.formParams.operate_type = 2
        findWithdrawPassword.btns = [{ text: 'home_page_modify', icon: 'Group39376', value: 1 }]
        findWithdrawPassword.formData.list.old_withdrawPwd.show = true
        findWithdrawPassword.formData.title = 'home_page_changeFundPassword'
        findWithdrawPassword.formData.buttonText = 'home_page_modifyNow'

        // 清空
        for (let key in findWithdrawPassword.formData.list) {
            findWithdrawPassword.formData.formParams[key] = ''
        }
        state.list[index] = findWithdrawPassword
        Message.success(t(res.message))
        User(pinia).getRoleInfo(state.roleInfo)
        setTimeout(() => {
            FormRef.value.closeDialog()
        }, 2000);
    }
}
onMounted(async () => {
    let req_user_info = NetPacket.req_user_info();
    Net.instance.sendRequest(req_user_info);

    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_open_or_close_withdraw_password,
        handleModifyWithdrawPassword
    );
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_can_modify_account,
        handleModifyAccount
    );
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_bind_or_modify_withdraw_password,
        handleBindOrModifyWithdrawPassword
    );
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_bind_modify_email,
        handleChangeEmail
    );
    MessageEvent2.addMsgEvent(
        NetMsgType.msgType.msg_notify_reset_account_password,
        handleChangePassword
    );
    let findEmail = state.list.find((e: any) => e.type == 4)
    let findPhone = state.list.find((e: any) => e.type == 5)

    if (info.value?.mobile) {
        findPhone.btns = []

    }
    if (info.value?.email) {
        findEmail.btns = []

    }


    getModifyAccount()
    getModifyWithdrawPassword()
    // }, 600);

})
onUnmounted(() => {
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_can_modify_account, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_bind_modify_email, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_open_or_close_withdraw_password, null);
    MessageEvent2.removeMsgEvent(NetMsgType.msgType.msg_notify_reset_account_password, null);

});
</script>

<style lang='less' scoped>
@timestamp: `new Date().getTime()`;

.security_settings {
    width: 500px;
    margin: 0 auto;
    font-size: 16px;
    color: #8e82c2;
    padding-bottom: 50px;

    .items {
        margin-bottom: 20px;

        >div {
            width: 500px;
            height: 45px;
            padding: 0 5px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, 0.25);
            background-blend-mode: color-burn, overlay, normal;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5) 200%), radial-gradient(circle at 50% 50%, #7e7e7e, #151515 100%), linear-gradient(to bottom, #27155c, #27155c);
            background-color: #27155c;

            >div {
                display: flex;

                align-items: center;

                .bind_btn {
                    width: 84px;
                    height: 38px;
                    box-sizing: border-box;
                    display: flex;
                    margin-left: 10px;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    cursor: pointer;
                    background: url('/img/securitySettings/btnBg.webp?t=@{timestamp}') no-repeat;
                    background-size: contain;
                }
            }


        }
    }

    :deep(.n-base-selection .n-base-selection-label) {
        background: transparent;

    }

    :deep(.n-base-selection .n-base-selection__border) {
        border: none;
    }

    :deep(.n-base-selection .n-base-selection__state-border) {
        border: none;
    }

    :focus-visible {
        outline: none;
    }
}
</style>
