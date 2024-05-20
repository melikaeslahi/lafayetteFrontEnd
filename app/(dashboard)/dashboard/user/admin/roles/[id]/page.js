 
import CreateAdminRoles from "@/components/dashboard/Pages/User/admin/Roles";
 

export const metadata = {
    title: '   ایجاد نقش برای کاربر ',

}

const Edit = ({ params }) => {
    return (

        <CreateAdminRoles params={params.id}  />
 
      
    )
}
export default Edit;
