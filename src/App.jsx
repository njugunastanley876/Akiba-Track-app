import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import MembersPage from "./pages/MembersPage.jsx";
import MemberDetailsPage from "./pages/MembersDetailsPage.jsx";
import ContributePage from "./pages/ContributePage.jsx";
import CreateChamaPage from "./pages/CreateChamaPage.jsx";
import JoinChamaPage from "./pages/JoinChamaPage.jsx";

export default function App() {
  const [members, setMembers] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    fetch("http://localhost:3000/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  function addMember(newMember) {
    fetch("http://localhost:3000/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((savedMember) => {
        setMembers([...members, savedMember]);
      });
  }

  function togglePayout(member) {
    fetch(`http://localhost:3000/members/${member.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ReceivedPayout: !member.ReceivedPayout,
      }),
    })
      .then((res) => res.json())
      .then((updatedMember) => {
        const updatedList = members.map((item) =>
          item.id === updatedMember.id ? updatedMember : item
        );
        setMembers(updatedList);
      });
  }

  function deleteMember(id) {
    fetch(`http://localhost:3000/members/${id}`, {
      method: "DELETE",
    }).then(() => {
      const remainingMembers = members.filter((member) => member.id !== id);
      setMembers(remainingMembers);
    });
  }

  return (
    <>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/members"
            element={
              <MembersPage
                members={members}
                togglePayout={togglePayout}
                deleteMember={deleteMember}
              />
            }
          />
          <Route
            path="/members/:id"
            element={<MemberDetailsPage members={members} />}
          />
          <Route
            path="/contribute"
            element={<ContributePage addMember={addMember} />}
          />
          <Route path="/create-chama" element={<CreateChamaPage />} />
          <Route
          path="/chamas/:id/join"
          element={<JoinChamaPage members={members} addMember={addMember} />}
          />
        </Routes>
      </main>
      <Footer year={year} country={ "Kenya"} />
    </>
  );
}
