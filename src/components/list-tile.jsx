import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";
import { API_URL } from "../routes/root";

export default function ListTile({
  revalidator,
  me,
  name,
  items,
  id,
  users,
  isArchived,
}) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [archiveShow, setArchiveShow] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [archiveError, setArchiveError] = useState("");

  const clearAllModals = () => {
    setDeleteShow(false);
    setArchiveShow(false);
  };

  return (
    <>
      <Link
        to={`detail/${id}`}
        style={{ textDecoration: "none", minWidth: "0px" }}
        className="tile"
      >
        <div>
          <h3
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </h3>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 16 }}>{items.length} items</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "auto",
              }}
            >
              {users.find(
                (user) => user.id === me.id && user.role === "owner"
              ) ? (
                <div>
                  {!isArchived ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        clearAllModals();
                        setArchiveShow(true);
                      }}
                    >
                      Archive
                    </button>
                  ) : (
                    <></>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      clearAllModals();
                      setDeleteShow(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Link>
      <Modal show={deleteShow} setShow={setDeleteShow}>
        <p style={{ fontSize: "20px" }}>Delete list {name}?</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setDeleteLoading(true);
            const res = await fetch(`${API_URL}/lists/${id}`, {
              method: "DELETE",
            });
            if (res.status.toString()[0] === "2") {
              revalidator.revalidate();
              setDeleteShow(false);
              setDeleteLoading(false);
              setDeleteError("");
            } else {
              setDeleteError("Failed to delete list, please try again");
              setDeleteLoading(false);
            }
          }}
        >
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setDeleteShow(false);
                setDeleteError("");
              }}
              disabled={deleteLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ marginLeft: "5px" }}
              disabled={deleteLoading}
            >
              Delete
            </button>
          </div>
        </form>
        <p>{deleteError}</p>
      </Modal>
      <Modal show={archiveShow} setShow={setArchiveShow}>
        <p style={{ fontSize: "20px" }}>Archive list {name}?</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setArchiveLoading(true);
            const res = await fetch(`${API_URL}/lists/${id}/archive`, {
              method: "POST",
            });
            if (res.status.toString()[0] === "2") {
              revalidator.revalidate();
              setArchiveShow(false);
              setArchiveLoading(false);
              setArchiveError("");
            } else {
              setArchiveError("Failed to archive list, please try again");
              setArchiveLoading(false);
            }
          }}
        >
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setArchiveShow(false);
                setArchiveError("");
              }}
              disabled={archiveLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ marginLeft: "5px" }}
              disabled={archiveLoading}
            >
              Archive
            </button>
          </div>
        </form>
        <p>{archiveError}</p>
      </Modal>
    </>
  );
}
