'use client'
import { Table, TableContainer } from "@/components/dashboard/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { modalOpenClose, setHandlerModal, setIsError, setIsLoading, setIsSuccess, setItemLength } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/dashboard/inputs";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import Link from "next/link";
import { useChangeSliderStatusMutation, useDeleteSliderMutation, useGetAllSliderQuery } from "@/lib/content/sliderApi";
import useToast from "@/hooks/useToast";
import TableHeader from "@/components/dashboard/Table/TableHeader";
const Index = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { page, perPage, search } = useSelector((state) => state.util);

    // fetch post from localhost:8000/category?page=1,2,3
    const { data:  sliders = [], isError, isLoading, isSuccess } = useGetAllSliderQuery({ page, perPage, search });

    const [chengeStatus, { data: dataStatus }] =  useChangeSliderStatusMutation();
    const [deleteSlider, {result:deleteResult}] =  useDeleteSliderMutation();

    const handlerStatus = async (id) => {
        await chengeStatus(id);
    }

    useEffect(() => {
        dispatch(setIsLoading(isLoading));
    }, [isLoading])

    useEffect(() => {
        dispatch(setIsSuccess(isSuccess));
    }, [isSuccess]);

    useEffect(() => {
        dispatch(setIsError(isError));
    }, [isError])

    useEffect(() => {
        dispatch(setItemLength(sliders.data?.length));
    }, [sliders])

    useEffect(() => {
        useToast({result:deleteResult , message:'اسلایدر'})
    }, [deleteResult]);

    useEffect(() => {
     useToast({dataStatus:dataStatus , message:'اسلایدر'})    
    }, [dataStatus])

    return (<>
        <TableHeader 
          title={'اسلایدر'}
          href={`${pathname}/create`}
          sitemap={'بخش محتوایی /اسلایدرها'}
        />
         
        <TableContainer
            pagination={sliders?.meta}
            deleteRecord={deleteSlider}
        >
            {<Table>
                <thead className="text-pallete  shadow-md">
                    <tr className={`text-center`}>
                        <th className="pl-3 py-3"> # </th>
                        <th className="pl-3 py-3">  نام اسلایدر </th>
                        <th className="pl-3 py-3">  وضعیت   </th>
                        <th className="pl-3 py-3">  دسته والد </th>
                        <th className="pl-3 py-3">     تنظیمات   </th>
                    </tr>
                </thead>
                <tbody>
                    {sliders.data?.map(( slider, index) => {
                     
                        return (
                            <tr key={index} className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full  border-b-2 border-pallete">
                                <td className="pl-3 py-3">{index+=1}</td>
                                <td className="pl-3 py-3">{slider.name}</td>        
                                <td className="pl-3 py-3">
                                    {<input type="checkbox" name="status" defaultChecked={slider.status === 1 ? true : false} onChange={() => handlerStatus(slider.id)} />}
                                </td>
 
                                <td className="pl-3 py-3">{slider.parent !== null ? slider.parent?.name : 'دسته اصلی'}</td>
                                 
                                <td>
                                    <Link href={`${pathname}/edit/${slider.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">  <FontAwesomeIcon icon={faEdit} />     </Link>
                                    <Link href={`${pathname}/products/${slider.id}`} className="py-2 px-4 bg-green-500 hover:bg-green-600  rounded text-white">   اضافه کردن محصول    </Link>

                                    <Button type="button" onClick={() => {
                                        dispatch(setHandlerModal([slider.name, slider.id]))
                                        dispatch(modalOpenClose(true));
                                    }} className="py-2 px-4 bg-red-500 hover:bg-red-600 rounded text-white">  <FontAwesomeIcon icon={faTrash} />     </Button>
                                </td>
                            </tr>)
                    })}</tbody> </Table>}
        </TableContainer>
    </>
    )
}
export default Index;