'use client'
import { Button } from "@/components/dashboard/inputs";
import { faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";

const SelectedFiltering = () => {
    const { sort, filterValue } = useSelector(state => state.productsCustomer);

    return (
        <>
            {sort || filterValue ? (<section className="flex justify-start items-center flex-grow m-4">

                <section className="flex justify-start items-center mr-2 ">
                    <FontAwesomeIcon className="p-2  text-pallete" icon={faFilter} />
                    <p className="  mr-1 text-pallete font-bold">     فیلتر های اعمال شده:</p>

                </section>

                <section className="flex flex-grow">
                    {sort ? <>
                        <section className="flex justify-between items-center">
                            <p>  مرتب سازی بر اساس: </p>
                            <section className="m-1">
                                <section className="flex w-full justify-between items-center  bg-pallete bg-opacity-20   rounded-2xl">
                                    <Link href={'#'} className={'text-pallete text-sm flex justify-start p-2  w-full   rounded-xl'} >  {sort.value}  </Link>
                                    <Button className={'flex  justify-end p-2'}><FontAwesomeIcon className=" text-sm w-full text-pallete" icon={faClose} /></Button>

                                </section>
                            </section>
                        </section>
                    </> : null}

                    {filterValue?.search ? <>
                        <section className="flex justify-between items-center">
                            <p>     سرچ بر اساس: </p>
                            <section className="m-1">
                                <section className="flex w-full justify-between items-center  bg-pallete bg-opacity-20   rounded-2xl">
                                    <Link href={'#'} className={'text-pallete text-sm flex justify-start p-2  w-full   rounded-xl'} >  {filterValue?.search}   </Link>
                                    <Button className={'flex  justify-end p-2'}><FontAwesomeIcon className=" text-sm w-full text-pallete" icon={faClose} /></Button>

                                </section>
                            </section>
                        </section>
                    </> : null}

                    {filterValue?.max_price ? <>
                        <section className="flex justify-between items-center">
                            <p>          بیشترین قیمت از: </p>
                            <section className="m-1">
                                <section className="flex w-full justify-between items-center  bg-pallete bg-opacity-20   rounded-2xl">
                                    <Link href={'#'} className={'text-pallete text-sm flex justify-start p-2  w-full   rounded-xl'} >  {filterValue?.max_price}   </Link>
                                    <Button className={'flex  justify-end p-2'}><FontAwesomeIcon className=" text-sm w-full text-pallete" icon={faClose} /></Button>

                                </section>
                            </section>
                        </section>
                    </> : null}
                    {filterValue?.min_price ? <>
                        <section className="flex justify-between items-center">
                            <p>          کمترین قیمت  تا: </p>
                            <section className="m-1">
                                <section className="flex w-full justify-between items-center  bg-pallete bg-opacity-20   rounded-2xl">
                                    <Link href={'#'} className={'text-pallete text-sm flex justify-start p-2  w-full   rounded-xl'} >  {filterValue?.min_price}   </Link>
                                    <Button className={'flex  justify-end p-2'}><FontAwesomeIcon className=" text-sm w-full text-pallete" icon={faClose} /></Button>

                                </section>
                            </section>
                        </section>
                    </> : null}

                </section>


            </section>) : null}

        </>
    )
}
export default SelectedFiltering;