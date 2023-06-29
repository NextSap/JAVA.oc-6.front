import React from 'react';
import Layout from "@/components/layout/Layout";
import AvailableBalance from "@/components/page/AvailableBalance";
import LastOperations from "@/components/page/LastOperations";
import {useUserStore} from "@/stores/user.store";

const Home = () => {

    const user = useUserStore().getUser();

    if (!user.data) return <p>Error</p>

    return (
        <Layout isLoading={user.isLoading}>
            <div className="flex flex-col p-5 gap-20">
                <AvailableBalance balance={user.data.balance}/>
                <LastOperations user={user.data}/>
            </div>
        </Layout>
    );
};

export default Home;