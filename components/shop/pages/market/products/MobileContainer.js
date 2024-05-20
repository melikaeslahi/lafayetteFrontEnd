import { Button } from "@/components/dashboard/inputs";
import { setCloseMobileSortAndFilter } from "@/store/reducers/customer/ProductsSlice";
import { faArrowLeft, faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux"

const MobileContainer = ({children , title  , handlerClose})=>{
    const dispatch = useDispatch();
//mt-2 nadarim inja
    return(<>
    <section className="absolute top-0 right-0 bottom-0 left-0 flex flex-col p-3 xl:mr-2 lg:mr-2  w-full  h-full bg-white z-50 border border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                        <section className="w-full p-2 m-3 flex border-b border-pallete">
                            <section className="p-2 m-3 flex   w-3/4 ">
                                <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                                <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                                <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                            </section>

                            <section className="p-2 m-3 flex justify-end  w-1/4">
                                <Button onClick={() => dispatch(handlerClose(false))}>
                                    <FontAwesomeIcon icon={faClose} className={'text-pallete text-xl font-extrabold p-2'} />
                                </Button>
                            
                            </section>
                        </section>
                        <section>
                         
                       {children}
                         
                           
                        </section>

                    </section>
    </>);
}
export default MobileContainer;