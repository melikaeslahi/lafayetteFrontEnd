'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { Button } from "@/components/dashboard/inputs";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { useDeleteGalleryMutation, useGetAllGalleryQuery } from "@/lib/market/galleryApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";

const Index = ({params}) => {
    const dispatch = useDispatch();
    const { page, perPage  } = useSelector((state) => state.util);
    const  query =  useGetAllGalleryQuery({ page, perPage , params});
    const galleries = query?.data;
    const [deleteImage, {result:deleteResult}] =  useDeleteGalleryMutation();

    useEffect(() => { 
         useToast({result:deleteResult , message:'گالری'})
    }, [deleteResult]);
    
    return (
    <>
    <TableHeader 
     title={'گالری تصاویر'}
     href={`/dashboard/market/product/gallery/create/${params}`}
     sitemap={'بخش فروش / ویترین / محصولات / گالری'}
    />
        <TableContainer
            pagination={galleries?.meta}
            deleteRecord={deleteImage}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                         <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">   نام محصول   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody >
            {galleries.data?.map((gallery) => {
                const indexArray = Object.entries(gallery.image.indexArray);
                return (
                    <> 
                    <tr key={gallery.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{gallery.id}</td>     
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            gallery.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        <td className="pl-3 py-3">{gallery.product_id.name}</td>
                        <td> 
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([gallery.product_id.name, gallery.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                        </td>
                    </tr>    
                     </>)

            })}
                </tbody>    
             </Table>}
        </TableContainer>
      
    </>
    )
}
export default Index;