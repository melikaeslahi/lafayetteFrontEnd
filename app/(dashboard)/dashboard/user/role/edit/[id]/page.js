 
import UpdateRole from "@/components/dashboard/Pages/User/role/UpdateRole";

export const metadata = {
    title: ' ویرایش  نقش   ',

}

const Edit = ({ params }) => {
    return (

        <UpdateRole params={params.id}  />
 
      
    )
}
export default Edit;
