import { apiBaseUrl } from "@/constants/constants";


export const fetchProducts = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}products`)
        const data = await response.json()
        return data
    } catch(err){
        console.log(err)

    }
}

export const fetchProductById = async (id: string) => {
    try {
        const response = await fetch(`${apiBaseUrl}products/${id}`)
        const data = await response.json()
        return data
    } catch(err){
        console.log(err)
    }
}

export const searchProduct = async (searchString: string) => {
    try {
        const response = await fetch(`${apiBaseUrl}products?search=${searchString}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error;   
    }

}


export const filterByCategory = async (categoryId: number) => {
    try {
        const response = await fetch(`${apiBaseUrl}products?category=${categoryId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error;   
    }
}

export const filterProduct = async (filterQuery: string) => {
    try {
        const response = await fetch(`${apiBaseUrl}products?${filterQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}

export const fetchTopDeals = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}top-deals`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}