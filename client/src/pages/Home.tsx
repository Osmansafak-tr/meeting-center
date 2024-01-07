import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h2>This Is Home Page</h2>
    </div>
  );
};

export default Home;
