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
                    <div className="chat chat-end">
                        <div className="chat-header">
                           <h3 className='font-bold'>
                                 You
                           </h3>
                        </div>
                        <div className="chat-bubble bg-dark">You underestimate my power!</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">
                                <h3 className='font-bold'>AI</h3>
                            </div>
                        <div className="chat-bubble bg-dark">
                            
                            Hello! 👋 I'm Sparky AI, your friendly assistant here at Sparky Inc., your one-stop shop for the best tech deals in Nigeria. 🇳🇬 \n\nTo recommend the perfect PC for you from our store, I need a little more information about what you're looking for. 🤔 \n\nCould you tell me:\n\n* **What's your budget?** (e.g., under ₦100,000, ₦100,000 - ₦200,000, etc.)\n* **What will you be using the PC for?**  (e.g., gaming, work, school, graphic design, etc.)\n* **Do you prefer a laptop or a desktop?**\n* **Any specific brand preferences?** (e.g., HP, Dell, Lenovo) \n\nOnce I have this information, I can point you to the perfect PC within your budget.  Just head over to our store [insert store link or address] to browse our selection! 😊 \n
                        </div>
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