import UpdateAttribute from "@/components/dashboard/Pages/Market/attribute/UpdateAttribute";

 

export const metadata = {
    title: ' ویرایش  فرم کالا ',

}

const Edit = ({ params }) => {
    return (

        <UpdateAttribute params={params.id}  />
 
      
    )
}
export default Edit;
