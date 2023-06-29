import React from 'react';
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "next/router";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Image from "next/image";

const SigninSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
});

type FormValues = z.infer<typeof SigninSchema>;

const Signin = () => {

    const authStore = useAuthStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({resolver: zodResolver(SigninSchema)});

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        authStore.signin({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        });
    }

    return (
        <div className="flex flex-col w-full h-full justify-center items-center gap-10">
            <Image src={"/Logo.png"} width={200} height={200} alt={"Logo"}/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input register={register("firstName")}
                       id="firstName" label="Firstname :" type="text"
                       placeholder="Firstname"
                       errormessage={errors.firstName?.message}
                />
                <Input register={register("lastName")}
                       id="lastName" label="Lastname :" type="text"
                       placeholder="Lastname"
                       errormessage={errors.lastName?.message}
                />
                <Input register={register("email")}
                       id="email" label="Email :" type="email"
                       placeholder="Email"
                       errormessage={errors.email?.message}
                />
                <Input register={register("password")}
                       id="password" label="Password :" type="password"
                       placeholder="Password"
                       errormessage={errors.password?.message}
                />
                <Input register={register("confirmPassword")}
                       id="confirmPassword" label="Confirm password :" type="password"
                       placeholder="Confirm password"
                       errormessage={errors.confirmPassword?.message}
                />
                <Button type="submit">Sign in</Button>
                <a onClick={() => router.push("/login")} className={"text-center text-[13px] cursor-pointer"}>
                    Already registered ?
                </a>
            </Form>
        </div>
    );
};

export default Signin;