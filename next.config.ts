import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // 1. Define the type of static build
  output: 'export', /// This will generate a static version of the app. We do because we want to do Static Site Generation (SSG).
  
  // 2. Add a base path for GitHub pages
  basePath: '/mina', // <---------- TO CHANGE
  
  // 3. Add a trailing slash to assure compatibility with github pages
  trailingSlash: true, // This will add a slash at the end of the URL of every page (/about >> /about/)

  // 4. Other config options if needed
  reactStrictMode: true, 

  images: {
    unoptimized: true, 
  }
};

export default nextConfig;
