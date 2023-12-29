import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import DetailPage, { loader as detailLoader } from "./routes/detail";
import Root, { loader as rootLoader } from "./routes/root";

export default function Main() {
  const [lang, setLang] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root lang={lang} />,
      loader: rootLoader,
    },
    {
      path: "detail/:listId",
      element: <DetailPage lang={lang} />,
      loader: detailLoader,
    },
  ]);

  return (
    <div className={darkMode ? "dark" : ""} id="dark-mode">
      <div className="white dark:bg-slate-800" style={{ minHeight: "100vh" }}>
        <React.StrictMode>
          <button
            className="bg-slate-200 dark:bg-slate-400 p-1 border-solid border-black"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {lang === "en" ? "Switch dark mode" : "Přepnout dark mode"}
          </button>
          <select
            onChange={(e) => setLang(e.target.value)}
            name="lang"
            id="lang"
            className="ml-4 bg-slate-200 dark:bg-slate-400 p-1 border-solid border-black"
          >
            <option value="en">English</option>
            <option value="cs">Česky</option>
          </select>
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
    </div>
  );
}
