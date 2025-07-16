'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname  } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import Link from "next/link";
import { useChangeBrandStatusMutation, useDeleteBrandMutation, useGetAllBrandQuery } from "@/lib/market/brandApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
 
const Index = () => {   
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);
    const { data: brands = [], isError, isLoading, isSuccess } =  useGetAllBrandQuery({ page, perPage, search });
    const [chengeStatus, { data: dataStatus }] =   useChangeBrandStatusMutation();
    const [deleteBrand, {result:deleteResult}] =   useDeleteBrandMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
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
        dispatch(setItemLength(brands.data?.length));
    }, [ brands]);

    useEffect(() => {
        useToast({result:deleteResult , message:'برند'});
    }, [deleteResult]);

    useEffect(() => {
    useToast({dataStatus:dataStatus , message:'برند'})
    }, [dataStatus])

    return (<>
        <TableHeader 
        title={'برند ها'}
        href={`${pathname}/create`}
        sitemap={'بخش فروش/ویترین/برند ها'}
        />
        
        <TableContainer
            pagination={brands?.meta}
            deleteRecord={deleteBrand}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  فارسی  </th>
                        <th className="pl-3 py-3">     نام اصلی   </th>
                        <th className="pl-3 py-3">        لوگو   </th>
                        <th className="pl-3 py-3">  وضعیت   </th>   
                        <th className="pl-3 py-3"> برچسب ها </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
            { brands.data?.map((brand, index) => {
                const indexArray = Object.entries(brand.logo?.indexArray);
                return (
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
                        <td className="pl-3 py-3">{brand.persian_name}</td>
                        <td className="pl-3 py-3">{brand.original_name}</td>

                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            brand.logo.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={brand.status === 1 ? true : false} onChange={() => handlerStatus(brand.id)} />}
                        </td>
                        <td className="pl-3 py-3">{brand.tags}</td>
                        <td className="pl-3 py-3">{brand.slug}</td>
                        <td>
                            <Link href={`${pathname}/edit/${brand.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([brand.persian_name, brand.id]))
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