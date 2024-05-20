import { Button } from "@/components/dashboard/inputs";
import { faArrowAltCircleRight, faArrowRight, faBagShopping, faBars, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ProductFooter = () => {
    return (
        <>
            <header className="w-full">
                <section className="w-full flex justify-between items-center p-2 bg-white  shadow-2xl shadow-gray-400 z-50 fixed bottom-0">
                    <section className="flex justify-start items-center">
                        <section className="flex border rounded-lg mr-2 border-gray-300">
                            <button className="p-1 rounded-lg m-1 bg-pallete text-lg text-white" type="button">-</button>
                            <input className="rounded-sm border-none w-5 p-0 " type="number" min="1" max="5" step="1" value="1" readonly="readonly" />
                            <button className="p-1 m-1 rounded-lg bg-pallete text-lg text-white" type="button">+</button>
                        </section>

                    </section>
                    <section className="   ">

                        <section className="   p-2 mt-1">
                            <Link href={'/'} className={'text-sm bg-red-600  text-white px-6 py-2 rounded-lg'}>         اضافه به سبد خرید  </Link>
                        </section>
                    </section>

                    <section className="flex flex-col justify-end items-end ml-2">
                        <p className="text-sm ">200,000 تومان</p>
                        <p className="text-sm text-red-600">تخفیف 15,000 تومان</p>

                    </section>
                </section>

            </header>
        </>
    )
}
export default ProductFooter;