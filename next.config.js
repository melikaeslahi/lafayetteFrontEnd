/** @type {import('next').NextConfig} */
const nextConfig = {
  
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          // { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          // { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        
      },
   
    ],
    domains: ['localhost'],
      // domains: [''],
      // loader: 'custom',
      // loaderFile: './my/image/loader.js',
    
  },
  // experimental:{appDir: true},
  
  }
   
  module.exports = nextConfig