import { Link } from "react-router";

export default function Footer({ year = 2026, country = "Kenya" }) {
  return (
    <footer className="text-white pt-5 pb-4 mt-4 border-top border-primary border-3" style={{ backgroundColor: "#141824" }}>
      <div className="container">
        <div className="row gy-4 justify-content-between">
          {/* Quick Links (About Us & Navigation) */}
          <div className="col-sm-6 col-md-3">
            <h6 className="fw-semibold mb-2">About Us</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1">
                <Link to="/" className="text-white-50 text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/members" className="text-white-50 text-decoration-none">
                  Members &amp; Payouts
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/contribute" className="text-white-50 text-decoration-none">
                  Add Contribution
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="col-sm-6 col-md-4">
            <h6 className="fw-semibold mb-2">Contacts</h6>
            <ul className="list-unstyled small text-white-50 mb-0">
              <li className="mb-1">
                <i className="bi bi-envelope me-2 text-white"></i>
                support@akibatrack.co.ke
              </li>
              <li className="mb-1">
                <i className="bi bi-telephone me-2 text-white"></i>
                +254 700 000 000
              </li>
              <li>
                <i className="bi bi-geo-alt me-2 text-white"></i>
                Nairobi &amp; Nakuru, {country}
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-white-50 gap-2">
          <div>
            <i className="bi bi-c-circle me-1"></i>
            {year} Akiba Track. All rights reserved.
          </div>
          <div>
            Made in <strong className="text-white">{country}</strong>{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}