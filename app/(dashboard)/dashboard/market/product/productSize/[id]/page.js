import Index from "@/components/dashboard/Pages/Market/product/productSize/Index";

 

 


export const metadata = {
    title: '  سایز محصول' ,
}

const  Size = ({params}) => {

    return (
        <>
          <Index params={params.id} />
        </>
    )

}
export default Size;
