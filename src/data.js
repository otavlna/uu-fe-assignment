export const listsMock = [
  {
    id: 1,
    name: "Muj nakupni seznam",
    isArchived: false,
    users: [
      { id: 1, role: "owner", username: "otavlna" },
      { id: 2, role: "user", username: "uzivatel1" },
      { id: 3, role: "user", username: "uzivatel2" },
    ],
    items: [
      {
        id: 1,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 2,
        description: "Fixnout auto",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 3,
        description: "Odstraneny ukol",
        createdAt: new Date(),
        solvedAt: null,
      },
    ],
  },
  {
    id: 2,
    name: "Muj nakupni seznam",
    isArchived: false,
    users: [
      { id: 1, role: "owner", username: "otavlna" },
      { id: 2, role: "user", username: "uzivatel1" },
      { id: 3, role: "user", username: "uzivatel2" },
    ],
    items: [
      {
        id: 1,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 2,
        description: "Fixnout auto",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 3,
        description: "Odstraneny ukol",
        createdAt: new Date(),
        solvedAt: null,
      },
    ],
  },
  {
    id: 3,
    name: "Muj nakupni seznam",
    isArchived: false,
    users: [
      { id: 1, role: "owner", username: "otavlna" },
      { id: 2, role: "user", username: "uzivatel1" },
      { id: 3, role: "user", username: "uzivatel2" },
    ],
    items: [
      {
        id: 1,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 2,
        description: "Fixnout auto",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 3,
        description: "Odstraneny ukol",
        createdAt: new Date(),
        solvedAt: null,
      },
    ],
  },
  {
    id: 4,
    name: "seznam 4",
    isArchived: false,
    users: [
      { id: 1, role: "user", username: "otavlna" },
      { id: 2, role: "user", username: "uzivatel1" },
      { id: 3, role: "owner", username: "uzivatel2" },
    ],
    items: [
      {
        id: 1,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 2,
        description: "Fixnout auto",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 3,
        description: "Odstraneny ukol",
        createdAt: new Date(),
        solvedAt: null,
      },
    ],
  },
  {
    id: 5,
    name: "seznam 5",
    isArchived: false,
    users: [
      { id: 1, role: "user", username: "otavlna" },
      { id: 2, role: "owner", username: "uzivatel1" },
      { id: 3, role: "user", username: "uzivatel2" },
    ],
    items: [
      {
        id: 1,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 2,
        description: "Fixnout auto",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 3,
        description: "Odstraneny ukol",
        createdAt: new Date(),
        solvedAt: null,
      },
      {
        id: 4,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
      {
        id: 5,
        description: "Udelat FE ukol",
        createdAt: new Date(),
        solvedAt: new Date(),
      },
    ],
  },
];

export const meMock = {
  id: 1,
  username: "otavlna",
};
