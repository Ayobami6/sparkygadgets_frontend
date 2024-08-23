import React from 'react'
import Head from 'next/head'

type Props = {
    title: string;
    description: string;
    keywords: string;

}

const Heading = ({ title, description, keywords }: Props) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/png" />
            </Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
        </>
    )
}

export default Heading