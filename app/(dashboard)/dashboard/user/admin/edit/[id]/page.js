 
import UpdateAdmin from "@/components/dashboard/Pages/User/admin/UpdateAdmin";

export const metadata = {
    title: ' ویرایش کاربر ادمین ',

}

const Edit = ({ params }) => {
    return (

        <UpdateAdmin params={params.id}  />
 
      
    )
}
export default Edit;
