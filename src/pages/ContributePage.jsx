import { useState } from "react";
import { useNavigate } from "react-router";

export default function ContributePage({ addMember }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contribution, setContribution] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newMember = {
      name,
      phone,
      contribution: Number(contribution) || 0,
      hasPaid: true,
      paymentDate: paymentDate || "11-18-2026",
      ReceivedPayout: false,
    };

    addMember(newMember);
    navigate("/members");
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm p-4">
          <h3 className="mb-4 fw-bold">Register New Member</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contribution Amount (KES)</label>
              <input
                type="number"
                className="form-control"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Payment Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM-DD-YYYY"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Member
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}