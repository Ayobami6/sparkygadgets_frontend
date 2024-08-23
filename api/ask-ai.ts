import { apiBaseUrl } from "@/constants/constants";

const askAI = async (message: string) => {
    try {
        const response = await fetch(`${apiBaseUrl}ask-sparky`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data;
        
    } catch (error) {
        
    }
}

export default askAI;