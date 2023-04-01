import './incidentsList.css';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../../context/Context';


export default function IncidentsList() {
    const [incidents, setIncidents] = React.useState([]);
    const { userDetails } = React.useContext(Context);

    React.useEffect(() => {
        const getIncidents = async () => {
            const incidents = await axios.get("https://localhost:7213/incident-v1/get-incidents");
            setIncidents(incidents.data);
        }
        getIncidents();
    }, []);

    const columns = [
        { field: 'id', headerName: 'Incident#', width: 90 },
        { field: 'title', headerName: 'Title', width: 210 },
        {
            field: 'date', headerName: 'Date Logged', width: 180, renderCell: (params) => {
                return (
                    <>{new Date(params.row.date).toDateString()}</>
                )
            }
        },
        { field: 'reporter', headerName: 'Owner', width: 190 },
        {
            field: 'status', headerName: 'Status', width: 220, renderCell: (params) => {
                return (
                    <>
                        <label className={params.row.status}>{params.row.status}</label>
                    </>)
            }
        },
        {
            field: 'priority', headerName: 'Priority', width: 200, renderCell: (params) => {
                return (
                    <>
                        <label className={params.row.priority}>{params.row.priority}</label>
                    </>
                )
            }
        },
        {
            field: 'view', headerName: 'View', width: 130, renderCell: (params) => {
                return (
                    <>
                        <Link to={userDetails ? '/view-incident/' + params.row.id : '/login'} state={{ fromPage: 'incident-list' }}>
                            <button className="viewIncidentBtn">View</button>
                        </Link>
                    </>
                )
            }
        },
    ];

    return (
        <div className='incidentsList'>
            <DataGrid
                className='gridTable'
                rows={incidents}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={10}
            // checkboxSelection
            />
        </div>
    )
}
