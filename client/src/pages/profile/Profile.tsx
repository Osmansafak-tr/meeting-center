import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/Navbar";
import { backendReqHandler } from "../../services/reqHandler";
import { User } from "../../models/user";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const url = "/profile";
        const response = await backendReqHandler.get(url);
        const user: User = response.data;
        setUser(user);
      } catch (error) {
        navigate("/");
      }
    };

    getProfile();
  }, []);

  if (!user) return <></>;

  const setIfNotDefined = (str: String) => {
    const result = str != "" ? str : "Not defined";
    return result;
  };

  return (
    <>
      <Navbar />
      <div className="row container d-flex justify-content-center profile-card">
        <div className="col-xl-6 col-md-12">
          <div className="card user-card-full">
            <div className="row m-l-0 m-r-0">
              <div className="col-sm">
                <div className="card-block">
                  <div className="m-b-20 p-b-5 b-b-default f-w-600">
                    <div className="row">
                      <span className="profile-card-header col-8">Profile</span>
                      <div className="col text-right">
                        <a className="btn btn-info btn-lg" href="/profile/edit">
                          <img
                            src="../../../icons/pen-solid.svg"
                            alt=""
                            height={20}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="info-header">Email</p>
                      <h6 className="text-muted f-w-400">{user.email}</h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="info-header">Username</p>
                      <h6 className="text-muted f-w-400">{user.username}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="info-header">Name</p>
                      <h6 className="text-muted f-w-400">
                        {setIfNotDefined(user.name)}
                      </h6>
                    </div>
                    <div className="col-sm-6">
                      <p className="info-header">Surname</p>
                      <h6 className="text-muted f-w-400">
                        {setIfNotDefined(user.surname)}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="info-header">Screen Name</p>
                      <h6 className="text-muted f-w-400">
                        {setIfNotDefined(user.screenName)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
