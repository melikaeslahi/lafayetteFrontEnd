import ShowOrder from "@/components/dashboard/Pages/Market/orders/unpaind/Show";


export const metadata = {
    title: '      فاکتور    ' ,
}

const    Show = ({params}) => {

    return (
        <>
          <ShowOrder params={params.id} />
        </>
    )

}
export default  Show;