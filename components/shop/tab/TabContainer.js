import ProductSlider from "../ProductSlider";
import Slider from "../Slider";

const TabContainer = ({children , className}) => {
    return (
        <>
<section className={`${className} flex flex-col justify-center items-center w-full  mb-10 mx-auto container`} > 
            {children}
</section>
          

        </>
    )
}
export default TabContainer;