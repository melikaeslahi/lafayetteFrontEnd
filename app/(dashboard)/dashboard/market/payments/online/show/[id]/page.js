 
import ShowPayment from "@/components/dashboard/Pages/Market/payment/online/Show";

export const metadata = {
    title: '  نمایش پرداخت     ',

}

const Edit = ({ params }) => {
    return (

        <ShowPayment  params={params.id}  />
 
      
    )
}
export default Edit;
