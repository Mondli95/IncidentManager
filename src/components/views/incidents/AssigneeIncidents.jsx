import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './assigneeIncidents.css';
import { Context } from '../../../context/Context';

export default function AssigneeIncidents() {

    const { userDetails } = useContext(Context)
    const [assigneeIncidents, setIncidents] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getIncidents = async () => {
            const response = await axios.get("https://localhost:7213/incident-v1/assignee-incidents?username=" + userDetails.email);
            setIncidents(response.data);
        }
        getIncidents();
    }, [userDetails]);

    console.log(assigneeIncidents)

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
        { field: 'status', headerName: 'Status', width: 220 },
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
                        {params.row.status !== 'Resolved' && <Link to={'/view-incident/' + params.row.id} state={{ fromPage: 'assignee-page' }}>
                            <button className="resolveIncidentBtn">Resolve</button>
                        </Link>}
                        {params.row.status === 'Resolved' && <Link to={'/view-incident/' + params.row.id} state={{ fromPage: 'assignee-page' }}>
                            <button className="resolveIncidentBtn">View</button>
                        </Link>}
                    </>
                )
            }
        },
    ];

    return (
        <div className='incidentsList'>
            <DataGrid
                className='gridTable'
                rows={assigneeIncidents}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
            // checkboxSelection
            />
        </div>
    )
}
