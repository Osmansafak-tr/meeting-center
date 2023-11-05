import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
  const { isAuthenticated } = useAuth();
  let message = "";
  if (isAuthenticated) message = "User authenticated";
  else message = "User is not authenticated";
  return (
    <div>
      <h2>This Is Home Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Home;
