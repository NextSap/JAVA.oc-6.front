import React from 'react';
import NavBar from "@/components/navbar/NavBar";
import Loading from "@/components/page/Loading";

type LayoutProps = {
    children?: React.ReactNode
    isLoading?: boolean
}
const Layout = (props: LayoutProps) => {
    return (
        <div className="flex h-full w-full">
            <NavBar/>
            <div className="flex justify-center items-center mt-16 w-full h-full">
                {props.isLoading && <Loading/>}
                {props.children}
            </div>
        </div>
    );
};

export default Layout;