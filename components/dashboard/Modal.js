import { Dialog, Transition } from '@headlessui/react'
import {  Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpenClose } from '@/store/reducers/dashboard/UtilSlice'
const Modal = ({ name, children }) => {
  
    const {isOpenModal} =useSelector((state)=>state.util );
    const dispatch = useDispatch();

console.log(isOpenModal)
    
    return (
        <Transition
            show={isOpenModal ? isOpenModal : false }
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className={'z-50'}
            as={Fragment}>
            <Dialog
                open={isOpenModal ? isOpenModal : false}
                onClose={() => dispatch(modalOpenClose(false))}
                className="relative z-[1038]">
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            className={`w-full max-w-sm  border rounded-lg border-pallete  dark:bg-zinc-700 bg-white only:p-4`}>
                            <Dialog.Title className="text-pallete p-2 border-b-2 mb-3 border-pallete">
                                آیا میخواهید {name} پاک شود؟
                            </Dialog.Title>
                            <Dialog.Description
                                className={`p-2 dark:text-gray-100 text-black`}>
                                برای حذف روی دکمه های زیر باید کلیک شود دقت کنید
                                که بعد از حذف دسته بندی امکان بازگرداندن آن وجود
                                ندارد
                            </Dialog.Description>

                            {children}
                            <button
                                className="bg-white text-pallete border rounded-lg border-pallete px-4 py-1 m-2"
                                onClick={() => dispatch(modalOpenClose(false))}>
                               
                                بستن 
                            </button>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default Modal
