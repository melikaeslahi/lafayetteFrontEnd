'use client';

import { useGetFaqsQuery } from "@/lib/customer/homeApi";
import { faAngleDown, faAngleLeft, faArrowLeft, faArrowRight, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import faqImage from '../../../../public/image/images (1).jpg'
const Faq = () => {
    const { data, isSuccess } = useGetFaqsQuery();

    const [faqSelected , setFaqSelected] = useState()



console.log(faqSelected);

    return (
        <>
            <section className="flex flex-col p-3  w-86 mx-auto my-10 container md:w-full border my-2 border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                {isSuccess ? (
                    <>
                        <section className="p-2 m-3 flex border-b border-pallete">
                            <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                            <h1 className="text-pallete text-lg text-right font-bold">سولات متداول</h1>
                            <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                        </section>
                        <section className="flex w-full flex-col items-center justify-center p-2 m-2">
                             
                             <section className="flex justify-canter items-center w-3/4 pb-4">
 
                             <section className={'w-1/4 pl-3'}>
                                   <Image src={faqImage} width={100} height={100} className="w-full h-full rounded-lg " />
                                </section>
                                <section className={'w-3/4'}>
                                    <h1 className="text-pallete font-bold p-2 text-justify">پرتکرار ترین سوالات</h1>
                                    <p>لافایت گالری به منظور راحتی شما بازدید کنندگان عزیز سعی در جمع آوری پر تکرار ترین سوالات شما عزیزان نموده و آن ها را در منوی پایین قرار داده ایم.اگر که جواب سوال خود را در این بخش پیدا نکرده اید می توانید با رفتن به پنل کاربری خود و از بخش تیکت ها سوال خود را با ما در میان بگذارید. تیم لافایت گالری در کمتر از ۲۴ ساعت تیکت شما را بررسی و پاسخ خواهد داد.</p>
                                </section>
                               
                             </section>


                            {data.faqs.length > 0 ? data.faqs.map((faq, index) => (
                                
                                <div key={index}  className="w-3/4 ">
                                <div
                                    className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                    <h2 className={`mb-0 text-pallete`} >
                                        <button
                                            className="group relative flex w-full items-center justify-between rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                            type="button"
                                            onClick={()=>setFaqSelected(index)}
                                            >
                                           <p className="text-pallete">{faq?.question.replace(/<(.|\n)*?>/g, '')}</p>
                                            <FontAwesomeIcon  icon={index == faqSelected ?faAngleDown : faAngleLeft}/>
                                        </button>
                                    </h2>
                                    <div
                                        
                                        className={` ${index == faqSelected ? '' : 'hidden'}`}
                                         >
                                        <div className="px-5 py-4" dangerouslySetInnerHTML={{__html:faq?.answer}}>
                                           
                                        </div>
                                    </div>
                                </div>
                             
                            </div>
                            )) : null}
                          

                        </section>

                    </>
                ) : null
                }
            </section>
        </>
    )
}
export default Faq;