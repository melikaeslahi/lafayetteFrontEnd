'use client'
import { Button } from "@/components/dashboard/inputs";
import { faArrowAltCircleRight, faArrowRight, faBagShopping, faBars, faHeart, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useAddToFavoriteMutation, useGetProductMutation } from "@/lib/customer/market/productApi";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
 
const ProductHeader = () =>{

    const router = useRouter();
    const  {isFavorite}=useSelector(state=>state.productCustomer);
    const [favorite, { data: favoriteData }] = useAddToFavoriteMutation();
    const [btnFavorite , setBtnFavorite] = useState(false);

    useEffect(()=>{
    if(isFavorite)
    
    setBtnFavorite(isFavorite);
} , [isFavorite])

 

     useEffect(()=>{

      if(favoriteData){
        if (favoriteData.status === 1) {
            setBtnFavorite({isFavorite:true ,
            id:isFavorite.id
            })
             toast.success('محصول به علاقه مندی های شما اضافه شد', {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        } else if (favoriteData.status === 2) {
            setBtnFavorite({isFavorite:false ,
                id:isFavorite.id
                });

            toast.success('    محصولا از علاقه مندی های شما حذف شد  ', {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        } else if (favoriteData.status === 3) {
            toast.success(`   ابتدا   وارد  شوید  `, {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        }
        }

    } , [favoriteData] )

    const handlerFavorite = async (slug) => {
        try {
            const data = await favorite(slug).unwrap();
        } catch (error) {
            toast.error(` خطایی پیش آمده است `, {
                position: toast.POSITION.TOP_LEFT,
                rtl: true
            })
        }
    }

    return(
        <>
         <header className="w-full">
                <section className="w-full flex justify-between items-center bg-white shadow-lg shadow-gray-300 z-50 fixed top-0">
                    <section className="flex justify-start items-center">
                        <section className="m-2">
                            <Button onClick={()=>router.back()}>
                            <FontAwesomeIcon icon={faArrowRight} />
                            </Button>
                            
                        </section>
                        <section className="m-2">
                            <Button>
                            <FontAwesomeIcon icon={faBars} />
                            </Button>
                            
                        </section>
                      
                    </section>
                    <section className="flex justify-end items-center">
                        <section className="m-2">
                            <Button>
                            <FontAwesomeIcon onClick={()=>handlerFavorite(btnFavorite.id)} className={`${btnFavorite.isFavorite ? 'text-pallete' : ''} `}  icon={faHeart} />
                            </Button>
                            
                        </section>
                        <section className="m-2">
                            <Button>
                            <FontAwesomeIcon icon={faBagShopping} />
                            </Button>
                            
                        </section>
                      
                    </section>
                </section> 

            </header>
        </>
    )
}
export default ProductHeader;