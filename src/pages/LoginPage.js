import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth";
import { setToken } from "../features/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stateLogin, setStateLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setStateLogin({ ...stateLogin, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(stateLogin);
    if (response) {
      dispatch(setToken(response));
      navigate("/");
    }
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
                      value={stateLogin.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={stateLogin.password}
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
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
