import ShowTicket from "@/components/dashboard/Pages/Ticket/open/Show";

 
 

export const metadata = {
    title: 'نمایش  تیکت',

}

const Edit = ({ params }) => {
    return (

        <ShowTicket  params={params.id}  />
 
      
    )
}
export default Edit;
