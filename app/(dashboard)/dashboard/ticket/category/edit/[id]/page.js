import UpdateCategory from "@/components/dashboard/Pages/Ticket/category/UpdateCategory";

 

export const metadata = {
    title: ' ویرایش دسته بندی ',

}

const Edit = ({ params }) => {
    return (

        <UpdateCategory params={params.id}  />
 
      
    )
}
export default Edit;
