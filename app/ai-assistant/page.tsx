"use client"

import { fetchBanner } from '@/api/banner'
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown';
import { IoIosSend } from "react-icons/io";
import askAI from '@/api/ask-ai'
import Header from '@/components/Header'

type Props = {}

interface Conversation {
    role: "user" | "bot";
    message: string;
}

const AskAI = (props: Props) => {
    const [bannerText, setBannerText] = useState("")
    const [bannerLoading, setBannerLoading] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    // const conversations: Conversation[]  = [];
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
    const getResponse = async (message: string) => {
        try {
            setLoading(true);
            const response = await askAI(message);
            if (response.status === "success") {
                setLoading(false);
                conversations.push({role: "bot", message: response.data.answer.toString().replace(`,`, "\n")});
            }
            
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    const handleButtonClick = () => {
        if (question.trim() === "") {
            alert("Please enter a question before submitting");
            return;
        }
        // TODO: Send question to AI model and display response
        console.log(question);
        conversations.push({role: "user", message: question});
        setConversations(conversations)
        setQuestion("")
        getResponse(question);
    }
    useEffect(() => {
        bannerFetch()
    }, [])
    return (
        <div className='flex flex-col min-h-screen'>
            <Banner bannerText={bannerText} loading={bannerLoading} />
            <Header/>
            <div className='p-[70px]'>
                <div className='border-2 rounded-lg w-full p-6 bg-gray-200 border-gray-100'>
                    {
                        conversations.length > 0 ? conversations.map((conversation: Conversation, index: number) =>(
                            conversation.role === "user"? (
                                <div key={index} className="chat chat-start">
                                    <div className="chat-header">
                                        <h3 className='font-bold'>You</h3>
                                    </div>
                                    <div className="chat-bubble bg-dark">
                                        {conversation.message}
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className="chat chat-end">
                                    <div className="chat-header">
                                        <h3 className='font-bold'>AI</h3>
                                    </div>
                                    <div className="chat-bubble bg-dark">
                                        <ReactMarkdown>
                                            {conversation.message}
                                        </ReactMarkdown>
                      
                                    </div>
                                </div>
                            )

                        )) : (
                            <div className='flex p-10 justify-center items-center'>
                                Ask me anything about PCs and Gadgets
                            </div>                        
                        )
                    }
                </div>
            </div>

            <div className='flex justify-center items-center mt-auto'>
                <div className='relative w-[80%]'>
                     <input
                        value={question}
                        type="text" className='p-3 border-2 rounded-full w-full pr-10'
                        placeholder='Can you recommend me nice PC I can use to start learning programming?'
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button className='pl-3' onClick={handleButtonClick} disabled={loading}>
                            {
                                loading? (
                                    <span className="loading loading-dots loading-lg"></span>
                                ) : (
                                    <IoIosSend size={24} className='hover:text-main hover:cursor-pointer' />
                                )
                            }                    
                        </button>
                    </div>

                </div>

            </div>

            <div className='mt-auto'>
                <Footer />

            </div>

        </div>
    )
}

export default AskAI