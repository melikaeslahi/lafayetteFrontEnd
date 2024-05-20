'use client'
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import { faAngleLeft, faCalendarAlt, faClock, faEdit, faIdCardAlt, faMapMarkerAlt, faMobileAlt, faTrashAlt, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { useGetOrdersQuery } from "@/lib/customer/profile/profileApi";
import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { TableError404, TableLoading, TableNotFound } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";



const Orders = () => {
    const {  isError:error , isSuccess:success , isLoading:loading ,length  } =  useSelector((state) => state.util);
    const router = useRouter();
    const dispatch = useDispatch();
    const pathName = usePathname();
    const params = useSearchParams();
    const [type, setType] = useState(null);
    const [statusType, setStatusType] = useState('همه');
    

    const {data ,isLoading , isSuccess , isError } =   useGetOrdersQuery({type})   ;
    const newParams = new URLSearchParams(params.toString());

    useEffect(()=>{
      if(data){
      
        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(data?.orders.length));
      }
    }, [data , isLoading , isSuccess , isError]);
    

    useEffect(() => {
        if (type || type == 0 && type !==null) {
            
            newParams.set('type', type);
        }
         else{
            newParams.delete('type');
        }
        router.replace(`${pathName}?${newParams}`);

    }, [type, newParams, pathName, router])

 


    return (
        <>
            <ProfileContainer title={'سفارشات من'}>
                <section className="flex justify-center m-3 p-2 flex-row flex-wrap ">
                    <button class="ml-2 mb-1 px-4 py-1 bg-sky-400 text-white rounded-lg text-sm" onClick={() => {
                         setType(null);
                        setStatusType('همه');
                    }} >  همه  </button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-sky-600 text-white rounded-lg text-sm" onClick={() => {
                        setType(1);
                        setStatusType('در انتظار تایید');
                    }} > در انتظار تایید</button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-yellow-400 text-white rounded-lg text-sm" onClick={() => {
                        setType(2);
                        setStatusType('تایید شده');
                    }}>تایید شده    </button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-yellow-600 text-white rounded-lg text-sm" onClick={() => {
                        setType(0);
                        setStatusType('بررسی نشده');
                    }}> بررسی نشده    </button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-green-400 text-white rounded-lg text-sm" onClick={() => {
                        setType(3);
                        setStatusType('تایید تشده');
                    }}>  تایید نشده</button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-red-400 text-white rounded-lg text-sm" onClick={() => {
                        setType(4);
                        setStatusType('مرجوع شده');
                    }}> مرجوع شده</button>
                    <button class="ml-2 mb-1 px-4 py-1 bg-black  text-white rounded-lg text-sm" onClick={() => {
                        setType(5);
                        setStatusType('باطل شده');
                    }}>باطل شده</button>
                </section>
                <section className="flex flex-col m-2 p-2">
                    <p className="text-sm text-pallete">{statusType}</p>
                    {loading ? <TableLoading /> : success ? (    length > 0   ? 
                        ( data?.orders.map((order, index) => (
                           
                            <section key={index} className="w-full flex justify-between items-start p-2 mt-2 border border-gray-300 rounded-lg">
                                <section className="flex flex-col w-full justify-start items-start ">
                                    <section className="p-2 m-2 w-3/4 flex justify-between items-start ">
                                        <section className="flex text-sm items-center"><FontAwesomeIcon className="text-pallete text-sm" icon={faCalendarAlt} />
                                            {order.created_at}
                                        </section>
                                        <section className="flex text-sm items-center"><FontAwesomeIcon className="text-pallete text-sm" icon={faIdCardAlt} />کد سفارش : {order.id}
                                        </section>
                                        <section className="flex text-sm items-center"><FontAwesomeIcon className="text-pallete text-sm" icon={faClock} />    {order.orderStatusValue}
                                        </section>
    
                                        <section className="flex text-sm items-center"><FontAwesomeIcon className="text-pallete text-sm" icon={faClock} />    {order.deliveryStatusValue}
                                        </section>
                                    </section>
                                    <section className="w-full flex flex-row flex-wrap border-b  border-gray-300">
                                        {order?.orderItems.map((item, index) => {
    
                                            return (<Link href="" className="m-2 border border-pallete rounded-lg">
    
                                                <Image key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.singleProduct.image.indexArray.small}`} alt="image" width={'100'} height={'100'} unoptimized={true} />
    
                                            </Link>)
    
                                        })}
                                    </section>
                                     
                                     <section className="w-full flex justify-between items-center m-4">
                                           <section className="flex justify-start w-1/4 mt-4">
    
                                    <Link className="text-pallete text-sm" href="#">پرداخت سفارش</Link>
    
                                </section>
    
                               
                                     <section className=" flex justify-end w-1/4 mt-4">
                                    <Link className="text-pallete text-sm" href={`/profile/orders/show/${order.id}`}>  مشاهده ی فاکتور  </Link>
                                    </section> 
                                   
                                     </section>
    
    
    
                                </section>
                               
                                     <section className=" flex justify-end  m-4">
                                    <Link className="text-pallete text-sm" href={`/profile/orders/detail/${order.id}`}> <FontAwesomeIcon icon={faAngleLeft}  />  </Link>
                                    </section>
                            </section> 
                              
                        ))    )
                        : <TableNotFound />)   : error ? <TableError404 />  :null  }








                </section>

            </ProfileContainer>
        </>
    )
}
export default Orders;