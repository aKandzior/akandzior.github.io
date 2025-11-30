self.NOTICE_HTML = `<!doctype html>
<html lang="de" class="expert-off">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#478D3F" />
    <title>Pro-Tour App ist umgezogen</title>
    <link rel="icon" type="image/png" href="/pro-tour/icons/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/pro-tour/icons/icon-192.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/pro-tour/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/pro-tour/manifest.webmanifest" />
    <style>
      :root {
        color-scheme: dark;
        --color-bg: #12251d;
        --color-panel-bg: #223127;
        --color-panel-border: #31493a;
        --color-text: #eee;
        --color-text-muted: #bbb;
        --color-btn-bg: #478d3f;
        --color-btn-text: #f7fff7;
        --color-btn-hover-bg: #f7fff7;
        --color-btn-hover-text: #12251d;
        --border-radius-l: 0.75rem;
        --font-size-regular: 1rem;
        --font-size-large: 1.25rem;
        --font-size-largest: 1.5rem;
        --notice-max-width: 720px;
      }
      @media (prefers-color-scheme: light) {
        :root {
          color-scheme: light;
          --color-bg: #dcefcf;
          --color-panel-bg: #f7fff7;
          --color-panel-border: #41624e;
          --color-text: #222;
          --color-text-muted: #555;
          --color-btn-bg: #478d3f;
          --color-btn-text: #f7fff7;
          --color-btn-hover-bg: #f7fff7;
          --color-btn-hover-text: #12251d;
        }
      }
      body {
        min-height: 100vh;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: var(--color-bg);
        color: var(--color-text);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }
      .notice-card {
        width: min(100%, var(--notice-max-width));
        background: var(--color-panel-bg);
        border: 1px solid var(--color-panel-border);
        border-radius: var(--border-radius-l);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 10px 40px #00000055;
      }
      .notice-card h1 {
        margin-top: 0;
        font-size: var(--font-size-largest);
        line-height: 1.2;
      }
      .notice-card p {
        margin-bottom: 0;
        font-size: var(--font-size-large);
        color: var(--color-text-muted);
      }
      .notice-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .notice-actions a {
        text-decoration: none;
        color: var(--color-btn-text);
        background: var(--color-btn-bg);
        border: 1px solid var(--color-panel-border);
        border-radius: 0.5rem;
        padding: 0.65rem 1.25rem;
        font-weight: 600;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .notice-actions a:hover,
      .notice-actions a:focus-visible {
        background: var(--color-btn-hover-bg);
        color: var(--color-btn-hover-text);
      }
      .header-text {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    </style>
  </head>
  <body>
    <main class="notice-card" role="main">
      <div class="notice-img" aria-hidden="true">
        <img src="./icons/icon-512.svg" height="100" width="100" alt="" />
      </div>
      <div class="notice-text">
        <h1>Die Pro-Tour App ist umgezogen!</h1>
        <p>Du findest die App ab sofort unter <a href="https://pro-tour.oldnerd.de">https://pro-tour.oldnerd.de</a>.</p>
        </div>
      <div class="notice-actions">
        <a href="https://pro-tour.oldnerd.de">Zur neuen Adresse</a>
      </div>
    </main>
  </body>
</html>`;
