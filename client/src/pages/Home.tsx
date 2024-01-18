import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/AuthProvider";
import meetingImage from "../assets/images/meeting.jpg";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <!-- Header--> */}
      <header>
        <div className="container-fluid px-lg-5">
          <div className="p-4 p-lg-5 bg-light rounded-3 text-center">
            <div className="m-4 m-lg-1">
              <div className="row">
                <div className="col">
                  <h1 className="display-5 fw-bold">
                    Welcome To MeetingCenter
                  </h1>
                  <p className="fs-4">
                    MeetingCenter is a web video conference app for everyone.
                    With MeetingCenter, you can meet with your friends and enjoy
                    pleasant moments without worrying about distance. At the
                    same time, you can use it for business meetings, education,
                    and similar areas to advance in your professional life.
                  </p>
                  <div className="mt-5">
                    <p className="fs-5">
                      New to Meeting App?{" "}
                      <a href="/account/register">Join us now</a>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <img src={meetingImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-lg-5">
        <div className="container-fluid px-lg-5">
          <div className="d-grid d-sm-flex gap-5 justify-content-center">
            <div className="p-4 p-lg-5 bg-light rounded-3 text-center col-6">
              <div className="m-4 m-lg-1">
                <div>
                  <h1 className="display-6 fw-bold">Join Your Friends</h1>
                  <p className="fs-4">
                    If your friends already created a meeting , let us help you
                    join them. All you need is meetingId and meeting password.
                    Or you can copy paste meeting url if you wish.
                  </p>
                  <div className="mt-5">
                    <a className="btn btn-info btn-lg" href="meeting/join">
                      Join Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 p-lg-5 bg-light rounded-3 text-center col-6">
              <div className="m-4 m-lg-1">
                <div>
                  <h1 className="display-6 fw-bold">Create Meetings</h1>
                  <p className="fs-4">
                    If you have already signed up, you can create as many
                    meetings as you want. Let us help you create your first
                    meeting.
                  </p>
                  <div className="mt-5">
                    <a className="btn btn-dark btn-lg" href="/myMeetings/new">
                      Create Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
