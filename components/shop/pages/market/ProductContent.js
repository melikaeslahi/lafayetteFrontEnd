import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GallerySlider from "../../GallerySlider";
 
import { useSelector } from "react-redux";
import ProductGalleryModal from "../../modals/ProductGalleryModal";
 

const  ProductContent = ({children , title , className }) =>{
  const {   isProductGalleryOpen } =  useSelector(state => state.productCustomer);

    return(
        <>
        <section  className="relative flex flex-col p-1 xl:ml-1 lg:ml-1 w-full  xl:w-2/6 lg:w-2/6  md:w-full border my-2 border-gray-300  shadow-lg shadow-gray-200  rounded-lg ">
        {isProductGalleryOpen ? <ProductGalleryModal /> : null}
              <GallerySlider /> 
        </section>
          <section className="flex flex-col p-1  w-full xl:w-4/6 lg:w-4/6   md:w-full border my-2 border-gray-300  shadow-lg shadow-gray-200  rounded-lg " >
                    <section className="p-2 m-3 flex border-b border-pallete">
                        <FontAwesomeIcon icon={faArrowLeft} className={'text-pallete text-xl font-extrabold p-2'} />
                        <h1 className="text-pallete text-lg text-right font-bold">{title}</h1>
                        <FontAwesomeIcon icon={faArrowRight} className={'text-pallete text-xl font-extrabold p-2'} />
                    </section>
                    <section cElassName={`${className}`}>
                    {children} 

                    
                    </section>
                
                 </section>
        </>
    )
}
export default ProductContent;