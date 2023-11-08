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
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const buttonOnClick = async () => {
    console.log(formErrors);
    const body = { email: email, password: password };
    try {
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
      const err = { email: "", password: "" };
      if (errorCode == 201) err.email = message;
      else if (errorCode == 202) err.password = message;
      console.log("Err: ", err);
      setFormErrors(err);
    }

    if (name === "ValidationError") {
      const { errors } = data;
      const err = { email: "", password: "" };
      errors.forEach((error: any) => {
        console.log(error.path);
        if (error.path === "password") err.password = error.msg;
        else if (error.path === "email") err.email = error.msg;
      });
      setFormErrors(err);
    }
  };

  return (
    <>
      <div className="form-login">
        <h2>Login Form</h2>
        <form>
          {/* Email input */}
          <FormInput
            inputId="email"
            inputType="email"
            placeholder="Your Email"
            labelText="Email Address"
            onChange={emailOnChange}
            errorMessage={formErrors.email}
          />

          {/* Password input */}
          <FormInput
            inputId="password"
            inputType="password"
            placeholder="Your Password"
            labelText="Password"
            onChange={passwordOnChange}
            errorMessage={formErrors.password}
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
              <a className="custom-link" href="/account/register">
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
