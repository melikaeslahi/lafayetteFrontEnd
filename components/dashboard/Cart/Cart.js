import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
 

const Cart = ({ children, name, width, height }) => {
 
    return (
        <section
            className={`w-${width} h-${height}   flex flex-col rounded p-3 m-3  
                 dark:shadow-gray-300 dark:shadow-sm shadow-lg 
               `}>
            <section className="flex  justify-between border-b-2 border-pallete pb-2 font-lotus">
                <section>
                    <a
                        href=""
                        className={`dark:text-gray-100 text-black`}>
                        {' '}
                        <FontAwesomeIcon
                            icon={faFilter}
                            className="text-pallete"
                        />{' '}
                        فیلتر{' '}
                    </a>
                </section>
                <section className={` dark:text-gray-100 text-black`}>
                    {' '}
                    {name}{' '}
                </section>
            </section>

            {children}
        </section>
    )
}
export default Cart
