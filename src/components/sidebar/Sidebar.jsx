import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Sidebar() {

    const { userDetails } = useContext(Context);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="navbarMenu">
                    <h3 className="navbarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to={'/'} className="link">
                            <li className="sidebarListItem">
                                <HomeIcon className="sidebarItemIcon" />
                                Home
                            </li>
                        </Link>
                        <Link to={'/incidents'} className="link">
                            <li className="sidebarListItem">
                                <QueryStatsIcon className="sidebarItemIcon" />
                                View Incidents
                            </li>
                        </Link>
                        <Link to={userDetails ? '/create-incident' : '/login'} className="link">
                            <li className="sidebarListItem">
                                <AddIcon className="sidebarItemIcon" />
                                Create Incident
                            </li>
                        </Link>
                        <Link to={'/analytics'} className="link">
                            <li className="sidebarListItem">
                                <TimelineIcon className="sidebarItemIcon" />
                                Analytics
                            </li>
                        </Link>
                        {userDetails && <Link to={'/my-assigned-incidents'} className='link' state={{ username: 'Mondli Mkhanyiswa' }}>
                            <li className="sidebarListItem">
                                <BookmarkAddedIcon className="sidebarItemIcon" />
                                Assigned to Me
                            </li>
                        </Link>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
