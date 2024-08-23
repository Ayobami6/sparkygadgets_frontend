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
            <div className='p-[102px]'>
                <div className='border-2 rounded-lg p-11 bg-gray-200 border-gray-100'>
                    <div className="chat chat-start">
                        <div className="chat-bubble">
                            <div className="chat-header">
                                You
                            </div>
                            It over Anakin,
                            <br />
                            I have the high ground.
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">
                            AI
                        </div>
                        <div className="chat-bubble">You underestimate my power!</div>
                    </div>

                </div>

            </div>


            <div className='flex justify-center items-center mt-auto'>
                <h1>
                    Chat Stuff
                </h1>

            </div>




            <div className='mt-auto'>
                <Footer />

            </div>

        </div>
    )
}

export default AskAI