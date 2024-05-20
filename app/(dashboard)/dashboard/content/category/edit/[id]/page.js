import UpdataPostCategory from '@/components/dashboard/Pages/Content/category/UpdatePostCategory'


export const metadata = {
    title: ' ویرایش دسته بندی ',

}

const Edit = ({ params }) => {
 
    return (

        <UpdataPostCategory params={params}  />
 
      
    )
}
export default Edit;
