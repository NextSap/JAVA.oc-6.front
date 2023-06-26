export type TransactionResponse = {
    sender: string;
    receiver: string;
    description: string;
    amount: number;
    fees: number;
    timestamp: number;
    transactionType: TransactionType;
}

export enum TransactionType {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL",
    TRANSFER = "TRANSFER",
}