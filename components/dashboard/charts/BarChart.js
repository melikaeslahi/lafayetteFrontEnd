import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {
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
                    lablel: 'sales',
                    data: [156, 545, 466, 453, 545, 774, 466, 453, 545, 774],
                    borderColor: '#d08a85',
                    backgroundColor: '#f9ede7',
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
                    text: 'Chart.js Bar Chart',
                },
            },
        })
    }, [])

    return <Bar options={options} data={chartData} />
}
export default BarChart
