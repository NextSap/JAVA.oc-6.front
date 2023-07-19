import React from 'react';
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {useUserStore} from "@/stores/user.store";
import Loading from "@/components/page/Loading";
import {fullName} from "@/utils/Transaction.utils";
import Button from "@/components/ui/Button";
import {useRouter} from "next/router";
import Input from "@/components/ui/Input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addContact} from "@/services/user.service";
import {toast} from "react-toastify";
import {HTTPError} from "ky";
import {renderError} from "@/utils/Error.utils";

type ContactsProps = {
    user: UserResponseSchemaType;
}

const AddContactSchema = z.object({
    email: z.string().email()
})

type FormValues = z.infer<typeof AddContactSchema>;

const Contacts = (props: ContactsProps) => {
    const [inputVisible, setInputVisible] = React.useState<boolean>(false);
    const router = useRouter();
    const contactsList = props.user.contacts;

    const {register, handleSubmit, formState: {errors}}
        = useForm<FormValues>({resolver: zodResolver(AddContactSchema)});

    const onSubmit = (data: FormValues) => {
        if(data.email === props.user.email) {
            toast.error("You can't add yourself as a contact");
            return;
        }

        addContact(data.email)
            .then(() => {
                toast.success("Contact added");
                router.reload();
            })
            .catch((error: HTTPError) => {
                renderError(error, "Error while adding contact");
            });
    }

    return (
        <div className="flex flex-col gap-5 border rounded-xl bg-white p-5 w-[400px]">
            <p className="text-xl">Contacts</p>
            {!inputVisible && <Button className="bg-green-300 hover:bg-green-200" onClick={() => setInputVisible(true)}>Add a contact</Button>}
            {inputVisible && <div className="flex flex-col gap-5">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <Input register={register("email", {required: true})} type="text" id="email"
                           label={"Email of the contact :"}
                           className="border rounded-xl p-2" placeholder="Email" errormessage={errors.email?.message}/>
                    <div className="flex gap-2">
                        <Button type="submit" onClick={() => !errors && setInputVisible(false)}
                                className="bg-green-300 hover:bg-green-200 w-full">Add</Button>
                        <Button onClick={() => setInputVisible(false)}
                                className="bg-red-300 hover:bg-red-200 w-full">Cancel</Button>
                    </div>
                </form>
            </div>}
            <div className="flex flex-col gap-5">
                {contactsList.length == 0 ? "No contacts" : props.user.contacts.map((email, index) =>
                    <Contact key={index} email={email}/>)}
            </div>
        </div>
    );
};

type ContactProps = {
    email: string;
}

const Contact = (props: ContactProps) => {
    const userStore = useUserStore();
    const {data: user, isLoading, isIdle, isError}
        = userStore.getUserByEmail(props.email);
    const router = useRouter();

    if (isLoading || isIdle) return <Loading/>
    if (isError) return <p>Error</p>

    return (
        <div onClick={() => router.push("/transfer/new?email=" + user.email)}
             className="flex justify-between border rounded-xl bg-white p-5 cursor-pointer duration-300 hover:drop-shadow-md">
            <p>{fullName(user)} • {user.email}</p>
        </div>
    );
}

export default Contacts;