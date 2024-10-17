import { defineStore } from 'pinia';

interface WalletState {
    showDeposit: boolean;
    showWithdraw: boolean;
    showRedeemCode: boolean;
    showAddBank: boolean;
    showAddUsdt: boolean;
    showDialogTransfer: boolean;
    showTransfer: {
        method: string;
        from: string;
        to: string;
    };
}
export const Wallet = defineStore({
    id: 'walletInfo',
    persist: true,
    state: (): WalletState => ({
        showDeposit: false,
        showWithdraw: false,
        showRedeemCode: false,
        showAddBank: false,
        showAddUsdt: false,
        showDialogTransfer: false,
        showTransfer: { method: 'in', from: '', to: '' }
    }),
    actions: {
        setShowDeposit(v: boolean) {
            this.showDeposit = v;
        },
        setShowWithdraw(v: boolean) {
            this.showWithdraw = v;
        },
        setShowRedeemCode(v: boolean) {
            this.showRedeemCode = v;
        },
        setShowAddBank(v: boolean) {
            this.showAddBank = v;
        },
        setShowAddUsdt(v: boolean) {
          this.showAddUsdt = v;
        },
        setDialogShowTransfer(v: boolean) {
          this.showDialogTransfer = v;
        },
        setShowTransfer(v: string = '', from: string = '', to: string = '') {
          this.showTransfer.method = v;
          this.showTransfer.from = from;
          this.showTransfer.to = to;
        }
    },
});
