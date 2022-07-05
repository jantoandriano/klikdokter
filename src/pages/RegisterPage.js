import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateRegister, setStateRegister] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setStateRegister({ ...stateRegister, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(stateRegister, navigate));
  };

  return (
    <div
      className="px-4 py-5 px-md-5 text-center text-lg-start"
      style={{ backgroundColor: "hsl(0, 0%, 96%)", height: "100vh" }}
    >
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="mb-5 mb-lg-0">
            <div className="card">
              <div className="card-body py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={stateRegister.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="passowrd"
                      className="form-control"
                      value={stateRegister.password}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                </form>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
