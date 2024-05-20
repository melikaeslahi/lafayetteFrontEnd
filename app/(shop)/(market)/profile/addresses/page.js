'use client'
import { Button, Input } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import ProfileContainer from "@/components/shop/pages/profile/ProfileContainer";
import CreateAddress from "@/components/shop/pages/profile/address/CreateAddress";
import HandlerCreateAddressModal from "@/components/shop/pages/profile/address/HandlerOpenCreateModal";
import UpdateAddress from "@/components/shop/pages/profile/address/UpdateAddress";
import { modalOpenClose, setIsCreateAddressModal, setIsUpdateAddressModal, setUpdateAddress, } from "@/store/reducers/dashboard/UtilSlice";
import { faEdit, faMapMarkerAlt, faMobileAlt, faPlusSquare, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Addresses = () => {
    const { isOpenModal, isIdAddress , isCreateAddressModal  ,isUpdateAddressModal} = useSelector(state => state.util);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const handlerModal = (address) => {
        if (address) {
            localStorage.setItem('address', JSON.stringify(address))

            dispatch(setUpdateAddress(address.id))

            dispatch(setIsUpdateAddressModal(true));
        }


    }

    return (
        <>
            {isCreateAddressModal ?  <CreateAddress /> : null}
            {isUpdateAddressModal ? <UpdateAddress /> : null}

            <ProfileContainer title={'آدرس های من'}>
                {user.user?.addresses.map((address, index) => (<section key={index} className="w-full border border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer" style={{}}>
                    <input type="radio" name="address_id" value={address.id} className="hidden" id={`a-${address.id}`} />

                    <label htmlFor={`a-${address.id}`} className=" mb-2  ">
                        <section className="mb-2">
                            <FontAwesomeIcon className="mx-1 text-pallete" icon={faMapMarkerAlt} />
                            آدرس :   {address?.address ?? ' - '}

                        </section>
                        <section className="mb-2">
                            <FontAwesomeIcon className=" mx-1 text-pallete" icon={faUserTag} />
                            گیرنده :      {address?.recipient_first_name ?? ' - ' } {' '} {address?.recipient_last_name ?? ' - '}

                        </section>
                        <section className="flex justify-between mb-1">
                            <section className="">
                                <FontAwesomeIcon className="mx-1 text-pallete" icon={faMobileAlt} />
                                موبایل گیرنده :   {address?.mobile ?? ' - '}
                            </section>
                            <Button href={''} onClick={() => handlerModal(address)} className="text-pallete"
                            ><FontAwesomeIcon className=" text-pallete" icon={faEdit} />  ویرایش آدرس</Button>
                        </section>


                    </label>
                </section>))}


                <section className="w-full  border border-dashed border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">

                    <section className="flex justify-center items-center">
                        <Button href={''} onClick={() => {
                            dispatch(setIsCreateAddressModal(true))
                            
                        }} className="text-pallete"
                        ><FontAwesomeIcon className=" text-pallete" icon={faPlusSquare} />   ایجاد آدرس</Button>
                    </section>


                </section>


            </ProfileContainer>
        </>
    )
}
export default Addresses;




