import React from 'react';
import { useLocation } from 'react-router-dom';
import "../Homepage/Homepage.css"
export default function Home() {
  // const location = useLocation();
  
  // Destructure `state` and provide default values
  // const { state } = location;
  // const userId = state?.id || 'Guest';

  return (
<div className="container mt-5">
  <div className="row d-flex justify-content-center">
    <div className="col-md-10">
      <div className="card p-3  py-4">
        <h5>Search for candidates</h5>
        <div className="row g-3 mt-2">
          <div className="col-md-3">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
               Search your level
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">All</a></li>
                <li><a className="dropdown-item" href="#">Advanced</a></li>
                <li><a className="dropdown-item" href="#">Intermediate</a></li>
                <li><a className="dropdown-item" href="#">Low</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Enter Your desired language" />
          </div>
          <div className="col-md-3">
            <button className="btn btn-secondary btn-block">Search</button>
          </div>
        </div>
        <div className="mt-3">
          <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" className="advanced">
            Advance Search With Filters <i className="fa fa-angle-down" />
          </a>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div className="row">
              <div className="col-md-4">
              <button style={{backgroundColor:"blue" }}className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
              Number of candidates
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">5</a></li>
                <li><a className="dropdown-item" href="#">10</a></li>
                <li><a className="dropdown-item" href="#">15</a></li>
              </ul>
            </div>
        
            <div className="col-md-4">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
               Select your datasource
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">All</a></li>
                <li><a className="dropdown-item" href="#">Github</a></li>
                <li><a className="dropdown-item" href="#">Stackoverflow</a></li>
              </ul>
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
