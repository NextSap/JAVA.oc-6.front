import React from 'react';
import Layout from "@/components/layout/Layout";
import Profile from "@/components/page/Profile";
import {useUserStore} from "@/stores/user.store";
import Loading from "@/components/page/Loading";
import Contacts from "@/components/page/Contacts";

const ProfilePage = () => {

    const {data: user, isLoading: isLoadingUser, isError: isErrorUser, isIdle: isIdleUser} = useUserStore().getUser();

    if (isLoadingUser || isIdleUser) return <Loading/>
    if (isErrorUser) return <p>Error</p>

    return (
        <Layout>
            <div className="h-full w-full flex flex-col gap-5 p-5">
                <Profile user={user}/>
                <Contacts user={user}/>
            </div>
        </Layout>
    );
};

export default ProfilePage;