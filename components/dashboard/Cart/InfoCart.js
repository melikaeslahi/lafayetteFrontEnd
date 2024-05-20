import Cart from './Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cartItems from '@/constant/dashbord/cartItems'
 
const InfoCart = () => {
 
    return cartItems.map(({ id, name, icon, dataNumber }) => (
        <Cart key={id} name={name} width={'72'} height={'32'}>
            <section>
                <section className="flex text-palette text-2xl justify-center m-3 p-3">
                    <h3
                        className={`pl-3 dark:text-gray-100 text-black `}>
                        {' '}
                        {dataNumber}{' '}
                    </h3>
                    <FontAwesomeIcon icon={icon} className={'text-pallete'} />
                </section>
            </section>
        </Cart>
    ))
}
export default InfoCart
