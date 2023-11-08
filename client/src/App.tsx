import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/error/PageNotFound";
import Login from "./pages/account/Login";
import { AuthProvider, useAuth } from "./hooks/AuthProvider";
import Register from "./pages/account/Register";

function App() {
  const { verifyAuth } = useAuth();
  verifyAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account">
          <Route index element={<Login />}></Route>
          <Route path="/account/register" element={<Register />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
