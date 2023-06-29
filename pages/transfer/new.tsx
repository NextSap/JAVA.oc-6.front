import React from 'react';
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useUserStore} from "@/stores/user.store";
import {createTransaction} from "@/services/transaction.service";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {HTTPError} from "ky";
import Layout from "@/components/layout/Layout";
import {renderError} from "@/utils/Error.utils";

const TransferSchema = z.object({
    email: z.string().email("Valid email is required"),
    amount: z.number().min(1, "Amount is required").positive("Positive amount is required"),
    description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof TransferSchema>;

const NewTransfer = () => {

    const router = useRouter();
    const userStore = useUserStore();

    const {data: user, isError, isLoading, isIdle} = userStore.getUser();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({resolver: zodResolver(TransferSchema)});

    if (isIdle || isLoading) return <Layout isLoading={true}/>
    if (isError) return <div>Error</div>

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        createTransaction({
            sender: user.email,
            receiver: data.email,
            amount: data.amount,
            description: data.description
        }).then(() => {
            toast.success("Transaction created successfully");
            router.push("/transfer")
        }).catch((error: HTTPError) => {
            renderError(error, "Error creating transaction");
        });
    };

    return (
        <Layout>
            <div className="flex flex-col items-center gap-10 mt-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register("email")}
                           id="email" label="Email :" type="email"
                           placeholder="Email"
                           errormessage={errors.email?.message}
                    />
                    <div className="flex gap-3">
                        <Input register={register("amount", {valueAsNumber: true})}
                               id="amount" label="Amount :" type="number" step="0.01"
                               placeholder="Amount"
                               errormessage={errors.amount?.message}
                        />
                    </div>
                    <Input register={register("description")}
                           id="description" label="Description :" type="text"
                           placeholder="Description"
                           errormessage={errors.description?.message}
                    />

                    <Button type="submit">Send</Button>
                </Form>
            </div>
        </Layout>
    );
};

export default NewTransfer;