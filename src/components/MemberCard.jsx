import { Link } from "react-router";
import Badge from "./Badge.jsx";

export default function MemberCard({ member, togglePayout, deleteMember }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title mb-0">{member.name}</h5>
            <Badge ReceivedPayout={member.ReceivedPayout} />
          </div>
          <p className="text-muted small mb-2">{member.phone}</p>
          <p className="card-text fw-bold">
            Contribution: KES {Number(member.contribution).toLocaleString()}
          </p>
          <p className="small text-muted">Date: {member.paymentDate}</p>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between">
          <Link to={`/members/${member.id}`} className="btn btn-sm btn-outline-primary">
            Details
          </Link>
          <div>
            <button
              onClick={() => togglePayout(member)}
              className="btn btn-sm btn-outline-success me-2"
            >
              Toggle Payout
            </button>
            <button
              onClick={() => deleteMember(member.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}