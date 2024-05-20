 
import UpdateDelivery from "@/components/dashboard/Pages/Market/delivery/UpdateDelivery";

export const metadata = {
    title: ' ویرایش    روش ارسال ',

}

const Edit = ({ params }) => {
    return (

        <UpdateDelivery params={params.id}  />
 
      
    )
}
export default Edit;
