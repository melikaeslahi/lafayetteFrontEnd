
 

const  SidbarFrame =({children  } ) =>{
    return(
        <>
    
                 <section className="flex flex-col justify-center items-center p-3 mt-2  w-full h-3/4 lg:w-2/6 xl:w-2/6 md:w-full border border-gray-300  shadow-lg shadow-gray-200 rounded-lg ">
                   
                        {children}
                    
                 </section>

      
            
    
        </>
    )
}
export default SidbarFrame;