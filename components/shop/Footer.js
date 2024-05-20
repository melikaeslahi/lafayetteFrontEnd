import Image from "next/image";
import Link from "next/link";
import logo from '../../public/image/logoOne.jpg';
import enamad from '../../public/image/236e437c.png';
import mojavez from '../../public/image/3a24ea39.png'
import mojavez2 from '../../public/image/6e2d6b38.png'
import  cashdelivery from '../../public/image/cash-on-delivery.svg';
import  returnProduct from '../../public/image/days-return.svg';
import  originalProduct from '../../public/image/original-products.svg';
import  support from '../../public/image/support.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeAlt, faSearch, faShoppingCart, faSquare, faUser } from "@fortawesome/free-solid-svg-icons";





const Footer = () => {
    return (
        <footer className=" w-full   flex  flex-col  justify-center items-center bg-gray-50 ml-auto mr-auto  container">
                
             

           {/* show in xl and lg */}
            <section className="   flex     flex-col bg-gray-50 dark:bg-zinc-800     ">
                    
                <section className="flex justify-around items-center">
                    <section className="flex flex-col justify-center items-center m-5">
                    <Link href={'/pages/garantee-original-product'}>
                    <Image className="rounded-full cursor-pointer" alt={'ضمانت اصل بودن کالا'} src={originalProduct} width={'100'} height={'100'} />
                    <p className="text-sm cursor-pointer">ضمانت اصل بودن کالا</p>
                    </Link>
                    </section>

                    <section className="flex flex-col justify-center items-center m-5" >
                        <Link href={'/pages/product-return'}>
                    <Image className="rounded-full cursor-pointer" alt={'بازگشت 7 روز کالا'} src={returnProduct} width={'100'} height={'100'} />
                    <p className="text-sm cursor-pointer">   بازگشت 7 روز کالا</p>
                        </Link>
                    </section>
                    <section className="flex flex-col justify-center items-center m-5">
                    <Link href={'/pages/cash-payment'}>
                    <Image className="rounded-full cursor-pointer" alt={'امکان پرداخت در محل'} src={cashdelivery} width={'100'} height={'100'} />
                    <p className="text-sm cursor-pointer">       امکان پرداخت در محل</p>
                    </Link>
                    </section>
                    <section className="flex flex-col justify-center items-center m-5">
                    <Link href={'/pages/support'}>
                    <Image className="rounded-full cursor-pointer" alt={'پشتیبانی 24 ساعت'} src={support} width={'100'} height={'100'} />
                    <p className="text-sm cursor-pointer" >پشتیبانی 24 ساعت</p>
                    </Link>
                    </section>

                </section>
                <section className="flex flex-col lg:flex-row xl:flex-row md:flex-col  justify-between  lg:items-start xl:items-start md:items-center items-center py-5 my-5 border-y-2">
                    <section className="flex flex-col justify-center items-center m-3">
                        <Image className="rounded-full" alt={'logo'} src={logo} width={'200'} height={'200'} />
                    </section>

                    <section className="flex flex-col justify-start text-right   items-center lg:items-start font-lotus m-3">
                        <h2 className="text-lg font-bold mb-3">راهنمای خرید</h2>
                        <Link 
                        className="text-base   px-2 pb-1 text-right    hover:text-pallete"
                        
                        href={'/pages/size-guide'} >    راهنمای انتخاب سایز    </Link>
                        <Link 
                        className="text-base px-2 pb-1 text-right   hover:text-pallete  "
                         href={'/pages/delivery-method'} >     روش ارسال </Link>
                        <Link 
                        className="text-base px-2 pb-1 text-right   hover:text-pallete  "
                         href={'/pages/payment-method'} > روش پرداخت </Link>
                    </section>

                    <section className="flex flex-col justify-start items-center lg:items-start font-lotus m-3">
                        <h2 className="text-lg font-bold mb-3">   خدمات مشتریان</h2>
                        <Link 
                        className=" text-base px-2 pb-1 text-right  hover:text-pallete  "
                         href={'/pages/support'} > پشتیبانی : 09386695925    </Link>
                        <Link
                         className=" text-base px-2 pb-1 text-right   hover:text-pallete  " 
                         href={'/faqs'} > سوالات متداول </Link>
                        <Link
                         className=" text-base px-2 pb-1 text-right  first-letter: hover:text-pallete  "
                          href={'/pages/product-return'} > بازگشت کالا </Link>
                        <Link 
                        className=" text-base  px-2 pb-1 text-right   hover:text-pallete  "
                         href={'/pages/privacy'} > حریم خصوصی </Link>
                        <Link className="text-base  px-2 pb-1 text-right   hover:text-pallete  "
                         href={'/pages/online-store'} > فروشگاه حضوری      </Link>
                    </section>

                    <section className="flex flex-col justify-start items-center  lg:items-start font-lotus m-3">
                        <h2 className="text-lg font-bold mb-3"> درباره  لافایت</h2>
                        <Link
                         className=" text-base px-2 pb-1 text-right   hover:text-pallete  "
                         href={'/pages/about-us'} >         درباره ی ما    </Link>
                        <Link 
                        className=" text-base  px-2 pb-1 text-right  hover:text-pallete  "
                         href={'/pages/contact-us'} >        ارتباط با ما        </Link>

                    </section>
                    <section className="flex flex-col justify-start items-center font-lotus m-3" >
                        <h2 className="text-lg font-bold mb-3">       مجوز ها  </h2>
                        <section className="flex justify-between items-center">
                        <Image src={enamad} alt={'مجوز'} className={'rounded-sm border-0 pl-2'} width={'100'} height={'100'}  />
                        <Image src={mojavez} alt={'مجوز'} className={'rounded-sm border-0 pl-2'} width={'100'} height={'100'}  />
                        <Image src={mojavez2} alt={'مجوز'} className={'rounded-sm border-0 pl-2'} width={'100'} height={'100'}  />
                        </section>

                    </section>
                </section>
                <section className="flex flex-col    " >

                <section className="flex  p-5">

                        <section className="flex flex-col font-vazir">
                            <h5 className="text-pallete text-sm   p-2  ">فروشگاه اینترنتی پوشاک ولباس زنانه ی لافایت</h5>  
                             <p className="pb-2 text-sm   ">
                                فروشگاه لباس  زنانه   لافایت  از سال  1402 با هدف ایجاد بستری مناسب و مطمئن و نیز راحتی هرچه بیشتر مشتریان، برای خرید حضوری و غیرحضوری پوشاک  زنانه شروع به فعالیت نمود. ما با ارائه انواع البسه زنانه نظیر: انواع پیراهن زنانه (پیراهن های رسمی، یقه دپلمات، آستین کوتاه، چهارخانه، جین و...)، انواع شلوار زنانه (شلوارهای پارچه ای، کتان، جین واسلش)، انواع تیشرت و پولوشرت و انواع کت، جلیقه، سویشرت، کاپشن، پلیور و ... همچنین انواع کفش های  زنانه (کفش های رسمی، روزمره و ورزشی) و اکسسوری هایی نظیر کمربند، کلاه و... به دنبال ارائه تجربه ای راحت و لذت بخش از خرید اینترنتی برای مشتریان می باشیم. مجموعه لافایت   ارائه محصولات با کیفیت را در دستور کار خود قرار داده است. از این رو تمامی محصولات ارائه شده در سایت و فروشگاه های  لافایت   از محصولات با کیفیت می باشند. برای اطمینان خاطر مشتریان، تیم پشتیبانی    لافایت شنبه تا پنجشنبه از ساعت 9 الی 17 آماده راهنمایی و پاسخگویی به سوالات شما مشتریان عزیز می باشند. همچنین جهت رفاه هرچه بیشتر مشتریان دو فروشگاه حضوری   لافایت (فروشگاه های اقدسیه و شهرک غرب) هر روز هفته از ساعت 11 صبح الی 10 شب آماده خدمت رسانی به مشتریان می باشد.
                            </p>
                        </section>

                     
                    </section>  


                    <section className=" flex flex-col xl:flex-row lg:flex-row md:flex-col justify-between items-center">
                        <p className="  text-pallete text-sm p-2">کلیه حقوق مادی و معنوی این سایت متعلق به فروشگاه  لافایت می‌باشد</p>
                        <p className=" text-pallete text-sm p-2"> lafayette.com - 2023  © Copyright</p>
                    </section>
                </section>
            </section>
        </footer>
    )
}
export default Footer;