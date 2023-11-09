import { useAuth } from "../hooks/AuthProvider";

const LogoutButton = () => {
  const { logout, verifyAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      await verifyAuth().then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = async () => {
    await handleLogout();
  };

  return (
    <button className="btn btn-danger" onClick={onClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
