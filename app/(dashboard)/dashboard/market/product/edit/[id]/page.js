import UpdateProduct from "@/components/dashboard/Pages/Market/product/UpdateProduct" 

export const metadata = {
    title: ' ویرایش  محصول ',

}

const Edit = ({ params }) => {
    return (

        <UpdateProduct params={params}  />
 
      
    )
}
export default Edit;
