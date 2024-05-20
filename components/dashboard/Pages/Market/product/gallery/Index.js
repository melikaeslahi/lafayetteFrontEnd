'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import TitlePage from "@/components/dashboard/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faEllipsis, faEllipsisV, faImage, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { toast } from "react-toastify";
 
import Link from "next/link";
import { useDeleteGalleryMutation, useGetAllGalleryQuery } from "@/lib/market/galleryApi";
const Index = ({params}) => {
    console.log(params)
    const dispatch = useDispatch();
    const pathname = usePathname();
  

    const { page, perPage  } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  galleries = [], isError, isLoading, isSuccess } =  useGetAllGalleryQuery({ page, perPage , params});

   

    const [deleteImage, result] =  useDeleteGalleryMutation();


    useEffect(() => {

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(galleries.data?.length));

    }, [isLoading, isSuccess, isError, galleries])

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
        if (result.data) {
            if (result.data.status === 200) {
                toast.success(' محصول  با موفقیت حذف شد.', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                });
            }
        }
    }, [result]);

    

    
    return (<>
        <TitlePage
            name='گالری تصاویر'
            sitemapPage='بخش فروش / ویترین / محصولات / گالری'  

        >
            <Link
                href={`/dashboard/market/product/gallery/create/${params}`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  تصویر  جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={galleries?.meta}
            deleteRecord={deleteImage}
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
            {galleries.data?.map((gallery, index) => {
                const indexArray = Object.entries(gallery.image.indexArray);
                return (
                    <> 
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                       
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