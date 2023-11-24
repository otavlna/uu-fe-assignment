import { listsMock } from "../data";

export function listFactory(name, owner, ownerId) {
  return {
    id: listsMock[listsMock.length - 1].id + 1,
    name,
    isArchived: false,
    users: [{ id: ownerId, role: "owner", username: owner }],
    items: [],
  };
}
