const TabItems =({title , children ,className})=>{
    return(
        <>
        <section className="mb-4 border-b w-full border-pallete dark:border-pallete flex flex-col lg:flex-row xl:flex-row md:flex-col justify-between items-center">
                <h1 className={`cursor-pointer hover:text-pallete font-bold  mr-3 ${className}`}>{title}</h1>

                <ul className="flex flex-wrap   text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                    {children}
                   
                </ul>
           
            </section>
        </>
    );
}
export default  TabItems;