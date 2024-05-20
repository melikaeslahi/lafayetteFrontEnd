import UpdateStore from "@/components/dashboard/Pages/Market/store/UpdateStore";

 

export const metadata = {
    title: ' ویرایش    انبار ',

}

const Edit = ({ params }) => {
    return (

        <UpdateStore  params={params.id}  />
 
      
    )
}
export default Edit;
