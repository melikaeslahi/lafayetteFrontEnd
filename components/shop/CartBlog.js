import Image from "next/image";
import slide3 from '../../public/image/ffffff.jpg';
const CartBlog = ({children}) => {
    return (
        <section className="w-full flex justify-center  ml-auto mr-auto container">
            
       
        <section className="flex flex-col justify-between items-center w-3/4 h-3/4    ">
           <h1 className="font-bold text-lg text-pallete m-5">جدید ترین  بلاگ ها در لافایت</h1>
            <section className="flex flex-col lg:flex-row xl:flex-row md:flex-col h-ull justify-center items-center">

       {children}

                 

            </section>
        </section>
        </section>

    )
}
export default CartBlog;