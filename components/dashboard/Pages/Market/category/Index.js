'use client'
import { CustomTable, SettingRecord, ShowImage, StatusRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname} from "next/navigation";
import { useChangeProductCategoryStatusMutation, useChangeShowInMenuMutation, useDeleteProductCategoryMutation, useGetAllProductCategoryQuery } from "@/lib/market/productCategoryApi";
import useToast from "@/hooks/useToast";

const headers = ['نام دسته' , 'تصویر' , 'وضعیت' , 'نمایش در منو' , 'توضیحات' , 'برچسب ها' , 'دسته والد' , 'اسلاگ'];

const Index = () => {
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const query = useGetAllProductCategoryQuery({ page, perPage, search });
    const categories = query?.data;
    const [changeStatus, { data: dataStatus }] = useChangeProductCategoryStatusMutation();
    const [changeShowInMenu, { data: dataShowInMenu }] = useChangeShowInMenuMutation();
    const [deleteCategory, {result:deleteResult}] = useDeleteProductCategoryMutation();

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
            query={query}
        >
        {<CustomTable headers={headers}> 
            {categories.data?.map((category) => {
                return (
                    <tr key={category.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{category.id}</td>
                        <td className="pl-3 py-3">{category.name}</td>
                        <td className="pl-3 py-3"> <ShowImage image={category.image} /> </td>
                        <td className="pl-3 py-3">
                          <StatusRecord id={category.id} status={category.status} changeStatus={changeStatus} />
                        </td>
                        <td className="pl-3 py-3">
                          <StatusRecord id={category.id} status={category.show_in_menu} changeStatus={changeShowInMenu} />       
                        </td>
                        <td className="pl-3 py-3">{category.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{category.tags}</td>
                        <td className="pl-3 py-3">{category.parent !== null ? category.parent.name : 'دسته اصلی'}</td>
                        <td className="pl-3 py-3">{category.slug}</td>
                        <td>
                            <SettingRecord id={category.id} title={category.name} />
                        </td>
                    </tr>)
            })}    
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;