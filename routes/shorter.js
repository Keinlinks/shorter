const path = require("path");
const dbLink = require("../db function/links");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(
    path.join(__dirname, "..", "public", "index.html")
  );
});

router.post("/postURL", async (req, res) => {
  const { url } = req.body;
  const linkExist = await dbLink.existDB(url);
  if (linkExist) {
    res.send(linkExist);
  } else {
    const id = generateID(15);

    dbLink.setLink(id, url);
    res.send(id);
  }
});

router.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;

  const url = await dbLink.getURL(shortCode);
  if (url) {
    res.redirect(url);
  } else {
    res
      .status(404)
      .sendFile(
        path.join(
          __dirname,
          "..",
          "public",
          "notFound.html"
        )
      );
  }
});

module.exports = router;

function generateID(lenght) {
  const charts =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomID = "";
  do {
    for (let i = 0; i < lenght; i++) {
      const ranindex = Math.floor(
        Math.random() * charts.length
      );
      randomID += charts.charAt(ranindex);
    }
  } while (!dbLink.verifyDB(randomID));

  return randomID;
}
