export interface IWallet {
    walletRef?: string;
    availableBalance?: number;
    ledgerBalance?: number;
    isActive?: string;
    userId: number;
}

export interface WalletModel {
    id?: number;
    wallet_ref?: string;
    available_balance?: number;
    ledger_balance?: number;
    is_active?: string;
    email: string;
    user_id: number;
}

export interface IFundWalletModel {
    walletRef: string;
    amount: number;
}

export interface IWalletTransferModel {
    recipientWalletRef: string;
    amount: number;
    sourceAccountUserId: number
}
  