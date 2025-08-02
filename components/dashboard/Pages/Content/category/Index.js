'use client'
import { TableContainer ,TableHeader ,CustomTable , ShowImage , StatusRecord , SettingRecord } from "@/components/dashboard/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useChangePostCategoryStatusMutation, useDeletePostCategoryMutation, useGetAllPostCategoryQuery } from "@/lib/content/postCategoryApi";
import useToast from "@/hooks/useToast";

const headers =['نام دسته', 'تصویر' , 'وضعیت' , 'توضیحات' , 'برچسب ها' , 'دسته والد' , 'اسلاگ']

const Index = () => { 
    const { page, perPage, search } = useSelector((state) => state.util);
    const query = useGetAllPostCategoryQuery({ page, perPage, search });

    const [changeStatus, { data: dataStatus }] = useChangePostCategoryStatusMutation();
    const [deleteCategory, result] = useDeletePostCategoryMutation();


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
          sitemap=' بخش محتوایی / دسته بندی ها'/>
        
        <TableContainer
            pagination={query?.meta}
            deleteRecord={deleteCategory}
            query={query}
        >   
            {<CustomTable headers={headers}>
                 {query.data?.data?.map((itemCategory) => {
                     return (
                         <tr key={itemCategory.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                             <td className="pl-3 py-3">{itemCategory.id}</td>
                             <td className="pl-3 py-3">{itemCategory.name}</td>
                             <td className="pl-3 py-3" ><ShowImage image={itemCategory.image} /></td>
                                 <td className="pl-3 py-3">
                                   <StatusRecord 
                                   status={itemCategory.status} 
                                   id={itemCategory.id}
                                   changeStatus={changeStatus} />
                             </td>
                             <td className="pl-3 py-3">{itemCategory.description.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                             <td className="pl-3 py-3">{itemCategory.tags}</td>
                             <td className="pl-3 py-3">{itemCategory.parent !== null ? itemCategory.parent.name : 'دسته اصلی'}</td>
                             <td className="pl-3 py-3">{itemCategory.slug}</td>
                             <td>
                              <SettingRecord 
                                id={itemCategory.id}
                                title={itemCategory.name}
                              />
                             </td>
                         </tr>)
                    })}
                     </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;