import { TPayment } from "@/utils/types/paymentTypes"
import pinia from '@/store/index';
import { Wallet } from "@/store";

export default () => {
    const wallet = Wallet(pinia);

    const MOCKPAYMENTS: TPayment[] = [
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412349781' },
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412340002' },
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412341233' },
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412340004' },
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412340005' },
        { bank: 'PKBet', bankImgURL: '/img/payment/mockBank.webp', number: '1234123412340006' },
    ];

    const showAddBankModal = (v: boolean) => wallet.setShowAddBank(v);
    return { MOCKPAYMENTS, showAddBankModal };
};
