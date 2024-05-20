'use client'
 
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import {   faEdit  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import { Button , Input  } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
 
import { modalOpenClose, setHandlerModal, setUpdateInfo } from "@/store/reducers/dashboard/UtilSlice";
 
 
import { Form, Formik } from "formik";
 
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "@/components/shop/pages/profile/UpdateProfile";
import SuccessAlert from "@/components/dashboard/inputs/SuccessAlert";



const  Information = () => {
    const { isOpenModal } = useSelector(state => state.util);
    const {  user } = useSelector(state => state.auth);
 
 
    const dispatch = useDispatch();
    

   

    const handlerModal = (id) => {
        dispatch(setUpdateInfo(id))
    
        dispatch(modalOpenClose(true));
    }

    return (
        <>
           {isOpenModal ? <UpdateProfile /> :null}
            <ProfileContainer title={' اطلاعات من '}>
                

                <section className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-1 md:grid-cols-1 place-items-center">

                    <section className="flex justify-start items-center p-2 m-2 border border-pallete rounded-lg w-full">
                        <p className="text-lg font-bold  text-pallete ">نام:   </p> 
                        <p className="text-sm    text-black ">   {user?.user?.first_name ?? '_'}   </p> 
                    </section>
                    <section className="flex justify-start items-center p-2 m-2 border border-pallete rounded-lg w-full">
                        <p className="text-lg font-bold  text-pallete "> نام خانوادگی:   </p> 
                        <p className="text-sm    text-black ">     {user?.user?.last_name ?? '_'}    </p> 
                    </section>
                    <section className="flex justify-start items-center p-2 m-2 border border-pallete rounded-lg w-full">
                        <p className="text-lg font-bold  text-pallete ">  شماره موبایل  :   </p> 
                        <p className="text-sm    text-black ">     {user?.user?.mobile ?? '_'}   </p> 
                    </section>
                    <section className="flex justify-start items-center p-2 m-2 border border-pallete rounded-lg w-full">
                        <p className="text-lg font-bold  text-pallete ">   ایمیل :   </p> 
                        <p className="text-sm    text-black ">     {user?.user?.email ?? '_'}     </p> 
                    </section>
                    <section className="flex justify-start items-center p-2 m-2 border border-pallete rounded-lg w-full">
                        <p className="text-lg font-bold  text-pallete ">    کد  ملی :   </p> 
                        <p className="text-sm    text-black ">       {user?.user?.national_code ?? '_'}  </p> 
                    </section>
                    <section className="flex justify-center items-center p-2 m-2 border  border-dashed border-pallete rounded-lg w-full">
                    <Button href={''} onClick={() => handlerModal(user?.user?.id)} className="text-pallete"
                            ><FontAwesomeIcon className=" text-pallete" icon={faEdit} />  ویرایش آدرس</Button>
                    </section>
                </section>
                 
            </ProfileContainer>
        </>
    )
}
export default Information;