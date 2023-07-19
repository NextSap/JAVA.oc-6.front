import React, {useEffect} from 'react';
import {useAuthStore} from "@/stores/auth.store";
import Layout from "@/components/layout/Layout";

const Logout = () => {

    const authStore = useAuthStore();

    useEffect(() => {
        authStore.logout();
    })

    return (
        <Layout/>
    );
};

export default Logout;