import { Link } from "react-router";
import { useContext } from "react";
import { GroupContext } from "../contexts/GroupContext.jsx";

export default function NavBar() {
  const { groupName } = useContext(GroupContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          {groupName}
        </Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/members">
            Members
          </Link>
          <Link className="nav-link" to="/contribute">
            Add Member
          </Link>
          <Link className="nav-link" to="/create-chama">
            create chama
          </Link>
        </div>
      </div>
    </nav>
  );
}