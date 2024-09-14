import React, { useState } from 'react';
import "../loginpage/loginpage.css";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); // renamed history to navigate to align with modern API
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault(); // prevent page reload

    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password
      });

      if (response.data === "exist") {
        navigate("/home", { state: { id: email } }); // Use navigate instead of history
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect details");
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Welcome Again</p>
                    <form className="mx-1 mx-md-4" onSubmit={submit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Login
                        </button>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <label className="form-check-label" htmlFor="form2Example3">
                          Don't have an account?
                        </label>
                        <Link to='/Signup'>Sign up</Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
