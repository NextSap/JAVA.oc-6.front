import React from 'react';
import {useAuthStore} from "@/stores/auth.store";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import CheckBox from "@/components/ui/CheckBox";
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from "next/router";
import Form from "@/components/ui/Form";
import Image from "next/image";

const LoginSchema = z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean()
})

type FormValues = z.infer<typeof LoginSchema>;

const Login = () => {

    const authStore = useAuthStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({resolver: zodResolver(LoginSchema)});

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        authStore.login({email: data.email, password: data.password, rememberMe: data.rememberMe});
    }

    return (
        <div className="flex flex-col items-center gap-10 mt-5">
            <Image src={"/Logo.png"} width={200} height={200} alt={"Logo"}/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input register={register("email")}
                       id="email" label="Email :" type="email"
                       placeholder="Email"
                       errorMessage={errors.email?.message}
                />
                <Input register={register("password")}
                       id="password" label="Password :" type="password"
                       placeholder="Password"
                       errorMessage={errors.password?.message}
                />
                <CheckBox register={register("rememberMe")} id="rememberMe" label="Remember me"/>
                <Button type="submit">Log in</Button>
                <a onClick={() => router.push("/signin")} className={"text-center text-[13px] cursor-pointer"}>
                    Not registered yet ?
                </a>
            </Form>
        </div>
    );
};

export default Login;