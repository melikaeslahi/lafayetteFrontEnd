'use client'
import { setPerPage, setSearch } from "@/store/reducers/dashboard/UtilSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


const TableFiltering =() =>{
    const router = useRouter();
    const pathName = usePathname();
    const params = useSearchParams();
    const dispatch =useDispatch();
    const {page , search , perPage} = useSelector((state)=>state.util);
 
    const inputRef = useRef();
    const newParams = new URLSearchParams(params.toString());
    useEffect(() => {
      

        if (page !== 1) {
            // if page != 0  set query params  in url
            newParams.set('page', page);
        } else {
            // if page = 0 delete query params from url
            newParams.delete('page');
        }
        if (perPage != 0  ) {
            newParams.set('perPage', perPage);
        }  else {
            
            newParams.delete('perPage');
        }
        if (search !== '') {
            newParams.set('search', search);
        } else {
            newParams.delete('search');
        }

        router.replace(`${pathName}?${newParams}`);

    }, [page, perPage, search, newParams, pathName]);

    // for search controll
    useEffect(() => {
        let timer;

        const sendData = () => {
            // If the user keeps on typing then the timeout is cleared and restarted
            if (timer) clearTimeout(timer)

            timer = setTimeout(() => {
                 dispatch(setSearch(inputRef.current.value))
            
            }, 3000)
        }
        const element = inputRef.current;
        // Set listener and start timeout
        if(element){ 
            element.addEventListener('keyup', sendData);
        }

        return () => {
            // Remove listener wwhen unmounting
            element.removeEventListener('keyup', sendData);
            dispatch(setSearch(''))
        };
    }, []);

    return(
        <section className="flex justify-around items-center mb-2 ">
        <section className="search w-full">
            <input  ref={inputRef} type="search" name="search"   className="shadow-lg text-right appearance-none   rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 dark:bg-zinc-600 dark:text-zinc-100  text-gray-700 leading-tight border-none dark:placeholder:text-zinc-100  focus:border-pallete " placeholder="جستو جو در جدول ..." />
        </section>
        <section className="w-full flex justify-end">
            <select dir="ltr" name="perpage" onChange={(e) => dispatch(setPerPage(e.target.value))} value={perPage ? perPage : ' '} className="shadow-lg dark:bg-zinc-600 dark:text-zinc-100 text-center appearance-none pr-2  rounded w-full md:w-full lg:w-3/4 xl:w-3/4 py-2 px-3 text-gray-700 leading-tight border-none   focus:border-pallete ">
                {perPage ? '' : <option value=''>انتخاب تعداد ردیف ها</option>}
                <option value="0"   > 20  (پیش فرض)   </option>
                <option value="1"   > 30 </option>
                <option value="2"  > نمایش همه </option>

            </select>
        </section>
    </section>
    )
}
export default TableFiltering;