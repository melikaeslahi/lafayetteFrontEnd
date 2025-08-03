'use client'
import { CustomTable, SettingRecord, TableHeader, TableContainer } from "@/components/dashboard/Table";
import {  useSelector } from "react-redux";
import { useEffect } from "react";
import { useDeleteValueMutation, useGetAllValueQuery } from "@/lib/market/categoryValueApi";
import useToast from "@/hooks/useToast";

const headers = ['مقدار' , 'نام محصول' , 'نام فرم' , 'تایپ' , 'افزایش قیمت'];

const Index = ({params}) => {
    const { page, perPage  } = useSelector((state) => state.util);
    
    const query =  useGetAllValueQuery({ page, perPage , params  });
    const values =query?.data;

    const [deleteValue, {result:deleteResult}] =  useDeleteValueMutation();

    useEffect(() => {
      useToast({result:deleteResult , message:"ویژگی"})
    }, [deleteResult]);

    return (
    <>
    <TableHeader 
    title={'ویژگی ها'}
    href={`/dashboard/market/attribute/value/create/${params}`}
    sitemap={'بخش فروش/ویترین/فرم کالاها/ویژگی ها'}
    />
        <TableContainer
            pagination={values?.meta}
            deleteRecord={deleteValue}
        >
            {<CustomTable headers={headers}> 
              {values.data?.map((value) => {     
                return (
                    <tr key={value.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{value.id}</td>
                        <td className="pl-3 py-3">{JSON.parse(value.value).value  }</td>
                        <td className="pl-3 py-3">{value.product.name }</td>
                        <td className="pl-3 py-3">{value.category_attribute?.name }</td>
                        <td className="pl-3 py-3">{value.type == 1 ? 'ساده ' : 'انتخابی'}</td>
                        <td className="pl-3 py-3">{JSON.parse(value.value).price_increase}</td>          
                        <td>
                            <SettingRecord id={value.id} title={JSON.parse(value.value).value} />
                        </td>
                    </tr>)
            })}         
             </CustomTable>}
        </TableContainer>
    </>
    )
}
export default Index;