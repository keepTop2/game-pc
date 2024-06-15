/**
 * @description: 充值状态
 */
export const RechagreStatusMap: any = {
    '0': '失败',
    '-1': '进行中',
    '1': '已完成',
    '2': '回调成功',
}

/**
 * @description: 取款状态
 */
export const WithdrawStatusMap: any = {
    '0': '等待审核',
    '1': '打款中',
    '2': '已完成',
    '3': '审核异常',
}
export const WithdrawStatusColorMap: any = {
    '0': '#FABB2D',
    '1': '#FABB2D',
    '2': '#80FF44',
    '3': '#FF2424',
}


/**
 * @description: 转账类型
 */
export const AccountTypeMap: any = {
    '1': '提现',
    '2': '转账',
}
/**
 * @description: 钱包类型
 */
export const WalletTypeMap: any = {
    '1': '游戏钱包',
    '2': '中心钱包',
}

/**
 * @description: 货币
 */
export const CurrencyMap: any = {
    '1': '法币',
    '2': 'USDT',
}

/**
 * @description: 平台
 */
export const PlatformMap: any = {
    "1": "BY88",
    "2": "捕鱼",
    "3": "老虎机",
    "4": "视讯",
    "5": "棋牌",
    "6": "体育",
    "7": "彩票",
}

/**
 * @description: 稽核状态
 */
export const AuditStatusMap: any = {
    '1': '进行中',
    '2': '已完成',
}

export const ETransfer: any = {
    in: 'walletInfo_page_in',
    out: 'walletInfo_page_out'
};

export const EWallets: any = {
    zhenren: 'wallet_page_zhenren',
    sports: 'wallet_page_sports',
    esports: 'wallet_page_esports',
    chesscard: 'wallet_page_chesscard',
    lottery: 'wallet_page_lottery',
    electronic: 'wallet_page_electronic',
};

export const CenterWallet: any = 'wallet_page_central';

export const EAllWallets: any = { center: CenterWallet, ...EWallets };
