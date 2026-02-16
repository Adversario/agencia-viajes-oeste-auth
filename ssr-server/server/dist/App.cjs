var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// client/src/App.jsx
var App_exports = {};
__export(App_exports, {
  default: () => App
});
module.exports = __toCommonJS(App_exports);
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
function App({ initialData }) {
  const { solicitudes, errors, form, message, meta } = initialData;
  const [hydrated, setHydrated] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => setHydrated(true), []);
  const datalistOptions = (0, import_react.useMemo)(() => {
    const names = (solicitudes || []).map((s) => s.nombreCliente).filter(Boolean);
    return Array.from(new Set(names));
  }, [solicitudes]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "SSR \u2014 Agencia de Viajes Oeste" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge", children: "Renderizado en servidor + Hydration (React 18)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "badge", children: hydrated ? "Hidratado \u2705 (cliente)" : "Solo SSR (antes de JS)" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: { marginTop: 0 }, children: "Estado del sistema (SSR)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { color: "#aab7d6", marginTop: 6 }, children: "Estos datos vienen desde el servidor (SSR) y demuestran persistencia y render del listado." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total solicitudes:" }),
          " ",
          meta?.count ?? (solicitudes || []).length
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Archivo persistencia:" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: meta?.dataPath || "(desconocido)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ServerTime (SSR):" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: meta?.serverTime || "(sin dato)" })
        ] })
      ] })
    ] }),
    message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "msg", children: message }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Crear solicitud" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { method: "POST", action: "/solicitudes", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "ID solicitud (autogenerado servidor)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { value: "(se asigna al guardar)", readOnly: true })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Fecha registro (servidor)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { value: "(se asigna al guardar)", readOnly: true })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "RUT (Chile)" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                name: "rut",
                required: true,
                pattern: "^\\d{7,8}-[0-9kK]$",
                placeholder: "Ej: 12345678-9 o 11111111-K",
                defaultValue: form?.rut || ""
              }
            ),
            errors?.rut ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.rut }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Email" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "email", type: "email", required: true, defaultValue: form?.email || "" }),
            errors?.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.email }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nombre cliente" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "nombreCliente", required: true, minLength: 2, defaultValue: form?.nombreCliente || "" }),
            errors?.nombreCliente ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.nombreCliente }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nombre cliente buscable" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                name: "nombreBuscable",
                list: "clientes",
                required: true,
                placeholder: "Escribe y elige o escribe nuevo",
                defaultValue: form?.nombreBuscable || ""
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", { id: "clientes", children: datalistOptions.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: n }, n)) }),
            errors?.nombreBuscable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.nombreBuscable }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Origen" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "origen", required: true, defaultValue: form?.origen || "" }),
            errors?.origen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.origen }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Destino" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "destino", required: true, defaultValue: form?.destino || "" }),
            errors?.destino ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.destino }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Tipo viaje" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { name: "tipoViaje", defaultValue: form?.tipoViaje || "solo_ida", required: true, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "solo_ida", children: "Solo ida" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "ida_vuelta", children: "Ida y vuelta" })
            ] }),
            errors?.tipoViaje ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.tipoViaje }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Estado" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { marginTop: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "estado", value: "pendiente", defaultChecked: (form?.estado || "pendiente") === "pendiente", required: true }),
                " ",
                "Pendiente"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { marginTop: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "estado", value: "en_proceso", defaultChecked: form?.estado === "en_proceso" }),
                " ",
                "En proceso"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { marginTop: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", name: "estado", value: "finalizada", defaultChecked: form?.estado === "finalizada" }),
                " ",
                "Finalizada"
              ] })
            ] }),
            errors?.estado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.estado }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Fecha salida" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "fechaSalida", type: "datetime-local", required: true, defaultValue: form?.fechaSalida || "" }),
            errors?.fechaSalida ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.fechaSalida }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Fecha regreso" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { name: "fechaRegreso", type: "datetime-local", required: true, defaultValue: form?.fechaRegreso || "" }),
            errors?.fechaRegreso ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "error", children: errors.fechaRegreso }) : null
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "btn", type: "submit", children: "Guardar solicitud" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Listado SSR (desde persistencia)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { style: { color: "#aab7d6", marginTop: 6 }, children: [
        "La lista debe coincidir con ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "server/data/solicitudes.json" })
      ] }),
      (solicitudes || []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No hay solicitudes registradas a\xFAn." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "RUT" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Cliente" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Email" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Origen \u2192 Destino" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tipo" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Salida / Regreso" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Registro" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Estado" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: solicitudes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.idSolicitud }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.rut }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.nombreCliente }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.email }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
            s.origen,
            " \u2192 ",
            s.destino
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.tipoViaje }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Salida:" }),
              " ",
              s.fechaSalida
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Regreso:" }),
              " ",
              s.fechaRegreso
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.fechaRegistro }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.estado })
        ] }, s.idSolicitud)) })
      ] })
    ] })
  ] });
}
