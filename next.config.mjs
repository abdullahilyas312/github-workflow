/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: {
    //   appDir: true, // ✅ enables App Router 
    // },
    images: {
      domains: ['res.cloudinary.com', 'blr1.digitaloceanspaces.com'],
    },
  }
  
  export default nextConfig
  