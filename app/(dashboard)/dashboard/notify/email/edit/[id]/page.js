 
import UpdateEmail from "@/components/dashboard/Pages/Notify/email/UpdateEmail";

export const metadata = {
    title: ' ویرایش  ایمیل   ',

}

const Edit = ({ params }) => {
    return (

        <UpdateEmail params={params.id}  />
 
      
    )
}
export default Edit;
