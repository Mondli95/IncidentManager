import './pieChartStats.css';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { teamData } from './chartsData';
import { monthlyVolumes } from './chartsData';

export default function PieChartStats() {
    return (
        <div className='pie-chart'>
            <ResponsiveContainer width="100%" height="100%" aspect={ 200 / 100 }>
                <PieChart width={500} height={300}>
                    <Pie data={teamData} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                    <Pie data={monthlyVolumes} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
