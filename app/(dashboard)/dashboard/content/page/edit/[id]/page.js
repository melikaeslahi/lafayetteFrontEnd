import UpdatePage from "@/components/dashboard/Pages/Content/page/UpdatePage";

 


export const metadata = {
    title: ' ویرایش  صفحه ',

}

const Edit = ({ params }) => {
 
    return (

        <UpdatePage  params={params}  />
 
      
    )
}
export default Edit;
