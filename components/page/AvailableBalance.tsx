import React from 'react';
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {useUserStore} from "@/stores/user.store";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {transferMoney} from "@/services/user.service";
import {useRouter} from "next/router";

type AvailableBalanceProps = {
    balance: number;
    user: UserResponseSchemaType;
}

const TransferSchema = z.object({
    amount: z.number().min(1, "Amount is required").positive("Positive amount is required"),
});

type FormValues = z.infer<typeof TransferSchema>;

const AvailableBalance = (props: AvailableBalanceProps) => {
    const [visibleInput, setVisibleInput] = React.useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({resolver: zodResolver(TransferSchema)});

    const onWithdrawal = (data: FormValues) => {
        if (data.amount > props.balance) {
            toast.error("You can't withdraw more than your balance");
            return;
        }

        transferMoney("WITHDRAWAL", data.amount)
            .then(() => {
                toast.success("Withdrawal successful");
                setVisibleInput(false);
                router.reload();
            })
            .catch(() => {
                toast.error("Error while withdrawing");
            });
    }

    const onDeposit = (data: FormValues) => {
        transferMoney("DEPOSIT", data.amount)
            .then(() => {
                toast.success("Deposit successful");
                setVisibleInput(false);
                router.reload();
            })
            .catch(() => {
                toast.error("Error while depositing");
            });
    }

    return (
        <div className="border rounded-xl bg-white p-5 w-[500px]">
            <p className="text-xl mb-3 font-semibold">Balance</p>
            <p className="flex gap-5 text-4xl tracking-wide">{props.balance.toFixed(2).replace(".", ",")}
                <span>EUR</span></p>
            <p className="text-[15px] mt-2 mb-2">Available</p>

            {!visibleInput ?
                <Button className="w-full rounded tracking-wide" onClick={() => setVisibleInput(true)}>Deposit or
                    withdrawal</Button>
                :
                <form className="flex flex-col gap-1">
                    <div className="border-b-2 border-gray-200 mb-2"/>
                    <Input register={register("amount", {valueAsNumber: true})} errormessage={errors.amount?.message} placeholder="Amount" type="number" step="0.01"/>
                    <div className="flex gap-3">
                        <Button type="submit" onClick={handleSubmit(onDeposit)} className="w-full rounded tracking-wide">Deposit</Button>
                        <Button type="submit" onClick={handleSubmit(onWithdrawal)} className="w-full rounded tracking-wide">Withdrawal</Button>
                        <Button className={"w-full rounded tracking-wide"}
                                onClick={() => setVisibleInput(false)}>Cancel</Button>
                    </div>
                </form>}
        </div>
    );
};

export default AvailableBalance;