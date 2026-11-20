import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

export default function JoinChamaPage({ members, addMember }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chama, setChama] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [agreedToRules, setAgreedToRules] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/chamas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Chama not found");
        return res.json();
      })
      .then((data) => {
        setChama(data);
        setLoading(false);
      })
      .catch(() => {
        setChama(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Loading Chama details...</p>
      </div>
    );
  }

  if (!chama) {
    return (
      <div className="container py-5 text-center">
        <h3>Chama not found</h3>
        <p className="text-muted">This invite link may be invalid or removed.</p>
        <Link to="/create-chama" className="btn btn-primary">
          View or Create a Chama
        </Link>
      </div>
    );
  }

  const currentMembers = members.filter((m) => m.chamaId === chama.id);
  const isFull = currentMembers.length >= chama.maxMembers;

  function handleJoin(e) {
    e.preventDefault();
    if (isFull) return;

    const newMember = {
      name,
      phone,
      contribution: Number(chama.contributionAmount),
      hasPaid: true,
      paymentDate: paymentDate || chama.dueDate,
      ReceivedPayout: false,
      chamaId: chama.id,
      chamaName: chama.name,
    };

    addMember(newMember);
    navigate("/members");
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <span className="badge bg-success mb-2 align-self-start">
              You're Invited to Join a Chama
            </span>
            <h2 className="fw-bold mb-1">{chama.name}</h2>
            <p className="text-muted mb-3">{chama.description}</p>

            <div className="bg-light rounded p-3 mb-4 border">
              <h6 className="fw-bold mb-2">Core Group Rules</h6>
              <ul className="list-unstyled small mb-0">
                <li className="mb-1">
                  <strong>Seats Filled:</strong> {currentMembers.length} /{" "}
                  {chama.maxMembers} members
                </li>
                <li className="mb-1">
                  <strong>Contribution Amount:</strong> KES{" "}
                  {Number(chama.contributionAmount).toLocaleString()}
                </li>
                <li className="mb-1">
                  <strong>Due Date:</strong> {chama.dueDate}
                </li>
                <li>
                  <strong>Payout Approval:</strong> {chama.withdrawalRule}
                </li>
              </ul>
            </div>

            {isFull ? (
              <div className="alert alert-warning mb-0">
                This Chama has reached its maximum limit of {chama.maxMembers}{" "}
                members.
              </div>
            ) : (
              <form onSubmit={handleJoin}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Grace Njeri"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="e.g., 0712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    First Contribution Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agreeRules"
                    checked={agreedToRules}
                    onChange={(e) => setAgreedToRules(e.target.checked)}
                    required
                  />
                  <label className="form-check-label small" htmlFor="agreeRules">
                    I agree to the group rules and the KES{" "}
                    {Number(chama.contributionAmount).toLocaleString()} contribution
                    schedule.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  Agree & Join {chama.name}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}