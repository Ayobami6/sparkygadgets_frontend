import { apiBaseUrl } from "@/constants/constants";

export const fetchAdvert = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}advert`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}