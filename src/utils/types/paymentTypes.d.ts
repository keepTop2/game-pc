import { DefineComponent } from "vue";

export type TPayment = {
    currency?: string;
    bank: string;
    bankImgURL: string;
    number?: string;
    name?: string
};

export type TBank = {
    pay_id: number;
    pay_name: string;
};

export type TDiscount = {
    discount_ID: number;
    name: string;
    ratio: number;
    limit: number;
    require: number;
    restrict: string;
};

export type TDcComp = DefineComponent<{
    name: string,

}>;

export type TRechargeByPaymenttype = {
    payname?: string;
    paymenttype?: number;
    paymethod?: string;
    maxrecharge?: number;
    minrecharge?: number;
};

export type TShopInfo = {
    bank_list: TBank[];
    discount_list: TDiscount[];
    rechargelist_by_paymenttype: TRechargeByPaymenttype[];
    is_speical_player: number;
    usdt_viet_rate: number;
};

export type TBankCard = {
    account_number: string,
    bank_id: number,
    bank_name: string
};

export type TBankCardInfoList = {
    bank_card_info_list: Array<TBankCard>,
    cardholder_name: string,
    max_withdraw_money: number,
    min_withdraw_money: number
};
