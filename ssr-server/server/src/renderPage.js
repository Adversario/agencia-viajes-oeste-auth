const React = require("react");
const ReactDOMServer = require("react-dom/server");
const path = require("path");

function loadServerApp() {
  const appPath = path.join(__dirname, "../dist/App.cjs");
  delete require.cache[require.resolve(appPath)];
  const mod = require(appPath);
  return mod.default || mod;
}

function renderHtml(initialData) {
  const App = loadServerApp();

  const appHtml = ReactDOMServer.renderToString(
    React.createElement(App, { initialData })
  );

  const initialDataScript = `
    <script>
      window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replaceAll(
        "<",
        "\\u003c"
      )};
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR - Agencia de Viajes Oeste</title>
    <style>
      /* Base */
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; margin: 0; background:#0b1220; color:#e7eefc; }
      .container{ max-width: 1000px; margin: 0 auto; padding: 24px; }
      .card{ background:#121b2f; border:1px solid rgba(255,255,255,.12); border-radius:14px; padding:16px; margin-bottom:16px; }
      label{ display:block; font-size: 13px; color:#aab7d6; margin-top:10px; }
      .row{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }

      /* Inputs */
      input, select{
        width:100%;
        padding:10px 12px;
        border-radius:10px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.04);
        color:#e7eefc;
        line-height: 1.2;
        height: 42px;
        outline: none;
      }

      input::placeholder { color: rgba(231,238,252,.45); }

      /* Fix: datetime controls on dark backgrounds */
      input[type="datetime-local"]{
        color-scheme: dark; /* hace que el control interno sea coherente */
      }

      /* Fix: Chrome/Edge autofill “burbujas” */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-text-fill-color: #e7eefc;
        transition: background-color 9999s ease-out 0s;
        box-shadow: 0 0 0px 1000px rgba(255,255,255,.04) inset;
        border: 1px solid rgba(255,255,255,.12);
      }

      .btn{ margin-top:14px; padding:12px; border-radius:12px; border:1px solid rgba(96,165,250,.6); background:rgba(96,165,250,.18); color:#e7eefc; cursor:pointer; font-weight:700; }
      .btn:hover{ background:rgba(96,165,250,.28); }
      .error{ color:#ff6b6b; font-size:12px; margin:6px 0 0; }
      table{ width:100%; border-collapse: collapse; }
      th, td{ border-bottom:1px solid rgba(255,255,255,.12); padding:10px; text-align:left; font-size: 13px; vertical-align: top; }
      th{ color:#aab7d6; font-weight:700; }
      code{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      .badge{ display:inline-block; padding:4px 8px; border-radius:999px; border:1px solid rgba(255,255,255,.18); font-size:12px; color:#aab7d6; }
      .msg{ padding:10px 12px; border-radius:12px; border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.04); margin-bottom:12px; }
    </style>
  </head>
  <body>
    ${initialDataScript}
    <div id="root">${appHtml}</div>
    <script src="/static/client.js" defer></script>
  </body>
</html>`;
}

module.exports = { renderHtml };