import Index from "@/components/dashboard/Pages/Market/product/productColor/Index";

 


export const metadata = {
    title: '  رنگ محصول' ,
}

const Gallery = ({params}) => {

    return (
        <>
          <Index params={params.id} />
        </>
    )

}
export default Gallery;
