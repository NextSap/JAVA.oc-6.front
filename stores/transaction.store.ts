import * as transactionService from "@/services/transaction.service";
import {
    TransactionType
} from "@/objects/response/transaction.response";
import {toast} from "react-toastify";
import {TransactionRequest} from "@/objects/requests/transaction.request";
import {useQuery} from "react-query";
import {HTTPError} from "ky";

export const useTransactionStore = () => {
    const getTransactionsWithoutFilter = (page: number, size: number) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: ["transactions"],
            queryFn: () => transactionService.getTransactionsWithoutFilter(page, size),
            retry: 1,
        })

        return {
            data,
            isLoading,
            isError
        }
    }

    const getTransactionsWithFilter = (page: number, size: number, filter: TransactionType) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: ["transactions"],
            queryFn: () => transactionService.getTransactionsWithFilter(page, size, filter),
            retry: 1,
        })

        return {
            data,
            isLoading,
            isError
        }
    }

    const getTransaction = (id: string) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: ["transaction"],
            queryFn: () => transactionService.getTransaction(id),
            retry: 1,
            onError: (err: HTTPError) => {
                err.response.text().then((text: string) => {
                    toast.error("Transaction failed to load: " + JSON.parse(text).cause);
                })
            }
        })

        return {
            data,
            isLoading,
            isError
        }
    }

    const createTransaction = (transactionRequest: TransactionRequest, type: TransactionType) => {
        const {data, isLoading, isError} = useQuery({
            queryKey: ["transaction"],
            queryFn: () => transactionService.createTransaction(transactionRequest, type),
            retry: 1,
            onSuccess: () => {
                toast.success("Transaction created successfully!");
            },
            onError: () => {
                toast.error("Transaction failed to create!");
            }
        })

        return {
            data,
            isLoading,
            isError
        }
    }

    return {
        getTransactionsWithoutFilter,
        getTransactionsWithFilter,
        getTransaction,
        createTransaction,
    }
}