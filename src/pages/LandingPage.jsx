import { Link } from "react-router";
import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext.jsx";
import chamaBg from "../assets/Chama.png";
import aboutBg from "../assets/coin.jpg";

export default function LandingPage() {
  const { groupName, targetContribution } = useContext(GroupContext);

  return (
    <>
      <div
        className="p-5 m-0 text-center text-white d-flex align-items-center"
        style={{
          width: "100%",
          minHeight: "calc(100vh - 56px)",
          backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.72), rgba(10, 37, 64, 0.72)), url(${chamaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid py-4">
          <h1 className="display-4 fw-bold">{groupName}</h1>
          <p className="col-md-8 fs-5 mx-auto mt-3">
            Track member contributions, payment dates, and rotating payouts in
            one dashboard
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/contribute" className="btn btn-primary btn-lg">
              Add Member
            </Link>
          </div>
        </div>
      </div>

      <section
        className="py-5 px-4 px-md-5 mt-4 text-white d-flex align-items-center border-top border-primary boarder-3"
        style={{
          width: "100%",
          minHeight: "65vh",
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url(${aboutBg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-start">
              <span className="badge bg-primary mb-2 px-3 py-2">About Us</span>
              <h2 className="display-6 fw-bold mb-3">
                Built for Trust, Clarity &amp; Every Chama Cycle
              </h2>
              <p className="fs-6 text-light mb-3">
                <strong>{groupName}</strong> helps members stay on the same page
                with clear records of contributions, payment dates, and
                scheduled payouts replacing scattered notes with one reliable
                place
              </p>
              <p className="fs-6 text-white-50 mb-4">
                With a group contribution target of{" "}
                <strong className="text-white">
                  KES {targetContribution?.toLocaleString()}
                </strong>
                , everyone can see progress at a glance and keep the group
                moving forward smoothly
              </p>
              <Link to="/members" className="btn btn-primary">
                <i className="bi bi-arrow-right-circle me-2"></i>
                See Group Members
              </Link>
            </div>

            <div className="col-lg-5">
              <div className="row g-3 text-start">
                <div className="col-12">
                  <div
                    className="p-3 rounded-3 border border-light border-opacity-25"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  >
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-wallet2 text-info me-2"></i>
                      Contribution Tracking
                    </h6>
                    <p className="small text-white-50 mb-0">
                      Log member payments quickly and keep every balance up to
                      date
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div
                    className="p-3 rounded-3 border border-light border-opacity-25"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  >
                    <h6 className="fw-bold mb-1">
                      <i className="bi bi-calendar-check text-info me-2"></i>
                      Rotating Payouts
                    </h6>
                    <p className="small text-white-50 mb-0">
                      Track payout schedules and dates with full transparency for
                       members
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}