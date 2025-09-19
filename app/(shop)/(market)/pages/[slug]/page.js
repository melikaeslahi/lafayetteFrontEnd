'use client';
import { useGetPageMutation } from "@/services/customer/homeApi";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import logo from '../../../../../public/image/logoOne.jpg';


const Pages = ({ params }) => {
    const [pages, { data: page, isSuccess }] = useGetPageMutation();

    useEffect(() => {
        if (params) {
            async function page() {
                const data = await pages(params.slug).unwrap();
            }
            page();
        }
    }, [params])

    function createMarkup() {
        return { __html: page.page?.body };
    }


    return (
        <>
            <section className="flex flex-col p-3  w-86 mx-auto my-10 container md:w-full border   border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                {isSuccess ? (
                    <>
                        <section className="p-2 m-3 flex border-b border-pallete">
                            <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                            <h1 className="text-pallete text-lg text-right font-bold">{page.page?.title}</h1>
                            <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                        </section>
                        <section className="prose" dangerouslySetInnerHTML={createMarkup()}>
                            {/* {page.page?.body} */}
                        </section>
                        

                     
            </>
            ) : null
                }
        </section >
        </>
    )
}
export default Pages;