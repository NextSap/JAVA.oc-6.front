import React from 'react';
import {UserResponseSchemaType} from "@/objects/response/user.response";
import {fullName} from "@/utils/Transaction.utils";

type ProfileProps = {
    user: UserResponseSchemaType;
}

const Profile = (props: ProfileProps) => {

    return (
        <div className="flex flex-col gap-5 border rounded-xl bg-white p-5 w-[300px]">
            <p className="text-xl">Hi, {fullName(props.user)} !</p>
        </div>
    );
};

export default Profile;