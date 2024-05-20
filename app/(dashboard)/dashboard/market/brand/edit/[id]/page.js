import UpdateBrand from "@/components/dashboard/Pages/Market/brand/UpdateBrand";

 

export const metadata = {
    title: ' ویرایش    برند ',

}

const Edit = ({ params }) => {
    return (

        <UpdateBrand params={params}  />
 
      
    )
}
export default Edit;
