const express = require("express");
const path = require("path");
const app = express();
app.use(
  express.static(path.join(__dirname, "node_modules"))
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(require("./routes/shorter"));
const port = 3000;
app.listen(port, () => {
  console.log(`listen port: ${port}`);
});
