import { useParams, Link } from "react-router";
import Badge from "../components/Badge.jsx";

export default function MemberDetailsPage({ members }) {
  //react hooks
  const { id } = useParams();
  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="text-center py-5">
        <h3>Member not found!</h3>
        <Link to="/members" className="btn btn-primary mt-3">
          Back to Members
        </Link>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
      <div className="card-body p-4">
        <h2 className="card-title fw-bold mb-3">{member.name}</h2>
        <hr />
        <p className="fs-5">
          <strong>Phone:</strong> {member.phone}
        </p>
        <p className="fs-5">
          <strong>Contribution:</strong> KES {Number(member.contribution).toLocaleString()}
        </p>
        <p className="fs-5">
          <strong>Payment Date:</strong> {member.paymentDate}
        </p>
        <p className="fs-5">
          <strong>Has Paid:</strong> {member.hasPaid ? "Yes" : "No"}
        </p>
        <div className="mb-4">
          <strong>Payout Status: </strong>
          <Badge ReceivedPayout={member.ReceivedPayout} />
        </div>
        <Link to="/members" className="btn btn-outline-dark">
          &larr; Back to Members
        </Link>
      </div>
    </div>
  );
}