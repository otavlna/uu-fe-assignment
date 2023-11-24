import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import Item from "../components/item";
import User from "../components/user";
import { listsMock, meMock } from "../data";

export async function loader({ params }) {
  const list = listsMock.find((list) => list.id === parseInt(params.listId));
  const me = meMock;
  return { list, me };
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

  const setList = (list) => {
    listsMock[listsMock.findIndex((l) => l.id === list.id)] = list;
    revalidator.revalidate();
  };

  return (
    <main style={{ maxWidth: "600px", margin: "auto" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h1>{list.name}</h1>
        {me.role === "owner" ? (
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <button onClick={() => setIsEditingName(!isEditingName)}>
              {isEditingName ? "Confirm" : "Edit"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {me.role === "owner" && isEditingName ? (
        <input
          type="text"
          value={list.name}
          onChange={(event) => setList({ ...list, name: event.target.value })}
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
      {me.role === "owner" ? (
        <>
          <input
            type="text"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
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
          >
            Add user
          </button>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
