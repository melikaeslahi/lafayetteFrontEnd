'use client';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { Button  } from "../dashboard/inputs";
import { modalOpenClose, setIsCommentModal, } from "@/store/reducers/dashboard/UtilSlice";
import profile from '../../public/image/download.jpg'
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import AddComment from "./comment/AddComment";
import { useState } from "react";
import { useEffect } from "react";
import { setCommentModal } from "@/store/reducers/customer/ProductSlice";
import CartItemModal from "./pages/salesProccess/cartItem/CartItemModal";
 
const Comment = () => {
    const { comments ,commentModal  } = useSelector(state => state.productCustomer);
    const { isOpenModal ,isCommentModal } = useSelector(state => state.util);
    const {isComment , setIsComment} = useState(false);
    const dispatch = useDispatch();
useEffect(()=>{
    if(isOpenModal === false)
    dispatch(setCommentModal(false));
}, [isOpenModal])
   



    const handlerModal = () => {
        
        dispatch(setIsCommentModal(true));
        

    }
    return (
        <>
            { isCommentModal  ? <AddComment   />  : null}
            <section className="w-full">
                <section className="w-full  border border-dashed border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">
                    <section className="flex justify-center items-center">
                        <Button href={''} onClick={() => handlerModal()} className="text-pallete"
                        ><FontAwesomeIcon className=" text-pallete" icon={faPlusCircle} />    ثبت نظر  </Button>
                    </section>
                </section>
            </section>
            {comments?.map((comment, index) => (
                <section key={index} className="w-full">
                    <section className="w-full flex flex-col justify-between items-start   border  border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">
                        <section className="w-full border-b border-gray-300 p-2 mb-2">
                            <section className="w-full flex justify-start items-center">
                                <section className="ml-2">
                                    <p className="text-pallete font-bold text-lg">   {comment?.user?.first_name && comment?.user?.last_name ? comment?.user.first_name + ' ' + comment?.user.last_name : 'ناشناس'}  </p>
                                </section>
                                <section className=" mr-2 flex justify-start items-center" >
                                    <p className="text-xs">  {comment.created_at}   </p>
                                </section>
                            </section>
                        </section>
                        <section className="w-full flex justify-start items-center">
                            <section className=" ml-2">
                                <Image src={comment.user?.profile_photo_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${comment.user?.profile_photo_path}` : profile} width={'100'} height={'100'} className={'w-12 h-12 rounded-full object-cover '} unoptimized={true} />
                            </section>
                            <section className="mr-2">
                                {comment.body}
                            </section>
                        </section>
                        {comment?.answer?.map((answer, index) => (
                            <section key={index} className="w-full">
                                <section className="w-full flex flex-col justify-between items-start   border  border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">
                                    <section className="w-full border-b border-gray-300 p-2 mb-2">
                                        <section className="w-full flex justify-start items-center">
                                            <section className="ml-2">
                                                <p className="text-pallete font-bold text-lg">   {answer?.user?.first_name && answer?.user?.last_name ? answer?.user?.first_name + ' ' + answer?.user?.last_name : 'ناشناس'}  </p>
                                            </section>
                                            <section className=" mr-2 flex justify-start items-center" >
                                                <p className="text-xs">  {answer.created_at}   </p>
                                            </section>
                                        </section>
                                    </section>
                                    <section className="w-full flex justify-start items-center">
                                        <section className=" ml-2">
                                            <Image src={answer?.user?.profile_photo_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${answer?.user?.profile_photo_path}` : profile} width={'100'} height={'100'} className={'w-12 h-12 rounded-full object-cover '} unoptimized={true} />
                                        </section>
                                        <section className="mr-2">
                                            {answer.body}
                                        </section>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </section>
                </section>
            ))}
        </>
    )
}
export default Comment;