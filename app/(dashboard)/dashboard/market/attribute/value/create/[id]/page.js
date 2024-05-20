import CreateValue from "@/components/dashboard/Pages/Market/attribute/value/CreateValue";

 
export const metadata = {
    title: ' ایجاد ویژگی ',
}

const Create = ({params}) => {
 
    return (


        <>
         <CreateValue params={params.id} />
      
            

           
        </>
    )
}
export default Create;
