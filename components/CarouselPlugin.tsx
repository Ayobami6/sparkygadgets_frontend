'use client'
import React, { useRef } from 'react'
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Loading from './Loading'
import { apiBaseUrl } from '@/constants/constants'



type Props = {
    data: any;
    loading: boolean;
}

const CarouselPlugin = ({ data, loading }: Props) => {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: false })
    )
    console.log(data)

    return (
        <div className='flex justify-center mt-5 p-4'>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-5xl"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className=''>
                    {loading ? (
                        <div className='flex items-center justify-center'>
                            <Loading />
                        </div>

                    ) : data && data.length > 0 ? (
                        data.map((item: any, idx: number) => (
                            <CarouselItem key={idx}>
                                <div className="p-1">
                                    <Card className=''>
                                        <CardContent className="relative flex h-[300px] items-center justify-center p-6">
                                            <Image
                                                src={`https://oyinecommerce.pythonanywhere.com${item.image}`}
                                                alt='loading'
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <div>No data available</div>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >

    )
}

export default CarouselPlugin