'use client';
import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/app/theme-provider";
import Footer from "@/components/shop/Footer";
import Header from "@/components/shop/Header";
import {   isBrowser, isMobile } from "react-device-detect";
import MobileHeader from "@/components/shop/MobileHeader";
import MobileFooter from "@/components/shop/MobileFooter";
import {  Vazirmatn } from 'next/font/google'
export const vazirmatn = Vazirmatn({
    subsets: ['arabic'],
    display: 'swap'
});
 
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Providers } from "@/app/Provider";

// export const metadata = {
//     title: {

//         template: 'داشبورد| %s',
//         default: 'داشبورد',
//     },
// }


const StoreLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' });
    // const { user } = useAuth();
    // useEffect(() => {
    //     user();

    // })

    return (
        <Providers >

            <html>
                <body dir='rtl' className={`dark:bg-zinc-700 ${vazirmatn.className}`}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        { isMobile ? <MobileHeader /> : <Header />}
                        <main  >
                            {children}
                        </main>
                        {isMobile ? <MobileFooter /> : <Footer />}

                        <ToastContainer />
                    </ThemeProvider>
                </body>
            </html>

        </Providers>
    )
}

export default StoreLayout
