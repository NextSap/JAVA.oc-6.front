import React from 'react';
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {fullName} from "@/utils/Transaction.utils";
import Button from "@/components/ui/Button";
import {useUserStore} from "@/stores/user.store";
import {useAuthStore} from "@/stores/auth.store";

type ProfileProps = {
    user: UserResponseSchemaType;
}

const Profile = (props: ProfileProps) => {
    const userStore = useUserStore();
    const authStore = useAuthStore();

    const deleteAccount = () => {
        authStore.logout();
        userStore.deleteUser();
    }

    return (
        <div className="flex flex-col gap-5 border rounded-xl bg-white p-5 w-[300px]">
            <p className="text-xl">Hi, {fullName(props.user)} !</p>
            <Button onClick={() => deleteAccount() } className="bg-red-300 hover:bg-red-200">Delete account</Button>
        </div>
    );
};

export default Profile;