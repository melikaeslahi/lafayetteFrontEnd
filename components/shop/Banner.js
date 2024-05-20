const Banner = ({basis , children}) =>{
    return(
        <>
        <section className="flex justify-center items-center w-full ml-auto mr-auto  ">
        <section className={`hover:cursor-pointer h-56 rounded-lg m-5 w-full container bg-green-200 ${basis}`} >
           
           {children}
       </section>  
        </section>
        
        </>
    )
}
export default Banner;