/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "localhost",
          "localhost:8000",
          "http://localhost",
          "",
          "oyinecommerce.pythonanywhere.com",
          "https://oyinecommerce.pythonanywhere.com",
          "https://sparkygadgets.pythonanywhere.com",
          "sparkygadgets.pythonanywhere.com",
        ],
     },
    output: 'standalone',
}

export default nextConfig;
