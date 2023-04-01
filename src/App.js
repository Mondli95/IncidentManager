import './app.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/views/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentsList from './components/views/incidents/IncidentsList';
import CreateIncident from './components/views/incidents/CreateIncident';
import Analytics from './components/views/analytics/Analytics';
import ViewIncident from './components/views/incidents/ViewIncident';
import AssigneeIncidents from './components/views/incidents/AssigneeIncidents';
import Login from './components/views/login/Login';
import { useContext } from 'react';
import { Context } from './context/Context';
import Register from './components/register/Register';

function App() {

  const { userDetails } = useContext(Context);

  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/incidents' element={<IncidentsList />} />
          <Route path='/create-incident' element={<CreateIncident />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/view-incident/:incidentId' element={<ViewIncident />} />
          <Route path='/my-assigned-incidents' element={<AssigneeIncidents />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
