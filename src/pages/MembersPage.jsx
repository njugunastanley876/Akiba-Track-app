import MemberCard from "../components/MemberCard.jsx";

export default function MembersPage({ members, togglePayout, deleteMember }) {
  return (
    <div>
      <h2 className="mb-4 fw-bold">Chama Members & Payouts</h2>
      <div className="row">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            togglePayout={togglePayout}
            deleteMember={deleteMember}
          />
        ))}
      </div>
    </div>
  );
}
