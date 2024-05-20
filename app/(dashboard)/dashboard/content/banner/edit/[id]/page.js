import UpdateBanner from "@/components/dashboard/Pages/Content/banner/UpdateBanner";

export const metadata = {
    title: ' ویرایش بنر  ها ',

}

const EditPostCategory = ({ params }) => {

    return (

        <UpdateBanner params={params}  />
 
      
    )
}
export default EditPostCategory;
