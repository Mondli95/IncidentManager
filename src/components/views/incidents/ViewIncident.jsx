import { Link, useLocation } from 'react-router-dom';
import './viewIncident.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../context/Context';

export default function ViewIncident() {

    const { userDetails } = useContext(Context);
    const location = useLocation();
    const [error, setError] = useState(false);
    const [incident, setIncidents] = useState([]);
    const incidentId = location.pathname.split('/')[2];
    const resolution = useRef('');
    const timeSpent = useRef(0);
    const { fromPage } = location.state;

    useEffect(() => {
        const getIncidents = async () => {
            const response = await axios.get("https://localhost:7213/incident-v1/incident-details?id=" + incidentId);
            setIncidents(response.data);
        }
        getIncidents();
    }, [incidentId]);

    const takeOwnership = async () => {
        try {
            await axios.post("https://localhost:7213/incident-v1/take-ownership", {
                'username': userDetails.email,
                'incidentId': incidentId
            });
        } catch (error) {
            setError(true);
            console.log('An error occured..')
        }
    }

    const edit = () => {
        console.log('direct to edit page')
    }

    const resolveIncident = async () => {
        await axios.post("https://localhost:7213/incident-v1/resolve", {
            'resolution': resolution.current.value,
            'timespent': timeSpent.current.value,
            'incidentId': incidentId
        });
        resolution.current.value = '';
        timeSpent.current.value = '';
    }

    return (
        <div className='viewIncident'>
            <div className="incidentTitleContainer">
                {fromPage !== 'assignee-page' && <Link to={'/incidents'} className='link'>
                    <KeyboardBackspaceIcon className='incidentDetailsBackBtn' />
                </Link>}
                {fromPage === 'assignee-page' && <Link to={'/my-assigned-incidents'} className='link'>
                    <KeyboardBackspaceIcon className='incidentDetailsBackBtn' />
                </Link>}
                <h2 className='viewIncidentTitle'>Incident Details</h2>
            </div>

            <div className="incidentDetailsContainer">
                <div className="incidentDetailsLeftPanel">
                    <div className="incidentDetails">
                        <label>Incident #:</label>
                        <span className="infoDetails">{incident.id}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Date Create:</label>
                        <span className="infoDetails">{new Date(incident.date).toDateString()}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Title:</label>
                        <span className="infoDetails">{incident.title}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Description:</label>
                        <span className="infoDetails">{incident.description}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Priority:</label>
                        <span className={"infoDetails " + incident.priority}>{incident.priority}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Category:</label>
                        <span className="infoDetails">{incident.category}</span>
                    </div>
                    {fromPage === 'assignee-page' && incident.status !== 'Resolved' && <div className="incidentDetails">
                        <label>Resolution:</label>
                        <textarea className='incidentResolution' ref={resolution}></textarea>
                    </div>}
                    {fromPage === 'assignee-page' && incident.status !== 'Resolved' && <div className="incidentDetails">
                        <label>Time Spent+{'(minutes)'}:</label>
                        <input className='incidentTimespent' ref={timeSpent}></input>
                    </div>}
                </div>

                <div className="incidentDetailsRightPanel">
                    <div className="incidentDetails">
                        <label>Status:</label>
                        <span className="infoDetails">{incident.status}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Assigned To:</label>
                        <span className="infoDetails">{incident.assignee}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Reporter:</label>
                        <span className="infoDetails">{incident.reporter}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Impact:</label>
                        <span className="infoDetails">{incident.impact}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Resolution:</label>
                        <span className="infoDetails">{incident.resolution}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Duration of Resolution:</label>
                        <span className="infoDetails">{incident.timeSpent}</span>
                    </div>
                    <div className="incidentDetails">
                        <label>Comments:</label>
                        <span className="infoDetails">{incident.comments}</span>
                    </div>
                    {incident.status !== 'Resolved' && incident.status !== 'Assigned' && incident.reporter !== userDetails.email && fromPage !== 'assignee-page' &&
                        <Link to={'/incidents'} className="link">
                            <button className="submitBtn" onClick={takeOwnership}>Take Ownership</button>
                        </Link>
                    }
                    {incident.reporter === userDetails.email &&
                        < Link to={'/'} className="link">
                            <button className="submitBtn" onClick={edit}>Edit</button>
                        </Link>
                    }
                    {fromPage === 'assignee-page' && incident.status !== 'Resolved' && incident.reporter !== userDetails.email &&
                        <Link to={'/my-assigned-incidents'} >
                            <button className="submitBtn" onClick={resolveIncident}>Resolve</button>
                        </Link>
                    }
                </div>
            </div>
        </div >
    )
}
