const express = require("express");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/post/:slug", (req, res) => {
    const actualPage = "/post";
    const queryParams = { slug: req.params.slug, queryType: "post" };
    app.render(req, res, actualPage, queryParams);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
}).catch(e => {
  console.error(e.stack);
  process.exit(1);
});
