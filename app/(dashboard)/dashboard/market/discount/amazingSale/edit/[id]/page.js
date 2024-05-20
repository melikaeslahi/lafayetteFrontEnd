import UpdateAmazingSale from "@/components/dashboard/Pages/Market/discount/amazingSale/UpdateAmazingSale";

 

export const metadata = {
    title: ' ویرایش  فروش فوق العاده ',

}

const Edit = ({ params }) => {
    return (

        <UpdateAmazingSale params={params.id}  />
 
      
    )
}
export default Edit;
