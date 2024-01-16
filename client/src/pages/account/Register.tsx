import "./register.css";
import FormInput from "../../components/FormInput";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { backendReqHandler } from "../../services/reqHandler";
const reqHandler = backendReqHandler;

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const getDefaultFormError = () => {
    return {
      username: "",
      email: "",
      password: "",
      name: "",
      surname: "",
    };
  };
  const [formErrors, setFormErrors] = useState(getDefaultFormError());

  const navigate = useNavigate();

  const getOnChangeMethod = (setMethod: Function) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setMethod(event.target.value);
    };
  };

  const usernameOnChange = getOnChangeMethod(setUserName);
  const emailOnChange = getOnChangeMethod(setEmail);
  const passwordOnChange = getOnChangeMethod(setPassword);
  const nameOnChange = getOnChangeMethod(setName);
  const surnameOnChange = getOnChangeMethod(setSurname);
  const buttonOnClick = async () => {
    const body = {
      username: username,
      email: email,
      password: password,
      name: name,
      surname: surname,
    };
    console.log(body);
    try {
      await reqHandler.post("/account/register", body);
      navigate("/account");
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
      const err = getDefaultFormError();
      if (errorCode == 201) err.email = message;
      else if (errorCode == 202) err.password = message;
      else if (errorCode == 203) err.username = message;
      console.log("Err: ", err);
      setFormErrors(err);
    }

    if (name === "ValidationError") {
      const { errors } = data;
      const err = getDefaultFormError();
      errors.forEach((error: any) => {
        console.log(error.path);
        if (error.path === "password") err.password = error.msg;
        else if (error.path === "email") err.email = error.msg;
        else if (error.path === "username") err.username = error.msg;
        else if (error.path === "name") err.name = error.msg;
        else if (error.path === "surname") err.surname = error.msg;
      });
      setFormErrors(err);
    }
  };

  return (
    <>
      <div className="item-center">
        <div className="form-register">
          <h2>Register Form</h2>
          <form>
            {/* Username input */}
            <FormInput
              inputId="username"
              inputType="text"
              placeholder="Your Email"
              labelText="Username*"
              onChange={usernameOnChange}
              errorMessage={formErrors.username}
            />

            {/* Email input */}
            <FormInput
              inputId="email"
              inputType="email"
              placeholder="Your Email"
              labelText="Email Address*"
              onChange={emailOnChange}
              errorMessage={formErrors.email}
            />

            {/* Password input */}
            <FormInput
              inputId="password"
              inputType="password"
              placeholder="Your Password"
              labelText="Password*"
              onChange={passwordOnChange}
              errorMessage={formErrors.password}
            />

            {/* Name input */}
            <FormInput
              inputId="name"
              inputType="text"
              placeholder="Your Name"
              labelText="Name"
              onChange={nameOnChange}
              errorMessage={formErrors.name}
            />

            {/* Surname input */}
            <FormInput
              inputId="surname"
              inputType="text"
              placeholder="Your Surname"
              labelText="Surname"
              onChange={surnameOnChange}
              errorMessage={formErrors.surname}
            />

            {/*Submit button*/}
            <button
              type="button"
              className="btn btn-primary btn-block mb-4 btn-login"
              onClick={buttonOnClick}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
