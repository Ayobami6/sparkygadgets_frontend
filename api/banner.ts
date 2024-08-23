import { apiBaseUrl } from "@/constants/constants";

export const fetchBanner = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}banner`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);        
        throw error
    }

}
