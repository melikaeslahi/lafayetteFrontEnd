import UpdateCategory from "@/components/dashboard/Pages/Market/category/UpdateCategory";
import UpdateSMS from "@/components/dashboard/Pages/Notify/sms/UpdateSMS";

export const metadata = {
    title: ' ویرایش    پیام ',

}

const Edit = ({ params }) => {
    return (

        <UpdateSMS params={params.id}  />
 
      
    )
}
export default Edit;
