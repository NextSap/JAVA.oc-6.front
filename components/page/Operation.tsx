import React from 'react';
import {TransactionResponse, TransactionType} from "@/objects/response/transaction.response";
import {UserResponse} from "@/objects/response/user.response";
import {formatLocalDate} from "@/utils/Date.utils";

type OperationProps = {
    transaction: TransactionResponse;
    user: UserResponse;
    onClick: () => void;
}

const Operation = (props: OperationProps) => {

    const userEmail = props.user.email;

    return (
        <div onClick={props.onClick} className="border rounded-xl bg-white p-5 hover:drop-shadow duration-300 cursor-pointer">
            <div className="flex flex-col">
                {renderSwitch(props.transaction, userEmail)}
                <p className="text-[15px]">{formatLocalDate(props.transaction.timestamp)}</p>
            </div>
        </div>
    );
};

const renderSwitch = (transaction: TransactionResponse, userEmail: string) => {
    switch (transaction.transactionType) {
        case TransactionType.DEPOSIT:
            return (
                <>
                    <p className="flex justify-between">DEPOSIT <span
                        className="text-green-500">+ {transaction.amount.toFixed(2)} €</span></p>
                </>
            );
        case TransactionType.WITHDRAWAL:
            return (
                <>
                    <p className="flex justify-between">WITHDRAWAL <span>- {transaction.amount.toFixed(2)} €</span></p>
                </>
            );
        case TransactionType.TRANSFER:
            return (
                <>
                    <p className="flex justify-between">{userEmail == transaction.sender ? transaction.receiver : transaction.sender} {userEmail == transaction.sender ?
                        <span>- {transaction.amount.toFixed(2)} €</span> :
                        <span className="text-green-500">+ {transaction.amount.toFixed(2)} €</span>}</p>
                </>
            );
    }
}

export default Operation;