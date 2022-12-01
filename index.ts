import express from "express";
import { BUILD_DIR, PORT } from "./src/env";

const app = express();

app.use(express.static(BUILD_DIR));
app.get("/*", (_, res) => {
  res.sendFile(`${__dirname}/${BUILD_DIR}/index.html`);
});

app.listen(PORT);

console.log(`Listening on localhost:${PORT}`);
