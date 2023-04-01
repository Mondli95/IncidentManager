import BarChartStats from '../charts/BarChartStats';
import PieChartStats from '../charts/PieChartStats';
import './statsWidget.css';

export default function StatsWidget() {
    return (
        <div className='stats-widget'>
            <div className="statsWidgetItem">
                    <h3 className="chartTitle">Incident Statistics</h3>
                    <div className="statsItem">
                        <PieChartStats />
                    </div>
                </div>
                <div className="statsWidgetItem">
                    <h3 className="chartTitle">Workload</h3>
                    <div className="statsItem">
                        <BarChartStats />
                    </div>
                </div>
        </div>
    )
}
