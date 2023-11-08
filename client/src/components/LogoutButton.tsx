import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { backendReqHandler } from "../services/reqHandler";
import cookieHandler from "../services/cookieHandler";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const onClick = async () => {
    if (!isAuthenticated) navigate("/"); // User is not authenticated

    const accessToken = cookieHandler.getAuthCookie();
    const url = "/account/logout";
    const headers = {
      "x-api-key": `${import.meta.env.VITE_BACKEND_SHARED_SECRET_KEY}`,
      Authorization: `Bearer ${accessToken}`,
    };
    try {
      await backendReqHandler.post(url, {}, headers);
      cookieHandler.removeAuthCookie();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={onClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
