import Cart from './Cart'
import chartItems from '@/constant/dashbord/chartItems'

const ChartCart = () => {
    return chartItems.map(({ id, name, width, chart, height }) => (
        <Cart key={id} name={name} width={width} height={height}>
            {chart}
        </Cart>
    ))
}
export default ChartCart
