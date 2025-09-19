'use client'
import { TableError404, TableLoading } from "@/components/dashboard/Table";
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import { useGetShowOrderQuery } from "@/services/customer/profile/profileApi";
import { faArrowRight ,faEdit, faMapMarkerAlt, faMobileAlt, faTrashAlt, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Detail =({params})=>{

    const router = useRouter();

    const { data , isLoading, isSuccess , isError } =   useGetShowOrderQuery(params.id);

    return(<>
    <ProfileContainer className={'hidden'} title={' فاکتور'}>
        
    <section className={'flex justify-between items-center m-4 pb-4 border-b border-gray-300'}>
                <section className={'flex justify-start   mr-4'}>
                    <section className="flex  items-center">
                        <FontAwesomeIcon icon={faArrowRight} className="text-xl cursor-pointer pl-2" onClick={() => router.back()} />
                        <p>
                               فاکتور
                        </p>
                    </section>
                </section>
                <section className={'flex justify-start   mr-4'}>
                    <section className="flex justify-end   ml-4 text-pallete">
                        <Link href={`profile/orders/show/${params.id}`}> پرینت / دانلود </Link>
                    </section>
                </section>
            </section>
            {isLoading ? <TableLoading /> : isSuccess ? ( <section className="w-full border-2 border-black rounded-lg p-3">
            <section className="flex justify-between items-center border-b border-gray-200">
                <section className="flex justify-start">
                    <p className="font-bold">فاکتور فروش</p>
                </section>
                <section className=" flex jsutify-end">
                    <section className="w-full flex flex-col">
                        <section className="flex  ">
                            <p className="pl-2">تاریخ:</p>
                            <p>{data?.orders.created_at}</p>
                        </section>
                        <section className="flex  ">
                            <p className="pl-2">شماره:</p>
                            <p>{data?.orders.id}</p>
                        </section>
                    </section>
                </section>
            </section>

            <section className="flex justify-between items-center pb-5">
                <section className="flex justify-start">
                <section className="w-full flex flex-col">
                        <section className="flex  ">
                            <p className="pl-2"> خریدار:</p>
                            <p>  {data?.orders.user.first_name} {' '} {data?.orders.user.last_name}   </p>
                        </section>
                        <section className="flex  ">
                            <p className="pl-2"> آدرس:</p>
                            <p>     {data?.orders.address.address}       </p>
                        </section>
                    </section>
                </section>
                <section className=" flex jsutify-end">
                    <section className="w-full flex flex-col">
                        <section className="flex  ">
                            <p className="pl-2"> تلفن:</p>
                            <p>  {data?.orders.address.mobile} </p>
                        </section>
                       
                    </section>
                </section>
            </section>

             <section className="w-full">
                <table className="w-full ">
                    <thead className=" ">
                    <tr className="flex">
                        <th className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg">ردیف</th>
                   
                        <th className="flex justify-center w-4/12 border border-black mr-1 mb-1 rounded-lg  "> شرح کالا و خدمات</th>
                     
                        <th className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg"> تعداد</th>
                     
                        <th className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg"> واحد</th>
                    
                        <th className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg"> قیمت واحد</th>
                   
                        <th className="flex justify-center w-2/12   border border-black mr-1 mb-1 rounded-lg "> قیمت کل</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data?.orders.orderItems.map((item , index)=>(
                            <tr key={index} className="flex">
                            <td className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg">  {index + 1} </td>
                        
                       
                            <td className="flex justify-center w-4/12 border border-black mr-1 mb-1 rounded-lg">   {item.singleProduct.name}    </td>
                                          
                       
                            <td className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg"> {item.number}  </td>
                                          
                       
                            <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg">  سایز </td>
                                     
                       
                            <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg">   {item.singleProduct.price}  </td>
                                         
                         
                            <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg ">    {item.singleProduct.price * item.number } </td>
                        </tr>
    
                        ))}
                    
                    <tr className="flex">
                        <th className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg">  جمع کل </th>          
                        <td className="flex justify-center w-9/12 border border-black mr-1 mb-1 rounded-lg">      </td>
                        <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg ">    {data?.orders.order_discount_amount}</td>
                    </tr>

                    <tr className="flex">
                        <th className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg">   تخفیف   </th>          
                        <td className="flex justify-center w-9/12 border border-black mr-1 mb-1 rounded-lg">      </td>
                        <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg ">   {data?.orders.order_total_products_discount_amount}  </td>
                    </tr>
                    <tr className="flex">
                        <th className="flex justify-center w-1/12 border border-black mr-1 mb-1 rounded-lg">     قابل پرداخت </th>          
                        <td className="flex justify-center w-9/12 border border-black mr-1 mb-1 rounded-lg">      </td>
                        <td className="flex justify-center w-2/12 border border-black mr-1 mb-1 rounded-lg ">   {data?.orders.order_final_amount}  </td>
                    </tr>
                    <tr className="flex">
                        <td className="flex justify-center w-full border border-black mr-1 mb-1 rounded-lg"> توضیحات: از انتخاب شما سپاس گذاریم </td>                    
                    </tr>
                    </tbody>
                    
                    
                     
                </table>
                
             </section>
               


             <section className="flex justify-between items-center pb-5">
                <section className="flex justify-start">
                <section className="w-full flex flex-col">
                         
                        <section className="flex  ">
                            <p className="pl-2"> آدرس:</p>
                            <p> تهران رودهن  پاساژ عسگری   طبقه پایین پلاک  55</p>
                        </section>
                    </section>
                </section>
                <section className=" flex jsutify-end">
                    <section className="w-full flex flex-col">
                        <section className="flex  ">
                            <p className="pl-2"> تلفن:</p>
                            <p>  09386695925 </p>
                        </section>
                       
                    </section>
                </section>
            </section>

          </section>) : isError ? <TableError404 /> : null  }

         


    </ProfileContainer>
    </>)

}
export default Detail;