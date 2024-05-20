import { useDispatch, useSelector } from "react-redux";
import CreateAddress from "./CreateAddress";
import { Button } from "@/components/dashboard/inputs";
import {   faPlusSquare  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modalOpenClose, setIsCreateAddressModal  } from "@/store/reducers/dashboard/UtilSlice";
const HandlerCreateAddressModal = () => {
    const {isCreateAddressModal } = useSelector(state => state.util);

    const dispatch = useDispatch()
    return (
        <>
            {isCreateAddressModal ? <CreateAddress /> : null}
            <section className="w-full  border border-dashed border-gray-300  rounded-lg  p-2 mt-2 hover:border-pallete cursor-pointer">

                <section className="flex justify-center items-center">
                    <Button href={''} onClick={() => { dispatch(setIsCreateAddressModal(true)) }} className="text-pallete"
                    ><FontAwesomeIcon className=" text-pallete" icon={faPlusSquare} />   ایجاد آدرس</Button>
                </section>


            </section>
        </>
    )
}
export default HandlerCreateAddressModal;