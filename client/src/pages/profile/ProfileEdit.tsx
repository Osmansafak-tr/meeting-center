import { ChangeEvent, useEffect, useState } from "react";
import FormInput from "../../components/FormInput";
import "./profileEdit.css";
import { UserUpdateModel } from "../../models/user";
import { useNavigate } from "react-router-dom";
import { backendReqHandler } from "../../services/reqHandler";

const ProfileEdit = () => {
  const [user, setUser] = useState<UserUpdateModel>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const url = "/profile";
        const response = await backendReqHandler.get(url);
        const user: UserUpdateModel = await response.data;

        setUser(user);
        const nameInput: any = document.getElementById("name");
        if (nameInput) nameInput.value = user.name ?? "";
        const surnameInput: any = document.getElementById("surname");
        if (surnameInput) surnameInput.value = user.surname ?? "";
        const screenNameInput: any = document.getElementById("screenName");
        if (screenNameInput) screenNameInput.value = user.screenName ?? "";
      } catch (error) {
        navigate("/");
      }
    };

    getUser();
  }, []);
  if (!user) return <></>;

  const onButtonClick = async () => {
    try {
      const url = "/profile";
      const body = {
        screenName: user.screenName,
        name: user.name,
        surname: user.surname,
      };
      await backendReqHandler.put(url, body);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const onFormInputChange = (param: "name" | "surname" | "screenName") => {
    const onClick = (event: ChangeEvent<HTMLInputElement>) => {
      let newUser = user;
      newUser[param] = event.target.value;
      setUser(newUser);
    };

    return onClick;
  };

  return (
    <>
      <div className="form-edit-profile item-center">
        <div className="form-edit-profile-header">
          <h2>Edit Profile Form</h2>
        </div>
        <div>
          <FormInput
            inputId="name"
            inputType="text"
            placeholder="Your Name ..."
            labelText="Name"
            onChange={onFormInputChange("name")}
            errorMessage=""
            isRequired={false}
          />
          <FormInput
            inputId="surname"
            inputType="text"
            placeholder="Your Surname ..."
            labelText="Surname"
            onChange={onFormInputChange("surname")}
            errorMessage=""
            isRequired={false}
          />
          <FormInput
            inputId="screenName"
            inputType="text"
            placeholder="Your Screen Name ..."
            labelText="Screen Name"
            onChange={onFormInputChange("screenName")}
            errorMessage=""
            isRequired={false}
          />

          <button
            className="btn btn-primary btn-create btn-block"
            onClick={onButtonClick}
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
