import ProductSlider from "../ProductSlider";

const TabContent =({children})=>{
    return(
        <>
            <div className="w-full ml-auto mr-auto container" id="default-tab-content">
                {children}
                
            </div>
        </>
    );
}
export default TabContent;