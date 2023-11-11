import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <h2>This Is Home Page</h2>
      {isAuthenticated ? <LogoutButton /> : null}
    </div>
  );
};

export default Home;
