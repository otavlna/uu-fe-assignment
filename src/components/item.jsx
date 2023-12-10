export default function Item({
  item,
  isOwner,
  handleSolve,
  handleDelete,
  loading,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ marginRight: "auto" }}>{item.description}</p>
      <input
        type="checkbox"
        defaultChecked={item.solvedAt !== null}
        value={item.solvedAt !== null}
        onChange={handleSolve}
        disabled={loading}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        {isOwner ? <button onClick={handleDelete}>Delete</button> : <></>}
      </div>
    </div>
  );
}
