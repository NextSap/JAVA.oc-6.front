import React from 'react';
import {useRouter} from "next/router";
import Layout from "@/components/layout/Layout";
import {useTransactionStore} from "@/stores/transaction.store";

const Transaction = () => {
    const router = useRouter();

    const id = router.query.id;

    const {data, isError, isLoading} = useTransactionStore().getTransaction(id as string);
    return (
        <Layout>
            <p>Transaction {router.query.id}</p>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
        </Layout>
    );
};

export default Transaction;