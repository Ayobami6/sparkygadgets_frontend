import React from 'react'
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
    const currentYear = new Date().getFullYear();
    const links = [
        {
            url: "https://github.com/Ayobami6",
            icon: <FaGithub size={30} />
        },
        {
            url: "https://www.linkedin.com/in/ayobami-alaran/",
            icon: <FaLinkedin size={30} />
        },

    ]
    const useFul = ["About Us", "Blog", "Github", "Other Products"]
    const others = ["License", "Terms & Conditions", "Privacy Policy"]
    return (
        <footer className="lg:h-[314px] h-[508px] mt-10 p-12 bg-gray-200 flex flex-col border-1">
            <div className='grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-1 gap-4 mb-6'>
                <div className='lg:col-span-4 sm:col-span-2'>
                    <h1 className='font-bold'>Keep in touch</h1>
                    <h3 className='text-sm mt-2'>Find us on any of these platforms</h3>
                    <div className='flex gap-2 mt-4'>
                        {
                            links.map((link, index) => (
                                <a key={index} href={link.url} target='_blank' rel='noreferrer'>
                                    {link.icon}
                                </a>
                            ))
                        }

                    </div>
                </div>
                <div>
                    <h1 className='font-bold'>Useful Links</h1>
                    <div className='flex flex-col gap-2 mt-2'>
                        {
                            useFul.map((link, index) => (
                                <a key={index} href={`/#${link.toLowerCase().replace(' ', '-')}`} className='text-sm'>
                                    {link}
                                </a>
                            ))
                        }

                    </div>
                </div>
                <div>
                    <h1 className='font-bold'>
                        Other Resources
                    </h1>
                    <div className='flex flex-col gap-2'>
                        {
                            others.map((link, index) => (
                                <a key={index} href={`/#${link.toLowerCase().replace(' ', '-')}`} className='text-sm'>
                                    {link}
                                </a>
                            ))
                        }

                    </div>
                </div>
            </div>
            <hr className="border-t-2 mb-2 border-gray-400 mt-auto" />
            <div className="flex mt-auto justify-center">
                <p className="text-sm text-center">Copyright © {currentYear} Sparky Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer