export default function Badge({ ReceivedPayout }) {
    return (
        <span className={
            ReceivedPayout ? "badge bg-success" : "badge bg-warning text-dark"
        }
        >
            {ReceivedPayout ? "Payout Received" : "Pending Payout"}
        </span>
    );
}