const { links, sequelize } = require("../dbConnection");

const setLink = async (id, url) => {
  try {
    const newLink = await links.create({
      id: id,
      url: url,
    });
  } catch (e) {
    console.log("error al autenticar");
  }
};

const verifyDB = async (id) => {
  try {
    const response = await links.findOne({
      where: { id: id },
    });
    if (response) {
      return true;
    } else return false;
  } catch (e) {
    console.log("error al verificar si existe el id");
    return false;
  }
};

const existDB = async (url) => {
  try {
    const response = await links.findOne({
      where: { url: url },
    });
    if (response != null) {
      return response.id;
    } else {
      return "";
    }
  } catch (e) {
    console.log("error al verificar si existe la url: ", e);
    return "";
  }
};

const getURL = async (id) => {
  try {
    const response = await links.findOne({
      where: { id: id },
    });
    if (response) {
      updateClick(id);
      return response.url;
    } else return null;
  } catch (e) {
    console.log("error al getURL");
  }
};

async function updateClick(id) {
  try {
    await sequelize.query(
      "UPDATE links SET clicks = clicks + 1 WHERE id = :id",
      {
        replacements: { id: id },
        type: sequelize.QueryTypes.UPDATE,
      }
    );
  } catch (error) {
    console.error("Error al actualizar clicks:", error);
  }
}
module.exports = { setLink, verifyDB, existDB, getURL };
