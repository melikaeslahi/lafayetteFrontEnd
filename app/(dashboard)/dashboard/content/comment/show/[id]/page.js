import ShowComment from "@/components/dashboard/Pages/Content/comment/Show";

 


export const metadata = {
    title: '  نمایش نظرات ',

}

const Edit = ({ params }) => {
    return (

        <ShowComment params={params}  />
 
      
    )
}
export default Edit;
