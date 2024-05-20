'use client'
import TitlePage from '@/components/dashboard/TitlePage'
import InfoCart from '@/components/dashboard/Cart/InfoCart'
import ChartCart from '@/components/dashboard/Cart/ChartCart'
 
 
import Cart from '@/components/dashboard/Cart/Cart'
import { useSelector } from 'react-redux'
import Table from '@/components/dashboard/Table/Table'
 

// export const   metadata= {
//     title:  '  صفحه ی اصلی ',
      
     
    
//   }

const Home = () => {
    
    const {openDrawer} =useSelector((state)=>state.util);
    const header = [
        {
            id: 1,
            name: '#',
        },
        {
            id: 2,
            name: ' نام محصول',
        },
        {
            id: 3,
            name: ' قیمت محصول ',
        },
        {
            id: 4,
            name: ' هزینه ارسال ',
        },
    ]

    const body = [
        {
            id: 1,
            name: 'کلاه',
            price: 250000,
            dispatch: 2000,
        },
        {
            id: 2,
            name: 'کلاه',
            price: 250000,
            dispatch: 2000,
        },
        {
            id: 3,
            name: 'کلاه',
            price: 250000,
            dispatch: 2000,
        },
    ]
    return (
        <>
            {/* <TitlePage name='داشبورد' sitemapPage='داشبورد' /> */}

            <section
                className={`absolute top-32 left-0 w-screen md:w-screen   
                    dark:bg-zinc-700  bg-white
                  ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${
                    openDrawer ? 'xl:w-screen' : 'xl:w-4/5'
                } flex flex-col justify-center items-center my-5 rounded`}>
                <section className="flex flex-col md:flex-col lg:flex-row xl:flex-row flex-wrap  justify-center items-center p-3 w-auto  ">
                    <InfoCart />
                </section>

                <section className="flex flex-row flex-wrap  justify-center items-center  p-3  my-5 rounded">
                    <ChartCart />
                </section>
                <Cart width={'3/4'} name={'آخرین سفارشات'} height={'90'}>
                    <section className="overflow-x-auto">
                        <Table  header={header}>
                            {body.map(({ id, name, price, dispatch }) => (
                                <tr
                                    key={id}
                                    className="text-center hover:bg-pallete hover:bg-opacity-20 hover:text-pallete  w-full    border-b-2 border-pallete">
                                    <td className="pl-3 py-3">{id}</td>
                                    <td className="pl-3 py-3"> {name} </td>
                                    <td className="pl-3 py-3"> {price} </td>
                                    <td className="pl-3 py-3"> {dispatch} </td>
                                </tr>
                            ))}
                        </Table>
                    </section>
                </Cart>
            </section>
        </>
    )
}
export default Home
