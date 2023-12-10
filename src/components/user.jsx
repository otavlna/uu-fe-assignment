export default function User({ user, canDelete, handleDelete, loading }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ marginRight: "auto" }}>
        {user.role} {user.username}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {canDelete ? (
          <button onClick={handleDelete} disabled={loading}>
            Delete
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
