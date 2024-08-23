import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Button from '@mui/material/Button'


type Props = {
    product?: any
}

const ProductInfo = ({ product }: Props) => {
    const [activeImage, setActiveImage] = useState(product.assets[0].image)
    const [activeIndex, setActiveIndex] = useState(0);
    const handleChangeImage = (imageString: string, index: number) => {
        setActiveIndex(index)
        setActiveImage(imageString)
    }
    return (
        <>
            {/* large screen */}
            <div className='hidden md:block p-[80px]'>
                <div className='grid grid-cols-2'>
                    {/* photo sections */}
                    <div className='flex flex-col'>
                        <div className='w-[80%] h-[400px] rounded-lg border-2 border-gray-200'>
                            <div className='flex items-center pt-10 px-5 justify-center relative w-full h-full'>
                                {
                                    product ? (
                                        <Image src={activeImage} alt='logo' layout='fill' objectFit='cover' className="rounded-md" />
                                    ) : (
                                        <Image src={'/images/oyin.jpg'} alt='logo' layout='fill' objectFit='cover' className="rounded-md" />
                                    )
                                }
                            </div>
                        </div>
                        <div className='my-4'>
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full max-w-sm" >
                                <CarouselContent>
                                    {
                                        product && (
                                            product.assets.map((asset: any, index: number) => (
                                                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                                                    <div className="p-1">
                                                        <Card className={`cursor-pointer ${activeIndex === index ? "hover:border-3 border-2 border-gray-500" : "hover:border-2"}`} onClick={() => handleChangeImage(asset.image, index)}>
                                                            <CardContent className="flex aspect-square items-center relative w-full h-full justify-center p-6">
                                                                <Image src={asset?.image} alt='logo' layout='fill' objectFit='cover' className="rounded-md" />
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))
                                        )
                                    }
                                </CarouselContent>
                                {
                                    product && product.assets.length > 5 && (
                                        <>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </>
                                    )

                                }

                            </Carousel>

                        </div>

                    </div>

                    {/* details section */}
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-5xl'>
                            {product.name}
                        </h1>
                        <div className='flex justify-start gap-4 my-5 text-xl'>
                            <h1 className='font-semibold line-through text-gray-400'>
                                ₦{product.price}
                            </h1>
                            <h1 className='font-semibold text-gray-400'>
                                ₦{product.discount_price}
                            </h1>

                        </div>
                        <div>
                            <p>
                                {product.description}
                            </p>
                        </div>

                        <div className='flex items-center justify-center mt-10'>
                            <Link href={"https://api.whatsapp.com/send/?phone=2348183239589&text&type=phone_number&app_absent=0"}>
                                <Button className="w-[200px] font-Poppins h-[60px] hover:bg-slate-700 shadow-md text-[16px] text-white bg-main" type="button">
                                    Order Now
                                </Button>

                            </Link>


                        </div>

                    </div>

                </div>

            </div>
            {/* mobile screen */}
            <div className='md:hidden p-[80px]'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <Carousel className="w-full max-w-4xl">
                            <CarouselContent>
                                {product && product.assets.map((asset: any, index: number) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square w-full h-full relative items-center justify-center p-6">
                                                    <Image src={asset?.image} alt='logo' layout='fill' objectFit='cover' className="rounded-md" />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>

                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-2xl'>
                            {product.name}
                        </h1>
                        <div className='flex justify-start gap-4 my-5 text-xl'>
                            <h1 className='font-semibold line-through text-gray-400'>
                                ₦{product.price}
                            </h1>
                            <h1 className='font-semibold text-gray-400'>
                                ₦{product.discount_price}
                            </h1>

                        </div>
                        <div>
                            <p>
                                {product.description}
                            </p>
                        </div>

                        <div className='flex items-center justify-center mt-10'>
                            <Link href={"https://api.whatsapp.com/send/?phone=2348183239589&text&type=phone_number&app_absent=0"}>
                                <Button className="w-[200px] font-Poppins h-[60px] hover:bg-slate-700 shadow-md text-[16px] text-white bg-main" type="button">
                                    Order Now
                                </Button>

                            </Link>


                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default ProductInfo