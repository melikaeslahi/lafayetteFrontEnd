'use client'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import { useSelector } from "react-redux";
import SuccessAlert from "@/components/dashboard/inputs/SuccessAlert";
import ResponseError from "@/components/dashboard/inputs/ResponseError";
import Sidebar from "../Sidebar";
import Link from "next/link";


const TicketContainer =({children , title , url ,urlName} ) =>{
    const {successMessage ,errorData} = useSelector(state=>state.util)
    console.log(errorData);
    return(
        <>
        <section className="relative w-full mx-auto xl:container">
            <section className="flex flex-col justify-center items lg:flex-row xl:flex-row md:flex-col py-5 my-5  ">      
                 <section className="flex flex-col justify-center items-center p-3 mt-12 w-full h-3/4 lg:w-2/6 xl:w-2/6 md:w-full border border-gray-300  shadow-lg shadow-gray-200 rounded-lg ">
                    <Sidebar />
                 </section>
                 <section className="flex flex-col p-3 xl:mr-2 lg:mr-2 mt-2 w-full xl:w-4/6 lg:w-4/6 md:w-full border border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >            
                    <section className="w-full p-2 m-3 flex border-b border-pallete">
                            <section className="p-2 m-3 flex   w-2/4 ">
                                <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                                <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                                <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                            </section>

                            <section className="p-2 m-1 flex justify-end  w-2/4">
                            <Link  href={`${url}`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                {urlName}
            </Link>
                            </section>
                       <section>
                        
                       </section>
                    </section>

                    {successMessage ? <SuccessAlert TimeDisable={false} /> : null }
                     

                    <section>
                    {children} 
                    </section>
                
                 </section>

            </section>
            
        </section>
        </>
    )
}
export default TicketContainer;