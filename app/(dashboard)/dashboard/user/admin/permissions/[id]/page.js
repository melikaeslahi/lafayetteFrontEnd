 
import CreateAdminPermissions from "@/components/dashboard/Pages/User/admin/Permissions";
 

export const metadata = {
    title: '    ایجاد دسترسی  ',
 
}

const Edit = ({ params }) => {
    return (

        <CreateAdminPermissions params={params.id}  />
 
      
    )
}
export default Edit;
