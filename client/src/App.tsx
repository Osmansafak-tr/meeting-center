import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/error/PageNotFound";
import Login from "./pages/account/Login";
import { useAuth } from "./hooks/AuthProvider";
import Register from "./pages/account/Register";
import RequireAuth from "./components/RequireAuth";
import MeetingApp from "./pages/meeting/MeetingApp";
import JoinMeeting from "./pages/meeting/JoinMeeting";
import MyMeetings from "./pages/meeting/MyMeetings";
import MyMeetingDetail from "./pages/meeting/MyMeetingDetail";

function App() {
  const { verifyAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      await verifyAuth();
      setLoading(false);
    };
    checkAuthentication();
  }, [verifyAuth]);

  if (loading) return <p>Loading</p>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account">
          <Route index element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>

        <Route path="/meeting" element={<MeetingApp />}></Route>
        <Route path="/meeting/join" element={<JoinMeeting />}></Route>

        <Route element={<RequireAuth />}>
          <Route path="/myMeetings" element={<MyMeetings />}></Route>
          <Route path="/myMeetings/:id" element={<MyMeetingDetail />}></Route>
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
