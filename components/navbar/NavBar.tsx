import React from 'react';
import {useRouter} from "next/router";

const commonStyle = "text-gray-600 border hover:border-gray-50 px-4 py-2 cursor-pointer rounded-3xl duration-300";

const NavBar = () => {

    const router = useRouter();

    const isCurrentPath = (path: string) => {
        return router.pathname === path;
    }

    return (
        <div className="w-full h-16 bg-gray-200 fixed">
            <div className="flex justify-between items-center h-full px-6">
                <img onClick={() => router.push("/")} src="/MinimizedLogo.png" alt="Logo" className="w-12 cursor-pointer"/>
                <div className="flex gap-4">
                    <a style={{backgroundColor: isCurrentPath("/") ? "rgb(249 250 251)" : "none"}} onClick={() => router.push("/")} className={commonStyle}>Home</a>
                    <a style={{backgroundColor: isCurrentPath("/transfer") ? "rgb(249 250 251)" : "none"}} onClick={() => router.push("/transfer")} className={commonStyle}>Transfer</a>
                    <a style={{backgroundColor: isCurrentPath("/profile") ? "rgb(249 250 251)" : "none"}} onClick={() => router.push("/profile")} className={commonStyle}>Profile</a>
                    <a style={{backgroundColor: isCurrentPath("/contact") ? "rgb(249 250 251)" : "none"}} onClick={() => router.push("/contact")} className={commonStyle}>Contact</a>
                    <a onClick={() => router.push("/logout")} className={commonStyle}>Log out</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;