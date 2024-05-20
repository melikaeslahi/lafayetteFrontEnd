
import Sidebar from "./Sidebar";

const PaymentContainer =({children , title , sidebar , className} ) =>{
    return(
        <>
        <section className="relative w-full xl:mx-auto  xl:container">

            <section className="flex flex-col justify-center items-start lg:flex-row xl:flex-row md:flex-col py-5 my-5  ">
            <section className="flex flex-col p-3 ml-2 w-full xl:w-4/6 lg:w-4/6 md:w-full   mt-1    rounded-lg " >
                  {children} 
                </section>
                  
               

                  
                        {sidebar}
                

            </section>
            
        </section>
        </>
    )
}
export default PaymentContainer;