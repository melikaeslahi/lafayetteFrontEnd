import BarChart from "@/components/dashboard/charts/BarChart";
import LineChart from "@/components/dashboard/charts/LineChart";
import PieChart from "@/components/dashboard/charts/PieChart";

const  chartItems =[
    {
        id:2,
        name:' نمودار روش خرید ',
        chart:<PieChart />,
        width:'1/4',
        height:'64'

    },
    {
        id:1,
        name:' نمودار  کاربران ',
        chart:<BarChart />,
        width:'2/4',
        height:'64'

    },

    {
        id:3,
        name:' نمودار  میزان فروش ',
        chart:<LineChart />,
        width:'3/4',
        height:'64'

    },

]
export default chartItems;