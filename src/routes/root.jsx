import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import ListTile from "../components/list-tile";
import Modal from "../components/modal";

export const API_URL = "http://localhost:3001";

export async function loader() {
  const [lists, me] = await Promise.all([
    fetch(`${API_URL}/lists`),
    fetch(`${API_URL}/me`),
  ]);
  return { lists: await lists.json(), me: await me.json() };
}

export default function Root() {
  const { lists, me } = useLoaderData();
  const revalidator = useRevalidator();

  const [filter, setFilter] = useState("active");

  const [addShow, setAddShow] = useState(false);
  const [addInput, setAddInput] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  return (
    <main style={{ maxWidth: "1000px", margin: "auto" }}>
      <h1>My shopping lists</h1>
      Filter lists:
      <select
        name="filter"
        id="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        style={{ marginLeft: "5px" }}
      >
        <option value="all">All</option>
        <option value="archived">Archived</option>
        <option value="active">Active</option>
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
            />
          ))}
        <div
          className="tile"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={() => setAddShow(true)}
        >
          <p style={{ margin: "auto", fontWeight: "bold" }}>+ Add new list</p>
        </div>
      </div>
      <Modal show={addShow} setShow={setAddShow}>
        <p style={{ fontSize: "20px" }}>Add new list</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setAddLoading(true);
            const res = await fetch(`${API_URL}/lists`, {
              method: "POST",
              body: JSON.stringify({ name: addInput }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.status.toString()[0] === "2") {
              revalidator.revalidate();
              setAddInput("");
              setAddShow(false);
              setAddLoading(false);
              setAddError("");
            } else {
              setAddError("Failed to create new list, please try again");
              setAddLoading(false);
            }
          }}
        >
          <input
            type="text"
            value={addInput}
            placeholder="My new list name"
            style={{ padding: "5px 5px" }}
            onChange={(e) => setAddInput(e.target.value)}
            disabled={addLoading}
          />
          <div style={{ display: "flex", marginTop: "15px" }}>
            <button
              type="button"
              onClick={() => {
                setAddShow(false);
                setAddInput("");
                setAddError("");
              }}
              disabled={addLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ marginLeft: "5px" }}
              disabled={addLoading}
            >
              Add
            </button>
          </div>
        </form>
        <p>{addError}</p>
      </Modal>
    </main>
  );
}
