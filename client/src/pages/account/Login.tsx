import "./login.css";
import FormInput from "../../components/FormInput";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import cookieHandler from "../../services/cookieHandler";
import { backendReqHandler } from "../../services/reqHandler";
const reqHandler = backendReqHandler;

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
    const body = { email: email, password: password };
    try {
      // const response = await axios.post(url, body);
      const response = await reqHandler.post("/account", body);
      const { accessToken } = response.data;
      cookieHandler.setAuthCookie(accessToken);
      navigate("/");
    } catch (error: any) {
      handleReqError(error);
    }
  };

  const handleReqError = (error: any) => {
    console.log(error);
    const { data } = error.response;
    const { errorCode, name } = data;
    if (name === "FormError") {
      const { message } = data;
      if (errorCode == 201) {
        setErrorEmail(message);
        setErrorPassword("");
      } else if (errorCode == 202) {
        setErrorPassword(message);
        setErrorEmail("");
      }
    }

    if (name === "ValidationError") {
      const { errors } = data;
      errors.forEach((error: any) => {
        console.log(error.path);
        if (error.path === "password") setErrorPassword(error.msg);
        else if (error.path === "email") setErrorEmail(error.msg);
      });
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

          <p className="error-text col">{errorPassword}</p>

          {/* Password input */}
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Your Password"
            labelText="Password"
            onChange={passwordOnChange}
          />

          <div className="col mb-2 text-right">
            <a className="custom-link" href="#!">
              Forgot password?
            </a>
          </div>

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
