'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Banner from '@/components/Banner';
import { fetchBanner } from '@/api/banner';
import { fetchProductById } from '@/api/products';
import Footer from '@/components/Footer';
import ProductInfo from '@/components/ProductInfo';
import Header from '@/components/Header';

type Props = {}

const ProductDetail = (props: Props) => {
  const { id } = useParams()
  const [bannerText, setBannerText] = useState("")
  const [bannerLoading, setBannerLoading] = useState(false)
  const [product, setProduct] = useState(undefined)
  const [productLoading, setProductLoading] = useState(false)

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
  const productFetch = async () => {
    try {
      setProductLoading(true);
      const response = await fetchProductById(id as string);
      if (response.status === "success") {
        console.log(response)
        setProductLoading(false);
        setProduct(response?.data);
      }
    } catch (error) {
      setProductLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    bannerFetch();
    productFetch();
  }, [])
  return (
    <>
      <Banner bannerText={bannerText} loading={bannerLoading} />
      <Header />
      <div className='flex flex-col min-h-screen'>
        <div className='flex-grow'>
          {
            product && (
              <ProductInfo product={product} />
            )
          }

        </div>
        <div className='mt-auto'>
          <Footer />
        </div>



      </div>
    </>
  )
}

export default ProductDetail