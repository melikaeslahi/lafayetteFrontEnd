 
import GallerySlider from "../GallerySlider";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import { setIsProductGalleryOpen } from "@/store/reducers/customer/ProductSlice";

const  ProductGalleryModal = () =>{
  const { isProductGalleryOpen } =  useSelector(state => state.productCustomer);

    return(<>
    <Modal title={'گالری تصاویر'}
           show={isProductGalleryOpen}
           closeMethod={setIsProductGalleryOpen}
           widthAndHiegth={'w-full md:w-full xl:3/4 lg:w-3/4 h-full'}
           
       >
       <section className="flex flex-col lg:flex xl:flex  my-auto h-full"> 
       <GallerySlider />
        
       </section>

    </Modal>
    </>);
}
export default ProductGalleryModal;