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
import { useChangeProductStatusMutation, useChangeMarketableMutation, useDeleteProductMutation, useGetAllProductQuery } from "@/lib/market/productApi";
import Link from "next/link";
const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [setting , setSetting] = useState(false);
    const [ settingId , setSettingId] = useState('');

    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  products = [], isError, isLoading, isSuccess } = useGetAllProductQuery({ page, perPage, search });

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

        dispatch(setIsLoading(isLoading));
        dispatch(setIsSuccess(isSuccess));
        dispatch(setIsError(isError));
        dispatch(setItemLength(products.data?.length));

    }, [isLoading, isSuccess, isError, products])

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

    useEffect(() => {
        // status checked and unchecked
        if (dataStatus) {

            if (dataStatus.status === true && dataStatus.checked === true) {
                toast.success('    محصول با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === true && dataStatus.checked === false) {

                toast.success('      محصول با موفقیت غیر فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataStatus.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataStatus])

    useEffect(() => {
        // status checked and unchecked
        if (dataMarketable) {

            if (dataMarketable.status === true && dataMarketable.checked === true) {
                toast.success('          قابلیت فزوش  محصول با موفقیت  فعال شد  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataMarketable.status === true && dataMarketable.checked === false) {

                toast.success(' قابلیت فروش  محصول با موفقیت غیر فعال شد ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            } else if (dataMarketable.status === false) {
                toast.error('   خطایی پیش آمده است  ', {
                    position: toast.POSITION.TOP_LEFT,
                    rtl: true
                })
            }
        }

    }, [dataMarketable])

    return (<>
        <TitlePage
            name='محصولات'
            sitemapPage='بخش فروش/ویترین/ محصولات'

        >
            <Link
                href={`${pathname}/create`}
                className="py-4 px-8 bg-pallete rounded text-white" >
                {' '}
                ایجاد  محصول جدید
            </Link>
        </TitlePage>

        <TableContainer
            pagination={products?.meta}
            deleteRecord={deleteProduct}
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
            {products.data?.map((product, index) => {
                const indexArray = Object.entries(product.image.indexArray);
                return (
                    <> 
                    <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                        <td className="pl-3 py-3">{index+=1}</td>
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
                             <button onClick={()=>handlerSetting(product.id)} className="py-2 px-4   rounded ">  <FontAwesomeIcon icon={faEllipsisV} />     </button>
                           
                           
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