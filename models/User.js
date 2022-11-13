const { fs } = require("fs");
const usuarioController = require("../src/controllers/usuarioController");
borrar: function z(id) {
  let allUsers = this.findAll();
  let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
  fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
  return true;
}
