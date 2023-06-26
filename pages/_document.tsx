import React from 'react';
import {Head, Html, Main, NextScript} from "next/document";

const Document = () => {
    return (
        <Html lang="fr">
            <Head>
                <link rel="icon" href="/MinimizedLogo.ico" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
};

export default Document;