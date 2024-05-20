import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
ChartJS.register(ArcElement, Tooltip, Legend)
const PieChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [options, setOptions] = useState({})
    useEffect(() => {
        setChartData({
            labels: ['سایت', 'اینستاگرام', 'حضوری'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
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
    return <Pie data={chartData} options={options} />
}
export default PieChart
