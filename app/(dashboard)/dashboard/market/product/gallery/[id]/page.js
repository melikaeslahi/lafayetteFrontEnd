import Index from "@/components/dashboard/Pages/Market/product/gallery/Index";


export const metadata = {
    title: ' گالری محصول' ,
}

const Gallery = ({params}) => {

    return (
        <>
          <Index params={params.id} />
        </>
    )

}
export default Gallery;
