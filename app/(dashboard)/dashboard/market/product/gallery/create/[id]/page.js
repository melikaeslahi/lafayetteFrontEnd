import CreateGallery from "@/components/dashboard/Pages/Market/product/gallery/CreateGallery";

 

 
export const metadata = {
    title: ' ایجاد  تصویر    ',
}

const Create = ({params}) => {
 
    return (


        <>
         <CreateGallery params={params.id} />
      
                   
        </>
    )
}
export default Create;
