import "./login.css";
import FormInput from "../../components/FormInput";
import { useState, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const { verifyAuth, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      await verifyAuth().then(() => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      handleReqError(error);
    }
  };

  const buttonOnClick = async () => {
    await handleLogin();
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
      <div className="item-center">
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
      </div>
    </>
  );
};

export default Login;
