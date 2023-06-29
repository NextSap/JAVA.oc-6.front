import React from 'react';
import Layout from "@/components/layout/Layout";
import Transfer from "@/components/page/Transfer";
import {useUserStore} from "@/stores/user.store";
import {useTransactionStore} from "@/stores/transaction.store";
import Button from "@/components/ui/Button";
import {useRouter} from "next/router";

const TransferPage = () => {
    const router = useRouter();
    const [page, setPage] = React.useState<number>(1);
    const userStore = useUserStore();
    const transactionStore = useTransactionStore();

    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isErrorUser,
        isIdle: isIdleUser
    } = userStore.getUser();
    const {
        data: transactions,
        isLoading: isLoadingTransactions,
        isError: isErrorTransactions,
        isIdle: isIdleTransactions
    } = transactionStore.getTransactions(page, 10);

    const {
        data: paginationInfo,
        isLoading: isLoadingPaginationInfo,
        isError: isErrorPaginationInfo,
        isIdle: isIdlePaginationInfo
    } = transactionStore.getPaginationInfo(10);

    const totalPages = paginationInfo?.totalPages as number;

    if (isErrorUser || isErrorTransactions || isErrorPaginationInfo) return <p>Error</p>;

    return (
        <Layout isLoading={isLoadingUser || isLoadingTransactions || isLoadingPaginationInfo || isIdleTransactions || isIdlePaginationInfo || isIdleUser}>
            <div className="flex flex-col justify-center items-center w-[80%] p-5">
                <div className="flex justify-end w-full mb-5">
                    <Button className="p-2 w-32" onClick={() => router.push("/transfer/new")}>New transfer</Button>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-between p-3 w-full text-white bg-[#273f52]">
                        <p className="w-[25%]">Exchanger</p>
                        <p className="w-[50%]">Description</p>
                        <p className="w-[25%] text-right">Amount</p>
                    </div>
                    {transactions?.map((transaction, index) => {
                        return <Transfer user={user} key={index} transaction={transaction}
                                         contrasted={index % 2 == 0}/>;
                    })}
                </div>
                <div className="flex justify-center items-center gap-3 p-5">
                    <Button className="w-20" onClick={() => setPage(page - 1)} disabled={page == 1}>Previous</Button>
                    <p>{page} / {totalPages}</p>
                    <Button className="w-20" onClick={() => setPage(page + 1)} disabled={page == totalPages}>Next</Button>
                </div>
            </div>
        </Layout>
    );
};

export default TransferPage;