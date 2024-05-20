import UpdateCategory from "@/components/dashboard/Pages/Market/category/UpdateCategory";
import ShowPayment from "@/components/dashboard/Pages/Market/payment/offline/Show";

export const metadata = {
    title: '  نمایش پرداخت     ',

}

const Edit = ({ params }) => {
    return (

        <ShowPayment  params={params.id}  />
 
      
    )
}
export default Edit;
