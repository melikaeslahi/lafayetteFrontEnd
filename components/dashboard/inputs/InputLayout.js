import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import TitlePage from "../TitlePage";
 
import QueryStatusHandler from '../QueryStatusHandler';
const InputLayout = ({ query,  name , sitemap ,children }) => {
    const router = useRouter();
    const { openDrawer } = useSelector((state) => state.util);
    return (<>
         <TitlePage
                name={name}
                sitemapPage={sitemap}
            >
                <button
                    type="button"
                    onClick={() => { router.back() }}
                    className=" py-4 px-8 bg-pallete rounded text-white" >
                    {' '}
                    بازگشت
                </button>
            </TitlePage>
        
         <section className={`absolute top-40 left-0 z-0 w-full md:w-full dark:bg-zinc-700 bg-white
                flex flex-col justify-center items-center my-5 rounded
                ${openDrawer ? 'lg:w-full xl:w-screen' : 'lg:w-4/5 xl:w-4/5'}`}>

               {query ? 
                <QueryStatusHandler  query={query} >
                    {children}
                </QueryStatusHandler> :
                <>{children}</>
                
                }
            </section>  
    </>)
}
export default InputLayout;