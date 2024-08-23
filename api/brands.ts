import { apiBaseUrl } from "@/constants/constants";

const fetchBrands = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}brands`)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error);
    }

}

export default fetchBrands