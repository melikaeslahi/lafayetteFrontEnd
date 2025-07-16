'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname} from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { useChangeProductCategoryStatusMutation, useChangeShowInMenuMutation, useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from "@/lib/market/productCategoryApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const { data: categories = [], isError, isLoading, isSuccess } = useGetAllProductCategoryQuery({ page, perPage, search });
    const [chengeStatus, { data: dataStatus }] = useChangeProductCategoryStatusMutation();
    const [chengeShowInMenu, { data: dataShowInMenu }] = useChangeShowInMenuMutation();
    const [deleteCategory, {result:deleteResult}] = useDeleteProductCategoryMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    const handlerShowInMenu = async (id) => {
        await chengeShowInMenu(id);
    }

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading]);

    
    useEffect(() => {
        dispatch(setIsSuccess(isSuccess));
    }, [isSuccess]);
    
    useEffect(() => {
        dispatch(setIsError(isError));
    }, [isError]);
    
    useEffect(() => {
        dispatch(setItemLength(categories.data?.length));
    }, [categories]);

    useEffect(() => {
        useToast({result:deleteResult , message:'دسته بندی'});
    }, [deleteResult]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'دسته بندی'});
    }, [dataStatus])

    useEffect(() => {
        useToast({dataStatus:dataShowInMenu , message:'نمایش دسته بندی'});
    }, [dataShowInMenu])

    return (<>
       <TableHeader 
       title={'دسته بندی ها'}
       href={`${pathname}/create`}
       sitemap={'بخش فروش/ویترین/دسته بندی ها'}
       />
        
        <TableContainer
            pagination={categories?.meta}
            deleteRecord={deleteCategory}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام دسته </th>
                        <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">   نمایش در منو   </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3"> برچسب ها </th>
                        <th className="pl-3 py-3">  دسته والد </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            {categories.data?.map((category, index) => {
                const indexArray = Object.entries(category.image.indexArray);
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{category.name}</td>
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            category.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={category.status === 1 ? true : false} onChange={() => handlerStatus(category.id)} />}
                        </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="show_in_menu" defaultChecked={category.show_in_menu == 1 ? true : false} onChange={() =>  handlerShowInMenu(category.id)} />}
                        </td>
                        <td className="pl-3 py-3">{category.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{category.tags}</td>
                        <td className="pl-3 py-3">{category.parent !== null ? category.parent.name : 'دسته اصلی'}</td>
                        <td className="pl-3 py-3">{category.slug}</td>
                        <td>
                            <Link href={`${pathname}/edit/${category.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([category.name, category.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                        </td>
                    </tr>)
            })}
                </tbody>    
             </Table>}
        </TableContainer>
    </>
    )
}
export default Index;