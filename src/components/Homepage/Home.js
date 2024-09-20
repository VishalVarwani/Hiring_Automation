

import React, { useState } from 'react';
import "../Homepage/Homepage.css";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'; // Import Axios to make API requests

export default function Home() {
  // State to store the selected number of candidates and users
  const [selectedLevel, setSelectedLevel] = useState('Select Level'); // Dropdown for level
  const [candidate, setCandidate] = useState('Select Number of candidates'); // Dropdown for candidates
  const [datasource, setDatasource] = useState('Select your datasource'); // Dropdown for datasource
  const [users, setUsers] = useState([]); // State to store fetched users
  const [expandedUsers, setExpandedUsers] = useState({}); // State to track expanded users

  
  // Function to handle level selection
  const handleSelectlevels = (level) => {
    setSelectedLevel(level); // Update the selected level
  };

  const handleSelectcandidate = (number) => {
    setCandidate(number); // Update the selected number of candidates
  };

  const handleSelectdatasource = (select) => {
    setDatasource(select); // Update the selected datasource
  };

  const fetchUsers = () => {
    let limit = candidate === 'All' ? 0 : parseInt(candidate); // Convert to integer, 0 for "All"
    
    // Make an API request to get users, including the selected level, limit, and datasource
    axios.get(`http://localhost:3001/?limit=${limit}&level=${selectedLevel}&datasource=${datasource}`)
      .then(response => {
        setUsers(response.data); // Store the fetched users in the state
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  };
const toggleExpandUser = (userId) => {
  setExpandedUsers((prevState) => ({
    ...prevState,
    [userId]: !prevState[userId] // Toggle between true and false
  }));
};

  return (
    <div  style={{backgroundColor:"#FFF4E9"}}  className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div  className="col-md-10">
          <div  style={{backgroundColor:"#FFF4E9", border:"none" }}  className="card p-3 py-4">
            <h5  style={{color:"black"}}>Search for candidates</h5>
            <div className="row g-3 mt-2">
            <div className="col-md-3">
                <Dropdown onSelect={handleSelectlevels}>
                        <Dropdown.Toggle style={{backgroundColor:"#D2691E", borderColor:"#D2691E" }} variant="success" id="dropdown-basic">
                    {selectedLevel} {/* Display the selected level */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                    <Dropdown.Item eventKey="High">High</Dropdown.Item>
                    <Dropdown.Item eventKey="Moderate">Moderate</Dropdown.Item>
                    <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <input style={{width:500}} placeholder='Enter any job position' type='text'/>
              <div className="col-md-2">
             
                <button style={{backgroundColor:"#D2691E", color:"white"}} className="btn btn-block" onClick={fetchUsers}>Search</button>
              </div>
            </div>

            <div className="mt-3">
              <a 
                data-toggle="collapse" 
                href="#collapseExample" 
                role="button" 
                aria-expanded="false" 
                aria-controls="collapseExample" 
                className="advanced"
              >
                Advance Search With Filters <i className="fa fa-angle-down" />
              </a>
              <div className="collapse" id="collapseExample">
                <div style={{backgroundColor:"#FFF4E9", border:"none"}}  className="card card-body">
                  <div className="row">
                    <div className="col-md-4">
                      
                      <Dropdown   onSelect={handleSelectcandidate}>
                        <Dropdown.Toggle style={{backgroundColor:"#D2691E", borderColor:"#D2691E" }} variant="success" id="dropdown-basic">
                          {candidate} {/* Display the selected number of candidates */}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="All">All</Dropdown.Item>
                          <Dropdown.Item eventKey="10">10</Dropdown.Item>
                          <Dropdown.Item eventKey="15">15</Dropdown.Item>
                          <Dropdown.Item eventKey="20">20</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      
                    </div>
                    <div className="col-md-4">
                    <Dropdown onSelect={handleSelectdatasource}>
                  <Dropdown.Toggle  style={{backgroundColor:"#D2691E"}}variant="success" id="dropdown-basic">
                    {datasource} {/* Display the selected level */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                    <Dropdown.Item eventKey="Github">Github</Dropdown.Item>
                    <Dropdown.Item eventKey="Stackoverflow">Stackoverflow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Display the fetched users */}
            <div className="mt-4">
  {users.length > 0 ? (
    <ul style={{listStyle: "none", marginTop: "10px"}}>
      {users.map(user => (
        <li 
          key={user._id} 
          style={{
            border: "1px solid black", 
            marginTop: "10px", // Adds space between items
            padding: "10px",   // Adds some internal spacing
            borderRadius: "10px", // Optional: Adds rounded corners to the border
          }}
        >
          <div className='Userid'>
            <p style={{color: "black"}}><strong>Username:</strong> {user.Username} {user.Display_Name}</p>
            <p style={{color: "black"}}><strong>Email:</strong> {user.Email}</p>
          </div>
          <div style={{textAlign: "end", display: "flex", justifyContent: "end"}}>
            <p style={{
              textAlign: "center",
              border: "2px solid #D2691E", 
              width: "150px", 
              borderRadius: "1px", 
              position: "absolute", 
              backgroundColor: "#D2691E", 
              color: "white"
            }}>
              <strong>Type:</strong> {user.Type}
            </p>
          </div>
          <p style={{color: "black"}}><strong>Activity Level:</strong> {user.Activity_Level}</p>

          {expandedUsers[user._id] ? (
  <>
    {/* Check if GitHub data should be displayed */}
    {datasource === "Github" || datasource === "All" ? (
      <>
        {user.Total_Stars && (
          <p style={{ color: "black" }}>
            <strong>Total Stars:</strong> {user.Total_Stars} <strong>Total Pull Requests:</strong> {user.Total_Pull_Requests}
          </p>
        )}
        {user.Total_Forks && (
          <p style={{ color: "black" }}>
            <strong>Total Forks:</strong> {user.Total_Forks} <strong>Total Commits:</strong> {user.Total_Commits}
          </p>
        )}
        {user.Total_Issues && (
          <p style={{ color: "black" }}>
            <strong>Total Issues:</strong> {user.Total_Issues}
          </p>
        )}
      </>
    ) : null}

    {/* Check if Stack Overflow data should be displayed */}
    {datasource === "Stackoverflow" || datasource === "All" ? (
      <>
      
        {user.Reputation_Score && (
          <p style={{ color: "black" }}>
            <strong>Reputation Score:</strong> {user.Reputation_Score} 
            <strong>       ,Total Questions:</strong> {user.Total_Questions}

          </p>
          
        )}
        {user.Total_Questions && (
          <p style={{ color: "black" }}>
            <strong>Total Questions:</strong> {user.Total_Questions}
            <strong>         ,Total Answers:</strong> {user.Total_Answers}
          </p>
        )}
       
        {user.Badges_Gold && (
          <p style={{ color: "black" }}>
            <strong>Badges (Gold):</strong> {user.Badges_Gold}
            <strong>,      Badges (Silver):</strong> {user.Badges_Silver}
            <strong>,      Badges (Bronze):</strong> {user.Badges_Bronze}
          </p>
        )}
      
        {user.Upvotes && (
          <p style={{ color: "black" }}>
            <strong>Upvotes:</strong> {user.Upvotes}
          </p>
        )}
        
        {/* Add more Stack Overflow specific fields if available */}
      </>
    ) : null}
  </>
) : null}


          {/* Toggle button */}
          <button 
            style={{
              backgroundColor: "#D2691E", 
              color: "white", 
              border: "none", 
              padding: "5px", 
              cursor: "pointer",
              marginTop: "10px", // Adds space between details and button
              outline:"none"
         
            }} 
            onClick={() => toggleExpandUser(user._id)}
          >
            {expandedUsers[user._id] ? 'Show Less' : 'Show More'}
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No users found</p>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
