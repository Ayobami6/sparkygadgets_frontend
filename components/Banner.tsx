import React from 'react'
import Loading from './Loading'


type Props = {
    bannerText: string
    loading: boolean
}

const Banner = ({ bannerText, loading }: Props) => {
    return (
        <div className='bg-submain h-[80px] flex items-center' >
            <div className='flex justify-center p-5 w-full'>
                {
                    loading ?
                        (
                            <>
                                <Loading />
                            </>
                        ) : (
                            <h1 className='text-center'>
                                {bannerText}
                            </h1>

                        )
                }

            </div>


        </div>
    )
}

export default Banner