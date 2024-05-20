import UpdateSetting from "@/components/dashboard/Pages/Setting/setting/UpdateSetting";

 

export const metadata = {
    title: ' ویرایش  تنظیمات ',

}

const Edit = ({ params }) => {
    return (

        <UpdateSetting  params={params.id}  />
 
      
    )
}
export default Edit;
