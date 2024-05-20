import AddToStore from "@/components/dashboard/Pages/Market/store/AddToStore";

 
export const metadata = {
    title: '   اضافه به انبار  ',
}

const Create = ({params}) => {
 
    return (


        <>
         <AddToStore params={params.id} />
      
            

           
        </>
    )
}
export default Create;
