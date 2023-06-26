import {TransactionRequest} from "@/objects/requests/transaction.request";
import {
    TransactionArrayResponseSchema,
    TransactionResponseSchema,
    TransactionType
} from "@/objects/response/transaction.response";
import {api} from "@/config/ky.config";
import {base_url} from "@/config/service.config";

const endpoint: string = `${base_url}/transaction`;

export const getTransaction = async (id: string) => {
    return await api.get(`${endpoint}/${id}`).json().then(TransactionResponseSchema.parse);
}

export const getTransactionsWithFilter = async (page: number, size: number, filter: TransactionType) => {
    return await api.get(endpoint, {searchParams: {page: page, size: size, filter: filter}}).json().then(TransactionArrayResponseSchema.parse);
}

export const getTransactionsWithoutFilter = async (page: number, size: number) => {
    return await api.get(endpoint, {searchParams: {page: page, size: size}}).json().then(TransactionArrayResponseSchema.parse);
}

export const createTransaction = async (transactionRequest: TransactionRequest, type: TransactionType) => {
    return await api.post(endpoint, {json: transactionRequest, searchParams: {type: type}}).json().then(TransactionResponseSchema.parse);
}