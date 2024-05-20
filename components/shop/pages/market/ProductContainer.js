
import { Button } from "@/components/dashboard/inputs";
import { isBrowser, isMobile } from "react-device-detect";
import Sidebar from "./Sidebar";

const  ProductContainer =({children , title , sidebar , className} ) =>{
    
    return(
        <>
        <section className="relative w-full xl:mx-auto  xl:container">

            <section className="flex flex-col justify-center items-start lg:flex-row xl:flex-row md:flex-col py-5 my-5  ">
            <section className="flex flex-col xl:flex-row lg:flex-row md:flex-col p-3 ml-2 w-full xl:w-3/4 lg:w-3/4 md:w-full    mt-1    rounded-lg " >
                  {children} 

                
                </section>
                  
               
                { isMobile ?  <></> :
                 <section className="flex flex-col justify-center items-center p-3 mt-6  w-full h-3/4 lg:w-1/4 xl:w-1/4 md:w-full border border-gray-300  shadow-lg shadow-gray-200 rounded-lg ">
                  <Sidebar />  
                    
                 </section>
                } 
            </section>
            
        </section>
        </>
    )
}
export default ProductContainer;