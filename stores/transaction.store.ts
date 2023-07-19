import * as transactionService from "@/services/transaction.service";
import {useQuery} from "react-query";
import {HTTPError} from "ky";
import {renderError} from "@/utils/Error.utils";

export const useTransactionStore = () => {
    const getTransactions = (page: number, size: number) => {
        return useQuery({
            queryKey: ["transactions", page, size],
            queryFn: () => transactionService.getTransactions(page, size),
            retry: 1,
            onError: (error: HTTPError) => {
                renderError(error, "Fetching transactions failed");
            }
        })
    }

    const getTransaction = (id: string) => {
        return useQuery({
            queryKey: ["transactions", id],
            queryFn: () => transactionService.getTransaction(id),
            retry: 1,
            enabled: id !== undefined,
            onError: (error: HTTPError) => {
                renderError(error, "Fetching transaction failed");
            }
        });
    }

    const getPaginationInfo = (size: number) => {
        return useQuery({
            queryKey: ["paginationInfo", size],
            queryFn: () => transactionService.getPaginationInfo(size),
            retry: 1,
            onError: (error: HTTPError) => {
                renderError(error, "Fetching pagination info failed");
            }
        });
    }

    return {
        getTransaction,
        getTransactions,
        getPaginationInfo
    }
}