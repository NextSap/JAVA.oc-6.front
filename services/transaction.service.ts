import {TransactionRequestSchemaType} from "@/objects/requests/transaction.request";
import {
    PaginationInfoResponseSchema,
    TransactionArrayResponseSchema,
    TransactionResponseSchema
} from "@/objects/response/transaction.response";
import {api} from "@/config/ky.config";
import {base_url} from "@/config/service.config";

const endpoint: string = `${base_url}/transaction`;

export const getTransaction = async (id: string) => {
    return await api.get(`${endpoint}/${id}`).json().then(TransactionResponseSchema.parse);
}

export const getTransactions = async (page: number, size: number) => {
    return await api.get(endpoint, {searchParams: {page: page, size: size}}).json().then(TransactionArrayResponseSchema.parse);
}

export const createTransaction = async (transactionRequest: TransactionRequestSchemaType) => {
    return await api.post(endpoint, {json: transactionRequest}).json().then(TransactionResponseSchema.parse);
}

export const getPaginationInfo = async (size: number) => {
    return await api.get(`${endpoint}/paginationInfo`, {searchParams: {size: size}}).json().then(PaginationInfoResponseSchema.parse);
}