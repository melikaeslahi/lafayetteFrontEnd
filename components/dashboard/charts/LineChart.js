import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
)
const LineChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [options, setOptions] = useState({})
    useEffect(() => {
        setChartData({
            labels: [
                'sun',
                'mon',
                'sat',
                'fir',
                'thr',
                'wed',
                'sat',
                'fir',
                'thr',
                'wed',
            ],
            datasets: [
                {
                    fill: true,
                    label: 'Dataset 2',
                    data: [152, 452, 745, 741, 845, 562, 456, 787, 582, 465],
                    borderColor: '#d08a85',
                    backgroundColor: '#d08a85',
                },
            ],
        })

        setOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Line Chart',
                },
            },
        })
    }, [])

    return <Line options={options} data={chartData} />
}
export default LineChart
