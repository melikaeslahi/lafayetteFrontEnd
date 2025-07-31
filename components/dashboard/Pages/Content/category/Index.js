'use client'
import { TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal} from "@/store/reducers/dashboard/UtilSlice";
import { usePathname} from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { useChangePostCategoryStatusMutation, useDeletePostCategoryMutation, useGetAllPostCategoryQuery } from "@/lib/content/postCategoryApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
import CustomTable from "@/components/dashboard/Table/CostumTable";
 
const headers =['نام دسته', 'تصویر' , 'وضعیت' , 'توضیحات' , 'برچسب ها' , 'دسته والد' , 'اسلاگ']

const Index = () => { 
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query = useGetAllPostCategoryQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] = useChangePostCategoryStatusMutation();
    const [deleteCategory, result] = useDeletePostCategoryMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(()=>{
         useToast({ dataStatus:dataStatus ,  message:"دسته بندی"})
    },[dataStatus]);

    useEffect(() => {
        //result is response from useDeletePostCategoryMutation 
       useToast({result:result , message:"دسته بندی"})
    }, [result]);

    return (<>
        <TableHeader 
          title={'دسته بندی'} 
          href={`${pathname}/create`}  
          sitemap=' بخش محتوایی / دسته بندی ها  '/>
        
        <TableContainer
            pagination={query?.meta}
            deleteRecord={deleteCategory}
            query={query}
        >   
            {<CustomTable headers={headers}>
                    {query.data?.data?.map((itemCategory) => {
                        const indexArray = itemCategory.image && Object.entries(itemCategory.image?.indexArray);
                        return (
                            <tr key={itemCategory.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{itemCategory.id}</td>
                                <td className="pl-3 py-3">{itemCategory.name}</td>
                                <td className="pl-3 py-3"   > {indexArray?.map(([size, value]) => (
                                    itemCategory.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                                ))}   </td>
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={itemCategory.status === 1 ? true : false} onChange={() => handlerStatus(itemCategory.id)} />}
                                </td>
                                <td className="pl-3 py-3">{itemCategory.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                                <td className="pl-3 py-3">{itemCategory.tags}</td>
                                <td className="pl-3 py-3">{itemCategory.parent !== null ? itemCategory.parent.name : 'دسته اصلی'}</td>
                                <td className="pl-3 py-3">{itemCategory.slug}</td>
                                <td>
                                    <Link href={`${pathname}/edit/${itemCategory.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([itemCategory.name, itemCategory.id]))
                                        dispatch(modalOpenClose(true));
                                    }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                                </td>
                            </tr>)
                    })}
                     </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;