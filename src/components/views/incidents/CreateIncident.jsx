import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../../context/Context';
import './createIncident.css';

export default function CreateIncident() {

  const [error, setError] = useState(false);
  const [showMessage, setMessage] = useState(false);
  const { userDetails } = useContext(Context);

  const title = useRef('');
  const description = useRef('');
  const priority = useRef('');
  const category = useRef('');
  const impact = useRef('');
  const comments = useRef('');

  const submitIncidentHandler = async (e) => {
    e.preventDefault();
    console.log(impact.current.value);

    try {
      await axios.post("https://localhost:7213/incident-v1/create-incident", {
        'title': title.current.value,
        'description': description.current.value,
        'priority': priority.current.value,
        'category': category.current.value,
        'impact': impact.current.value,
        'reporter': userDetails.email,
        'comments': comments.current.value
      });
      setMessage(true);
      clearInputs();

    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  function clearInputs() {
    title.current.value = '';
    description.current.value = '';
    priority.current.value = 'select';
    category.current.value = 'select';
    impact.current.value = 'select';
    comments.current.value = '';
  }

  return (
    <div className='createIncident'>
      <div className="titleContainer">
        <h1 className="formTitle">Create Incident</h1>
        <button className="cancelBtn">Cancel</button>
      </div>
      <div className="incidentContainer">
        <div className="leftPanelFormContainer">
          <form className="leftPanelForm">
            <div className="incidentInput">
              <span className="incidentInfoTitle">Title:</span>
              <input type="text" className="incidentTitleInput" placeholder='Enter incident title..' ref={title} />
            </div>
            <div className="incidentInput">
              <span className="incidentInfoTitle">Description:</span>
              <textarea name="comments" id="comments" cols="30" rows="10" className="incidentDescription" ref={description} ></textarea>
            </div>
            <div className="incidentInput">
              <span className="incidentInfoTitle">Priority:</span>
              <select name="priority" id="priority" className="incidentSelect" ref={priority} >
                <option value="select" className="incidentOptions">-- Select --</option>
                <option value="Low" className="incidentOptions">Low</option>
                <option value="Medium" className="incidentOptions">Medium</option>
                <option value="High" className="incidentOptions">High</option>
              </select>
            </div>
            <div className="incidentInput">
              <span className="incidentInfoTitle">Category:</span>
              <select name="priority" id="priority" className="incidentSelect" ref={category} >
                <option value="select" className="incidentOptions">-- Select --</option>
                <option value="Bug" className="incidentOptions">Bug</option>
                <option value="Feature Request" className="incidentOptions">Feature Request</option>
                <option value="User Error" className="incidentOptions">User Error</option>
              </select>
            </div>
          </form>
        </div>
        <div className="rightPanelFormContainer">
          <form className="rightPanelForm">
            <div className="incidentInput">
              <span className="incidentInfoTitle">Impact:</span>
              <select name="impact" id="" className="incidentSelect" ref={impact} >
                <option value="select" className="incidentOptions">-- Select --</option>
                <option value="Minor" className="incidentOptions">Minor</option>
                <option value="Medium" className="incidentOptions">Medium</option>
                <option value="Critical" className="incidentOptions">Critical</option>
              </select>
            </div>
            <div className="incidentInput">
              <span className="incidentInfoTitle">Comments:</span>
              <textarea name="comments" id="comments" cols="30" rows="10" className="incidentComments" ref={comments} ></textarea>
            </div>
          </form>
          <button className="createIncidentBtn" onClick={submitIncidentHandler}>Submit</button>
          {showMessage && <label>Created</label>}
        </div>
      </div>
    </div>
  )
}
