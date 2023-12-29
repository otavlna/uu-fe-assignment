export default function User({ user, canDelete, handleDelete, lang }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
    >
      <p style={{ marginRight: "auto" }}>
        {user.role} {user.username}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {canDelete ? (
          <button
            className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
            onClick={handleDelete}
          >
            {lang === "en" ? "Delete" : "Odstranit"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
