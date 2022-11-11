export interface IWallet {
    walletRef?: string;
    availableBalance?: number;
    ledgerBalance?: string;
    isActive?: string;
    userId: number;
}

export interface WalletModel {
    id?: number;
    wallet_ref?: string;
    available_balance?: number;
    ledger_balance?: string;
    is_active?: string;
    email: string;
    user_id: number;
}

export interface IFundWalletModel {
    userId: number;
    amount: number;
}
  