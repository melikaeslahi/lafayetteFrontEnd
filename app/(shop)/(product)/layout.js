'use client';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import './globals.css';
config.autoAddCss = false;
 

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/app/theme-provider";
import Footer from "@/components/shop/Footer";
import Header from "@/components/shop/Header";
import { isBrowser, isMobile } from "react-device-detect";
import ProductHeader from "@/components/shop/pages/market/ProductHeader";
import ProductFooter from "@/components/shop/pages/market/ProductFootter";
import { Providers } from "@/app/Provider";
import {  Vazirmatn } from 'next/font/google'
export const vazirmatn = Vazirmatn({
    subsets: ['arabic'],
    display: 'swap'
});
// export const metadata = {
//     title: {

//         template: 'داشبورد| %s',
//         default: 'داشبورد',
//     },
// }


const  ProductLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' });
           console.log(isBrowser);
    return (
        
        <html>
                <body dir='rtl' className={`dark:bg-zinc-700 ${vazirmatn.className}`}>
                <Providers>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        {  isMobile ?  <ProductHeader /> : <Header />    }
                     
                        <main  >
                            {children}
                        </main>
                        { isMobile ? <ProductFooter /> :     <Footer/> }
                      
                        <ToastContainer />
                    </ThemeProvider>
            </Providers>
                </body>
            </html>

    )
}

export default ProductLayout
