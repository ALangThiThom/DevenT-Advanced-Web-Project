 export const Badge = ({ label, color = "green" }) => (
  <span className={`badge badge-${color}`}>{label}</span>
);
