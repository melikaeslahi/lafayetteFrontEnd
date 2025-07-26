import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/dashboard/Modal";
import Paginate from "@/components/dashboard/Paginate";
import TableFiltering from "./TableFiltering";
import { modalOpenClose } from "@/store/reducers/dashboard/UtilSlice";
import SuccessAlert from "../inputs/SuccessAlert";
import QueryStatusHandler from "./QueryStatusHandler";
 
const TableContainer = ({ children , pagination , deleteRecord ,query}) => {

    const { openDrawer, isOpenModal, perPage, deleteID, deleteName  , successMessage} = useSelector((state) => state.util);

     const dispatch =useDispatch();
      //delete  record from data base

    const handlerDelete = async (id) => {
        dispatch(modalOpenClose(false));
        await deleteRecord(id);
    }  
     

    return ( 

        <>
        <section className={`absolute top-40  left-0 w-screen md:w-screen dark:bg-zinc-700 bg-white  ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${openDrawer ? 'xl:w-screen' : 'xl:w-4/5'} flex flex-col justify-center items-center my-5 rounded`}>

        

         

            {isOpenModal ? <Modal name={deleteName}  >
                <button className="bg-clifford text-pallete border rounded-lg border-pallete px-4 py-1 m-2" onClick={() => handlerDelete(deleteID)}> حذف </button>
            </Modal> : null}


            <section className="w-11/12  relative overflow-x-auto  rounded p-3 m-3 shadow-lg ">

              {successMessage ? <SuccessAlert   /> : null}
                <section>

                    <TableFiltering />
                      <QueryStatusHandler query={query} >
                        {children}                      
                      </QueryStatusHandler>
                             
                    {/* perPage === 2 => type 2 , means we fetch all data table  */}
                    
                    {perPage === 2 ? <></> : pagination ? pagination.total > pagination.per_page && (<Paginate data={pagination} />) : null}

                </section>
            </section>
        </section >
    </>
    )
}
export default TableContainer;
