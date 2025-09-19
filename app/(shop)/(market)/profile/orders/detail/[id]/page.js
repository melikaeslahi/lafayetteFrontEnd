'use client'
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import { faArrowRight  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetDetailOrderQuery } from "@/services/customer/profile/profileApi";
import { TableError404, TableLoading, TableNotFound } from "@/components/dashboard/Table";
const Detail = ({ params }) => {
    const router = useRouter();
    const { data , isLoading , isSuccess , isError } = useGetDetailOrderQuery(params.id);
  
    return (<>
        <ProfileContainer className={'hidden'} title={'جزئیات سفارش'}>
            <section className={'flex justify-between items-center m-4 pb-4 border-b border-gray-300'}>
                <section className={'flex justify-start   mr-4'}>
                    <section className="flex  items-center">
                        <FontAwesomeIcon icon={faArrowRight} className="text-xl cursor-pointer pl-2" onClick={() => router.back()} />
                        <p>
                            جزئیات سفارش
                        </p>
                    </section>
                </section>
                <section className={'flex justify-start   mr-4'}>
                    <section className="flex justify-end   ml-4 text-pallete">
                        <Link href={`profile/orders/show/${params.id}`}>مشاهده ی فاکتور</Link>
                    </section>
                </section>
            </section>
{isLoading ? <TableLoading /> : isSuccess ? ( <section className="w-full">

<section className="flex flex-col md:flex-col lg:flex-row xl:flex-row lg:justify-start lg:items-center xl:justify-start xl:items-center pb-4 border-b border-gray-300">

    <section className="flex justify-between lg:justify-start xl:justify-start m-4">
        <p className="font-bold   text-gray-600 ml-2"> کد پیگیری سفارش </p>
        <p className="font-bold  mr-2 ">  {data?.orders.id} </p>


    </section>


    <section className="flex justify-between lg:justify-start xl:justify-start m-4">
        <p className="font-bold   text-gray-600 ml-2">  تاریخ ثبت سفارش </p>
        <p className="font-bold  mr-2">  {data?.orders.created_at}</p>
    </section>
</section>



<section className="flex flex-col justify-start pb-4 border-b border-gray-300">
    <section className="flex flex-col md:flex-col lg:flex-row xl:flex-row lg:justify-start lg:items-center xl:justify-start xl:items-center">
        <section className="flex justify-between lg:justify-start xl:justify-start m-4">
            <p className="font-bold   text-gray-600 ml-2">      تحویل گیرنده </p>
            <p className="font-bold  mr-2 ">   {data?.orders?.address?.recipient_first_name} {' '}  {data?.orders?.address?.recipient_last_name}  </p>


        </section>


        <section className="flex justify-between lg:justify-start xl:justify-start m-4">
            <p className="font-bold   text-gray-600 ml-2">     موبایل </p>
            <p className="font-bold  mr-2"> {data?.orders?.address?.mobile} </p>


        </section>
    </section>

    <section className="flex justify-between lg:justify-start xl:justify-start m-4">
        <p className="font-bold   text-gray-600 ml-2">      آدرس </p>
        <p className="font-bold  mr-2"> {data?.orders?.address?.address} </p>


    </section>
</section>

<section className="flex flex-col m-2 p-2 ">
    {data?.orders?.orderItems.map((item, index) => (

        <section key={index} className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 w-full h-full p-2 mt-2 border border-gray-300 rounded-lg">
            <section className="w-full flex justify-start items-center ">
                <section>
                <Image key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.singleProduct.image.indexArray.medium}`} className={'object-cover w-32 h-36 rounded-lg'} alt="image" width={'100'} height={'100'} unoptimized={true} />
                    
                </section>

                <section className="flex flex-col items-start">
                    <section className="flex   p-2 mt-1">
                        <p className="  text-sm font-bold text-pallete pl-1">نام محصول: </p>  <p className="text-sm font-normal align-baseline text-black">  {item.singleProduct.name}   </p>
                    </section>
                    <section className="flex   p-2 mt-1">
                        <p className="  text-sm font-bold text-pallete pl-1">  رنگ: </p>  <p className="text-sm font-normal align-baseline text-black">   {item.color.color_name}    </p>
                    </section>
                    <section className="flex   p-2 mt-1">
                        <p className="  text-sm font-bold text-pallete pl-1">   تعداد: </p>  <p className="text-sm font-normal align-baseline text-black">  {item.number}    </p>
                    </section>
                   
                </section>
            </section>
            <section className="flex    justify-end  items-end w-full h-full ">
                <section className="p-2 mt-1 flex flex-col w-full h-full justify-end items-center lg:items-end xl:items-end md:items-center  ">
                    {/* <section className="text-red-600  mb-1">تخفیف 313,000</section> */}
                    <section className=" font-bold">  {item.singleProduct.price}تومان</section>
                </section>

            </section>
        </section>
    ))}


</section>

</section>) : isError ? <TableError404 /> : null}
            

        </ProfileContainer>
    </>)

}
export default Detail;