import { Input } from "@/components/dashboard/inputs";
import Modal from "@/components/shop/Modal";
import { useSetFilteringMutation } from "@/services/customer/homeApi";
import { setProducts } from "@/store/reducers/customer/ProductsSlice";
import { setSearch } from "@/store/reducers/customer/UtilSlice";
import { setIsSearch } from "@/store/reducers/dashboard/UtilSlice";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";


const SearchModal = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathName = usePathname();
    const { isSearch } = useSelector(state => state.util)
    const {  search } = useSelector(state => state.utilStore)

    const [searched] = useSetFilteringMutation();

    const initialValues = {
        search:`${search ? search : ''}`
    }

    const handlerSubmit = async (values) => {
        dispatch(setSearch(values.search));
        const formData = new FormData();
        formData.append('_method', 'GET');
        formData.append('search', values.search)
        const data = await searched({ formData }).unwrap();     
        if (data?.status === 200)
            dispatch(setProducts(data));
        dispatch(setIsSearch(false));
        if(pathName !== '/market/products')
        router.push('/market/products');
    }
    return (
        <>
            <Modal
                margin={'mr-0'}
                close={false}
                title={'جست و جو در لافایت'}
                // widthAndHiegth={'h-full w-full'}
                blur={'backdrop-blur-0'}
                show={isSearch}
                closeMethod={setIsSearch}
            >


                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handlerSubmit(values)}
                >
                    <Form className="flex flex-col  justify-center items-center">

                        <Input containerClass="w-full mx-auto flex flex-col justifiy-center items-center" name={'search'} placeholder="جست و جو با نام محصول " />

                        <button type="submit" className={'px-2 py-1 bg-pallete text-white rounded-lg flex justify-center'}>جست و جو</button>

                    </Form>

                </Formik>



            </Modal>
        </>
    )
}
export default SearchModal;