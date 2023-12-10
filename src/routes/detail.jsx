import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import Item from "../components/item";
import User from "../components/user";
import { API_URL } from "./root";

export async function loader({ params }) {
  const [list, me] = await Promise.all([
    fetch(`${API_URL}/lists/${params.listId}`),
    fetch(`${API_URL}/me`),
  ]);
  return { list: await list.json(), me: await me.json() };
}

export default function DetailPage() {
  const { list, me } = useLoaderData();
  const revalidator = useRevalidator();
  const isOwner =
    list.users.find((user) => user.id === me.id)?.role === "owner";

  const [newItem, setNewItem] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newUsername, setNewUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setList = async (list) => {
    setLoading(true);
    const res = await fetch(`${API_URL}/lists/${list.id}`, {
      method: "PATCH",
      body: JSON.stringify(list),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status.toString()[0] === "2") {
      revalidator.revalidate();
      setLoading(false);
      setError("");
    } else {
      setError("Failed to update list, please try again");
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1>{list.name}</h1>
        {isOwner ? (
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setIsEditingName(!isEditingName)}
              disabled={loading}
            >
              {isEditingName ? "Confirm" : "Edit"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {isOwner && isEditingName ? (
        <input
          type="text"
          value={list.name}
          onChange={(event) => setList({ ...list, name: event.target.value })}
          disabled={loading}
        />
      ) : (
        <></>
      )}
      <select
        name="filter"
        id="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="unsolved">Unsolved</option>
        <option value="solved">Solved</option>
      </select>
      <div>
        {list.items
          .filter((item) => {
            switch (filter) {
              case "all":
                return true;
              case "solved":
                return item.solvedAt !== null;
              case "unsolved":
                return item.solvedAt === null;
            }
          })
          .map((item) => (
            <Item
              key={item.id}
              item={item}
              isOwner={isOwner}
              loading={loading}
              handleSolve={() =>
                setList({
                  ...list,
                  items: [
                    ...list.items.filter((i) => i.id !== item.id),
                    {
                      ...item,
                      solvedAt: item.solvedAt === null ? new Date() : null,
                    },
                  ].sort((a, b) => a.id > b.id),
                })
              }
              handleDelete={() =>
                setList({
                  ...list,
                  items: list.items
                    .filter((i) => i.id !== item.id)
                    .sort((a, b) => a.id > b.id),
                })
              }
            />
          ))}
      </div>
      <input
        type="text"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
        disabled={loading}
      />
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setList({
            ...list,
            items: list.items
              .concat({
                id: (list.items[list.items.length - 1]?.id ?? 0) + 1,
                description: newItem,
                createdAt: new Date(),
                solvedAt: null,
              })
              .sort((a, b) => a.id > b.id),
          });
          setNewItem("");
        }}
        disabled={loading}
      >
        Add item
      </button>
      <h3>Users</h3>
      <ul>
        {list.users.map((user) => (
          <li key={user.id}>
            <User
              user={user}
              canDelete={isOwner || user.id === me.id}
              loading={loading}
              handleDelete={() =>
                setList({
                  ...list,
                  users: list.users
                    .filter((u) => u.id !== user.id)
                    .sort((a, b) => a.id > b.id),
                })
              }
            />
          </li>
        ))}
      </ul>
      {isOwner ? (
        <>
          <input
            type="text"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            disabled={loading}
          />
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setList({
                ...list,
                users: list.users
                  .concat({
                    id: (list.users[list.users.length - 1]?.id ?? 0) + 1,
                    username: newUsername,
                    role: "user",
                  })
                  .sort((a, b) => a.id > b.id),
              });
              setNewUsername("");
            }}
            disabled={loading}
          >
            Add user
          </button>
        </>
      ) : (
        <></>
      )}
      <p>{error}</p>
    </main>
  );
}
