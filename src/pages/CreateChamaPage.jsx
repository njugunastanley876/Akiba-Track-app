import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function CreateChamaPage() {
  const [chamas, setChamas] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: 10,
    contributionAmount: "",
    dueDate: "",
    withdrawalRule: "Two-thirds approval",
  });
  const [createdChama, setCreatedChama] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/chamas")
      .then((res) => res.json())
      .then((data) => setChamas(data));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "maxMembers" || name === "contributionAmount"
          ? Number(value)
          : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/chamas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((savedChama) => {
        setChamas([...chamas, savedChama]);
        setCreatedChama(savedChama);
        setCopied(false);
        setFormData({
          name: "",
          description: "",
          maxMembers: 10,
          contributionAmount: "",
          dueDate: "",
          withdrawalRule: "Two-thirds approval",
        });
      });
  }

  const inviteLink = createdChama
    ? `${window.location.origin}/chamas/${createdChama.id}/join`
    : "";

  function handleCopyLink() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <span className="badge bg-primary mb-2 align-self-start">
              Step 1 & 2: Group Setup & Rules
            </span>
            <h2 className="fw-bold mb-1">Create a Chama</h2>
            <p className="text-muted small mb-4">
              Set clear group rules from day one so every member knows what to expect.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Chama Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="e.g., Umoja Savers Chama"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Short Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="What is this group saving toward?"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Max People (Up to 30)
                  </label>
                  <input
                    type="number"
                    name="maxMembers"
                    min="2"
                    max="30"
                    className="form-control"
                    value={formData.maxMembers}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Contribution Amount (KES)
                  </label>
                  <input
                    type="number"
                    name="contributionAmount"
                    min="100"
                    className="form-control"
                    placeholder="5000"
                    value={formData.contributionAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Contribution Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    className="form-control"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    Payout Approval Rule
                  </label>
                  <select
                    name="withdrawalRule"
                    className="form-select"
                    value={formData.withdrawalRule}
                    onChange={handleChange}
                  >
                    <option value="Everyone approves">Everyone approves</option>
                    <option value="Two-thirds approval">Two-thirds approval</option>
                    <option value="More than half">More than half</option>
                    <option value="Admins decide">Admins decide</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Create Chama & Generate Link
              </button>
            </form>

            {createdChama && (
              <div className="alert alert-success mt-4 mb-0">
                <div className="fw-bold mb-1">
                  {createdChama.name} is live! Share this join link:
                </div>
                <div className="input-group input-group-sm my-2">
                  <input
                    type="text"
                    className="form-control"
                    value={inviteLink}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={handleCopyLink}
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
                <Link
                  to={`/chamas/${createdChama.id}/join`}
                  className="btn btn-sm btn-success mt-1"
                >
                  Open Join Link
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <h4 className="fw-bold mb-3">Active Chamas ({chamas.length})</h4>
          {chamas.map((chama) => (
            <div key={chama.id} className="card shadow-sm border-0 p-3 mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold mb-1">{chama.name}</h5>
                  <p className="text-muted small mb-2">{chama.description}</p>
                </div>
                <span className="badge bg-light text-dark border">
                  Max {chama.maxMembers} seats
                </span>
              </div>

              <div className="small text-secondary mb-3">
                <span className="me-3">
                  <strong>Contribution:</strong> KES{" "}
                  {Number(chama.contributionAmount).toLocaleString()}
                </span>
                <span className="me-3">
                  <strong>Due:</strong> {chama.dueDate}
                </span>
                <span>
                  <strong>Rule:</strong> {chama.withdrawalRule}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded">
                <code className="small text-truncate me-2">
                  {window.location.origin}/chamas/{chama.id}/join
                </code>
                <Link
                  to={`/chamas/${chama.id}/join`}
                  className="btn btn-sm btn-outline-primary flex-shrink-0"
                >
                  Join Page
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}