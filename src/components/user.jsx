export default function User({ user, isOwner, handleDelete }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ marginRight: "auto" }}>
        {user.role} {user.username}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isOwner ? <button onClick={handleDelete}>Delete</button> : <></>}
      </div>
    </div>
  );
}
