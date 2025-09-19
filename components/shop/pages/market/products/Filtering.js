import { Button, Input } from "@/components/dashboard/inputs";
import {   useSetFilteringMutation } from "@/services/customer/homeApi";
import { faAngleDown, faAngleLeft,  faFilter, faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useState , useEffect} from "react";
import {   isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
import { setFilterValues, setOpenMobileFilter, setOpenMobileSort, setProducts } from "@/store/reducers/customer/ProductsSlice";



const Filtering = () => {
      const { filtering ,sort } = useSelector(state => state.productsCustomer);
      const {  search } = useSelector(state => state.utilStore);

      

    const dispatch = useDispatch();

     const [getProducts, { data }] =  useSetFilteringMutation();
      const [openBrands, setOpenBrands] = useState(false);
      const [openCategories, setOpenCategories] = useState(false);
    
      useEffect(()=>{
        if(data){
            dispatch(setProducts(data));
        }
    } ,[data])
    useEffect(()=>{
        
            dispatch(setFilterValues(null));
        
    } ,[])

     const initialValues = {
        search: `${search ? search : ''}`,
        categories: [],
        brands: [],
        sort:'',
        min_price: '',
        max_price: ''



    }

    const handlerSubmit = async (values , sort , search) => {

        const formData = new FormData();

        
         
        dispatch(setFilterValues(values));


         formData.append('_method', 'GET');

        if (values.search || search)
            formData.append('search', values.search || search);

            if (sort)
            formData.append('sort', sort.key);

        if (values.brands)
            formData.append('brands', values.brands);

        if (values.min_price)
            formData.append('min_price', values.min_price);

        if (values.max_price)
            formData.append('max_price', values.max_price);

        await getProducts({ formData, category:values.categories })
    }
    return (
        <>
            {isMobile ? <section className="flex justify-between items-center">
                <section className="flex justify-center border-l border-gray-300 w-full">
                    <Button className={'flex justify-center items-center'} onClick={()=>dispatch(setOpenMobileFilter(true))} >
                        <FontAwesomeIcon className="pr-2  text-pallete" icon={faFilter} /> فیلترها
                    </Button>

                </section>
                <section className="flex justify-center items-center w-full">
                    <Button className={'flex justify-center items-center'} onClick={()=>dispatch(setOpenMobileSort(true))}>
                        <FontAwesomeIcon className="pr-2  text-pallete" icon={faSortAmountAsc}  />  مرتب سازی
                    </Button>
                </section>

            </section> :
                <Formik
                    onSubmit={(values) => handlerSubmit(values , sort , search) }
                    initialValues={initialValues}
                >
                    <Form>
                        <section className="flex flex-col justify-start items-center w-full">

                            <section className="flex flex-col justify-center items-center">


                                <section className="w-full">
                                    <Input 
                                    containerClass={'w-full    flex   items-start'}
                                       className={'flex w-full  mx-auto m-0 '}
                                        type={'text'}
                                         name={'search'}
                                         placeholder={' سرچ در نتایج : نام یا برند '} />

                                </section>
                                {/* <input type="range" name="" value="" max='1000000' min={'2000000'} /> */}

                            </section>

                            {/* <section className="w-full flex justify-between items-center my-2" >
                                <section className="flex justify-start">
                                    <p>
                                        سایز
                                    </p>
                                </section>
                                <section className="flex justify-start">
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </section>
                            </section> */}
                            <section className="w-full flex flex-col items-center mb-2">
                                <section className="w-full flex justify-between items-center" >
                                    <section className="flex justify-start">
                                        <p>
                                            برند
                                        </p>
                                    </section>
                                    <section className="flex justify-start">
                                        <FontAwesomeIcon className="hover:cursor-pointer" icon={openBrands ? faAngleDown : faAngleLeft} onClick={() => setOpenBrands(!openBrands)} />
                                    </section>
                                </section>

                                <section className={`${openBrands ? '' : 'hidden'} flex flex-col w-full `}>
                                     
                                    {filtering?.brands?.map((brand, index) => (
                                        <section key={index} className="flex justify-between items-center mb-1">
                                            <label className={'p-2 justify-start text-pallete '} htmlFor={brand.id}>{brand.persian_name}</label>

                                            <Field
                                                className={'p-2 justify-end '}
                                                type={'checkbox'}
                                                name="brands"
                                                id={brand.id}
                                                  value={brand.id.toString()}
                                            />
                                                
                                            
                                            
                                        </section>



                                    ))}

                                </section>
                            </section>

                            <section className="w-full flex flex-col items-center mb-2">
                                <section className="w-full flex justify-between items-center  " >
                                    <section className="flex justify-start">
                                        <p>
                                            دسته بندی
                                        </p>
                                    </section>
                                    <section className="flex justify-start">
                                        <FontAwesomeIcon className="hover:cursor-pointer" icon={openCategories ? faAngleDown : faAngleLeft} onClick={() => setOpenCategories(!openCategories)} />
                                    </section>
                                </section>
                                {openCategories ?
                                    <Categories />
                                    : null
                                }
                            </section>



                            <section className="flex flex-col justify-center items-center">


                                <section className="flex justify-between items-center">
                                    <Input containerClass={'w-full'} title={'بیشترین قیمت'} className={'w-full'} type={'text'} name={'max_price'} placeholder={'200000 تومان'} />
                                    <Input containerClass={'w-full'} title={'کمترین قیمت'} className={'w-full'} type={'text'} name={'min_price'} placeholder={'50000 تومان'} />
                                </section>
                                {/* <input type="range" name="" value="" max='1000000' min={'2000000'} /> */}

                            </section>

                            <section>
                                <Button type='submit' className={'flex justify-center items-center py-1 px-4 rounded-lg text-white bg-red-600'}>
                                    اعمال فیلتر ها
                                </Button>
                            </section>
                        </section>
                     </Form>
                 </Formik>

            }
        </>
    )
}
export default Filtering;
