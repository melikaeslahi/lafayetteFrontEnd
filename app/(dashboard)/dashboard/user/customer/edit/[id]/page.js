import UpdateCategory from "@/components/dashboard/Pages/Market/category/UpdateCategory";
import UpdateCustomer from "@/components/dashboard/Pages/User/customer/UpdateCustomer";

export const metadata = {
    title: ' ویرایش    مشتری ',

}

const Edit = ({ params }) => {
    return (

        <UpdateCustomer params={params.id}  />
 
      
    )
}
export default Edit;
