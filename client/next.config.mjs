/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "react-material.fusetheme.com",
      "fitnesdashboard.onrender.com",
      "firebasestorage.googleapis.com",
      "upload.wikimedia.org",
      "cdn-icons-png.flaticon.com",
      "1000logos.net",
    ],
  },
  env: {
    BACK_END_SERVICES: process.env.BACK_END_SERVICES,
  },
};

export default nextConfig;
