 
import CreateSliderProducts from "@/components/dashboard/Pages/Content/slider/Products";
 
 

export const metadata = {
    title: '    ایجاد  محصولات اسلایدر  ',
 
}

const Edit = ({ params }) => {
    return (

        <CreateSliderProducts params={params.id}  />
 
      
    )
}
export default Edit;
