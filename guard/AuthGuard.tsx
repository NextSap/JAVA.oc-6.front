import React, {useEffect} from 'react';
import {isTokenValid} from "@/utils/Jwt.utils";
import {useRouter} from "next/router";

const AuthGuard = (props: { children: React.ReactNode }) => {
    const [shouldRender, setShouldRender] = React.useState(false)

    const router = useRouter();

    const unprotectedRoutes: string[] = ["/login", "/signin", "/404"]
    const shouldNotRenderIfTokenIsAvailable: string[] = ["/login", "/signin"]

    useEffect(() => {
        // check if token is available and update shouldRender
        if (isTokenValid()) {
            setShouldRender(true);
            if (shouldNotRenderIfTokenIsAvailable.includes(router.pathname)) router.push("/");
            return;
        }

        if (unprotectedRoutes.includes(router.pathname)) {
            setShouldRender(true);
            return;
        }

        if (!shouldRender)
            router.push("/login");

    }, [router.pathname]);

    return (
        <>
            {shouldRender && props.children}
        </>
    );
};

export default AuthGuard;