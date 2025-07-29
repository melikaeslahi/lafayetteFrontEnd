'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { modalOpenClose, setHandlerModal } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faEllipsisV, faImage, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image";
import { useChangeProductStatusMutation, useChangeMarketableMutation, useDeleteProductMutation, useGetAllProductQuery } from "@/lib/market/productApi";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [setting , setSetting] = useState(false);
    const [ settingId , setSettingId] = useState('');

    const { page, perPage, search } = useSelector((state) => state.util);

    const  query = useGetAllProductQuery({ page, perPage, search });
    const products = query?.data;

    const [chengeStatus, { data: dataStatus }] = useChangeProductStatusMutation();
    const [chengeMarketable, { data:  dataMarketable }] = useChangeMarketableMutation();

    const [deleteProduct, result] = useDeleteProductMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    const handlerMarketable = async (id) => {
        await chengeMarketable(id);
    }

    const handlerSetting = (productId) =>{
       setSetting(!setting);
       setSettingId(productId)
    }

    useEffect(() => {
       useToast({result:result , message:'محصول'})
    }, [result]);

    useEffect(() => {
        useToast({dataStatus:dataStatus , message:'محصول'})
    }, [dataStatus]);

    useEffect(() => {
       useToast({dataStatus:dataMarketable , message:'قابلیت فروش محصول'})
    }, [dataMarketable])

    return (<>
     <TableHeader 
      title={'محصولات'}
      sitemap={'بخش فروش/ویترین/ محصولات'}
      href={`${pathname}/create`}
     />
        <TableContainer
            pagination={products?.meta}
            deleteRecord={deleteProduct}
            query={query}
        >
            {<Table> 
            <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام  محصول </th>
                        <th className="pl-3 py-3">    تصویر   </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">    قابیت فروش     </th>
                        <th className="pl-3 py-3">  توضیحات </th>
                        <th className="pl-3 py-3"> برچسب ها </th>
                        <th className="pl-3 py-3">  دسته والد </th>
                        <th className="pl-3 py-3">   برند   </th>
                        <th className="pl-3 py-3">   اسلاگ   </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody >
            {products.data?.map((product) => {
                const indexArray = Object.entries(product.image.indexArray);
                return (
                    <> 
                    <tr key={product.id} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{product.id}</td>
                        <td className="pl-3 py-3">{product.name}</td>
                        <td className="pl-3 py-3"   > {indexArray.map(([size, value]) => (
                            product.image.currentImage === size && <Image key={size} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${value}`} unoptimized={true} alt="image" className="w-12 h-12" width={'100'} height={'100'} />
                        ))}   </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="status" defaultChecked={product.status === 1 ? true : false} onChange={() => handlerStatus(product.id)} />}
                        </td>
                        <td className="pl-3 py-3">
                            {<input type="checkbox" name="marketable" defaultChecked={product.marketable == 1 ? true : false} onChange={() =>  handlerMarketable(product.id)} />}
                        </td>
                        <td className="pl-3 py-3">{product.introduction.replace(/<(.|\n)*?>/g, '').slice(0, 10)}</td>
                        <td className="pl-3 py-3">{product.tags}</td>
                        <td className="pl-3 py-3">{product.category !== null  ? product.category.name : 'دستهای وجود ندارد' }</td>
                        <td className="pl-3 py-3">{product.brand?.persian_name}</td>
                        
                        <td className="pl-3 py-3">{product.slug}</td>
                        <td>
                             <button onClick={()=>handlerSetting(product.id)} className="py-2 px-4   rounded ">  
                             <FontAwesomeIcon icon={faEllipsisV} />
                              </button>    
                        </td>
                        <section className={`${setting && settingId == product.id ? "absolute bg-white left-0 top-1 z-['12345'] flex flex-col w-32 h-auto shadow-md shadow-pallete" : 'hidden'}`}>
                             <Link href={`${pathname}/edit/${product.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faEdit} />  ویرایش     </Link>
                             <Link href={`${pathname}/gallery/${product.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />   گالری تصاویر     </Link>
                             <Link href={`${pathname}/productColor/${product.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />     رنگ ها     </Link>
                             <Link href={`${pathname}/productSize/${product.id}`} className="py-2 px-4   rounded text-right">  <FontAwesomeIcon icon={faImage} />      سایز ها     </Link>


                            <Button type="button" onClick={() => {
                                dispatch(setHandlerModal([product.name, product.id]))
                                dispatch(modalOpenClose(true));
                            }} className="py-2 px-4 rounded text-right">  <FontAwesomeIcon icon={faTrash} />  حذف   </Button>
                             </section>
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