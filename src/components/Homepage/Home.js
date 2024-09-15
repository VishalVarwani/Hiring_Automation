import React, { useState } from 'react';
import "../Homepage/Homepage.css";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Home() {
  // State to store the selected level
  const [selectedLevel, setSelectedLevel] = useState('Select Level'); // Initial label of the dropdown
  const [candidate, setCandidate] = useState('Select Number of candidates'); // Initial label of the dropdown
  const [datasource, setDatasource] = useState('Select your datasource'); // Initial label of the dropdown



  // Function to handle level selection
  const handleSelectlevels = (level) => {
    setSelectedLevel(level); // Update the selected level
  };
  const handleSelectcandidate = (number) => {
    setCandidate(number); // Update the selected level
  };
  const handleSelectdatasource = (select) => {
    setDatasource(select); // Update the selected level
  };


  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card p-3 py-4">
            <h5>Search for candidates</h5>
            <div className="row g-3 mt-2">
              <div className="col-md-3">
                <Dropdown onSelect={handleSelectlevels}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedLevel} {/* Display the selected level */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                    <Dropdown.Item eventKey="Advanced">Advanced</Dropdown.Item>
                    <Dropdown.Item eventKey="Intermediate">Intermediate</Dropdown.Item>
                    <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Enter Your desired language" />
              </div>
              <div className="col-md-3">
                <button style={{backgroundColor:"#28a745", color:"white"}} className="btn btn-block">Search</button>
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
                <div className="card card-body">
                  <div className="row">
                    <div className="col-md-4">
                    <Dropdown onSelect={handleSelectcandidate}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {candidate} {/* Display the selected level */}
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
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {datasource} {/* Display the selected level */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                    <Dropdown.Item eventKey="Github">Github</Dropdown.Item>
                    <Dropdown.Item eventKey="Stackoverflow">Stackoverflow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                    </div>
                    {/* <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="Search by Country" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
