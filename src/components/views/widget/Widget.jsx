import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/Context';
import './widget.css';

export default function Widget() {

  const { userDetails } = useContext(Context);
  const [assignedToTeam, setAssignedToTeam] = useState(0);
  const [assignedToMe, setAssignedToMe] = useState(0);
  const [resolved, setResolved] = useState(0);

  useEffect(() => {
    const getIncidents = async () => {
      const incidents = await axios.get("https://localhost:7213/incident-v1/get-incidents");
      setAssignedToTeam(incidents.data.length);
      if (userDetails) {
        setAssignedToMe(incidents.data.filter(item => item.assignee === userDetails.email).length);
      }
      setResolved(incidents.data.filter(item => item.status === 'Resolved').length);
    }
    getIncidents();
  }, [userDetails])

  return (
    <div className='widget'>
      <div className="widgetItem">
        <span className="widgetTitle" style={{ color: "red" }}>Total Incidents</span>
        <div className="widgetItemContainer">
          <span className="widgetItemVolume">{assignedToTeam}</span>
        </div>
        <div className="widgetSub">Assigned to your team</div>
      </div>

      <div className="widgetItem">
        <span className="widgetTitle" style={{ color: "orange" }}>Assigned to me</span>
        <div className="widgetItemContainer">
          <span className="widgetItemVolume">{assignedToMe}</span>
        </div>
        <div className="widgetSub">Assigned to you</div>
      </div>

      <div className="widgetItem">
        <span className="widgetTitle" style={{ color: 'green' }}>Resolved</span>
        <div className="widgetItemContainer">
          <span className="widgetItemVolume">{resolved}</span>
        </div>
        <div className="widgetSub">Total for this month</div>
      </div>
    </div>
  )
}
