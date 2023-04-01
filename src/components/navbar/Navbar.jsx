import './navbar.css';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Navbar() {

    const { dispatch, userDetails } = useContext(Context);
    const [incidents, setIncidents] = useState(0);

    useEffect(() => {
        const getIncidents = async () => {
            const incidents = await axios.get("https://localhost:7213/incident-v1/get-incidents");

            if (userDetails) {
                setIncidents(incidents.data.filter(item => item.assignee === userDetails.email).length);
            }
        }
        getIncidents();
    }, [userDetails]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
    };

    return (
        <div className='navbar'>
            <div className="navbarWrapper">
                <div className="topLeft">
                    <span className="logo">incident manager</span>
                </div>
                <div className="topRight">
                    <div className="navbarIconContainer">
                        {!userDetails && <Link to={'/login'} className='link'>Login</Link >}
                        {userDetails && <Link to={'/'} className='link' onClick={logout}>Logout</Link>}
                    </div>
                    <div className="navbarIconContainer">
                        <NotificationsNoneIcon />
                        <span className="navbarNotificationNumber">{incidents}</span>
                    </div>
                    <div className="navbarIconContainer">
                        <SettingsIcon />
                    </div>
                    <div className="navbarIconContainer">
                        <LanguageIcon />
                    </div>
                    <img src={userDetails ? userDetails.profilePic : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJXWdvwDZC0RF_VSzzP8aXSX9Sc_VPAtuew&usqp=CAU'}
                        alt=''
                        className="navbarProfilePic" />
                </div>
            </div>
        </div>
    )
}
