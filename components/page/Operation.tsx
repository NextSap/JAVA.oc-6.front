import React from 'react';
import {TransactionResponseSchemaType} from "@/objects/response/transaction.response";
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {formatLocalDate} from "@/utils/Date.utils";
import {useUserStore} from "@/stores/user.store";
import {fullName, isSender, truncate} from "@/utils/Transaction.utils";

type OperationProps = {
    transaction: TransactionResponseSchemaType;
    user: UserResponseSchemaType;
}

const Operation = (props: OperationProps) => {

    const userEmail = props.user.email;

    return (
        <div className="border rounded-xl bg-white p-5">
            <div className="flex flex-col">
                {renderSwitch(props.transaction, userEmail)}
                <p className="text-[15px]">{formatLocalDate(props.transaction.timestamp)} • {truncate(props.transaction.description)}</p>
            </div>
        </div>
    );
};

const renderSwitch = (transaction: TransactionResponseSchemaType, userEmail: string) => {
    const userStore = useUserStore();

    const sender = userStore.getUserByEmail(transaction.sender).data;
    const receiver = userStore.getUserByEmail(transaction.receiver).data;

    if (!sender || !receiver)
        return <p>Error</p>;

    if (isSender(transaction, userEmail))
        return (
            <>
                <p className="flex justify-between">
                    <span>← <span className="font-semibold">{fullName(receiver)}</span>
                    </span>
                    <span className="text-red-500">- {transaction.amount.toFixed(2)} €</span></p>
            </>
        );
    else
        return (
            <>
                <p className="flex justify-between">
                    <span>→ <span className="font-semibold">{fullName(sender)}</span>
                    </span>
                    <span className="flex flex-col items-end"><span className="text-green-500">+ {transaction.amount.toFixed(2)} €</span>
                        <span className="text-red-500">- {(transaction.amount * 0.005).toFixed(2)} €</span>
                    </span></p>
            </>
        );
};

export default Operation;