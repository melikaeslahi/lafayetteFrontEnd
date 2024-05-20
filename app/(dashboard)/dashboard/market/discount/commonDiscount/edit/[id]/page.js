import UpdateCommonDiscount from "@/components/dashboard/Pages/Market/discount/commonDiscount/UpdateCategory";

 

export const metadata = {
    title: ' ویرایش    تخفیف عمومی ',

}

const Edit = ({ params }) => {
    return (

        <UpdateCommonDiscount params={params.id}  />
 
      
    )
}
export default Edit;
