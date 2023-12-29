export default function Item({ item, isOwner, handleSolve, handleDelete ,lang}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}
    >
      <p style={{ marginRight: "auto" }}>{item.description}</p>
      <input
        type="checkbox"
        defaultChecked={item.solvedAt !== null}
        value={item.solvedAt !== null}
        onChange={handleSolve}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {isOwner ? (
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
