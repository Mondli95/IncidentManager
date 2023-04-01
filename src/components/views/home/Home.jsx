import './home.css';
import Widget from '../widget/Widget';
import StatsWidget from '../widget/StatsWidget';

export default function Home() {
    return (
        <div className='home'>
            <Widget />
            <StatsWidget />
        </div>
    )
}
