import React from 'react'
import Head from 'next/head'

type Props = {}

const Heading = (props: Props) => {
    return (
        <>
            <Head>
                <link rel="icon" href="/images/oyin.jpg" sizes="42x42" type="image/png" />
            </Head>
            <title>Sparky Laptop and Gadgets</title>
            <meta name='description' content="Laptops, Desktops, Tech Gadgets." />
            <meta name='keywords' content="Used Laptops, Used Desktops" />
            <meta name='viewport' content='width=device-width, initial-scale=1' />


        </>
    )
}

export default Heading