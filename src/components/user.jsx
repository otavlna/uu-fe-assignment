export default function User({ user, canDelete, handleDelete }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ marginRight: "auto" }}>
        {user.role} {user.username}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {canDelete ? <button onClick={handleDelete}>Delete</button> : <></>}
      </div>
    </div>
  );
}
