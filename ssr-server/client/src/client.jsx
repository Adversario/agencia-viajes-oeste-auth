import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const initialData = window.__INITIAL_DATA__ || {
  solicitudes: [],
  errors: {},
  form: {},
  message: ""
};

hydrateRoot(document.getElementById("root"), <App initialData={initialData} />);