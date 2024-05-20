import { useSelector } from 'react-redux'

const TitlePage = ({ name, sitemapPage,  children   }) => {
 
    const {openDrawer} =useSelector((state)=>state.util);
    // console.log(createHref)
    return (
        <>
            <section
                className={`absolute  top-20 left-0  w-screen md:w-screen dark:bg-zinc-700 bg-white 
                 ${openDrawer ? 'lg:w-screen' : 'lg:w-4/5'} ${
                    openDrawer ? 'xl:w-screen' : 'xl:w-4/5'
                } flex justify-around items-center p-5  my-5 `}>
                <section>
                    <h1
                        className={`font-bold text-lg  
                             dark:text-gray-100 text-black 
                         `}>
                        {' '}
                        {name}{' '}
                    </h1>
                    <h1 className="text-base text-pallete items-center ">
                        <a
                            href=""
                            className="hover:text-primary active:text-pallete  ">
                            داشبورد /
                        </a>
                        <a
                            href=""
                            className="hover:text-primary active:text-clifford  ">
                            {' '}
                            {sitemapPage}{' '}
                        </a>
                    </h1>
                </section>

                <section>
                    
                         
                        {children}
                    
                </section>
            </section>
        </>
    )
}
export default TitlePage
