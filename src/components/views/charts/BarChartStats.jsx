import './barChartStats.css';
import { yearOnYearIncidentsData } from './chartsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartStats() {
  return (
    <div className='bar-chart'>
      <ResponsiveContainer width="100%" height="100%" aspect={ 200 / 100 }>
        <BarChart
          width={500}
          height={300}
          data={yearOnYearIncidentsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Current Year" fill="#8884d8" />
          <Bar dataKey="Previous Year" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
