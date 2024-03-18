/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "react-material.fusetheme.com",
      "fitnesdashboard.onrender.com",
      "firebasestorage.googleapis.com",
    ],
  },
  env: {
    BACK_END_SERVICES: process.env.BACK_END_SERVICES,
  },
};

export default nextConfig;
