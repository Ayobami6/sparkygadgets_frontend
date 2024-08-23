"use client"

import { fetchBanner } from '@/api/banner'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import React, { useState, useEffect } from 'react'

type Props = {}

const AskAI = (props: Props) => {
    const [bannerText, setBannerText] = useState("")
    const [bannerLoading, setBannerLoading] = useState(false);
    const bannerFetch = async () => {
        try {
            setBannerLoading(true);
            const response = await fetchBanner();
            if (response.status === "success") {
                setBannerLoading(false);
                setBannerText(response?.data.text);
            }
        } catch (error) {
            setBannerLoading(false);
            console.log(error);
        }
    }
    useEffect(() => {
        bannerFetch()
    }, [])
    return (
        <div className='flex flex-col min-h-screen'>
            <Banner bannerText={bannerText} loading={bannerLoading} />
            <div className='p-4'>
                <h1>
                    Hello
                </h1>

            </div>

            


            <div className='mt-auto'>
                <Footer />

            </div>

        </div>
    )
}

export default AskAI