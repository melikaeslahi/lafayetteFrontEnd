// import Navigation from '@/components/Layouts/Navigation'
// import { useAuth } from '@/hooks/auth'
 'use client';
import './globals.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
import Drawer from "@/components/dashboard/Drawer/Drawer";
import Header from "@/components/dashboard/Header/Header";
 
 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/app/theme-provider";
import { Providers } from '@/app/Provider';
import {ScheherazadeNew} from 'next/font/google'
// export const scheherazadeNew = ScheherazadeNew({
//     display: 'swap'
// });


// export const metadata = {
//     title: {

//         template: 'داشبورد| %s',
//         default: 'داشبورد',
//     },
// }


const RootLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' });

    return (

        < >
            <Providers  >
            {/* ${scheherazadeNew.className} */}
                <html>
                    <body dir='rtl' className={`dark:bg-zinc-700 `}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <Drawer />
                            <Header />
                            <main className={`bg-white dark:bg-zinc-700 w-full`}>
                                {children}
                            </main>
                            <ToastContainer />
                        </ThemeProvider>
                    </body>
                </html>

            </Providers>
        </>
    )
}

export default RootLayout;
