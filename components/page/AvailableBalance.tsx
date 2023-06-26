import React from 'react';
import Button from "@/components/ui/Button";

type AvailableBalanceProps = {
    balance: number;
}

const AvailableBalance = (props: AvailableBalanceProps) => {
    return (
        <div className="border rounded-xl bg-white p-5 w-[500px]">
            <p className="text-xl mb-3 font-semibold">Balance</p>
            <p className="flex gap-5 text-4xl tracking-wide">{props.balance.toFixed(2).replace(".", ",")} <span>EUR</span></p>
            <p className="text-[15px] mt-2 mb-5">Available</p>
            <Button className="w-32 bg-gray-200 p-1 rounded-2xl">Deposit</Button>
        </div>
    );
};

export default AvailableBalance;