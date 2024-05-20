import UpdateMenu from "@/components/dashboard/Pages/Content/menu/UpdateMenu";

export const metadata = {
    title: ' ویرایش  منو ',

}

const Edit = ({ params }) => {
 
    return (

        <UpdateMenu params={params}  />
 
      
    )
}
export default Edit;
