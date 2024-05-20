import UpdateFaq from "@/components/dashboard/Pages/Content/faq/UpdateFaq";

 


export const metadata = {
    title: ' ویرایش دسته بندی ',

}

const Edit = ({ params }) => {
 
    return (

        <UpdateFaq  params={params}  />
 
      
    )
}
export default Edit;
