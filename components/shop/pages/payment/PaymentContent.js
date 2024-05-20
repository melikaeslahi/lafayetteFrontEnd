import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PaymentContent = ({children , title , className }) =>{
    return(
        <>
          <section className="flex flex-col p-3  w-full   md:w-full border my-2 border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                    <section className="p-2 m-3 flex border-b border-pallete">
                        <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                        <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                        <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                    </section>
                    <section className={`${className}`}>
                    {children} 
                    </section>
                
                 </section>
        </>
    )
}
export default PaymentContent;