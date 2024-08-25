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
import { fetchProducts, searchProduct, filterProduct } from "@/api/products"
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { fetchTopDeals } from "@/api/top-deals";


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
  const conditions = ["Used", "New", "Preowned", "Refurbished"];
  const [brandFilterQuery, setBrandFilterQuery] = useState("");
  const [catFilterQuery, setCatFilterQuery] = useState("");
  const [conditionFilterQuery, setConditionFilterQuery] = useState("");
  const categories = ["Laptop", "Desktop", "Gadget"]
  let filterQuery = ""
  const filter = async () => {
    // Filter logic goes here
    if (brandFilterQuery != "") {
      filterQuery += `${brandFilterQuery}`
    }
    if (conditionFilterQuery != "") {
      filterQuery += `&${conditionFilterQuery}`
    }
    if (catFilterQuery != "") {
      filterQuery += `&${catFilterQuery}`
    }
    console.log("Filtering")
    console.log(filterQuery)
    // filter product api request
    setProductsLoading(true);
    try {
      const response = await filterProduct(filterQuery);
      if (response.status === "success") {
        setProductsLoading(false);
        console.log(response);
        setProducts(response?.data);
      }
      setProductsLoading(false);
    } catch (error) {
      setProductsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    filter();

  }, [catFilterQuery, brandFilterQuery, conditionFilterQuery])

  const topDealsFetch = async () => {
    try {
      setTopDealsLoading(true);
      const response = await fetchTopDeals();
      if (response.status === "success") {
        setTopDealsLoading(false);
        setTopDeals(response?.data);
      }
    } catch (error) {
      setTopDealsLoading(false);
      console.log(error);
    }
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
    topDealsFetch();
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

  const clearFilters = () => {
    setBrandFilterQuery("");
    setCatFilterQuery("");
    setConditionFilterQuery("");
  }
  const [activeIndex, setActiveIndex] = useState(0);
  const handleChangeBrand = async (brandId: number, index: number) => {
    setActiveIndex(index);
    // fetch products based on brandId
    setBrandFilterQuery(`brand=${brandId}`);
    console.log("Brand filter: ", brandId)
    console.log(brandFilterQuery);
  }

  const handleSelectCondition = async (condition: string) => {
    setConditionFilterQuery(`condition=${condition}`);
    console.log("Condition filter: ", condition)
    console.log(conditionFilterQuery);
  };

  const handleSelectCategory = async (category: string) => {
    setCatFilterQuery(`category=${category}`);
    console.log("Category filter: ", category)
    console.log(catFilterQuery);
  };
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
      <PopularProduct products={topDeals} loading={topDealsLoading} type="Top Deals" />

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
      <div className="my-4 grid md:grid-cols-4">
        <div className="flex flex-col px-[30px] p-10">
          <h1 className="text-xl font-bold">Filter By</h1>
          <div className="my-3">
            <h3 onClick={clearFilters} className="text-sm hover:underline hover:text-submain cursor-pointer">Clear filter</h3>
          </div>
          <div className="my-4">
            {/* filter by Condition */}
            <h1 className="font-bold">Condition</h1>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {
                  conditions.map((condition: string, index: number) => (
                    <FormControlLabel
                      value={condition}
                      key={index}
                      control={
                        <Radio
                          onChange={(e) => handleSelectCondition(e.target.value)}
                          name={condition}
                          color="primary"
                        />
                      }
                      label={condition}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </div>
          <div className="">
            {/* filter by Category */}
            <h1 className="font-bold">Category</h1>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {
                  categories.map((category: string, index: number) => (
                    <FormControlLabel
                      value={category}
                      key={index}
                      control={
                        <Radio
                          onChange={(e) => handleSelectCategory(e.target.value)}
                          name={category}
                          color="primary"
                        />
                      }
                      label={category}
                    />
                  ))
                }
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="col-span-3">
          <div className="w-full">

            <PopularProduct products={products} loading={productsLoading} type="Products" />
          </div>

        </div>

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
