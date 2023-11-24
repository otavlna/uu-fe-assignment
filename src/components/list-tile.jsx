import { useState } from "react";
import { Link } from "react-router-dom";
import { listsMock } from "../data";
import Modal from "./modal";

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
  const [archiveShow, setArchiveShow] = useState(false);

  console.log(me, name, items, id, users);

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
          onSubmit={(e) => {
            e.preventDefault();
            const i = listsMock.findIndex((list) => list.id === id);
            listsMock.splice(i, 1);
            revalidator.revalidate();
            setDeleteShow(false);
          }}
        >
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setDeleteShow(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" style={{ marginLeft: "5px" }}>
              Delete
            </button>
          </div>
        </form>
      </Modal>
      <Modal show={archiveShow} setShow={setArchiveShow}>
        <p style={{ fontSize: "20px" }}>Archive list {name}?</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            listsMock[listsMock.findIndex((l) => l.id === id)] = {
              ...listsMock[listsMock.findIndex((l) => l.id === id)],
              isArchived: true,
            };
            revalidator.revalidate();
            setArchiveShow(false);
          }}
        >
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setArchiveShow(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" style={{ marginLeft: "5px" }}>
              Archive
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
