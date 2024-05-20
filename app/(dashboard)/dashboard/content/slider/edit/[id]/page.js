 
import UpdateSlider from '@/components/dashboard/Pages/Content/slider/UpdateSlider';


export const metadata = {
    title: ' ویرایش    اسلایدر ',

}

const Edit = ({ params }) => {
 
    return (

        <UpdateSlider params={params.id}  />
 
      
    )
}
export default Edit;
