import Index from "@/components/dashboard/Pages/Market/attribute/value/Index";

 

export const metadata = {
    title: 'ویژگی ها' ,
}

const  Value = ({params}) => {

    return (
        <>
          <Index params={params.id} />
        </>
    )

}
export default Value;
