import { apiBaseUrl } from "@/constants/constants";

export const fetchTopDeals = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}top-deals`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        
    }
}