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
  lang,
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
        className="tile dark:bg-slate-600 dark:text-white"
      >
        <div>
          <h3
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: 18,
            }}
            className="dark:text-white mt-3 mb-5"
          >
            {name}
          </h3>
          <div style={{ display: "flex" }}>
            <p style={{ fontSize: 16 }} className="dark:text-white">
              {items.length} {lang === "en" ? "items" : "veci"}
            </p>
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
                      className="dark:bg-slate-400 p-1 mr-2 bg-neutral-200"
                      onClick={(e) => {
                        e.preventDefault();
                        clearAllModals();
                        setArchiveShow(true);
                      }}
                    >
                      {lang === "en" ? "Archive" : "Archivovat"}
                    </button>
                  ) : (
                    <></>
                  )}
                  <button
                    className="dark:bg-slate-400 p-1 bg-neutral-200"
                    onClick={(e) => {
                      e.preventDefault();
                      clearAllModals();
                      setDeleteShow(true);
                    }}
                  >
                    {lang === "en" ? "Delete" : "Odstranit"}
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
        <p style={{ fontSize: "20px" }}>
          {lang === "en" ? "Delete list" : "Odstranit seznam"} {name}?
        </p>
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
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
              type="button"
              onClick={() => {
                setDeleteShow(false);
              }}
            >
              {lang === "en" ? "Cancel" : "Zrusit"}
            </button>
            <button
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
              type="submit"
              style={{ marginLeft: "5px" }}
            >
              {lang === "en" ? "Delete" : "Odstranit"}
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
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
              type="button"
              onClick={() => {
                setArchiveShow(false);
              }}
            >
              {lang === "en" ? "Cancel" : "Zrusit"}
            </button>
            <button
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
              type="submit"
              style={{ marginLeft: "5px" }}
            >
              {lang === "en" ? "Archive" : "Archivovat"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
