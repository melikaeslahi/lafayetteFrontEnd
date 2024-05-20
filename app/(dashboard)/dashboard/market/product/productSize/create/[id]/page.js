import CreateProductSize from "@/components/dashboard/Pages/Market/product/productSize/CreateProducSize";

 
 
export const metadata = {
    title: ' ایجاد  سایز    ',
}

const CreateSize = ({params}) => {
 
    return (
        <>
         <CreateProductSize params={params.id} />                  
        </>
    )
}
export default CreateSize;