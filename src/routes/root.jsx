import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ListTile from "../components/list-tile";
import Modal from "../components/modal";
import { listsMock, meMock } from "../data";
import { listFactory } from "../utils/listFactory";

export async function loader() {
  const lists = listsMock;
  const me = meMock;
  return { lists, me };
}

export default function Root({ lang }) {
  console.log("lang", lang);
  const { lists, me } = useLoaderData();
  const revalidator = useRevalidator();

  const [filter, setFilter] = useState("active");

  const [addShow, setAddShow] = useState(false);
  const [addInput, setAddInput] = useState("");

  return (
    <main style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <h1 className="dark:text-white">
        {lang === "en" ? "My shopping lists" : "Moje nakupni seznamy"}
      </h1>
      <span className="dark:text-white">
        {lang === "en" ? "Filter lists:" : "Filtrovat seznamy"}
      </span>
      <select
        name="filter"
        id="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        style={{ marginLeft: "5px" }}
        className="dark:bg-slate-600 dark:text-white "
      >
        <option value="all">{lang === "en" ? "All" : "Vsechno"}</option>
        <option value="archived">
          {lang === "en" ? "Archived" : "Archivovane"}
        </option>
        <option value="active">{lang === "en" ? "Active" : "Aktivni"}</option>
      </select>
      <div className="tiles" style={{ marginTop: "10px" }}>
        {lists
          .filter((list) => {
            switch (filter) {
              case "all":
                return true;
              case "archived":
                return list.isArchived === true;
              case "active":
                return list.isArchived === false;
            }
          })
          .map((list, i) => (
            <ListTile
              key={list.id}
              revalidator={revalidator}
              me={me}
              name={list.name}
              id={list.id}
              items={list.items}
              users={list.users}
              isArchived={list.isArchived}
              lang={lang}
            />
          ))}
        <div
          className="tile dark:bg-slate-600"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={() => setAddShow(true)}
        >
          <p
            style={{ margin: "auto", fontWeight: "bold" }}
            className="dark:text-white"
          >
            {lang === "en" ? "+ Add new list" : "+ Pridat novy seznam"}
          </p>
        </div>
      </div>
      <Modal show={addShow} setShow={setAddShow}>
        <p style={{ fontSize: "20px" }}>
          {lang === "en" ? "Add new list" : "Pridat novy seznam"}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            listsMock.push(listFactory(addInput, me.username, me.id));
            setAddInput("");
            setAddShow(false);
          }}
        >
          <input
            type="text"
            value={addInput}
            placeholder="My new list name"
            style={{ padding: "5px 5px" }}
            onChange={(e) => setAddInput(e.target.value)}
            className="dark:text-black border-2"
          />
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setAddShow(false);
                setAddInput("");
              }}
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
            >
              {lang === "en" ? "Cancel" : "Zrusit"}
            </button>
            <button
              className="dark:bg-slate-400 p-1 bg-neutral-200 dark:text-black"
              type="submit"
              style={{ marginLeft: "5px" }}
            >
              {lang === "en" ? "Add" : "Cancel"}
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
