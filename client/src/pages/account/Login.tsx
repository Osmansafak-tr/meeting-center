import "./login.css";
import FormInput from "../../components/FormInput";
import { useState, ChangeEvent } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const buttonOnClick = () => {
    console.log(email + ", " + password);
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
          />

          <div className="col mb-1">
            {/* <!-- Simple link --> */}
            <a className="custom-link" href="#!">
              Forgot password?
            </a>
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

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>
              Not a member?{" "}
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
