import React from 'react';
import Layout from "@/components/layout/Layout";
import AvailableBalance from "@/components/page/AvailableBalance";
import LastOperations from "@/components/page/LastOperations";

const Home = () => {
    return (
        <Layout>
            <div className="flex flex-col p-5 gap-20">
                <AvailableBalance balance={1000.05} />
                <LastOperations/>
            </div>
        </Layout>
    );
};

export default Home;