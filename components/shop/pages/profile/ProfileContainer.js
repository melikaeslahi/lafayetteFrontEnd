'use client'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import SuccessAlert from "@/components/dashboard/inputs/SuccessAlert";
import ResponseError from "@/components/dashboard/inputs/ResponseError";


const ProfileContainer =({children , title ,className} ) =>{
    const {successMessage ,errorData} = useSelector(state=>state.util)
    return(
        <>
        <section className="relative w-full mx-auto xl:container">

            <section className="flex flex-col justify-center items lg:flex-row xl:flex-row md:flex-col py-5 my-5  ">

                 
                 <section className="flex flex-col justify-center items-center p-3 mt-12 w-full h-3/4 lg:w-2/6 xl:w-2/6 md:w-full border border-gray-300  shadow-lg shadow-gray-200 rounded-lg ">
                    <Sidebar />
                 </section>

                 <section className="flex flex-col p-3 xl:mr-2 lg:mr-2 mt-2 w-full xl:w-4/6 lg:w-4/6 md:w-full border border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                    <section className={`${className} p-2 m-3 flex border-b border-pallete`}>
                        <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                        <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                        <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                    </section>
                    {successMessage ? <SuccessAlert TimeDisable={false} /> : null }
                    {errorData ? <ResponseError /> : null }    

                    <section>
                    {children} 
                    </section>
                
                 </section>

            </section>
            
        </section>
        </>
    )
}
export default ProfileContainer;