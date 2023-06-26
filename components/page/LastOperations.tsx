import React from 'react';
import {TransactionResponse} from "@/objects/response/transaction.response";
import Operation from "@/components/page/Operation";
import {UserResponse} from "@/objects/response/user.response";
import {useRouter} from "next/router";
import {useTransactionStore} from "@/stores/transaction.store";

const user: UserResponse = {
    email: "test@test.com",
    firstName: "Louis",
    lastName: "Di Ilio",
    contacts: [],
    balance: 300,
}

const LastOperations = () => {
    const router = useRouter();
    const {data, isLoading, isError} = useTransactionStore().getTransactionsWithoutFilter(1, 3);

    return (
        <div className="border rounded-xl bg-white p-5 w-[500px]">
            <p className="text-xl mb-3 font-semibold">Last operations</p>
            <div className="flex flex-col gap-3">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error</p>}
                {data?.length !== 0 ? data?.map((transaction: TransactionResponse) => {
                    return <Operation onClick={() => router.push("/transaction?id=" + transaction.id)}
                                      key={transaction.id} transaction={transaction} user={user}/>
                }) : <p>No operations</p>}
            </div>
        </div>
    );
};

export default LastOperations;