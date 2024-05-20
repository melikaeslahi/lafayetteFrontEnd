import UpdateCategory from "@/components/dashboard/Pages/Market/category/UpdateCategory";
import UpdatePermission from "@/components/dashboard/Pages/User/permission/UpdatePermission";

export const metadata = {
    title: ' ویرایش    دسترسی ',

}

const Edit = ({ params }) => {
    return (

        <UpdatePermission params={params.id}  />
 
      
    )
}
export default Edit;
