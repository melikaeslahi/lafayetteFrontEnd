import UpdateCopan from "@/components/dashboard/Pages/Market/discount/copan/UpdateCopan";

 

export const metadata = {
    title: ' ویرایش    کپن ',

}

const Edit = ({ params }) => {
    return (

        <UpdateCopan params={params.id}  />
 
      
    )
}
export default Edit;
