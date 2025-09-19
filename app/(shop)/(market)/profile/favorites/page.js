'use client';
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { useSelector } from "react-redux";
import { Button } from "@mantine/core";
import { useDeleteFavoriteMutation } from "@/services/customer/profile/profileApi";
import { useEffect } from "react";
import { toast } from "react-toastify";



const Favorites = () => {
    const { user } = useSelector(state => state.auth);

    const [deleteFavorite, { data }] = useDeleteFavoriteMutation();
    const handlerDelete = async (id) => {
        await deleteFavorite(id);
    }

    console.log(user)

    useEffect(() => {
        if (data?.status === 200) {
            toast.success(' محصول مورد نظر از لیست علاقه مندی ها حذف شد ', {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        }
    }, [data])


    return (
        <>
            <ProfileContainer title={'لیست علاقه مندی های من'}>

                <section className="flex flex-col m-2 p-2 ">

                      {user?.products.map((product, index) => (

                        <section key={index} className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 w-full h-full p-2 mt-2 border border-gray-300 rounded-lg">
                            <section className="w-full flex justify-start items-center ">
                                <section>
                                    <Image key={index} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.image.indexArray.medium}`} className={'object-cover w-32 h-36 rounded-lg'} alt="image" width={'100'} height={'100'} unoptimized={true} />
                                </section>

                                <section className="flex flex-col items-start">
                                    <section className="flex   p-2 mt-1">
                                        <p className="  text-sm font-bold text-pallete pl-1">نام محصول: </p>  <p className="text-sm font-normal align-baseline text-black">   {product.name}  </p>
                                    </section>
                                    <section className="flex   p-2 mt-1">
                                        <p className="  text-sm font-bold text-pallete pl-1">  رنگ: </p>  <p className="text-sm font-normal align-baseline text-black">   {product.colors.map((color, index) => (<p key={index}> {color.color_name} {'-'} </p>))}   </p>
                                    </section>
                                    <section className="   p-2 mt-1">
                                        <Button type="submit" onClick={() => handlerDelete(product.id)} className={'text-sm text-red-600'}>  <FontAwesomeIcon icon={faTrashAlt} className={'text-pallete'} />  حذف از لیست علاقه مندی  ها  </Button>
                                    </section>
                                </section>
                            </section>
                            <section className="flex    justify-end  items-end w-full h-full ">
                                <section className="p-2 mt-1 flex flex-col w-full h-full justify-end items-center lg:items-end xl:items-end md:items-center  ">
                                    <section className="text-red-600  mb-1">تخفیف 313,000</section>
                                    <section className=" font-bold"> {product.price} </section>
                                </section>

                            </section>
                        </section>
                    ))}  




                </section>

            </ProfileContainer>
        </>
    )
}
export default Favorites;