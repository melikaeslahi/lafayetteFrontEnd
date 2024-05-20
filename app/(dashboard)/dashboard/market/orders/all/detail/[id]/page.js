import Detail from "@/components/dashboard/Pages/Market/orders/all/Detail";



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