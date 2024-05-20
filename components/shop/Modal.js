import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpenClose } from '@/store/reducers/dashboard/UtilSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
const Modal = ({ children, title, button, blur, position, widthAndHiegth, margin, close ,show , closeMethod }) => {

    const { isOpenModal } = useSelector((state) => state.util);
    const dispatch = useDispatch();



    return (
        <Transition
            show={show ? show : false}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}>
            <Dialog
                open={show  ? show : false}
                onClose={() => dispatch(closeMethod(false))}
                className="relative w-full z-[1038]">
                <div
                    className={`${blur} fixed inset-0 bg-black/30 backdrop-blur`}
                    aria-hidden="true"
                />
                <div className={`${margin} fixed inset-0 overflow-y-auto w-full mx-auto container`}>
                    <div className={`${position ? position : 'fixed  inset-0 flex justify-center items-center  w-full p-4'} `}>
                        <Dialog.Panel
                            className={`${widthAndHiegth ? widthAndHiegth : 'w-5/6  h-5/6 '}    overflow-y-auto  border rounded-lg border-pallete  dark:bg-zinc-700 bg-white only:p-4`}>
                            <Dialog.Title className={ `${title ? 'visible text-pallete p-2 border-b-2 mb-3 border-pallete flex justify-between items-center' : 'hidden'} `}>
                                <section className='w-3/4    justify-start'>
                                    <FontAwesomeIcon icon={faArrowLeft} />  {title} <FontAwesomeIcon icon={faArrowRight} />
                                </section>
                                <section className='justify-end w-1/4'>
                                    <FontAwesomeIcon
                                        className={`${close ? 'hover:cursor-pointer' : 'hidden'}  `}
                                        onClick={() => dispatch(closeMethod(false))}
                                        icon={faClose} />
                                </section>

                            </Dialog.Title>
                            <Dialog.Description
                                as='section'
                                className={`p-2   dark:text-gray-100 text-black`}>
                                {children}

                            </Dialog.Description>



                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default Modal
