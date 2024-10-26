// 用户相关数据类型
export type TUserInfo = {
    account_type?: number,
    country?: number,
    currency?: number,
    email?: string,
    full_name?: string,
    mobile?: string,
    real_name?: string,
    usdt_rate?: number,
    hideString?: string,
    [key: string]: string,
};

// Role相关数据类型
export type TRoleInfo = {
    id?: string,
    agent_level?: number,
    currencyrate?: number,
    mobile?: string,
    nickname: string,
    money: number,
    bank_money: number,
    head_photo: string,
    vip_lv: number,
    password_state?: number,
    recharge_amount?: number,
    reserve0?: number,
    reserve1?: number,
    reserve2?: number,
    reserve3?: number,
    reserve4?: number,
    sex?: number,
    signature?: string,
    withdraw_pwd?: string,
    withdraw_pwd_status?: number,
    user_type?: number
};

// VIP相关数据类型
export type TMoneyStatus = {
    money?: number,
    status?: number
};

export type TVIPLevelReward = {
    gift_money_amount?: number,
    level?: number,
    target_bet_money?: number,
    promotional_reward_status?: TMoneyStatus
};

export type TVIPInfo = {
    current_vip_level: number,
    daily_rebate?: number,
    last_month_vip_level?: number,
    mysterious_reward_status?: number,
    total_bet_money?: number,
    gift_money_status?: TMoneyStatus,
    holiday_reward_status?: TMoneyStatus,
    vip_level_reward_config?: Array[TVIPLevelReward]
};