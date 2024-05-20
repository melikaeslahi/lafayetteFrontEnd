import Detail from "@/components/dashboard/Pages/Market/orders/unpaind/Detail";



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