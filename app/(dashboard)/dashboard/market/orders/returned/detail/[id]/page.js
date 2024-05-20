import Detail from "@/components/dashboard/Pages/Market/orders/returned/Detail";



export const metadata = {
    title: '   جزئیات سفارش    ' ,
}

const   Details = ({params}) => {

    return (
        <>
          <Detail  params={params.id}/>
        </>
    )

}
export default Details;