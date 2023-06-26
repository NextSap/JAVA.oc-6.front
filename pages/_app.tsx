import React from 'react';
import {ToastContainer} from "react-toastify";
import AuthGuard from "@/guard/AuthGuard";
import {AppProps} from "next/app";
import Error from "@/components/Error";
import {ErrorBoundary} from "react-error-boundary";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

const App = ({Component, pageProps}: AppProps) => {
    return (
        <>
            <ToastContainer
                limit={3}
                position={"top-right"}
                pauseOnFocusLoss={false}
                autoClose={2500}
                theme={"dark"}
                hideProgressBar={true}
                newestOnTop={true}
            />
            <ErrorBoundary fallback={<Error code={500} title={"Internal Server Error"}/>}>
                <AuthGuard>
                    <Component {...pageProps} />
                </AuthGuard>
            </ErrorBoundary>
        </>
    );
};

export default App;