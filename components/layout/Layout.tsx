import React from 'react';
import NavBar from "@/components/navbar/NavBar";

type LayoutProps = {
    children?: React.ReactNode
}
const Layout = (props: LayoutProps) => {
    return (
        <div className="flex">
            <NavBar/>
            <div className="mt-16">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;