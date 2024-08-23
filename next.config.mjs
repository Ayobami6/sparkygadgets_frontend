/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "localhost",
          "localhost:8000",
          "http://localhost",
          "",
          "oyinecommerce.pythonanywhere.com",
          "https://oyinecommerce.pythonanywhere.com"
        ],
     },
}

export default nextConfig;
