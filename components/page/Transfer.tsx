import React from 'react';
import {TransactionResponseSchemaType} from "@/objects/response/transaction.response";
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {useUserStore} from "@/stores/user.store";
import {fullName, isSender} from "@/utils/Transaction.utils";

type TransferProps = {
    contrasted: boolean;
    transaction: TransactionResponseSchemaType;
    user?: UserResponseSchemaType;
}

const Transfer = (props: TransferProps) => {

    const sender = useUserStore().getUserByEmail(props.transaction.sender).data;
    const receiver = useUserStore().getUserByEmail(props.transaction.receiver).data;

    if (!props.user || !sender || !receiver) return <p>Error</p>;

    const userEmail = props.user.email;

    return (
        <div style={{backgroundColor: props.contrasted ? "#F2F2F2" : "#E8E8E8"}} className="flex justify-around p-3 w-full">
            <div className="w-[25%]">
                {isSender(props.transaction, userEmail) ? `← ${fullName(receiver)}` : `→ ${fullName(sender)}`}
            </div>
            <div className="w-[50%]">
                {props.transaction.description}
            </div>
            <div className="w-[25%] text-right">
                {isSender(props.transaction, userEmail) ?
                    <span className="text-red-500">- {props.transaction.amount.toFixed(2)} €</span> :
                    <span className="text-green-500">+ {props.transaction.amount.toFixed(2)} €</span>}
            </div>
        </div>
    );
};


export default Transfer;