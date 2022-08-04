import React, {FC, PropsWithChildren} from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar";

interface Props {
    title: string,
    pageDescription: string,
    imageFullUrl?: string
}

export const Layout: FC<PropsWithChildren<Props>> = ({children, title, pageDescription, imageFullUrl}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={"description"} content={pageDescription}/>
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
                {imageFullUrl &&  <meta name='og:image' content={imageFullUrl}/>}
            </Head>
            <nav>
                <Navbar/>
            </nav>
            <main style={{
                margin:'10px auto',
                padding:'0px 30px'
            }}>
                {children}
            </main>
        </div>
    );
}
