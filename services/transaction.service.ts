import {TransactionRequest} from "@/objects/requests/transaction.request";
import {TransactionResponse, TransactionType} from "@/objects/response/transaction.response";
import {api} from "@/config/ky.config";
import {basedUrl} from "@/config/service.config";

const endpoint: string = `${basedUrl}/transaction`;

export const getTransactionsWithFilter = async (page: number, size: number, filter: TransactionType): Promise<TransactionResponse[]> => {
    return await api.get(endpoint, {searchParams: {page: page, size: size, filter: filter}}).json();
}

export const getTransactionsWithoutFilter = async (page: number, size: number): Promise<TransactionResponse[]> => {
    return await api.get(endpoint, {searchParams: {page: page, size: size}}).json();
}

export const createTransaction = async (transactionRequest: TransactionRequest, type: TransactionType): Promise<TransactionResponse> => {
    return await api.post(endpoint, {json: transactionRequest, searchParams: {type: type}}).json();
}