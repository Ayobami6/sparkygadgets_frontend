'use client'
import Image from "next/image";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import CarouselPlugin from "@/components/CarouselPlugin";
import PopularProduct from "@/components/PopularProduct";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { fetchBanner } from "@/api/banner";
import { fetchAdvert } from "@/api/advert";
import { fetchProducts, searchProduct } from "@/api/products"
import Link from "next/link";
import { AiFillWechat } from "react-icons/ai";
import fetchBrands from "@/api/brands";
import Loading from "@/components/Loading";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const [bannerText, setBannerText] = useState("");
  const [advertData, setAdvertData] = useState([]);
  const [topDeals, setTopDeals] = useState([]);
  const [topDealsLoading, setTopDealsLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [advertLoading, setAdvertLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const catFilter = () => {
    // Filter logic goes here
    console.log("Filtering")
  }
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
  const brandsFetch = async () => {
    try {
      setBrandsLoading(true);
      const response = await fetchBrands();
      if (response.status === "success") {
        setBrandsLoading(false);
        console.log(response.data);
        setBrands(response?.data);
      }

    } catch (error) {
      setBrandsLoading(false);
      console.log(error);

    }
  }
  const productsFetch = async () => {
    try {
      setProductsLoading(true);
      const response = await fetchProducts();
      if (response.status == "success") {
        setProductsLoading(false);
        setProducts(response?.data);
      }
    } catch (err) {
      setProductsLoading(false)
      console.log(err)

    }

  }
  const advertFetch = async () => {
    try {
      setAdvertLoading(true);
      const response = await fetchAdvert();
      if (response.status === "success") {
        console.log(response)
        setAdvertLoading(false);
        setAdvertData(response?.data);
      }
    } catch (error) {
      setAdvertLoading(false);
      console.log(error);
    }
  }
  const [searchText, setSearchText] = useState("init");
  useEffect(() => {
    bannerFetch();
    advertFetch();
    productsFetch();
    brandsFetch();
  }, []);
  const handleSearch = async (value: string) => {
    console.log(value);
    try {
      setProductsLoading(true);
      const response = await searchProduct(value);
      if (response.status === "success") {
        setProductsLoading(false);
        setProducts(response?.data);
      }
      setSearchText("");
    } catch (error) {
      setProductsLoading(true);
      console.log(error);

    }
    console.log("Searching")
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChangeBrand = (brandId: number, index: number) => {
    setActiveIndex(index);
    // fetch products based on brandId
    console.log("Brand filter: ", brandId)
  }
  return (
    <div>
      <Banner bannerText={bannerText} loading={bannerLoading} />
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        handlePress={handleSearch}
      />
      <div className="flex justify-center font-Inter text-sm gap-5 p-4">
        <Link href={"/ai-assistant"}>
          <Button className="w-[120px] font-Poppins h-[40px] shadow-md text-[16px] text-white bg-other" type="button">
            <AiFillWechat size={24} />  Ask AI
          </Button>
        </Link>

      </div>
      <PopularProduct products={products} loading={productsLoading} type="Top Deals" />

      <div className="mt-5">
        <h1 className="text-center font-bold text-2xl my-10">Brands</h1>
        <div className="flex justify-center items-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-2xl" >
            <CarouselContent>
              {
                brandsLoading ? (
                  <div className='flex items-center justify-center'><Loading /> </div>
                ) : brands && brands.length > 0 ? (

                  brands.map((brand: any, index: number) => (
                    <CarouselItem key={index} className="md:basis-1/8 lg:basis-1/8 basis-1/8 rounded-full">
                      <div className="p-1">
                        <Card className={`cursor-pointer ${activeIndex === index ? "hover:border-3 border-2 border-gray-500" : "hover:border-2"}`} onClick={() => handleChangeBrand(brand.id, index)}>
                          <CardContent className="flex aspect-square items-center relative w-full h-full justify-center p-6">
                            <Image src={`https://sparkygadgets.pythonanywhere.com/${brand?.logo}`} alt='logo' layout='fill' objectFit='cover' className="rounded-md" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))

                ) : (
                  <div className='flex items-center justify-center'>
                    <h1>
                      Brand list is empty
                    </h1>

                  </div>
                )
              }
            </CarouselContent>
            {
              brands && brands.length > 5 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )

            }

          </Carousel>

        </div>

      </div>
      <div className="my-4">
        <PopularProduct products={products} loading={productsLoading} type="Products" />

      </div>
      <div className="my-8 p-4">
        <h1 className="text-center font-bold text-2xl my-10">Need Something Like This For An Affordable Price?</h1>
        <div className="flex justify-center">
          <a href="mailto:ayobamidele006@gmail.com">
            <Button className="w-[200px] font-Poppins h-[60px] shadow-md text-[16px] text-white bg-main" type="button">
              Contact Us
            </Button>
          </a>
        </div>
      </div>
      <Footer />
    </div >
  );
}
