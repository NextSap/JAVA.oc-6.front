import React from 'react';
import {TransactionResponseSchemaType} from "@/objects/response/transaction.response";
import Operation from "@/components/page/Operation";
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {useRouter} from "next/router";
import {useTransactionStore} from "@/stores/transaction.store";
import Button from "@/components/ui/Button";
import Loading from "@/components/page/Loading";

type LastOperationsProps = {
    user: UserResponseSchemaType;
}
const LastOperations = (props: LastOperationsProps) => {
    const router = useRouter();
    const {data, isLoading, isError} = useTransactionStore().getTransactions(1, 3);

    return (
        <div className="flex flex-col border rounded-xl bg-white p-5 w-[500px] gap-5">
            <p className="text-xl font-semibold">Last operations</p>
            <div className="flex flex-col gap-3">
                {isLoading && <Loading/>}
                {isError && <p>Error</p>}
                {data?.length !== 0 ? data?.map((transaction: TransactionResponseSchemaType) => {
                    return <Operation
                        key={transaction.id} transaction={transaction} user={props.user}/>
                }) : <p>No operations</p>}
            </div>
            <Button onClick={() => router.push("/transfer")}>See all</Button>
        </div>
    );
};

export default LastOperations;