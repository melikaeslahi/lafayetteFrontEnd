import CreateProductColor from "@/components/dashboard/Pages/Market/product/productColor/CreateProductColor";
 
export const metadata = {
    title: ' ایجاد  رنگ    ',
}

const Create = ({params}) => {
 
    return (
        <>
         <CreateProductColor params={params.id} />                  
        </>
    )
}
export default Create;
