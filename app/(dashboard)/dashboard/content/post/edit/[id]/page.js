import UpdataPost from '@/components/dashboard/Pages/Content/post/UpdatePost'

export const metadata = {
    title: ' ویرایش پست ',

}

const Edit = ({ params }) => {
    return (
       <UpdataPost params={params} />  
        
    )
}
export default Edit;
