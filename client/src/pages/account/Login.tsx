import "./login.css";
import FormInput from "../../components/FormInput";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const buttonOnClick = async () => {
    const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
    const url = backendOrigin + "/account";
    const body = { email: email, password: password };
    try {
      const response = await axios.post(url, body);
      const { accessToken } = response.data;
      createAuthCookie(accessToken);
      console.log(response.data);
      navigate("/");
    } catch (error: any) {
      handleReqError(error);
    }
  };

  const createAuthCookie = (accessToken: any) => {};

  const handleReqError = (error: any) => {
    const { errorCode, name, message } = error.response.data;
    if (name === "FormError") {
      if (errorCode == 201) {
        setErrorEmail(message);
        setErrorPassword("");
      } else if (errorCode == 202) {
        setErrorPassword(message);
        setErrorEmail("");
      }
    }
  };

  return (
    <>
      <div className="form-login">
        <h2>Login Form</h2>
        <form>
          <p className="error-text">{errorEmail}</p>
          {/* Email input */}
          <FormInput
            inputId="email"
            inputType="email"
            placeholder="Your Email"
            labelText="Email Address"
            onChange={emailOnChange}
          />

          <div className="row">
            <p className="error-text col">{errorPassword}</p>
            <div className="col mb-1 text-right">
              <a className="custom-link" href="#!">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Password input */}
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Your Password"
            labelText="Password"
            onChange={passwordOnChange}
          />

          {/*Submit button*/}
          <button
            type="button"
            className="btn btn-primary btn-block mb-4 btn-login"
            onClick={buttonOnClick}
          >
            Sign in
          </button>

          <div className="col text-center">
            <p>
              Not a Member?{" "}
              <a className="custom-link" href="#!">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
