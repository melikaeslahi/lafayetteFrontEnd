import UpdateCategory from "@/components/dashboard/Pages/Market/category/UpdateCategory";
import UpdatePriority from "@/components/dashboard/Pages/Ticket/priority/UpdatePriority";

export const metadata = {
    title: ' ویرایش اولویت ',

}

const Edit = ({ params }) => {
    return (

        <UpdatePriority params={params.id}  />
 
      
    )
}
export default Edit;
